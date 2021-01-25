import { getSwaggerConfig } from "./getSwaggerConfig";
import { SwaggerConfig } from "./types";

export function generateService() {
  const { serviceName }: SwaggerConfig = getSwaggerConfig();
  const name = serviceName ? `${serviceName}/` : "";
  return `
    export let service =  "${name}"
  `;
}
