import { Page } from 'puppeteer-core';
import { fly } from '../fly';
import { processCompareOperation } from '../../utils';
import { ActionType, AuthType, FlyRecordType, CompareOperationType } from '../../types';
export const a_condition = async (
  page: Page & { findRecaptchas: () => any },
  options: {
    condition: {
      querySelector: string;
      compareOperation?: CompareOperationType;
      compareValue?: string;
    };
    ifTrue: ActionType[];
    ifFalse: ActionType[];
  },
  flyRecord: FlyRecordType,
  finalResults: any,
  birdActions: any,
  birdCredits: { [x: string]: number; },
  logger: (
    action: string,
    message: string,
    type: string,
    flyRecord: FlyRecordType,
    birdCredits?: { [x: string]: number }
  ) => any,
  auth?: AuthType,
) => {
  const condition = await processCompareOperation(
    page,
    options.condition.querySelector,
    options.condition.compareOperation,
    options.condition.compareValue
  );
  flyRecord = await logger(
    'condition',
    condition ? `Condition - True` : `Condition - False`,
    "info",
    flyRecord,
    birdCredits
  );
  const conditionFlyResults = await fly({
    messagePrefix: condition ? '[condition - True] ' : `[condition - False] `,
    page,
    auth,
    actions: condition ? options?.ifTrue : options?.ifFalse,
    flyRecord,
    finalResults,
    birdActions,
    birdCredits,
  });
  finalResults = conditionFlyResults.finalResults;
  flyRecord = conditionFlyResults.flyRecord;

  return { flyRecord };
};
