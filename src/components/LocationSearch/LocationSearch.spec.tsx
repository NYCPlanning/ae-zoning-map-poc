import { render, screen } from "@testing-library/react";

describe("Vitest has been configured properly", () => {
  it("should render", () => {
    render(<p>Hello</p>);
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
  })
});
