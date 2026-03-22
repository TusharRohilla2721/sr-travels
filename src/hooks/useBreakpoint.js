import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth > 768 && window.innerWidth <= 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth > 1024 : true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoints((prev) => {
        const newIsMobile = width <= 768;
        const newIsTablet = width > 768 && width <= 1024;
        const newIsDesktop = width > 1024;
        if (
          prev.isMobile === newIsMobile &&
          prev.isTablet === newIsTablet &&
          prev.isDesktop === newIsDesktop
        ) {
          return prev;
        }

        return {
          isMobile: newIsMobile,
          isTablet: newIsTablet,
          isDesktop: newIsDesktop,
        };
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoints;
}