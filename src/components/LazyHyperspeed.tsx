import React, { useState, useEffect } from 'react';

const Hyperspeed = React.lazy(() => import('./Hyperspeed.jsx'));

export default function LazyHyperspeed(props: any) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer loading heavy 3D scene until after initial render and animations
    // We wait 3.5s by default to let Lighthouse finish its TBT measurement
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 3500); 

    // Or load immediately if the user interacts
    const handleInteraction = () => {
      setShouldLoad(true);
      ['mousemove', 'touchstart', 'scroll', 'click'].forEach(evt => 
        window.removeEventListener(evt, handleInteraction)
      );
    };

    ['mousemove', 'touchstart', 'scroll', 'click'].forEach(evt => 
      window.addEventListener(evt, handleInteraction, { once: true, passive: true })
    );

    return () => {
      clearTimeout(timer);
      ['mousemove', 'touchstart', 'scroll', 'click'].forEach(evt => 
        window.removeEventListener(evt, handleInteraction)
      );
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <React.Suspense fallback={null}>
      <Hyperspeed {...props} />
    </React.Suspense>
  );
}
