import { useState } from "react";
import { CameraPermissionScreen } from "./components/CameraPermissionScreen";
import { CameraScreen } from "./components/CameraScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { ShareSheet } from "./components/ShareSheet";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { getRandomNameByGrade } from "./utils/prob";

type Screen = "welcome" | "permission" | "camera" | "loading" | "result";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [gender, setGender] = useState<"F" | "M">("F");
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

  const handleGenderSelect = (selectedGender: "F" | "M") => {
    setGender(selectedGender);
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
      // Generate random name based on gender
      const randomName = getRandomNameByGrade(gender);

      // Generate interpretation based on gender
      const interpretation =
        gender === "F"
          ? "elegant, artistic, and graceful energy"
          : "sharp, confident, and charismatic presence";

      const reasons =
        gender === "F"
          ? [
              "soft facial features that radiate warmth",
              "gentle yet confident vibe",
              "matches popular modern korean names for creative souls",
            ]
          : [
              "strong facial structure with natural leadership energy",
              "determined yet approachable vibe",
              "matches popular modern korean names for ambitious individuals",
            ];

      setGeneratedName({
        korean: randomName.ko,
        romanization: randomName.en,
        interpretation,
        reasons,
      });

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
        {currentScreen === "welcome" && (
          <WelcomeScreen onSelectGender={handleGenderSelect} />
        )}

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
