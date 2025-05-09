import { useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

const useIsCollapsed = () => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('collapsed-sidebar', false);

  useEffect(() => {
    const handleResize = () => {
      // Update isCollapsed based on window.innerWidth
      setIsCollapsed(window.innerWidth < 768 ? false : isCollapsed);
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isCollapsed, setIsCollapsed]);

  return [isCollapsed, setIsCollapsed] as const;
};

export default useIsCollapsed;
