import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spacer,
} from "@nycplanning/streetscape";
import ZoningDistrictFilters from "./ZoningDistrictFilters";
import TaxLotFilters from "./TaxLotFilters";
import { useStore } from "../store";

function FilterList() {
  const anyZoningDistrictsVisibility = useStore(
    (state) => state.anyZoningDistrictsVisibility,
  );
  const anyTaxLotsVisibility = useStore((state) => state.anyTaxLotsVisibility);

  return (
    <Accordion allowMultiple>
      <AccordionItem display={anyZoningDistrictsVisibility ? "" : "none"}>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          Zoning Districts
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <ZoningDistrictFilters />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem display={anyTaxLotsVisibility ? "" : "none"}>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          Tax Lots
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <TaxLotFilters />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterList;
