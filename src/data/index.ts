import { ReactEChartsProps } from "@/components/ReactECharts";

export const data = [
  { value: 10, name: "Search Engine Search 123" },
  { value: 20, name: "Direct" },
  { value: 25, name: "Other" },
  { value: 15, name: "Option 1" },
  { value: 2, name: "Option 2" },
  { value: 3, name: "Option 3" },
  { value: 2, name: "Option 4" },
  { value: 3, name: "Option 5" },
  { value: 5, name: "Option 6" },
  { value: 5, name: "Option 7" },
  { value: 5, name: "Option 8" },
  { value: 5, name: "Option 9" },
];
export const lgData = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine",
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
export const smOption: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "item",
  },
  grid: {
    // show: true,
    right: 0,
    top: 0,
    bottom: 0,
    left: "124px",
  },
  series: {
    color: ["#FF877C", "#25B4C8", "#D88ADA", "#9ECC7F", "#F9DE82", "#39519B"],
    center: ["60px", "50%"],
    type: "pie",
    radius: ["60%", "90%"],
    data,
    label: {
      show: false,
    },
  },
  legend: {
    type: "scroll",
    pageIconColor: "#3B3E4A",
    pageIconInactiveColor: "#2F313B",
    pageIconSize: 10,

    formatter: (name: string) => {
      const percents = data.find((item) => item.name === name)?.value;
      const label = `{value|${percents}%} {name|${name}}`;
      const overflowed = `{value|${percents}%} {name|${
        name.slice(0, 11) + "..."
      }}`;
      // return label;
      return name.length < 10 ? label : overflowed;
    },
    textStyle: {
      width: 148,
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
    },
    icon: "circle",
    top: "center",
    left: "124px",
    orient: "vertical",
    inactiveColor: "#333",
  },
};
//
//
//
export const mdOption: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "item",
  },
  series: {
    color: ["#FF877C", "#25B4C8", "#D88ADA", "#9ECC7F", "#F9DE82", "#39519B"],
    center: ["25%", "50%"],
    type: "pie",
    radius: ["30%", "50%"],
    data: lgData,
    label: {
      show: false,
    },
  },
  grid: {
    // show: true,
    right: 0,
    top: 0,
    bottom: 0,
    left: "50%",
  },
  legend: {
    type: "scroll",
    pageIconColor: "#3B3E4A",
    pageIconInactiveColor: "#2F313B",
    pageIconSize: 10,

    formatter: (name: string) => {
      const percents = lgData.find((item) => item.name === name)?.value;
      const label = `{value|${percents}%} {name|${name}}`;
      const overflowed = `{value|${percents}%} {name|${
        name.slice(0, 14) + "..."
      }}`;
      return name.length < 15 ? label : overflowed;
    },
    textStyle: {
      width: 152,
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
    },
    icon: "circle",
    top: "center",
    left: "50%",
    orient: "vertical",
    inactiveColor: "#333",
  },
};
export const lgOption: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "item",
  },
  series: {
    color: ["#FF877C", "#25B4C8", "#D88ADA", "#9ECC7F", "#F9DE82", "#39519B"],
    center: ["25%", "50%"],
    type: "pie",
    radius: ["60%", "90%"],
    data: lgData,
    label: {
      show: false,
    },
  },
  grid: {
    // show: true,
    right: 0,
    top: 0,
    bottom: 0,
    left: "50%",
  },
  legend: {
    type: "scroll",
    pageIconColor: "pink",
    pageIconInactiveColor: "pink",
    pageIconSize: 0,
    pageTextStyle: {
      fontSize: 1,
    },
    formatter: (name: string) => {
      const percents = lgData.find((item) => item.name === name)?.value;
      const label = `{value|${percents}%} {name|${name}}`;
      const overflowed = `{value|${percents}%} {name|${
        name.slice(0, 39) + "..."
      }}`;
      return name.length < 40 ? label : overflowed;
    },
    textStyle: {
      width: 340,
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
    },
    icon: "circle",
    top: "center",
    left: "50%",
    orient: "vertical",
    inactiveColor: "#333",
  },
};
