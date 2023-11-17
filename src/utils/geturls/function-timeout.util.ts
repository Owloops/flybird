// https://github.com/sindresorhus/function-timeout

import vm from 'node:vm';

const script = new vm.Script('returnValue = functionToRun()');

// TODO: Document the `context` option and add to types when I know it's something I want to keep.

// If you use the `context` option, you do it at your own risk.
export default function functionTimeout(function_: { (): any; (): any; (): IteratorResult<RegExpMatchArray, any>; (arg0: any): any; (arg0: any): any; name?: any; }, {timeout = 5000, context = vm.createContext()} = {}) {
    const wrappedFunction = (...arguments_: any[]) => {
        context.functionToRun = () => function_([...arguments_]);
        script.runInNewContext(context, {timeout});
        return context.returnValue;
    };

    Object.defineProperty(wrappedFunction, 'name', {
        value: `functionTimeout(${function_.name || '<anonymous>'})`,
        configurable: true,
    });

    return wrappedFunction;
}

export function isTimeoutError(error: any) {
	return error?.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT';
}
