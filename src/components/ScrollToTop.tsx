import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't reset scroll position on navigation, so clicking
 * a nav link while at the bottom of a page used to land you at the
 * bottom of the next one. Scrolls to the top on every route change —
 * skipping the first render so a hard refresh keeps the browser's
 * native scroll restoration.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
