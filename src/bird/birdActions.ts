export const birdActionsData = [
    {
        "id": "enter",
        "description": "Presses the enter key",
        "option_schema": {
            "type": "object",
            "required": [],
            "properties": {},
            "additionalProperties": false
        },
        "created_at": "2021-02-02T04:26:11.903477+00:00",
        "credits": 1,
        "options_description": {},
        "order": 8000,
        "example": [
            {
                "ex": {
                    "action": "enter",
                    "options": {}
                },
                "title": "Example 1: Press enter key"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "get-title",
        "description": "Gets the title of the current page",
        "option_schema": {
            "type": "object",
            "required": [
                "variableName"
            ],
            "properties": {
                "variableName": {
                    "type": "string",
                    "title": "VariableName",
                    "description": "Name of the variable"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-03T05:11:32.879641+00:00",
        "credits": 1,
        "options_description": {
            "variableName": "Name of the variable to store the title in"
        },
        "order": 11000,
        "example": [
            {
                "ex": {
                    "action": "get-title",
                    "options": {
                        "variableName": "title"
                    }
                },
                "title": "Example 1: Get the title of the page"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "get-url",
        "description": "Gets the url of the current page",
        "option_schema": {
            "type": "object",
            "required": [
                "variableName"
            ],
            "properties": {
                "variableName": {
                    "type": "string",
                    "title": "VariableName",
                    "description": "Name of the variable"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-03T05:11:33.672128+00:00",
        "credits": 1,
        "options_description": {
            "variableName": "Name of the variable to store the URL in"
        },
        "order": 12000,
        "example": [
            {
                "ex": {
                    "action": "get-url",
                    "options": {
                        "variableName": "pageUrl"
                    }
                },
                "title": "Example 1: Get the url of the page"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "get-data",
        "description": "Get data from multiple repeated places under the same parent element",
        "option_schema": {
            "type": "object",
            "required": [
                "dataName",
                "parentSelector",
                "data"
            ],
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "variableName",
                            "value",
                            "querySelector"
                        ],
                        "properties": {
                            "value": {
                                "type": "string",
                                "title": "Value",
                                "examples": [
                                    "text",
                                    "link",
                                    "image",
                                    "textContent",
                                    "innerHtml"
                                ],
                                "description": "ex: text, link, image etc. Also any attribute of the element will work"
                            },
                            "parser": {
                                "enum": [
                                    "",
                                    "Numbers (Extract Number)",
                                    "Email (Extract First Matching Email)",
                                    "Emails (Extract All Matching Emails)",
                                    "URL (Extract First Matching URL)",
                                    "URLs (Extract All Matching URLs)",
                                    "Split by Space",
                                    "Split by Comma"
                                ],
                                "type": "string",
                                "title": "Parser",
                                "description": "Parse output data to meaningful data"
                            },
                            "variableName": {
                                "type": "string",
                                "title": "Variable Name",
                                "description": "Name of the variable to store the value in"
                            },
                            "querySelector": {
                                "type": "string",
                                "title": "QuerySelector",
                                "description": "Relative QuerySelector of the element to get - relative to the parent element"
                            }
                        },
                        "additionalProperties": false
                    },
                    "title": "Data to collect",
                    "description": "Data to collect"
                },
                "dataName": {
                    "type": "string",
                    "title": "DataName",
                    "description": "Name of the data"
                },
                "parentSelector": {
                    "type": "string",
                    "title": "ParentSelector",
                    "description": "QuerySelector of the parent element"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-06-01T06:18:24.719302+00:00",
        "credits": 1,
        "options_description": {
            "data": "Data to collect - { value, variableName, querySelector, parser }",
            "dataName": "Name of the data",
            "parentSelector": "QuerySelector of the parent element"
        },
        "order": 5500,
        "example": [
            {
                "ex": {
                    "action": "get-data",
                    "options": {
                        "data": [
                            {
                                "value": "link",
                                "variableName": "searchLink",
                                "querySelector": "a"
                            }
                        ],
                        "dataName": "searchResults",
                        "parentSelector": ".g"
                    }
                },
                "title": "Example 1: Get google search results"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "html",
        "description": "Extracts the html of the whole page",
        "option_schema": {
            "type": "object",
            "required": [
                "fileName"
            ],
            "properties": {
                "fileName": {
                    "type": "string",
                    "title": "FileName",
                    "description": "Name of the html"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-01T10:44:09.371722+00:00",
        "credits": 1,
        "options_description": {
            "fileName": "Name to be given for the html file"
        },
        "order": 10000,
        "example": [
            {
                "ex": {
                    "action": "html",
                    "options": {
                        "fileName": "$fileName"
                    }
                },
                "title": "Example 1: Get the html code of the page"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "screenshot",
        "description": "Captures a screenshot of the page",
        "option_schema": {
            "type": "object",
            "required": [
                "fileName"
            ],
            "properties": {
                "fileName": {
                    "type": "string",
                    "title": "FileName",
                    "description": "Name of the screenshot"
                },
                "fullPage": {
                    "type": "boolean",
                    "title": "FullPage",
                    "description": "Capture full page screenshot"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-01T10:44:08.658556+00:00",
        "credits": 1,
        "options_description": {
            "fileName": "Name to be given for the screenshot",
            "fullPage": "Size of the screenshot full page or screen size true | false"
        },
        "order": 9000,
        "example": [
            {
                "ex": {
                    "action": "screenshot",
                    "options": {
                        "fileName": "$fileName",
                        "fullPage": false
                    }
                },
                "title": "Example 1: Capture area screenshot"
            },
            {
                "ex": {
                    "action": "screenshot",
                    "options": {
                        "fileName": "$fileName",
                        "fullPage": true
                    }
                },
                "title": "Example 2: Capture full-page screenshot"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "get-dateTime",
        "description": "Get date and time of specific timezone",
        "option_schema": {
            "type": "object",
            "required": [],
            "properties": {
                "timezone": {
                    "enum": [
                        "",
                        "Africa/Abidjan",
                        "Africa/Accra",
                        "Africa/Algiers",
                        "Africa/Bissau",
                        "Africa/Cairo",
                        "Africa/Casablanca",
                        "Africa/Ceuta",
                        "Africa/El_Aaiun",
                        "Africa/Johannesburg",
                        "Africa/Juba",
                        "Africa/Khartoum",
                        "Africa/Lagos",
                        "Africa/Maputo",
                        "Africa/Monrovia",
                        "Africa/Nairobi",
                        "Africa/Ndjamena",
                        "Africa/Sao_Tome",
                        "Africa/Tripoli",
                        "Africa/Tunis",
                        "Africa/Windhoek",
                        "America/Adak",
                        "America/Anchorage",
                        "America/Araguaina",
                        "America/Argentina/Buenos_Aires",
                        "America/Argentina/Catamarca",
                        "America/Argentina/Cordoba",
                        "America/Argentina/Jujuy",
                        "America/Argentina/La_Rioja",
                        "America/Argentina/Mendoza",
                        "America/Argentina/Rio_Gallegos",
                        "America/Argentina/Salta",
                        "America/Argentina/San_Juan",
                        "America/Argentina/San_Luis",
                        "America/Argentina/Tucuman",
                        "America/Argentina/Ushuaia",
                        "America/Asuncion",
                        "America/Atikokan",
                        "America/Bahia",
                        "America/Bahia_Banderas",
                        "America/Barbados",
                        "America/Belem",
                        "America/Belize",
                        "America/Blanc-Sablon",
                        "America/Boa_Vista",
                        "America/Bogota",
                        "America/Boise",
                        "America/Cambridge_Bay",
                        "America/Campo_Grande",
                        "America/Cancun",
                        "America/Caracas",
                        "America/Cayenne",
                        "America/Chicago",
                        "America/Chihuahua",
                        "America/Costa_Rica",
                        "America/Creston",
                        "America/Cuiaba",
                        "America/Curacao",
                        "America/Danmarkshavn",
                        "America/Dawson",
                        "America/Dawson_Creek",
                        "America/Denver",
                        "America/Detroit",
                        "America/Edmonton",
                        "America/Eirunepe",
                        "America/El_Salvador",
                        "America/Fort_Nelson",
                        "America/Fortaleza",
                        "America/Glace_Bay",
                        "America/Goose_Bay",
                        "America/Grand_Turk",
                        "America/Guatemala",
                        "America/Guayaquil",
                        "America/Guyana",
                        "America/Halifax",
                        "America/Havana",
                        "America/Hermosillo",
                        "America/Indiana/Indianapolis",
                        "America/Indiana/Knox",
                        "America/Indiana/Marengo",
                        "America/Indiana/Petersburg",
                        "America/Indiana/Tell_City",
                        "America/Indiana/Vevay",
                        "America/Indiana/Vincennes",
                        "America/Indiana/Winamac",
                        "America/Inuvik",
                        "America/Iqaluit",
                        "America/Jamaica",
                        "America/Juneau",
                        "America/Kentucky/Louisville",
                        "America/Kentucky/Monticello",
                        "America/La_Paz",
                        "America/Lima",
                        "America/Los_Angeles",
                        "America/Maceio",
                        "America/Managua",
                        "America/Manaus",
                        "America/Martinique",
                        "America/Matamoros",
                        "America/Mazatlan",
                        "America/Menominee",
                        "America/Merida",
                        "America/Metlakatla",
                        "America/Mexico_City",
                        "America/Miquelon",
                        "America/Moncton",
                        "America/Monterrey",
                        "America/Montevideo",
                        "America/Nassau",
                        "America/New_York",
                        "America/Nipigon",
                        "America/Nome",
                        "America/Noronha",
                        "America/North_Dakota/Beulah",
                        "America/North_Dakota/Center",
                        "America/North_Dakota/New_Salem",
                        "America/Nuuk",
                        "America/Ojinaga",
                        "America/Panama",
                        "America/Pangnirtung",
                        "America/Paramaribo",
                        "America/Phoenix",
                        "America/Port-au-Prince",
                        "America/Port_of_Spain",
                        "America/Porto_Velho",
                        "America/Puerto_Rico",
                        "America/Punta_Arenas",
                        "America/Rainy_River",
                        "America/Rankin_Inlet",
                        "America/Recife",
                        "America/Regina",
                        "America/Resolute",
                        "America/Rio_Branco",
                        "America/Santarem",
                        "America/Santiago",
                        "America/Santo_Domingo",
                        "America/Sao_Paulo",
                        "America/Scoresbysund",
                        "America/Sitka",
                        "America/St_Johns",
                        "America/Swift_Current",
                        "America/Tegucigalpa",
                        "America/Thule",
                        "America/Thunder_Bay",
                        "America/Tijuana",
                        "America/Toronto",
                        "America/Vancouver",
                        "America/Whitehorse",
                        "America/Winnipeg",
                        "America/Yakutat",
                        "America/Yellowknife",
                        "Antarctica/Casey",
                        "Antarctica/Davis",
                        "Antarctica/DumontDUrville",
                        "Antarctica/Macquarie",
                        "Antarctica/Mawson",
                        "Antarctica/Palmer",
                        "Antarctica/Rothera",
                        "Antarctica/Syowa",
                        "Antarctica/Troll",
                        "Antarctica/Vostok",
                        "Asia/Almaty",
                        "Asia/Amman",
                        "Asia/Anadyr",
                        "Asia/Aqtau",
                        "Asia/Aqtobe",
                        "Asia/Ashgabat",
                        "Asia/Atyrau",
                        "Asia/Baghdad",
                        "Asia/Baku",
                        "Asia/Bangkok",
                        "Asia/Barnaul",
                        "Asia/Beirut",
                        "Asia/Bishkek",
                        "Asia/Brunei",
                        "Asia/Chita",
                        "Asia/Choibalsan",
                        "Asia/Colombo",
                        "Asia/Damascus",
                        "Asia/Dhaka",
                        "Asia/Dili",
                        "Asia/Dubai",
                        "Asia/Dushanbe",
                        "Asia/Famagusta",
                        "Asia/Gaza",
                        "Asia/Hebron",
                        "Asia/Ho_Chi_Minh",
                        "Asia/Hong_Kong",
                        "Asia/Hovd",
                        "Asia/Irkutsk",
                        "Asia/Jakarta",
                        "Asia/Jayapura",
                        "Asia/Jerusalem",
                        "Asia/Kabul",
                        "Asia/Kamchatka",
                        "Asia/Karachi",
                        "Asia/Kathmandu",
                        "Asia/Khandyga",
                        "Asia/Kolkata",
                        "Asia/Krasnoyarsk",
                        "Asia/Kuala_Lumpur",
                        "Asia/Kuching",
                        "Asia/Macau",
                        "Asia/Magadan",
                        "Asia/Makassar",
                        "Asia/Manila",
                        "Asia/Nicosia",
                        "Asia/Novokuznetsk",
                        "Asia/Novosibirsk",
                        "Asia/Omsk",
                        "Asia/Oral",
                        "Asia/Pontianak",
                        "Asia/Pyongyang",
                        "Asia/Qatar",
                        "Asia/Qostanay",
                        "Asia/Qyzylorda",
                        "Asia/Riyadh",
                        "Asia/Sakhalin",
                        "Asia/Samarkand",
                        "Asia/Seoul",
                        "Asia/Shanghai",
                        "Asia/Singapore",
                        "Asia/Srednekolymsk",
                        "Asia/Taipei",
                        "Asia/Tashkent",
                        "Asia/Tbilisi",
                        "Asia/Tehran",
                        "Asia/Thimphu",
                        "Asia/Tokyo",
                        "Asia/Tomsk",
                        "Asia/Ulaanbaatar",
                        "Asia/Urumqi",
                        "Asia/Ust-Nera",
                        "Asia/Vladivostok",
                        "Asia/Yakutsk",
                        "Asia/Yangon",
                        "Asia/Yekaterinburg",
                        "Asia/Yerevan",
                        "Atlantic/Azores",
                        "Atlantic/Bermuda",
                        "Atlantic/Canary",
                        "Atlantic/Cape_Verde",
                        "Atlantic/Faroe",
                        "Atlantic/Madeira",
                        "Atlantic/Reykjavik",
                        "Atlantic/South_Georgia",
                        "Atlantic/Stanley",
                        "Australia/Adelaide",
                        "Australia/Brisbane",
                        "Australia/Broken_Hill",
                        "Australia/Darwin",
                        "Australia/Eucla",
                        "Australia/Hobart",
                        "Australia/Lindeman",
                        "Australia/Lord_Howe",
                        "Australia/Melbourne",
                        "Australia/Perth",
                        "Australia/Sydney",
                        "CET",
                        "CST6CDT",
                        "EET",
                        "EST",
                        "EST5EDT",
                        "Etc/GMT",
                        "Etc/GMT+1",
                        "Etc/GMT+10",
                        "Etc/GMT+11",
                        "Etc/GMT+12",
                        "Etc/GMT+2",
                        "Etc/GMT+3",
                        "Etc/GMT+4",
                        "Etc/GMT+5",
                        "Etc/GMT+6",
                        "Etc/GMT+7",
                        "Etc/GMT+8",
                        "Etc/GMT+9",
                        "Etc/GMT-1",
                        "Etc/GMT-10",
                        "Etc/GMT-11",
                        "Etc/GMT-12",
                        "Etc/GMT-13",
                        "Etc/GMT-14",
                        "Etc/GMT-2",
                        "Etc/GMT-3",
                        "Etc/GMT-4",
                        "Etc/GMT-5",
                        "Etc/GMT-6",
                        "Etc/GMT-7",
                        "Etc/GMT-8",
                        "Etc/GMT-9",
                        "Etc/UTC",
                        "Europe/Amsterdam",
                        "Europe/Andorra",
                        "Europe/Astrakhan",
                        "Europe/Athens",
                        "Europe/Belgrade",
                        "Europe/Berlin",
                        "Europe/Brussels",
                        "Europe/Bucharest",
                        "Europe/Budapest",
                        "Europe/Chisinau",
                        "Europe/Copenhagen",
                        "Europe/Dublin",
                        "Europe/Gibraltar",
                        "Europe/Helsinki",
                        "Europe/Istanbul",
                        "Europe/Kaliningrad",
                        "Europe/Kiev",
                        "Europe/Kirov",
                        "Europe/Lisbon",
                        "Europe/London",
                        "Europe/Luxembourg",
                        "Europe/Madrid",
                        "Europe/Malta",
                        "Europe/Minsk",
                        "Europe/Monaco",
                        "Europe/Moscow",
                        "Europe/Oslo",
                        "Europe/Paris",
                        "Europe/Prague",
                        "Europe/Riga",
                        "Europe/Rome",
                        "Europe/Samara",
                        "Europe/Saratov",
                        "Europe/Simferopol",
                        "Europe/Sofia",
                        "Europe/Stockholm",
                        "Europe/Tallinn",
                        "Europe/Tirane",
                        "Europe/Ulyanovsk",
                        "Europe/Uzhgorod",
                        "Europe/Vienna",
                        "Europe/Vilnius",
                        "Europe/Volgograd",
                        "Europe/Warsaw",
                        "Europe/Zaporozhye",
                        "Europe/Zurich",
                        "HST",
                        "Indian/Chagos",
                        "Indian/Christmas",
                        "Indian/Cocos",
                        "Indian/Kerguelen",
                        "Indian/Mahe",
                        "Indian/Maldives",
                        "Indian/Mauritius",
                        "Indian/Reunion",
                        "MET",
                        "MST",
                        "MST7MDT",
                        "PST8PDT",
                        "Pacific/Apia",
                        "Pacific/Auckland",
                        "Pacific/Bougainville",
                        "Pacific/Chatham",
                        "Pacific/Chuuk",
                        "Pacific/Easter",
                        "Pacific/Efate",
                        "Pacific/Enderbury",
                        "Pacific/Fakaofo",
                        "Pacific/Fiji",
                        "Pacific/Funafuti",
                        "Pacific/Galapagos",
                        "Pacific/Gambier",
                        "Pacific/Guadalcanal",
                        "Pacific/Guam",
                        "Pacific/Honolulu",
                        "Pacific/Kiritimati",
                        "Pacific/Kosrae",
                        "Pacific/Kwajalein",
                        "Pacific/Majuro",
                        "Pacific/Marquesas",
                        "Pacific/Nauru",
                        "Pacific/Niue",
                        "Pacific/Norfolk",
                        "Pacific/Noumea",
                        "Pacific/Pago_Pago",
                        "Pacific/Palau",
                        "Pacific/Pitcairn",
                        "Pacific/Pohnpei",
                        "Pacific/Port_Moresby",
                        "Pacific/Rarotonga",
                        "Pacific/Tahiti",
                        "Pacific/Tarawa",
                        "Pacific/Tongatapu",
                        "Pacific/Wake",
                        "Pacific/Wallis",
                        "WET"
                    ],
                    "type": "string",
                    "title": "Timezone",
                    "description": "Timezone to convert the time and date to."
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-05-25T04:42:05.326194+00:00",
        "credits": 0,
        "options_description": {
            "Timezone": "Timezone to convert the time and date to."
        },
        "order": 17000,
        "example": [
            {
                "ex": {
                    "action": "get-dateTime",
                    "options": {
                        "Timezone": "Europe/London"
                    }
                },
                "title": "Example 1: Get date and time"
            }
        ],
        "category": "utils",
        "__typename": "bird_action"
    },
    {
        "id": "condition",
        "description": " Works with condition.",
        "option_schema": {
            "type": "object",
            "required": [
                "condition"
            ],
            "properties": {
                "ifTrue": {
                    "type": "array",
                    "items": {
                        "$ref": "http://myserver/actions.json"
                    },
                    "title": "IfTrue",
                    "description": "Actions to perform if true"
                },
                "ifFalse": {
                    "type": "array",
                    "items": {
                        "$ref": "http://myserver/actions.json"
                    },
                    "title": "IfFalse",
                    "description": "Actions to perform if false"
                },
                "condition": {
                    "type": "object",
                    "required": [
                        "querySelector"
                    ],
                    "properties": {
                        "compareValue": {
                            "type": "string",
                            "title": "ComapareValue",
                            "description": "The value to compare with (if condition is related to comparing)"
                        },
                        "querySelector": {
                            "type": "string",
                            "title": "QuerySelector",
                            "description": "Check if it exists"
                        },
                        "compareOperation": {
                            "enum": [
                                "",
                                "Element Exists",
                                "Number Greater Than",
                                "Number Less Than",
                                "Text Matches",
                                "Text Ends With",
                                "Text Includes",
                                "Text Starts With",
                                "Link Includes",
                                "Link Starts With",
                                "Link Ends With",
                                "Link Matches",
                                "Date Earlier Than",
                                "Date Later Than"
                            ],
                            "type": "string",
                            "title": "CompareOperation",
                            "description": "Type of Condition"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-03T09:11:23.263462+00:00",
        "credits": 0,
        "options_description": {
            "ifTrue": "Set of action to perform if condition is valid",
            "ifFalse": "Set of actions to perform if condition is failed",
            "condition": "{\n            querySelector: 'Query selector to check if it exists in the page'\n            compareValue:  'The value to compare with (if condition is related to comparing)'\n            compareOperation:'Type of condition'\n          }"
        },
        "order": 20000,
        "example": [
            {
                "ex": {
                    "action": "condition",
                    "options": {
                        "ifTrue": [
                            {
                                "action": "get-url",
                                "options": {
                                    "variableName": "pageUrl"
                                }
                            }
                        ],
                        "ifFalse": [
                            {
                                "action": "get-title",
                                "options": {
                                    "variableName": "pageTitle"
                                }
                            }
                        ],
                        "condition": {
                            "querySelector": "$querySelector"
                        }
                    }
                },
                "title": "Example 1: Perform actions based on the presence of querySelector"
            }
        ],
        "category": "advanced",
        "__typename": "bird_action"
    },
    {
        "id": "get-html",
        "description": "Extracts the html of the whole page",
        "option_schema": {
            "type": "object",
            "required": [
                "fileName"
            ],
            "properties": {
                "fileName": {
                    "type": "string",
                    "title": "FileName",
                    "description": "Name of the html"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-09-06T08:44:19.752626+00:00",
        "credits": 1,
        "options_description": {
            "fileName": "Name to be given for the html file"
        },
        "order": 10000,
        "example": [
            {
                "ex": {
                    "action": "get-html",
                    "options": {
                        "fileName": "$fileName"
                    }
                },
                "title": "Example 1: Get the html code of the page"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "get",
        "description": "Gets a value from the page matching the querySelector",
        "option_schema": {
            "type": "object",
            "required": [
                "variableName",
                "value",
                "querySelector"
            ],
            "properties": {
                "value": {
                    "type": "string",
                    "title": "Value",
                    "examples": [
                        "text",
                        "link",
                        "image",
                        "textContent",
                        "innerHtml"
                    ],
                    "description": "ex: text, link, image etc. Also any attribute of the element will work"
                },
                "parser": {
                    "enum": [
                        "",
                        "Numbers (Extract Number)",
                        "Email (Extract First Matching Email)",
                        "Emails (Extract All Matching Emails)",
                        "URL (Extract First Matching URL)",
                        "URLs (Extract All Matching URLs)",
                        "Split by Space",
                        "Split by Comma"
                    ],
                    "type": "string",
                    "title": "Parser",
                    "description": "Parse output data to meaningful data"
                },
                "variableName": {
                    "type": "string",
                    "title": "Variable Name",
                    "description": "Name of the variable to store the value in"
                },
                "querySelector": {
                    "type": "string",
                    "title": "QuerySelector",
                    "description": "QuerySelector of the element to get"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-01-27T05:53:19.795693+00:00",
        "credits": 1,
        "options_description": {
            "value": "innerText | innerHtml | value | any element attribute (runs element.getAttribute() in the background)",
            "parser": "Parse output data to meaningful data",
            "variableName": "Name of the variable to store the fetched value in",
            "querySelector": "Query selector of the element to fetch data from"
        },
        "order": 4000,
        "example": [
            {
                "ex": {
                    "action": "Get the innerText of the querySelector",
                    "options": {
                        "value": "innerText",
                        "variableName": "any name",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 1: Get innerText "
            },
            {
                "ex": {
                    "action": "get",
                    "options": {
                        "value": "innerHtml",
                        "variableName": "any name",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 2: Get the innerHtml of the querySelector"
            },
            {
                "ex": {
                    "action": "get",
                    "options": {
                        "value": "value",
                        "variableName": "any name",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 3: Get the value of the querySelector"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "solve-captcha",
        "description": "Solve Captchas if present in the page",
        "option_schema": {
            "type": "object",
            "required": [],
            "properties": {},
            "additionalProperties": false
        },
        "created_at": "2021-03-22T06:11:48.221859+00:00",
        "credits": 3,
        "options_description": {},
        "order": 14000,
        "example": [
            {
                "ex": {
                    "action": "solve-captcha",
                    "options": {}
                },
                "title": "Example 1: Solve captcha"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "message",
        "description": "Append messages to the output",
        "option_schema": {
            "type": "object",
            "required": [
                "messageName",
                "message"
            ],
            "properties": {
                "message": {
                    "type": "string",
                    "title": "Message",
                    "description": "The message"
                },
                "messageName": {
                    "type": "string",
                    "title": "MessageName",
                    "description": "Name to be given for the message"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-04-15T08:57:45.158914+00:00",
        "credits": 0,
        "options_description": {
            "message": "The message which should be appended",
            "messageName": "The name to be given to the message"
        },
        "order": 1000,
        "example": [
            {
                "ex": {
                    "action": "message",
                    "options": {
                        "message": "hello browser bird",
                        "messageName": "msg1"
                    }
                },
                "title": "Example 1: Append a message to final results"
            }
        ],
        "category": "utils",
        "__typename": "bird_action"
    },
    {
        "id": "wait",
        "description": "Waits for given number of milliseconds or waits till an element appears in the page",
        "option_schema": {
            "type": "object",
            "required": [
                "for"
            ],
            "properties": {
                "for": {
                    "enum": [
                        "time",
                        "querySelector"
                    ],
                    "type": "string",
                    "title": "For",
                    "pattern": "^(?:time|querySelector)$",
                    "description": "Wait for: time or till an element appears"
                },
                "time": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "Time (Millisecond: 1s = 1000ms)",
                    "description": "Wait for Milliseconds"
                },
                "querySelector": {
                    "type": "string",
                    "title": "QuerySelector",
                    "description": "Wait for an element to appear"
                }
            },
            "dependencies": {
                "for": {
                    "oneOf": [
                        {
                            "required": [
                                "for",
                                "time"
                            ],
                            "properties": {
                                "for": {
                                    "enum": [
                                        "time"
                                    ]
                                },
                                "time": {
                                    "type": "number",
                                    "title": "Time (Millisecond: 1s = 1000ms)",
                                    "description": "Wait for Millisecond"
                                }
                            }
                        },
                        {
                            "required": [
                                "for",
                                "querySelector"
                            ],
                            "properties": {
                                "for": {
                                    "enum": [
                                        "querySelector"
                                    ]
                                },
                                "querySelector": {
                                    "type": "string",
                                    "title": "QuerySelector",
                                    "description": "Wait for an element to appear"
                                }
                            }
                        }
                    ]
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-01-27T06:04:07.060695+00:00",
        "credits": 1,
        "options_description": {
            "for": "time | querySelector",
            "time": "Number of milliseconds to wait (3000 = waits for 3 seconds) - Only valid if 'for' is set to 'time'",
            "querySelector": "Query selector to wait till it appears - Only valid if 'for' is set to 'querySelector'"
        },
        "order": 3000,
        "example": [
            {
                "ex": {
                    "action": "wait",
                    "options": {
                        "for": "time",
                        "time": 3000
                    }
                },
                "title": "Example 1: Wait for 3 seconds"
            },
            {
                "ex": {
                    "action": "wait",
                    "options": {
                        "for": "querySelector",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 2:Wait for a querySelector"
            }
        ],
        "category": "utils",
        "__typename": "bird_action"
    },
    {
        "id": "get-all",
        "description": "Gets all the values from the page matching querySelector",
        "option_schema": {
            "type": "object",
            "required": [
                "variableName",
                "value",
                "querySelector"
            ],
            "properties": {
                "value": {
                    "type": "string",
                    "title": "Value",
                    "examples": [
                        "text",
                        "link",
                        "image",
                        "textContent",
                        "innerHtml"
                    ],
                    "description": "ex: text, link, image etc. Also any attribute of the element will work"
                },
                "parser": {
                    "enum": [
                        "",
                        "Numbers (Extract Number)",
                        "Email (Extract First Matching Email)",
                        "Emails (Extract All Matching Emails)",
                        "URL (Extract First Matching URL)",
                        "URLs (Extract All Matching URLs)",
                        "Split by Space",
                        "Split by Comma"
                    ],
                    "type": "string",
                    "title": "Parser",
                    "description": "Parse output data to meaningful data"
                },
                "variableName": {
                    "type": "string",
                    "title": "VariableName",
                    "description": "Name of the variable to store the value in"
                },
                "querySelector": {
                    "type": "string",
                    "title": "QuerySelector",
                    "description": "QuerySelector of the element to get"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-03T05:19:02.108333+00:00",
        "credits": 1,
        "options_description": {
            "value": "innerText | innerHtml | value | any element attribute (runs element.getAttribute() in the background)",
            "parser": "Parse output data to meaningful data ",
            "variableName": "Name of the variable to store the fetched values in",
            "querySelector": "Query selector of the element to fetch data from"
        },
        "order": 5000,
        "example": [
            {
                "ex": {
                    "action": "get-all",
                    "options": {
                        "value": "innerText",
                        "variableName": "any name",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 1: Get all innerText of elements with same querySelector"
            },
            {
                "ex": {
                    "action": "get-all",
                    "options": {
                        "value": "innerHtml",
                        "variableName": "any name",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 2: Get all innerHtml of elements with same querySelector"
            },
            {
                "ex": {
                    "action": "get-all",
                    "options": {
                        "value": "value",
                        "variableName": "any name",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 3: Get all value of elements with same querySelector"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "get-clipboard",
        "description": "Read clipboard",
        "option_schema": {
            "type": "object",
            "required": [
                "variableName"
            ],
            "properties": {
                "variableName": {
                    "type": "string",
                    "title": "VariableName",
                    "description": "Name to be given for the clipboard-value"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-04-21T06:44:03.250572+00:00",
        "credits": 1,
        "options_description": {
            "variableName": "Name of the variable to store the clipboard-value in"
        },
        "order": 15000,
        "example": [
            {
                "ex": {
                    "action": "get-clipboard",
                    "options": {
                        "variableName": "anyName"
                    }
                },
                "title": "Example 1: Read clipboard"
            }
        ],
        "category": "fetch data",
        "__typename": "bird_action"
    },
    {
        "id": "goto",
        "description": "Goes to a page.",
        "option_schema": {
            "type": "object",
            "required": [
                "url"
            ],
            "properties": {
                "url": {
                    "type": "string",
                    "title": "URL",
                    "description": "URL of the page to load"
                },
                "cookies": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "name",
                            "value",
                            "domain"
                        ],
                        "properties": {
                            "name": {
                                "type": "string",
                                "title": "Name",
                                "description": "Cookie name"
                            },
                            "value": {
                                "type": "string",
                                "title": "Value",
                                "description": "Cookie value"
                            },
                            "domain": {
                                "type": "string",
                                "title": "Domain",
                                "description": "Cookie domain"
                            }
                        },
                        "additionalProperties": true
                    },
                    "title": "Cookies",
                    "description": "Cookies to attache while loading the page"
                },
                "waitForSelector": {
                    "type": "string",
                    "title": "WaitForSelector",
                    "description": "Action will wait for this selector load"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-01-27T05:47:42.727943+00:00",
        "credits": 1,
        "options_description": {
            "url": "Url of the page to load",
            "cookies": "Cookies to set before loading the page",
            "waitForSelector": "(Optional) Query selector to wait till it appears"
        },
        "order": 2000,
        "example": [
            {
                "ex": {
                    "action": "goto",
                    "options": {
                        "url": "$tweetUrl",
                        "cookies": [
                            {
                                "name": "auth_token",
                                "value": "$twitterAuthToken",
                                "domain": ".twitter.com"
                            }
                        ],
                        "waitForSelector": "article[role='article']"
                    }
                },
                "title": "Example 1: Go to a tweeter page with your cookies and wait for query selector"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "scroll",
        "description": "Scrolls the page",
        "option_schema": {
            "type": "object",
            "required": [
                "to"
            ],
            "properties": {
                "to": {
                    "enum": [
                        "bottom",
                        "component"
                    ],
                    "type": "string",
                    "title": "To",
                    "pattern": "^(?:bottom|component)$",
                    "description": "Scroll to bottom or scroll to an element"
                },
                "speed": {
                    "enum": [
                        "slow",
                        "medium",
                        "fast"
                    ],
                    "type": "string",
                    "title": "Speed",
                    "pattern": "^(?:slow|medium|fast)$",
                    "description": "Scroll speed.slower or in a medium speed or faster"
                },
                "withIn": {
                    "type": "string",
                    "title": "WithIn",
                    "description": "Scroll within the element"
                },
                "scrollFor": {
                    "type": "number",
                    "title": "ScrollFor (Millisecond: 1s = 1000ms)",
                    "description": "Scroll for Millisecond"
                },
                "querySelector": {
                    "type": "string",
                    "title": "QuerySelector",
                    "description": "Scroll upto the element.."
                }
            },
            "dependencies": {
                "to": {
                    "oneOf": [
                        {
                            "required": [
                                "to",
                                "querySelector"
                            ],
                            "properties": {
                                "to": {
                                    "enum": [
                                        "component"
                                    ]
                                },
                                "querySelector": {
                                    "type": "string",
                                    "title": "Query Selector",
                                    "description": "Scroll upto the element"
                                }
                            }
                        },
                        {
                            "required": [
                                "to"
                            ],
                            "properties": {
                                "to": {
                                    "enum": [
                                        "bottom"
                                    ]
                                }
                            }
                        }
                    ]
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-03T05:11:34.398193+00:00",
        "credits": 1,
        "options_description": {
            "to": "Upto where the scroll to be done. bottom | component",
            "speed": "Speed at which the scroll to be done. slow | medium | fast.",
            "withIn": "Query selector of the parent element to be scrolled within. Default is set to body",
            "scrollFor": "Number of milliseconds to scroll for.",
            "querySelector": "Query selector of the component to be scrolled upto- Only valid if \"to\" is set to \"component\""
        },
        "order": 13000,
        "example": [
            {
                "ex": {
                    "action": "scroll",
                    "options": {
                        "to": "bottom",
                        "speed": "medium",
                        "scrollFor": 5000
                    }
                },
                "title": "Example 1: Scroll the page to bottom in medium speed for 5s"
            },
            {
                "ex": {
                    "action": "scroll",
                    "options": {
                        "to": "component",
                        "speed": "slow",
                        "scrollFor": 10000,
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 2: Scroll the page upto a given querySelector slowly for 10s "
            },
            {
                "ex": {
                    "action": "scroll",
                    "options": {
                        "to": "bottom",
                        "speed": "fast",
                        "withIn": "$querySelector"
                    }
                },
                "title": "Example 3: Scroll within a given querySelector upto the bottom faster "
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "end-bird",
        "description": "Terminate bird here.",
        "option_schema": {
            "type": "object",
            "required": [
                "conclusion"
            ],
            "properties": {
                "conclusion": {
                    "type": "string",
                    "title": "Conclusion",
                    "description": "End message"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-05-22T07:15:50.280356+00:00",
        "credits": 0,
        "options_description": {
            "conclusion": "End message: The reason behind the termination"
        },
        "order": 16000,
        "example": [
            {
                "ex": {
                    "action": "end-bird",
                    "options": {
                        "conclusion": "Any reason to end the bird"
                    }
                },
                "title": "Example 1: End Bird"
            }
        ],
        "category": "utils",
        "__typename": "bird_action"
    },
    {
        "id": "go-back",
        "description": "Go back in the browser",
        "option_schema": {
            "type": "object",
            "required": [],
            "properties": {
                "waitForSelector": {
                    "type": "string",
                    "title": "WaitForSelector",
                    "description": "Wait till the element(querySelector) is loaded."
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-05-31T20:50:24.056867+00:00",
        "credits": 1,
        "options_description": {
            "waitForSelector": "Wait till the element(querySelector) is loaded."
        },
        "order": 18000,
        "example": [
            {
                "ex": {
                    "action": "go-back",
                    "options": {
                        "waitForSelector": ".selectorToWait"
                    }
                },
                "title": "Example 1: Go back"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "loop",
        "description": " Performs action repeatedly. Use $iLoopName and $i1LoopName to use i-th itteration in the loop",
        "option_schema": {
            "type": "object",
            "required": [
                "loop",
                "loopName"
            ],
            "properties": {
                "loop": {
                    "type": "array",
                    "items": {
                        "$ref": "http://myserver/actions.json"
                    },
                    "title": "Loop",
                    "description": "Set of actions to loop"
                },
                "loopName": {
                    "type": "string",
                    "title": "LoopName",
                    "description": "Name of the loop"
                },
                "condition": {
                    "type": "object",
                    "title": "Condition",
                    "properties": {
                        "compareValue": {
                            "type": "string",
                            "title": "ComapareValue",
                            "description": "The value to compare with (if condition is related to comparing)"
                        },
                        "querySelector": {
                            "type": "string",
                            "title": "QuerySelector",
                            "description": "Checks for existence"
                        },
                        "compareOperation": {
                            "enum": [
                                "",
                                "Element Exists",
                                "Number Greater Than",
                                "Number Less Than",
                                "Text Matches",
                                "Text Ends With",
                                "Text Includes",
                                "Text Starts With",
                                "Link Includes",
                                "Link Starts With",
                                "Link Ends With",
                                "Link Matches",
                                "Date Earlier Than",
                                "Date Later Than"
                            ],
                            "type": "string",
                            "title": "CompareOperation",
                            "description": "Type of Condition"
                        }
                    },
                    "description": "Condition to check",
                    "additionalProperties": false
                },
                "iteration": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "Iteration",
                    "description": "Number of times to loop"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-08T04:30:15.05142+00:00",
        "credits": 0,
        "options_description": {
            "loop": "Set of actions to loop",
            "loopName": "Name of the loop",
            "condition": "{\n            querySelector: 'Query selector to check if it exists in the page'\n            compareValue:  'The value to compare with (if condition is related to comparing)'\n            compareOperation:'Type of condition'\n          }",
            "iteration": "Number of times to loop the actions"
        },
        "order": 21000,
        "example": [
            {
                "ex": {
                    "action": "loop",
                    "options": {
                        "loop": [
                            {
                                "action": "get-url",
                                "options": {
                                    "variableName": "pageUrl"
                                }
                            }
                        ],
                        "loopName": "anyName",
                        "iteration": 3
                    }
                },
                "title": "Example 1: Iterate given actions 3 times"
            },
            {
                "ex": {
                    "action": "loop",
                    "options": {
                        "loop": [
                            {
                                "action": "get-url",
                                "options": {
                                    "variableName": "pageUrl"
                                }
                            }
                        ],
                        "loopName": "anyName",
                        "condition": {
                            "querySelector": "$querySelector"
                        }
                    }
                },
                "title": "Example 2: Iterate given actions while the querySelector is present"
            }
        ],
        "category": "advanced",
        "__typename": "bird_action"
    },
    {
        "id": "tab",
        "description": "Presses the tab key",
        "option_schema": {
            "type": "object",
            "required": [],
            "properties": {},
            "additionalProperties": false
        },
        "created_at": "2022-12-14T22:37:09.688422+00:00",
        "credits": 1,
        "options_description": {},
        "order": 8500,
        "example": [
            {
                "ex": {
                    "action": "enter",
                    "options": {}
                },
                "title": "Example 1: Press enter key"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "set-viewport",
        "description": "Set viewport",
        "option_schema": {
            "type": "object",
            "required": [
                "width",
                "height"
            ],
            "properties": {
                "width": {
                    "type": "number",
                    "title": "Width",
                    "description": "Width for viewport"
                },
                "height": {
                    "type": "number",
                    "title": "Height",
                    "description": "Height for viewport"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2022-12-15T11:12:52.065058+00:00",
        "credits": 0,
        "options_description": {
            "width": "Width for viewport",
            "height": "Height for viewpor"
        },
        "order": 18500,
        "example": [
            {
                "ex": {
                    "action": "set-viewport",
                    "options": {
                        "width": 1080,
                        "height": 1080
                    }
                },
                "title": "Example 1: Set viewport"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "click",
        "description": "Clicks an element",
        "option_schema": {
            "type": "object",
            "required": [
                "querySelector"
            ],
            "properties": {
                "offsetX": {
                    "type": "number",
                    "title": "OffsetX",
                    "description": "OffsetX of the element to click on"
                },
                "offsetY": {
                    "type": "number",
                    "title": "OffsetY",
                    "description": "OffsetY of the element to click on"
                },
                "rightClick": {
                    "type": "boolean",
                    "title": "RightClick",
                    "description": "Whether or not to perform right click"
                },
                "doubleClick": {
                    "type": "boolean",
                    "title": "DoubleClick",
                    "description": "Whether or not to perform double click"
                },
                "ariaSelector": {
                    "type": "string",
                    "title": "AriaSelector",
                    "description": "AriaSelector of the element to click on"
                },
                "textSelector": {
                    "type": "string",
                    "title": "TextSelector",
                    "description": "TextSelector of the element to click on"
                },
                "querySelector": {
                    "type": "string",
                    "title": "QuerySelector",
                    "description": "QuerySelector of the element to click on"
                },
                "xpathSelector": {
                    "type": "string",
                    "title": "XpathSelector",
                    "description": "XpathSelector of the element to click on"
                },
                "preferredSelector": {
                    "enum": [
                        "querySelector",
                        "ariaSelector",
                        "xpathSelector",
                        "textSelector"
                    ],
                    "type": "string",
                    "title": "PreferredSelector",
                    "pattern": "^(?:querySelector|ariaSelector|xpathSelector|textSelextor)$",
                    "description": "PreferredSelector of the input field"
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-01T10:44:08.021339+00:00",
        "credits": 1,
        "options_description": {
            "querySelector": "QuerySelector of the element to click on",
            "preferredSelector": "Choose preferred selector (default: querySelector)"
        },
        "order": 7000,
        "example": [
            {
                "ex": {
                    "action": "click",
                    "options": {
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 1: Click the given element"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    },
    {
        "id": "input",
        "description": "Inputs a value to an input field",
        "option_schema": {
            "type": "object",
            "required": [
                "type",
                "querySelector"
            ],
            "properties": {
                "type": {
                    "enum": [
                        "select",
                        "input"
                    ],
                    "type": "string",
                    "title": "Type",
                    "pattern": "^(?:select|input)$",
                    "description": "Input type. Either dropdown select or text input box"
                },
                "delay": {
                    "enum": [
                        "slow",
                        "medium",
                        "fast"
                    ],
                    "type": "string",
                    "title": "Delay",
                    "pattern": "^(?:slow|medium|fast)$",
                    "description": "Delay to maintain while performing the action"
                },
                "value": {
                    "type": "string",
                    "title": "Value",
                    "description": "Input value"
                },
                "encrypt": {
                    "type": "boolean",
                    "title": "Encrypt",
                    "description": "Encrypt the input data before store"
                },
                "ariaSelector": {
                    "type": "string",
                    "title": "AriaSelector",
                    "description": "AriaSelector of the input field"
                },
                "textSelector": {
                    "type": "string",
                    "title": "TextSelector",
                    "description": "TextSelector of the input field"
                },
                "querySelector": {
                    "type": "string",
                    "title": "QuerySelector",
                    "description": "QuerySelector of the input field"
                },
                "xpathSelector": {
                    "type": "string",
                    "title": "XpathSelector",
                    "description": "XpathSelector of the input field"
                },
                "encryptedValue": {
                    "type": "object",
                    "title": "Encrypted Value",
                    "description": "Encrypted Value"
                },
                "preferredSelector": {
                    "enum": [
                        "querySelector",
                        "ariaSelector",
                        "xpathSelector",
                        "textSelector"
                    ],
                    "type": "string",
                    "title": "PreferredSelector",
                    "pattern": "^(?:querySelector|ariaSelector|xpathSelector|textSelector)$",
                    "description": "PreferredSelector of the input field"
                }
            },
            "dependencies": {
                "type": {
                    "oneOf": [
                        {
                            "required": [],
                            "properties": {
                                "type": {
                                    "enum": [
                                        "input"
                                    ]
                                },
                                "encrypt": {
                                    "type": "boolean",
                                    "title": "Encrypt",
                                    "description": "Do you want us to encrypt the input before we store?"
                                }
                            }
                        },
                        {
                            "required": [],
                            "properties": {
                                "type": {
                                    "enum": [
                                        "select"
                                    ]
                                }
                            }
                        }
                    ]
                }
            },
            "additionalProperties": false
        },
        "created_at": "2021-02-01T10:44:07.383618+00:00",
        "credits": 1,
        "options_description": {
            "delay": "(optional) Time to be delayed on input (allows to simulate real user)",
            "value": "Value to be selected or input",
            "querySelector": "Query selector of the input field",
            "preferredSelector": "Choose preferred selector (default: querySelector)"
        },
        "order": 6000,
        "example": [
            {
                "ex": {
                    "action": "input",
                    "options": {
                        "delay": "medium",
                        "value": "any values to type",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 1: Type a value in the querySelector"
            },
            {
                "ex": {
                    "action": "input",
                    "options": {
                        "type": "select",
                        "value": "the values to select",
                        "querySelector": "$querySelector"
                    }
                },
                "title": "Example 2: Select a value from the given querySelector"
            }
        ],
        "category": "actions",
        "__typename": "bird_action"
    }
]