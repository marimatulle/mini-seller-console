import { useEffect, useState } from "react";
import opportunitiesData from "../data/opportunities.json";
import type { Opportunity } from "../types/types";
import { sleep } from "../utils/utils";

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        setLoading(true);
        setError(null);
        await sleep(500);
        setOpportunities(opportunitiesData as Opportunity[]);
      } catch {
        setError("Failed to load opportunities.");
      } finally {
        setLoading(false);
      }
    };
    loadOpportunities();
  }, []);

  return { opportunities, loading, error, setOpportunities };
};
