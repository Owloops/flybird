import { FlyRecordType } from "../types";

export const localLogger = async (
  action: string,
  message: string,
  type: string,
  flyRecord: FlyRecordType,
  birdCredits?: { [x: string]: number }
) => {
  const log = {
    data: {},
    action,
    status: "running",
    message: `${type}: ${message}`,
    time: new Date().toISOString(),
  };
  console.table(log);

  flyRecord.id = "local";
  flyRecord?.logs.push(log);
  flyRecord.status = "running";
  flyRecord.credits_used = birdCredits?.[action] || 0;

  return flyRecord;
};
