import { Page, ElementHandle } from "puppeteer-core";
import { decrypt } from "../../utils";
import { FlyRecordLogType, FlyRecordType, InputActionType } from "../../types";
import { scrollIntoViewIfNeeded, waitForSelectors } from "../../utils";
export const a_input = async (
  page: Page,
  options: InputActionType["options"],
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
  let delayTime = 100;
  if (options.delay === "slow") {
    delayTime = 750;
  } else if (options.delay === "medium") {
    delayTime = 250;
  } else if (options.delay === "fast") {
    delayTime = 20;
  }

  let value = options?.value;
  if (!options?.value && options?.encrypt === true && options?.encryptedValue) {
    value = decrypt(options?.encryptedValue);
  }

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
  await scrollIntoViewIfNeeded(
    selectors,
    page,
    20000 / selectors.length,
    flyRecord,
    finalResults,
    logger
  );
  const element = (await waitForSelectors(
    selectors,
    page,
    { visible: true, timeout: 20000 / selectors.length },
    flyRecord,
    finalResults,
    logger
  )) as ElementHandle<HTMLInputElement>;

  if (options.type === "input") {
    const type = await element.evaluate((el) => el.type);
    if (["select-one"].includes(type)) {
      await element.select(value || "");
    } else if (
      [
        "textarea",
        "text",
        "url",
        "tel",
        "search",
        "password",
        "number",
        "email",
      ].includes(type)
    ) {
      await element.click({ clickCount: 3 });
      await element.type(value || "", {
        delay: delayTime,
      });
    } else {
      await element.focus();
      await element.evaluate((el, value) => {
        el.value = value || "";
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }, value);
    }
  } else if (options.type === "select") {
    await element.select(value || "");
  }
};