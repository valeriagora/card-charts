"use client";
import React from "react";
import { CardSize, CustomLegend } from "@/charts/types";
import PieChart from "@/charts/components/pie/PieChart";
import { data, url } from "@/charts/data";

const legendData: CustomLegend = data.map(({ value, name }, idx) => [
  value,
  idx + 1,
  name,
]);

function Pie() {
  return (
    <PieChart
      data={data}
      legendData={legendData}
      cardSize={CardSize.small}
      questionImage={url}
    />
  );
}

export default Pie;
