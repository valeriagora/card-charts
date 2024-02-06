"use client";
import React from "react";
import BarChart from "./components/BarChart";
import { CardSize } from "@/types";

const imageUrls = [
  "https://images.unsplash.com/photo-1702744473287-4cc284e97206?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1702893576128-21feb60299d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703028408829-ba45aa14b782?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519925610903-381054cc2a1c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703615318360-788893a586d8?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704192761191-757e0ccc5186?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704587422648-43f456047a72?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704419278767-09bc3a98581c?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const barLabels = {
  exciting:
    "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
  intriguing:
    "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing IntriguingIntriguingIntriguing",
  closeEnded: "Close-ended",
  boring: "Boring",
  engaging: "Engaging",
  option1:
    "Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1",
  option2: "Option 2",
  option3: "Option 3",
  option4: "Option 4",
  option5: "Option 5",
  option6: "Option 6",
  option7: "Option 7",
};
const barValues = [50, 20, 5, 24, 1, 2, 3, 4, 5, 6, 7, 8];
function Bar() {
  return (
    <div>
      <BarChart
        labels={barLabels}
        values={barValues}
        imageOptionUrls={imageUrls}
        cardSize={CardSize.medium}
      />
    </div>
  );
}

export default Bar;
