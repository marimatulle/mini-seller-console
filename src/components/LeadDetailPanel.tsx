import { useEffect, useState } from "react";
import { isValidEmail } from "../utils/utils";
import type { Lead, Opportunity } from "../types/types";

interface Props {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: (id: string, patch: Partial<Lead>) => Promise<void>;
  onConvert: (id: string, amount?: number | null) => Promise<Opportunity>;
}

export const LeadDetailPanel = ({
  open,
  lead,
  onClose,
  onSave,
  onConvert,
}: Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Lead["status"]>("new");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
      setAmount("");
      setErr(null);
    }
  }, [lead]);

  if (!open || !lead) return null;

  const handleSave = async () => {
    setErr(null);
    if (!isValidEmail(email)) {
      setErr("Invalid email.");
      return;
    }
    setSaving(true);
    try {
      await onSave(lead.id, { email, status });
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error when saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleConvert = async () => {
    setErr(null);
    setSaving(true);
    try {
      const parsed = amount.trim() ? Number(amount) : null;
      if (parsed !== null && Number.isNaN(parsed)) {
        setErr("Invalid amount.");
      } else {
        await onConvert(lead.id, parsed);
        onClose();
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error when converting.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/60"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lead • {lead.name}</h2>
          <button
            className="text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {lead.company} • score {lead.score} • source {lead.source}
          </div>

          <label className="block">
            <span className="text-sm">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@company.com"
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-white border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </label>

          <label className="block">
            <span className="text-sm">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Lead["status"])}
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="qualified">qualified</option>
              <option value="unqualified">unqualified</option>
              <option value="converted">converted</option>
            </select>
          </label>

          <div className="pt-1 border-t border-gray-200 dark:border-gray-700" />

          <label className="block">
            <span className="text-sm">Convert • Amount (optional)</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="ex: 15000"
              inputMode="numeric"
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-white border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </label>
        </div>

        {err && <div className="text-sm text-red-600">{err}</div>}

        <div className="mt-auto flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-2 rounded-xl bg-gray-900 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            disabled={saving}
            className="px-3 py-2 rounded-xl border bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConvert}
            disabled={saving || status === "converted"}
            className="ml-auto px-3 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-60"
          >
            {saving ? "Converting..." : "Convert Lead"}
          </button>
        </div>
      </div>
    </div>
  );
};
