import { fly } from "./fly";
import { ext, isLambda } from "../config/ext";
import { ActionType, AuthType, FlyRecordType } from "../types";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { addExtra, PuppeteerExtra, VanillaPuppeteer } from "puppeteer-extra";
import { PuppeteerNode, Viewport, Page } from "puppeteer-core";
import { BirdError, localLogger, prepareBird, validateBird } from "../utils";
import { birdActionsData } from "./birdActions";

const BIRD__TIMEOUT_ERROR = `Maximum fly time for a bird exceeded.`;
const PUPPETEER__ERROR_LAUNCHING_WITH_PROXY =
  "Puppeteer error in launching with proxy";
const PUPPETEER__ERROR_LAUNCHING_BROWSER =
  "Puppeteer error in launching browser";
export const owl = async ({
  puppeteer,
  actions,
  headless = true,
  proxyString,
  auth,
  flyRecord = {
    id: "local",
    logs: [
      {
        data: {},
        action: "message",
        status: "starting",
        message: "Starting a new bird",
        time: new Date().toISOString(),
      },
    ],
    status: "starting",
    credits_used: 0,
  },
  finalResults = {},
  birdCredits = {},
  logger = localLogger,
  variables = {},
  chromium,
}: {
  puppeteer: PuppeteerNode | PuppeteerExtra | any;
  actions: ActionType[];
  headless?: boolean;
  proxyString?: string;
  auth?: AuthType;
  flyRecord?: FlyRecordType;
  finalResults?: any;
  birdCredits?: { [x: string]: number };
  logger?: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any;
  variables?: {};
  chromium?: {
    executablePath: (input?: string) => Promise<string>;
    args: () => string[];
    defaultViewport: () => Required<Viewport>;
  };
}) => {
  const birdData = { skeleton: actions };
  const { injectedBird } = prepareBird(birdData, variables);
  validateBird(injectedBird, birdActionsData);

  let chromiumArgs = [
    "--no-sandbox",
    "--disable-gpu",
    "--ignore-certificate-errors",
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ];

  let chromiumBin = isLambda
    ? await chromium?.executablePath()
    : puppeteer.executablePath();
  chromiumArgs = isLambda
    ? [...chromiumArgs, "--headless"].concat(chromium?.args() || [""])
    : chromiumArgs;
  if (proxyString) {
    chromiumArgs.forEach((item, i) => {
      if (item.startsWith("--proxy-server=")) {
        chromiumArgs.splice(i, 1);
      }
    });
    const [credential, proxyStr] = proxyString.split("@");
    if (credential && proxyStr) {
      chromiumArgs.push(`--proxy-server=${proxyStr || credential}`);
    }
  }

  let chromiumViewPort: Viewport = {
    height: 720,
    width: 1280,
  };
  chromiumViewPort = isLambda
    ? chromium?.defaultViewport() || { height: 720, width: 1280 }
    : chromiumViewPort;
  puppeteer = addExtra(puppeteer as VanillaPuppeteer);

  const recaptcha = RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: ext.captcha.api,
    },
    visualFeedback: true,
    throwOnError: true,
  });
  puppeteer.use(StealthPlugin());
  puppeteer.use(recaptcha);

  let browser: {
    close(): unknown; newPage: () => Page | PromiseLike<Page> 
}, page: Page;
  try {
    browser = await puppeteer.launch({
      args: chromiumArgs,
      defaultViewport: chromiumViewPort,
      executablePath: chromiumBin,
      headless,
    });

    page = await browser.newPage();
    if (proxyString) {
      const [credential, proxyStr] = proxyString.split("@");
      if (credential && proxyStr) {
        const [username, password] = credential.split(":");
        if (username && password) {
          await page.authenticate({ username, password });
        }
      }
      try {
        await page.goto("https://lumtest.com/myip.json", {
          timeout: 30000,
        });
        // @ts-ignore
        const data = await page.$eval("pre", (e: { innerText: string }) => e.innerText);
        const proxyData = JSON.parse(data);
        const country = proxyData.country;
        await logger(
          "message",
          `${country ? `Proxy: [${country}] - ` : ""}`,
          "info",
          flyRecord,
          birdCredits
        );
      } catch (e) {
        throw PUPPETEER__ERROR_LAUNCHING_WITH_PROXY;
      }
    }
  } catch (e) {
    if (e === PUPPETEER__ERROR_LAUNCHING_WITH_PROXY) {
      throw new BirdError({
        code: "PUPPETEER__ERROR_LAUNCHING_WITH_PROXY",
        message: PUPPETEER__ERROR_LAUNCHING_WITH_PROXY,
        data: e,
      });
    }
    throw new BirdError({
      code: "PUPPETEER__ERROR_LAUNCHING_BROWSER",
      message: PUPPETEER__ERROR_LAUNCHING_BROWSER,
      data: e,
    });
  }

  recaptcha.onPageCreated(page as any);
  const maxFlyTime = 840 * 1000; // 14 minutes
  const flyResults: any = await Promise.race([
    fly({
      page,
      auth,
      actions: injectedBird || [],
      flyRecord,
      finalResults,
      birdActions: birdActionsData,
      birdCredits,
      logger,
    }),
    new Promise((resolve) => {
      setTimeout(resolve, maxFlyTime, BIRD__TIMEOUT_ERROR);
    }),
  ]);
  if (flyResults === BIRD__TIMEOUT_ERROR) {
    throw new BirdError({
      code: "BIRD__TIMEOUT_ERROR",
      message: `${BIRD__TIMEOUT_ERROR} Maximum fly time is ${maxFlyTime} ms`,
      data: flyResults,
    });
  }
  await browser?.close();
  return flyResults;
};
