import {
    AccordionButton,
    AccordionPanel,
    AccordionItem,
    Box,
    Flex,
    Spacer,
    Text,
    Button,
  } from "@nycplanning/streetscape";
  import {
    DrawPolygonMode,
    ViewMode,
    MeasureDistanceMode,
    DrawPointMode,
    DrawLineStringMode,
    TransformMode,
    Draw90DegreePolygonMode,
    ModifyMode,
    DrawCircleFromCenterMode,
    RotateMode,
    SnappableMode,
    GeoJsonEditMode,
  } from "@nebula.gl/edit-modes";

  interface InteractionModeProps {
    mode: GeoJsonEditMode;
    changeMode: (mode: GeoJsonEditMode) => void;
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
                {/* <Button
                  mode={"select"}
                  currentMode={mode}
                  onClick={() => {
        changeMode(new SnappableMode(new TransformMode))
      }}
                >Edit</Button> */}
                <Button
                  mode={"linestring"}
                  currentMode={mode}
                  onClick={() => {
        changeMode(new DrawLineStringMode);
      }}
      >Line</Button>
                <Button
                  mode={"polygon"}
                  currentMode={mode}
                  onClick={() => {
                    changeMode(new DrawPolygonMode);
      }}
      >Polygon</Button>
                <Button
                  mode={"point"}
                  currentMode={mode}
                  onClick={() => {
        changeMode(new DrawPointMode);
      }}
      >Point</Button>
                <Button
                  mode={"circle"}
                  currentMode={mode}
                  onClick={() => {
        changeMode(new DrawCircleFromCenterMode);
      }}
      >Circle</Button>
              </div>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  }
  
  export default InteractionMode;