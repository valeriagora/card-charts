import { ReactEChartsProps } from "@/components/ReactECharts";

export const smOption: ReactEChartsProps["option"] = (data) => ({
  dataset: {
    source: [
      ["product", "amount"],
      ["Matcha Latte", -50],
      ["Milk Tea", -10],
      ["Cheese Cocoa", -15],
      ["Cheese Brownie", -25],
    ],
  },
  grid: {
    backgroundColor: "#ddd",
    borderColor: "#333",
    top: 10,
    bottom: 30,
    // left: 50,
    // right: 50,
  },
  xAxis: { name: "amount" },
  yAxis: {
    type: "category",
    axisLine: {
      show: false,
      // onZero: false,
    },
    axisTick: {
      show: false,
    },
  },
  label: { show: true },
  series: [
    {
      type: "bar",
      encode: {
        // Map the "amount" column to X axis.
        x: "amount",
        // Map the "product" column to Y axis
        y: "product",
      },
    },
  ],
  // legend: { show: true, align: "right", right: 50 },
});
//

// export const getMdOption: ReactEChartsProps["option"] = (
//   data: any[],
//   withImage: boolean
// ) => ({
//   tooltip: pieTooltip,
//   series: {
//     ...pieSeries,
//     center: ["25%", "50%"],
//     radius: [52, 92],
//     data,
//   },
//   grid: {
//     ...pieGrid,
//     left: "50%",
//   },
//   legend: {
//     formatter: pieLegendFormatter(
//       data,
//       pieLegendMaxSymbolsCount.md[withImage ? 0 : 1]
//     ),
//     textStyle: {
//       ...pieLegendTextStyle,
//       width: pieLegendWidths.md[withImage ? 0 : 1],
//     },
//     ...pieLegend,
//     pageIconSize: 16,
//     left: "50%",
//   },
// });
// export const getLgOption: ReactEChartsProps["option"] = (
//   data: any[],
//   withImage: boolean
// ) => ({
//   tooltip: pieTooltip,
//   series: {
//     ...pieSeries,
//     center: ["25%", "50%"],
//     radius: [51, 91],
//     data,
//   },
//   grid: {
//     ...pieGrid,
//     left: "50%",
//   },
//   legend: {
//     pageTextStyle: {
//       fontSize: 1,
//     },
//     formatter: pieLegendFormatter(
//       data,
//       pieLegendMaxSymbolsCount.lg[withImage ? 0 : 1]
//     ),
//     textStyle: {
//       ...pieLegendTextStyle,
//       width: pieLegendWidths.lg[withImage ? 0 : 1],
//     },
//     ...pieLegend,
//     left: "50%",
//     pageIconSize: 0,
//   },
// });
