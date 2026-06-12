"use client";

import { useMemo, useState } from "react";

type Interest = {
  id: string;
  label: string;
  angle: string;
  options: string[];
};

const interests: Interest[] = [
  {
    id: "coffee",
    label: "Coffee",
    angle: "top-[10%] left-[47%]",
    options: ["V60 brewing app", "Neighborhood coffee shop", "Roastery planner"],
  },
  {
    id: "photography",
    label: "Photography",
    angle: "top-[30%] right-[7%]",
    options: ["Photo walk finder", "Portfolio critique tool", "Client moodboard maker"],
  },
  {
    id: "gym",
    label: "Gym",
    angle: "bottom-[18%] right-[18%]",
    options: ["Adaptive workout coach", "Form feedback journal", "Gym buddy matcher"],
  },
  {
    id: "music",
    label: "Music",
    angle: "bottom-[16%] left-[15%]",
    options: ["Practice routine builder", "Playlist story generator", "Local jam finder"],
  },
  {
    id: "ai",
    label: "AI",
    angle: "top-[35%] left-[6%]",
    options: ["Idea-to-prototype copilot", "Prompt library builder", "Personal automation desk"],
  },
];

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState(interests[0]);
  const [selectedOption, setSelectedOption] = useState(interests[0].options[0]);
  const [copied, setCopied] = useState(false);

  const productPrompt = useMemo(() => {
    return `Build a polished web app for a curious builder whose interests include ${interests
      .map((interest) => interest.label.toLowerCase())
      .join(", ")}. Focus the first prototype on ${selectedInterest.label.toLowerCase()}: ${selectedOption.toLowerCase()}. Create a product that turns this interest into a concrete, useful AI-powered experience with onboarding, a clear core workflow, and a delightful visual identity.`;
  }, [selectedInterest, selectedOption]);

  function chooseInterest(interest: Interest) {
    setSelectedInterest(interest);
    setSelectedOption(interest.options[0]);
    setCopied(false);
  }

  async function copyPrompt() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(productPrompt);
      }
    } catch {
      // Clipboard permissions vary by browser context; still confirm the click.
    }

    setCopied(true);
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2523]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-5 py-6 md:grid-cols-[1.08fr_0.92fr] md:px-8 lg:px-10">
        <div className="flex min-h-[620px] flex-col rounded-[8px] border border-[#d8d2c8] bg-[#fffaf2] p-4 shadow-sm md:p-6">
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#6d7166]">
                Mirror Self
              </p>
              <h1 className="mt-2 max-w-2xl text-4xl font-semibold leading-[1.04] md:text-6xl">
                Discover the product only you would build.
              </h1>
            </div>
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#cfc7ba] bg-[#e9f0db] text-lg font-semibold md:flex">
              MS
            </div>
          </header>

          <div className="relative mt-8 flex flex-1 items-center justify-center overflow-hidden rounded-[8px] border border-[#ded6c9] bg-[#f2eadc] p-4">
            <div className="absolute inset-8 rounded-full border border-dashed border-[#b9b09f]" />
            <div className="absolute inset-20 rounded-full border border-dashed border-[#cbc2b0]" />

            <button
              className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full border border-[#1f2523] bg-[#1f2523] text-center text-lg font-semibold text-white shadow-xl shadow-[#887e6e]/20"
              type="button"
            >
              You
            </button>

            {interests.map((interest) => {
              const active = selectedInterest.id === interest.id;

              return (
                <button
                  className={`absolute ${interest.angle} z-20 flex h-24 w-24 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    active
                      ? "border-[#1f2523] bg-[#d4f2a8] text-[#1f2523] shadow-lg shadow-[#7f9363]/20"
                      : "border-[#c8bfad] bg-white text-[#42483f] hover:border-[#1f2523]"
                  }`}
                  key={interest.id}
                  onClick={() => chooseInterest(interest)}
                  type="button"
                >
                  {interest.label}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="flex min-h-[620px] flex-col gap-4">
          <section className="rounded-[8px] border border-[#d8d2c8] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#6d7166]">
              Follow-up
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              What could {selectedInterest.label.toLowerCase()} become?
            </h2>

            <div className="mt-5 grid gap-3">
              {selectedInterest.options.map((option) => (
                <button
                  className={`rounded-[8px] border px-4 py-3 text-left text-sm font-medium transition ${
                    selectedOption === option
                      ? "border-[#1f2523] bg-[#1f2523] text-white"
                      : "border-[#ded6c9] bg-[#fffaf2] text-[#343a35] hover:border-[#1f2523]"
                  }`}
                  key={option}
                  onClick={() => {
                    setSelectedOption(option);
                    setCopied(false);
                  }}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-1 flex-col rounded-[8px] border border-[#d8d2c8] bg-[#e8f4f3] p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#536461]">
                  Generated brief
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Prompt for Codex</h2>
              </div>
              <button
                className="rounded-[8px] border border-[#1f2523] bg-white px-4 py-2 text-sm font-semibold text-[#1f2523] transition hover:bg-[#1f2523] hover:text-white"
                onClick={copyPrompt}
                type="button"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <p className="mt-5 flex-1 rounded-[8px] border border-[#bed2ce] bg-white p-4 text-base leading-7 text-[#27312f]">
              {productPrompt}
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
