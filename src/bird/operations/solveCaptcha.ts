import { Page, Frame } from 'puppeteer-core';
import { waitForTimeout } from '../../utils';

export const a_solveCaptcha = async (page: Page & { solveRecaptchas: () => any }) => {
  await waitForTimeout(1000);
  try {
    let solve = await page.solveRecaptchas();
    if (solve.captchas.length === 0) {
      for (const frame of page.mainFrame().childFrames()) {
        solve = await (frame as Frame & { solveRecaptchas: () => any }).solveRecaptchas();
      }
    }
    const { solutions, error } = solve;
    if (solutions.length === 0 || error) {
      throw new Error(error);
    } else {
      await waitForTimeout(1000);
    }
  } catch (e) {
    console.log(e);
    console.log('error occured');
  }
};
