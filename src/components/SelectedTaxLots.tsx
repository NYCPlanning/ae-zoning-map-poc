import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@nycplanning/streetscape";
import { TaxLot, TaxLotBasic, TaxLotGeoJson } from "../gen";
import { CloseableModal } from "./CloseableModal";
import { TaxLotDetails } from "./TaxLotDetails";


interface TaxLotDetailsProps {
    taxLots: TaxLotBasic[] | null;
  }

export const SelectedTaxLots = ({taxLots}:TaxLotDetailsProps) => {
    return (
        <CloseableModal>
            <Accordion allowMultiple>
                {
                    taxLots?.map((taxLot) => 
                        <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            >
                            {taxLot.address}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        <Box flex={1}>
                            <div>bbl: {taxLot.bbl}</div>
                            <div>block: {taxLot.block}</div>
                            <div>borough: {taxLot.boroughId}</div>
                            <div>lot: {taxLot.lot}</div>
                            <div>landuse: {taxLot.landUseId}</div>    
                        </Box>                     
                        </AccordionPanel>
                        </AccordionItem>


                    )
                }

            </Accordion>


    </CloseableModal>
    )
}