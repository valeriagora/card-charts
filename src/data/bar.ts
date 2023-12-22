import { ReactEChartsProps } from "@/components/ReactECharts";

export const getSmOption: ReactEChartsProps["option"] = (
  data: any[],
  hasOverflow: boolean
) => ({
  color: "#25B4C8",
  backgroundStyle: {
    borderRadius: 10,
  },
  dataset: {
    source:
      //  hasOverflow
      //   ? [...data.slice(0, 1), ["...", 0], ...data.slice(1, 6)]
      //   :
      data,
  },
  backgroundColor: "#292A33",
  show: true,
  grid: {
    top: 48,
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
      show: true,

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
const getOptionImageStyles = (
  images: { [key: string]: string },
  label: string
) => ({
  width: 72,
  height: 72,
  backgroundColor: {
    image: images[label],
    objectFit: "contain",
  },
});

interface IOptionImages {
  [key: string]: {
    width: number;
    backgroundColor: {
      image: string;
    };
  };
}
export const getMdOption: ReactEChartsProps["option"] = (
  data: {
    labels: Array<Array<string>>;
    values: number[];
    images: { [key: string]: string };
  },
  withImage: boolean,
  withImageOptions: boolean,
  hasOverflow: boolean,
  images: IOptionImages
) => {
  const imageOptions = Object.keys(data.labels).reduce((total, label) => {
    const styles = getOptionImageStyles(data.images, label);
    total[label] = styles;
    return total;
  }, {} as IOptionImages);

  return {
    // backgroundStyle: {
    //   borderRadius: 10,
    // },
    dataZoom: [
      {
        id: "dataZoomX",
        type: "slider",
        yAxisIndex: [0],
        filterMode: "filter",
      },
    ],
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
      },
    },
    backgroundColor: "#292A33",
    show: true,
    grid: {
      top: 0,
      bottom: 20,
      right: "50%",
      // show: true,
      // backgroundColor: "pink",
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
        // show: true,
        margin: 12,
        formatter: (name: string, idx: number) => {
          console.log(name, data, idx);
          const spacing = "  ";
          if (withImageOptions) {
            const percents = data.values[idx];
            const imageId = Object.keys(data.labels)[idx];
            const label = `{${imageId}|}${spacing}{percents|${percents}%}${spacing}{name|${name}}`;
            return label;
          }
        },
        rich: {
          ...imageOptions,
          percents: {
            fontFamily: "Manrope",
            color: "#C8CAD0",
            // width: 5,
          },
          name: {
            fontFamily: "Manrope",
            color: "#6c7080",
            // width: 20,
          },
        },
        // formatter: (name: string, idx: number) => {
        //   const spacing = "  ";
        //   // console.log("name,idx", name, idx); // if has overflow, idx with ... is 0
        //   // if !hasOverflow, idx with axis label is 0
        //   // hasOverflow + image options
        //   if (hasOverflow) {
        //     if (withImageOptions) {
        //       console.log("name,idx", name, idx); // if has overflow, idx with ... is 0

        //       // return "123";
        //       // if (idx) {
        //       const url = data[idx + 1][2];
        //       const item = data[idx + 1];
        //       const percents = item[1];
        //       return `{${url}|}${spacing}{percents|${percents}%}${spacing}{name|${name}}`;
        //       // }
        //     }
        //     if (idx) {
        //       const item = data[idx];
        //       const percents = item[1];
        //       const label = `{value|${percents}%}${spacing}{name|${name}}`;
        //       return label;
        //     }
        //     //
        //     // url = data[idx + 1][2];
        //     // console.log(data, idx);
        //     // if (url) {
        //     //   console.log("urll with overflow", url);

        //     //   const item = data[idx + 1];
        //     //   const percents = item[1];
        //     //   return `{${url}|}${spacing}{percents|${percents}%}${spacing}{name|${name}}`;
        //     // }
        //     //
        //     const label = `{value|}${spacing}{name|${name}}`;
        //     return label;
        //   }

        //   // console.log("urll", url);
        //   if (withImageOptions) {
        //     const url = data[idx + 1][2];
        //     const item = data[idx + 1];
        //     const percents = item[1];
        //     return `{${url}|}${spacing}{percents|${percents}%}${spacing}{name|${name}}`;
        //   }
        //   const item = data[idx + 1];
        //   const percents = item[1];
        //   const label = `{value|${percents}%}${spacing}{name|${name}}`;
        //   return label;
        // },

        textStyle: {
          fontSize: 14,
          fontWeight: 500,
          color: "#6C7080",
        },
        width: withImage
          ? withImageOptions
            ? 170
            : 180
          : withImageOptions
          ? 310
          : 310,
        overflow: "truncate",
      },
      data:
        // hasOverflow
        // ? withImageOptions
        //   ? Object.values(data.labels).slice(0, 4)
        //   :
        //  Object.values(data.labels).slice(0, 11)
        // :
        Object.values(data.labels),
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
    series: {
      data: data.values,
      type: "bar",
      barWidth: 16,
      itemStyle: {
        color: "#25B4C8",
      },
    },
  };
};
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
  // series: [
  //   {
  //     type: "bar",
  //     barWidth: 16,
  //     itemStyle: {
  //       // color: "#25B4C8",
  //       barBorderRadius: 2,
  //     },
  //   },
  // ],
});
