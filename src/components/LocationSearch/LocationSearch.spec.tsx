import { fireEvent, render, screen } from "@testing-library/react";
import { LocationSearch } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Accordion } from "@nycplanning/streetscape";

const client = new QueryClient();

const mockBblSearch = vi.fn();

const testComponent = (
  <QueryClientProvider client={client}>
    <Accordion>
      <LocationSearch handleBblSearched={mockBblSearch} />
    </Accordion>
  </QueryClientProvider>
);

describe("LocationSearch", () => {
  it("should render", () => {
    render(testComponent);
    expect(screen.getByText(/Location Search/)).toBeInTheDocument();
  });

  // on hold
  // it("should display borough options on click", async () => {
  //   const res = createFindBoroughsQueryResponse();
  //   console.log("createFindBoroughsQueryResponse", res);
  //   render(testComponent);
  //   fireEvent.click(screen.getByText(/Select/));
  //   await screen.findByRole<HTMLOptionElement>("option");
  //   expect(screen.getAllByRole<HTMLOptionElement>("option").length).toBe(5);
  // });

  it("should call handleBblSearched", async () => {
    render(testComponent);
    fireEvent.click(screen.getByText("Search"));
    await screen.findByRole("button");
    expect(mockBblSearch).toHaveBeenCalled();
  });
});
