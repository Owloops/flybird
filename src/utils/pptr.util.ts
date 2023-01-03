// @ts-nocheck
// https://github.com/puppeteer/replay/blob/main/src/PuppeteerRunnerExtension.ts

/**
 * Copyright 2022 Loopback LLC
 * Added a logger, either local or cloud, for the waitForSelectors function.
 * Added finalResults object, which has recommendations sub-object indicating requested and preferred selectors in the final output.
 */

import { Browser, ElementHandle, Frame, Page } from "puppeteer-core";
import { AssertedEventType, FlyRecordType, Selector, Step, WaitForElementStep } from "../types";

const comparators = {
  '==': (a: number, b: number): boolean => a === b,
  '>=': (a: number, b: number): boolean => a >= b,
  '<=': (a: number, b: number): boolean => a <= b,
};

async function getFrame(pageOrFrame: Page | Frame, step: Step): Promise<Frame> {
  let frame =
    'mainFrame' in pageOrFrame ? pageOrFrame.mainFrame() : pageOrFrame;
  if ('frame' in step && step.frame) {
    for (const index of step.frame) {
      frame = frame.childFrames()[index]!;
    }
  }
  return frame;
}

async function getTargetPageForStep(
  browser: Browser,
  page: Page,
  step: Step,
  timeout: number
): Promise<Page | null> {
  if (!step.target || step.target === 'main') {
    return page;
  }

  const target = await browser.waitForTarget((t) => t.url() === step.target, {
    timeout,
  });
  const targetPage = await target.page();

  if (!targetPage) {
    return null;
  }

  targetPage.setDefaultTimeout(timeout);

  return targetPage;
}

async function waitForEvents(
  pageOrFrame: Page | Frame,
  step: Step,
  timeout: number
): Promise<void> {
  const promises: Promise<unknown>[] = [];
  if (step.assertedEvents) {
    for (const event of step.assertedEvents) {
      switch (event.type) {
        case AssertedEventType.Navigation: {
          promises.push(
            pageOrFrame.waitForNavigation({
              timeout,
            })
          );
          continue;
        }
        default:
          throw new Error(`Event type ${event.type} is not supported`);
      }
    }
  }
  await Promise.all(promises);
}

async function waitForElement(
  step: WaitForElementStep,
  frame: Frame | Page,
  timeout: number
): Promise<void> {
  const {
    count = 1,
    operator = '>=',
    visible = true,
    properties,
    attributes,
  } = step;
  const compFn = comparators[operator];
  await waitForFunction(async () => {
    const elements = await querySelectorsAll(step.selectors, frame);
    let result = compFn(elements.length, count);
    const elementsHandle = await frame.evaluateHandle((...elements) => {
      return elements;
    }, ...elements);
    await Promise.all(elements.map((element) => element.dispose()));
    if (result && (properties || attributes)) {
      result = await elementsHandle.evaluate(
        (elements, properties, attributes) => {
          if (attributes) {
            for (const element of elements) {
              for (const [name, value] of Object.entries(attributes)) {
                if (element.getAttribute(name) !== value) {
                  return false;
                }
              }
            }
          }
          if (properties) {
            for (const element of elements) {
              if (!isDeepMatch(properties, element)) {
                return false;
              }
            }
          }
          return true;

          function isDeepMatch<T>(a: T, b: unknown): b is T {
            if (a === b) {
              return true;
            }
            if ((a && !b) || (!a && b)) {
              return false;
            }
            if (!(a instanceof Object) || !(b instanceof Object)) {
              return false;
            }
            for (const [key, value] of Object.entries(a)) {
              if (!isDeepMatch(value, (b as Record<string, unknown>)[key])) {
                return false;
              }
            }
            return true;
          }
        },
        properties,
        attributes
      );
    }
    await elementsHandle.dispose();
    return result === visible;
  }, timeout);
}

const asSVGElementHandle = async (
  handle: ElementHandle<Element>
): Promise<ElementHandle<SVGElement> | null> => {
  if (
    await handle.evaluate((element) => {
      /* c8 ignore start */
      return element instanceof SVGElement;
      /* c8 ignore stop */
    })
  ) {
    return handle as ElementHandle<SVGElement>;
  } else {
    return null;
  }
};

export async function scrollIntoViewIfNeeded(
  selectors: Selector[],
  frame: Frame | Page,
  timeout: number,
  flyRecord: FlyRecordType,
  finalResults: any,
  logger: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any
): Promise<void> {
  const element = await waitForSelectors(selectors, frame, {
    visible: false,
    timeout,
  }, flyRecord, finalResults, logger);
  if (!element) {
    throw new Error('The element could not be found.');
  }
  await waitForConnected(element, timeout);
  const svgHandle = await asSVGElementHandle(element);
  const intersectionTarget = svgHandle
    ? await getOwnerSVGElement(svgHandle)
    : element;
  const isInViewport = intersectionTarget
    ? await intersectionTarget.isIntersectingViewport({ threshold: 0 })
    : false;
  if (isInViewport) {
    return;
  }
  await scrollIntoView(element);
  if (intersectionTarget) {
    await waitForInViewport(intersectionTarget, timeout);
  }
}

