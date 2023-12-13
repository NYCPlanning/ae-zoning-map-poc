import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerTanstackQuery from "@kubb/swagger-tanstack-query";
import createSwaggerTS from "@kubb/swagger-ts";

export default defineConfig({
  input: {
    path: "https://raw.githubusercontent.com/NYCPlanning/ae-zoning-api/stable/openapi/openapi.yaml",
  },
  output: {
    path: "./src/gen",
  },
  hooks: {
    done: ['prettier --write "**/*.{ts,tsx}"', "eslint --fix ./src/gen"],
  },
  plugins: [
    createSwagger({ output: false }),
    createSwaggerTS({}),
    createSwaggerTanstackQuery({
      output: "./hooks",
      clientImportPath: "../../client.ts",
    }),
  ],
});
