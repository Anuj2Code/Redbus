import React from 'react';

const StoryLoader = () => {
  return (
    <div className="flex flex-col gap-6 p-4 bg-black w-full overflow-x-hidden">
      {[...Array(6)].map((_, index) => (
        <div
          key={`loader-section-${index}`}
          className="p-2 md:p-10 flex flex-col gap-4 w-full md:w-[90vw]"
        >
          {/* Top Section with 3 animated placeholders */}
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={`top-placeholder-${index}-${i}`}
                className="h-32 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Bottom Section with 2 animated placeholders */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={`bottom-placeholder-${index}-${i}`}
                className="h-32 md:h-48 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryLoader;
