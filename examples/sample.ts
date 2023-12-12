// node --loader ts-node/esm examples/sample.ts

import { owl } from "../src/bird";
import puppeteer from "puppeteer";

(async () => {
  await owl({
    headless: false,
    puppeteer,
    actions: [
      {
        action: "set-viewport",
        options: {
          width: 1374,
          height: 439,
        },
      },
      {
        action: "goto",
        options: {
          url: "https://duckduckgo.com/?atb=v298-1",
        },
      },
      {
        action: "click",
        options: {
          querySelector: "#searchbox_input",
          rightClick: false,
          preferredSelector: "querySelector",
          xpathSelector: 'xpath///*[@id="searchbox_input"]',
          offsetX: 397.8182067871094,
          offsetY: 16.022735595703125,
        },
      },
      {
        action: "input",
        options: {
          querySelector: "#searchbox_input",
          preferredSelector: "querySelector",
          type: "input",
          value: "owloops",
          xpathSelector: 'xpath///*[@id="searchbox_input"]',
        },
      },
      {
        action: "enter",
        options: {},
      },
      {
        action: "click",
        options: {
          querySelector: "li:nth-of-type(1) div.ikg2IXiCD14iVX7AdZo1 span",
          rightClick: false,
          preferredSelector: "querySelector",
          xpathSelector: 'xpath///*[@data-testid="result-title-a"]/span',
          offsetX: 173.09375,
          offsetY: 10.765625,
        },
      },
    ],
  });
})();
