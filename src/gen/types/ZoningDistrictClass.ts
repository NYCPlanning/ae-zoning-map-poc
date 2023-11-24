export type ZoningDistrictClass = {
  /**
   * @description From a list of each unique instance of a zoning code found through the [zonedist split process](https://github.com/NYCPlanning/data-engineering/issues/284#issuecomment-1759636648) (Each row should be a value like M1 or R7)
   * @type string
   * @example M1
   */
  id: string;
  /**
   * @description The type of zoning district.
   * @type string
   * @example Residential
   */
  category: "Residential" | "Commercial" | "Manufacturing";
  /**
   * @description Zoning class descriptions from [ZoLa](https://github.com/NYCPlanning/labs-zola/blob/777cd81e5397e63984acbd081cafd037cd242fc4/app/components/layer-record-views/zoning-district.js#L3)
   * @type string
   * @example M1 districts are designated for areas with light industries.
   */
  description: string;
  /**
   * @description The full url to the planning website page that explains the zoning district.
   * @type string | null
   * @example https://www.nyc.gov/site/planning/zoning/districts-tools/m1.page
   */
  url: string | null;
  /**
   * @description Zoning classes from the existing ZoLa [layer groups](https://github.com/NYCPlanning/labs-zola/blob/07030aad23d60925d78c44fceed8075d94f5e9c2/public/layer-groups.json#L6188). 1 is the octothorpe, 2-7 for rgb, 8-9 for opacity.
   * @type string
   * @example #f3b3ffff
   */
  color: string;
};
