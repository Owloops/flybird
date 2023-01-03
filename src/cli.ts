import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getHeadlessEnvVar, getRecordingPaths, runFiles } from "./utils";

interface Arguments {
  files: string[];
  extension?: string;
  headless?: string;
}

yargs(hideBin(process.argv))
  .command(
    "$0 <files..>",
    "run files",
    () => {},
    async (argv) => {
      const args = argv as unknown as Arguments;
      const recordingPaths = getRecordingPaths(args.files);

      await runFiles(recordingPaths, {
        log: true,
        headless: getHeadlessEnvVar(
          args.headless || process.env["PUPPETEER_HEADLESS"]
        ),
        extension: args.extension,
      });
    }
  )
  .option("headless", {
    type: "string",
    description: "Run using the browser's headless mode.",
    choices: ["new", "true", "1", "0", "false"],
  })
  .option("extension", {
    alias: "ext",
    type: "string",
    description: "Run using an extension identified by the path.",
  })
  .parse();
