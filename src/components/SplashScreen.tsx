'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Controllo dello scroll: scompare non appena si scorre
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 20) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-overlay"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -40,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsVisible(false)}
          /*
           * hidden md:flex: su smartphone e schermi piccoli lo splash screen è disattivato
           * per non bloccare la visualizzazione dei contenuti o generare overlay fissi.
           * Su desktop scompare scorrendo o cliccando.
           */
          className="hidden md:flex fixed inset-0 z-50 flex-col items-center justify-center bg-[#0c0c0e] text-editorial-text select-none cursor-pointer px-6"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Cerchio con la foto */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 mb-8"
          >
            <Image
              src="/001.jpg"
              alt="Nicla Cristiano"
              fill
              priority
              sizes="(max-width: 768px) 210px, 240px"
              className="object-cover"
            />
          </motion.div>

          {/* Didascalia */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl tracking-wide text-neutral-100 font-light">
              Nicla Cristiano
            </p>
            <p className="font-sans text-xs sm:text-sm tracking-widest text-neutral-400 mt-2 uppercase font-medium">
              @niclacristiano_foto_
            </p>
          </motion.div>

          {/* Indicatore discreto di scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-neutral-400/80"
          >
            <span className="text-[10px] tracking-widest uppercase">Scorri o clicca per esplorare</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-neutral-400 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
