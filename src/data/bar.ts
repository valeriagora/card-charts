import { images } from "@/app/bar/page";
import { ReactEChartsProps } from "@/components/ReactECharts";

function createSvgDataUrl(imageUrl: string) {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
      <rect width="100%" height="100%" fill="black" />
      <image href="${imageUrl}" x="0%" y="0%" height="100%" width="100%" transform="translate(-50%, -50%)" preserveAspectRatio="xMidYMid meet" />
    </svg>
  `;
  // return "path://M 0 0 L 10 5 L 0 10 z";
  // return "image://https://echarts.apache.org/examples/data/asset/img/weather/sunny_128.png";
  // return "image://data:image;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlUlEQVRYw2NgGAWjYBSMgiEAooE4jUwcTQ0H1APxfzJxPTUcwA3ET8mw/ClUL1VAMhkOSKZmOmAG4kskWH4JqoeqwJ0EB7jTKkfsIMLyHbTMkrpA/AeP5X+gamgK5uBxwBx6FEySQPwFi+VfoHJ0AfW0KnTILZyoWuiQUzglMwwAgBVONCl0SCmc3BlGwSgYBaOAAgAAeotyvZwCFhMAAAAASUVORK5CYII=";
  // return 'image://data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="%23f09f53" d="M4.996 4.996v22.008h22.008L4.996 4.996zm4 9 9.008 9.008H8.996v-9.008z"/><path fill="%231a4875" d="M27.357 26.65 5.35 4.643a.5.5 0 0 0-.854.353v22.008a.5.5 0 0 0 .5.5h22.008a.5.5 0 0 0 .353-.854zm-21.861-.146v-2h.5a.5.5 0 0 0 0-1h-.5v-1h1.5a.5.5 0 0 0 0-1h-1.5v-1h.5a.5.5 0 0 0 0-1h-.5v-1h1.5a.5.5 0 0 0 0-1h-1.5v-1h.5a.5.5 0 0 0 0-1h-.5v-1h1.5a.5.5 0 0 0 0-1h-1.5v-1h.5a.5.5 0 0 0 0-1h-.5v-1h1.5a.5.5 0 0 0 0-1h-1.5V6.203l20.301 20.301H5.496z"/><path fill="%231a4875" d="M8.996 23.504h9.008a.5.5 0 0 0 .354-.854L9.35 13.643a.5.5 0 0 0-.854.354v9.008a.5.5 0 0 0 .5.499zm.5-8.301 7.301 7.301H9.496v-7.301z"/></svg>';
}

export const getSmOption: ReactEChartsProps["option"] = (
  data: any[],
  hasOverflow: boolean
) => ({
  // title: {
  //   text: "Which words would you use to describe the TV promo a?",
  //   textStyle: {
  //     fontFamily: "Manrope",
  //     color: "#fff",
  //     width: 240,
  //     fontWeight: 200,
  //     fontSize: 14,
  //     lineHeight: 20,
  //     fontStyle: "normal",
  //     overflow: "break",
  //   },
  // },
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
export const getMdOption: ReactEChartsProps["option"] = (
  data: any[],
  withImage: boolean,
  hasOverflow: boolean
) => {
  let url;
  // const url = data[idx + 1][2];
  return {
    // title: {
    //   text: "Which words would you use to describe the TV promo a?",
    //   textStyle: {
    //     fontFamily: "Manrope",
    //     color: "#fff",
    //     width: 584,
    //     // height: 40, //
    //     fontWeight: 200,
    //     fontSize: 14,
    //     lineHeight: 20,
    //     fontStyle: "normal",
    //     overflow: "break",
    //   },
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
          console.log("name", name, idx);
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
          // const
          url = data[idx + 1][2];
          console.log("url", url);
          if (url) {
            const item = data[idx + 1];
            const percents = item[1];
            //   console.log("url", item, percents);

            return `{${url}| }{imgSpace| }{percents|${percents}%}{space| }{name|${name}}`;
          }
          const item = data[idx + 1];
          const percents = item[1];
          const label = `{value|${percents}%}{space| }{name|${name}}`;
          return label;
        },
        rich: {
          entertaining: {
            width: 72,
            fontSize: 60,
            backgroundColor: {
              image: createSvgDataUrl(images.entertaining),
              // image: images.entertaining,
            },
          },
          exciting: {
            width: 72,
            fontSize: 60,
            backgroundColor: {
              image: images.exciting,
            },
          },
          closeEnded: {
            width: 72,
            fontSize: 60,
            backgroundColor: {
              image: images.closeEnded,
            },
          },

          // url: {
          //   width: 72,
          //   fontSize: 60,
          //   // borderColor: "#6c7080",
          //   // borderWidth: 1,
          //   // borderStyle: "solid",
          //   // borderRadius: 4,
          //   backgroundColor: {
          //     image: url,
          //     // "https://images.unsplash.com/photo-1702839935474-1b56d70590c2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          //     // image: `https://plus.unsplash.com/premium_photo-1663045649003-a14867707a93?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
          //   },
          // },
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
