import { ReactEChartsProps } from "@/components/ReactECharts";

export const data = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine",
  },
  { value: 35, name: "Direct" },
  { value: 25, name: "Other" },
  { value: 15, name: "Option 1" },
  { value: 2, name: "Option 2" },
  { value: 3, name: "Option 3" },
  { value: 4, name: "Option 4" },
  { value: 3, name: "Option 5 Engine Search Engine Search Engine Search" },
  { value: 2, name: "Option 6" },
  { value: 2, name: "Option 7" },
  { value: 2, name: "Option 8" },
  { value: 2, name: "Option 9" },
  { value: 2, name: "Option 10" },
  { value: 2, name: "Option 11" },
  { value: 1, name: "Option 12" },
];
const pieLegendWidths = {
  sm: 148,
  md: [152, 300],
  lg: [340, 440],
};
const pieLegendMaxSymbolsCount = {
  sm: 11,
  md: [15, 30],
  lg: [40, 55],
};
const pieColors = [
  "#FF877C",
  "#25B4C8",
  "#D88ADA",
  "#9ECC7F",
  "#F9DE82",
  "#39519B",
];
const pieLegendFormatter = (maxSymbols: number) => (name: string) => {
  const percents = data.find((item) => item.name === name)?.value;
  const label = `{value|${percents}%} {name|${name}}`;
  const overflowed = `{value|${percents}%} {name|${
    name.slice(0, maxSymbols - 1) + "..."
  }}`;
  return name.length < maxSymbols ? label : overflowed;
};
const pieTooltip = {
  trigger: "item",
};
const pieLegend = {
  type: "scroll",
  pageIconColor: "#3B3E4A",
  pageIconInactiveColor: "#2F313B",
  pageIconSize: 10,
  icon: "circle",
  top: "center",
  orient: "vertical",
  inactiveColor: "#333",
};
const pieLegendTextStyle = {
  width: pieLegendWidths.sm,
  overflow: "break",
  fontFamily: "Manrope, sans-serif",
  rich: {
    value: {
      color: "#fff",
      fontSize: 14,
    },
    name: {
      color: "#6C7080",
      fontSize: 14,
    },
  },
};

const pieGrid = {
  right: 0,
  top: 0,
  bottom: 0,
};
const pieSeries = {
  type: "pie",
  color: pieColors,
  label: {
    show: false,
  },
};
export const smOption: ReactEChartsProps["option"] = {
  tooltip: pieTooltip,
  grid: {
    ...pieGrid,
    left: 124,
  },
  series: {
    ...pieSeries,
    center: ["60px", "50%"],
    radius: ["60%", "90%"],
    data,
  },
  legend: {
    formatter: pieLegendFormatter(pieLegendMaxSymbolsCount.sm),
    ...pieLegend,
    left: 124,
    textStyle: {
      ...pieLegendTextStyle,
    },
  },
};
//
export const getMdOption: ReactEChartsProps["option"] = (
  withImage: boolean
) => ({
  tooltip: pieTooltip,
  series: {
    ...pieSeries,
    center: ["25%", "50%"],
    radius: ["30%", "50%"],
    data,
  },
  grid: {
    ...pieGrid,
    left: "50%",
  },
  legend: {
    formatter: pieLegendFormatter(
      pieLegendMaxSymbolsCount.md[withImage ? 0 : 1]
    ),
    textStyle: {
      ...pieLegendTextStyle,
      width: pieLegendWidths.md[withImage ? 0 : 1],
    },
    ...pieLegend,
    left: "50%",
  },
});
export const getLgOption: ReactEChartsProps["option"] = (
  withImage: boolean
) => ({
  tooltip: pieTooltip,
  series: {
    ...pieSeries,
    center: ["25%", "50%"],
    radius: ["60%", "90%"],
    data,
  },
  grid: {
    ...pieGrid,
    left: "50%",
  },
  legend: {
    pageTextStyle: {
      fontSize: 1,
    },
    formatter: pieLegendFormatter(
      pieLegendMaxSymbolsCount.lg[withImage ? 0 : 1]
    ),
    textStyle: {
      ...pieLegendTextStyle,
      width: pieLegendWidths.lg[withImage ? 0 : 1],
    },
    ...pieLegend,
    left: "50%",
    pageIconSize: 0,
  },
});
