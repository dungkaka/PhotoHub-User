export const color = {
  redPastel: "#E74C3C",
  redPastelDark: "#C0392B",
  redPastelLight: "#f74f31",
  redDark: "#c92014",
  redOrange: "#f74f31",

  orange: "#E67E22",
  orangeMax: "ff6200",
  orangeDark: "#D35400",
  orangePastel: "f08c35",
  orangeLight: "#ff871c",

  yellow: "#e6fc21",
  yellowPastel: "ebde50",

  greenBlue: "#1ABC9C",
  greenTree: "#2ECC71",
  greenPastel: "#3ede5b",
  greenPastelMax: "#00ff66",
  greenBlueDark: "#16A085",
  greenDark: "#27AE60",

  blue: "#23b2eb",
  blueModern1: "#3498DB",
  blueModern2: "#2b8fe0",
  blueMax: "#00b7ff",
  blueModernDark: "#2980B9",
  blueDark: "#165f9c",
  blueDarkExtra: "#0d4370",

  purpleDark: "#8E44AD",
  purple: "#9B59B6",

  pinkPastel: "#e858b1",
  pinkRedPastel: "#e64572",

  grayBlueModern1: "#34495E",
  grayBlueModern2: "#2C3E50",

  backgroundAndroid: "#f2f2f2",

  gray1: "#f2f2f2",
  gray2: "#e6e6e6",
  gray3: "#d1d1d1",
  gray4: "#bababa",
  gray5: "#9c9c9c",
  gray6: "#828282",
  gray7: "#666666",
  gray8: "#4f4f4f",
  gray9: "#3b3b3b",
  gray10: "#292929",

  black: "#000000",
  white: "#ffffff",
};

const colorArray = [
  color.redPastel,
  color.redPastelDark,
  color.orangeLight,
  color.greenBlue,
  color.greenBlueDark,
  color.blueModern2,
  color.blue,
  color.purple,
  color.pinkRedPastel,
  color.grayBlueModern1,
  color.redOrange,
];

export function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export const random_color = () => {
  return random_item(colorArray);
};

export const delay = (m: any) => new Promise((r) => setTimeout(r, m));
