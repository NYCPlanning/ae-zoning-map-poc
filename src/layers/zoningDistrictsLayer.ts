import { MVTLayer } from "@deck.gl/geo-layers/typed";

export function hexToRgba(hex: string) {
  let r, g, b, a;
  hex = hex.replace("#", "");
  if (3 === hex.length) {
    r = hex.charAt(0);
    g = hex.charAt(1);
    b = hex.charAt(2);
  } else if (4 === hex.length) {
    r = hex.charAt(0);
    g = hex.charAt(1);
    b = hex.charAt(2);
    a = hex.charAt(3);
  } else if (6 === hex.length) {
    r = hex.substring(0, 2);
    g = hex.substring(2, 4);
    b = hex.substring(4, 6);
  } else if (8 === hex.length) {
    r = hex.substring(0, 2);
    g = hex.substring(2, 4);
    b = hex.substring(4, 6);
    a = hex.substring(6, 8);
  } else {
    return "";
  }
  if ("undefined" === typeof a) {
    a = "ff";
  }
  if (1 === r.length) {
    r += r;
  }
  if (1 === g.length) {
    g += g;
  }
  if (1 === b.length) {
    b += b;
  }
  if (1 === a.length) {
    a += a;
  }
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  a = parseInt(a, 16);
  // return alpha value of 76 (30%) for now because data have 100% opacity.
  return [r, g, b, 76];
}

export function processColors(colors: any | null) {
  if (colors == null) {
    return null;
  }
  const colorsObj: any = {};
  for (let i = 0; i < colors.length; i++) {
    colorsObj[colors[i].id] = hexToRgba(colors[i].color);
  }
  return colorsObj;
}
