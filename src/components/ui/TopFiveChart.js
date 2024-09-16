"use client";
import { data } from "@/app/data";
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    color: "#2563eb",
  },
  mobile: {
    color: "#60a5fa",
  },
};
const TopFiveChart = ({ topFiveSongs }) => {
  return (
    <ChartContainer
      className="aspect-auto h-[150px] xl:h-[200px] 2xl:h-[250px] w-full"
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={topFiveSongs}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="songName"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fontSize: 8 }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="streamCount" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default TopFiveChart;
