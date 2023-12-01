import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { MapCtxt, TOP_LEVEL_LAYERS } from "../state";
import { useGetAllZoningDistrictClasses, useGetZoningDistrictClassCategoryColors, useGetZoningDistrictClasses } from "../gen";
import { useContext } from "react";
import { processColors } from "./utils";

export function zoningDistrictsLayer () { 
  const { data: categories } = useGetZoningDistrictClassCategoryColors();
  const { data: classes } = useGetAllZoningDistrictClasses();
  
  const { mapState:{  activeLayers, activeZoningCategories }} = useContext(MapCtxt);

  return new MVTLayer({
    id: TOP_LEVEL_LAYERS.ZONING,
    data: `https://de-sandbox.nyc3.digitaloceanspaces.com/ae-pilot-project/tilesets/zoning_district/{z}/{x}/{y}.pbf`,
    // colorFormat: 'RGBA',
    getLineColor: [192, 0, 192, 1],
    visible: activeLayers.has(TOP_LEVEL_LAYERS.ZONING),
    getFillColor: (f: { properties: {
      layerName: | "build_main.ae_tileset_zoningdistrict_fill"
      commercial?: string | null,
      manufacturing?: string | null,
      residential?: string | null,
    } | {
      layerName: "build_main.ae_tileset_zoningdistrict_label" 
    }}) => {

      //  if (activeZoningCategories.size === 0) return null
      console.info('properties', f);
      if (f.properties.layerName === 'build_main.ae_tileset_zoningdistrict_label') return [0, 0, 0, 252]
      

      const { commercial, manufacturing, residential } = f.properties;
      //  console.log('commercial', commercial);
      //  console.log('manufacturing', manufacturing);
      //  console.log('residential', residential);
      //  return [252, 252, 252, 0];
      return [200, 200, 200, 252];
      // console.info(activeZoningCategories.keys().next().value)
    },
    updateTriggers: {
      visible: [activeLayers]
    }
  })
};
