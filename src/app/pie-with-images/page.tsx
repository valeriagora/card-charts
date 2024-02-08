"use client";
import React from "react";
import { CardSize } from "@/charts/types";
import PieChartWithImageOptions from "@/charts/components/pie-with-option-images/PieChartWIthImageOptions";

function Pie() {
  return <PieChartWithImageOptions cardSize={CardSize.small} />;
}

export default Pie;
