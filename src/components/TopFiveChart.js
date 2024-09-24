"use client";
import { SONG_DATA } from "@/app/data";
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";

const chartConfig = {
  desktop: {
    color: "#2563eb",
  },
  mobile: {
    color: "#60a5fa",
  },
};
const TopFiveChart = ({ topFiveSongs }) => {

  const CURRENT_TIMESTAMP = Math.floor(Date.now() / 1000)

  const isDateRecent = (date) => {
    const thresholdDate = moment()
      .subtract(31, "days")
      .startOf("day")
      .format("MM-DD-YYYY");
    const dateToCheck = moment.unix(date).format("MM-DD-YYYY");
    return moment(dateToCheck).isSameOrAfter(thresholdDate);
  };
  
  const arr = []
  let songToUpdate = null
  SONG_DATA.map(song => {
    const { usersThatStreamedSong } = song || {}
    if (usersThatStreamedSong && usersThatStreamedSong.length) {
      usersThatStreamedSong.forEach(user => {
        const dateStreamedArr = user?.datesStreamed
        dateStreamedArr.forEach(date => {
          const isDateRecent2 = isDateRecent(date)
          console.log('IS DATE RECENT', song.songName)
            if (isDateRecent2) {
              songToUpdate = { ...song }
            }
          // console.log(date, CURRENT_TIMESTAMP);
          // const isValidDate = moment(date).isSameOrAfter(CURRENT_TIMESTAMP)
          // console.log(isValidDate)
        })

      })

      arr.push(song)

    }
  })

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
