import { afterAll, afterEach, beforeAll } from "@jest/globals";
import { server } from "./test/mocks/node";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
