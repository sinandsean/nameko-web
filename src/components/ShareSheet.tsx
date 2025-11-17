import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';

interface ShareSheetProps {
  capturedPhoto: string | null;
  generatedName: {
    korean: string;
    romanization: string;
  };
  onClose: () => void;
}

export function ShareSheet({ capturedPhoto, generatedName, onClose }: ShareSheetProps) {
  const handleDownload = () => {
    // Canvas를 사용해 이미지 생성
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 9:16 비율로 캔버스 설정
    canvas.width = 1080;
    canvas.height = 1920;

    // 배경 - 검정색
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 그라데이션 효과
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(250, 204, 21, 0.2)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(250, 204, 21, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 데코레이션 이모지
    ctx.font = '120px Arial';
    ctx.fillText('🔥', 120, 240);
    ctx.font = '100px Arial';
    ctx.fillText('⚡', 900, 280);
    ctx.font = '100px Arial';
    ctx.fillText('💀', 150, 1620);
    ctx.font = '80px Arial';
    ctx.fillText('👑', 880, 1680);

    // 사진 그리기 (있는 경우)
    if (capturedPhoto) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const size = 400;
        const x = (canvas.width - size) / 2;
        const y = 450;

        // 노란색 빛 효과
        ctx.shadowColor = 'rgba(250, 204, 21, 0.4)';
        ctx.shadowBlur = 60;

        // 회전된 사진 프레임
        ctx.save();
        ctx.translate(x + size / 2, y + size / 2);
        ctx.rotate(0.1); // 약간 회전
        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 12;
        ctx.strokeRect(-size / 2, -size / 2, size, size);

        // 둥근 모서리로 사진 그리기
        ctx.clip();
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();

        ctx.shadowBlur = 0;

        continueDrawing();
      };
      img.src = capturedPhoto;
    } else {
      continueDrawing();
    }

    function continueDrawing() {
      if (!ctx) return;

      // "MY KOREAN NAME IS" 텍스트
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = 'rgba(250, 204, 21, 0.4)';
      ctx.textAlign = 'center';
      ctx.fillText('MY KOREAN NAME IS', canvas.width / 2, 1000);

      // 한글 이름 (큰 글씨)
      ctx.font = 'bold 200px Arial';
      ctx.fillStyle = '#FACC15';
      ctx.shadowColor = 'rgba(250, 204, 21, 0.8)';
      ctx.shadowBlur = 40;
      ctx.fillText(generatedName.korean, canvas.width / 2, 1200);
      ctx.shadowBlur = 0;

      // 로마자 표기
      ctx.font = 'bold 80px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(generatedName.romanization, canvas.width / 2, 1320);

      // 하단 브랜딩
      ctx.font = 'bold 42px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillRect(canvas.width / 2 - 280, 1760, 560, 80);
      ctx.fillStyle = '#FACC15';
      ctx.fillRect(canvas.width / 2 - 280, 1760, 560, 80);
      ctx.fillStyle = '#000000';
      ctx.fillText('GET URS @ KOREAN NAME GEN', canvas.width / 2, 1815);

      // Canvas를 이미지로 변환하여 다운로드
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `korean-name-${generatedName.romanization.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    }
  };

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

          {/* Save Image Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <button
              onClick={handleDownload}
              className="w-full bg-yellow-400 text-black py-5 rounded-full shadow-2xl flex items-center justify-center gap-3 border-2 border-yellow-300 active:scale-95 transition-transform relative overflow-hidden"
            >
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
              <Download className="w-6 h-6 relative z-10" strokeWidth={3} />
              <span className="relative z-10" style={{ fontSize: '1.125rem', fontWeight: '900' }}>SAVE IMAGE 💾</span>
            </button>
          </motion.div>

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-white/60 mb-2" style={{ fontWeight: '600' }}>
              📱 save & share on social media
            </p>
            <p className="text-white/40" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              💀 share ur vibe with the world
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
