// @ts-nocheck
import Ajv from 'ajv';
import { encrypt } from './crypto.util';
import { BirdError } from './error.util';
const ajv = new Ajv();
const VALIDATION__NO_ACTION_FOUND = 'No action found in the skeleton';
const VALIDATION__INVALID_ACTION = 'Action #action you added is invalid';
const VALIDATION__ARRAY_EXPECTED = 'An array of actions expected as body';
const VALIDATION__SHOULD_START_WITH_GOTO_OR_SET_VIEWPORT =
  'A bird should always start with action: "goto", or "set-viewport"';
const VALIDATION__INVALID_KEY = 'Variables cannot be assigned to a key';
const loopNames: string[] = [];

export const prepareBird = (
    birdData: {
      skeleton: any;
      variable_schema?: any;
    },
    variables: {}
  ) => {
    if ("variable_schema" in birdData) {
      const validate = ajv.compile(birdData.variable_schema?.schema);
      if (!validate(variables)) {
        throw new BirdError({
          code: 'VARIABLES__VALIDATION_ERROR',
          message: ajv.errorsText(validate.errors),
          data: validate.errors,
        });
      }
    }
  
    let birdSkeletonString = JSON.stringify(birdData.skeleton);
  
    Object.keys(variables).forEach((vari) => {
      variables[vari] =
        typeof variables[vari] === 'string'
          ? variables[vari].split(`"`).join(`'`)
          : variables[vari];
      birdSkeletonString = birdSkeletonString
        .split(`$${vari}`)
        .join(variables[vari]);
    });
  
    const injectedBird = JSON.parse(birdSkeletonString);
  
    return {
      injectedBird,
    };
  };

  export const validateBird = async (
    body: any,
    actionsSchema: any,
    isCondition: Boolean = false,
    isLoop: Boolean = false,
    estimatedCredits: number = 0
  ) => {
    const variable_properties = {};
    const default_values = {};
    const required: string[] = [];
    const conditionCredits: string|number[] = [];
    const schema = {
      type: 'object',
      required,
      properties: {},
      additionalProperties: false,
    };
    if (Array.isArray(body)) {
      if (!isCondition && !isLoop) {
        if (body[0]?.action !== 'goto' && body[0]?.action !== 'set-viewport') {
          throw new BirdError({
            code: 'VALIDATION__SHOULD_START_WITH_GOTO_OR_SET_VIEWPORT',
            message: VALIDATION__SHOULD_START_WITH_GOTO_OR_SET_VIEWPORT,
            data: {},
          });
        }
      }
  
      const birdCredits = {};
      actionsSchema.forEach((item: { id: string | number; credits: any; }) => {
        birdCredits[item.id] = item.credits;
      });
      body.map((item) => {
        estimatedCredits += birdCredits[item.action];
      });
  
      for (let [index, data] of body.entries()) {
        if (!data.action) {
          throw new BirdError({
            code: 'VALIDATION__NO_ACTION_FOUND',
            message: VALIDATION__NO_ACTION_FOUND,
            data: { actionIndex: index },
          });
        }
  
        if (data.action === 'add-action') {
        } else {
          let dataOptions = data?.options;
          Object.values(dataOptions).forEach((item) => {
            if (typeof item === 'object' && item !== null) {
              Object.keys(item).forEach(validateKey);
            }
          });
  
          let optionsSchema: { option_schema: any; };
  
          optionsSchema = actionsSchema.find((a: { id: any; option_schema: any; }) => {
            if (a.id === data.action) {
              if (data.action === 'loop') {
                // removing schema ref as its only used in the front-end
                let tempOptions = a.option_schema;
                tempOptions.properties.loop = {
                  type: 'array',
                };
                return tempOptions;
              } else if (data.action === 'condition') {
                // removing schema ref as its only used in the front-end
                let tempOptions = a.option_schema;
                tempOptions.properties.ifTrue = {
                  type: 'array',
                };
                tempOptions.properties.ifFalse = {
                  type: 'array',
                };
                return tempOptions;
              } else if (
                data.action === 'input' &&
                data?.options?.type === 'input' &&
                data?.options?.encrypt === true &&
                data?.options?.value &&
                data.options?.value !== ''
              ) {
                //if  action = "input" and option.encrypt = true and option.value != ''
                // => add encryptedValue with encrypted value
                const encryptedValue = encrypt(data?.options?.value);
                body[index]['options']['encryptedValue'] = encryptedValue;
                delete body[index]['options']['value'];
                // const decrpytedValue = decrypt(encryptedValue);
                return a.option_schema;
              } else {
                return a.option_schema;
              }
            }
          });
  
          if (!optionsSchema) {
            throw new BirdError({
              code: 'VALIDATION__INVALID_ACTION',
              message: VALIDATION__INVALID_ACTION.replace('#action', data.action),
              data: {},
            });
          }
  
          const validate = ajv.compile(optionsSchema?.option_schema);
          if (!validate(data?.options || {})) {
            throw new BirdError({
              code: 'OPTIONS__VALIDATION_ERROR',
              message: ajv.errorsText(validate.errors, { dataVar: data.action }),
              data: {
                error: validate.errors,
                actionIndex: index,
                action: data.action,
              },
            });
          }
  
          if (data?.action === 'condition') {
            if (data?.options?.ifTrue) {
              const creditsEstimated = validateBird(
                data?.options?.ifTrue,
                actionsSchema,
                true,
                false,
                estimatedCredits
              );
              conditionCredits.push(creditsEstimated['estimated_credits']);
            }
  
            if (data?.options?.ifFalse) {
              const creditsEstimated = validateBird(
                data?.options?.ifFalse,
                actionsSchema,
                true,
                false,
                estimatedCredits
              );
              conditionCredits.push(creditsEstimated['estimated_credits']);
            }
  
            estimatedCredits = Math.min(...conditionCredits);
          } else if (data?.action === 'loop') {
            let n = 0;
            while (n < data?.options?.iteration || n < 1) {
              const creditsEstimated = validateBird(
                data?.options?.loop,
                actionsSchema,
                false,
                true,
                estimatedCredits
              );
              estimatedCredits = creditsEstimated['estimated_credits'];
              n += 1;
            }
            loopNames.push(data?.options?.loopName);
          }
        }
      }
  
      const skeletonVariables =
        JSON.stringify(body)?.match(/(\$[^0-9][a-zA-Z0-9|_]+)/g) || [];
      // if there are more than one variables with the same name -- throw an error
      // skip variables with i${loopName} - throw an error
  
      skeletonVariables.forEach((va) => {
        if (
          loopNames.includes(va.split('i')[1]) ||
          loopNames.includes(va.split('i1')[1])
        ) {
          return;
        }
        let variable = va.split('|');
  
        if (variable[1]) {
          default_values[variable[0]?.substring(1)] = variable[1];
        } else {
          const tempRequired = variable[0]?.substring(1);
  
          if (required.includes(tempRequired)) {
          } else {
            required.push(tempRequired);
          }
        }
  
        variable_properties[variable[0]?.substring(1)] = {
          type: 'string',
        };
      });
  
      schema.properties = variable_properties;
      schema.required = required;
  
      return {
        final_skeleton: body,
        variable_schema: {
          schema,
          default_values,
        },
        estimated_credits: estimatedCredits,
      };
    } else {
      throw new BirdError({
        code: 'VALIDATION__ARRAY_EXPECTED',
        message: VALIDATION__ARRAY_EXPECTED,
        data: {},
      });
    }
  };

  const validateKey = (item: string | string[]) => {
    if (item.includes('$')) {
      throw new BirdError({
        code: 'VALIDATION__INVALID_KEY',
        message: VALIDATION__INVALID_KEY,
        data: {},
      });
    }
  };

/**
 * Call an async function with a maximum time limit (in milliseconds) for the timeout
 * @param {Promise<any>} asyncPromise An asynchronous promise to resolve
 * @param {number} timeLimit Time limit to attempt function in milliseconds
 * @returns {Promise<any> | undefined} Resolved promise for async function call, or an error if time limit reached
 */
export const asyncCallWithTimeout = async (asyncPromise: any, timeLimit: number | undefined, errorMessage: string): Promise<any> | undefined => {
  let timeoutHandle: string | number | NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise((_resolve, reject) => {
      timeoutHandle = setTimeout(
          () => reject(new BirdError(errorMessage)),
          timeLimit
      );
  });

  return Promise.race([asyncPromise, timeoutPromise]).then(result => {
      clearTimeout(timeoutHandle);
      return result;
  })
}