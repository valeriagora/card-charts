"use client";
import React from "react";
import BarChart from "./components/BarChart";
import { CardSize, CustomLegend } from "@/types";

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
const imageUrls = [
  "https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1707003839745-0df405c490c5?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1706625692466-a1d938ff8641?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705931607938-fa3b30611e15?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1707162796436-e716e46e7e49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687981974-c5ef2111640c?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671478394583-3d91fd9c7ca5?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1706908432387-b28d74db7559?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1697778135834-7104fdb80e7e?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1707080181888-25efd661305e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
// const barData = [
//   {
//     name: "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
//     value: 50,
//   },
//   {
//     name: "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing IntriguingIntriguingIntriguing",
//     value: 20,
//   },
//   {
//     name: "Close-ended",
//     value: 5,
//   },
//   {
//     name: "Boring",
//     value: 24,
//   },
// ];
// const legendData: CustomLegend = barData.map(({ value, name }, idx) => [
//   value,
//   idx + 1,
//   name,
// ]);
function Bar() {
  return (
    <div>
      <BarChart
        labels={barLabels}
        values={barValues}
        imageOptionUrls={imageUrls}
        // data={barData}
        // legendData={legendData}
        cardSize={CardSize.small}
      />
    </div>
  );
}

export default Bar;
