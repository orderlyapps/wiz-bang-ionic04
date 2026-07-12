import { useEffect, useState } from "react";
import { breakpoints, type Breakpoint } from "./breakpoints";

function getCurrentBreakpoint(width: number): Breakpoint | "xs" {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
}

interface BreakpointState {
  width: number;
  breakpoint: Breakpoint | "xs";
  is_mobile: boolean;
  is_tablet: boolean;
  is_desktop: boolean;
}

function buildState(width: number): BreakpointState {
  return {
    width,
    breakpoint: getCurrentBreakpoint(width),
    is_mobile: width < breakpoints.md,
    is_tablet: width >= breakpoints.md && width < breakpoints.lg,
    is_desktop: width >= breakpoints.lg,
  };
}

const initial_width = typeof window === "undefined" ? 0 : window.innerWidth;

export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(() => buildState(initial_width));

  useEffect(() => {
    function handleResize() {
      setState(buildState(window.innerWidth));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state;
}
