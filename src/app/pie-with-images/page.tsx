"use client";
import React from "react";
import { CardSize, CustomLegendWithImage, PieData } from "@/charts/types";
import PieChartWIthOptionImages from "@/charts/components/pie-with-option-images/PieChartWIthOptionImages";
import { data, images, url } from "@/charts/data";

const customSeriesData: CustomLegendWithImage = data.map(
  ({ value, name }, idx) => [value, idx + 1, name, images[idx]]
);

function Pie() {
  return (
    <PieChartWIthOptionImages
      cardSize={CardSize.small}
      pieData={data}
      legendData={customSeriesData}
      questionImage={url}
    />
  );
}

export default Pie;
