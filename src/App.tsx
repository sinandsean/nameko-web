import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
    isNavigatingRef.current = true;
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

  const handleCapture = (photoData: string) => {
    setCapturedPhoto(photoData);
    isNavigatingRef.current = true;
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
      isNavigatingRef.current = true;
      navigate("/result", { replace: true });
    }, 3000);
  };

  const handleTryAgain = () => {
    setCapturedPhoto(null);
    isNavigatingRef.current = true;
    navigate("/", { state: { fromForward: false } });
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleBackFromResult = () => {
    isNavigatingRef.current = true;
    navigate("/permission", { state: { fromForward: false } });
  };

  // Track the maximum index reached to prevent browser forward navigation
  const maxReachedIndexRef = useRef(0);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const pathOrder = ["/", "/permission", "/loading", "/result"];
    const currentIndex = pathOrder.indexOf(location.pathname);

    if (currentIndex === -1) return;

    // Skip blocking if this is a programmatic navigation (from our app)
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      maxReachedIndexRef.current = Math.max(
        maxReachedIndexRef.current,
        currentIndex
      );
      return;
    }

    // Block only browser forward navigation (trying to go beyond max reached)
    if (currentIndex > maxReachedIndexRef.current) {
      // This is browser forward button - block it
      navigate("/", { replace: true });
    } else {
      // This is browser back button - allow it
      maxReachedIndexRef.current = currentIndex;
    }
  }, [location.pathname, navigate]);

  // Prevent forward navigation completely by manipulating history
  useEffect(() => {
    // Push a dummy state to prevent forward navigation
    const preventForward = () => {
      window.history.pushState(null, '', window.location.pathname);
    };

    // Listen to popstate (browser back/forward buttons)
    const handlePopState = () => {
      // Immediately push current state back to prevent forward navigation
      preventForward();
    };

    window.addEventListener('popstate', handlePopState);
    preventForward();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Mobile container */}
      <div className="max-w-md mx-auto min-h-screen bg-white relative">
        <Routes>
          <Route path="/" element={<WelcomeScreen onStart={handleStart} />} />
          <Route
            path="/permission"
            element={<CameraPermissionScreen onAllow={handleAllow} />}
          />
          <Route
            path="/loading"
            element={
              capturedPhoto ? (
                <LoadingScreen capturedPhoto={capturedPhoto} />
              ) : null
            }
          />
          <Route
            path="/result"
            element={
              capturedPhoto ? (
                <ResultScreen
                  capturedPhoto={capturedPhoto}
                  generatedName={generatedName}
                  onTryAgain={handleTryAgain}
                  onShare={handleShare}
                  onBack={handleBackFromResult}
                />
              ) : null
            }
          />
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
