// @ts-nocheck
import { Page } from "puppeteer-core";
import { ParserType } from "../../types";
import { processor } from "../../utils";
export const a_getData = async (
  page: Page,
  options: {
    dataName: string;
    parentSelector: string;
    data: {
      value: string;
      variableName: string;
      querySelector: string;
      parser?: ParserType;
    }[];
  },
  finalResults: any
) => {
  const allParent = await page.$$(options?.parentSelector);

  finalResults[options?.dataName || "getData"] = [];

  for (let parent of allParent) {
    let rowData = {};
    for (let d of options.data) {
      try {
        const getDataValue = await parent.$eval(
          d.querySelector,
          (el: any, d: { value: "link" | "innerText" | "image" | any }) => {
            if (d.value === "link" || d.value === "href") {
              return el.href;
            } else if (d.value === "innerText" || d.value === "text") {
              return el.innerText;
            } else if (d.value === "textContent") {
              return el.textContent;
            } else if (d.value === "innerHtml") {
              return el.innerHtml;
            } else if (d.value === "image" || d.value === "src") {
              return el.src;
            } else {
              return el.getAttribute(d.value);
            }
          },
          d
        );

        rowData[d.variableName] = processor(getDataValue, d.parser || "");
      } catch (e) {
        console.log(e);
        console.log("No such child elemnt found for this parent");
        rowData[d.variableName] = null;
      }
    }
    finalResults[options?.dataName].push(rowData);
  }
};
