import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CameraPermissionScreen } from "./components/CameraPermissionScreen";
import { CameraScreen } from "./components/CameraScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { ShareSheet } from "./components/ShareSheet";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { getRandomNameByGrade } from "./utils/prob";

function App() {
  const navigate = useNavigate();
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
    navigate("/permission");
  };

  const handleAllow = () => {
    navigate("/camera");
  };

  const handleNotNow = () => {
    navigate("/");
  };

  const handleCapture = (photoData: string) => {
    setCapturedPhoto(photoData);
    navigate("/loading");

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

      navigate("/result");
    }, 3000);
  };

  const handleTryAgain = () => {
    setCapturedPhoto(null);
    navigate("/camera");
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Mobile container */}
      <div className="max-w-md mx-auto min-h-screen bg-white relative">
        <Routes>
          <Route path="/" element={<WelcomeScreen onSelectGender={handleGenderSelect} />} />
          <Route path="/permission" element={
            <CameraPermissionScreen
              onAllow={handleAllow}
              onNotNow={handleNotNow}
            />
          } />
          <Route path="/camera" element={
            <CameraScreen onCapture={handleCapture} onBack={handleBack} />
          } />
          <Route path="/loading" element={
            capturedPhoto ? <LoadingScreen capturedPhoto={capturedPhoto} /> : null
          } />
          <Route path="/result" element={
            capturedPhoto ? (
              <ResultScreen
                capturedPhoto={capturedPhoto}
                generatedName={generatedName}
                onTryAgain={handleTryAgain}
                onShare={handleShare}
              />
            ) : null
          } />
        </Routes>

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
