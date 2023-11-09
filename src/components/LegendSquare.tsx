import { Flex } from "@nycplanning/streetscape";

export interface LegendSquareProps {
  color: string;
}

function LegendSquare({ color }: LegendSquareProps) {
  return <Flex w={5} h={5} bg={color} ml={2.5} borderRadius="4px" />;
}

export default LegendSquare;
