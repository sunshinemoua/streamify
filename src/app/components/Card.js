import React from "react";

export const Card = ({ title, metric }) => {
  return (
    <div class="max-w-[8rem] mx-auto my-6 bg-white rounded-lg shadow-lg overflow-hidden md:max-w-[18rem] lg:max-w-[24rem]">
      <div class="flex flex-col items-center p-8">
        <h2 class="text-base font-semibold text-gray-800">{title}</h2>
        <p class="text-gray-600 text-3xl pt-2">{metric}</p>
      </div>
    </div>
  );
};
