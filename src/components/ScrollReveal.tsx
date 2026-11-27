import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll-in reveals for every page section.
 *
 * Before first paint (layout effect) each section is tagged
 * `reveal-section`, arming the CSS pre-state in index.css — no flash of
 * visible-then-hidden content. The first reveal pass runs just after
 * the first paint (so above-fold sections play their entrance instead
 * of snapping in), then again on every scroll and resize: once a
 * section's top crosses 92% of the viewport it gets `is-inview` —
 * one-shot, it stays revealed.
 *
 * Deliberately no IntersectionObserver: rect checks driven by scroll
 * events fire anywhere, without depending on observer callbacks (which
 * run before style recalc and can stall when the window isn't
 * rendering). Sections with their own choreography (.anim-slide) and
 * the hero are excluded. Re-queries on route change.
 */
export function ScrollReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        'section.section:not(.anim-slide), section.page-header:not(.anim-slide)'
      )
    );
    if (!targets.length) return;

    targets.forEach((el) => el.classList.add('reveal-section'));

    const reveal = () => {
      const limit = window.innerHeight * 0.92;
      for (const el of targets) {
        if (!el.classList.contains('is-inview') && el.getBoundingClientRect().top < limit) {
          el.classList.add('is-inview');
        }
      }
    };

    // First pass after the first paint: the pre-state has rendered, so
    // the transition plays instead of the content snapping in.
    const timer = window.setTimeout(reveal, 80);
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
    };
  }, [pathname]);

  return null;
}
