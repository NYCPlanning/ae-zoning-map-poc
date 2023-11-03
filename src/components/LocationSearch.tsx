import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@nycplanning/streetscape";

function LocationSearch() {
  return (
    <AccordionItem
      bg="white"
      mb={6}
      p={"4 4 6 4"}
      borderRadius="0.75rem 0 0.75rem 0.75rem"
      border="0"
    >
      <AccordionButton p="0">
        <Box
          as="span"
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
          width={"1000px"}
          mr="-4rem"
          bg="white"
          borderRadius="0.75rem 0.75rem 0.75rem 0.75rem"
        >
          <div>Location Search</div>
          <AccordionIcon />
        </Box>
      </AccordionButton>
      <AccordionPanel pt={6} pb={4}>
        <FormControl id="bbl">
          <FormLabel>Borough</FormLabel>
          <Input placeholder="Replace this with Select when it has been merged" />
          <FormErrorMessage>You must select a borough.</FormErrorMessage>

          <Box flexDirection={"row"} display={"flex"} gap={5} pt={3}>
            <Box>
              <FormLabel>Block</FormLabel>
              <Input placeholder="Placeholder Text" />
              <FormErrorMessage>You must select a block.</FormErrorMessage>
            </Box>

            <Box>
              <FormLabel>Lot</FormLabel>
              <Input placeholder="Placeholder Text" />
              <FormErrorMessage>You must select a lot.</FormErrorMessage>
            </Box>
          </Box>
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default LocationSearch;
