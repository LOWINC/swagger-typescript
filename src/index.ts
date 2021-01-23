import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { format } from "prettier";
import { SwaggerJson, SwaggerConfig } from "./types";
import { HTTP_REQUEST, SET_HTTP_REQUEST, INDEX } from "./strings";
import { getSwaggerJson } from "./getJson";
import { generator } from "./generator";
import { majorVersionsCheck } from "./utils";

async function generate() {
  const config: SwaggerConfig = getSwaggerConfig();

  const {
    url,
    dir,
    prettierPath,
    //@ts-ignore
    __unstable_is_legacy_properties,
  } = config;
  //@ts-ignore
  global.__unstable_is_legacy_properties = __unstable_is_legacy_properties;

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  const prettierOptions = getPrettierOptions(prettierPath);

  try {
    const input: SwaggerJson = await getSwaggerJson(url);

    majorVersionsCheck("3.0.0", input.openapi);

    const code = generator(input, config);

    writeFileSync(`${dir}/services.ts`, code);
    writeFileSync(`${dir}/httpRequest.ts`, HTTP_REQUEST);
    writeFileSync(`${dir}/index.ts`, INDEX);
    writeFileSync(`${dir}/setHttpRequest.ts`, SET_HTTP_REQUEST);

    formatFile(`${dir}/services.ts`, prettierOptions);
    formatFile(`${dir}/httpRequest.ts`, prettierOptions);
    formatFile(`${dir}/setHttpRequest.ts`, prettierOptions);
  } catch (error) {
    console.error(error);
  }
}

function formatFile(filePath: string, prettierOptions: any) {
  const code = readFileSync(filePath).toString();
  writeFileSync(filePath, format(code, prettierOptions));
}

function getSwaggerConfig() {
  try {
    const config = JSON.parse(readFileSync("swagger.config.json").toString());

    if (!config) {
      throw "";
    }

    return config;
  } catch (error) {
    try {
      return JSON.parse(readFileSync("./swaggerConfig.json").toString()); // backward compatible for  v1
    } catch {
      throw new Error("Please define swagger.config.json");
    }
  }
}

function getPrettierOptions(prettierPath: string) {
  let prettierOptions: any = {};
  if (prettierPath && existsSync(prettierPath)) {
    prettierOptions = JSON.parse(readFileSync(prettierPath).toString());
  } else {
    if (existsSync(".prettierrc")) {
      prettierOptions = JSON.parse(readFileSync(".prettierrc").toString());
    } else if (existsSync("prettier.json")) {
      prettierOptions = JSON.parse(readFileSync("prettier.json").toString());
    }
  }

  if (!prettierOptions.parser) {
    prettierOptions.parser = "typescript";
  }

  return prettierOptions;
}

generate();

export { generate };
