import { MVTLayer } from "@deck.gl/geo-layers/typed";

export const zoningDistrictsLayer = new MVTLayer({
  id: "zoningDistricts",
  data: `${
    import.meta.env.VITE_ZONING_API_URL
  }/zoning-districts/{z}/{x}/{y}.pbf`,
  getLineColor: [192, 0, 192],
  getFillColor: [140, 170, 180],
  visible: true,
});
