import { MessageActionType } from "../../types";

export const a_message = async (options: MessageActionType["options"], finalResults: any) => {
  finalResults[options.messageName] = options.message;
};
