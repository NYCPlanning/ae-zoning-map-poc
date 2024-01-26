import { Box, VStack } from "@nycplanning/streetscape";
import { CloseButton } from "@chakra-ui/react";
import { useStore } from "../store";

export const CloseableModal = ({ children }: any) => {
  const setInfoPane = useStore((state) => state.setInfoPane);

  return (
    <Box
      bg="white"
      mb={6}
      p={3}
      pt={5}
      borderRadius="base"
      boxShadow="0px 8px 4px 0px rgba(0, 0, 0, 0.08);"
      position="fixed"
      top={6}
      right={6}
      maxH={"60vh"}
      overflowY={"scroll"}
    >
      <CloseButton
        position="absolute"
        top={2}
        right={2}
        size="sm"
        onClick={() => setInfoPane(null)}
      />
      <VStack alignItems={"flex-start"} alignContent={"flex-start"}>
        {children}
      </VStack>
    </Box>
  );
};
