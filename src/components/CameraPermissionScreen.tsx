import { motion } from 'motion/react';
import { Camera, Zap } from 'lucide-react';
import { useState } from 'react';

interface CameraPermissionScreenProps {
  onAllow: (gender: "F" | "M") => void;
  onNotNow: () => void;
}

export function CameraPermissionScreen({ onAllow, onNotNow }: CameraPermissionScreenProps) {
  const [selectedGender, setSelectedGender] = useState<"F" | "M" | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative w-full h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-black"
    >
      {/* Floating emojis */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-24 left-12 text-4xl"
      >
        📸
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute top-32 right-16 text-3xl"
      >
        🔥
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
        className="absolute bottom-32 left-16 text-3xl"
      >
        ⚡
      </motion.div>

      {/* Camera Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
        className="mb-12 relative"
      >
        <div className="w-32 h-32 rounded-3xl bg-yellow-400 flex items-center justify-center shadow-2xl border-4 border-white/20 rotate-6">
          <Camera className="w-16 h-16 text-black -rotate-6" strokeWidth={2.5} />
        </div>
        {/* Glow */}
        <div className="absolute inset-0 w-32 h-32 rounded-3xl bg-yellow-400 blur-2xl opacity-60 -z-10" />
        
        {/* Floating zaps */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, -80],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut'
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
          >
            <Zap className="w-5 h-5 text-yellow-400" fill="currentColor" />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center mb-8 max-w-sm"
      >
        <h2 className="text-white mb-4">
          need ur camera real quick 📸
        </h2>
        <p className="text-white/70 leading-relaxed" style={{ fontSize: '1.125rem' }}>
          gonna read ur face & match u with the perfect korean name
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 px-4 py-3 rounded-full bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 inline-block"
        >
          <p className="text-yellow-400">
            🔒 nobody sees ur pic but u
          </p>
        </motion.div>
      </motion.div>

      {/* Gender Selection */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full mb-8"
      >
        <p className="text-white/70 text-center mb-4" style={{ fontSize: '0.875rem' }}>
          pick ur vibe first
        </p>
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedGender("F")}
            className={`flex-1 py-4 rounded-2xl border-2 transition-all ${
              selectedGender === "F"
                ? "bg-yellow-400 border-yellow-400 text-black"
                : "bg-white/10 border-white/20 text-white/70"
            }`}
          >
            <div className="text-2xl mb-1">👸</div>
            <div style={{ fontSize: '1rem', fontWeight: '700' }}>Female</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedGender("M")}
            className={`flex-1 py-4 rounded-2xl border-2 transition-all ${
              selectedGender === "M"
                ? "bg-yellow-400 border-yellow-400 text-black"
                : "bg-white/10 border-white/20 text-white/70"
            }`}
          >
            <div className="text-2xl mb-1">🤴</div>
            <div style={{ fontSize: '1rem', fontWeight: '700' }}>Male</div>
          </motion.button>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full flex flex-col gap-3"
      >
        <motion.button
          whileTap={selectedGender ? { scale: 0.98 } : {}}
          onClick={() => selectedGender && onAllow(selectedGender)}
          disabled={!selectedGender}
          className={`w-full py-5 rounded-full shadow-2xl relative overflow-hidden transition-all ${
            selectedGender
              ? "bg-yellow-400 text-black"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          <span className="relative z-10" style={{ fontSize: '1.125rem', fontWeight: '800' }}>
            ALLOW CAMERA 🔥
          </span>
          {selectedGender && (
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onNotNow}
          className="w-full bg-white/10 backdrop-blur-sm text-white/70 py-4 rounded-full border-2 border-white/20 active:bg-white/20 transition-colors"
        >
          nah not rn
        </motion.button>
      </motion.div>
    </motion.div>
  );
}