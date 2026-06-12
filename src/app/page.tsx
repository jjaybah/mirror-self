"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type Option = {
  label: string;
  x: number;
  y: number;
};

type Theme = {
  id: string;
  label: string;
  x: number;
  y: number;
  delay: string;
  options: Option[];
};

const themes: Theme[] = [
  {
    id: "photography",
    label: "Photography",
    x: 66,
    y: 34,
    delay: "1.85s",
    options: [
      { label: "Camera", x: 79, y: 43 },
      { label: "Film", x: 70, y: 25 },
      { label: "Gallery", x: 73, y: 73 },
      { label: "Portfolio critique", x: 61, y: 18 },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    x: 51,
    y: 72,
    delay: "2.05s",
    options: [
      { label: "V60 app", x: 61, y: 80 },
      { label: "Roastery", x: 41, y: 82 },
      { label: "Coffee shop", x: 50, y: 90 },
      { label: "Tasting journal", x: 67, y: 66 },
    ],
  },
  {
    id: "gym",
    label: "Gym",
    x: 65,
    y: 50,
    delay: "2.25s",
    options: [
      { label: "Form coach", x: 77, y: 51 },
      { label: "Workout plan", x: 71, y: 65 },
      { label: "Recovery", x: 58, y: 62 },
      { label: "Buddy match", x: 78, y: 38 },
    ],
  },
  {
    id: "music",
    label: "Music",
    x: 38,
    y: 34,
    delay: "2.45s",
    options: [
      { label: "Practice", x: 28, y: 27 },
      { label: "Playlist", x: 27, y: 42 },
      { label: "Local gigs", x: 36, y: 18 },
      { label: "Jam finder", x: 18, y: 60 },
    ],
  },
  {
    id: "ai",
    label: "AI",
    x: 34,
    y: 50,
    delay: "2.65s",
    options: [
      { label: "Prompt kit", x: 20, y: 48 },
      { label: "Prototype copilot", x: 22, y: 29 },
      { label: "Automation", x: 33, y: 66 },
      { label: "Research desk", x: 18, y: 76 },
    ],
  },
];

export default function Home() {
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLabelsVisible(true), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  const activeTheme = selectedTheme ?? themes[0];
  const activeOption = selectedOption ?? activeTheme.options[0];

  const productPrompt = useMemo(() => {
    return `Build an AI-powered web app for a person whose interests orbit around ${themes
      .map((theme) => theme.label.toLowerCase())
      .join(", ")}. Focus the first product direction on ${activeTheme.label.toLowerCase()}: ${activeOption.label.toLowerCase()}. The app should feel personal, visual, and exploratory: start with questions, map the user's themes around a central persona, disclose deeper options on click, and end with a high-quality build prompt for Codex.`;
  }, [activeOption.label, activeTheme.label]);

  function chooseTheme(theme: Theme) {
    setSelectedTheme(theme);
    setSelectedOption(theme.options[0]);
    setCopied(false);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard?.writeText(productPrompt);
    } catch {
      // Clipboard permissions vary in preview browsers.
    }

    setCopied(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08082b] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050329_0%,#242147_44%,#9f9a99_100%)]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_3px,#ffffff_4px)]" />
      <div className="absolute inset-0 radar-crosshair" />

      <section className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 py-5 text-xs uppercase tracking-[0.28em] text-white/58 md:px-8">
          <span>Mirror Self</span>
          <span>{labelsVisible ? "themes detected" : "listening..."}</span>
        </header>

        <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
          <div className="radar-stage">
            <div className="radar-ring radar-ring-one" />
            <div className="radar-ring radar-ring-two" />
            <div className="radar-ring radar-ring-three" />
            <div className="radar-ring radar-ring-four" />
            <div className="radar-sweep" />

            <button
              aria-label="Your persona"
              className="persona-node"
              type="button"
            >
              <span className="persona-avatar">You</span>
            </button>

            {themes.map((theme) => {
              const active = activeTheme.id === theme.id;

              return (
                <button
                  className={`theme-node ${active ? "theme-node-active" : ""} ${
                    labelsVisible ? "theme-node-ready" : ""
                  }`}
                  key={theme.id}
                  onClick={() => chooseTheme(theme)}
                  style={
                    {
                      "--x": `${theme.x}%`,
                      "--y": `${theme.y}%`,
                      "--delay": theme.delay,
                  } as CSSProperties
                  }
                  type="button"
                >
                  <span className="thinking-dot" />
                  <span className="theme-label">{theme.label}</span>
                </button>
              );
            })}

            {selectedTheme?.options.map((option, index) => {
              const active = activeOption.label === option.label;

              return (
                <button
                  className={`option-node ${active ? "option-node-active" : ""}`}
                  key={option.label}
                  onClick={() => {
                    setSelectedOption(option);
                    setCopied(false);
                  }}
                  style={
                    {
                      "--x": `${option.x}%`,
                      "--y": `${option.y}%`,
                      "--delay": `${index * 90}ms`,
                  } as CSSProperties
                  }
                  type="button"
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="relative z-20 mx-auto mb-5 flex w-[min(1120px,calc(100%-32px))] flex-col gap-3 rounded-[8px] border border-white/14 bg-[#14142c]/72 p-4 shadow-2xl shadow-black/25 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-white/52">
              {selectedTheme ? `${activeTheme.label} disclosure` : "Click a theme to disclose options"}
            </p>
            <p className="mt-2 line-clamp-4 text-sm leading-6 text-white/82 md:text-base">
              {productPrompt}
            </p>
          </div>

          <button
            className="shrink-0 rounded-[8px] border border-white/22 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#16162e] transition hover:bg-[#f5bf4b]"
            onClick={copyPrompt}
            type="button"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </aside>
      </section>
    </main>
  );
}
