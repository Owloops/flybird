import { Page } from 'puppeteer-core';
export const a_enter = async (page: Page) => {
    await page.keyboard.press('Enter');
  };