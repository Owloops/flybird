export type ParserType =
  | ''
  | 'Numbers (Extract Number)'
  | 'Email (Extract First Matching Email)'
  | 'Emails (Extract All Matching Emails)'
  | 'URL (Extract First Matching URL)'
  | 'URLs (Extract All Matching URLs)'
  | 'Split by Space'
  | 'Split by Comma';

export type CompareOperationType =
  | ''
  | 'Element Exists'
  | 'Number Greater Than'
  | 'Number Less Than'
  | 'Text Matches'
  | 'Text Ends With'
  | 'Text Includes'
  | 'Text Starts With'
  | 'Link Includes'
  | 'Link Starts With'
  | 'Link Ends With'
  | 'Link Matches'
  | 'Date Earlier Than'
  | 'Date Later Than';
export interface EventType {
  path?: string;
  body?: string;
  headers?: any;
  httpMethod?: 'GET' | 'POST';
  queryStringParameters?: any;
  trigger?: string;
}

export interface AuthType {
  userId: string;
  email: string;
  name?: string;
  userRole: string;
  isAdmin: boolean;
  monthlyTotalCredits: number;
  oneOffCredits: number;
  birdConcurrency: number;
  birdsLimit: number;
  lastPaidAt: string;
  lifeTimeDealStartedAt: string;
  plan_id: string;
  earned_credit: number;
}

export interface SkeletonType {}

export interface FlyRecordLogType {
  data: any;
  action: string;
  status: string;
  message: string;
  time: string;
}

export interface FlyRecordType {
  id: string;
  logs: FlyRecordLogType[];
  status: string;
  credits_used: number;
}

export type ActionType =
  | GotoActionType
  | InputActionType
  | ClickActionType
  | WaitActionType
  | GetActionType
  | GetAllActionType
  | EnterActionType
  | SetViewPortType
  | TabActionType
  | ScreenshotActionType
  | HTMLActionType
  | GetTitleActionType
  | GetUrlActionType
  | ScrollActionType
  | ConditionActionType
  | LoopActionType
  | SolveCaptchaActionType
  | GetClipboardActionType
  | MessageActionType
  | EndBirdActionType
  | GetDateTimeActionType
  | goBackActionType
  | getDataActionType;

interface getDataActionType {
  action: 'get-data';
  options: {
    dataName: string;
    parentSelector: string;
    data: {
      value: string;
      variableName: string;
      querySelector: string;
      parser?: ParserType;
    }[];
  };
}

export interface goBackActionType {
  action: 'go-back';
  options: { waitForSelector?: string };
}

export interface GetDateTimeActionType {
  action: 'get-dateTime';
  options: { timezone?: string };
}

export interface EndBirdActionType {
  action: 'end-bird';
  options: { conclusion?: string };
}

export interface MessageActionType {
  action: 'message';
  options: {
    messageName: string;
    message: string;
  };
}

export interface GetClipboardActionType {
  action: 'get-clipboard';
  options: { variableName: string };
}

interface LoopActionType {
  action: 'loop';
  options: {
    condition?: {
      querySelector: string;
      compareOperation?: CompareOperationType;
      compareValue?: string;
    };
    iteration?: number | string;
    loop: ActionType[];
    loopName: string;
  };
}
interface ConditionActionType {
  action: 'condition';
  options: {
    condition: {
      querySelector: string;
      compareOperation?: CompareOperationType;
      compareValue?: string;
    };
    ifTrue: ActionType[];
    ifFalse: ActionType[];
  };
}
export interface ScrollActionType {
  action: 'scroll';
  options: {
    to: 'bottom' | 'component';
    element: string;
    querySelector: string;
    speed: 'slow' | 'medium' | 'fast';
    withIn: string;
    scrollFor: Number;
  };
}
export interface GetUrlActionType {
  action: 'get-url';
  options: {
    variableName: string;
  };
}
export interface GetTitleActionType {
  action: 'get-title';
  options: {
    variableName: string;
  };
}
export interface ScreenshotActionType {
  action: 'screenshot';
  options: {
    fullPage: boolean | string;
    fileName: string;
  };
}
export interface HTMLActionType {
  action: 'get-html';
  options: {
    fileName: string;
  };
}
export interface GotoActionType {
  action: 'goto';
  options: {
    url: string;
    cookies?: any[];
    timeout?: number;
    waitForSelector?: string;
  };
}

export interface InputActionType {
  action: 'input';
  options: {
    type: 'input' | 'select';
    querySelector: string;
    preferredSelector?: string;
    ariaSelector?: string;
    xpathSelector?: string;
    textSelector?: string;
    value?: string;
    delay?: string;
    encrypt?: boolean;
    encryptedValue?: { iv: string; content: string };
  };
}

export interface ClickActionType {
  action: 'click';
  options: {
    querySelector: string;
    preferredSelector?: string;
    ariaSelector?: string;
    xpathSelector?: string;
    textSelector?: string;
    offsetX?: number;
    offsetY?: number;
    rightClick?: boolean;
    doubleClick?: boolean;
  };
}

export interface SetViewPortType {
  action: 'set-viewport';
  options: {
    width: number;
    height: number;
  };
}

export interface WaitActionType {
  action: 'wait';
  options: {
    for: string;
    time?: number;
    querySelector?: string;
  };
}

export interface GetActionType {
  action: 'get';
  options: {
    variableName: string;
    value: 'link' | 'innerText' | 'image';
    querySelector: string;
    parser?: ParserType;
  };
}

export interface GetAllActionType {
  action: 'get-all';
  options: {
    variableName: string;
    value: 'link' | 'innerText' | 'image';
    querySelector: string;
    parser?: ParserType;
  };
}

interface EnterActionType {
  action: 'enter';
  options: {}
}
interface TabActionType {
  action: 'tab';
  options: {}
}
interface SolveCaptchaActionType {
  action: 'solve-captcha';
  options: {}
}
