import { Page } from "puppeteer-core";
import {
  GetActionType,
  GetAllActionType,
  GetTitleActionType,
  GetUrlActionType,
} from "../../types";
import { processor } from "../../utils";

export const a_get = async (
  page: Page,
  options: GetActionType["options"],
  finalResults: any
) => {
  try {
    const getValue = await page.$eval(
      options.querySelector,
      // @ts-ignore
      (el: any, options: { value: "link" | "innerText" | "image" | any }) => {
        if (options.value === "link" || options.value === "href") {
          return el.href;
        } else if (options.value === "innerText" || options.value === "text") {
          return el.innerText;
        } else if (options.value === "textContent") {
          return el.textContent;
        } else if (options.value === "innerHtml") {
          return el.innerHTML;
        } else if (options.value === "image" || options.value === "src") {
          return el.src;
        } else {
          return el.getAttribute(options.value);
        }
      },
      options
    );

    if (options.parser) {
      finalResults[options.variableName] = processor(getValue, options.parser);
    }
  } catch (e) {
    console.log(e);
    console.log("get - no query selector found");
    finalResults[options.variableName] = null;
  }
};

export const a_getAll = async (
  page: any,
  options: GetAllActionType["options"],
  finalResults: any
) => {
  const getAllValues = await page.$$eval(
    options.querySelector,
    (el: [any], options: { value: "link" | "innerText" | "image" | any }) => {
      if (options.value === "link" || options.value === "href") {
        return el.map((e) => {
          return e.href;
        });
      } else if (options?.value === "textContent") {
        return el.map((e) => {
          return e.textContent;
        });
      } else if (options?.value === "innerText" || options?.value === "text") {
        return el.map((e) => {
          return e.innerText;
        });
      } else if (options.value === "innerHtml") {
        return el.map((e) => {
          return e.innerHTML;
        });
      } else if (options.value === "image" || options.value === "src") {
        return el.map((e) => {
          return e.src;
        });
      } else {
        return el.map((e) => {
          return e.getAttribute(options.value);
        });
      }
    },
    options
  );

  finalResults[options.variableName] = getAllValues.map((v: string) => {
    return processor(v, options.parser || "");
  });
};

export const a_getTitle = async (
  page: Page,
  options: GetTitleActionType["options"],
  finalResults: any
) => {
  finalResults[options.variableName] = await page.title();
};

export const a_getUrl = (
  page: Page,
  options: GetUrlActionType["options"],
  finalResults: any
) => {
  finalResults[options.variableName] = page.url();
};
