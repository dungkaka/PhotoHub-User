import { random_item } from "./f";

const gradient = {
  warm_flame: ["#ff9a9e", "#fad0c4"],
  juicy_peach: ["#ffecd2", "#fcb69f"],
  lady_lips: ["#ff9a9e", "#fecfef"],
  winter_neva: ["#a1c4fd", "#c2e9fb"],
  heavy_rain: ["#cfd9df", "#e2ebf0"],
  happy_fisher: ["#89f7fe", "#66a6ff"],
  great_whale: ["#a3bded", "#6991c7"],
  aqua_splash: ["#13547a", "#80d0c7"],
  passionate_bed: ["#ff758c", "#ff7eb3"],
  desert_hump: ["#c79081", "#dfa579"],
};

const gradientArray = [
  gradient.warm_flame,
  gradient.juicy_peach,
  gradient.lady_lips,
  gradient.winter_neva,
  gradient.heavy_rain,
  gradient.happy_fisher,
  gradient.great_whale,
  gradient.aqua_splash,
  gradient.passionate_bed,
  gradient.desert_hump,
];

export const random_gradient = () => {
  return random_item(gradientArray);
};
