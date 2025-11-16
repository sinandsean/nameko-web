import { Flame, RefreshCw, Share2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ResultScreenProps {
  capturedPhoto: string;
  generatedName: {
    korean: string;
    romanization: string;
    interpretation: string;
    reasons: string[];
  };
  onTryAgain: () => void;
  onShare: () => void;
}

export function ResultScreen({
  capturedPhoto,
  generatedName,
  onTryAgain,
  onShare,
}: ResultScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Confetti Effect - edgier emojis */}
      {showConfetti && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 400 - 200,
                y: -20,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                opacity: 0,
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                delay: Math.random() * 0.3,
                ease: "easeIn",
              }}
              onAnimationComplete={() => {
                if (i === 24) setShowConfetti(false);
              }}
              className="absolute left-1/2 pointer-events-none text-3xl"
            >
              {["🔥", "⚡", "💀", "👑", "💯"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </>
      )}

      {/* Yellow glow orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-yellow-400 blur-[120px]"
      />

      <div className="relative z-10 p-6 pb-12">
        {/* Top Decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8 mt-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame
              className="w-16 h-16 text-yellow-400"
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.div>
        </motion.div>

        {/* Photo Preview with yellow glow */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-yellow-400 blur-2xl opacity-60" />
            <div className="relative w-28 h-28 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl rotate-3">
              <img
                src={capturedPhoto}
                alt="Your photo"
                className="w-full h-full object-cover -rotate-3"
              />
            </div>
          </div>
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <div className="inline-block px-5 py-3 rounded-full bg-yellow-400/20 backdrop-blur-sm border-2 border-yellow-400/40">
            <p className="text-yellow-400" style={{ fontWeight: "700" }}>
              ⚡ UR KOREAN NAME ⚡
            </p>
          </div>
        </motion.div>

        {/* Korean Name - Big Reveal */}
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.7,
            type: "spring",
            stiffness: 120,
          }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{
              textShadow: [
                "0 0 30px rgba(250, 204, 21, 0.5)",
                "0 0 50px rgba(250, 204, 21, 0.8)",
                "0 0 30px rgba(250, 204, 21, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1
              className="text-yellow-400 mb-3"
              style={{
                fontSize: "4.5rem",
                lineHeight: "0.9",
                fontWeight: "900",
                letterSpacing: "-0.03em",
              }}
            >
              {generatedName.korean}
            </h1>
          </motion.div>
          <p
            className="text-white/80 mb-4"
            style={{ fontSize: "1.75rem", fontWeight: "700" }}
          >
            {generatedName.romanization}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-8 px-4"
        >
          {[
            { icon: "🔥", text: "ur vibe" },
            { icon: "💀", text: "no cap" },
            { icon: "👑", text: "perfect match" },
          ].map((tag, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.8 + i * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white flex items-center gap-2"
            >
              <span className="text-lg">{tag.icon}</span>
              <span style={{ fontWeight: "700" }}>{tag.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Interpretation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-4 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border-2 border-white/10">
            <p
              className="text-white/90 text-center leading-relaxed"
              style={{ fontSize: "1.125rem", fontWeight: "600" }}
            >
              {generatedName.interpretation}
            </p>
          </div>
        </motion.div>

        {/* Why This Name Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mx-4 mb-10"
        >
          <h3
            className="text-white/80 mb-5 text-center"
            style={{ fontSize: "1.125rem", fontWeight: "700" }}
          >
            why this name tho? 🤔
          </h3>

          <div className="space-y-3">
            {generatedName.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.15, duration: 0.5 }}
                className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/10"
              >
                <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap
                    className="w-4 h-4 text-black"
                    fill="black"
                    strokeWidth={0}
                  />
                </div>
                <p
                  className="text-white/80 flex-1"
                  style={{ fontWeight: "500" }}
                >
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex flex-col gap-3 mx-4"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onShare}
            className="w-full bg-yellow-400 text-black py-5 rounded-full shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
          >
            <span
              className="relative z-10 flex items-center gap-3"
              style={{ fontSize: "1.125rem", fontWeight: "900" }}
            >
              <Share2 className="w-5 h-5" strokeWidth={3} />
              SHARE THIS 🔥
            </span>
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onTryAgain}
            className="w-full bg-white/10 backdrop-blur-sm text-white/80 py-4 rounded-full border-2 border-white/20 active:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
            <span style={{ fontWeight: "700" }}>try again</span>
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center mt-8"
        >
          <p className="text-white/40" style={{ fontWeight: "600" }}>
            💀 2.3M+ people got their names
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
