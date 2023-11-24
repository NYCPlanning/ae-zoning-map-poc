export type ZoningDistrictClassCategoryColor = {
  /**
   * @description The type of zoning district.
   * @type string
   * @example Residential
   */
  category: "Residential" | "Commercial" | "Manufacturing";
  /**
   * @description 1 is the octothorpe, 2-7 for rgb, 8-9 for opacity.
   * @type string
   * @example #ffec22ff
   */
  color: string;
};
