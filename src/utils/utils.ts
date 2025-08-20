import type { Filters } from "../hooks/useLeads";

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const sleep = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

export const getLS = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const setLS = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error setting localStorage key "${key}":`, err);
  }
};

export const statusColors: Record<Filters["status"], string> = {
  all: "text-gray-500",
  new: "text-cyan-400",
  contacted: "text-yellow-500",
  qualified: "text-green-400",
  unqualified: "text-red-500",
  converted: "text-green-600",
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-500";
  return "text-red-600";
};

export const stageColors: Record<string, string> = {
  new: "text-cyan-400",
  negotiation: "text-yellow-500",
  proposal: "text-green-400",
  won: "text-green-600",
  lost: "text-red-500",
};
