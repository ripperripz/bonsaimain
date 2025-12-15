
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Types ---
declare global {
  interface Window {
    Lenis: any;
  }
}

// --- Custom Hooks ---

export const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// --- Lenis Smooth Scroll Setup ---
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.5, // Slower duration for heavier feel
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8, // Slightly heavier scroll
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      
      return () => {
        lenis.destroy();
      }
    }
  }, []);

  return <>{children}</>;
};

// --- Logo Component ---
export const BonsaiLogo: React.FC<{ className?: string; color?: string }> = ({ className = "w-12 h-12", color = "currentColor" }) => {
  const { language } = useLanguage();
  const isLightColor = color === '#F7F5F2' || color === '#ffffff' || color === 'white';
  
  // Logic for Logo Swapping
  const logoUrl = language === 'ar' 
    ? "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcfhi09hXCaNauAvhlrsojiwyE_qMHbomDqltjmHupnkXc7sJf4e-0_sD3O16eeaAvuLIyb6No3bR_vBqKQHkf5tgt7mZTUAeMyYwmm7heEhIXunn2087APIgSwEm3oDw=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874640" 
    : "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdN0jtNsWyRF76KKgIArf-LCoctS7zsV1rdu5NNwJWR3QcvIMlq_NK73Q2QGwK_z93sLZTEnKgSuK5qV82cS0u-hSQ-wmpKwJT_HQFcLAIF1h2qprVIkdTjYIlAFz5rUjs=s2048?key=mtp0HJ7MvOLW-1kzK49C-A";

  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={logoUrl} 
        alt="Bonsai Logo"
        className="w-full h-full object-contain"
        style={{ 
          filter: isLightColor ? 'invert(1) brightness(2)' : 'none',
        }}
      />
    </div>
  );
};

// --- Animations ---

