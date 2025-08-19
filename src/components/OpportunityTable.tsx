import type { Opportunity } from "../types";

export const OpportunityTable = ({
  opportunities,
}: {
  opportunities: Opportunity[];
}) => {
  return (
    <div className="border rounded-xl shadow-sm overflow-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Opportunity</th>
            <th className="px-4 py-3 text-left">Account</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {opportunities.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No opportunities yet.
              </td>
            </tr>
          ) : (
            opportunities.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-medium">{o.name}</td>
                <td className="px-4 py-3">{o.accountName}</td>
                <td className="px-4 py-3 text-center">{o.stage}</td>
                <td className="px-4 py-3 text-right">{o.amount ?? "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
