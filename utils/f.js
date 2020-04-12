const color = [
  "#1ABC9C",
  "#2ECC71",
  "#3498DB",
  "#9B59B6",
  "#34495E",
  "#16A085",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#E67E22",
  "#E74C3C",
  "#D35400",
  "#C0392B",
  "#2C3E50",
  "#f74f31",
];

export function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export const random_color = () => {
  return random_item(color);
};
