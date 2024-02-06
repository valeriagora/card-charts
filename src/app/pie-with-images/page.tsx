"use client";
import React from "react";

import { CardSize } from "@/types";
import PieChartWithImageOptions from "./components/PieChartWIthImageOptions";

function Pie() {
  return <PieChartWithImageOptions cardSize={CardSize.small} />;
}

export default Pie;
