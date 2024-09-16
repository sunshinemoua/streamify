"use client";
import TopFiveChart from "@/components/ui/TopFiveChart";
import { Card } from "./components/Card";
import { data } from "./data";
import UserGrowthChart from "@/components/ui/UserGrowthChart";

export default function Home() {
  // Calculate total users
  const totalUsers = new Set(data.map((item) => item.userID)).size;

  // Calulcate if the last stream is within  30 days and return boolean value
  const isDateRecent = (date) => {
    // Current date
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 30);
    return new Date(date) >= thresholdDate;
  };

  // Filter items that have been streamed in the past 30 days
  const recentStreams = data.filter((item) => isDateRecent(item.dateStreamed));

  // Sort the recent streams by streamCount for each song
  recentStreams.sort((curr, prev) =>
    curr.streamCount < prev.streamCount ? 1 : -1
  );

  // Create new array for top 5 songs by slicing from recentStreams
  const topFiveSongs = recentStreams.slice(0, 5);

  // Calculate total unique userIDs from recent streams
  const activeUsers = new Set(recentStreams.map((item) => item.userID)).size;

  // Calculate total streams
  const totalStreams = data.reduce((sum, item) => sum + item.streamCount, 0);

  // Calculate revenue
  const subscriptionCostPerUser = 8.99;
  const adRevenuePerStream = 0.16;
  const totalRevenue = (
    totalUsers * subscriptionCostPerUser +
    totalStreams * adRevenuePerStream
  ).toFixed(2);

  // Calculate the top artist in the last 30 days
  const artistStreams = [];

  data.forEach((item) => {
    if (isDateRecent(item.dateStreamed)) {
      // Check if the artist already exists in the array
      let artist = artistStreams.find((artist) => artist.name === item.artist);

      // If artist doesn't exist, create a new entry
      if (!artist) {
        artist = { name: item.artist, streams: 0 };
        artistStreams.push(artist);
      }
      artist.streams += item.streamCount;
    }
  });

  const topArtist = artistStreams.reduce((top, current) => {
    return current.streams > top.streams ? current : top;
  }, artistStreams[0]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Card title="Total Users" metric={totalUsers} />
        <Card title="Active Users" metric={activeUsers} />
      </div>
      <div className="flex">
        <Card title="Total Streams" metric={totalStreams} />
        <Card title="Total Revenue" metric={totalRevenue} />
      </div>
      <Card title="Top Artist" metric={topArtist.name} />
      <UserGrowthChart />
      <TopFiveChart topFiveSongs={topFiveSongs} />
    </div>
  );
}
