import { ReactEChartsProps } from "@/components/ReactECharts";

const pieLegendWidths = {
  small: 148,
  medium: [152, 300],
  large: [340, 440],
};
const pieLegendMaxSymbolsCount = {
  small: 11,
  medium: [15, 30],
  large: [40, 55],
};
const pieColors = [
  "#FF877C",
  "#25B4C8",
  "#D88ADA",
  "#9ECC7F",
  "#F9DE82",
  "#39519B",
];
const pieLegendFormatter =
  (data: any[], maxSymbols: number) => (name: string) => {
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
  pageIconColor: "#C8CAD0",
  pageIconInactiveColor: "#6C7080",
  pageIconSize: 10,
  icon: "circle",
  top: "center",
  orient: "vertical",
  inactiveColor: "#6C7080",
  itemGap: 8,
  pageButtonGap: 16,
  pageTextStyle: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: "#C8CAD0",
  },
  // color: "#C8CAD0",
};
const pieLegendTextStyle = {
  width: pieLegendWidths.small,
  overflow: "break",
  rich: {
    value: {
      fontFamily: "Manrope",
      color: "#fff",
      fontSize: 14,
    },
    name: {
      fontFamily: "Manrope",
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
  emptyCircleStyle: {
    color: "#6C7080",
  },
};
// eslint-desable
export const smOption = (data: any) => ({
  tooltip: pieTooltip,
  grid: {
    ...pieGrid,
    left: 124,
  },
  series: {
    ...pieSeries,
    center: ["60px", "50%"],
    radius: [40, 56],
    data,
  },
  legend: {
    formatter: pieLegendFormatter(data, pieLegendMaxSymbolsCount.small),
    ...pieLegend,
    left: 124,
    textStyle: {
      ...pieLegendTextStyle,
    },
  },
});
//

export const getMdOption = (data: any[], withImage: boolean) => ({
  tooltip: pieTooltip,
  series: {
    ...pieSeries,
    center: ["25%", "50%"],
    radius: [52, 92],
    data,
  },
  grid: {
    ...pieGrid,
    left: "50%",
  },
  legend: {
    formatter: pieLegendFormatter(
      data,
      pieLegendMaxSymbolsCount.medium[withImage ? 0 : 1]
    ),
    textStyle: {
      ...pieLegendTextStyle,
      width: pieLegendWidths.medium[withImage ? 0 : 1],
    },
    ...pieLegend,
    pageIconSize: 16,
    left: "50%",
  },
});
export const getLgOption = (data: any[], withImage: boolean) => ({
  tooltip: pieTooltip,
  series: {
    ...pieSeries,
    center: ["25%", "50%"],
    radius: [51, 91],
    data,
  },
  grid: {
    ...pieGrid,
    left: "50%",
  },
  legend: {
    // pageTextStyle: {
    //   fontSize: 1,
    // },
    formatter: pieLegendFormatter(
      data,
      pieLegendMaxSymbolsCount.large[withImage ? 0 : 1]
    ),
    textStyle: {
      ...pieLegendTextStyle,
      width: pieLegendWidths.large[withImage ? 0 : 1],
    },
    ...pieLegend,
    left: "50%",
    pageIconSize: 0,
  },
});
