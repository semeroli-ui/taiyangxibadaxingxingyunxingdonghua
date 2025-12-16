import React, { useState, useEffect, useRef, useCallback } from 'react';
import StarBackground from './components/StarBackground';
import InfoPanel from './components/InfoPanel';
import { PLANETS } from './constants';
import { PlanetData } from './types';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0.8);
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(0);
  
  // To force re-render for animation frame
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tick, setTick] = useState(0);

  const animate = useCallback(() => {
    if (!isPaused) {
      timeRef.current += 0.05 * speedMultiplier;
      setTick((prev) => prev + 1);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isPaused, speedMultiplier]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setIsPaused(true); // Pause when viewing info
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
    setIsPaused(false);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.3), 2));
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden select-none">
      <StarBackground />

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 z-40 bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 transition-opacity hover:opacity-100 opacity-80">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
          太阳系探索
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">模拟速度</label>
            <input 
              type="range" 
              min="0.1" 
              max="5" 
              step="0.1" 
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
              className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isPaused ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
            >
              {isPaused ? '继续' : '暂停'}
            </button>
            <button 
               onClick={() => {
                 setZoom(0.8);
                 setSpeedMultiplier(1);
               }}
               className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
            >
              重置
            </button>
          </div>

          <div className="flex gap-2 justify-center">
             <button onClick={() => handleZoom(0.1)} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
             </button>
             <button onClick={() => handleZoom(-0.1)} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
             </button>
          </div>
        </div>
      </div>

      {/* Solar System Container */}
      <div 
        className="absolute top-1/2 left-1/2 w-0 h-0 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* The Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-yellow-400 shadow-[0_0_60px_#fbbf24] z-10 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center group">
           <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-900 font-bold text-xs">太阳</span>
        </div>

        {/* Orbits and Planets */}
        {PLANETS.map((planet) => {
           // Calculate position based on time, speed, and distance
           // We add an offset based on index so they don't all start in a line
           const angle = (timeRef.current * planet.speed * 0.1) + (PLANETS.indexOf(planet) * 2); 
           const x = Math.cos(angle) * planet.distance;
           const y = Math.sin(angle) * planet.distance;

           return (
             <React.Fragment key={planet.id}>
               {/* Orbit Path (SVG for cleanliness) */}
               <div 
                 className="absolute top-1/2 left-1/2 rounded-full border border-slate-700/30 pointer-events-none"
                 style={{
                   width: `${planet.distance * 2}px`,
                   height: `${planet.distance * 2}px`,
                   transform: 'translate(-50%, -50%)',
                 }}
               />

               {/* Planet Group (Handles positioning) */}
               <div
                 className="absolute top-1/2 left-1/2 cursor-pointer z-20 group"
                 style={{
                   transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                   width: `${planet.size}px`,
                   height: `${planet.size}px`,
                 }}
                 onClick={() => handlePlanetClick(planet)}
               >
                 {/* Planet Visual */}
                 <div className={`w-full h-full rounded-full ${planet.color} shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.5)] transition-transform hover:scale-150 relative`}>
                    {/* Saturn's Rings */}
                    {planet.id === 'saturn' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full border-[3px] border-slate-400/50 opacity-80 pointer-events-none" />
                    )}
                 </div>
                 
                 {/* Planet Label */}
                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 px-1 rounded">
                   {planet.name}
                 </div>
               </div>
             </React.Fragment>
           );
        })}
      </div>

      {/* Info Panel Overlay */}
      <InfoPanel planet={selectedPlanet} onClose={handleClosePanel} />
    </div>
  );
};

export default App;