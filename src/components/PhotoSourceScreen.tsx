interface PhotoSourceScreenProps {
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
  onBack: () => void;
}

export function PhotoSourceScreen({
  onTakePhoto,
  onChooseFromGallery,
  onBack,
}: PhotoSourceScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 h-14 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm space-y-4">
          {/* Take Photo Button */}
          <button
            onClick={onTakePhoto}
            className="w-full py-4 px-6 bg-black text-white rounded-2xl font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-between group"
          >
            <span>촬영하기</span>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </button>

          {/* Choose from Gallery Button */}
          <button
            onClick={onChooseFromGallery}
            className="w-full py-4 px-6 bg-gray-100 text-gray-900 rounded-2xl font-medium text-lg hover:bg-gray-200 transition-colors flex items-center justify-between group"
          >
            <span>앨범에서 선택</span>
            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
