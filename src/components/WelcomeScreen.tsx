import { motion } from "motion/react";
import { Zap } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-screen flex flex-col items-center justify-between p-6 overflow-hidden bg-black"
    >
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-8 text-5xl"
      >
        🔥
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-32 right-12 text-4xl"
      >
        💀
      </motion.div>
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-64 left-8 text-4xl"
      >
        ⚡
      </motion.div>
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute bottom-56 right-16 text-3xl"
      >
        👑
      </motion.div>

      {/* Logo with yellow accent */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
          type: "spring",
          stiffness: 200,
        }}
        className="mt-20"
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl flex items-center justify-center border-4 border-white rotate-6">
            <Zap
              className="w-16 h-16 text-black -rotate-6"
              strokeWidth={3}
              fill="black"
            />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-32 h-32 rounded-3xl bg-yellow-400 blur-2xl opacity-50 -z-10" />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <h1
            className="text-white mb-3"
            style={{
              fontSize: "2.8rem",
              lineHeight: "0.95",
              letterSpacing: "-0.03em",
            }}
          >
            what's ur
            <br />
            <span className="text-yellow-400">korean name</span>
          </h1>
        </motion.div>
        <p
          className="text-white/70 max-w-xs mt-4 leading-relaxed"
          style={{ fontSize: "1.125rem" }}
        >
          AI reads ur face & gives u a name that actually hits
          different 🔥
        </p>

        {/* Stats/Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 px-5 py-3 rounded-full bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30"
        >
          <p className="text-yellow-400">
            💀 2.3M+ already got theirs
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full flex flex-col items-center gap-4 mb-8"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 40px -10px rgba(250, 204, 21, 0.6)",
              "0 10px 60px -10px rgba(250, 204, 21, 0.8)",
              "0 10px 40px -10px rgba(250, 204, 21, 0.6)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={onStart}
          className="w-full bg-yellow-400 text-black py-6 rounded-full shadow-2xl relative overflow-hidden"
        >
          <span
            className="relative z-10 flex items-center justify-center gap-2"
            style={{ fontSize: "1.125rem", fontWeight: "800" }}
          >
            LET'S GO 🔥
          </span>
          {/* Shimmer effect */}
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

        <button className="text-white/50">
          <span>how does this work?</span>
        </button>
      </motion.div>
    </motion.div>
  );
}