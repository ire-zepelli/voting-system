import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";

import ccsLogo from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";

const WORDS = ["RIGHTS", "PASSION", "FUTURE", "DREAMS"];

export default function Landing() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#34102A] text-white overflow-hidden relative">
      <Header />

      {/* Massive Background Text effect */}
      <div className="pointer-events-none absolute inset-x-0 top-[65%] z-0 h-[200px]" style={{ transform: "translateY(-50%)" }}>
        {WORDS.map((word, idx) => (
          <div
            key={word}
            className={`absolute inset-0 flex w-full justify-center overflow-hidden font-helvetica text-[5.5rem] sm:text-[7rem] lg:text-[9rem] leading-none font-black tracking-tighter uppercase text-center transition-opacity duration-1000 ease-in-out ${idx === wordIndex ? "opacity-100" : "opacity-0"}`}
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.16)",
              color: "transparent",
            }}
          >
            {word}
          </div>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 px-6 sm:px-10 lg:px-16 pb-12 pt-8">
        <div className="w-full grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <section className="space-y-6 lg:pr-8 pt-10">
            {/* Logos */}
            <div className="flex items-center gap-4 mb-4">
              <img src={ccsLogo} alt="CCS Logo" className="h-16 w-auto object-contain" />
              <img src={uclmpsits} alt="UCLM PSITS Logo" className="h-16 w-auto object-contain" />
            </div>

            <h2 className="text-2xl sm:text-3xl tracking-normal font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
              2026 Student Election
            </h2>

            <div className="space-y-[-1rem] text-white font-helvetica font-black relative z-10 break-words max-w-full">
              <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] leading-[1] tracking-tight">
                VOTE FOR
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] leading-[1] tracking-tight">
                YOUR
              </h1>
            </div>

            <div className="pt-8 w-full sm:w-auto">
              <Link to="/voting" className="inline-block w-full sm:w-[50%]">
                <Button className="" style={{ fontFamily: '"Helvetica Neue", Helvetica, sans-serif' }}>
                  VOTE NOW
                </Button>
              </Link>
            </div>
          </section>

<aside className="relative lg:self-start w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
  {/* The countdown box */}
<div
  className="sticky top-6 rounded-[2rem] p-8 overflow-hidden w-full lg:w-[110%] xl:w-[120%] lg:-ml-4"
  style={{
    backgroundColor: "rgba(79, 31, 115, 0.70)",
    border: "1.23px solid rgba(255, 255, 255, 0.30)",
    boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.40)",
  }}
>
    <div className="flex flex-col text-white relative z-10 w-full">
      <p className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
        Election ends in:
      </p>

      <div className="flex justify-between items-center gap-3 sm:gap-4 mt-2">
        <div className="flex flex-col items-center flex-1">
          <p className="text-5xl sm:text-[4rem] font-bold font-helvetica italic tracking-tight mb-1 text-white">69</p>
          <p className="text-sm font-helvetica italic font-medium">Hours</p>
        </div>
        <div className="flex flex-col items-center flex-1">
          <p className="text-5xl sm:text-[4rem] font-bold font-helvetica italic tracking-tight mb-1 text-white">45</p>
          <p className="text-sm font-helvetica italic font-medium">Minutes</p>
        </div>
        <div className="flex flex-col items-center flex-1">
          <p className="text-5xl sm:text-[4rem] font-bold font-helvetica italic tracking-tight mb-1 text-white">32</p>
          <p className="text-sm font-helvetica italic font-medium">Seconds</p>
        </div>
      </div>
    </div>
  </div>
</aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
