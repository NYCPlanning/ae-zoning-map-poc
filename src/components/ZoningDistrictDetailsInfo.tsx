import { ZoningDistrictClass } from "../gen";
import { HStack, Text, Link } from "@nycplanning/streetscape";

interface ZoningDistrictClassesDetailsProps {
  zd: ZoningDistrictClass | null;
  multiDistrict: boolean;
}

export const ZoningDistrictDetailsInfo = ({
  zd,
  multiDistrict,
}: ZoningDistrictClassesDetailsProps) => {
  return (
    <>
      {multiDistrict ? (
        <Text fontSize={"md"} fontWeight={700} pt={2} pb={0}>
          Zoning District {zd?.id}
        </Text>
      ) : (
        ""
      )}
      <Text fontSize={"md"} pt={0}>
        {zd?.description}
      </Text>
      <Link href={zd?.url} isExternal alignSelf={"flex-start"}>
        <HStack gap={2}>
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="1.5em"
            height="1.5em"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
            </g>
          </svg>
          <Text
            fontSize={"md"}
            textDecorationLine={"underline"}
            fontWeight={"bold"}
          >
            View the {zd?.id} districts guide
          </Text>
        </HStack>
      </Link>
    </>
  );
};
