export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "unqualified"
  | "converted";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export interface Opportunity {
  id: string;
  name: string;
  stage: "New" | "Qualified" | "Proposal" | "Won" | "Lost";
  amount?: number | null;
  accountName: string;
}
