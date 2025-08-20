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

export type OpportunityStage = "negotiation" | "proposal" | "won" | "lost";

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number | null;
  accountName: string;
}
