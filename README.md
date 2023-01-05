
![Logo](https://i.imgur.com/SCSk0rX.png)


# @owloops/flybird

[![npm version](https://img.shields.io/npm/v/@owloops/flybird)](https://www.npmjs.com/package/@owloops/flybird) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This repo provides tools to replay Owloops Tests exported from [Google Chrome DevTools' Recordings](https://goo.gle/devtools-recorder) programmatically.

Install [Owloops Chrome Recorder extension](https://github.com/Owloops/owloops-chrome-recorder-extension) if you want to export the recordings directly from the Chrome DevTools' Recorder UI.
## Installation

Install @owloops/flybird with npm

```bash
  npm install -g @owloops/flybird
```
    
To replay recordings using Puppeteer, install Puppeteer as well:

```
  npm install -g puppeteer
```
## Usage

### Via CLI

Download this [example recording](examples/aiprinted.json) and save it as `recording.json`.

Using CLI + npx:

```
npx @owloops/flybird recording.json
```

Using CLI + package.json:

In your `package.json` add a new script to invoke the `flybird` command:

```json
{
  "scripts": {
    "flybird": "flybird recording.json"
  }
}
```

You can also give folder name as a parameter to run all the files in a folder.

Using CLI + npx:

```bash
npx @owloops/flybird all-recordings # runs all recordings in the "all-recordings" folder.
```

Using CLI + package.json:

```json
{
  "scripts": {
    "flybird": "flybird all-recordings"
  }
}
```

Set the `PUPPETEER_HEADLESS` environment variable or `--headless` CLI flag to control whether the browser is start in a headful or headless mode. For example,

```
PUPPETEER_HEADLESS=true npx @puppeteer/replay recording.json # runs in headless mode, the default mode.
PUPPETEER_HEADLESS=false npx @puppeteer/replay recording.json # runs in headful mode.
```

Run `npx @puppeteer/replay --help` to see all CLI options.

### Via Import

```js
import { owl } from '@owloops/flybird';
import puppeteer from "puppeteer";

const testResults = await owl({
        headless: false,
        puppeteer,
        actions: [
        {
            "action": "goto",
            "options": {
                "url": "https://duckduckgo.com/?"
            }
        },
        {
            "action": "click",
            "options": {
                "querySelector": "#search_form_input_homepage",
                "rightClick": false,
                "preferredSelector": "querySelector",
                "xpathSelector": "xpath///*[@id=\"search_form_input_homepage\"]",
                "offsetX": 378.2312469482422,
                "offsetY": 27.162506103515625
            }
        },
        {
            "action": "input",
            "options": {
                "querySelector": "#search_form_input_homepage",
                "preferredSelector": "querySelector",
                "type": "input",
                "value": "Owloops",
                "xpathSelector": "xpath///*[@id=\"search_form_input_homepage\"]"
            }
        },
        {
            "action": "enter",
            "options": {}
        },
    ]});

return testResults;
```
## License

[![license](https://img.shields.io/badge/License-GNU%20GPLv3-blue.svg)](https://github.com/Owloops/flybird/blob/master/LICENSE)

This project is licensed under the terms of the [GPLv3 license](/LICENSE).

## Credits

The initial implementation was inspired by [@puppeteer/replay](https://github.com/puppeteer/replay)
