import { readFileSync } from "fs";
import path from "path";

const SET_HTTP_REQUEST = readFileSync(
  path.resolve(__dirname, "../files/setHttpRequest.tsf"),
).toString();

const HTTP_REQUEST = readFileSync(
  path.resolve(__dirname, "../files/httpRequest.tsf"),
).toString();

const INDEX = readFileSync(
  path.resolve(__dirname, "../files/index.tsf"),
).toString();

const SERVICE_BEGINNING = `
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 4
 */
import { SwaggerResponse } from './setHttpRequest';
import { Http } from './httpRequest';

//@ts-ignore
const __DEV__ = process.env.NODE_ENV !== 'production';

//@ts-ignore
function template(path: string, obj: { [x: string]: any } = {}) {
    Object.keys(obj).forEach((key) => {
      const re = new RegExp(\`{\${key}}\`, "i");
      path = path.replace(re, obj[key]);
    });

    return path;
}
`;

const DEPRECATED_WARM_MESSAGE =
  "This endpoint deprecated and will be remove. Please use an alternative";

export {
  SET_HTTP_REQUEST,
  HTTP_REQUEST,
  INDEX,
  SERVICE_BEGINNING,
  DEPRECATED_WARM_MESSAGE,
};
