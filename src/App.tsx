import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CameraPermissionScreen } from "./components/CameraPermissionScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { ShareSheet } from "./components/ShareSheet";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { getRandomNameByGrade } from "./utils/prob";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleStart = () => {
    navigate("/permission");
  };

  const handleAllow = (selectedGender: "F" | "M") => {
    setGender(selectedGender);

    // Create file input element for photo selection
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const photoData = event.target?.result as string;
          handleCapture(photoData);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
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

      // Replace loading screen in history so back button goes to permission screen
      navigate("/result", { replace: true });
    }, 3000);
  };

  const handleTryAgain = () => {
    setCapturedPhoto(null);
    navigate("/");
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleBackFromResult = () => {
    navigate(-1);
  };

  // Prevent forward navigation - only allow backward navigation
  const historyIndexRef = useRef(0);

  useEffect(() => {
    // Track history position
    const currentPath = location.pathname;
    const pathOrder = ['/', '/permission', '/loading', '/result'];
    const currentIndex = pathOrder.indexOf(currentPath);

    if (currentIndex !== -1 && currentIndex > historyIndexRef.current) {
      historyIndexRef.current = currentIndex;
    }
  }, [location.pathname]);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = location.pathname;
      const pathOrder = ['/', '/permission', '/loading', '/result'];
      const currentIndex = pathOrder.indexOf(currentPath);

      // If trying to go forward (index increases), prevent it
      if (currentIndex > historyIndexRef.current) {
        window.history.back();
      } else {
        historyIndexRef.current = currentIndex;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.pathname]);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Mobile container */}
      <div className="max-w-md mx-auto min-h-screen bg-white relative">
        <Routes>
          <Route path="/" element={<WelcomeScreen onStart={handleStart} />} />
          <Route path="/permission" element={
            <CameraPermissionScreen
              onAllow={handleAllow}
              onNotNow={handleNotNow}
            />
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
                onBack={handleBackFromResult}
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
