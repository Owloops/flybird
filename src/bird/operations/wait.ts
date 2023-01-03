import { Page } from "puppeteer-core";
import { WaitActionType } from "../../types";
import { waitForTimeout } from "../../utils";
export const a_wait = async (
  page: Page,
  options: WaitActionType["options"]
) => {
  if (options.for === "time") {
    let time = Number(options?.time) || 0;
    if (time > 30000) {
      time = 30000;
    }
    await waitForTimeout(time || 30000);
  } else if (options.for === "querySelector") {
    await page.waitForSelector(options.querySelector || "");
  }
};
