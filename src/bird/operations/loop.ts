import { Page } from "puppeteer-core";
import { fly } from "../fly";
import { AuthType, CompareOperationType, FlyRecordType } from "../../types";
import { prepareBird, processCompareOperation } from "../../utils";
export const a_loop = async (
  page: Page & { findRecaptchas: () => any; },
  options: {
    condition?: {
      querySelector: string;
      compareOperation?: CompareOperationType;
      compareValue?: string;
    };
    iteration?: string | number;
    loop: any[];
    loopName: string;
  },
  flyRecord: FlyRecordType,
  finalResutls: any,
  birdActions: any,
  birdCredits: { [x: string]: number },
  auth?: AuthType,
  logger?: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any
) => {
  finalResutls[options.loopName] = [];
  let n = 0;
  let iterations = options?.iteration ? Number(options?.iteration) : 0;
  if (iterations > 200) {
    iterations = 200;
  }
  const loopFunction = async (n: number) => {
    const loopResults = {};
    const { injectedBird: injectedLoop } = prepareBird(
      {
        skeleton: options.loop,
        variable_schema: {
          schema: {
            type: "object",
            required: [],
            properties: {
              [`i${options.loopName}`]: {
                type: "number",
              },
              [`i1${options.loopName}`]: {
                type: "number",
              },
            },
            additionalProperties: false,
          },
        },
      },
      {
        [`i${options.loopName}`]: n,
        [`i1${options.loopName}`]: n + 1,
      }
    );
    const loopFlyResuts = await fly({
      messagePrefix: `[loop[${n}] - ${options.loopName}] `,
      page,
      auth,
      actions: injectedLoop,
      flyRecord: flyRecord,
      finalResults: loopResults,
      birdActions,
      birdCredits,
      logger
    });
    flyRecord = loopFlyResuts.flyRecord;

    finalResutls[options.loopName].push(loopResults);
    return { flyRecord };
  };

  if (options?.condition?.querySelector) {
    while (
      await processCompareOperation(
        page,
        options.condition.querySelector,
        options.condition.compareOperation,
        options.condition.compareValue
      )
    ) {
      const callLoopFunction = await loopFunction(n);
      flyRecord = callLoopFunction.flyRecord;
      n += 1;
    }
  } else if (iterations > 0) {
    if (options?.iteration) {
      while (n < options?.iteration) {
        const callLoopFunction = await loopFunction(n);
        flyRecord = callLoopFunction.flyRecord;
        n += 1;
      }
    }
  }

  return { flyRecord };
};
