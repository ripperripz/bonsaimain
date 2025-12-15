
import React, { useState } from 'react';
import { Section, Reveal, JapaneseTitle, Button, ClipReveal, ImageParallax, Lightbox } from '../components/UI';
import { MasterplanMap } from '../components/MasterplanMap';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { Flower2, Sparkles, Gamepad2, Armchair, ShoppingBag, ShieldCheck, Layout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Project: React.FC = () => {
   const { t, language } = useLanguage();

   // Safe access to project translations
   const residencesT = t?.project?.residences;

   // --- Residences State ---
   const [activeUnit, setActiveUnit] = useState<'studio' | 'bed2' | 'bed3'>('bed2');

   // Lightbox State
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [lightboxIndex, setLightboxIndex] = useState(0);

   const galleryImages = [
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfYJj49i4GSvl0lhWYDdRYEd89mxFWiR3m0cCDYBQrAbvSiYLvqLIx6moVpn2e497OMRVT8OtoK5r698moFLyEiQmBZpk5vxcwJHH1VftDFFRUXeLg6qn_796r_n_IWA0E=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfsFcCRfwZOVoOgX671va9pG4YmF_NV530nqcn-1gW-mKt_MAgN3Ior0lDeCZHu6euF1uFsXVuiVrF4NUXwcKJVJxDjiiIZe8A5GIgW27PR3RKYmLdW7rWcAj9mTHo4wCU=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcCGYX-TSOCxPqg22SynpPAkYc8VtBGBuifiOK4jzituu-gXhMrUA0xRkH-bV1nLA33_T2Alo54_vO2aAg4Gil62p1xJsweN5XpQ41U2HC-pSPiho_JqPrNj0zHFbzHIlw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdQv_LoK3gijaXZe3KcHIt0cLi-_yakM9WDSdhjmmpPCrh71mT4YgZMxLCaUy9yd6QQNLOBn9juqBC0FQcz__-Q9rEEv03UXgiJscg-rNsz4MOItQgacJtL94fX_D7x0Q=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUeytkH4s7vfGegLA6aoZYktGqkRlroNGJ2RPbX6Vm1IV3eNJcytyZDyyQ9vuwbJUm_kXMEwtTHDHCYMptnQGH6SEqAoudsz8n6sbx57gZta2y9CaM5ZydBh_qyIGUVIjPQ=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfiTTpooGceOWobMsGEy6kZWhM9kI3Hsxb3HTE9hctaxaXqleRuoc7UOPPKPTpz4KW5SJ5hcteMiBNnkKj0IKadCnucCmZCke9kTePwR-IA_VsEn6MO2IpAwT5lQsRewHw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUeKUOKNh7lHJtNkOP_ehbAMtFs0LIPYbyGXGEzZ24pZGK7pz6Kp1s4-ESBzb02nNaF4aQ_Q2pmvfE72l23um0mVDAn9yzWJy5heNafNn8XgDqmQPQMl_g3w6tqTbMh46g=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
      "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdWLEX-FNfGtbI5WiMLWw1CwpxdXHT2SCcujHpSnbcehaxAQaG5RXp956PfWGSkHZNqqIJ8c3k7nL55nJdTG8CDyNepFzjV745leDgwRdlV71kLnd1yPka0P7nTo7jGps0=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
   ];

   const openLightbox = (index: number) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
   };

   const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
   const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);


   // Unit Data
   const units = {
      studio: {
         key: 'studio',
         area: "45 - 55 SQM",
         type: "Studio",
         image: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfsFcCRfwZOVoOgX671va9pG4YmF_NV530nqcn-1gW-mKt_MAgN3Ior0lDeCZHu6euF1uFsXVuiVrF4NUXwcKJVJxDjiiIZe8A5GIgW27PR3RKYmLdW7rWcAj9mTHo4wCU=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
      },
      bed2: {
         key: 'bed2',
         area: "110 - 130 SQM",
         type: "2 Bedrooms",
         image: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcCGYX-TSOCxPqg22SynpPAkYc8VtBGBuifiOK4jzituu-gXhMrUA0xRkH-bV1nLA33_T2Alo54_vO2aAg4Gil62p1xJsweN5XpQ41U2HC-pSPiho_JqPrNj0zHFbzHIlw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
      },
      bed3: {
         key: 'bed3',
         area: "150 - 180 SQM",
         type: "3 Bedrooms",
         image: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdQv_LoK3gijaXZe3KcHIt0cLi-_yakM9WDSdhjmmpPCrh71mT4YgZMxLCaUy9yd6QQNLOBn9juqBC0FQcz__-Q9rEEv03UXgiJscg-rNsz4MOItQgacJtL94fX_D7x0Q=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
      }
   };

   const currentUnit = units[activeUnit];

   return (
      <div className="pt-24 bg-[#F7F5F2]">
         <SEO
            title={language === 'ar' ? "مشروع بونساي | المخطط العام والمرافق" : "Project Amenities & Masterplan | Bonsai Riyadh"}
            description={language === 'ar' ? "استكشف المخطط العام لبونساي، غرفة الشاي اليابانية، السينما، والمرافق الفاخرة. اطلع على قرب المشروع من مترو الرياض وخطط الدفع." : "Explore Bonsai's masterplan, Japanese tea room, cinema, amenities, and proximity to Riyadh Metro. View floor plans and payment options."}
            keywords={[
               "Bonsai Masterplan", "Bonsai Amenities", "Japanese Tea Room Riyadh", "Bonsai Payment Plan", "Bonsai Floor Plans",
               "مخطط بونساي", "مرافق بونساي", "غرفة شاي يابانية", "خطة دفع بونساي", "مسقط افقي بونساي"
            ]}
            schema={{
               "@context": "https://schema.org",
               "@type": "ApartmentComplex",
               "name": "Bonsai Residences",
               "description": "Luxury residential project in Riyadh featuring Japanese design.",
               "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Khurais Road",
                  "addressLocality": "Nahdah District",
                  "addressRegion": "Riyadh",
                  "addressCountry": "SA"
               }
            }}
         />

         {/* Lightbox */}
         <Lightbox
            isOpen={lightboxOpen}
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={nextImage}
            onPrev={prevImage}
         />

         {/* --- 1. AMENITIES (P9) --- */}
         <Section className="bg-white">
            <Reveal>
               <JapaneseTitle main={t.project.amenities?.title || "Amenities"} sub={t.project.amenities?.sub || "Elevated Living"} />
            </Reveal>

            <div className="mt-24 border-t border-[#0F0E0D]/10">
               {[
                  {
                     icon: <Flower2 size={40} strokeWidth={1} />,
                     categoryKey: "serenity",
                     itemsKey: "serenityItems"
                  },
                  {
                     icon: <Sparkles size={40} strokeWidth={1} />,
                     categoryKey: "highlights",
                     itemsKey: "highlightsItems"
                  },
                  {
                     icon: <Gamepad2 size={40} strokeWidth={1} />,
                     categoryKey: "entertainment",
                     itemsKey: "entertainmentItems"
                  },
                  {
                     icon: <Armchair size={40} strokeWidth={1} />,
                     categoryKey: "amenitiesLabel",
                     itemsKey: "amenitiesItems"
                  },
                  {
                     icon: <ShoppingBag size={40} strokeWidth={1} />,
                     categoryKey: "services",
                     itemsKey: "servicesItems"
                  },
                  {
                     icon: <ShieldCheck size={40} strokeWidth={1} />,
                     categoryKey: "features",
                     itemsKey: "featuresItems"
                  }
               ].map((group, i) => (
                  <Reveal key={i} delay={i * 50} className="w-full">
                     <div className="group border-b border-[#0F0E0D]/10 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:bg-[#F7F5F2] transition-colors duration-500 px-4 md:px-8 cursor-default">
                        <div className={`md:col-span-1 text-[#C6A87C] opacity-50 group-hover:opacity-100 transition-opacity flex justify-center ${language === 'ar' ? 'md:justify-end' : 'md:justify-start'}`}>
                           {group.icon}
                        </div>
                        <div className={`md:col-span-4 text-center ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                           <h3 className={`font-sans font-light text-3xl md:text-4xl text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.project.amenities as any)?.[group.categoryKey]}</h3>
                        </div>
                        {/* Updated Amenities List Layout: Stacked vertically on mobile, row on desktop */}
                        <div className={`md:col-span-7 flex flex-col md:flex-row flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-2 ${language === 'ar' ? 'md:justify-start' : 'md:justify-start'}`}>
                           {((t.project.amenities as any)?.[group.itemsKey] || []).map((item: string, idx: number) => (
                              <span key={idx} className={`text-sm uppercase tracking-widest text-[#0F0E0D]/60 flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                 <span className="w-1 h-1 bg-[#C6A87C] rounded-full shrink-0"></span>
                                 {item}
                              </span>
                           ))}
                        </div>
                     </div>
                  </Reveal>
               ))}
            </div>
         </Section>

         {/* --- 2. CLUBHOUSE (P10) --- */}
         <div className="bg-bonsai-beige text-bonsai-dark overflow-hidden">
            <Section className="pb-0">
               <Reveal>
                  <JapaneseTitle main={t.project.clubhouse?.title || "The Clubhouse"} sub={t.project.clubhouse?.sub || "Community"} />
               </Reveal>
            </Section>

            <div className="flex flex-col">
               {[
                  {
                     titleKey: "teaRoom",
                     descKey: "teaRoomDesc",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUf3Ez39OZc0aTFl86HJriv3S-CCrdxlE_MCXyl6DNqVc7cLvJr7mIATbx-f9D0SoqgAE3GC9nFV2YPubE05aWQaEOlwntLpKGTXIKahWYuh-9EcxwRM-jl4znouUYaIxqhnPSi9=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
                     imgPosition: "0% 50%"
                  },
                  {
                     titleKey: "gardens",
                     descKey: "gardensDesc",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfEpXkuDPIoIGsSV1_97j4BmJMc8pXarMz0HYWi87yqajaWQ5r2rXwk_KRXCkFyeK4nmmXX7kioFgWSsKyg9_u-zh2UtaXI7K_X499BFW8QHhBn8GaicneZEdGBAywL0EU=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
                     imgPosition: "100% 50%"
                  },
                  {
                     titleKey: "library",
                     descKey: "libraryDesc",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfiTTpooGceOWobMsGEy6kZWhM9kI3Hsxb3HTE9hctaxaXqleRuoc7UOPPKPTpz4KW5SJ5hcteMiBNnkKj0IKadCnucCmZCke9kTePwR-IA_VsEn6MO2IpAwT5lQsRewHw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A&cb=1764431821755",
                     imgPosition: "center"
                  },
                  {
                     titleKey: "cinema",
                     descKey: "cinemaDesc",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdhhq8TFIs45mbeWV7cOrQG02_7iESAV5dyOmT1Tym8e5e9B_NiQud6NwxAIalU6VhSaCIKE-QZ-O30n9a-yQzfUKJ6-pI_7f-kj0H06WNV2pKWCXY4O8mk__ZYURY_Bqrhi5pnkA=s2048?key=mtp0HJ7MvOLW-1kzK49C-A",
                     imgPosition: "center"
                  },
                  {
                     titleKey: "workspace",
                     descKey: "workspaceDesc",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfiTTpooGceOWobMsGEy6kZWhM9kI3Hsxb3HTE9hctaxaXqleRuoc7UOPPKPTpz4KW5SJ5hcteMiBNnkKj0IKadCnucCmZCke9kTePwR-IA_VsEn6MO2IpAwT5lQsRewHw=s2048?key=mtp0HJ7MvOLW-1kzK49C-A&cb=1764431821755",
                     imgPosition: "center"
                  },
                  {
                     titleKey: "recreation",
                     descKey: "recreationDesc",
                     img: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcGVOOM1HofunBjuCiOPVOuw7Lbor-cm4IKd70NAJ2BKgwEWp-zfz9a7HuCEV8xwrEHJfHWsjgE5vwmxsir8pNcI_qQkrSY_3-Bfm-_-F8rE3VLfB9WYNzNo2SDpGE944c=s2048?key=mtp0HJ7MvOLW-1kzK49C-A&cb=1764431821790",
                     imgPosition: "center"
                  },
               ].map((item, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
                     <div className={`relative h-[50vh] md:h-auto overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                        <ImageParallax
                           src={item.img}
                           alt={(t.project.clubhouse as any)?.[item.titleKey] || ''}
                           className="w-full h-full object-cover"
                           speed={0.1}
                           imgStyle={{ objectPosition: item.imgPosition }}
                        />
                     </div>
                     <div className={`flex flex-col justify-center p-12 md:p-24 bg-bonsai-stone z-10 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                        <Reveal>
                           <span className="text-[#C6A87C] font-mono text-xs uppercase tracking-widest mb-4 block">0{i + 1}</span>
                           <h3 className={`font-sans font-light text-4xl md:text-5xl text-bonsai-dark mb-8 ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.project.clubhouse as any)?.[item.titleKey]}</h3>
                           <p className={`text-lg text-bonsai-dark/60 leading-relaxed font-light max-w-md ${language === 'ar' ? 'font-arabic' : ''}`}>{(t.project.clubhouse as any)?.[item.descKey]}</p>
                        </Reveal>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* --- 3. THE RESIDENCES (Unit Typologies) --- */}
         <Section className="bg-[#F7F5F2] min-h-screen flex items-center">
            <div className="w-full">
               <Reveal>
                  <JapaneseTitle main={residencesT?.title || "The Residences"} sub={residencesT?.sub || "Typologies"} />
               </Reveal>

               <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  {/* Unit Controls (Tabs) */}
                  <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-1">
                     <div className={`flex flex-col gap-2 ${language === 'ar' ? 'border-r-2 pr-0' : 'border-l-2 pl-0'} border-[#0F0E0D]/10`}>
                        {Object.entries(units).map(([key, unit]) => (
                           <button
                              key={key}
                              onClick={() => setActiveUnit(key as any)}
                              className={`text-left rtl:text-right py-4 text-2xl font-sans font-light transition-all duration-300 relative group 
                           ${language === 'ar' ? 'pr-6 hover:pr-8 font-arabic font-normal' : 'pl-6 hover:pl-8'}
                           ${activeUnit === key ? (language === 'ar' ? 'text-[#0F0E0D] font-medium pr-10' : 'text-[#0F0E0D] font-normal pl-10') : 'text-[#0F0E0D]/40 hover:text-[#C6A87C]'}`}
                           >
                              <span className={`absolute top-1/2 -translate-y-1/2 h-full w-[2px] transition-all duration-500 bg-[#C6A87C] 
                             ${language === 'ar' ? 'right-[-2px]' : 'left-[-2px]'}
                             ${activeUnit === key ? 'opacity-100' : 'opacity-0'}`}></span>
                              {(residencesT as any)?.[key]?.name || unit.type}
                           </button>
                        ))}
                     </div>

                     {/* Unit Details Box */}
                     <Reveal key={activeUnit} className="bg-white p-8 md:p-12 shadow-2xl mt-8">
                        <div className="flex justify-between items-end mb-8 border-b border-[#0F0E0D]/10 pb-4">
                           <div>
                              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] block mb-2">{residencesT?.specs?.type || "Type"}</span>
                              <h3 className={`text-3xl font-sans text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(residencesT as any)?.[activeUnit]?.name || currentUnit.type}</h3>
                           </div>
                           <div className="text-right rtl:text-left">
                              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] block mb-2">{residencesT?.specs?.area || "Area"}</span>
                              <span className="text-xl font-mono text-[#0F0E0D]/70">{currentUnit.area}</span>
                           </div>
                        </div>

                        <p className={`text-[#0F0E0D]/70 font-light leading-relaxed mb-8 min-h-[80px] ${language === 'ar' ? 'font-arabic' : ''}`}>
                           {(residencesT as any)?.[activeUnit]?.desc}
                        </p>

                        <ul className="space-y-3 mb-12">
                           {((residencesT as any)?.[activeUnit]?.features as string[] || []).map((feat, i) => (
                              <li key={i} className={`flex items-center gap-3 text-sm text-[#0F0E0D]/80 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                 <div className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full"></div>
                                 {feat}
                              </li>
                           ))}
                        </ul>

                        <Link to="/brochure">
                           <Button variant="outline" className="w-full">
                              <Layout size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />
                              {residencesT?.viewPlan || "View Floor Plan"}
                           </Button>
                        </Link>
                     </Reveal>
                  </div>

                  {/* Large Unit Image */}
                  <div className="lg:col-span-8 h-[50vh] lg:h-[80vh] relative overflow-hidden order-1 lg:order-2 group">
                     <ClipReveal
                        key={activeUnit}
                        src={currentUnit.image}
                        alt={currentUnit.type}
                        className="w-full h-full object-cover rounded-sm shadow-xl"
                        direction={language === 'ar' ? "right" : "left"}
                     />
                     <div className={`absolute bottom-8 ${language === 'ar' ? 'left-8' : 'right-8'} bg-white/90 backdrop-blur px-6 py-3 shadow-lg z-20`}>
                        <span className={`text-xs font-bold uppercase tracking-widest text-[#0F0E0D] ${language === 'ar' ? 'font-arabic' : ''}`}>{t.project.interiorPerspective}</span>
                     </div>
                  </div>
               </div>
            </div>
         </Section>

         {/* --- 4. EXCEPTIONAL DESIGN (P7) --- */}
         <Section className="bg-[#F7F5F2] py-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-5">
                  <Reveal>
                     <JapaneseTitle main={t.project.exceptionalDesign?.title || "Exceptional Design"} sub={t.project.exceptionalDesign?.sub || "Honest Design"} />
                     <p className="text-[#0F0E0D]/60 text-lg leading-relaxed mt-8 font-light italic">
                        {(t.project.exceptionalDesign as any)?.quote}
                     </p>
                  </Reveal>
               </div>
               <div className="lg:col-span-7 flex flex-col justify-center">
                  <Reveal delay={200}>
                     <p className="text-xl md:text-2xl font-sans font-light text-[#0F0E0D] leading-relaxed">
                        {(t.designer as any)?.honestDesignDesc}
                     </p>
                  </Reveal>
               </div>
            </div>

            {/* Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
               <Reveal delay={0}>
                  <div className="bg-white p-12 border border-[#0F0E0D]/5 h-full">
                     <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] mb-6 block">01</span>
                     <h3 className={`font-sans font-light text-3xl mb-6 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.project.exceptionalDesign as any)?.spaceUtilization}</h3>
                     <p className={`text-[#0F0E0D]/70 leading-relaxed font-light ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {(t.project.exceptionalDesign as any)?.spaceUtilizationDesc}
                     </p>
                  </div>
               </Reveal>

               <Reveal delay={200}>
                  <div className="bg-white p-12 border border-[#0F0E0D]/5 h-full">
                     <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] mb-6 block">02</span>
                     <h3 className={`font-sans font-light text-3xl mb-6 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.project.exceptionalDesign as any)?.craftsmanship}</h3>
                     <p className={`text-[#0F0E0D]/70 leading-relaxed font-light ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {(t.project.exceptionalDesign as any)?.craftsmanshipDesc}
                     </p>
                  </div>
               </Reveal>
            </div>
         </Section>

         {/* --- 5. PAYMENT OPTIONS (P15) --- */}
         <Section className="bg-bonsai-stone">
            <Reveal>
               <JapaneseTitle main={t.project.paymentOptions?.title || "Payment Options"} sub={t.project.paymentOptions?.sub || "Installments"} />
            </Reveal>

            <div className="bg-white p-6 md:p-16 shadow-2xl mt-12 relative overflow-hidden">
               <div className={`absolute top-0 w-64 h-64 bg-[#F7F5F2] rounded-full opacity-50 ${language === 'ar' ? 'left-0 -translate-y-1/2 -translate-x-1/2' : 'right-0 -translate-y-1/2 translate-x-1/2'}`}></div>
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#0F0E0D]/10 pb-8 relative z-10">
                  <div>
                     <span className={`text-[#C6A87C] uppercase tracking-widest text-xs font-bold mb-2 block ${language === 'ar' ? 'font-arabic' : ''}`}>{t.project.payment.recommendation}</span>
                     <h3 className={`font-sans font-light text-3xl md:text-4xl text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{t.project.payment.preference}</h3>
                  </div>
                  <p className={`text-sm text-[#0F0E0D]/60 max-w-sm mt-4 md:mt-0 leading-relaxed ${language === 'ar' ? 'text-right md:text-left font-arabic' : 'text-left md:text-right'}`}>
                     {t.project.payment.desc}
                  </p>
               </div>

               <div className="overflow-x-auto relative z-10">
                  <table className="w-full text-left rtl:text-right border-collapse min-w-[300px]">
                     <thead>
                        <tr className={`text-[10px] md:text-xs uppercase tracking-widest text-[#0F0E0D]/40 border-b border-[#0F0E0D]/10 ${language === 'ar' ? 'font-arabic' : ''}`}>
                           <th className={`py-4 md:py-6 font-bold ${language === 'ar' ? 'pl-2 md:pl-4' : 'pl-2 md:pl-4'} hidden md:table-cell`}>{t.project.payment.table.stage}</th>
                           <th className="py-4 md:py-6 font-bold">{t.project.payment.table.milestone}</th>
                           <th className="py-4 md:py-6 font-bold">{t.project.payment.table.amount}</th>
                           <th className={`py-4 md:py-6 font-bold ${language === 'ar' ? 'pl-2 md:pl-4 text-left' : 'pr-2 md:pr-4 text-right'}`}>{t.project.payment.table.total}</th>
                        </tr>
                     </thead>
                     <tbody className="text-[#0F0E0D]">
                        {[
                           { id: 1, step: t.project.payment.table.signing, amt: "20%", tot: "20%" },
                           { id: 2, step: "20%", amt: "15%", tot: "35%" },
                           { id: 3, step: "40%", amt: "15%", tot: "50%" },
                           { id: 4, step: "60%", amt: "15%", tot: "65%" },
                           { id: 5, step: "80%", amt: "15%", tot: "80%" },
                           { id: 6, step: "100%", amt: "15%", tot: "95%" },
                           { id: 7, step: t.project.payment.table.handover, amt: "5%", tot: "100%" },
                        ].map((row, i) => (
                           <tr key={i} className="group border-b border-[#0F0E0D]/5 hover:bg-[#F7F5F2] transition-colors">
                              <td className={`py-4 md:py-6 font-sans font-light text-xl opacity-30 group-hover:opacity-100 transition-opacity hidden md:table-cell ${language === 'ar' ? 'pl-4' : 'pl-4'}`}>0{row.id}</td>
                              <td className={`py-4 md:py-6 font-bold text-[#C6A87C] tracking-wide text-xs md:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>{row.step}</td>
                              <td className="py-4 md:py-6 font-mono opacity-70 text-xs md:text-base">{row.amt}</td>
                              <td className={`py-4 md:py-6 font-bold text-xs md:text-base ${language === 'ar' ? 'pl-4 text-left' : 'pr-4 text-right'}`}>{row.tot}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </Section>

         {/* --- 6. WARRANTIES (P16) --- */}
         <Section className="bg-bonsai-beige text-bonsai-dark">
            <Reveal>
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4 flex flex-col justify-between">
                     <div>
                        <JapaneseTitle main={t.project.warranties.title} sub={t.project.warranties.sub} />
                        <p className={`text-bonsai-dark/60 mt-8 mb-12 text-lg font-light leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                           {t.project.warranties.desc}
                        </p>
                     </div>
                     <div className="hidden lg:block">
                        <Link to="/contact">
                           <Button variant="primary">{t.project.warranties.inquire}</Button>
                        </Link>
                     </div>
                  </div>

                  <div className="lg:col-span-8">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bonsai-dark/10 border border-bonsai-dark/10">
                        {[
                           { years: "10", title: t.project.warranties.items.structure },
                           { years: "25", title: t.project.warranties.items.electricPanels },
                           { years: "10", title: t.project.warranties.items.insulation },
                           { years: "5", title: t.project.warranties.items.electricPlumbing },
                           { years: "2", title: t.project.warranties.items.fullWarranty },
                           { years: "2", title: t.project.warranties.items.elevatorsLights },
                           { years: "1", title: t.project.warranties.items.doorsPaint },
                           { years: "3", title: t.project.warranties.items.aluminium },
                        ].map((w, i) => (
                           <div key={i} className="bg-bonsai-beige p-8 aspect-square flex flex-col justify-between group hover:bg-white transition-colors">
                              <Reveal delay={i * 50}>
                                 <div className="font-sans font-extralight text-5xl md:text-6xl text-[#C6A87C] opacity-80 group-hover:opacity-100 transition-opacity">{w.years}</div>
                                 <div className="mt-4">
                                    <span className={`text-[10px] uppercase tracking-widest text-bonsai-dark/40 mb-1 block ${language === 'ar' ? 'font-arabic' : ''}`}>{t.project.warranties.years}</span>
                                    <h4 className={`font-bold text-sm leading-tight text-bonsai-dark ${language === 'ar' ? 'font-arabic' : ''}`}>{w.title}</h4>
                                 </div>
                              </Reveal>
                           </div>
                        ))}
                     </div>
                     <div className="mt-12 lg:hidden">
                        <Link to="/contact">
                           <Button variant="primary">{t.project.warranties.inquire}</Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </Reveal>
         </Section>

         {/* --- 7. MASTERPLAN (P19) --- */}
         <Section className="bg-[#F7F5F2]" fullWidth>
            <div className="px-6 md:px-12 lg:px-24 mb-16">
               <Reveal>
                  <JapaneseTitle main={t.project.masterplan?.title || "Masterplan"} sub={t.project.masterplan?.sub || "Layout"} />
                  <p className={`text-[#0F0E0D]/60 max-w-2xl font-light text-xl mt-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
                     {t.project.masterplan.desc}
                  </p>
               </Reveal>
            </div>
            <div className="w-full bg-white border-y border-[#0F0E0D]/10 py-12 md:py-24 overflow-hidden relative group cursor-zoom-in flex justify-center">
               <MasterplanMap className="w-full max-w-6xl" />
            </div>
         </Section>

         {/* --- 8. GALLERY (P17) --- */}
         <Section className="bg-white py-32" fullWidth>
            <div className="px-6 md:px-12 lg:px-24 mb-16 flex justify-between items-end">
               <JapaneseTitle main={t.home.gallery.title} sub={t.home.gallery.sub} />
            </div>
            <div className="px-4 md:px-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 relative group overflow-hidden h-[40vh] md:h-[60vh] rounded-sm cursor-pointer" onClick={() => openLightbox(0)}>
                     <ClipReveal
                        src={galleryImages[0]}
                        alt="Exterior View"
                        className="w-full h-full object-cover"
                        direction="up"
                     />
                  </div>
                  <div className="md:col-span-4 relative group overflow-hidden h-[40vh] md:h-[60vh] rounded-sm cursor-pointer" onClick={() => openLightbox(1)}>
                     <ClipReveal
                        src={galleryImages[1]}
                        alt="Interior Vertical"
                        className="w-full h-full object-cover"
                        direction="down"
                     />
                  </div>
                  <div className="md:col-span-6 relative group overflow-hidden h-[30vh] md:h-[45vh] rounded-sm cursor-pointer" onClick={() => openLightbox(2)}>
                     <ClipReveal
                        src={galleryImages[2]}
                        alt="Interior Living"
                        className="w-full h-full object-cover"
                        direction={language === 'ar' ? "left" : "right"}
                     />
                  </div>
                  <div className="md:col-span-6 relative group overflow-hidden h-[30vh] md:h-[45vh] rounded-sm cursor-pointer" onClick={() => openLightbox(3)}>
                     <ClipReveal
                        src={galleryImages[3]}
                        alt="Interior Space"
                        className="w-full h-full object-cover"
                        direction="up"
                     />
                  </div>
                  {galleryImages.slice(4).map((src, i) => (
                     <div key={i} className="md:col-span-3 relative group overflow-hidden h-[25vh] md:h-[30vh] rounded-sm cursor-pointer" onClick={() => openLightbox(i + 4)}>
                        <ClipReveal src={src} alt={`Gallery Image ${i + 5}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" direction="up" />
                     </div>
                  ))}
               </div>
            </div>
         </Section>
      </div>
   );
};

export default Project;
