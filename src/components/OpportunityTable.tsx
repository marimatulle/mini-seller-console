import type { Opportunity } from "../types/types";
import { stageColors } from "../utils/utils";

export const OpportunityTable = ({
  opportunities,
}: {
  opportunities: Opportunity[];
}) => {
  return (
    <div className="border dark:border-gray-700 rounded-xl shadow-sm overflow-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3 text-left">Opportunity</th>
            <th className="px-4 py-3 text-left">Account</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {opportunities.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
              >
                No opportunities yet.
              </td>
            </tr>
          ) : (
            opportunities.map((o) => (
              <tr
                key={o.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {o.name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {o.accountName}
                </td>
                <td
                  className={`px-4 py-3 text-center font-medium capitalize ${
                    stageColors[o.stage]
                  }`}
                >
                  {o.stage}
                </td>
                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                  {o.amount ?? "—"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
