import { useEffect, useMemo, useState } from "react";
import leadsData from "../data/leads.json";
import { sleep } from "../utils";
import type { Lead, Opportunity } from "../types";

export type SortKey = Extract<keyof Lead, "score" | "name" | "company">;
export type SortDir = "asc" | "desc";

export interface Filters {
  status: "all" | Lead["status"];
  search: string;
  sortKey: SortKey;
  sortDir: SortDir;
}

export const useLeads = (initialFilters: Filters) => {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [opps, setOpps] = useState<Opportunity[]>([]);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        await sleep(600);
        setAllLeads(leadsData as Lead[]);
      } catch {
        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  const filtered = useMemo(() => {
    let base = allLeads;

    if (filters.status !== "all") {
      base = base.filter((l) => l.status === filters.status);
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      base = base.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      );
    }

    const dir = filters.sortDir === "asc" ? 1 : -1;
    return [...base].sort((a, b) => {
      const key = filters.sortKey;
      const A = a[key];
      const B = b[key];

      if (A < B) return -1 * dir;
      if (A > B) return 1 * dir;
      return 0;
    });
  }, [allLeads, filters]);

  const saveLeadPatch = async (id: string, patch: Partial<Lead>) => {
    const prev = allLeads;
    const next = allLeads.map((l) => (l.id === id ? { ...l, ...patch } : l));
    setAllLeads(next);
    await sleep(500);

    const failed = Math.random() < 0.25;
    if (failed) {
      setAllLeads(prev);
      throw new Error("Failed to save.");
    }
  };

  const convertToOpportunity = async (
    leadId: string,
    amount?: number | null
  ) => {
    const lead = allLeads.find((l) => l.id === leadId);
    if (!lead) throw new Error("Lead not found.");

    const opp: Opportunity = {
      id: `OPP-${lead.id}`,
      name: lead.name,
      stage: "New",
      amount: amount ?? null,
      accountName: lead.company,
    };

    await saveLeadPatch(leadId, { status: "converted" });
    setOpps((o) => [opp, ...o]);

    return opp;
  };

  return {
    loading,
    error,
    leads: filtered,
    allLeads,
    setAllLeads,
    filters,
    setFilters,
    saveLeadPatch,
    opps,
    convertToOpportunity,
  };
};
