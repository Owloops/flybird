import { owl } from "../src/bird";
import puppeteer from "puppeteer";

owl({
    puppeteer,
    actions: [
    {
        "action": "set-viewport",
        "options": {
            "width": 1374,
            "height": 397
        }
    },
    {
        "action": "goto",
        "options": {
            "url": "https://aiprinted.art/"
        }
    },
    {
        "action": "wait",
        "options": {
            "for": "time",
            "time": 5000,
        }
    },
    {
        "action": "condition",
        "options": {
            "condition": {
                "querySelector": ".recommendation-modal__close-button",
                "compareOperation": "Element Exists"
            },
            "ifTrue": [{
                "action": "click",
                "options": {
                    "querySelector": ".recommendation-modal__close-button"
                }
            }],
            "ifFalse": [{
                "action": "end-bird",
                "options": {
                    "conclusion": "done"
                }
            }]
        }
    },
    {
        "action": "wait",
        "options": {
            "for": "time",
            "time": 3000,
        }
    },
    {
        "action": "click",
        "options": {
            "offsetX": 121.73153686523438,
            "offsetY": 18.086654663085938,
            "rightClick": false,
            "ariaSelector": "aria/Text to Product AI generators",
            "querySelector": "#Search-In-Template",
            "xpathSelector": "xpath///*[@id=\"Search-In-Template\"]",
            "preferredSelector": "ariaSelector"
        }
    },
    {
        "action": "input",
        "options": {
            "type": "input",
            "value": "cute",
            "ariaSelector": "aria/Text to Product AI generator",
            "querySelector": "#Search-In-Template",
            "xpathSelector": "xpath///*[@id=\"Search-In-Template\"]",
            "preferredSelector": "querySelector"
        }
    },
    {
        "action": "click",
        "options": {
            "offsetX": 53.4261474609375,
            "offsetY": 24.086654663085938,
            "rightClick": false,
            "ariaSelector": "aria/Hoodie",
            "querySelector": "#product_dropdown_input",
            "xpathSelector": "xpath///*[@id=\"product_dropdown_input\"]",
            "preferredSelector": "querySelector"
        }
    },
    {
        "action": "input",
        "options": {
            "type": "input",
            "value": "Canvas",
            "ariaSelector": "aria/Hoodie",
            "querySelector": "#product_dropdown_input",
            "xpathSelector": "xpath///*[@id=\"product_dropdown_input\"]",
            "preferredSelector": "querySelector"
        }
    },
    {
        "action": "screenshot",
        "options": {
            "fullPage": false,
            "fileName": "screen"
        }
    }
]});