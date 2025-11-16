import { ArrowLeft, SwitchCamera, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CameraScreenProps {
  onCapture: (photoData: string) => void;
  onBack: () => void;
}

export function CameraScreen({ onCapture, onBack }: CameraScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [cameraError, setCameraError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startCamera = async () => {
    try {
      setCameraError(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError(true);
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setErrorMessage(
            "Camera permission was denied. Please allow camera access or upload a photo instead."
          );
        } else if (error.name === "NotFoundError") {
          setErrorMessage(
            "No camera found on this device. Please upload a photo instead."
          );
        } else {
          setErrorMessage(
            "Unable to access camera. Please upload a photo instead."
          );
        }
      }
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL("image/jpeg");
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        onCapture(photoData);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target?.result as string;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        onCapture(photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: cameraError ? "black" : "black",
      }}
    >
      {!cameraError ? (
        <>
          {/* Video Preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          <canvas ref={canvasRef} className="hidden" />

          {/* Yellow overlay for Snapchat vibe */}
          <div className="absolute inset-0 bg-yellow-400/5" />

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border-2 border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleCamera}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border-2 border-white/20"
            >
              <SwitchCamera className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.button>
          </div>

          {/* Face Guide - Snapchat style */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              {/* Rounded square guide like Snapchat */}
              <div className="relative w-80 h-80">
                <div className="w-full h-full rounded-[3rem] border-4 border-yellow-400/60 border-dashed" />

                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-yellow-400 rounded-tl-3xl" />
                <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-yellow-400 rounded-tr-3xl" />
                <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-yellow-400 rounded-bl-3xl" />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-yellow-400 rounded-br-3xl" />
              </div>
            </motion.div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center gap-5 z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border-2 border-yellow-400/30"
            >
              <p className="text-white">
                💀 <span style={{ fontWeight: "700" }}>center ur face</span>
              </p>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              onClick={handleCapture}
              className="relative"
            >
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-24 h-24 rounded-full bg-yellow-400 blur-xl"
              />

              {/* Button - Snapchat style */}
              <div className="relative w-24 h-24 rounded-full bg-yellow-400 border-4 border-black shadow-2xl flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white" />
              </div>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/80"
              style={{ fontWeight: "700" }}
            >
              TAP TO CAPTURE 📸
            </motion.p>

            {/* Upload option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-yellow-400 underline underline-offset-4 flex items-center gap-2"
                style={{ fontWeight: "600" }}
              >
                <Upload className="w-4 h-4" />
                upload instead
              </button>
            </motion.div>
          </div>
        </>
      ) : (
        // Error State - Upload Only
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
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
            ⚡
          </motion.div>

          {/* Back button */}
          <div className="absolute top-6 left-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.button>
          </div>

          {/* Error message */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 text-center max-w-sm"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-yellow-400 flex items-center justify-center shadow-2xl rotate-6">
              <Upload
                className="w-16 h-16 text-black -rotate-6"
                strokeWidth={2.5}
              />
            </div>
            <h2 className="text-white mb-4">just upload a pic instead 📷</h2>
            <p
              className="text-white/70 leading-relaxed mb-6"
              style={{ fontSize: "1.125rem" }}
            >
              camera not working rn but we can still find ur name 🔥
            </p>
          </motion.div>

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-sm bg-yellow-400 text-black py-5 rounded-full shadow-2xl relative overflow-hidden"
          >
            <span
              className="relative z-10 flex items-center justify-center gap-2"
              style={{ fontSize: "1.125rem", fontWeight: "800" }}
            >
              <Upload className="w-5 h-5" />
              CHOOSE PHOTO 🔥
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

          <p className="mt-6 text-white/50 text-center">
            🔒 ur photo stays private
          </p>
        </div>
      )}
    </motion.div>
  );
}
