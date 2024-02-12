"use client";
import React from "react";
import { CardSize, CustomLegendWithImage, PieData } from "@/charts/types";
import PieChartWIthOptionImages from "@/charts/components/pie-with-option-images/PieChartWIthOptionImages";
import { url } from "@/charts/constants/shared";

const pieData: PieData[] = [
  {
    value: 25,
    name: "Other Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
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
];
const images = [
  "https://plus.unsplash.com/premium_photo-1697695568731-5b351d7aca4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797140-c17807f8f217?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704107116952-978a5712566c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const customSeriesData: CustomLegendWithImage = pieData.map(
  ({ value, name }, idx) => [value, idx + 1, name, images[idx]]
);

function Pie() {
  return (
    <PieChartWIthOptionImages
      cardSize={CardSize.small}
      pieData={pieData}
      legendData={customSeriesData}
      questionImage={url}
    />
  );
}

export default Pie;
