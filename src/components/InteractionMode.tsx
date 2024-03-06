import {
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Box,
  Flex,
  Spacer,
  Text,
} from "@nycplanning/streetscape";
import ModeButton from "./ModeButton";
interface InteractionModeProps {
  mode: string;
  changeMode: (mode: string) => void;
}

function InteractionMode({ mode, changeMode }: InteractionModeProps) {
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
              Interaction Modes
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
            <div>
              <ModeButton
                mode={"select"}
                currentMode={mode}
                changeMode={changeMode}
              />
              <ModeButton
                mode={"linestring"}
                currentMode={mode}
                changeMode={changeMode}
              />
              <ModeButton
                mode={"polygon"}
                currentMode={mode}
                changeMode={changeMode}
              />
              <ModeButton
                mode={"point"}
                currentMode={mode}
                changeMode={changeMode}
              />
              <ModeButton
                mode={"circle"}
                currentMode={mode}
                changeMode={changeMode}
              />
            </div>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default InteractionMode;
