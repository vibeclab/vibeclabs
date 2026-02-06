'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectMetadata {
  status: string;
  role?: string;
  techStack: string[];
}

interface LabProjectProps {
  title: string;
  subtitle: string;
  summary: string;
  metadata: ProjectMetadata;
  icon: LucideIcon;
  reverseLayout?: boolean;
}

export default function LabProject({
  title,
  subtitle,
  summary,
  metadata,
  icon: Icon,
  reverseLayout = false,
}: LabProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !previewRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        clipPath: 'inset(100% 0% 0% 0%)',
      });

      // Preview fade in
      gsap.from(previewRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.95,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-16 lg:py-24">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
          reverseLayout ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Content Column */}
        <div
          ref={textRef}
          className={`lg:col-span-7 flex flex-col gap-6 ${
            reverseLayout ? 'lg:col-start-6' : 'lg:col-start-1'
          }`}
        >
          {/* Title & Subtitle */}
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter text-neutral-300 uppercase">
              {title}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/50">{subtitle}</p>
          </div>

          {/* Summary */}
          <p className="text-lg text-gray-400 leading-relaxed">{summary}</p>

          {/* Metadata Sidebar */}
          <div className="flex flex-col gap-4 mt-4">
            {/* Status */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/50">
                Status
              </span>
              <span className="text-sm font-mono text-neutral-300">{metadata.status}</span>
            </div>

            {/* Role (if provided) */}
            {metadata.role && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/50">
                  Role
                </span>
                <span className="text-sm font-mono text-neutral-300">{metadata.role}</span>
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/50">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {metadata.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono bg-accent/10 border border-accent/30 rounded text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div
          ref={previewRef}
          className={`lg:col-span-5 ${
            reverseLayout ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
          }`}
        >
          <div className="glass-container group relative aspect-[4/3] overflow-hidden rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.3)]">
            {/* Grid Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon
                size={64}
                className="text-accent/40 transition-all duration-500 group-hover:text-accent/60 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