async function getOwnerSVGElement(
  handle: ElementHandle<SVGElement>
): Promise<ElementHandle<SVGSVGElement>> {
  return await handle.evaluateHandle((element) => {
    /* c8 ignore start */
    return element.ownerSVGElement!;
    /* c8 ignore stop */
  });
}

async function scrollIntoView(element: ElementHandle<Element>): Promise<void> {
  await element.evaluate((element) => {
    /* c8 ignore start */
    element.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'auto',
    });
    /* c8 ignore stop */
  });
}

async function waitForConnected(
  element: ElementHandle<Element>,
  timeout: number
): Promise<void> {
  await waitForFunction(async () => {
    /* c8 ignore start */
    return await element.evaluate((el) => el.isConnected);
    /* c8 ignore stop */
  }, timeout);
}

async function waitForInViewport(
  element: ElementHandle<Element>,
  timeout: number
): Promise<void> {
  await waitForFunction(async () => {
    return await element.isIntersectingViewport({ threshold: 0 });
  }, timeout);
}

interface WaitForOptions {
  timeout: number;
  visible: boolean;
}

export async function waitForSelectors(
  selectors: Selector[],
  frame: Frame | Page,
  options: WaitForOptions,
  flyRecord: FlyRecordType,
  finalResults: any,
  logger: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any
): Promise<ElementHandle<Element>> {
  let counter = 0;
  let usedSelector: string;
  for (const selector of selectors) {
    usedSelector = selector[0];
    counter++;
    if (counter > 1) {
      await logger(
        'waitForSelector',
        `Trying fallback selector ${selector}...`,
        "info",
        flyRecord,
        { "no-credit": 0 }
      );
    }

    try {
      const elem = await waitForSelector(selector, frame, options);
      if (usedSelector !== selectors[0][0]) {
        if (!finalResults["recommendations"]) {
          finalResults["recommendations"] = [];
        }
        if (!finalResults["recommendations"].find((recommendation: { [x: string]: string; }) => recommendation["requested"] === selectors[0][0])) {
          finalResults["recommendations"].push({"requested": selectors[0][0], "preferred": usedSelector});
        }
      }
      return elem;
    } catch (err) {
      console.error('error in waitForSelectors', err);
    }
  }
  throw new Error(
    'Could not find element for selectors: ' + JSON.stringify(selectors)
  );
}

async function waitForSelector(
  selector: Selector,
  frame: Frame | Page,
  options: WaitForOptions
): Promise<ElementHandle<Element>> {
  if (!Array.isArray(selector)) {
    selector = [selector];
  }
  if (!selector.length) {
    throw new Error('Empty selector provided to `waitForSelector`');
  }
  let isLastPart = selector.length === 1;
  let handle = await frame.waitForSelector(selector[0]!, {
    ...options,
    visible: isLastPart && options.visible,
  });
  for (const part of selector.slice(1, selector.length)) {
    if (!handle) {
      throw new Error('Could not find element: ' + selector.join('>>'));
    }
    const innerHandle = await handle.evaluateHandle((el) =>
      el.shadowRoot ? el.shadowRoot : el
    );
    handle.dispose();
    isLastPart = selector[selector.length - 1] === part;
    handle = await innerHandle.waitForSelector(part, {
      ...options,
      visible: isLastPart && options.visible,
    });
    innerHandle.dispose();
  }
  if (!handle) {
    throw new Error('Could not find element: ' + selector.join('>>'));
  }
  return handle;
}

async function querySelectorsAll(
  selectors: Selector[],
  frame: Frame | Page
): Promise<ElementHandle<Element>[]> {
  for (const selector of selectors) {
    const result = await querySelectorAll(selector, frame);
    if (result.length) {
      return result;
    }
  }
  return [];
}

async function querySelectorAll(
  selector: Selector,
  frame: Frame | Page
): Promise<ElementHandle<Element>[]> {
  if (!Array.isArray(selector)) {
    selector = [selector];
  }
  if (!selector.length) {
    throw new Error('Empty selector provided to querySelectorAll');
  }
  let elementHandles = await frame.$$(selector[0]!);
  if (!elementHandles.length) {
    return [];
  }
  for (const part of selector.slice(1, selector.length)) {
    elementHandles = (
      await Promise.all(
        elementHandles.map(async (handle) => {
          const innerHandle = await handle.evaluateHandle((el) =>
            el.shadowRoot ? el.shadowRoot : el
          );
          const elementHandles = await innerHandle.$$(part);
          innerHandle.dispose();
          handle.dispose();
          return elementHandles;
        })
      )
    ).flat();
    if (!elementHandles.length) {
      return [];
    }
  }
  return elementHandles;
}

async function waitForFunction(
  fn: () => unknown,
  timeout: number
): Promise<void> {
  let isActive = true;
  const timeoutId = setTimeout(() => {
    isActive = false;
  }, timeout);
  while (isActive) {
    const result = await fn();
    if (result) {
      clearTimeout(timeoutId);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Timed out');
}