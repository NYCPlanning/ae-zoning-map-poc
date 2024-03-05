import { findBoroughsHandler } from "./findBoroughsHandler";
import { findLandUsesHandler } from "./findLandUsesHandler";
import { findTaxLotsHandler } from "./findTaxLotsHandler";
import { findTaxLotByBblHandler } from "./findTaxLotByBblHandler";
import { findTaxLotGeoJsonByBblHandler } from "./findTaxLotGeoJsonByBblHandler";
import { findZoningDistrictsByTaxLotBblHandler } from "./findZoningDistrictsByTaxLotBblHandler";
import { findZoningDistrictClassesByTaxLotBblHandler } from "./findZoningDistrictClassesByTaxLotBblHandler";
import { findZoningDistrictByZoningDistrictIdHandler } from "./findZoningDistrictByZoningDistrictIdHandler";
import { findZoningDistrictClassesByZoningDistrictIdHandler } from "./findZoningDistrictClassesByZoningDistrictIdHandler";
import { findZoningDistrictClassesHandler } from "./findZoningDistrictClassesHandler";
import { findZoningDistrictClassCategoryColorsHandler } from "./findZoningDistrictClassCategoryColorsHandler";
import { findZoningDistrictClassByZoningDistrictClassIdHandler } from "./findZoningDistrictClassByZoningDistrictClassIdHandler";

export const handlers = [findBoroughsHandler, findLandUsesHandler, findTaxLotsHandler, findTaxLotByBblHandler, findTaxLotGeoJsonByBblHandler, findZoningDistrictsByTaxLotBblHandler, findZoningDistrictClassesByTaxLotBblHandler, findZoningDistrictByZoningDistrictIdHandler, findZoningDistrictClassesByZoningDistrictIdHandler, findZoningDistrictClassesHandler, findZoningDistrictClassCategoryColorsHandler, findZoningDistrictClassByZoningDistrictClassIdHandler] as const;