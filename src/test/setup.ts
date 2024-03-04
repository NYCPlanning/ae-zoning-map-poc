import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "../gen";

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
