export default {
  INITIALVIEW: {
    LONG: -74.0008,
    LAT: 40.7018,
    ZOOM: 11,
  },
  BOUNDS: {
    WEST: -74.3308,
    SOUTH: 40.2989,
    EAST: -73.6311,
    NORTH: 41.103,
    ZOOM: {
      MIN: 9.5,
      MAX: 20,
    },
  },
  MAPSTYLE:
    "https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json",
  NAVIGATION: {
    POSITION: "top-left", //'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    COMPASS: true,
    ZOOM: true,
    PITCH: true,
  },
  SCALE: {
    POSITION: "bottom-left", //'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    MAXWIDTH: 200, //pixels
    UNIT: "imperial", //'imperial' | 'metric' | 'nautical'
  },
};
