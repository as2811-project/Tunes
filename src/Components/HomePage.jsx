import React from "react";
export function HomePage() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#a05ff5_1px,transparent_1px)] [background-size:38px_38px]"></div>
      <div className="mx-auto max-w-2xl py-5 sm:py-10 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-violet-400 sm:text-6xl bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            <span className="text-transparent bg-clip-text">Tunes</span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-500 dark:text-violet-500">
            The music subscription app
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Cloud Computing | Assignment 1 | Anandh Sellamuthu
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
