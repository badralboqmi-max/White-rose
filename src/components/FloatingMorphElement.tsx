import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

type MorphState = 'flower' | 'tulle' | 'threads';

interface FloatingMorphElementProps {
  currentSection: number;
}

export function FloatingMorphElement({ currentSection }: FloatingMorphElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<SVGSVGElement>(null);
  const tulleRef = useRef<SVGSVGElement>(null);
  const threadsRef = useRef<SVGSVGElement>(null);
  const [currentMorph, setCurrentMorph] = useState<MorphState>('flower');

  // Determine morph state based on section
  useEffect(() => {
    // Section mapping: 0=hero, 1=wedding-cat, 2=wedding-gallery, 3=evening-cat, 4=evening-gallery, 5=children-cat, 6=children-gallery, 7=process, 8=contact
    const morphMapping: MorphState[] = [
      'flower',      // hero
      'tulle',       // wedding-cat
      'threads',     // wedding-gallery
      'flower',      // evening-cat
      'tulle',       // evening-gallery
      'threads',     // children-cat
      'flower',      // children-gallery
      'tulle',       // process
      'threads',     // contact
    ];
    
    const newMorph = morphMapping[currentSection] || 'flower';
    setCurrentMorph(newMorph);
  }, [currentSection]);

  // Handle morph transitions
  useEffect(() => {
    const flower = flowerRef.current;
    const tulle = tulleRef.current;
    const threads = threadsRef.current;

    if (!flower || !tulle || !threads) return;

    // Hide all first
    gsap.set([flower, tulle, threads], { opacity: 0, scale: 0.8 });

    // Show current with morph animation
    switch (currentMorph) {
      case 'flower':
        gsap.to(flower, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
        break;
      case 'tulle':
        gsap.to(tulle, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
        break;
      case 'threads':
        gsap.to(threads, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
        break;
    }
  }, [currentMorph]);

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-[5]"
      style={{
        right: '8%',
        top: '25%',
        width: '180px',
        height: '180px',
      }}
    >
      {/* White Flower SVG */}
      <svg
        ref={flowerRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rose flower petals */}
        <g opacity="0.9">
          {/* Outer petals */}
          <ellipse cx="100" cy="60" rx="25" ry="35" fill="white" transform="rotate(0 100 100)" />
          <ellipse cx="140" cy="80" rx="25" ry="35" fill="white" transform="rotate(72 100 100)" />
          <ellipse cx="120" cy="130" rx="25" ry="35" fill="white" transform="rotate(144 100 100)" />
          <ellipse cx="80" cy="130" rx="25" ry="35" fill="white" transform="rotate(216 100 100)" />
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="white" transform="rotate(288 100 100)" />
          
          {/* Inner petals */}
          <ellipse cx="100" cy="75" rx="18" ry="25" fill="#FFF8F8" transform="rotate(36 100 100)" />
          <ellipse cx="125" cy="95" rx="18" ry="25" fill="#FFF8F8" transform="rotate(108 100 100)" />
          <ellipse cx="110" cy="120" rx="18" ry="25" fill="#FFF8F8" transform="rotate(180 100 100)" />
          <ellipse cx="90" cy="120" rx="18" ry="25" fill="#FFF8F8" transform="rotate(252 100 100)" />
          <ellipse cx="75" cy="95" rx="18" ry="25" fill="#FFF8F8" transform="rotate(324 100 100)" />
          
          {/* Center */}
          <circle cx="100" cy="100" r="15" fill="#FFF0F0" />
          <circle cx="100" cy="100" r="8" fill="#FFE8E8" />
        </g>
        
        {/* Soft glow */}
        <circle cx="100" cy="100" r="70" fill="url(#flowerGlow)" opacity="0.3" />
        
        <defs>
          <radialGradient id="flowerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Tulle Fabric SVG */}
      <svg
        ref={tulleRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0 }}
      >
        {/* Flowing tulle fabric */}
        <g opacity="0.9">
          {/* Main fabric waves */}
          <path
            d="M20 40 Q50 20 80 45 T140 35 T180 55"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M15 70 Q45 50 85 70 T145 60 T185 80"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M25 100 Q55 80 95 100 T155 90 T195 110"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M20 130 Q50 110 90 130 T150 120 T190 140"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M30 160 Q60 140 100 160 T160 150 T200 170"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Vertical draping lines */}
          <path d="M40 45 Q35 100 45 155" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M70 50 Q65 100 75 160" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M100 55 Q95 100 105 165" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M130 50 Q125 100 135 160" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M160 55 Q155 100 165 155" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
          
          {/* Sheer fabric overlay effect */}
          <ellipse cx="100" cy="100" rx="80" ry="60" fill="url(#tulleGradient)" opacity="0.2" />
        </g>
        
        <defs>
          <radialGradient id="tulleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* White Threads SVG */}
      <svg
        ref={threadsRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0 }}
      >
        {/* Dynamic floating threads */}
        <g opacity="0.9">
          {/* Long flowing threads */}
          <path
            d="M30 30 Q50 60 40 100 Q30 140 50 170"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M60 20 Q80 50 70 90 Q60 130 80 160"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M90 25 Q110 55 100 95 Q90 135 110 165"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M120 30 Q140 60 130 100 Q120 140 140 170"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M150 25 Q170 55 160 95 Q150 135 170 165"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Cross threads */}
          <path
            d="M45 50 Q75 70 105 55 Q135 40 165 60"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M35 90 Q65 110 95 95 Q125 80 155 100"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M50 130 Q80 150 110 135 Q140 120 170 140"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Small thread segments */}
          <line x1="25" y1="70" x2="45" y2="75" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="75" y1="45" x2="90" y2="50" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="115" y1="70" x2="130" y2="65" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="155" y1="85" x2="175" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="35" y1="145" x2="55" y2="150" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="95" y1="155" x2="115" y2="160" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="145" y1="145" x2="165" y2="150" stroke="white" strokeWidth="1" opacity="0.5" />
          
          {/* Thread knots/dots */}
          <circle cx="40" cy="100" r="3" fill="white" opacity="0.8" />
          <circle cx="100" cy="95" r="2.5" fill="white" opacity="0.8" />
          <circle cx="160" cy="95" r="3" fill="white" opacity="0.8" />
          <circle cx="70" cy="130" r="2" fill="white" opacity="0.6" />
          <circle cx="130" cy="135" r="2.5" fill="white" opacity="0.6" />
        </g>
        
        {/* Soft glow */}
        <circle cx="100" cy="100" r="60" fill="url(#threadGlow)" opacity="0.25" />
        
        <defs>
          <radialGradient id="threadGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
