import { Page } from "puppeteer-core";
import { ClickActionType, FlyRecordLogType, FlyRecordType } from "../../types";
import { waitForSelectors, scrollIntoViewIfNeeded } from "../../utils";
export const a_click = async (
  page: Page,
  options: ClickActionType["options"],
  flyRecord: {
    id: string;
    logs: FlyRecordLogType[];
    status: string;
    credits_used: number;
  },
  finalResults: any,
  logger: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any
) => {
  const selectors: string[][] = [];
  // @ts-ignore
  selectors.push([options[options.preferredSelector || "querySelector"]]);
  if (options.querySelector) {
    // @ts-ignore
    if (options.querySelector !== selectors[0][0]) {
      selectors.push([options.querySelector]);
    }
  }
  if (options.ariaSelector) {
    // @ts-ignore
    if (options.ariaSelector !== selectors[0][0]) {
      selectors.push([options.ariaSelector]);
    }
  }
  if (options.xpathSelector) {
    // @ts-ignore
    if (options.xpathSelector !== selectors[0][0]) {
      selectors.push([options.xpathSelector]);
    }
  }
  if (options.textSelector) {
    // @ts-ignore
    if (options.textSelector !== selectors[0][0]) {
      selectors.push([options.textSelector]);
    }
  }
  if (options.pierceSelector) {
    // @ts-ignore
    if (options.pierceSelector !== selectors[0][0]) {
      selectors.push([options.pierceSelector]);
    }
  }
  await scrollIntoViewIfNeeded(
    selectors,
    page,
    20000 / selectors.length,
    flyRecord,
    finalResults,
    logger
  );
  const element = await waitForSelectors(
    selectors,
    page,
    { visible: true, timeout: 20000 / selectors.length },
    flyRecord,
    finalResults,
    logger
  );
  if (options.offsetX && options.offsetY) {
    await element.click({
      button: options.rightClick ? "right" : "left",
      clickCount: options.doubleClick ? 2 : 1,
      offset: {
        x: options.offsetX,
        y: options.offsetY,
      },
    });
  } else {
    await element.click({
      button: options.rightClick ? "right" : "left",
      clickCount: options.doubleClick ? 2 : 1,
    });
  }
};