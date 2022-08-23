import { useEffect } from 'hooks/hooks';

export const useScript = (url: string, onload: () => HTMLElement | null | undefined): void => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;

    script.onload = onload;

    document.head.appendChild(script);

    (): HTMLScriptElement => document.head.removeChild(script);
  }, [url, onload]);
};
