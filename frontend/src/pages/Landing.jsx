import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useAuth } from "../context/useAuth";

import ccsLogo from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";

const WORDS = ["RIGHTS", "PASSION", "FUTURE", "DREAMS"];

export default function Landing() {
  const [wordIndex, setWordIndex] = useState(0);
  const { isAuthenticated } = useAuth();

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-04-17T17:30:00+08:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours =
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
          days * 24;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#34102A] text-white w-full overflow-x-hidden relative">
      <div className="absolute top-[30%] sm:top-1/4 bottom-0 right-0 w-full sm:w-2/3 lg:w-[60%] pointer-events-none z-0">
        <img
          src="/rizal.png"
          alt=""
          className="w-full h-full object-contain sm:object-cover object-bottom sm:object-right-bottom opacity-[0.25] sm:opacity-50 select-none mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#34102A]/40 to-[#34102A]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#34102A] via-transparent to-transparent"></div>
      </div>
      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 px-6 sm:px-10 lg:px-16 pb-12 pt-8">
        <div className="w-full grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <section className="space-y-0 lg:pr-8 pt-2">
            {/* Logos */}
            <div className="flex items-center gap-3 mb-0">
              <img
                src={ccsLogo}
                alt="CCS Logo"
                className="h-14 w-auto object-contain"
              />
              <img
                src={uclmpsits}
                alt="UCLM PSITS Logo"
                className="h-14 w-auto object-contain"
              />
            </div>

            <h2
              className="text-2xl sm:text-3xl tracking-normal font-semibold text-white mt-0 mb-0 leading-tight"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              2026 Student Election
            </h2>

            <div className="space-y-[-1rem] text-white font-helvetica font-black relative z-10 break-words max-w-full -mt-1">
              {/* Massive Background Text effect inside relative container */}
              <div className="pointer-events-none absolute inset-0 z-[-1] flex items-end justify-start">
                {WORDS.map((word, idx) => (
                  <div
                    key={word}
                    className={`absolute inset-0 flex w-full justify-start font-helvetica text-[5.5rem] sm:text-[7.5rem] lg:text-[10.5rem] leading-none font-black tracking-tighter uppercase text-left transition-opacity duration-1000 ease-in-out ${idx === wordIndex ? "opacity-[0.85]" : "opacity-0"}`}
                    style={{
                      WebkitTextStroke: "2px rgba(255, 255, 255, 0.25)",
                      color: "transparent",
                      transform: "translate(60%, 40%)",
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] leading-[1] tracking-tight">
                VOTE FOR
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] leading-[1] tracking-tight">
                YOUR
              </h1>
            </div>

            <div className="pt-8 w-full sm:w-auto">
              <Link
                to={isAuthenticated ? "/voting" : "/login"}
                className="inline-block w-full sm:w-[50%]"
              >
                <Button
                  className=""
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  }}
                >
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
                <p
                  className="text-sm font-semibold text-white mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Election ends in:
                </p>

                <div className="flex justify-between items-center gap-3 sm:gap-4 mt-2">
                  <div className="flex flex-col items-center flex-1">
                    <p className="text-5xl sm:text-[4rem] font-bold font-helvetica italic tracking-tight mb-1 text-white">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-helvetica italic font-medium">
                      Hours
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <p className="text-5xl sm:text-[4rem] font-bold font-helvetica italic tracking-tight mb-1 text-white">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-helvetica italic font-medium">
                      Minutes
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <p className="text-5xl sm:text-[4rem] font-bold font-helvetica italic tracking-tight mb-1 text-white">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-helvetica italic font-medium">
                      Seconds
                    </p>
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
