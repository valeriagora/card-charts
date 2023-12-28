import { ReactEChartsProps } from "@/components/ReactECharts";
import { ECharts } from "echarts";

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
export const getSvgBlob = async (chartInstance: ECharts) => {
  const svgRows = (chartInstance.renderToSVGString() as string).split("\n");
  svgRows.splice(
    1,
    0,
    '<defs><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Manrope);</style></defs>'
  );
  const blob = new Blob([svgRows.join("\n")], { type: "image/svg+xml" });
  const base64 = await blobToBase64(blob);
  return base64;
};
export const getBase64Image = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      }
    };
    img.onerror = (error) => reject(error);
  });
};

export const getSmOption: ReactEChartsProps["option"] = (
  data: {
    labels: { [key: string]: string }[];
    values: number[];
    images?: { [key: string]: string };
  },
  hasOverflow: boolean
) => ({
  backgroundColor: "#222430",
  show: true,
  grid: {
    top: 0,
    bottom: hasOverflow ? 20 : 0,
    right: "50%",
  },
  xAxis: {
    name: "",
    inverse: true,
    axisLabel: {
      show: false,
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
      margin: 8,
      formatter: (name: string, idx: number) => {
        const spacing = "  ";
        const percents = data.values[idx];
        const label = `{percents|${percents}%}${spacing}{name|${name}}`;
        return label;
      },
      rich: {
        percents: {
          fontSize: "14px",
          fontFamily: "Manrope",
          color: "#C8CAD0",
        },
        name: {
          fontSize: "14px",
          fontFamily: "Manrope",
          color: "#6c7080",
        },
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
      },
      width: 130,
      overflow: "truncate",
    },
    data: hasOverflow
      ? Object.values(data.labels).slice(0, 5)
      : Object.values(data.labels),
    position: "right",
    type: "category",
    axisLine: {
      show: true,
      lineStyle: {
        color: "#6C7080",
        width: 1,
      },
    },
    axisTick: {
      show: false,
    },
  },
  series: {
    data: hasOverflow ? data.values.slice(0, 5) : data.values,
    type: "bar",
    barWidth: 16,
    itemStyle: {
      color: "#25B4C8",
    },
  },
});
//
const getOptionImageStyles = (
  images: { [key: string]: string },
  label: string
) => {
  return {
    width: 72,
    height: 72,
    backgroundColor: {
      image: images[label],
    },
  };
};
interface IOptionImages {
  [key: string]: {
    width: number;
    backgroundColor: {
      image: string;
    };
  };
}
export const getMdOption = (
  data: {
    labels: { [key: string]: string }[];
    values: number[];
    images?: { [key: string]: string };
  },
  withImage: boolean,
  withImageOptions: boolean,
  hasOverflow: boolean
): ReactEChartsProps["option"] => {
  const imageOptions = data.images
    ? Object.keys(data.labels).reduce((total: IOptionImages, label: string) => {
        const styles = getOptionImageStyles(data.images!, label);
        total[label] = styles;
        return total;
      }, {})
    : [];

  return {
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: 0,
      bottom: 28,
      right: "50%",
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        show: true,
        fontFamily: "Manrope",
        color: "#6C7080",
        fontSize: 12,
        lineHeight: 20,
        fontWeight: 500,
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
        margin: 8,
        formatter: (name: string, idx: number) => {
          // return "Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr Nsmr";
          const spacing = "  ";
          if (withImageOptions) {
            const percents = data.values[idx];
            const imageId = Object.keys(data.labels)[idx];
            const label = `{${imageId}|}${spacing}{percents|${percents}%}${spacing}{name|${name}}`;
            return label;
          }
          const percents = data.values[idx];
          const label = `{percents|${percents}%}${spacing}{name|${name}}`;
          return label;
        },
        rich: {
          // ...imageOptions,
          percents: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#C8CAD0",
          },
          name: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#6c7080",
          },
        },
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
          ? 300
          : 300,
        overflow: "truncate",
      },
      data: hasOverflow
        ? withImageOptions
          ? Object.values(data.labels).slice(0, 4)
          : Object.values(data.labels).slice(0, 11)
        : Object.values(data.labels),
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
export const getLgOption = (
  data: {
    labels: { [key: string]: string }[];
    values: number[];
    images?: { [key: string]: string };
  },
  withImage: boolean,
  withImageOptions: boolean
): ReactEChartsProps["option"] => {
  // console.log("data", data);
  // console.log("withImage", withImage, withImageOptions);

  const imageOptions = data.images
    ? Object.keys(data.labels).reduce((total: IOptionImages, label: string) => {
        const styles = getOptionImageStyles(data.images!, label);
        total[label] = styles;
        return total;
      }, {})
    : [];
  // console.log("imageOptions", imageOptions);
  return {
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: 0,
      bottom: 28,
      right: "50%",
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        show: true,
        fontFamily: "Manrope",
        color: "#6C7080",
        fontSize: 12,
        lineHeight: 20,
        fontWeight: 500,
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
        margin: 8,
        formatter: (name: string, idx: number) => {
          const spacing = "  ";

          if (withImageOptions) {
            const percents = data.values[idx];
            const imageId = Object.keys(data.labels)[idx];
            // console.log("imageId", data.labels);
            const label = `{${imageId}|}${spacing}{percents|${percents}%}${spacing}{name|${name}}`;
            return label;
          }
          const percents = data.values[idx];
          const label = `{percents|${percents}%}${spacing}{name|${name}}`;
          return label;
        },
        rich: {
          ...imageOptions,
          percents: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#C8CAD0",
          },
          name: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#6c7080",
          },
        },
        textStyle: {
          fontSize: 14,
          fontWeight: 500,
          color: "#6C7080",
        },
        width: withImage
          ? withImageOptions
            ? 410
            : 430
          : withImageOptions
          ? 480
          : 570,
        overflow: "break",
      },
      data: Object.values(data.labels),
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
