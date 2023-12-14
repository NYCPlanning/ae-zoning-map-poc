import { ZoningDistrictClass } from "../gen";
import { Text, VStack } from "@nycplanning/streetscape";
import { CloseableModal } from "./CloseableModal";
import { ZoningDistrictDetailsInfo } from "./ZoningDistrictDetailsInfo";
import { useStore } from "../store";

interface ZoningDistrictClassesDetailsProps {
  zoningDistrictClasses: Set<ZoningDistrictClass | null>;
}

export const ZoningDistrictDetails = ({
  zoningDistrictClasses,
}: ZoningDistrictClassesDetailsProps) => {
  const infoPane = useStore((state) => state.infoPane);

  const zds = [...zoningDistrictClasses];

  return zoningDistrictClasses === null ||
    infoPane !== "zoningDistrict" ? null : (
    <CloseableModal>
      <VStack
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        width={"296px"}
      >
        <Text fontSize={"lg"} fontWeight={"bold"}>
          Zoning District {zds.map((zd) => zd?.id).join(", ")}
        </Text>
        {zds.map((district) => (
          <ZoningDistrictDetailsInfo
            key={district?.id}
            zd={district}
            multiDistrict={zds.length > 1}
          />
        ))}
      </VStack>
    </CloseableModal>
  );
};
