import {
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Spacer,
  Text,
} from "@nycplanning/streetscape";
import { useForm, Controller } from "react-hook-form";
import { useGetBoroughs } from "../gen";

type FormData = {
  borough: string;
  block: string;
  lot: string;
};

interface LocationSearchProps {
  handleBblSearched: (bbl: string) => void;
}

function LocationSearch({ handleBblSearched }: LocationSearchProps) {
  const { data } = useGetBoroughs();
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      block: "",
      lot: "",
      borough: "",
    },
  });

  const onSubmit = handleSubmit((formData) => {
    handleBblSearched(
      `${formData.borough}${formData.block.padStart(
        5,
        "0",
      )}${formData.lot.padStart(4, "0")}`,
    );
  });

  return (
    <AccordionItem mb={6} border="0">
      {({ isExpanded }: { isExpanded: boolean }) => (
        <>
          <AccordionButton
            height={16}
            background="white"
            px={4}
            py={0}
            borderRadius={isExpanded ? "0.75rem 0 0 0" : "0.75rem"}
            _hover={{ backgroundColor: "white" }}
          >
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Location Search
            </Text>
            <Spacer />
            <Flex
              height={"full"}
              borderTopRightRadius={"base"}
              borderBottomRightRadius={"base"}
              backgroundColor={"white"}
              align={"center"}
              transform={isExpanded ? "translateX(3rem)" : ""}
              transition={"all 0.25s"}
            >
              <Box
                transform={isExpanded ? "" : "rotate(180deg)"}
                transition={"all 0.25s"}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10.6667L24 18.6667H8L16 10.6667Z"
                    fill="#4A5568"
                  />
                </svg>
              </Box>
            </Flex>
          </AccordionButton>
          <AccordionPanel
            pt={5}
            pb={4}
            px={4}
            background={"white"}
            borderTop="1px dotted"
            borderColor="gray.400"
            borderRadius={"0 0 0.75rem 0.75rem"}
          >
            <form onSubmit={onSubmit}>
              <FormControl id="borough">
                <FormLabel>Borough</FormLabel>
                <Controller
                  name="borough"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="-Select-" variant="base" {...field}>
                      {data !== undefined
                        ? data.boroughs.map((borough) => (
                            <option key={borough.id} value={borough.id}>
                              {borough.title}
                            </option>
                          ))
                        : null}
                    </Select>
                  )}
                />

                <FormErrorMessage>You must select a borough.</FormErrorMessage>
              </FormControl>

              <Box flexDirection={"row"} display={"flex"} gap={5} pt={3} pb={5}>
                <FormControl id="block" flex="1">
                  <FormLabel>Block</FormLabel>
                  <Controller
                    name="block"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Placeholder Text" {...field} />
                    )}
                  />
                  <FormErrorMessage>You must select a block.</FormErrorMessage>
                </FormControl>
                <FormControl id="lot" flex="1">
                  <FormLabel>Lot</FormLabel>
                  <Controller
                    name="lot"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Placeholder Text" {...field} />
                    )}
                  />
                  <FormErrorMessage>You must select a lot.</FormErrorMessage>
                </FormControl>
              </Box>

              <Button size="md" variant="primary" width="full" type="submit">
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
