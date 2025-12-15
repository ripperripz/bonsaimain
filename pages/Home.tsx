

import React, { useState, useEffect, useRef } from 'react';
import { Section, Reveal, MaskText, JapaneseTitle, Button, ClipReveal, ParallaxText, Magnetic, ImageParallax, BonsaiLogo, Lightbox, VideoModal } from '../components/UI';
import { SEO } from '../components/SEO';
import { ArrowDown, MapPin, Play, ArrowRight, Star, ArrowUpRight, Layers, Calendar, TrendingUp, Home as HomeIcon, Key, Train } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { locations, CENTER, MAP_CONFIG } from '../data/locations';

const Home: React.FC = () => {
   const [videoPlaying, setVideoPlaying] = useState(false);
   const [activeMetroDest, setActiveMetroDest] = useState<string | null>(null);
   const { t, language } = useLanguage();

   // Gallery Lightbox State
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [lightboxIndex, setLightboxIndex] = useState(0);

   const galleryImages = [
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfYJj49i4GSvl0lhWYDdRYEd89mxFWiR3m0cCDYBQrAbvSiYLvqLIx6moVpn2e497OMRVT8OtoK5r698moFLyEiQmBZpk5vxcwJHH1VftDFFRUXeLg6qn_796r_n_IWA0E=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfsFcCRfwZOVoOgX671va9pG4YmF_NV530nqcn-1gW-mKt_MAgN3Ior0lDeCZHu6euF1uFsXVuiVrF4NUXwcKJVJxDjiiIZe8A5GIgW27PR3RKYmLdW7rWcAj9mTHo4wCU=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcCGYX-TSOCxPqg22SynpPAkYc8VtBGBuifiOK4jzituu-gXhMrUA0xRkH-bV1nLA33_T2Alo54_vO2aAg4Gil62p1xJsweN5XpQ41U2HC-pSPiho_JqPrNj0zHFbzHIlw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdQv_LoK3gijaXZe3KcHIt0cLi-_yakM9WDSdhjmmpPCrh71mT4YgZMxLCaUy9yd6QQNLOBn9juqBC0FQcz__-Q9rEEv03UXgiJscg-rNsz4MOItQgacJtL94fX_D7x0Q=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
   ];

   const openLightbox = (index: number) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
   };

   const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
   const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

   // Metro / Image Map Data (Duplicated for Home use, but could be shared)
   const metroImageMap = {
      background: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUe_CzENDqM5NjzAublYlmrhx5dj8HFTHr_m4FqlsHSxTGZpW-aWN2CbwyKQd1QzJfiTbkHYMPzV_SH9Gu-Rl45wrtAmDqcU8eXmauSN-5Hb1SorgfBoFaBhtpYrxGcaIg=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874747",
      bonsai: { x: 70, y: 19 },
      destinations: [
         {
            id: "sabic",
            name: "SABIC",
            x: 33, y: 15,
            logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdATzInD-DwIAqVOeQ14ESZLejo8GokKHYMKIgqjl4i81Aj4cO6kb8DT7qhVn02iMlH3WFG2Mi5fTiplHOpKpMoAnzSAclqQBwBHi0Du3NmLcPXyLM8HQ64CSqBh04_ol8=s2048?key=IhwjvqLC4M0vf-jnqYYekg"
         },
         {
            id: "kafd",
            name: "KAFD",
            x: 18, y: 27,
            logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUd1pFEFDDXqIArkWIBE7MA-GZOdst3fh2-jmC3gVWRDexiMyjweYr1EuPPgiEQ8QfbquwiOBpoR9w3O9A0iqvoIdqB_Pu7ZG3daXsFcoSG0NJ9nwbSmm5rY7idpZ4qHXQ=s2048?key=IhwjvqLC4M0vf-jnqYYekg"
         },
         {
            id: "stc",
            name: "STC HQ",
            x: 29, y: 38,
            logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfwbZRCmm19e5P6us6EZps4ZZlwrxhz4tQVTQLMTTkNa-xZEivvnS0jSijwC5JplvcCCE4GRLH0JpAeWy8NQUs87kO9x5jlym1wq2vEi0mSO51qN3tNDlm1OtPz4L2-Mw=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874747"
         },
         {
            id: "ksp",
            name: "King Salman Park",
            x: 39, y: 39,
            logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUeniJXWmTZm_-BHEGnisb1lh-Cv1RQCoW-kdq1F9XS0QQ8PBFwXlznH_Vupg2TozjhTBM0rzQ5Hn6FObFuHU6cgr6aoeGuqml4LfnqUZJpkN4SCOIEH3IOL_BF-yQKDvWM=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874640"
         }
      ]
   };

   const selectedDest = metroImageMap.destinations.find(d => d.id === activeMetroDest);

   // Partners Data
   const partners = [
      {
         name: t.home.team.companies.keiji,
         url: "https://www.keijidesign.com/",
         role: t.home.team.roles.architect,
         logo: "https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/aa580e71-9743-473a-8963-b920ca74aef2/Keiji.png?format=750w"
      },
      {
         name: t.home.team.companies.alramz,
         url: "https://alramzre.com/",
         role: t.home.team.roles.developer,
         logo: "https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/dc5b9bc9-da3f-4505-83e2-a8d80c090df4/Alramz.png?format=750w"
      },
      {
         name: t.home.team.companies.dinar,
         url: "https://app.dinar.sa/",
         role: t.home.team.roles.fund,
         logo: "https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/4de32b9d-5430-495d-ab87-cafe225f28e4/Dinar.png?format=750w"
      },
      {
         name: t.home.team.companies.baghlaf,
         url: "https://www.linkedin.com/company/baghlafpro",
         role: t.home.team.roles.land,
         logo: "https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/8b5b78df-91eb-4854-ac37-04d02014bb6a/Baghlaf.png?format=750w"
      },
      {
         name: t.home.team.companies.aqarmap,
         url: "https://aqarmap.sa",
         role: t.home.team.roles.broker,
         logo: "https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/3429d3c4-7bb0-41a3-a083-434f169485da/aqarmap.png?format=750w"
      },
      {
         name: t.home.team.companies.itaec,
         url: "", // No link
         role: t.home.team.roles.engineer,
         logo: "https://media.licdn.com/dms/image/v2/D4D3DAQEXp9RAGxR_WA/image-scale_191_1128/image-scale_191_1128/0/1671363764849/_____cover?e=1765695600&v=beta&t=J70UElNUmsh0os0HTdv_2up37JAtnWw_LSh8xxz_7UY"
      },
      {
         name: t.home.team.companies.notions,
         url: "", // No link
         role: t.home.team.roles.marketing,
         logo: "https://www.dropbox.com/scl/fi/cyifs55j6eiypomjrkf21/Logo.png?rlkey=wnoa703e2hc3hljr19xeam0fc&raw=1"
      },
      {
         name: t.home.team.companies.bonsai,
         url: "https://bonsai.sa",
         role: t.home.team.roles.brand,
         // Dynamic Logo based on Language
         logo: language === 'ar'
            ? "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcfhi09hXCaNauAvhlrsojiwyE_qMHbomDqltjmHupnkXc7sJf4e-0_sD3O16eeaAvuLIyb6No3bR_vBqKQHkf5tgt7mZTUAeMyYwmm7heEhIXunn2087APIgSwEm3oDw=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874640"
            : "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdN0jtNsWyRF76KKgIArf-LCoctS7zsV1rdu5NNwJWR3QcvIMlq_NK73Q2QGwK_z93sLZTEnKgSuK5qV82cS0u-hSQ-wmpKwJT_HQFcLAIF1h2qprVIkdTjYIlAFz5rUjs=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
      }
   ];

   // Helper function for logo scaling
   const getLogoScale = (name: string) => {
      if (name === "ITAEC" || name === "Aqarmap" || name === "آيتاك" || name === "أقارمب") return "scale-125";
      if (name === "Notions" || name === "Bonsai" || name === "نوشنز" || name === "بونساي" || name === "بونساي العقارية") return "scale-75";
      if (name === "Bonsai Residences") return "scale-75";
      return "scale-100";
   };

   return (
      <>
         <SEO
            title={language === 'ar' ? "بونساي | واحة السكينة - مساكن فاخرة في الرياض" : "Bonsai | Oasis of Serenity - Luxury Residences Riyadh"}
            description={language === 'ar' ? "اكتشف بونساي، مشروع سكني فاخر مستوحى من اليابان في حي النهضة بالرياض من تصميم كيجي أتشيزاوا." : "Discover Bonsai, a Japanese-inspired luxury residential project in Riyadh's Nahdah District by Keiji Ashizawa. A sanctuary of calm offering modern apartments."}
            keywords={[
               "Bonsai Saudi", "Bonsai KSA", "Bonsai Riyadh", "Bonsai Real Estate", "Bonsai Ashizawa", "Bonsai Keiji Ashizawa",
               "بونساي العقارية", "بونساي السعودية", "بونساي الرياض", "بونساي اشيزاوا", "بونساي كيجي اشيزاوا"
            ]}
            schema={{
               "@context": "https://schema.org",
               "@type": "RealEstateAgent",
               "name": "Bonsai Residences",
               "image": "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfYJj49i4GSvl0lhWYDdRYEd89mxFWiR3m0cCDYBQrAbvSiYLvqLIx6moVpn2e497OMRVT8OtoK5r698moFLyEiQmBZpk5vxcwJHH1VftDFFRUXeLg6qn_796r_n_IWA0E=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
               "url": "https://bonsai.sa",
               "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Khurais Road",
                  "addressLocality": "Nahdah District",
                  "addressRegion": "Riyadh",
                  "addressCountry": "SA"
               }
            }}
         />

         {/* Lightbox Component */}
         <Lightbox
            isOpen={lightboxOpen}
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={nextImage}
            onPrev={prevImage}
         />

         {/* Video Modal Component */}
         <VideoModal
            isOpen={videoPlaying}
            videoId="ji2qfRRIdlg"
            onClose={() => setVideoPlaying(false)}
         />

         {/* --- 1. HERO SECTION --- */}
         <div className="relative h-screen w-full bg-[#FAFAF9] overflow-hidden">
            <div className="absolute inset-0 z-0">
               {/* Parallax Background Image - Updated to new hero image */}
               <ImageParallax
                  src="https://dl.dropboxusercontent.com/scl/fi/rt3svrnk7clwvdm4jmmu0/Enscape_2025-12-10-19-15-53.png?rlkey=ml56sizdivycqwctq5iftso15"
                  className="w-full h-full object-cover"
                  alt="Bonsai Hero"
                  speed={0.5}
               />
               {/* No Gray Overlay - Full Brightness */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>
            </div>

            <div className="relative z-10 h-full w-full px-6 md:px-12 lg:px-24 flex flex-col justify-between py-12 md:py-24 text-[#F7F5F2]">

               {/* Top Info Badge - Visible on Mobile (removed hidden md:flex) and increased contrast */}
               {/* Fixed: Reduced top padding to prevent overlap with title, added mb-8 and z-20 */}
               <div className="flex justify-between items-start pt-24 md:pt-40 mb-8 relative z-20">
                  <Reveal delay={200}>
                     <div className={`flex flex-col gap-1 ${language === 'ar' ? 'border-r-2 pr-6 pl-8 text-right' : 'border-l-2 pl-6 pr-8 text-left'} border-[#C6A87C] backdrop-blur-md bg-black/20 py-4 rounded-sm shadow-sm transform transition-all hover:translate-x-2`}>
                        <span className={`text-[10px] font-sans uppercase tracking-[0.2em] text-white font-semibold shadow-black drop-shadow-md ${language === 'ar' ? 'font-arabic' : ''}`}>{t.hero.location}</span>
                        <span className={`text-xl ${language === 'ar' ? 'font-arabic font-normal' : 'font-sans font-light'} text-white shadow-black drop-shadow-md`}>{t.hero.district}</span>
                     </div>
                  </Reveal>
               </div>

               {/* Main Hero Titles with Parallax */}
               <div className="relative w-full flex flex-col justify-center pointer-events-none mt-12 md:mt-0">
                  <div className="relative">
                     {/* Title 1: OASIS - Removed overflow-hidden from ParallaxText and adjusted classes to prevent clipping */}
                     <ParallaxText speed={-0.2}>
                        <h1 className={`${language === 'ar' ? 'font-arabic font-normal' : 'font-sans font-extralight'} text-[12vw] md:text-[10vw] leading-[1.1] md:leading-[0.9] tracking-tighter text-white transform rtl:translate-x-2 md:-translate-x-2 drop-shadow-lg pb-4`}>
                           <MaskText delay={400}>{t.hero.oasis}</MaskText>
                        </h1>
                     </ParallaxText>

                     <div className={`flex items-start justify-between md:justify-start gap-4 md:gap-12 ${language === 'ar' ? 'mr-2 md:mr-[10vw]' : 'ml-2 md:ml-[10vw]'} -mt-2 md:-mt-4`}>
                        {/* Title 2: SERENITY - Removed overflow-hidden from ParallaxText */}
                        <ParallaxText speed={-0.1}>
                           <h1 className={`${language === 'ar' ? 'font-arabic font-normal' : 'font-sans font-extralight'} text-[12vw] md:text-[10vw] leading-[1.1] md:leading-[0.9] tracking-tighter text-white drop-shadow-xl pb-4`}>
                              <MaskText delay={600}>{t.hero.serenity}</MaskText>
                           </h1>
                        </ParallaxText>

                        {/* Vertical Japanese Text */}
                        <Reveal delay={800} className="hidden md:block pt-6">
                           <div className={`writing-vertical-rl text-white text-2xl font-jp font-light tracking-[0.35em] h-auto ${language === 'ar' ? 'border-l-2 pl-4' : 'border-r-2 pr-4'} border-white/40 flex items-center gap-4 opacity-90 drop-shadow-md`}>
                              <span>盆栽</span>
                           </div>
                        </Reveal>
                     </div>
                  </div>
               </div>

               {/* Scroll Indicator */}
               <div className={`flex justify-between items-end pb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Reveal delay={1000}>
                     <div className="flex items-center gap-4 text-white/80">
                        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
                           <div className="w-1 h-2 bg-white rounded-full animate-float mt-1"></div>
                        </div>
                        <span className={`text-[10px] uppercase tracking-[0.25em] font-semibold shadow-black drop-shadow-sm ${language === 'ar' ? 'font-arabic' : ''}`}>{t.hero.scroll}</span>
                     </div>
                  </Reveal>

                  <Reveal delay={1100} className="hidden lg:block">
                     <p className={`max-w-xs ${language === 'ar' ? 'text-left font-arabic' : 'text-right'} text-sm font-light leading-relaxed text-white/90 drop-shadow-md`}>
                        {t.hero.conceptDesc}
                     </p>
                  </Reveal>
               </div>
            </div>
         </div>

         {/* --- NEW: BRANDED RESIDENCES LOGO --- */}
         <Section className="bg-white flex items-center justify-center !py-24 md:!py-32 border-b border-[#0F0E0D]/5">
            <Reveal>
               <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Keiji Photo */}
                  <div className="w-64 h-80 md:w-80 md:h-96 relative overflow-hidden bg-[#F7F5F2]">
                     <img
                        src="https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdhOrrxnjLX2tn3Q8xHDYFN8MF-OO6CdLlpXJmdBzppjOgVJX-SRPH-XwEfknHPZkUhsoPMGCY9W9dpdmuo_b274uw6aY-RgPmzMmjxdN_zLSYh6R7fx51rOd3D_7r3kR8=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
                        alt="Keiji Ashizawa"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                     />
                  </div>

                  {/* Logo & CTA */}
                  <div className="flex flex-col items-center gap-8">
                     <div className="w-64 md:w-80 opacity-90 hover:opacity-100 transition-opacity duration-700">
                        <img
                           src={language === 'ar'
                              ? "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUeSeg6uu4UvBr5lV9PjkKn2X72vda64eZKEjWxf5qV0s-UCW_39vrvxvUMJLyY58LZECXryI2REch_ok6ak9cK055LCsb3acf9LDQj08xgDCEiCKoSKy-8D4_Ybpw4GZzo=s2048?key=IhwjvqLC4M0vf-jnqYYekg"
                              : "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUc8d6vEijBB-LXEQDxZ5QYKG48hgM-LME6W24XUV7O19Or3LEdcV0D6Vp6qI5o611BtpQikpr_ker0errF8OZ-fU_HtXHE14s8WS9M74Hk6ziFtXe961CgD8LzVnGcayuE=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"}
                           alt="Bonsai Branded Residences"
                           className="w-full h-full object-contain"
                        />
                     </div>
                     <Link to="/serenity">
                        <Button variant="outline">
                           {language === 'ar' ? "تعرف على المصمم" : "Learn about the Designer"}
                        </Button>
                     </Link>
                  </div>
               </div>
            </Reveal>
         </Section>

         {/* --- 2. PHILOSOPHY / INTRO (P3) --- */}
         <Section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
               <div>
                  <Reveal>
                     <JapaneseTitle main={t.home.philosophy.title} sub={t.home.philosophy.sub} />
                  </Reveal>
                  <Reveal delay={200}>
                     <p className={`text-xl md:text-2xl font-sans font-light text-[#0F0E0D] leading-relaxed mb-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {t.home.philosophy.quote}
                     </p>
                     <p className={`text-[#0F0E0D]/60 text-lg font-light leading-relaxed mb-12 ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {t.home.philosophy.desc}
                     </p>
                     <Link to="/serenity">
                        <Button variant="outline">{t.home.philosophy.button}</Button>
                     </Link>
                  </Reveal>
               </div>

               <div className="relative h-[60vh] md:h-[70vh] w-full">
                  <ClipReveal
                     src="https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/35fda616-b056-490e-9343-a21989e818ab/The-Philosophy-Behind-Bonsai.jpg?format=2500w"
                     alt="Bonsai Philosophy"
                     className="w-full h-full object-cover"
                     direction={language === 'ar' ? 'left' : 'right'}
                  />
                  <div className={`absolute -bottom-12 -z-10 ${language === 'ar' ? '-right-12' : '-left-12'}`}>
                     <BonsaiLogo className="w-64 h-64 opacity-5" color="#0F0E0D" />
                  </div>
               </div>
            </div>
         </Section>

         {/* --- 3. SERENITY VIDEO TEASER --- */}
         <div className="w-full bg-[#EAE8E4] relative z-20 overflow-hidden py-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
               <Reveal className="w-full">
                  <div className="flex justify-between items-end mb-12">
                     <JapaneseTitle main={t.hero.videoTitle} sub={t.hero.film} />
                  </div>

                  <div className="relative h-[60vh] w-full overflow-hidden group cursor-pointer" onClick={() => setVideoPlaying(true)}>
                     <div className="w-full h-full relative">
                        <ClipReveal
                           src="https://img.youtube.com/vi/ji2qfRRIdlg/maxresdefault.jpg"
                           className="w-full h-full object-cover"
                           direction="up"
                           alt="Serenity Video Cover"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-white/10 transition-all duration-500"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/50 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 bg-white/20 backdrop-blur-sm z-30">
                           <Play className="fill-white text-white ml-1 w-8 h-8" />
                        </div>
                        <div className={`absolute bottom-8 text-white z-30 pointer-events-none ${language === 'ar' ? 'right-8 text-right' : 'left-8 text-left'}`}>
                           <span className={`text-[10px] uppercase tracking-widest font-bold mb-2 block ${language === 'ar' ? 'font-arabic' : ''}`}>{t.hero.watch}</span>
                           <p className={`text-lg font-light max-w-md drop-shadow-md ${language === 'ar' ? 'font-arabic' : ''}`}>{t.hero.videoDesc}</p>
                        </div>
                     </div>
                  </div>
               </Reveal>
            </div>
         </div>

         {/* --- 4. AMENITIES TEASER (Updated: Tranquility & Comfort) --- */}
         <Section className="bg-[#F7F5F2]">
            <div className="text-center max-w-4xl mx-auto mb-20">
               <Reveal>
                  <h2 className={`text-5xl md:text-7xl font-sans font-light text-[#0F0E0D] mb-6 ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>
                     {language === 'ar' ? "هدوء وراحة" : "Tranquility & Comfort"}
                  </h2>
                  <p className={`text-[#0F0E0D]/60 text-lg font-light leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                     {language === 'ar'
                        ? "من غرفة الشاي التقليدية إلى المكتبة والحدائق الغناء، صُمم كل مرفق ليعزز السلام الداخلي."
                        : "From a traditional Japanese tea room to a library and lush gardens, every amenity is designed to cultivate peace."}
                  </p>
               </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  {
                     title: language === 'ar' ? "الحدائق" : "Gardens",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUd-kH003wueW1qLNyB3hxDQ37Q5P5QyjKv2m5l3FUkmokGdzglnGYcHWtMfGsdSO6woYb_IqnfKnvpvJS1SiryuRfUQSQ4Qb8XyWKjrK17WynMyjpnt-QjuxSJbWaqyc9k=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
                  },
                  {
                     title: language === 'ar' ? "المكتبة" : "Library",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfiTTpooGceOWobMsGEy6kZWhM9kI3Hsxb3HTE9hctaxaXqleRuoc7UOPPKPTpz4KW5SJ5hcteMiBNnkKj0IKadCnucCmZCke9kTePwR-IA_VsEn6MO2IpAwT5lQsRewHw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A&cb=1764431821755"
                  },
                  {
                     title: language === 'ar' ? "غرفة الشاي" : "Tea Room",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUf3Ez39OZc0aTFl86HJriv3S-CCrdxlE_MCXyl6DNqVc7cLvJr7mIATbx-f9D0SoqgAE3GC9nFV2YPubE05aWQaEOlwntLpKGTXIKahWYuh-9EcxwRM-jl4znouUYaIxqhnPSi9=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
                  }
               ].map((item, i) => (
                  <Reveal key={i} delay={i * 100}>
                     <div className="group relative h-[50vh] overflow-hidden cursor-pointer">
                        <ImageParallax
                           src={item.img}
                           alt={item.title}
                           className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                           speed={0.1}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                        <div className={`absolute bottom-8 text-white z-10 ${language === 'ar' ? 'right-8' : 'left-8'}`}>
                           <h3 className={`text-3xl font-light ${language === 'ar' ? 'font-arabic font-normal' : 'font-sans'}`}>{item.title}</h3>
                           <div className="w-12 h-[1px] bg-white mt-4 transition-all duration-500 group-hover:w-24"></div>
                        </div>
                     </div>
                  </Reveal>
               ))}
            </div>
            <div className="flex justify-center mt-16">
               <Link to="/project"><Button variant="primary">{t.home.amenities.viewAll}</Button></Link>
            </div>
         </Section>

         {/* --- 5. LOCATION TEASER (Metro Map Visual) --- */}
         <Section className="bg-[#EAE8E4] py-0" fullWidth>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

               {/* Visual Side - Order 1 on Mobile */}
               <div className="relative w-full order-1 lg:order-2 bg-[#0F0E0D] flex items-center justify-center overflow-hidden">
                  {/* Fixed Aspect Ratio Wrapper */}
                  <div className="relative w-full max-w-full">
                     <img
                        src={metroImageMap.background}
                        alt="Riyadh Metro Map"
                        className="w-full h-auto block opacity-90"
                     />
                     {/* Dark Overlay */}
                     <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

                     {/* SVG Overlay for drawing lines */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <defs>
                           <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#C6A87C" />
                           </marker>
                        </defs>
                        {selectedDest && (
                           <path
                              d={`M${metroImageMap.bonsai.x}% ${metroImageMap.bonsai.y}% Q ${(metroImageMap.bonsai.x + selectedDest.x) / 2}% ${(metroImageMap.bonsai.y + selectedDest.y) / 2 - 10}% ${selectedDest.x}% ${selectedDest.y}%`}
                              fill="none"
                              stroke="#C6A87C"
                              strokeWidth="2"
                              strokeDasharray="10 5"
                              markerEnd="url(#arrowhead)"
                              className="animate-[dash_1s_linear_infinite]"
                           >
                              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                           </path>
                        )}
                     </svg>

                     {/* Bonsai Pin */}
                     <div
                        className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: `${metroImageMap.bonsai.y}%`, left: `${metroImageMap.bonsai.x}%` }}
                     >
                        <div className="relative w-20 h-20 flex items-center justify-center">
                           <div className="absolute inset-0 bg-[#C6A87C]/40 rounded-full animate-ping"></div>
                           <div className="w-16 h-16 bg-[#0F0E0D] border-2 border-[#C6A87C] rounded-full flex items-center justify-center shadow-2xl z-10 p-2 bg-white scale-110">
                              <img src="https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcMj0LalOvf1tDzHyP7sAi4aATy7BSkJPQYXMNTn6uG7BNNEtVh4-q2qjCcAEPHUE0ao7sBuG2j_iX28D8GNjmDKcW4bYlpp2rZNmPKpNn2NELcb2T7veUAZ_PB8UCMOCM=s2048?key=mtp0HJ7MvOLW-1kzK49C-A&cb=1764669374780" className="w-full h-full object-contain" alt="Bonsai" />
                           </div>
                           <div className="absolute -bottom-8 whitespace-nowrap bg-[#C6A87C] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest backdrop-blur-sm shadow-lg border border-white/20">
                              Bonsai Residences
                           </div>
                        </div>
                     </div>

                     {/* Destination Pins */}
                     {metroImageMap.destinations.map((dest) => (
                        <div
                           key={dest.id}
                           onClick={() => setActiveMetroDest(dest.id)}
                           className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                           style={{
                              top: `${dest.y}%`,
                              left: `${dest.x}%`,
                              zIndex: activeMetroDest === dest.id ? 50 : 20,
                              opacity: activeMetroDest ? (activeMetroDest === dest.id ? 1 : 0.6) : 1
                           }}
                        >
                           <div className={`relative flex flex-col items-center transition-transform duration-300 ${activeMetroDest === dest.id ? 'scale-110' : 'hover:scale-105'}`}>
                              <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-2 transition-colors ${activeMetroDest === dest.id ? 'border-[#C6A87C]' : 'border-white'}`}>
                                 <img src={dest.logo} alt={dest.name} className="w-8 h-8 object-contain" />
                              </div>
                              {(activeMetroDest === dest.id || !activeMetroDest) && (
                                 <div className="mt-2 bg-white/90 backdrop-blur-sm text-[#0F0E0D] text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                    {dest.name}
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Content Side - Order 2 on Mobile */}
               <div className={`flex flex-col justify-center py-8 md:py-24 px-6 md:px-12 lg:px-24 order-2 lg:order-1 bg-[#F7F5F2] ${language === 'ar' ? 'border-l' : 'border-r'} border-[#0F0E0D]/5 relative`}>

                  {/* Brown spacer line for mobile visual separation */}
                  <div className="lg:hidden absolute top-0 left-0 w-full h-2 bg-bonsai-copper"></div>

                  <JapaneseTitle main={t.home.location.title} sub={t.home.location.sub} />
                  <Reveal>
                     <p className={`text-lg md:text-xl font-light text-[#0F0E0D] leading-relaxed mb-8 md:mb-12 ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {t.home.location.desc1} <br /> {t.home.location.desc2}
                     </p>

                     <div className="mt-8 md:mt-12">
                        <Link to="/location">
                           <Button variant="outline">{t.home.location.button}</Button>
                        </Link>
                     </div>
                  </Reveal>
               </div>
            </div>
         </Section>

         {/* --- 6. GALLERY PREVIEW (Masonry with Lightbox) --- */}
         <Section className="bg-white">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
               <JapaneseTitle main={t.home.gallery.title} sub={t.home.gallery.sub} />
               <div className="hidden md:block mb-16">
                  <Link to="/project"><Button variant="ghost">{t.home.gallery.viewAll} <ArrowRight size={16} className={language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} /></Button></Link>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto">
               {/* Large Item */}
               <div className="md:col-span-8 relative group overflow-hidden h-[40vh] md:h-[60vh] rounded-sm cursor-pointer" onClick={() => openLightbox(0)}>
                  <ClipReveal
                     src={galleryImages[0]}
                     alt="Exterior"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                     direction="up"
                  />
               </div>
               {/* Vertical Item */}
               <div className="md:col-span-4 relative group overflow-hidden h-[40vh] md:h-[60vh] rounded-sm cursor-pointer" onClick={() => openLightbox(1)}>
                  <ClipReveal
                     src={galleryImages[1]}
                     alt="Interior"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                     direction={language === 'ar' ? 'right' : 'left'}
                  />
               </div>
               {/* Bottom Row */}
               <div className="md:col-span-6 relative group overflow-hidden h-[30vh] md:h-[40vh] rounded-sm cursor-pointer" onClick={() => openLightbox(2)}>
                  <ClipReveal
                     src={galleryImages[2]}
                     alt="Living Room"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                     direction={language === 'ar' ? 'left' : 'right'}
                  />
               </div>
               <div className="md:col-span-6 relative group overflow-hidden h-[30vh] md:h-[40vh] rounded-sm cursor-pointer" onClick={() => openLightbox(3)}>
                  <ClipReveal
                     src={galleryImages[3]}
                     alt="Bedroom"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                     direction="up"
                  />
               </div>
            </div>
         </Section>

         {/* --- 7. THE ALLIANCE (Refined) --- */}
         <Section className="bg-white py-32">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
               {/* Left Column: Text & CTA - Sticky */}
               <div className="lg:w-1/3 sticky top-32">
                  <Reveal>
                     <JapaneseTitle main={t.home.team.title} sub={t.home.team.sub} />
                     <p className={`text-[#0F0E0D]/60 text-sm leading-relaxed mb-8 max-w-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {t.home.team.desc}
                     </p>
                     <Link to="/contact">
                        <Button variant="outline">{t.home.team.button}</Button>
                     </Link>
                  </Reveal>
               </div>

               {/* Right Column: Logos Grid */}
               <div className="lg:w-2/3">
                  <div className={`flex flex-wrap justify-center ${language === 'ar' ? 'lg:justify-end' : 'lg:justify-start'} gap-x-8 gap-y-12`}>
                     {partners.map((partner, index) => {
                        const content = (
                           <>
                              <div className="w-full h-[140px] md:h-[160px] bg-white border border-[#0F0E0D]/5 p-6 mb-4 flex items-center justify-center relative overflow-hidden rounded-sm transition-all duration-500 group-hover:border-[#C6A87C] group-hover:shadow-xl">
                                 <div className="absolute inset-0 bg-[#FAFAF9] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                 <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className={`relative z-10 w-full h-full object-contain grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 ${getLogoScale(partner.name)}`}
                                 />
                              </div>

                              <div className="text-center">
                                 <span className={`text-[9px] font-bold uppercase tracking-widest text-[#C6A87C] mb-1 block group-hover:text-[#0F0E0D] transition-colors ${language === 'ar' ? 'font-arabic' : ''}`}>
                                    {partner.role}
                                 </span>
                                 <span className="text-[10px] md:text-xs font-sans text-[#0F0E0D]/80 leading-tight block uppercase">
                                    {partner.name}
                                 </span>
                              </div>
                           </>
                        );

                        return (
                           <div key={index} className="w-[140px] md:w-[160px] flex flex-col items-center group">
                              <Reveal delay={index * 100} className="w-full">
                                 {partner.url ? (
                                    <a href={partner.url} target="_blank" rel="noreferrer" className="block w-full cursor-pointer">
                                       {content}
                                    </a>
                                 ) : (
                                    <div className="block w-full cursor-default">
                                       {content}
                                    </div>
                                 )}
                              </Reveal>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </Section>

         {/* --- 8. CTA --- */}
         <Section className="bg-[#0F0E0D] text-white text-center py-40">
            <Reveal>
               <h2 className={`text-6xl md:text-8xl font-sans font-light mb-8 ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{t.home.contact.join}</h2>
               <p className={`text-white/60 text-xl font-light mb-12 max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t.home.contact.joinDesc}
               </p>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <Link to="/contact">
                     <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0F0E0D] px-8 md:px-12">
                        {t.home.contact.register}
                     </Button>
                  </Link>
                  <a href="https://maps.app.goo.gl/eMLR2QyXFUscTpjx6" target="_blank" rel="noreferrer">
                     <Button variant="ghost" className="text-white/60 hover:text-white border-transparent">
                        <MapPin size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />
                        {t.home.contact.visit}
                     </Button>
                  </a>
               </div>
            </Reveal>
         </Section>
      </>
   );
};

export default Home;