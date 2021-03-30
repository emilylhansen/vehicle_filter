import React from "react";

export const useResize = (cb: () => void) =>
  React.useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId: NodeJS.Timeout | null = null;

    const resizeListener = () => {
      if (!!timeoutId) {
        // prevent execution of previous setTimeout
        clearTimeout(timeoutId);
      }
      // change width from the state object after 1 sec
      timeoutId = setTimeout(cb, 1000);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  });
