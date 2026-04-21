import assert from "node:assert/strict";
import test from "node:test";
import { analyzeReasoning, renderMarkdownTable } from "./reasoningCore.js";

test("classifies absolute-language sentence as Potential Logical Risks", () => {
  const items = analyzeReasoning(
    "Everyone will certainly adopt this change immediately, so failures are impossible."
  );

  assert.equal(items[0]?.category, "Potential Logical Risks");
});

test("risk_review ordering puts risk items before premises", () => {
  const items = analyzeReasoning(
    "Data from 2024 shows a 17% increase in retention. Everyone will obviously continue this trend forever.",
    "risk_review"
  );

  assert.equal(items[0]?.category, "Potential Logical Risks");
});

test("renderMarkdownTable includes Action Protocol tokens", () => {
  const items = analyzeReasoning(
    "Everyone will certainly benefit. If adoption stalls, we might need additional support.",
    "risk_review"
  );
  const markdown = renderMarkdownTable(items, "risk_review");

  assert.ok(markdown.includes("## Action Protocol"));
  assert.ok(markdown.includes("CHALLENGE:R1"));
});
