"use client";
import React from "react";

import { CardSize } from "@/charts/types";
import PieChart from "@/charts/components/pie/PieChart";

function Pie() {
  return <PieChart cardSize={CardSize.small} />;
}

export default Pie;
