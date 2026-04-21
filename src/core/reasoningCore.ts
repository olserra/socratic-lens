import type { AnalysisMode, ReasoningCategory, ReasoningItem } from "../types.js";

const RISK_HINTS = [
  "always",
  "never",
  "obvious",
  "everyone",
  "nobody",
  "certainly",
  "guaranteed",
  "without doubt",
  "clearly"
];

const ASSUMPTION_HINTS = [
  "if",
  "assuming",
  "likely",
  "probably",
  "might",
  "could",
  "depends",
  "estimate",
  "infer"
];

const FACT_HINTS = [
  "data",
  "study",
  "evidence",
  "measured",
  "observed",
  "source",
  "reported",
  "according to",
  "statistically"
];

function normalizeLine(line: string): string {
  return line
    .replace(/^[-*\d.)\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitReasoning(raw: string): string[] {
  return raw
    .split(/\n|(?<=[.!?])\s+/)
    .map(normalizeLine)
    .filter((line) => line.length > 20);
}

function containsAny(line: string, terms: string[]): boolean {
  const lower = line.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function classify(line: string): ReasoningItem {
  const lower = line.toLowerCase();
  const hasNumbers = /\d/.test(line);
  const hasCitationLike = /\b(doi|http|www\.|et al\.|\[[0-9]+\])\b/i.test(line);

  if (containsAny(lower, RISK_HINTS)) {
    return {
      category: "Potential Logical Risks",
      statement: line,
      confidence: "Low",
      rationale: "Contains absolute language or over-generalization that may hide weak logic."
    };
  }

  if (containsAny(lower, ASSUMPTION_HINTS)) {
    return {
      category: "Assumptions to Verify",
      statement: line,
      confidence: "Medium",
      rationale: "Includes uncertainty markers and requires validation with external checks."
    };
  }

  if (containsAny(lower, FACT_HINTS) || hasNumbers || hasCitationLike) {
    return {
      category: "Core Premises",
      statement: line,
      confidence: "High",
      rationale: "Appears evidence-oriented and structurally suitable as a premise."
    };
  }

  return {
    category: "Assumptions to Verify",
    statement: line,
    confidence: "Medium",
    rationale: "No explicit evidence signal; treated as a working assumption by default."
  };
}

function scoreForSorting(item: ReasoningItem, mode: AnalysisMode): number {
  if (mode === "risk_review") {
    if (item.category === "Potential Logical Risks") {
      return 1;
    }
    if (item.category === "Assumptions to Verify") {
      return 2;
    }
    return 3;
  }

  if (item.category === "Core Premises") {
    return 1;
  }
  if (item.category === "Assumptions to Verify") {
    return 2;
  }
  return 3;
}

function idPrefix(category: ReasoningCategory): "P" | "A" | "R" {
  if (category === "Core Premises") {
    return "P";
  }
  if (category === "Assumptions to Verify") {
    return "A";
  }
  return "R";
}

function assignRowIds(items: ReasoningItem[]): string[] {
  const counters: Record<"P" | "A" | "R", number> = { P: 0, A: 0, R: 0 };
  return items.map((item) => {
    const prefix = idPrefix(item.category);
    counters[prefix] += 1;
    return `${prefix}${counters[prefix]}`;
  });
}

function countByCategory(items: ReasoningItem[]): Record<ReasoningCategory, number> {
  return items.reduce<Record<ReasoningCategory, number>>(
    (acc, item) => {
      acc[item.category] += 1;
      return acc;
    },
    {
      "Core Premises": 0,
      "Assumptions to Verify": 0,
      "Potential Logical Risks": 0
    }
  );
}

export function analyzeReasoning(
  rawReasoning: string,
  mode: AnalysisMode = "explainability"
): ReasoningItem[] {
  const lines = splitReasoning(rawReasoning);

  if (lines.length === 0) {
    return [
      {
        category: "Assumptions to Verify",
        statement: "Insufficient structured reasoning content was provided.",
        confidence: "Medium",
        rationale: "Provide a richer thought trace to enable metacognitive categorization."
      }
    ];
  }

  return lines
    .map(classify)
    .sort((a, b) => scoreForSorting(a, mode) - scoreForSorting(b, mode));
}

export function renderMarkdownTable(
  items: ReasoningItem[],
  mode: AnalysisMode = "explainability"
): string {
  const header = [
    "| Category | Statement | Confidence | Why this label? |",
    "|---|---|---|---|"
  ];

  const categoryLabel: Record<ReasoningItem["category"], string> = {
    "Core Premises": "Core Premises",
    "Assumptions to Verify": "Assumptions to Verify",
    "Potential Logical Risks": "Potential Logical Risks"
  };

  const counts = countByCategory(items);
  const rowIds = assignRowIds(items);

  const rows = items.map((item, index) => {
    const safeStatement = item.statement.replace(/\|/g, "\\|").trim();
    const safeRationale = item.rationale.replace(/\|/g, "\\|").trim();
    const traceableStatement = `[${rowIds[index]}] ${safeStatement}`;
    return `| **${categoryLabel[item.category]}** | ${traceableStatement} | ${item.confidence} | ${safeRationale} |`;
  });

  const actionLines = rowIds.map((id) => {
    if (id.startsWith("P")) {
      return `- ACCEPT:${id}`;
    }
    if (id.startsWith("A")) {
      return `- VERIFY:${id}`;
    }
    return `- CHALLENGE:${id}`;
  });

  return [
    "# SocraticLens Analysis",
    "",
    "Structured metacognitive breakdown of the provided reasoning:",
    `Focus mode: **${mode === "risk_review" ? "Risk Review" : "Explainability Review"}**`,
    "",
    "## Summary",
    `- Core Premises: ${counts["Core Premises"]}`,
    `- Assumptions to Verify: ${counts["Assumptions to Verify"]}`,
    `- Potential Logical Risks: ${counts["Potential Logical Risks"]}`,
    "",
    ...header,
    ...rows,
    "",
    "## Action Protocol",
    "Use these action IDs to run human-in-the-loop interventions and follow-up decisions.",
    ...actionLines,
    "",
    "## Suggested Human Interventions",
    "1. Validate all Assumptions to Verify with concrete sources or experiments.",
    "2. Stress-test each Potential Logical Risks item with counter-examples.",
    "3. Confirm whether Core Premises remain valid under scope changes."
  ].join("\n");
}
