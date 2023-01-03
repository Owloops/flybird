import { GetDateTimeActionType } from "../../types";

export const a_getDateTime = async (
  options: GetDateTimeActionType["options"],
  finalResults: any
) => {
  const dateTime = new Date().toLocaleString("de-DE", {
    timeZone: options.timezone || "America/Cuiaba",
  });
  const date = dateTime.split(",")[0];
  const time = dateTime.split(",")[1];
  finalResults[options?.timezone || "dateTime"] = { date: date, time: time };
};
