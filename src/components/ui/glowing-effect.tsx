"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Global pointer tracker to avoid multiple listeners
let globalPointer = { x: 0, y: 0 };
const subscribers = new Set<(pos: { x: number; y: number }) => void>();

let isTicking = false;
if (typeof window !== "undefined") {
  const handlePointerMove = (e: PointerEvent) => {
    globalPointer = { x: e.clientX, y: e.clientY };
    if (!isTicking) {
      requestAnimationFrame(() => {
        subscribers.forEach((fn) => fn(globalPointer));
        isTicking = false;
      });
      isTicking = true;
    }
  };
  document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
}

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  borderRadius?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    borderRadius = 0,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const lastRect = useRef<{ rect: DOMRect; time: number } | null>(null);
    const isVisible = useRef(false);

    // Track visibility to skip calculations
    useEffect(() => {
      if (!containerRef.current || disabled) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible.current = entry.isIntersecting;
        },
        { threshold: 0 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [disabled]);

      const updatePosition = useCallback(
      (pos: { x: number; y: number }) => {
        if (!isVisible.current || !containerRef.current || disabled) return;

        const element = containerRef.current;
        const now = Date.now();
        
        // Use a cached rect, update only every 500ms or so unless window size changes
        // This dramatically reduces getBoundingClientRect calls
        if (!lastRect.current || now - lastRect.current.time > 500) {
          lastRect.current = { rect: element.getBoundingClientRect(), time: now };
        }

        const { left, top, width, height } = lastRect.current.rect;
        // Optimization: early escape if far away (using screen coordinates is faster)
        const mouseX = pos.x;
        const mouseY = pos.y;

        // Proximity check - if mouse is very far from the element's bounding box, just hide it
        const margin = proximity + 50;
        const isFar = mouseX < left - margin || mouseX > left + width + margin || 
                      mouseY < top - margin || mouseY > top + height + margin;
        
        if (isFar) {
           if (element.getAttribute('data-active') !== '0') {
             element.style.setProperty("--active", "0");
             element.setAttribute('data-active', '0');
           }
           return;
        }

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(
          mouseX - center[0],
          mouseY - center[1]
        );
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          if (element.getAttribute('data-active') !== '0') {
            element.style.setProperty("--active", "0");
            element.setAttribute('data-active', '0');
          }
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        const activeStr = isActive ? "1" : "0";
        if (element.getAttribute('data-active') !== activeStr) {
          element.style.setProperty("--active", activeStr);
          element.setAttribute('data-active', activeStr);
        }

        if (!isActive) return;

        let targetAngle =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
            Math.PI +
          90;

        // Only update if angle changed by more than 1 degree to avoid micro-repaints
        const lastAngle = element.getAttribute('data-angle');
        if (!lastAngle || Math.abs(Number(lastAngle) - targetAngle) > 1) {
          element.style.setProperty("--start", String(targetAngle));
          element.setAttribute('data-angle', String(targetAngle));
        }
      },
      [inactiveZone, proximity, disabled]
    );

    useEffect(() => {
      if (disabled) return;

      subscribers.add(updatePosition);
      // Run once to initialize
      updatePosition(globalPointer);

      return () => {
        subscribers.delete(updatePosition);
      };
    }, [updatePosition, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[var(--glowing-radius)] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--glowing-radius": `${borderRadius}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #a213da 10%, #a213da00 20%),
                radial-gradient(circle at 40% 40%, #ff0055 5%, #ff005500 15%),
                radial-gradient(circle at 60% 60%, #a213da 10%, #a213da00 20%), 
                radial-gradient(circle at 40% 60%, #ff0055 10%, #ff005500 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #a213da 0%,
                  #ff0055 calc(25% / var(--repeating-conic-gradient-times)),
                  #a213da calc(50% / var(--repeating-conic-gradient-times)), 
                  #ff0055 calc(75% / var(--repeating-conic-gradient-times)),
                  #a213da calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[var(--glowing-radius)] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[var(--glowing-radius)]",
              'after:content-[""] after:rounded-[var(--glowing-radius)] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
