import {
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Text,
} from "@nycplanning/streetscape";

function LocationSearch() {
  return (
    <AccordionItem
      bg="white"
      mb={6}
      borderRadius="0.75rem 0 0.75rem 0.75rem"
      border="0"
    >
      {({ isExpanded }: { isExpanded: boolean }) => (
        <>
          <AccordionButton p={0} _hover={{ borderColor: "white" }}>
            <Box
              as="span"
              display="flex"
              flexDirection="row"
              justifyContent={"space-between"}
              width={"30rem"}
              mr="-4rem"
              bg="white"
              borderRadius={"base"}
              py={4}
              pl={4}
              pr={2}
            >
              <Text textStyle="lead">Location Search</Text>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isExpanded ? "" : "rotated"}
              >
                <path d="M16 10.6667L24 18.6667H8L16 10.6667Z" fill="#4A5568" />
              </svg>
            </Box>
          </AccordionButton>
          <AccordionPanel pt={0} pb={4}>
            <form>
              <FormControl
                id="borough"
                borderTop="1px solid"
                borderColor="gray.400"
                pt={4}
              >
                <FormLabel>Borough</FormLabel>
                <Select placeholder="-Select-" variant="base" />
                <FormErrorMessage>You must select a borough.</FormErrorMessage>
              </FormControl>

              <Box flexDirection={"row"} display={"flex"} gap={5} pt={3} pb={5}>
                <FormControl id="block">
                  <Box>
                    <FormLabel>Block</FormLabel>
                    <Input placeholder="Placeholder Text" />
                    <FormErrorMessage>
                      You must select a block.
                    </FormErrorMessage>
                  </Box>
                </FormControl>
                <FormControl id="lot">
                  <Box>
                    <FormLabel>Lot</FormLabel>
                    <Input placeholder="Placeholder Text" />
                    <FormErrorMessage>You must select a lot.</FormErrorMessage>
                  </Box>
                </FormControl>
              </Box>

              <Button size="md" variant="primary">
                Search
              </Button>
            </form>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default LocationSearch;
