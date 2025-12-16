import React, { useState, useEffect } from 'react';
import { PlanetData } from '../types';
import { generatePlanetFacts } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Assuming we handle markdown manually or simple text

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onClose }) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setAiContent('');
    if (planet) {
      handleGenerate(planet.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planet]);

  const handleGenerate = async (name: string) => {
    setLoading(true);
    const facts = await generatePlanetFacts(name);
    setAiContent(facts);
    setLoading(false);
  };

  if (!planet) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-900/95 backdrop-blur-md border-l border-slate-700 p-6 z-50 shadow-2xl transition-transform duration-300 transform translate-x-0 overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-8 flex flex-col items-center">
        <div className={`w-24 h-24 rounded-full ${planet.color} shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4 flex items-center justify-center`}>
           {planet.id === 'saturn' && (
             <div className="absolute w-36 h-36 rounded-full border-[6px] border-slate-300/30 rotate-12"></div>
           )}
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-400">
          {planet.name}
        </h2>
        <h3 className="text-xl text-slate-500 font-serif italic mb-6">{planet.nameEn}</h3>
        
        <div className="w-full bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
          <p className="text-slate-300 leading-relaxed mb-4">{planet.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
             <div className="bg-slate-800 p-2 rounded">
               <span className="block text-slate-500 text-xs">相对距离</span>
               <span className="font-mono text-blue-300">{planet.distance} AU Scale</span>
             </div>
             <div className="bg-slate-800 p-2 rounded">
               <span className="block text-slate-500 text-xs">轨道速度</span>
               <span className="font-mono text-green-300">{planet.speed}x</span>
             </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              AI 星际百科
            </h4>
            {loading && <span className="text-xs text-blue-400 animate-pulse">正在从 Gemini 接收信号...</span>}
          </div>
          
          <div className="bg-slate-800/80 rounded-xl p-4 min-h-[150px] border border-slate-600 shadow-inner">
            {loading ? (
              <div className="space-y-3">
                <div className="h-2 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-2 bg-slate-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-2 bg-slate-700 rounded w-5/6 animate-pulse"></div>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm text-slate-300">
                <pre className="whitespace-pre-wrap font-sans">{aiContent}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;