export type ReasoningCategory =
  | "Core Premises"
  | "Assumptions to Verify"
  | "Potential Logical Risks";

export type AnalysisMode = "explainability" | "risk_review";

export interface ReasoningItem {
  category: ReasoningCategory;
  statement: string;
  confidence: "High" | "Medium" | "Low";
  rationale: string;
}
