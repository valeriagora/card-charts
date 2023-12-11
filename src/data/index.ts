import { ReactEChartsProps } from "@/components/ReactECharts";

export const data = [
  { value: 10, name: "Search Engine" },
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
    name: "1",
    // name: "Search Engine Search Engine Search Engine Search Engine",
  },
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
  // { value: 5, name: "Option 9" },
];
export const smOption: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "item",
  },
  series: {
    color: ["#FF877C", "#25B4C8", "#D88ADA", "#9ECC7F", "#F9DE82", "#39519B"],
    center: ["23%", "50%"],
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
    // pageTextStyle: {},
    formatter: (name: string) => {
      const percents = data.find((item) => item.name === name)?.value;
      const label = `{value|${percents}%} {name|${name}}`;
      const overflowed = `{value|${percents}%} {name|${
        name.slice(0, 11) + "..."
      }}`;
      return name.length < 10 ? label : overflowed;
    },
    textStyle: {
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
    top: "0px",
    right: "1%",
    width: "20%",
    orient: "vertical",
    inactiveColor: "#333",
  },
};
//
//
//
export const lgOption: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "item",
  },
  series: {
    // width: 472,
    color: ["#FF877C", "#25B4C8", "#D88ADA", "#9ECC7F", "#F9DE82", "#39519B"],
    center: ["23%", "50%"],
    type: "pie",
    radius: ["60%", "90%"],
    data: lgData,
    label: {
      show: false,
    },
  },
  legend: {
    width: 340,

    type: "scroll",
    pageIconColor: "pink",
    pageIconInactiveColor: "pink",
    // pageIconColor: "transparent",
    // pageIconInactiveColor: "transparent",
    pageIconSize: 0,
    pageTextStyle: {
      fontSize: 1,
      // display: "none",
    },
    // pageButtonGap: 20,

    formatter: (name: string) => {
      const percents = lgData.find((item) => item.name === name)?.value;
      const label = `{value|${percents}%} {name|${name}}`;
      return label;
    },
    textStyle: {
      width: 340,
      overflow: "break",
      //
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
    // right: "10%",
    right: "100px",
    // width: "20%",
    orient: "vertical",
    inactiveColor: "#333",
  },
};
