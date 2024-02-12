"use client";
import React from "react";

import { CardSize, CustomLegend } from "@/charts/types";
import PieChart from "@/charts/components/pie/PieChart";

const pieData: PieData[] = [
  {
    value: 25,
    name: "Pie chart without options images Other Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
  },
  {
    value: 15,
    name: "Option 1 Option 1 Test test test test test test Test test test test test test Test test test test test test Test test test test test test Test test test test test test",
  },
  {
    value: 2,
    name: "Option 2  Test test test test test test Option 2 Option 2 Option 2 Option 2Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2",
  },
  {
    value: 3,
    name: "Option 3",
  },
  {
    value: 5,
    name: "Option 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
  {
    value: 25,
    name: "Pie chart without options images Other Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
  },
  {
    value: 15,
    name: "Option 1 Option 1 Test test test test test test Test test test test test test Test test test test test test Test test test test test test Test test test test test test",
  },
  {
    value: 2,
    name: "Option 2  Test test test test test test Option 2 Option 2 Option 2 Option 2Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2",
  },
  {
    value: 3,
    name: "Option 3",
  },
  {
    value: 5,
    name: "Option 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
  {
    value: 15,
    name: "Last 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
  {
    value: 3,
    name: "Overflow 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
];

const legendData: CustomLegend = pieData.map(({ value, name }, idx) => [
  value,
  idx + 1,
  name,
]);

function Pie() {
  return (
    <PieChart
      pieData={pieData}
      legendData={legendData}
      cardSize={CardSize.small}
    />
  );
}

export default Pie;
