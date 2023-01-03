import { Page } from "puppeteer-core";
import { ScrollActionType } from "../../types";
export const a_scroll = async (
  page: Page,
  options: ScrollActionType["options"]
) => {
  await page.evaluate(async (options) => {
    let speed = 1000;
    const speeds = {
      slow: 2000,
      medium: 1000,
      fast: 300,
    };
    if (options.speed) {
      speed = speeds[options.speed];
    }
    await new Promise((resolve) => {
      let totalHeight = 0;
      let scrollTime = 0;
      const distance = 100;
      const timer = setInterval(async () => {
        let scrollHeight = 0;
        if (options.withIn) {
          const elem = document.querySelector(options.withIn) as HTMLElement;
          if (options.to === "bottom") {
            if (elem) {
              scrollHeight = elem.scrollHeight;
              elem.scrollBy(0, distance);
            }
          } else if (options.to === "component") {
            if (elem) {
              scrollHeight = elem.offsetTop;
              elem.scrollBy(0, distance);
            }
          }
        } else {
          if (options.to === "bottom") {
            scrollHeight = document.body.scrollHeight;
          } else if (options.to === "component") {
            const elem = document.querySelector(
              options.querySelector
            ) as HTMLElement;
            if (elem) {
              scrollHeight = elem.offsetTop;
            }
          }
          window.scrollBy(0, distance);
        }
        totalHeight += distance;
        scrollTime += speed;

        if (
          totalHeight >= scrollHeight ||
          (options.scrollFor && options.scrollFor < scrollTime)
        ) {
          clearInterval(timer);
          resolve(undefined);
        }
      }, speed);
    });
  }, options);
};
