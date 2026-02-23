import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface PetalDecorationProps {
  className?: string;
  variant?: 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  opacity?: number;
}

export function PetalDecoration({
  className = '',
  variant = 'right',
  size = 400,
  opacity = 0.12,
}: PetalDecorationProps) {
  const petalRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (petalRef.current) {
      // Subtle parallax animation
      gsap.to(petalRef.current, {
        y: '+=15',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  const positionClasses = {
    left: '-left-48 top-1/2 -translate-y-1/2',
    right: '-right-48 top-1/2 -translate-y-1/2',
    'top-left': '-left-32 -top-32',
    'top-right': '-right-32 -top-32',
    'bottom-left': '-left-32 -bottom-32',
    'bottom-right': '-right-32 -bottom-32',
  };

  return (
    <svg
      ref={petalRef}
      className={`absolute pointer-events-none ${positionClasses[variant]} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M100 10C100 10 140 50 140 100C140 150 100 190 100 190C100 190 60 150 60 100C60 50 100 10 100 10Z"
        fill="white"
      />
      <path
        d="M100 30C100 30 125 60 125 95C125 130 100 160 100 160C100 160 75 130 75 95C75 60 100 30 100 30Z"
        fill="currentColor"
        className="text-rosewood/20"
      />
    </svg>
  );
}

export function PetalCluster({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <PetalDecoration variant="top-right" size={500} opacity={0.08} />
      <PetalDecoration variant="bottom-left" size={350} opacity={0.06} />
      <PetalDecoration variant="right" size={300} opacity={0.1} />
    </div>
  );
}
