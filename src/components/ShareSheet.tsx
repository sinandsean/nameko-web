import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Download } from 'lucide-react';

interface ShareSheetProps {
  capturedPhoto: string | null;
  generatedName: {
    korean: string;
    romanization: string;
  };
  onClose: () => void;
}

export function ShareSheet({ capturedPhoto, generatedName, onClose }: ShareSheetProps) {
  const shareTargets = [
    { 
      emoji: '📷', 
      label: 'IG Story', 
      gradient: 'from-purple-500 via-pink-500 to-orange-400'
    },
    { 
      emoji: '🎵', 
      label: 'TikTok', 
      gradient: 'from-black to-gray-900'
    },
    { 
      emoji: '👻', 
      label: 'Snap', 
      gradient: 'from-yellow-300 to-yellow-400'
    },
    { 
      emoji: '💬', 
      label: 'WhatsApp', 
      gradient: 'from-green-500 to-green-600'
    },
    { 
      emoji: '💙', 
      label: 'Twitter', 
      gradient: 'from-blue-400 to-blue-500'
    },
    { 
      emoji: '📱', 
      label: 'iMessage', 
      gradient: 'from-blue-500 to-blue-600'
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/80 backdrop-blur-lg" 
        />

        {/* Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 35, stiffness: 400 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full bg-black rounded-t-[2.5rem] p-6 pb-12 max-w-md mx-auto shadow-2xl border-t-4 border-yellow-400"
        >
          {/* Handle */}
          <div className="w-16 h-1.5 bg-yellow-400/40 rounded-full mx-auto mb-8" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              <span>SHARE UR NAME</span>
              <span className="text-2xl">🔥</span>
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20 transition-colors border-2 border-white/10"
            >
              <X className="w-5 h-5 text-white/80" strokeWidth={3} />
            </button>
          </div>

          {/* Preview Card - Snapchat/Story Format */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400/30"
            style={{
              aspectRatio: '9/16',
              maxHeight: '420px'
            }}
          >
            <div 
              className="relative w-full h-full p-8 flex flex-col items-center justify-center bg-black"
            >
              {/* Yellow glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10" />
              
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 text-4xl">🔥</div>
              <div className="absolute top-10 right-10 text-3xl">⚡</div>
              <div className="absolute bottom-16 left-10 text-3xl">💀</div>
              <div className="absolute bottom-20 right-12 text-2xl">👑</div>
              
              {/* Photo */}
              {capturedPhoto && (
                <motion.div
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-8 relative"
                >
                  <div className="absolute inset-0 rounded-3xl bg-yellow-400 blur-2xl opacity-40" />
                  <div className="relative w-36 h-36 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl rotate-6">
                    <img src={capturedPhoto} alt="Preview" className="w-full h-full object-cover -rotate-6" />
                  </div>
                </motion.div>
              )}

              {/* Name */}
              <div className="text-center mb-6 relative">
                <div className="mb-3 px-4 py-2 rounded-full bg-yellow-400/20 border-2 border-yellow-400/40 inline-block">
                  <p className="text-yellow-400" style={{ fontSize: '0.875rem', fontWeight: '700' }}>
                    MY KOREAN NAME IS
                  </p>
                </div>
                <motion.h2 
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(250, 204, 21, 0.6)',
                      '0 0 40px rgba(250, 204, 21, 0.9)',
                      '0 0 20px rgba(250, 204, 21, 0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-yellow-400 mb-2"
                  style={{ 
                    fontSize: '3.5rem',
                    lineHeight: '0.95',
                    fontWeight: '900',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {generatedName.korean}
                </motion.h2>
                <p className="text-white/90" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {generatedName.romanization}
                </p>
              </div>

              {/* App branding */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <div className="inline-block px-5 py-2 rounded-full bg-yellow-400 shadow-xl">
                  <p className="text-black" style={{ fontSize: '0.875rem', fontWeight: '800' }}>
                    GET URS @ KOREAN NAME GEN
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 mb-6"
          >
            <button className="flex-1 bg-yellow-400 text-black py-4 rounded-full shadow-lg flex items-center justify-center gap-2 border-2 border-yellow-300 active:scale-95 transition-transform">
              <Copy className="w-5 h-5" strokeWidth={3} />
              <span style={{ fontWeight: '800' }}>COPY</span>
            </button>
            <button className="flex-1 bg-white/10 backdrop-blur-sm text-white py-4 rounded-full border-2 border-white/20 flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <Download className="w-5 h-5" strokeWidth={3} />
              <span style={{ fontWeight: '800' }}>SAVE</span>
            </button>
          </motion.div>

          {/* Share Targets Grid */}
          <div className="mb-4">
            <p className="text-white/60 mb-4" style={{ fontWeight: '700' }}>
              post it 👇
            </p>
            <div className="grid grid-cols-3 gap-3">
              {shareTargets.map((target, index) => (
                <motion.button
                  key={target.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/10 active:bg-white/10 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${target.gradient} flex items-center justify-center shadow-lg text-2xl border-2 border-white/20`}>
                    {target.emoji}
                  </div>
                  <span className="text-white/80" style={{ fontSize: '0.75rem', fontWeight: '700' }}>
                    {target.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Viral CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-white/40" style={{ fontWeight: '600' }}>
              💀 tag @koreannamegen to get featured
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
