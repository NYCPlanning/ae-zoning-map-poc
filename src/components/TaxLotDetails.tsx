import { TaxLot } from "../gen";
import { Box } from "@nycplanning/streetscape";

interface TaxLotDetailsProps {
  taxLot: TaxLot | null;
}

export const TaxLotDetails = ({ taxLot }: TaxLotDetailsProps) => {
  return taxLot === null ? null : (
    <Box
      position={"fixed"}
      top={6}
      right={6}
      width={80}
      borderRadius={"base"}
      backgroundColor={"white"}
    >
      {taxLot.bbl}
    </Box>
  );
};
