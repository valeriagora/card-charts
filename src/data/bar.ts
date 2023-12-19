import { ReactEChartsProps } from "@/components/ReactECharts";

export const getSmOption: ReactEChartsProps["option"] = (
  data: any[],
  hasOverflow: boolean
) => ({
  title: {
    text: "Which words would you use to describe the TV promo a?",
    textStyle: {
      fontFamily: "Manrope",
      color: "#fff",
      width: 240,
      fontWeight: 200,
      fontSize: 14,
      lineHeight: 20,
      fontStyle: "normal",
      overflow: "break",
    },
  },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {
  //       type: "svg",
  //     },
  //   },
  // },
  color: "#25B4C8",
  backgroundStyle: {
    borderRadius: 10,
  },
  dataset: {
    source: hasOverflow
      ? [...data.slice(0, 1), ["...", 0], ...data.slice(1, 6)]
      : data,
  },
  backgroundColor: "#292A33",
  show: true,
  grid: {
    top: 52,
    bottom: 0,
    right: "50%",
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
  // series: [
  //   {
  //     name: "Baidu",
  //     type: "bar",
  //     barWidth: 5,
  //     stack: "Search Engine",
  //     emphasis: {
  //       focus: "series",
  //     },
  //     data: [10, 22, 28, 43, 49],
  //   },
  // ],
  // xAxis: {
  //   data: ["A", "B", "C", "D", "E"],
  // },
  color: "#25B4C8",
  backgroundStyle: {
    borderRadius: 10,
  },
  dataset: {
    source: hasOverflow
      ? [...data.slice(0, 1), ["...", 0], ...data.slice(1, 12)]
      : data,
  },
  backgroundColor: "#292A33",
  show: true,
  grid: {
    top: 0,
    bottom: 20,
    right: "50%",
  },
  // yAxis: {},
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
        // const url = data[idx][2];
        // console.log("url", url);
        if (hasOverflow) {
          if (idx) {
            const item = data[idx];
            const percents = item[1];
            const label = `{value|${percents}%}{space| }{name|${name}}`;
            console.log("idx", item, percents, name);

            return label;
          }
          const label = `{value| }{space| }{name|${name}}`;
          return label;
        }
        const url = data[idx + 1][2];
        if (url) {
          const item = data[idx + 1];
          const percents = item[1];
          //   console.log("url", item, percents);

          return `{url| }{imgSpace| }{percents|${percents}%}{space| }{name|${name}}`;
        }
        const item = data[idx + 1];
        const percents = item[1];
        const label = `{value|${percents}%}{space| }{name|${name}}`;
        return label;
      },
      rich: {
        url: {
          width: 72,
          fontSize: 60,

          shadowColor: "#000",
          shadowBlur: 20,
          shadowOffsetX: 5,
          shadowOffsetY: 5,

          // borderColor: "#6c7080",
          // borderWidth: 1,
          // borderStyle: "solid",
          // borderRadius: 4,
          backgroundColor: {
            // image:
            //   "https://images.unsplash.com/photo-1702839935474-1b56d70590c2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: `https://plus.unsplash.com/premium_photo-1663045649003-a14867707a93?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
          },
        },
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
        imgSpace: {
          width: 8,
        },
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
      },
      width: withImage ? 180 : 290,
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
      barWidth: "16px",
      encode: {
        x: "amount",
        y: "product",
      },
      itemStyle: {
        // color: "pink",
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
