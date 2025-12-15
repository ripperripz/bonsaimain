
import React, { useState, useEffect, useRef } from 'react';
import { Section, Reveal, JapaneseTitle, Button } from '../components/UI';
import { SEO } from '../components/SEO';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { locations, CENTER, MAP_CONFIG } from '../data/locations';

const Location: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Services' | 'Cafes' | 'Food' | 'Shopping' | 'Education'>('Services');
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const { t, language } = useLanguage();

  // Metro Map State
  const [activeMetroDest, setActiveMetroDest] = useState<string | null>(null);

  // Metro / Image Map Data
  const metroImageMap = {
    background: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUe_CzENDqM5NjzAublYlmrhx5dj8HFTHr_m4FqlsHSxTGZpW-aWN2CbwyKQd1QzJfiTbkHYMPzV_SH9Gu-Rl45wrtAmDqcU8eXmauSN-5Hb1SorgfBoFaBhtpYrxGcaIg=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874747",
    bonsai: { x: 70, y: 19 }, // Top Right (Al Hamra/Andalus)
    destinations: [
      {
        id: "sabic",
        name: (t.location as any)?.destinations?.sabic || "SABIC",
        x: 33, y: 15, // Top Center-Left (Interchange)
        logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdATzInD-DwIAqVOeQ14ESZLejo8GokKHYMKIgqjl4i81Aj4cO6kb8DT7qhVn02iMlH3WFG2Mi5fTiplHOpKpMoAnzSAclqQBwBHi0Du3NmLcPXyLM8HQ64CSqBh04_ol8=s2048?key=IhwjvqLC4M0vf-jnqYYekg"
      },
      {
        id: "kafd",
        name: (t.location as any)?.destinations?.kafd || "KAFD",
        x: 18, y: 27, // Far Left (Interchange)
        logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUd1pFEFDDXqIArkWIBE7MA-GZOdst3fh2-jmC3gVWRDexiMyjweYr1EuPPgiEQ8QfbquwiOBpoR9w3O9A0iqvoIdqB_Pu7ZG3daXsFcoSG0NJ9nwbSmm5rY7idpZ4qHXQ=s2048?key=IhwjvqLC4M0vf-jnqYYekg"
      },
      {
        id: "stc",
        name: (t.location as any)?.destinations?.stc || "STC HQ",
        x: 29, y: 38, // Below KAFD
        logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfwbZRCmm19e5P6us6EZps4ZZlwrxhz4tQVTQLMTTkNa-xZEivvnS0jSijwC5JplvcCCE4GRLH0JpAeWy8NQUs87kO9x5jlym1wq2vEi0mSO51qN3tNDlm1OtPz4L2-Mw=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874747"
      },
      {
        id: "ksp",
        name: (t.location as any)?.destinations?.ksp || "King Salman Park",
        x: 39, y: 39, // Center
        logo: "https://lh7-rt.googleusercontent.com/slidesz/AGV_vUeniJXWmTZm_-BHEGnisb1lh-Cv1RQCoW-kdq1F9XS0QQ8PBFwXlznH_Vupg2TozjhTBM0rzQ5Hn6FObFuHU6cgr6aoeGuqml4LfnqUZJpkN4SCOIEH3IOL_BF-yQKDvWM=s2048?key=IhwjvqLC4M0vf-jnqYYekg&cb=1764645874640"
      }
    ]
  };

  const selectedDest = metroImageMap.destinations.find(d => d.id === activeMetroDest);

  // Initialize Vibrant Location Map
  useEffect(() => {
    // Check if map container exists and L is available
    if (typeof window !== 'undefined' && (window as any).L && mapContainer.current) {
      // If map instance already exists, remove it to prevent "Map container is already initialized" error
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      const L = (window as any).L;

      mapInstance.current = L.map(mapContainer.current, {
        center: CENTER,
        zoom: MAP_CONFIG.defaultZoom,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance.current);

      const bonsaiIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="width: 50px; height: 50px; background: #C6A87C; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(198, 168, 124, 0.4); border: 3px solid white;">
                 <div style="width: 14px; height: 14px; background: #0F0E0D; border-radius: 50%;"></div>
               </div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      });

      L.marker(CENTER, { icon: bonsaiIcon }).addTo(mapInstance.current)
        .bindPopup("<b>Bonsai Residences</b>").openPopup();
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // Run once on mount

  // Update Markers when category changes
  useEffect(() => {
    if (mapInstance.current && (window as any).L) {
      const L = (window as any).L;

      // Clear existing markers
      markersRef.current.forEach(marker => mapInstance.current.removeLayer(marker));
      markersRef.current = [];

      const boundsPoints: any[] = [CENTER]; // Always include center

      locations[activeCategory].forEach((loc) => {
        const hasLogo = loc.logo && loc.logo.length > 0;

        const pinHtml = hasLogo
          ? `<div style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); transition: transform 0.3s ease;">
               <img src="${loc.logo}" style="width: 100%; height: 100%; object-fit: contain; transform: scale(1);" />
             </div>`
          : `<div class="pin-inner">${loc.id}</div>`;

        const pinIcon = L.divIcon({
          className: 'custom-pin',
          html: pinHtml,
          iconSize: [60, 60],
          iconAnchor: [30, 30]
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon })
          .addTo(mapInstance.current)
          .bindPopup(`<b>${loc.name}</b>`);

        marker.on('click', () => {
          setActiveLocationId(loc.id);
          mapInstance.current.flyTo([loc.lat, loc.lng], 16, { duration: 1.5 });
        });

        markersRef.current.push(marker);
        boundsPoints.push([loc.lat, loc.lng]);
      });

      // Fit bounds to show all services if no specific location is active
      if (activeLocationId === null) {
        // Invalidate size to ensure correct calculation
        mapInstance.current.invalidateSize();

        const bounds = L.latLngBounds(boundsPoints);
        mapInstance.current.flyToBounds(bounds, {
          paddingTopLeft: [50, 50],
          paddingBottomRight: [50, 50],
          maxZoom: 15,
          animate: true,
          duration: 1.5
        });
      }
    }
  }, [activeCategory]);

  const handleLocationClick = (loc: any) => {
    setActiveLocationId(loc.id);
    if (mapInstance.current) {
      mapInstance.current.flyTo([loc.lat, loc.lng], 17, {
        duration: 1.5,
        easeLinearity: 0.25
      });

      const markerIndex = locations[activeCategory].findIndex(l => l.id === loc.id);
      if (markerIndex >= 0 && markersRef.current[markerIndex]) {
        markersRef.current[markerIndex].openPopup();
      }
    }
  };

  return (
    <div className="pt-24 bg-[#F7F5F2]">
      <SEO
        title={language === 'ar' ? "الموقع | مساكن بونساي" : "Location | Bonsai Residences"}
        description={language === 'ar' ? "استكشف موقع بونساي الاستراتيجي في حي النهضة، بالقرب من محطة المترو والخدمات الرئيسية." : "Explore Bonsai's strategic location in Nahdah District, with immediate access to Riyadh Metro and key city landmarks."}
        keywords={[
          "Nahdah District", "Khurais Road", "Riyadh Metro Location", "Bonsai Map",
          "موقع بونساي", "خريطة بونساي", "حي النهضة", "طريق خريص"
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Place",
          "name": "Bonsai Residences Location",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressRegion": "Riyadh",
            "addressCountry": "SA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": CENTER[0],
            "longitude": CENTER[1]
          }
        }}
      />

      {/* --- 1. VIBRANT LOCATION (Services Map) --- */}
      <Section className="bg-white p-0 md:p-0" fullWidth>
        <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-100px)]">

          {/* Mobile Title Block */}
          <div className="lg:hidden px-6 pt-8 pb-4 bg-[#F7F5F2]">
            <JapaneseTitle main={t.location?.title || "Vibrant Location"} sub={t.location?.neighborhood || "Neighborhood"} />
            <p className={`text-xl font-light text-[#0F0E0D] leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {(t.location as any)?.everything}
            </p>
          </div>

          {/* Map Side - Height reduced on mobile to allow viewing tabs/content below */}
          <div className="relative w-full h-[35vh] lg:h-auto overflow-hidden bg-bonsai-stone lg:order-2">
            <div ref={mapContainer} className="w-full h-full z-10" />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-start py-4 md:py-24 px-6 md:px-12 lg:px-24 border-r border-[#0F0E0D]/5 bg-[#F7F5F2] lg:order-1 flex-1">

            {/* Desktop Title */}
            <div className="hidden lg:block">
              <JapaneseTitle main={t.location?.title || "Vibrant Location"} sub={t.location?.neighborhood || "Neighborhood"} />
              <Reveal>
                <p className={`text-xl font-light text-[#0F0E0D] leading-relaxed mb-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {(t.location as any)?.everything}
                </p>
              </Reveal>
            </div>

            <Reveal>
              {/* Decorative Spacer for Mobile - Brown/Beige separation requested */}
              <div className="lg:hidden w-full h-px bg-[#C6A87C]/30 my-6"></div>

              {/* Category Switcher */}
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                {['Services', 'Cafes', 'Food', 'Shopping', 'Education'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat as any);
                      setActiveLocationId(null);
                      // Fit bounds will trigger in useEffect
                    }}
                    className={`px-3 py-2 md:px-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                      ? 'bg-[#0F0E0D] text-white'
                      : 'bg-white text-[#0F0E0D]/50 hover:bg-[#C6A87C] hover:text-white border border-[#0F0E0D]/5'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* List Items - Scrollable area optimized for mobile view */}
              <div className="grid grid-cols-1 gap-3 md:gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[35vh] lg:max-h-[400px]">
                {locations[activeCategory].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleLocationClick(item)}
                    className={`flex items-center gap-4 md:gap-6 group p-3 md:p-4 border transition-all duration-300 cursor-pointer rounded-sm ${activeLocationId === item.id
                      ? 'border-[#C6A87C] bg-white shadow-lg scale-[1.01]'
                      : 'border-[#0F0E0D]/5 bg-white hover:border-[#C6A87C] hover:shadow-md'
                      }`}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                      {item.logo ? (
                        <img src={item.logo} alt={item.name} className="w-full h-full object-contain filter drop-shadow-sm" />
                      ) : (
                        <span className="font-sans font-light text-lg text-[#0F0E0D]">{item.id}</span>
                      )}
                    </div>
                    <h4 className={`uppercase tracking-widest text-xs md:text-sm font-bold transition-colors ${activeLocationId === item.id ? 'text-[#C6A87C]' : 'text-[#0F0E0D] group-hover:text-[#C6A87C]'
                      }`}>
                      {item.name}
                    </h4>
                    {activeLocationId === item.id && (
                      <div className="ml-auto text-[#C6A87C] animate-pulse">
                        <MapPin size={16} fill="currentColor" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 md:mt-12 mb-8 lg:mb-0">
                <a href="https://maps.google.com/?q=24.7445061,46.8076096" target="_blank" rel="noreferrer">
                  <Button variant="outline"><MapPin size={16} className="mr-2" /> Open Google Maps</Button>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* --- 2. METRO PROXIMITY (Metro Image Map) --- */}
      <Section className="bg-[#EAE8E4] py-0" fullWidth>
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Sidebar Control */}
          <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center border-r border-[#0F0E0D]/5 bg-white order-2 lg:order-1 relative z-20">
            <div className="lg:hidden absolute top-0 left-0 w-full h-2 bg-bonsai-copper"></div>
            <Reveal>
              <JapaneseTitle main={t.location?.metroProximity || "Metro Proximity"} sub={t.location?.metroConnectivity || "Connectivity"} />
              <p className={`text-xl font-sans font-light text-[#0F0E0D] leading-relaxed mb-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {(t.location as any)?.vibrantDescFull}
              </p>
              <div className="space-y-4">
                {metroImageMap.destinations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveMetroDest(item.id)}
                    className={`flex items-center gap-4 group p-4 bg-white border cursor-pointer transition-all duration-300 ${activeMetroDest === item.id ? 'border-[#C6A87C] shadow-lg scale-[1.02]' : 'border-[#0F0E0D]/5 hover:border-[#C6A87C]'}`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center p-1 transition-transform bg-white rounded-full shadow-sm ${activeMetroDest === item.id ? 'scale-110 ring-2 ring-[#C6A87C] ring-offset-2' : 'group-hover:scale-110'}`}>
                      <img src={item.logo} alt={item.name} className="w-full h-full object-contain filter" />
                    </div>
                    <div className="flex-grow">
                      <span className={`text-[10px] uppercase tracking-widest block mb-1 transition-colors ${activeMetroDest === item.id ? 'text-[#C6A87C] font-bold' : 'text-[#C6A87C]/70'} ${language === 'ar' ? 'font-arabic' : ''}`}>{(t.location as any)?.destination}</span>
                      <span className={`font-sans text-lg transition-colors ${activeMetroDest === item.id ? 'text-[#0F0E0D] font-medium' : 'text-[#0F0E0D] font-light'}`}>{item.name}</span>
                    </div>
                    <div className={`ml-auto transition-opacity ${activeMetroDest === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                      <ArrowRight size={18} className="text-[#C6A87C]" />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Interactive Image Map */}
          <div className="relative w-full order-1 lg:order-2 flex items-center justify-center overflow-hidden">
            {/* Use a relative wrapper that fits the image aspect ratio exactly */}
            <div className="relative w-full max-w-full">
              <img
                src={metroImageMap.background}
                alt="Riyadh Metro Map"
                className="w-full h-auto block opacity-90 transition-transform duration-700"
              />
              {/* Dark Overlay for better pin contrast */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

              {/* SVG Overlay for drawing lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_0_8px_rgba(198,168,124,0.8)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#C6A87C" />
                  </marker>
                </defs>
                {selectedDest && (
                  <path
                    key={selectedDest.id}
                    d={`M ${metroImageMap.bonsai.x} ${metroImageMap.bonsai.y} Q ${(metroImageMap.bonsai.x + selectedDest.x) / 2} ${(metroImageMap.bonsai.y + selectedDest.y) / 2 - 10} ${selectedDest.x} ${selectedDest.y}`}
                    fill="none"
                    stroke="#C6A87C"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                    className="animate-line-draw"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>

              {/* Pins */}
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

            <div className="absolute top-6 right-6 z-30 bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-[#C6A87C] rounded-full animate-pulse"></div>
              <span className={`text-white text-xs font-bold uppercase tracking-widest ${language === 'ar' ? 'font-arabic' : ''}`}>{(t.location as any)?.metroNetwork}</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Location;
