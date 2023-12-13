import { ReactEChartsProps } from "@/components/ReactECharts";

export const smOption: ReactEChartsProps["option"] = (
  data: any[],
  hasOverflow: boolean
) => ({
  color: "#25B4C8",
  backgroundStyle: {
    borderRadius: 10,
  },
  dataset: {
    source: hasOverflow
      ? [...data.slice(0, 1), ["...", 0], ...data.slice(1, 6)]
      : data,
  },
  grid: {
    top: 0,
    bottom: 0,
    right: 148,
  },
  xAxis: {
    name: null,
    inverse: true,
    axisLabel: { show: false },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#6C7080",
        width: 1,
      },
    },
  },
  yAxis: {
    axisLabel: {
      margin: 12,

      formatter: (name: string, idx: number) => {
        console.log("V", idx, name);

        if (idx) {
          const item = data[idx];
          const percents = item[1];
          const label = `{value|${percents}%}{space| }{name|${name}}`;
          return label;
        }
        const label = `{name|${name}}`;
        return label;
      },
      rich: {
        value: {
          color: 'red',
          lineHeight: 10,
          width:  25,
        },
        name: {
          color: "#C8CAD0",
        },
        space: {
          width:  5,
        },  
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
        fontFamily: "Manrope",
      },
      width: 150,
      overflow: "truncate",
    },
    position: "right",
    type: "category",
    axisLine: {
      show: true,
      lineStyle: {
        color: "#6C7080",
      },
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: "bar",
      encode: {
        x: "amount",
        y: "product",
      },
      itemStyle: {
        // color: "#25B4C8",
        barBorderRadius: 2,
      },
    },
  ],
  legend: {
    formatter: function (name:any) {
      // Using HTML for precise spacing
      return `${name}<span style='display:inline-block;width:10px;'></span>`;
    },
  }
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
