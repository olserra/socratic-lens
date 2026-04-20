export type ReasoningCategory =
  | "Core Premises"
  | "Assumptions to Verify"
  | "Potential Logical Risks";

export interface ReasoningItem {
  category: ReasoningCategory;
  statement: string;
  confidence: "High" | "Medium" | "Low";
  rationale: string;
}
