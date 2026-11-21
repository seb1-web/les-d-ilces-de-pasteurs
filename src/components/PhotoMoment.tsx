'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';

type MomentInstance = { destroy?: () => void };
type MomentElement = HTMLElement & {
  __moment?: MomentInstance;
  __momentP?: Promise<MomentInstance | null>;
};
type MomentLoader = { mount: (element: HTMLElement) => Promise<MomentInstance | null> };
type MomentWindow = Window & { __momentsManual?: boolean };

/** A real photograph stays visible while the optional Taste film effect loads. */
export default function PhotoMoment({ children, ...props }: ComponentPropsWithoutRef<'figure'>) {
  const figure = useRef<HTMLElement>(null);
  // Serialize development StrictMode's mount → cleanup → mount, including pending imports.
  const pending = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    const root = figure.current as MomentElement | null;
    if (!root) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let instance: MomentInstance | null = null;

    const reportReady = () => {
      document.documentElement.dataset.momentsReady = String(
        document.querySelectorAll('[data-moment-mounted], [data-moment-still], [data-moment-failed]').length,
      );
    };
    const destroy = () => {
      try { instance?.destroy?.(); } finally {
        instance = null;
        delete root.__moment;
        delete root.__momentP;
        delete root.dataset.momentMounted;
      }
    };
    const showStill = (reason: 'reduced' | 'unsupported' | 'unavailable') => {
      root.classList.remove('is-armed', 'is-live', 'is-developing');
      root.classList.add('is-done', 'mo-safe');
      root.dataset.momentStill = reason;
      reportReady();
    };
    const onPreferenceChange = () => {
      if (preference.matches) {
        destroy();
        showStill('reduced');
      }
    };
    preference.addEventListener('change', onPreferenceChange);

    pending.current = pending.current.catch(() => {}).then(async () => {
      if (cancelled) return;
      if (preference.matches) { showStill('reduced'); return; }
      if (!('IntersectionObserver' in window) || !('animate' in Element.prototype)) {
        showStill('unsupported');
        return;
      }

      // The upstream loader also supports automatic document mounting. React owns this figure.
      (window as MomentWindow).__momentsManual = true;
      try {
        const moduleUrl = '/design/moments/moments.js';
        const loader = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ moduleUrl) as MomentLoader;
        if (cancelled) return;
        if (preference.matches) { showStill('reduced'); return; }

        root.classList.remove('is-done', 'mo-safe');
        delete root.dataset.momentStill;
        delete root.dataset.momentFailed;
        instance = await loader.mount(root);

        if (cancelled) { destroy(); return; }
        if (preference.matches) { destroy(); showStill('reduced'); return; }
        reportReady();
      } catch {
        destroy();
        if (!cancelled) {
          root.dataset.momentFailed = 'unavailable';
          showStill('unavailable');
        }
      }
    });

    return () => {
      cancelled = true;
      preference.removeEventListener('change', onPreferenceChange);
      destroy();
    };
  }, []);

  return (
    <figure
      {...props}
      ref={figure}
      data-moment="picture-develops"
      data-moment-opts='{"look":"film","duration":1600}'
    >
      {children}
    </figure>
  );
}
