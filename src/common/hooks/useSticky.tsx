import { useEffect, useState } from 'react';

export function useSticky<T extends HTMLElement>() {
  const [sticky, setSticky] = useState(true);

  useEffect(() => {
    function observe() {
      const documentHeight = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      const stickyActive = currentScroll < documentHeight;

      if (stickyActive && !sticky) setSticky(true);
      else if (!stickyActive && sticky) setSticky(false);
    }

    // Bind events
    document.addEventListener('scroll', observe);

    return () => {
      document.removeEventListener('scroll', observe);
    };
  }, [sticky]);

  return { sticky };
}
