import { useEffect, useMemo, useState } from "react";
import { LeadTable } from "./components/LeadTable";
import { LeadDetailPanel } from "./components/LeadDetailPanel";
import { OpportunityTable } from "./components/OpportunityTable";
import { getLS, setLS } from "./utils/utils";
import { useDarkMode } from "./hooks/useDarkMode";
import {
  type Filters,
  type SortDir,
  type SortKey,
  useLeads,
} from "./hooks/useLeads";
import { useOpportunities } from "./hooks/useOpportunities";
import { Moon, Sun } from "lucide-react";
import type { Lead, Opportunity } from "./types/types";

const LS_KEY = "mini-seller-console/filters";

export const App = () => {
  const { enabled: darkMode, toggle } = useDarkMode();
  const initialFilters = getLS<Filters>(LS_KEY, {
    status: "all",
    search: "",
    sortKey: "score",
    sortDir: "desc",
  });

  const {
    loading,
    error,
    leads,
    saveLeadPatch,
    convertToOpportunity,
    filters,
    setFilters,
  } = useLeads(initialFilters);

  const { opportunities, setOpportunities } = useOpportunities();

  useEffect(() => {
    setLS(LS_KEY, filters);
  }, [filters]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Lead | null>(null);

  const openDetail = (lead: Lead) => {
    setSelected(lead);
    setDetailOpen(true);
  };

  const toggleSort = (key: SortKey) => {
    setFilters((f) => {
      const dir: SortDir =
        f.sortKey === key ? (f.sortDir === "asc" ? "desc" : "asc") : "desc";
      return { ...f, sortKey: key, sortDir: dir };
    });
  };

  const sortLabel = useMemo(
    () => `${filters.sortKey} ${filters.sortDir}`,
    [filters.sortKey, filters.sortDir]
  );

  const handleConvert = async (
    leadId: string,
    amount?: number | null
  ): Promise<Opportunity> => {
    const opp = await convertToOpportunity(leadId, amount);
    setOpportunities((prev) => [opp, ...prev]);
    return opp;
  };

  return (
    <div className="min-h-dvh bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-indigo-400">
            Mini Seller Console
          </h1>
          <button
            onClick={toggle}
            className="p-2 rounded-full border bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            placeholder="Search by name or company"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border rounded-xl px-3 py-2 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          />
          <select
            value={filters.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilters({
                ...filters,
                status: e.target.value as Filters["status"],
              })
            }
            className="border rounded-xl px-3 py-2 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          >
            <option value="all">All status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="unqualified">Unqualified</option>
            <option value="converted">Converted</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSort("score")}
              className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 w-full sm:w-auto"
            >
              Sort by score ({sortLabel})
            </button>
            <button
              onClick={() => toggleSort("name")}
              className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 hidden sm:block"
            >
              Name
            </button>
            <button
              onClick={() => toggleSort("company")}
              className="px-3 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 hidden sm:block"
            >
              Company
            </button>
          </div>
        </div>

        {loading && (
          <div className="border rounded-xl p-6 bg-white text-sm text-gray-500">
            Loading leads…
          </div>
        )}
        {error && (
          <div className="border rounded-xl p-6 bg-red-50 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-indigo-400">Leads</h2>
              <LeadTable leads={leads} onRowClick={openDetail} />
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-indigo-400">
                Opportunities
              </h2>
              <OpportunityTable opportunities={opportunities} />
            </section>
          </>
        )}
      </div>

      <LeadDetailPanel
        open={detailOpen}
        lead={selected}
        onClose={() => setDetailOpen(false)}
        onSave={saveLeadPatch}
        onConvert={handleConvert}
      />
    </div>
  );
};
