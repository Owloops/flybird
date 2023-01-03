import { BirdError } from "../../utils";
import { EndBirdActionType } from "../../types";
export const a_endBird = async (
  options: EndBirdActionType["options"],
  finalResults: any,
  flyRecord: any
) => {
  finalResults["end-bird"] = options?.conclusion;
  throw new BirdError({
    code: "End bird detected",
    message: "",
    data: {
      flyRecord,
      finalResults,
    },
  });
};
