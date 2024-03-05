import { fireEvent, render, screen } from "@testing-library/react";
import { LocationSearch } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Accordion } from "@nycplanning/streetscape";
import { useFindBoroughs } from "../../gen";

const client = new QueryClient();

const testComponent = (
  <QueryClientProvider client={client}>
    <Accordion>
      <LocationSearch handleBblSearched={() => "fakebbl"} />
    </Accordion>
  </QueryClientProvider>
);

describe("LocationSearch", () => {
  it("should render", () => {
    render(testComponent);
    expect(screen.getByText(/Location Search/)).toBeInTheDocument();
  });

  it("should display borough options on click", async () => {
    render(testComponent);
    fireEvent.click(screen.getByText(/Select/));
    await screen.findByRole<HTMLOptionElement>("option");
    expect(screen.getAllByRole<HTMLOptionElement>("option").length).toBe(5);
  });
});
