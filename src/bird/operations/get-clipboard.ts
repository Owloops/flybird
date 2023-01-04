import { read } from "clipboardy";
import { GetClipboardActionType } from "../../types";

export const a_getClipboard = async (
  options: GetClipboardActionType["options"],
  finalResults: any
) => {
  try {
    const clipboardValue = await read();
    finalResults[options.variableName] = clipboardValue;
  } catch (e) {
    console.error(e);
    finalResults[options.variableName] = "Failed to get clipboard";
  }
};
