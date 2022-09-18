import { useState, useEffect } from 'react';

type windowDimensionsType = {
  width: number;
  height: number;
};

export const getWindowDimensions = (): windowDimensionsType => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = (): windowDimensionsType => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
