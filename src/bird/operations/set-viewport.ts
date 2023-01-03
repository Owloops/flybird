import { Page } from "puppeteer-core";
import { SetViewPortType } from "../../types";
export const a_setViewport = async (
  page: Page,
  options: SetViewPortType["options"]
) => {
  await page.setViewport({ width: options.width, height: options.height });
};
