import type { Lead } from "../types/types";
import { getScoreColor, statusColors } from "../utils/utils";

interface Props {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
}

export const LeadTable = ({ leads, onRowClick }: Props) => {
  if (!leads.length) {
    return (
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 border dark:border-gray-700 rounded-xl p-8">
        No leads found.
      </div>
    );
  }

  return (
    <div className="overflow-auto border dark:border-gray-700 rounded-xl shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {leads.map((l) => (
            <tr
              key={l.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onRowClick(l)}
            >
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {l.name}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                {l.company}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                {l.email}
              </td>
              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 capitalize">
                {l.source}
              </td>
              <td
                className={`px-4 py-3 text-center font-semibold ${getScoreColor(
                  l.score
                )}`}
              >
                {l.score}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${
                    statusColors[l.status]
                  }`}
                >
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
