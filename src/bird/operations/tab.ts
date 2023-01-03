import { Page } from 'puppeteer-core';
export const a_tab = async (page: Page) => {
    await page.keyboard.press('Tab');
  };