import { Page } from "puppeteer-core";
import prependHttp from "prepend-http";
import { GotoActionType } from "../../types";
export const a_goto = async (
  page: Page,
  options: GotoActionType["options"]
) => {
  if (options?.cookies) {
    await page.setCookie(...options.cookies);
  }

  await page.goto(prependHttp(options.url), {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });
  if (options?.waitForSelector) {
    await page.waitForSelector(options.waitForSelector);
  }
};
