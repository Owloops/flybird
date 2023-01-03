import { Page } from "puppeteer-core";
import { goBackActionType } from "../../types";
export const a_goBack = async (
  page: Page,
  options: goBackActionType["options"]
) => {
  await page.goBack({
    timeout: 60000,
  });

  if (options?.waitForSelector) {
    await page.waitForSelector(options.waitForSelector);
  }
};
