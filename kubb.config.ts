import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerTanstackQuery from "@kubb/swagger-tanstack-query";
import createSwaggerTS from "@kubb/swagger-ts";
import createSwaggerFaker from "@kubb/swagger-faker";
import createSwaggerMsw from "@kubb/swagger-msw";

export default defineConfig({
  input: {
    path: "https://raw.githubusercontent.com/NYCPlanning/ae-zoning-api/stable/openapi/openapi.yaml",
  },
  output: {
    path: "./src/gen",
    clean: true,
  },
  hooks: {
    done: ['prettier --write "**/*.{ts,tsx}"', "eslint --fix ./src/gen"],
  },
  plugins: [
    createSwagger({ output: false }),
    createSwaggerTS({}),
    createSwaggerTanstackQuery({
      output: {
        path: "./hooks",
      },
      client: {
        importPath: "../../client.ts",
      }
    }),
    createSwaggerFaker({}),
    createSwaggerMsw({
      output: {
        path: "./mocks",
        exportAs: "mocks",
      },
    }),
  ],
});
