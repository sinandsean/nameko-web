import { useState } from "react";
import { CameraPermissionScreen } from "./components/CameraPermissionScreen";
import { CameraScreen } from "./components/CameraScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { ShareSheet } from "./components/ShareSheet";
import { WelcomeScreen } from "./components/WelcomeScreen";

type Screen = "welcome" | "permission" | "camera" | "loading" | "result";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [generatedName, setGeneratedName] = useState({
    korean: "서연",
    romanization: "Seo-yeon",
    interpretation: "elegant, artistic, and graceful energy",
    reasons: [
      "soft facial features that radiate warmth",
      "gentle yet confident vibe",
      "matches popular modern korean names for creative souls",
    ],
  });
  const handleStart = () => {
    setCurrentScreen("permission");
  };

  const handleAllow = () => {
    setCurrentScreen("camera");
  };

  const handleNotNow = () => {
    setCurrentScreen("welcome");
  };

  const handleCapture = (photoData: string) => {
    setCapturedPhoto(photoData);
    setCurrentScreen("loading");

    // Simulate 3 second analysis
    setTimeout(() => {
      setCurrentScreen("result");
    }, 3000);
  };

  const handleTryAgain = () => {
    setCapturedPhoto(null);
    setCurrentScreen("camera");
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleBack = () => {
    setCurrentScreen("welcome");
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Mobile container */}
      <div className="max-w-md mx-auto min-h-screen bg-white relative">
        {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}

        {currentScreen === "permission" && (
          <CameraPermissionScreen
            onAllow={handleAllow}
            onNotNow={handleNotNow}
          />
        )}

        {currentScreen === "camera" && (
          <CameraScreen onCapture={handleCapture} onBack={handleBack} />
        )}

        {currentScreen === "loading" && capturedPhoto && (
          <LoadingScreen capturedPhoto={capturedPhoto} />
        )}

        {currentScreen === "result" && capturedPhoto && (
          <ResultScreen
            capturedPhoto={capturedPhoto}
            generatedName={generatedName}
            onTryAgain={handleTryAgain}
            onShare={handleShare}
          />
        )}

        {showShareSheet && (
          <ShareSheet
            capturedPhoto={capturedPhoto}
            generatedName={generatedName}
            onClose={() => setShowShareSheet(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
