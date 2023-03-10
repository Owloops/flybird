import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getHeadlessEnvVar, getRecordingPaths, runFiles } from "./utils";
import * as readline from "readline";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import * as crypto from "crypto";

interface Arguments {
  files: string[];
  extension?: string;
  headless?: string;
}

// @ts-ignore
async function confirm(question: string) {
  const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    line.question(question, (response) => {
      line.close();
      resolve(response === "Y");
    });
  });
}

async function handleResults(results: object[]) {
  if (!existsSync("./flybird-results")) {
    mkdirSync("./flybird-results");
  }
  const JSONResults = JSON.stringify(results, null, 2);
  writeFileSync(`flybird-results/${crypto.randomUUID()}.json`, JSONResults);
}

yargs(hideBin(process.argv))
  .command(
    "$0 <files..>",
    "run files",
    () => {},
    async (argv) => {
      const args = argv as unknown as Arguments;
      const recordingPaths = getRecordingPaths(args.files);

      const results = await runFiles(recordingPaths, {
        log: true,
        headless: getHeadlessEnvVar(
          args.headless || process.env["PUPPETEER_HEADLESS"]
        ),
        extension: args.extension,
      });
      await handleResults(results);
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
