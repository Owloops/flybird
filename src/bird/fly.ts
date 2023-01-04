// @ts-nocheck
import * as crypto from "crypto";
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { Page, Frame } from "puppeteer-core";
import {
  AuthType,
  ActionType,
  FlyRecordType,
  InputActionType,
  ClickActionType,
} from "../types";
import { ext, isLambda } from "../config/ext";
import { localLogger, uploadFileToS3, BirdError } from "../utils";
import {
  a_click,
  a_getAll,
  a_goto,
  a_input,
  a_wait,
  a_get,
  a_enter,
  a_tab,
  a_screenshot,
  a_getHtml,
  a_getTitle,
  a_getUrl,
  a_scroll,
  a_condition,
  a_loop,
  a_solveCaptcha,
  a_getClipboard,
  a_message,
  a_endBird,
  a_getDateTime,
  a_getData,
  a_goBack,
  a_setViewport,
} from "./operations";

export const fly = async ({
  messagePrefix = "",
  page,
  auth,
  actions,
  flyRecord = {
    id: "local",
    logs: [{
        data: {},
        action: "start",
        status: "starting",
        message: "Starting a new bird",
        time: new Date().toISOString(),
      }],
    status: "starting",
    credits_used: 0,
  },
  finalResults = {},
  birdActions = [],
  birdCredits = {},
  logger = localLogger,
}: {
  page: Page & { findRecaptchas: () => any };
  actions: ActionType[];
  flyRecord?: FlyRecordType;
  auth?: AuthType;
  messagePrefix?: string;
  finalResults?: any;
  birdActions?: any;
  birdCredits?: { [x: string]: number };
  logger?: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any;
}) => {
  let message: string;
  for (let [index, action] of actions.entries()) {
    try {
      switch (action.action) {
        case "set-viewport":
          message = `${messagePrefix}Setting viewport width: ${action?.options?.width} height: ${action?.options?.height}`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_setViewport(page, action?.options);
          break;

        case "goto":
          message = `${messagePrefix}Loading ${action?.options?.url}`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_goto(page, action?.options);
          break;

        case "input":
          message = `${messagePrefix}Typing ${
            action?.options?.value || "*******"
          } at ${
            action?.options[
              action?.options.preferredSelector as keyof InputActionType["options"] || "querySelector"
            ]
          }...`;

          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_input(page, action?.options, flyRecord, finalResults, logger);
          break;

        case "click":
          message = `${messagePrefix} clicking ${
            action?.options[
              action?.options.preferredSelector as keyof ClickActionType["options"] || "querySelector"
            ]
          }...`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_click(page, action?.options, flyRecord, finalResults, logger);
          break;

        case "wait":
          message = `${messagePrefix}Waiting...`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_wait(page, action?.options);
          break;

        case "get":
          message = `${messagePrefix}Collecting "${action?.options.variableName}" from ${action?.options.value}...`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_get(page, action?.options, finalResults);
          break;

        case "get-all":
          message = `${messagePrefix} Fetching all ${action?.options?.value}`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getAll(page, action?.options, finalResults);
          break;

        case "get-url":
          message = `${messagePrefix}Fetching url`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getUrl(page, action?.options, finalResults);
          break;

        case "get-title":
          message = `${messagePrefix} Fetching title`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getTitle(page, action?.options, finalResults);
          break;

        case "enter":
          message = `${messagePrefix} pressing enter key`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_enter(page);
          break;

        case "tab":
          message = `${messagePrefix} pressing tab key`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_tab(page);
          break;

        case "screenshot":
          message = `${messagePrefix}Capturing Screenshot`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_screenshot(
            page,
            action?.options,
            finalResults,
            auth?.userId || "localUser",
            flyRecord.id
          );
          break;

        case "get-html":
          message = `${messagePrefix} Extracting HTML content`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getHtml(
            page,
            action?.options,
            finalResults,
            auth?.userId || "localUser",
            flyRecord.id
          );
          break;

        case "scroll":
          message = `${messagePrefix} Scrolling through`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_scroll(page, action?.options);
          break;

        case "condition":
          message = `${messagePrefix}Working with conditions`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          try {
            const conditionResults = await a_condition(
              page,
              action?.options,
              flyRecord,
              finalResults,
              birdActions,
              birdCredits,
              logger,
              auth
            );
            flyRecord = conditionResults.flyRecord;
          } catch (e) {
            finalResults = e?.data?.finalResults;
            flyRecord = e.data.flyRecord;
            throw new BirdError({
              code: e.code,
              message: e.code === "End bird detected" ? "" : e.message,
              data: {
                flyRecord: e.data.flyRecord,
                finalResults,
              },
            });
          }
          break;

        case "loop":
          message = `${messagePrefix}Working with loops`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          try {
            const loopResuts = await a_loop(
              page,
              action?.options,
              flyRecord,
              finalResults,
              birdActions,
              birdCredits,
              auth,
              logger
            );

            flyRecord = loopResuts.flyRecord;
          } catch (e) {
            finalResults[action?.options?.loopName].push(e?.data?.finalResults);
            flyRecord = e.data.flyRecord;
            throw new BirdError({
              code: e.code,
              message: e.code === "End bird detected" ? "" : e.message,
              data: {
                flyRecord: e.data.flyRecord,
                finalResults,
              },
            });
          }
          break;

        case "solve-captcha":
          let captchas: any = [];
          try {
            let find = await page.findRecaptchas();
            captchas = find.captchas;
            if (captchas?.length === 0) {
              for (const frame of page.mainFrame().childFrames()) {
                find = await (frame as Frame & { findRecaptchas: () => any }).findRecaptchas();
                captchas = find.captchas;
              }
            }
          } catch (e) {
            console.error(e);
          }

          if (captchas.length > 0) {
            message = `${messagePrefix} Solving Recaptcha in ${page.url()}`;
            flyRecord = await logger(
              action.action,
              message,
              "info",
              flyRecord,
              birdCredits
            );
            await a_solveCaptcha(page);
          } else {
            message = `${messagePrefix} No captchas found in ${page.url()}`;
            flyRecord = await logger(
              action.action,
              message,
              "info",
              flyRecord,
              { "no-credit": 0 }
            );
          }

          break;

        case "message":
          message = `${messagePrefix} appending a message`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_message(action?.options, finalResults);
          break;

        case "get-clipboard":
          message = `${messagePrefix} reading clipboard`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getClipboard(action?.options, finalResults);
          break;

        case "end-bird":
          message = `${messagePrefix} ending bird`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_endBird(action?.options, finalResults, flyRecord);
          break;

        case "get-dateTime":
          message = `${messagePrefix} Fetching date and Time from ${
            action?.options?.timezone || "US East (N.Virginia)"
          }`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getDateTime(action?.options, finalResults);
          break;

        case "go-back":
          message = `${messagePrefix} Going back in the browser...`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_goBack(page, action?.options);
          break;

        case "get-data":
          message = `${messagePrefix} Fetching data within ${action?.options?.parentSelector}`;
          flyRecord = await logger(
            action.action,
            message,
            "info",
            flyRecord,
            birdCredits
          );
          await a_getData(page, action?.options, finalResults);
          break;

        default:
          console.error("Action did not match");
      }
    } catch (e) {
      console.error(e);
      if (e.isCustomError && e.code === "End bird detected") {
        throw new BirdError({
          code: "End bird detected",
          message: "",
          data: {
            flyRecord,
            finalResults,
          },
        });
      } else {
        console.error("bird crashed");
        const body = await page.content();

        if (!isLambda) {
          if (!existsSync('./flybird-screenshot')){
            mkdirSync('./flybird-screenshot');
          }
          if (!existsSync('./flybird-html')){
            mkdirSync('./flybird-html');
          }
          writeFileSync(`./flybird-html/${crypto.randomUUID()}.html`, body);
        }

        const crashScreenshot =
          body &&
          (await page
            .screenshot({
              encoding: "binary",
              type: "jpeg",
              quality: 90,
              path: !isLambda ? `flybird-screenshot/${crypto.randomUUID()}.jpeg` : undefined
            })
            .catch((err) => console.error('Failed screenshot', err)));

        let screenshot: any, html: any;
        if (ext.s3.bucketName && isLambda) {
          [screenshot, html] = await Promise.all([
            crashScreenshot &&
              uploadFileToS3(
                ext.s3.bucketName,
                crashScreenshot,
                `${auth?.userId}/crash-reports/${flyRecord.id}/bird-crash-screenshot.jpg`
              )
                .then((x) => {
                  return x;
                })
                .catch((err) => console.error("Failed screenshot", err)),
            body &&
              uploadFileToS3(
                ext.s3.bucketName,
                Buffer.from(body),
                `${auth?.userId}/crash-reports/${flyRecord.id}/bird-crash-body.html`
              )
                .then((x) => {
                  return x;
                })
                .catch((err) => console.error("Failed body", err)),
          ]);
        }
        throw new BirdError({
          code: "BIRD__BIRD_CRASHED",
          message: actions[index]?.action + ":" + e.message,
          data: {
            flyRecord,
            screenshot,
            html,
            finalResults,
          },
        });
      }
    }
  }

  return { finalResults, flyRecord };
};
