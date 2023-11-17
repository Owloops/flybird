// @ts-nocheck
import ns from 'number-string';
// import getUrls from 'get-urls';
import { ParserType, CompareOperationType } from '../types';
import * as chrono from 'chrono-node';
import { ElementHandle, Page } from 'puppeteer-core';
import { extractEmails } from './email.util';
import { getUrls } from '../utils'

export const processor = (data: string, parser: ParserType) => {
  switch (parser) {
    case 'Numbers (Extract Number)':
      return isNaN(ns.toNumber(data)) ? null : ns.toNumber(data);

    case 'Email (Extract First Matching Email)':
      return extractEmails(data)[0] || null;

    case 'Emails (Extract All Matching Emails)':
      return extractEmails(data);

    case 'URL (Extract First Matching URL)':
      return Array.from(getUrls(data))[0] || null;

    case 'URLs (Extract All Matching URLs)':
      return Array.from(getUrls(data));

    case 'Split by Space':
      return data.split(' ')?.map((a) => a.trim());

    case 'Split by Comma':
      return data.split(',')?.map((a) => a.trim());

    default:
      return data;
  }
};

export const processCompareOperation = async (
  page: Page,
  querySelector: string,
  compareOperation?: CompareOperationType,
  compareValue?: string
) => {
  let condition: boolean | ElementHandle<Element> | null | undefined;
  let operation: string | undefined;
  try {
    if (compareOperation?.startsWith('Link')) {
      operation = await page.$eval(querySelector, (el: any) => el.href);
    } else {
      operation = await page.$eval(querySelector, (el: any) => el.innerText);
    }
    switch (compareOperation) {
      case 'Element Exists':
        // @ts-ignore
        condition = await page.$(querySelector);
        break;
      case 'Date Earlier Than':
        condition =
          chrono.parseDate(compareValue || '') > chrono.parseDate(operation || '');
        break;
      case 'Date Later Than':
        condition =
          chrono.parseDate(compareValue || '') < chrono.parseDate(operation || '');
        break;
      case 'Number Less Than':
        condition = parseInt(compareValue || '') > parseInt(operation || '');
        break;
      case 'Number Greater Than':
        condition = parseInt(compareValue || '') < parseInt(operation || '');
        break;
      case 'Text Ends With':
        condition = operation?.endsWith(compareValue || '');
        break;
      case 'Text Includes':
        condition = operation?.includes(compareValue || '');
        break;
      case 'Text Matches':
        condition = compareValue === operation;
        break;
      case 'Text Starts With':
        condition = operation?.startsWith(compareValue || '');
        break;
      case 'Link Includes':
        condition = operation?.includes(compareValue || '');
        break;
      case 'Link Matches':
        condition = compareValue === operation;
        break;
      case 'Link Starts With':
        condition = operation?.startsWith(compareValue || '');
        break;
      case 'Link Ends With':
        condition = operation?.endsWith(compareValue || '');
        break;
      default:
        condition = await page.$(querySelector);
        break;
    }
  } catch (e) {
    console.log(e);
    condition = false;
  }
  return condition;
};
