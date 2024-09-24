"use client";
import React from "react";
import { Card } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { PieChart, ResponsiveContainer, Pie } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { updateMetric } from "@/app/lib/features/metricsSlice";

const RevenueChart = () => {
  const dispatch = useDispatch();
  const { totalUsers, totalStreams } = useSelector((state) => state.metrics);
  // Calculate revenue
  const subscription = totalUsers * 8.99;
  const adRevenuePerStream = totalStreams * 0.16;
  const appStore = totalUsers * 2.99;
  const inAppPurchases = totalUsers * 0.7 * 1.49;
  const totalRevenue = (
    subscription +
    adRevenuePerStream +
    appStore +
    inAppPurchases
  ).toFixed(2);
  dispatch(updateMetric({ type: "revenue", value: totalRevenue }));

  const chartData = [
    { type: "subscription", cost: subscription, fill: "blue" },
    {
      type: "adRevenuePerStream",
      cost: adRevenuePerStream,
      fill: "red",
    },
    { type: "appStore", cost: appStore, fill: "green" },
    { type: "edge", cost: inAppPurchases, fill: "yellow" },
  ];

  const chartConfig = {
    subscription: {
      label: "Subscription",
    },
    adRevenuePerStream: {
      label: "Ads",
    },
    appStore: {
      label: "App Store Purchase",
    },
    inAppPurchases: {
      label: "In-App Purchases",
    },
  };

  return (
    <div className="w-[500px] h-[500px]">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square">
        <PieChart width={750} height={350}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="cost" nameKey="type" stroke="0" />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueChart;