export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; y?: number; duration?: number }> = ({ children, delay = 0, className = "", y = 40, duration = 1.6 }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  
  return (
    <div
      ref={ref}
      className={`transition-all ease-luxury transform will-change-[transform,opacity,filter] ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 blur-sm'} ${className}`}
      style={{ 
        transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
};

export const MaskText: React.FC<{ children: string | React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  const { direction } = useLanguage();
  
  return (
    <div ref={ref} className={`overflow-hidden relative py-4 -my-4 px-2 -mx-2 ${className}`}>
      <div 
        className={`transition-transform duration-[1.5s] ease-luxury ${direction === 'rtl' ? 'origin-top-right' : 'origin-top-left'} will-change-transform`}
        style={{ 
          transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
          transitionDelay: `${delay}ms`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 0.5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="inline-block magnetic transition-transform duration-300 ease-out will-change-transform"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
};

// --- Layout & Components ---

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string; fullWidth?: boolean }> = ({ children, className = "", id, fullWidth = false }) => {
  return (
    <section id={id} className={`${fullWidth ? 'px-0' : 'px-6 md:px-12 lg:px-24'} py-20 md:py-32 lg:py-48 ${className}`}>
      {children}
    </section>
  );
};

export const JapaneseTitle: React.FC<{ main: string; sub: string; dark?: boolean; center?: boolean; vertical?: boolean }> = ({ main, sub, dark = false, center = false, vertical = false }) => {
  const { direction, language } = useLanguage();
  
  if (vertical) {
    return (
      <div className="flex flex-row-reverse gap-8 items-start h-full">
         <div className={`writing-vertical-lr text-xs tracking-[0.4em] uppercase font-bold ${dark ? 'text-bonsai-stone' : 'text-bonsai-copper'} flex items-center gap-4`}>
           <span className={`w-[1px] h-12 ${dark ? 'bg-white/40' : 'bg-bonsai-dark/40'}`}></span>
           {sub}
         </div>
         <h2 className={`writing-vertical-lr ${language === 'ar' ? 'font-arabic' : 'font-sans font-light'} text-5xl md:text-7xl leading-tight ${dark ? 'text-white' : 'text-bonsai-dark'}`}>
           {main}
         </h2>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-4 mb-16 md:mb-20 ${center ? 'items-center text-center' : 'items-start'}`}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className={`h-[1px] w-8 md:w-16 ${dark ? 'bg-white/40' : 'bg-bonsai-dark/40'}`}></span>
          <span className={`text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold ${dark ? 'text-bonsai-stone' : 'text-bonsai-copper'}`}>
            {sub}
          </span>
        </div>
      </Reveal>
      <div className={`${center ? 'mx-auto' : ''}`}>
        <MaskText className={`${language === 'ar' ? 'font-arabic font-normal' : 'font-sans font-light'} text-4xl md:text-6xl lg:text-8xl leading-[1.1] md:leading-[0.9] ${dark ? 'text-white' : 'text-bonsai-dark'}`}>
          {main}
        </MaskText>
      </div>
    </div>
  );
};

export const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'outline' | 'white' | 'ghost'; onClick?: () => void; className?: string }> = ({ children, variant = 'primary', onClick, className = "" }) => {
  const { language } = useLanguage();
  const baseStyle = `relative overflow-hidden px-8 py-4 uppercase tracking-[0.15em] text-[10px] md:text-xs font-bold transition-all duration-500 ease-out flex items-center justify-center gap-4 group rounded-full border ${language === 'ar' ? 'font-arabic font-bold' : ''}`;
  
  const variants = {
    primary: "bg-bonsai-dark text-white border-bonsai-dark hover:border-bonsai-copper",
    outline: "border-bonsai-dark text-bonsai-dark hover:text-white border-opacity-20",
    white: "bg-white text-bonsai-dark border-white hover:border-bonsai-stone",
    ghost: "border-transparent text-bonsai-dark hover:text-bonsai-copper"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {variant !== 'ghost' && (
         <span className={`absolute inset-0 w-full h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-luxury ${variant === 'primary' ? 'bg-bonsai-copper' : (variant === 'white' ? 'bg-bonsai-stone' : 'bg-bonsai-dark')}`}></span>
      )}
      <span className={`relative z-10 flex items-center gap-2 mix-blend-difference ${variant === 'primary' ? 'text-white' : ''}`}>
        {children}
      </span>
    </button>
  );
};

export const ClipReveal: React.FC<{ src: string; alt: string; className?: string; direction?: 'up' | 'down' | 'left' | 'right'; imgClassName?: string; onClick?: () => void }> = ({ src, alt, className = "", direction = 'up', imgClassName = "", onClick }) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const { direction: layoutDirection } = useLanguage();
  
  const getClipPath = () => {
     if (!isVisible) {
         if (direction === 'up') return 'inset(100% 0 0 0)';
         if (direction === 'down') return 'inset(0 0 100% 0)';
         if (direction === 'left') return layoutDirection === 'rtl' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
         return layoutDirection === 'rtl' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
     }
     return 'inset(0 0 0 0)';
  };

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`} onClick={onClick}>
      <div 
        className="w-full h-full transition-all duration-[1.8s] ease-luxury will-change-[clip-path,transform]"
        style={{ clipPath: getClipPath() }}
      >
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-transform duration-[2.2s] ease-slow ${isVisible ? 'scale-100' : 'scale-110'} ${imgClassName}`}
        />
      </div>
    </div>
  );
};

export const ImageParallax: React.FC<{ src: string; alt: string; className?: string; speed?: number; imgStyle?: React.CSSProperties }> = ({ src, alt, className = "", speed = 0.2, imgStyle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const centerY = windowHeight / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const offset = (elementCenterY - centerY) * speed;
        
        imgRef.current.style.transform = `scale(1.1) translateY(${offset}px)`;
      }
    };

    const loop = () => {
        handleScroll();
        animationFrameId = requestAnimationFrame(loop);
    }
    
    loop();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover will-change-transform"
        style={{ transform: 'scale(1.1)', ...imgStyle }}
      />
    </div>
  );
};

export const ParallaxText: React.FC<{ children: React.ReactNode; speed?: number; className?: string }> = ({ children, speed = 1, className="" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let animationFrameId: number;
        const handleScroll = () => {
            if (!ref.current) return;
            const { top } = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (top < windowHeight && top > -ref.current.offsetHeight) {
                setOffset((top - windowHeight / 2) * speed * 0.1);
            }
        };
        const loop = () => {
            handleScroll();
            animationFrameId = requestAnimationFrame(loop);
        }
        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [speed]);

    return (
        <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)` }}>
            {children}
        </div>
    )
}

// --- Lightbox Component ---
export const Lightbox: React.FC<{ 
  isOpen: boolean; 
  images: string[]; 
  currentIndex: number; 
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ isOpen, images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-bonsai-dark/95 backdrop-blur-2xl flex items-center justify-center">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[101]"
      >
        <X size={40} strokeWidth={1} />
      </button>

      {/* Navigation - Prev */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-[101] hidden md:block"
      >
        <ChevronLeft size={60} strokeWidth={0.5} />
      </button>

      {/* Main Image */}
      <div className="w-full h-full p-4 md:p-12 flex items-center justify-center" onClick={onClose}>
        <img 
          src={images[currentIndex]} 
          alt={`Gallery view ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500"
          onClick={(e) => e.stopPropagation()} 
        />
      </div>

      {/* Navigation - Next */}
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-[101] hidden md:block"
      >
        <ChevronRight size={60} strokeWidth={0.5} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xs tracking-[0.3em]">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// --- Full Screen Video Modal ---
export const VideoModal: React.FC<{ isOpen: boolean; videoId: string; onClose: () => void }> = ({ isOpen, videoId, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-700">
      
      {/* Close Button - Fixed Top Right */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-all duration-300 z-[110] p-2 hover:bg-white/10 rounded-full group"
      >
        <div className="flex flex-col items-center gap-1">
            <X size={32} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-[10px] uppercase tracking-widest font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full mt-2 whitespace-nowrap">Close</span>
        </div>
      </button>

      {/* Video Container */}
      <div className="w-full h-full p-4 md:p-12 flex items-center justify-center" onClick={onClose}>
         <div className="w-full max-w-7xl aspect-video bg-black shadow-2xl relative overflow-hidden rounded-sm ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
             <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1`} 
                title="Video Player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
             ></iframe>
         </div>
      </div>
    </div>
  );
};
