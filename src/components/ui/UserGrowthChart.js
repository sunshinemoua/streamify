"use client";
import { data } from "@/app/data";
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  totalUserGrowth: {
    color: "#2563eb",
  },
  activeUserGrowth: {
    color: "#60a5fa",
  },
};

const UserGrowthChart = () => {
  const convertToMonthName = (dateString) => {
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const calculateUserGrowth = (streamData) => {
    const monthlyData = [];

    streamData.forEach(({ dateStreamed, userID }) => {
      const month = dateStreamed.slice(0, 7);

      // Find existing month or initialize a new one
      let findMonth = monthlyData.find((item) => item.month === month);
      if (!findMonth) {
        findMonth = { month, totalUsers: new Set(), activeUsers: new Set() };
        monthlyData.push(findMonth);
      }

      // Add user to totalUsers and activeUsers sets for the month
      findMonth.totalUsers.add(userID);
      findMonth.activeUsers.add(userID);
    });

    // Sort monthlyData by month
    monthlyData.sort((a, b) => (a.month > b.month ? 1 : -1));

    const growthResults = monthlyData
      .map((current, index) => {
        if (index === 0) return null;

        const previous = monthlyData[index - 1];
        return {
          month: convertToMonthName(current.month),
          totalUserGrowth: current.totalUsers.size - previous.totalUsers.size,
          activeUserGrowth:
            current.activeUsers.size - previous.activeUsers.size,
        };
      })
      .filter(Boolean);

    return growthResults;
  };

  const growthReport = calculateUserGrowth(data);

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        data={growthReport}
        margin={{
          left: 24,
          right: 24,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickMargin={8} />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="totalUserGrowth"
          type="linear"
          stroke="#8884d8"
          dot={true}
        />
        <Line
          dataKey="activeUserGrowth"
          type="linear"
          stroke="#8884d8"
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default UserGrowthChart;
