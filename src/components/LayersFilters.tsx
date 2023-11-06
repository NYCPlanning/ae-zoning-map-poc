import {
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@nycplanning/streetscape";

function LayersFilters() {
  return (
    <>
      <h2>
        <AccordionButton>
          Section 2 title
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </>
  );
}

export default LayersFilters;
