import * as crypto from "crypto";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { Page } from "puppeteer-core";
import { ext, isLambda } from "../../config/ext";
import { HTMLActionType } from "../../types";
import { uploadFileToS3 } from "../../utils";

export const a_getHtml = async (
  page: Page,
  options: HTMLActionType["options"],
  finalResults: any,
  userId: string,
  flyRecordId: string
) => {
  let htmlContent = await page.content();
  let s3Url: string;
  if (ext.s3.bucketName && isLambda) {
    s3Url = await uploadFileToS3(
      ext.s3.bucketName,
      Buffer.from(htmlContent),
      `${userId}/data/${flyRecordId}/${
        options.fileName
      }-${new Date().getTime()}.html`
    );
  } else {
    if (!existsSync('./html')){
      mkdirSync('./html');
    }
    writeFileSync(`html/${crypto.randomUUID()}.html`, htmlContent);
    s3Url = `html/${crypto.randomUUID()}.html`;
  }

  finalResults[options.fileName] = s3Url;
};
