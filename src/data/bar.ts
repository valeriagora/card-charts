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
        if (hasOverflow) {
          if (idx) {
            const item = data[idx];
            const percents = item[1];
            const label = `{value|${percents}%}{space| }{name|${name}}`;
            return label;
          }
          const label = `{value| }{space| }{name|${name}}`;
          return label;
        }
        const item = data[idx + 1];
        const percents = item[1];
        const label = `{value|${percents}%}{space| }{name|${name}}`;
        return label;
      },
      rich: {
        value: {
          fontFamily: "Manrope",
          color: "#fff",
          lineHeight: 10,
          width: 25,
        },
        name: {
          fontFamily: "Manrope",
          color: "#C8CAD0",
        },
        space: {
          width: 5,
        },
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
      },
      width: 140,
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
});
//
export const getMdOption: ReactEChartsProps["option"] = (
  data: any[],
  withImage: boolean,
  hasOverflow: boolean
) => ({
  color: "#25B4C8",
  backgroundStyle: {
    borderRadius: 10,
  },
  dataset: {
    source: hasOverflow
      ? [...data.slice(0, 1), ["...", 0], ...data.slice(1, 12)]
      : data,
  },
  grid: {
    top: 0,
    bottom: 20,
    right: "50%",
  },
  xAxis: {
    name: null,
    inverse: true,
    axisLabel: {
      show: true,
      fontStyle: "Manrope",
      color: "#6C7080",
      fontSize: 12,
      fontWeight: 400,
    },
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
        if (hasOverflow) {
          if (idx) {
            const item = data[idx];
            const percents = item[1];
            const label = `{value|${percents}%}{space| }{name|${name}}`;
            return label;
          }
          const label = `{value| }{space| }{name|${name}}`;
          return label;
        }
        const item = data[idx + 1];
        const percents = item[1];
        const label = `{value|${percents}%}{space| }{name|${name}}`;
        return label;
      },
      rich: {
        value: {
          fontFamily: "Manrope",
          color: "#fff",
          lineHeight: 10,
          width: 25,
        },
        name: {
          fontFamily: "Manrope",
          color: "#C8CAD0",
        },
        space: {
          width: 5,
        },
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
      },
      width: withImage ? 180 : 300,
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
});
export const getLgOption: ReactEChartsProps["option"] = (
  data: any[],
  withImage?: boolean
) => ({
  color: "#25B4C8",
  backgroundStyle: {
    borderRadius: 10,
  },
  dataset: {
    source: data,
  },
  grid: {
    top: 0,
    bottom: 20,
    right: "50%",
  },
  xAxis: {
    name: null,
    inverse: true,
    axisLabel: {
      show: true,
      fontStyle: "Manrope",
      color: "#6C7080",
      fontSize: 12,
      fontWeight: 400,
    },
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
        const item = data[idx + 1];
        const percents = item[1];
        const label = `{value|${percents}%}{space| }{name|${name}}`;
        return label;
      },
      rich: {
        value: {
          fontFamily: "Manrope",
          color: "#fff",
          lineHeight: 10,
          width: 25,
        },
        name: {
          fontFamily: "Manrope",
          color: "#C8CAD0",
        },
        space: {
          width: 5,
        },
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
      },
      width: withImage ? 350 : 450,
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
});
