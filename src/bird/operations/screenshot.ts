import * as crypto from "crypto";
import { Page } from "puppeteer-core";
import { existsSync, mkdirSync } from "fs";
import { ext, isLambda } from "../../config/ext";
import { ScreenshotActionType } from "../../types";
import { waitForTimeout, uploadFileToS3 } from "../../utils";

export const a_screenshot = async (
  page: Page,
  options: ScreenshotActionType["options"],
  finalResults: any,
  userId: string,
  flyRecordId: string
) => {
  await waitForTimeout(1000);
  const localScreenPath = `flybird-screenshot/${crypto.randomUUID()}.jpeg`;
  if (!isLambda) {
    if (!existsSync('./flybird-screenshot')){
      mkdirSync('./flybird-screenshot');
    }
  }
  let screenshot = await page.screenshot({
    fullPage:
      options?.fullPage === "true" || options?.fullPage === true ? true : false,
    encoding: "binary",
    type: "jpeg",
    quality: 90,
    path: !isLambda ? localScreenPath : undefined,
  });

  let s3Url: string;
  if (ext.s3.bucketName && isLambda) {
    s3Url = await uploadFileToS3(
      ext.s3.bucketName,
      screenshot,
      `${userId}/data/${flyRecordId}/${
        options.fileName
      }-${new Date().getTime()}.jpg`
    );
  } else {
    s3Url = localScreenPath;
  }

  finalResults[options.fileName] = s3Url;
};
