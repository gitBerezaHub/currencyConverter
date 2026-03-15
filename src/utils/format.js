export function formatNumber(value) {
  const formatter = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}
