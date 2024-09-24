"use client";
import TopFiveChart from "@/components/TopFiveChart";
import { Card } from "./components/Card";

import UserGrowthChart from "@/components/UserGrowthChart";
import RevenueChart from "@/components/RevenueChart";
import RecentStreams from "./components/RecentStreams";
import DataTable from "@/components/DataTable";
import { SONG_DATA } from "./data";
import StoreProvider from "./StoreProvider";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./lib/store";
import { updateMetric, updateTotalUsers } from "./lib/features/metricsSlice";
import { useEffect, useRef } from "react";
import moment, { isDate } from "moment";

const data = SONG_DATA;

export default function Home() {
  const dispatch = useDispatch();

  const { totalUsers, activeUsers, totalStreams, revenue, topArtist } =
    useSelector((state) => state.metrics);

  // Update total users
  useEffect(() => {
    // Initialize unique users and start stream count at 0
    const uniqueUsers = new Set();
    let totalStreams = 0;

    // Loop through each song and increment count for unique user ids
    data.forEach((song) => {
      song.usersThatStreamedSong.forEach((user) => {
        uniqueUsers.add(user.id);
        totalStreams += user.datesStreamed.length;
      });
    });

    // Calculate total unique users
    const uniqueUserCount = uniqueUsers.size;

    // Update totalUsers state
    dispatch(updateMetric({ type: "totalUsers", value: uniqueUserCount }));
  }, []);

  // ACTIVE USERS
  // Calulcate if the last stream is within  30 days
  const isDateRecent = (date) => {
    const thresholdDate = moment()
      .subtract(31, "days")
      .startOf("day")
      .format("MM-DD-YYYY");
    const dateToCheck = moment.unix(date).format("MM-DD-YYYY");
    return moment(dateToCheck).isSameOrAfter(thresholdDate);
  };
  // Function to check if any date in the datesStreamed array is recent
  const hasRecentStream = (datesStreamed) => datesStreamed.some(isDateRecent);
  // Function to check if a song has any recent streams
  const songHasRecentStreams = (song) =>
    song.usersThatStreamedSong.some((user) =>
      hasRecentStream(user.datesStreamed)
    );

  // Filter the songs based on recent streams
  const recentSongs = data.filter(songHasRecentStreams);

  // Calculate total unique userIDs from recent streams
  const recentUsers = new Set();
  recentSongs.forEach((song) => {
    song.usersThatStreamedSong.forEach((user) => {
      recentUsers.add(user.id);
    });
  });

  const recentUsersCount = recentUsers.size;
  dispatch(updateMetric({ type: "activeUsers", value: recentUsersCount }));

  // Calculate total streams for an individual song
  const calculateSongStreams = (song) => {
    const streamsForSingleSong = song.usersThatStreamedSong.reduce(
      (totalStreams, user) => totalStreams + user.datesStreamed.length,
      0
    );
    return streamsForSingleSong;
  };

  // Function to calculate total streams for all songs
  const calculateTotalStreams = (data) => {
    return data.reduce((allStreams, song) => {
      const songStreams = calculateSongStreams(song);
      // console.log(`${song.songName}: ${songStreams} streams`);
      return allStreams + songStreams;
    }, 0);
  };

  const sortSongsByStreams = (data) => {
    return data
      .map((song) => ({
        ...song,
        totalStreams: calculateSongStreams(song), // Add a property for total streams
      }))
      .sort((a, b) => b.totalStreams - a.totalStreams); // Sort by highest streams
  };

  const sortedSongs = sortSongsByStreams(data);
  // console.log(sortedSongs);

  // Example usage with your dataset
  const totalSongStreams = calculateTotalStreams(data);

  dispatch(updateMetric({ type: "totalStreams", value: totalSongStreams }));

  // // Calculate the top artist in the last 30 days
  // const artistStreams = [];

  // data.forEach((item) => {
  //   if (isDateRecent(item.dateStreamed)) {
  //     // Check if the artist already exists in the array
  //     let artist = artistStreams.find((artist) => artist.name === item.artist);

  //     // If artist doesn't exist, create a new entry
  //     if (!artist) {
  //       artist = { name: item.artist, streams: 0 };
  //       artistStreams.push(artist);
  //     }
  //     artist.streams += item.streamCount;
  //   }
  // });

  // const topArtist = artistStreams.reduce((top, current) => {
  //   return current.streams > top.streams ? current : top;
  // }, artistStreams[0]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Card title="Total Users" metric={totalUsers} />
        <p>hihihi</p>
        <Card title="Active Users" metric={activeUsers} />
      </div>
      <div className="flex">
        <Card title="Total Streams" metric={totalStreams} />
        <Card title="Total Revenue" metric={revenue} />
      </div>
      <Card title="Top Artist" metric={"Adele"} />
      <RevenueChart />
      <DataTable />
      <UserGrowthChart />
      <TopFiveChart />
      {/* <RecentStreams recentStreams={recentStreams} /> */}
    </div>
  );
}
