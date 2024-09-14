import Image from "next/image";
import { Card } from "./components/Card";
import { data } from "./data";

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
    <div>
      <Card title="Total Users" metric={totalUsers} />
      <Card title="Active Users" metric={activeUsers} />
      <Card title="Total Streams" metric={totalStreams} />
      <Card title="Total Revenue" metric={totalRevenue} />
      <Card title="Top Artist" metric={topArtist.name} />
    </div>
  );
}
