import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { useEffect } from 'react';

// Declare ReactNativeWebView type
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface LoadingScreenProps {
  capturedPhoto: string;
}

export function LoadingScreen({ capturedPhoto }: LoadingScreenProps) {
  // Notify React Native app to show ad when loading screen is shown
  useEffect(() => {
    console.log("🎬 LoadingScreen mounted");
    console.log("🔍 Checking for ReactNativeWebView:", !!window.ReactNativeWebView);

    // Check if running in React Native WebView
    if (window.ReactNativeWebView) {
      const message = JSON.stringify({ type: "SHOW_AD_LOADING_SCREEN" });
      console.log("📤 Sending message to React Native:", message);
      window.ReactNativeWebView.postMessage(message);
      console.log("✅ Message sent successfully");
    } else {
      console.log("ℹ️ Not running in React Native WebView");
    }
  }, []);

  const loadingPhrases = [
    'scanning ur face... 👀',
    'matching ur vibe... 🔥',
    'finding ur name... 💀'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${capturedPhoto})`,
          filter: 'blur(60px) brightness(0.4)',
          transform: 'scale(1.2)'
        }}
      />
      
      {/* Yellow overlay */}
      <div className="absolute inset-0 bg-yellow-400/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-yellow-400 blur-[100px]"
        />

        {/* Main Loader */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-40 h-40"
          >
            <div className="w-full h-full rounded-full border-[6px] border-transparent border-t-yellow-400 border-r-yellow-400/50" />
          </motion.div>

          {/* Inner circle */}
          <div className="w-40 h-40 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border-4 border-yellow-400/20 shadow-2xl">
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="w-20 h-20 text-yellow-400" fill="currentColor" strokeWidth={0} />
            </motion.div>
          </div>

          {/* Pulsing glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-40 h-40 rounded-full bg-yellow-400 blur-3xl -z-10"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.h3
            className="text-white mb-3"
            style={{ fontSize: '1.5rem', fontWeight: '800' }}
          >
            ANALYZING UR VIBE
          </motion.h3>
        </motion.div>

        {/* Animated status messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {loadingPhrases.map((phrase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                x: 0,
                scale: [0.9, 1, 1, 0.9]
              }}
              transition={{
                duration: 2.7,
                delay: i * 0.9,
                times: [0, 0.1, 0.85, 1],
                repeat: Infinity
              }}
              className="flex items-center gap-3 justify-center"
            >
              <motion.div
                animate={{ scale: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.7,
                  delay: i * 0.9,
                  times: [0, 0.1, 0.85, 1],
                  repeat: Infinity
                }}
                className="w-2 h-2 rounded-full bg-yellow-400"
              />
              <p className="text-white/90" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {phrase}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12"
        >
          <p className="text-white/50">
            this takes like 3 seconds
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
