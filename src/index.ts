import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { format } from "prettier";
import { generateService } from "./generateService";
import { generator } from "./generator";
import { getSwaggerJson } from "./getJson";
import { getSwaggerConfig } from "./getSwaggerConfig";
import { HTTP_REQUEST, INDEX, SET_HTTP_REQUEST } from "./strings";
import { SwaggerConfig, SwaggerJson } from "./types";
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

    writeFileSync(`${dir}/service-name.ts`, generateService());
    writeFileSync(`${dir}/services.ts`, code);
    writeFileSync(`${dir}/httpRequest.ts`, HTTP_REQUEST);
    writeFileSync(`${dir}/index.ts`, INDEX);
    writeFileSync(`${dir}/setHttpRequest.ts`, SET_HTTP_REQUEST);

    formatFile(`${dir}/service-name.ts`, prettierOptions);
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
