"use client";

import { FormEvent, MouseEvent as ReactMouseEvent, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type ProductSignal = {
  emoji: string;
  label: string;
  x: number;
  y: number;
  idea: string;
};

type Direction = {
  emoji: string;
  label: string;
  x: number;
  y: number;
  products: ProductSignal[];
};

type Theme = {
  emoji: string;
  id: string;
  label: string;
  x: number;
  y: number;
  delay: string;
  directions: Direction[];
};

const defaultIntro =
  "I work with creative technology. I like photography, coffee, music, gym, and AI tools. I want to build something useful, personal, and visually memorable.";

const themes: Theme[] = [
  {
    emoji: "📷",
    id: "photography",
    label: "Photography",
    x: 64,
    y: 29,
    delay: "180ms",
    directions: [
      {
        emoji: "📸",
        label: "Camera",
        x: 80,
        y: 48,
        products: [
          { emoji: "🎒", label: "Gear matcher", x: 94, y: 35, idea: "a camera gear recommender based on mood, budget, and shooting style" },
          { emoji: "🗺️", label: "Shot planner", x: 95, y: 58, idea: "a shoot planning app that turns a location and mood into a shot list" },
        ],
      },
      {
        emoji: "🎞️",
        label: "Film",
        x: 79,
        y: 17,
        products: [
          { emoji: "📓", label: "Film diary", x: 91, y: 12, idea: "a film photography diary that learns your taste and suggests rolls, settings, and locations" },
          { emoji: "🎨", label: "Color lab", x: 63, y: 12, idea: "a color grading assistant trained around your favorite film looks" },
        ],
      },
      {
        emoji: "🖼️",
        label: "Gallery",
        x: 78,
        y: 72,
        products: [
          { emoji: "🧭", label: "Curator", x: 93, y: 73, idea: "an AI curator that turns a photo dump into a coherent portfolio story" },
          { emoji: "💬", label: "Critique room", x: 72, y: 88, idea: "a private critique room that gives precise feedback on composition and sequencing" },
        ],
      },
    ],
  },
  {
    emoji: "☕",
    id: "coffee",
    label: "Coffee",
    x: 50,
    y: 75,
    delay: "300ms",
    directions: [
      {
        emoji: "🫖",
        label: "Brewing",
        x: 71,
        y: 82,
        products: [
          { emoji: "💧", label: "V60 coach", x: 93, y: 73, idea: "a V60 brewing coach that adapts recipes from taste notes and grind size" },
          { emoji: "👅", label: "Taste tracker", x: 68, y: 96, idea: "a tasting journal that learns your coffee preferences and suggests recipes" },
        ],
      },
      {
        emoji: "🔥",
        label: "Roastery",
        x: 29,
        y: 80,
        products: [
          { emoji: "📈", label: "Roast log", x: 12, y: 86, idea: "a roast log assistant that explains roast curves in plain language" },
          { emoji: "🫘", label: "Bean finder", x: 23, y: 66, idea: "a bean discovery app based on flavor memories instead of generic ratings" },
        ],
      },
      {
        emoji: "🏪",
        label: "Cafe",
        x: 50,
        y: 90,
        products: [
          { emoji: "🧪", label: "Menu lab", x: 76, y: 97, idea: "a cafe menu lab that creates seasonal drinks from local taste signals" },
          { emoji: "📐", label: "Shop planner", x: 24, y: 97, idea: "a tiny coffee shop planner for layout, menu, and launch tasks" },
        ],
      },
    ],
  },
  {
    emoji: "💪",
    id: "gym",
    label: "Gym",
    x: 68,
    y: 51,
    delay: "420ms",
    directions: [
      {
        emoji: "🏋️",
        label: "Training",
        x: 82,
        y: 52,
        products: [
          { emoji: "🗓️", label: "Plan coach", x: 95, y: 54, idea: "an adaptive workout planner that changes based on energy, soreness, and goals" },
          { emoji: "🔁", label: "Habit loop", x: 86, y: 70, idea: "a habit loop tracker that makes fitness consistency feel game-like" },
        ],
      },
      {
        emoji: "🧘",
        label: "Form",
        x: 82,
        y: 35,
        products: [
          { emoji: "📔", label: "Lift journal", x: 96, y: 27, idea: "a lifting journal that turns notes into form cues and next-session focus" },
          { emoji: "🧩", label: "Mobility map", x: 76, y: 20, idea: "a mobility map that links pain points to warmups and recovery plans" },
        ],
      },
    ],
  },
  {
    emoji: "🎵",
    id: "music",
    label: "Music",
    x: 36,
    y: 29,
    delay: "540ms",
    directions: [
      {
        emoji: "🎹",
        label: "Practice",
        x: 21,
        y: 21,
        products: [
          { emoji: "⏱️", label: "Routine", x: 8, y: 14, idea: "a practice routine builder that adapts to your mood and available time" },
          { emoji: "📊", label: "Progress", x: 32, y: 11, idea: "a music progress diary that notices patterns in what you avoid practicing" },
        ],
      },
      {
        emoji: "🔎",
        label: "Discovery",
        x: 18,
        y: 43,
        products: [
          { emoji: "📻", label: "Playlist story", x: 5, y: 38, idea: "a playlist story generator that turns taste into shareable listening journeys" },
          { emoji: "🎸", label: "Jam finder", x: 9, y: 58, idea: "a local jam finder that matches musicians by taste, skill, and availability" },
        ],
      },
    ],
  },
  {
    emoji: "✨",
    id: "ai",
    label: "AI",
    x: 31,
    y: 51,
    delay: "660ms",
    directions: [
      {
        emoji: "🛠️",
        label: "Build",
        x: 16,
        y: 50,
        products: [
          { emoji: "⚒️", label: "Idea forge", x: 3, y: 43, idea: "an idea-to-prototype copilot that generates build prompts from personal interests" },
          { emoji: "📝", label: "MVP brief", x: 8, y: 63, idea: "an MVP brief generator that turns a messy idea into a buildable product spec" },
        ],
      },
      {
        emoji: "⚙️",
        label: "Automate",
        x: 25,
        y: 69,
        products: [
          { emoji: "🗂️", label: "Life ops", x: 10, y: 80, idea: "a personal automation desk for recurring admin, reminders, and research" },
          { emoji: "🔐", label: "Prompt vault", x: 37, y: 84, idea: "a prompt vault that organizes prompts by goal, taste, and past usefulness" },
        ],
      },
    ],
  },
];

type Phase = "boot" | "intro" | "scanning" | "selecting" | "complete";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [intro, setIntro] = useState(defaultIntro);
  const [themeLabelsVisible, setThemeLabelsVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductSignal | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("intro"), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;

    const revealTimer = window.setTimeout(() => {
      setThemeLabelsVisible(true);
      setPhase("selecting");
    }, 1700);

    return () => window.clearTimeout(revealTimer);
  }, [phase]);

  useEffect(() => {
    function handleEmptyPageClick(event: globalThis.MouseEvent) {
      if (phase !== "selecting" && phase !== "complete") return;

      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("button, a, textarea, input, form")) return;

      setSelectedTheme(null);
      setSelectedDirection(null);
      setSelectedProduct(null);
      setCopied(false);
      setPhase("selecting");
    }

    document.addEventListener("click", handleEmptyPageClick);
    return () => document.removeEventListener("click", handleEmptyPageClick);
  }, [phase]);

  const selectionsCount =
    Number(Boolean(selectedTheme)) +
    Number(Boolean(selectedDirection)) +
    Number(Boolean(selectedProduct));

  const activeTheme = selectedTheme;
  const activeDirection = selectedDirection;
  const activeProduct = selectedProduct;

  const productPrompt = useMemo(() => {
    if (!activeTheme || !activeDirection || !activeProduct) return "";

    return `Build this product with Codex:

Product idea
${activeProduct.idea}.

Who it is for
Someone who described themselves like this: "${intro}"

Chosen path
${activeTheme.emoji} ${activeTheme.label} -> ${activeDirection.emoji} ${activeDirection.label} -> ${activeProduct.emoji} ${activeProduct.label}

What to build
A friendly AI-powered web app that helps a non-technical person turn their own interests into a product idea they can actually build.

Core experience
1. Start with a short introduction prompt.
2. Show a central avatar with interest circles around it.
3. Let the user choose a maximum of three layers.
4. Explain the final product idea in clear language.
5. Provide a copyable prompt and a way to continue in Codex.

Design direction
Make it visual, calm, accessible, and easy to understand. Use clear labels, strong contrast, readable spacing, and simple language.`;
  }, [activeDirection, activeProduct, activeTheme, intro]);

  const readableBrief = useMemo(() => {
    if (!activeTheme || !activeDirection || !activeProduct) return null;

    return {
      idea: activeProduct.idea,
      path: `${activeTheme.emoji} ${activeTheme.label} → ${activeDirection.emoji} ${activeDirection.label} → ${activeProduct.emoji} ${activeProduct.label}`,
      audience: "People who want to build with AI but need a clear product idea based on their own interests.",
      nextStep: "Copy this prompt or open it in Codex to start building.",
    };
  }, [activeDirection, activeProduct, activeTheme]);

  const codexHref = productPrompt
    ? `https://chatgpt.com/codex?prompt=${encodeURIComponent(productPrompt)}`
    : "https://chatgpt.com/codex";

  function startScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSelectedTheme(null);
    setSelectedDirection(null);
    setSelectedProduct(null);
    setThemeLabelsVisible(false);
    setCopied(false);
    setPhase("scanning");
  }

  function chooseTheme(theme: Theme) {
    setSelectedTheme(theme);
    setSelectedDirection(null);
    setSelectedProduct(null);
    setCopied(false);
  }

  function chooseDirection(direction: Direction) {
    setSelectedDirection(direction);
    setSelectedProduct(null);
    setCopied(false);
  }

  function chooseProduct(product: ProductSignal) {
    setSelectedProduct(product);
    setCopied(false);
    setPhase("complete");
  }

  function resetSelections() {
    if (phase !== "selecting" && phase !== "complete") return;

    setSelectedTheme(null);
    setSelectedDirection(null);
    setSelectedProduct(null);
    setCopied(false);
    setPhase("selecting");
  }

  function stopCanvasReset(event: ReactMouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  async function copyPrompt() {
    if (!productPrompt) return;

    try {
      await navigator.clipboard?.writeText(productPrompt);
    } catch {
      // Clipboard permissions vary in preview browsers.
    }

    setCopied(true);
  }

  return (
    <main className="relative h-[100svh] overflow-hidden bg-[#08082b] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050329_0%,#242147_44%,#9f9a99_100%)]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_3px,#ffffff_4px)]" />
      <div className="absolute inset-0 radar-crosshair" />

      <section className="relative z-10 flex h-full flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between px-5 text-xs uppercase tracking-[0.28em] text-white/58 md:px-8">
          <span>NEXT THING</span>
          <span>
            {phase === "boot"
              ? "booting radar"
              : phase === "intro"
                ? "awaiting signal"
                : phase === "scanning"
                  ? "thinking..."
                  : `${selectionsCount}/3 selected`}
          </span>
        </header>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-2"
          onClick={resetSelections}
        >
          <div className="radar-stage" onClick={resetSelections}>
            <div className="stage-crosshair" />
            <div className="radar-ring radar-ring-one" />
            <div className="radar-ring radar-ring-two" />
            <div className="radar-ring radar-ring-three" />

            <svg
              aria-hidden="true"
              className="connection-lines"
              viewBox="0 0 100 100"
            >
              <defs>
                {selectedTheme && (
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="path-gradient-one"
                    x1="50"
                    x2={selectedTheme.x}
                    y1="50"
                    y2={selectedTheme.y}
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="58%" stopColor="rgba(245,191,75,0.5)">
                      <animate
                        attributeName="offset"
                        dur="5s"
                        repeatCount="indefinite"
                        values="42%;70%;42%"
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgba(245,191,75,0.98)" />
                  </linearGradient>
                )}
                {selectedTheme && selectedDirection && (
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="path-gradient-two"
                    x1={selectedTheme.x}
                    x2={selectedDirection.x}
                    y1={selectedTheme.y}
                    y2={selectedDirection.y}
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                    <stop offset="58%" stopColor="rgba(245,191,75,0.52)">
                      <animate
                        attributeName="offset"
                        dur="5s"
                        repeatCount="indefinite"
                        values="38%;72%;38%"
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgba(245,191,75,1)" />
                  </linearGradient>
                )}
                {selectedDirection && selectedProduct && (
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="path-gradient-three"
                    x1={selectedDirection.x}
                    x2={selectedProduct.x}
                    y1={selectedDirection.y}
                    y2={selectedProduct.y}
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                    <stop offset="62%" stopColor="rgba(245,191,75,0.55)">
                      <animate
                        attributeName="offset"
                        dur="5s"
                        repeatCount="indefinite"
                        values="36%;76%;36%"
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgba(255,232,164,1)" />
                  </linearGradient>
                )}
              </defs>
              {selectedTheme && (
                <line
                  className="connection-line connection-line-one"
                  x1="50"
                  x2={selectedTheme.x}
                  y1="50"
                  y2={selectedTheme.y}
                />
              )}
              {selectedTheme && selectedDirection && (
                <line
                  className="connection-line connection-line-two"
                  x1={selectedTheme.x}
                  x2={selectedDirection.x}
                  y1={selectedTheme.y}
                  y2={selectedDirection.y}
                />
              )}
              {selectedDirection && selectedProduct && (
                <line
                  className="connection-line connection-line-three"
                  x1={selectedDirection.x}
                  x2={selectedProduct.x}
                  y1={selectedDirection.y}
                  y2={selectedProduct.y}
                />
              )}
            </svg>

            <button
              aria-label="Your persona"
              className="persona-node"
              onClick={stopCanvasReset}
              type="button"
            >
              <span className="persona-avatar" aria-hidden="true" />
              <span className="persona-label">You</span>
            </button>

            {(phase === "scanning" || phase === "selecting" || phase === "complete") &&
              themes.map((theme) => {
                const active = selectedTheme?.id === theme.id;
                const dimmed = Boolean(selectedTheme) && !active;

                return (
                  <button
                    className={`theme-node layer-one ${active ? "theme-node-active" : ""} ${
                      dimmed ? "node-dimmed" : ""
                    } ${themeLabelsVisible ? "theme-node-ready" : ""}`}
                    key={theme.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      chooseTheme(theme);
                    }}
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
                    <span className="theme-label">
                      <span aria-hidden="true">{theme.emoji}</span>
                      {theme.label}
                    </span>
                  </button>
                );
              })}

            {selectedTheme?.directions.map((direction, index) => {
              const active = selectedDirection?.label === direction.label;
              const dimmed = Boolean(selectedDirection) && !active;

              return (
                <button
                  className={`option-node layer-two ${active ? "option-node-active" : ""} ${
                    dimmed ? "node-dimmed" : ""
                  }`}
                  key={direction.label}
                  onClick={(event) => {
                    event.stopPropagation();
                    chooseDirection(direction);
                  }}
                  style={
                    {
                      "--x": `${direction.x}%`,
                      "--y": `${direction.y}%`,
                      "--delay": `${index * 110}ms`,
                    } as CSSProperties
                  }
                  type="button"
                >
                  <span aria-hidden="true">{direction.emoji}</span>
                  {direction.label}
                </button>
              );
            })}

            {selectedDirection?.products.map((product, index) => {
              const active = selectedProduct?.label === product.label;
              const dimmed = Boolean(selectedProduct) && !active;

              return (
                <button
                  className={`option-node layer-three ${active ? "option-node-active" : ""} ${
                    dimmed ? "node-dimmed" : ""
                  }`}
                  key={product.label}
                  onClick={(event) => {
                    event.stopPropagation();
                    chooseProduct(product);
                  }}
                  style={
                    {
                      "--x": `${product.x}%`,
                      "--y": `${product.y}%`,
                      "--delay": `${index * 110}ms`,
                    } as CSSProperties
                  }
                  type="button"
                >
                  <span aria-hidden="true">{product.emoji}</span>
                  {product.label}
                </button>
              );
            })}
          </div>

          {phase === "intro" && (
            <form className="intro-panel" onClick={stopCanvasReset} onSubmit={startScan}>
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                Introduce yourself
              </p>
              <label className="mt-3 block text-2xl font-semibold leading-tight text-white">
                Tell NEXT THING about your work, hobbies, and interests.
              </label>
              <textarea
                className="mt-4 min-h-32 w-full resize-none rounded-[22px] border border-white/14 bg-white/10 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/34 focus:border-[#f5bf4b]"
                onChange={(event) => setIntro(event.target.value)}
                placeholder="I work in... I like... I keep thinking about..."
                value={intro}
              />
              <button
                className="mt-4 w-full rounded-full bg-[#f5bf4b] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#171323] transition hover:bg-white"
                type="submit"
              >
                Generate my map
              </button>
            </form>
          )}
        </div>

        <aside className={`${phase === "intro" ? "hidden" : "flex"} relative z-20 mx-auto mb-3 max-h-[30vh] w-[min(1120px,calc(100%-32px))] shrink-0 flex-col gap-3 overflow-y-auto rounded-[24px] border border-white/14 bg-[#14142c]/72 p-4 shadow-2xl shadow-black/25 backdrop-blur-md md:flex-row md:items-center md:justify-between`}>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-white/52">
              {phase === "complete"
                ? "Product prompt ready"
                : selectedDirection
                  ? "Select final product signal"
                  : selectedTheme
                    ? "Select second layer"
                    : phase === "intro"
                      ? "Step 0"
                      : "Select first layer"}
            </p>
            {phase === "complete" && readableBrief ? (
              <div className="mt-3 grid gap-3 text-sm leading-6 text-white/84 md:grid-cols-2">
                <div>
                  <span className="brief-label">Idea</span>
                  <p>{readableBrief.idea}.</p>
                </div>
                <div>
                  <span className="brief-label">Path</span>
                  <p>{readableBrief.path}</p>
                </div>
                <div>
                  <span className="brief-label">Who it helps</span>
                  <p>{readableBrief.audience}</p>
                </div>
                <div>
                  <span className="brief-label">Next step</span>
                  <p>{readableBrief.nextStep}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm leading-6 text-white/82 md:text-base">
                {phase === "intro"
                  ? "Start by describing yourself. The radar will then think, place your first themes, and ask you to choose three layers."
                  : selectedDirection
                    ? `Layer 3: choose the product signal inside ${selectedDirection.label.toLowerCase()}.`
                    : selectedTheme
                      ? `Layer 2: choose what ${selectedTheme.label.toLowerCase()} means for this product. Other themes stay visible at 10% so your path is clear.`
                      : "Layer 1: choose the strongest theme around your persona. Click empty space to clear the path."}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              className="rounded-full border border-white/22 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#16162e] transition hover:bg-[#f5bf4b] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!productPrompt}
              onClick={copyPrompt}
              type="button"
            >
              {copied ? "Copied" : "Copy prompt"}
            </button>
            <a
              className={`rounded-full border border-white/18 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] transition ${
                productPrompt
                  ? "bg-[#f5bf4b] text-[#171323] hover:bg-white"
                  : "pointer-events-none bg-white/8 text-white/35"
              }`}
              href={codexHref}
              rel="noreferrer"
              target="_blank"
            >
              Open Codex
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
