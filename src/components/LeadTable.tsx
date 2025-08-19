import type { Lead } from "../types";

interface Props {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
}

export const LeadTable = ({ leads, onRowClick }: Props) => {
  if (!leads.length) {
    return (
      <div className="text-center text-sm text-gray-500 border rounded-xl p-8">
        No leads found.
      </div>
    );
  }

  return (
    <div className="overflow-auto border rounded-xl shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((l) => (
            <tr
              key={l.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick(l)}
            >
              <td className="px-4 py-3 font-medium">{l.name}</td>
              <td className="px-4 py-3">{l.company}</td>
              <td className="px-4 py-3">{l.email}</td>
              <td className="px-4 py-3 text-center">{l.source}</td>
              <td className="px-4 py-3 text-center font-semibold">{l.score}</td>
              <td className="px-4 py-3 text-center">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
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
