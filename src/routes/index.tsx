import { createFileRoute } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import trainerImage from "../assets/aicha-trainer.png.asset.json";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aicha, One Important Question ❤️" },
      { name: "description", content: "A funny, romantic running invitation made especially for Aicha." },
      { property: "og:title", content: "Aicha, One Important Question ❤️" },
      { property: "og:description", content: "A funny, romantic running invitation made especially for Aicha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const jokes = [
  "Are you sure, Aicha? 👀",
  "Hmm… I don't think you really mean that 😂",
  "Nice try 😭",
  "NO button.exe has stopped working 💀",
  "Aicha… please 😭❤️",
  "Your trainer is disappointed 😔😂",
  "Okay okay… I'll give you one more chance 😭",
  "THE NO BUTTON REFUSES TO COOPERATE 😂",
  "Okay Aicha… apparently NO isn't an option 😂❤️",
];

const hearts = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 7) % 96}%`,
  delay: `${(index * 1.17) % 10}s`,
  size: 13 + (index % 5) * 4,
  duration: `${11 + (index % 6)}s`,
}));

function AmbientLove({ celebrating }: { celebrating: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-drift absolute opacity-0"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            "--drift-time": heart.duration,
            fontSize: celebrating ? heart.size * 1.35 : heart.size,
          } as React.CSSProperties}
        >
          {heart.id % 4 === 0 ? "💕" : "❤️"}
        </span>
      ))}
      <span className="runner-cross absolute bottom-[12%] left-0 text-2xl opacity-40">🏃‍♀️</span>
      <span className="runner-cross absolute bottom-[7%] left-0 text-xl opacity-30 [animation-delay:6s]">🏃‍♂️</span>
    </div>
  );
}

function Index() {
  const reduceMotion = useReducedMotion();
  const [questionVisible, setQuestionVisible] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 220, y: 120 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setQuestionVisible(true), reduceMotion ? 0 : 1000);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const dodgeNo = useCallback(() => {
    const area = gameAreaRef.current?.getBoundingClientRect();
    const button = noButtonRef.current?.getBoundingClientRect();
    if (!area || !button) return;

    const padding = 10;
    const maxX = Math.max(0, area.width - button.width - padding * 2);
    const maxY = Math.max(0, area.height - button.height - padding * 2);
    setNoPosition({
      x: padding + Math.random() * maxX,
      y: padding + Math.random() * maxY,
    });
    setAttempts((value) => Math.min(value + 1, jokes.length));
  }, []);

  const celebrate = useCallback(() => {
    setCelebrating(true);
    if (!reduceMotion) {
      const colors = ["#ff315d", "#ff6b9a", "#ffd1dc", "#ffffff"];
      confetti({ particleCount: 170, spread: 100, startVelocity: 50, origin: { x: 0.5, y: 0.48 }, colors });
      window.setTimeout(() => {
        confetti({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.65 }, colors });
        confetti({ particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.65 }, colors });
      }, 350);
    }
  }, [reduceMotion]);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-background text-foreground">
      <img src={trainerImage.url} alt="Your personal trainer waiting for tomorrow's run" className="fixed inset-0 h-full w-full object-cover object-[66%_center] opacity-30 sm:object-center" />
      <div className="fixed inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_55%,transparent)_0%,var(--background)_78%,var(--background)_100%)] sm:bg-[linear-gradient(90deg,var(--background)_8%,color-mix(in_oklab,var(--background)_70%,transparent)_55%,var(--background)_100%)]" />
      <AmbientLove celebrating={celebrating} />

      <AnimatePresence mode="wait">
        {!celebrating ? (
          <motion.section
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-5 py-8 sm:px-10"
          >
            <div className="w-full max-w-2xl py-8 text-center sm:text-left">
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="font-display text-sm font-black uppercase tracking-[0.22em] text-primary sm:text-base">
                A tiny cardio proposal
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl">
                HEY AICHA {reduceMotion ? <span>❤️</span> : <motion.span className="inline-block" animate={{ scale: [1, 1.18, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>❤️</motion.span>}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 text-lg font-medium text-muted-foreground sm:text-xl">
                I have an important question for you…
              </motion.p>

              <AnimatePresence>
                {questionVisible && (
                  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                    <h2 className="font-display text-3xl font-black leading-tight tracking-normal sm:text-5xl">
                      Will you go running with me tomorrow? 🏃‍♂️❤️
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:mx-0 sm:text-lg">
                      Just you + me + a little suffering + lots of laughs 😂
                    </p>

                    <div ref={gameAreaRef} className="relative mt-6 h-52 w-full overflow-hidden rounded-2xl border border-border bg-card p-3 backdrop-blur-md sm:h-48">
                      <AnimatePresence mode="wait">
                        <motion.p key={attempts} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="min-h-12 px-3 text-center font-display text-sm font-extrabold text-foreground sm:text-base">
                          {attempts > 0 ? jokes[Math.min(attempts - 1, jokes.length - 1)] : "Choose wisely, runner 👀"}
                        </motion.p>
                      </AnimatePresence>
                      <motion.div className="absolute bottom-4 left-3 z-10" animate={{ scale: 1 + Math.min(attempts, 8) * 0.085 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                        <Button variant="love" size="love" onClick={celebrate} className="love-pulse">{attempts >= 8 ? "YES ❤️🏃‍♂️" : "❤️ YES, LET'S RUN"}</Button>
                      </motion.div>
                      <motion.div
                        className="absolute left-0 top-0 z-20"
                        animate={noPosition}
                        transition={{ type: "spring", stiffness: 520, damping: 24 }}
                      >
                        <Button
                          ref={noButtonRef}
                          variant="mischief"
                          size="love"
                          aria-label="No — but this button will run away"
                          onPointerEnter={dodgeNo}
                          onPointerDown={(event) => { event.preventDefault(); dodgeNo(); }}
                          onTouchStart={(event) => { event.preventDefault(); dodgeNo(); }}
                          onClick={(event) => { event.preventDefault(); dodgeNo(); }}
                          className="whitespace-nowrap"
                          style={{ transform: `scale(${Math.max(0.48, 1 - attempts * 0.065)})` }}
                        >
                          😈 NO
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        ) : (
          <motion.section key="celebration" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-4xl items-center px-5 py-10 sm:px-10">
            <div className="w-full text-center">
              <motion.div initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 180, damping: 12 }} className="text-6xl sm:text-8xl">🏃‍♀️❤️🏃‍♂️</motion.div>
              <h1 className="mt-3 font-display text-5xl font-black leading-none tracking-normal text-primary sm:text-7xl">YEEEEES! ❤️🏃‍♂️</h1>
              <p className="mt-5 text-lg font-bold sm:text-2xl">I knew you couldn't resist running with your favorite trainer 😎</p>
              <p className="mt-2 text-muted-foreground">Tomorrow = You + Me + Running + Good vibes ❤️</p>
              <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-border-strong bg-card p-5 text-left shadow-love backdrop-blur-lg sm:p-7">
                <p className="text-center font-display text-sm font-black uppercase tracking-[0.18em] text-primary">Our running date is officially booked 🏃‍♀️❤️🏃‍♂️</p>
                <h2 className="mt-4 text-center font-display text-2xl font-black tracking-normal">TOMORROW'S MISSION</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {["🏃‍♀️ Run together", "😂 Laugh together", "💪 Get stronger together", "❤️ Make memories together"].map((item, index) => (
                    <motion.p key={item} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + index * 0.1 }} className="rounded-lg bg-secondary px-4 py-3 font-semibold">{item}</motion.p>
                  ))}
                </div>
              </div>
              <div className="mx-auto mt-8 max-w-2xl space-y-3 text-base text-muted-foreground sm:text-lg">
                <p>Honestly, I don't care how fast we run…<br /><strong className="text-foreground">I just want to run beside you. ❤️</strong></p>
                <p className="pt-4 font-display text-3xl font-black text-foreground">Aicha ❤️</p>
                <p><strong className="text-foreground">Thank you for saying yes.</strong></p>
                <p>I know it's just a run…<br />But every little thing is better when I get to do it with you.</p>
                <p>Tomorrow, don't worry about your pace.<br /><strong className="text-foreground">Just stay beside me. ❤️</strong></p>
                 <p className="pt-4"><strong className="text-foreground">I’ll always be your number one supporter. ❤️</strong></p>
                 <p>And by the way…<br /><strong className="text-primary">you owe me a lot of kisses 😘😘😘</strong></p>
              </div>
              {reduceMotion ? (
                <p className="mx-auto mt-8 max-w-3xl font-display text-3xl font-black leading-tight tracking-normal sm:text-5xl">SEE YOU TOMORROW, MY RUNNING PARTNER 🏃‍♀️❤️🏃‍♂️</p>
              ) : (
                <motion.p animate={{ scale: [1, 1.025, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="mx-auto mt-8 max-w-3xl font-display text-3xl font-black leading-tight tracking-normal sm:text-5xl">SEE YOU TOMORROW, MY RUNNING PARTNER 🏃‍♀️❤️🏃‍♂️</motion.p>
              )}
              <p className="mt-4 font-bold text-primary">Your favorite trainer 😎</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
