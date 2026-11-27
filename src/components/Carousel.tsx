import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  interval?: number;
}

/**
 * Entrance choreography for the anim-slide scroll reveal — mirrors the
 * original per-card vars (alternating slide-in direction, staggered delay
 * through --i) so each card keeps its own direction and timing inside its
 * slide wrapper. Clones inherit their source card's vars.
 */
const ENTRANCE = [
  { i: 0, sx: '-46px', sr: '-1.5deg' },
  { i: 1, sx: '0px', sr: '0deg' },
  { i: 2, sx: '46px', sr: '1.5deg' },
];

function entranceStyle(realIndex: number): CSSProperties {
  const v = ENTRANCE[realIndex % ENTRANCE.length];
  return { '--ci': `${v.i}`, '--csx': v.sx, '--csr': v.sr } as CSSProperties;
}

/**
 * Auto-playing card carousel.
 *
 * The track holds a clone of the last slide at the front and a clone of
 * the first slide at the back, so wrapping slides seamlessly in either
 * direction. When a wrap lands on a clone, the track snaps back to the
 * identical real slide with transitions off — identical pixels, an
 * invisible jump.
 *
 * Autoplay is JS-driven (like the hero's verb cycle and the stats
 * count-up), so it keeps cycling even under prefers-reduced-motion; only
 * the glide itself is a CSS transition, which the global reduce rule
 * turns into an instant snap.
 */
export function Carousel({ children, interval = 4500 }: CarouselProps) {
  const slides = Children.toArray(children);
  const n = slides.length;

  // Slot index: 0 = clone of last, 1..n = real slides, n+1 = clone of first
  const [slot, setSlot] = useState(1);
  // Gliding starts OFF: the first measure changes the transform (0 → -step)
  // and must not slide in from the wrong card. The re-enable effect below
  // turns transitions on right after the first paint.
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Measure the per-slide offset before paint so the first frame lands correctly
  useLayoutEffect(() => {
    const measure = () => {
      const el = viewportRef.current?.querySelector<HTMLElement>('[data-slide]');
      if (el) setStep(el.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const next = () => setSlot((s) => (s >= n + 1 ? s : s + 1));
  const prev = () => setSlot((s) => (s <= 0 ? s : s - 1));

  // Autoplay — pauses on hover/focus so readers aren't yanked mid-card
  useEffect(() => {
    if (paused || n < 2) return;
    const id = window.setInterval(() => setSlot((s) => (s >= n + 1 ? s : s + 1)), interval);
    return () => window.clearInterval(id);
  }, [paused, n, interval]);

  // After sliding onto a clone, snap to the identical real slide (no transition)
  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (slot === n + 1) {
      setAnimate(false);
      setSlot(1);
    } else if (slot === 0) {
      setAnimate(false);
      setSlot(n);
    }
  };

  // Re-enable gliding once the invisible snap (or the initial measure)
  // has been painted — a timeout instead of rAF because a paint is
  // guaranteed to happen in between.
  useEffect(() => {
    if (animate) return;
    const t = window.setTimeout(() => setAnimate(true), 60);
    return () => window.clearTimeout(t);
  }, [animate]);

  // Safety net: if transitionend never arrives (zero-duration transitions,
  // interrupted glides, background tabs), snap off the clone anyway so
  // autoplay and the arrows can never wedge on a duplicated slide.
  useEffect(() => {
    if (slot !== n + 1 && slot !== 0) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setSlot(slot === n + 1 ? 1 : n);
    }, 700);
    return () => window.clearTimeout(t);
  }, [slot, n]);

  if (n < 2) return <div className="carousel">{children}</div>;

  const real = slot === 0 ? n - 1 : slot > n ? 0 : slot - 1;

  return (
    <div
      className="carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="carousel-viewport" ref={viewportRef}>
        <div
          className="carousel-track"
          style={{
            transform: `translateX(${-slot * step}px)`,
            transition: animate ? 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="carousel-slide" data-slide key="clone-last" style={entranceStyle(n - 1)}>
            {slides[n - 1]}
          </div>
          {slides.map((slide, i) => (
            <div className="carousel-slide" data-slide key={`slide-${i}`} style={entranceStyle(i)}>
              {slide}
            </div>
          ))}
          <div className="carousel-slide" data-slide key="clone-first" style={entranceStyle(0)}>
            {slides[0]}
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <span className="carousel-counter" aria-live="polite">
          {String(real + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <div className="carousel-dots" role="group" aria-label="Choose slide">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot${i === real ? ' is-active' : ''}`}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === real}
              onClick={() => setSlot(i + 1)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" className="carousel-arrow" aria-label="Previous slide" onClick={prev}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="carousel-arrow" aria-label="Next slide" onClick={next}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
