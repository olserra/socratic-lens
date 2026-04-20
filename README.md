Este README foi desenhado para posicionar o projeto como algo **sério, científico e de alta utilidade**. Ele foca na **Metacognição** e na **Interpretabilidade**, os termos que atraem tanto investidores como orientadores de doutoramento.

---

# `README.md`

# SocraticLens-MCP 🔍
### The Metacognitive Layer for Human-AI Collaboration

**SocraticLens** is an open-source MCP (Model Context Protocol) server designed to combat "Cognitive Atrophy" by transforming raw, opaque AI reasoning into a structured, auditable, and metacognitive framework.

Built for **Claude Desktop**, SocraticLens acts as a "Socratic Mirror," forcing the AI to categorize its own thoughts into **Premises, Uncertainties, and Logical Leaps** before delivering a final answer.

---

## 🧠 Why SocraticLens?

As LLMs become more autonomous (e.g., Claude 3.5/4, OpenAI o1), the gap between "AI Thinking" and "Human Understanding" is widening.
* **The Problem:** Users tend to accept AI outputs passively, leading to cognitive atrophy and undetected hallucinations.
* **The Solution:** A syntax of transparency. SocraticLens parses raw "Chain-of-Thought" (CoT) data and re-renders it into a high-signal dashboard, keeping the human **meaningfully in the loop**.

---

## ✨ Key Features

* **Logic Parsing:** Automatically strips verbal "fluff" from AI reasoning.
* **Metacognitive Labeling:** Categorizes thoughts into:
    * 🔵 **Verified Fact:** Data points with high-confidence sources.
    * 🟡 **Assumption:** Necessary leaps that require human validation.
    * 🔴 **Risk Zone:** Potential hallucinations or weak logical connections.
* **Active Intervention:** Enables users to spot and correct a logic branch *before* the final output is generated.
* **Minimalist UI:** Designed for high-performance professionals (Executives, Researchers, Engineers) who value clarity over noise.

---

## 🛠 Technical Architecture

SocraticLens is built on the **Model Context Protocol (MCP)**, allowing it to integrate directly with the Claude Desktop app.

* **Runtime:** Node.js / TypeScript
* **Protocol:** MCP (Model Context Protocol)
* **Engine:** Socratic Syntax Parser (extracts structural intent from unstructured CoT)

---

## 🚀 Quick Start

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/socratic-lens-mcp.git
cd socratic-lens-mcp
npm install
npm run build
```

### 2. Configure Claude Desktop
Add the server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "socratic-lens": {
      "command": "node",
      "args": ["/path/to/socratic-lens-mcp/build/index.js"]
    }
  }
}
```

### 3. Usage
Ask Claude a complex problem and trigger the lens:
*"Analyze the impact of [X] using SocraticLens."*

---

## 🎓 Academic & Scientific Context

This project is part of a PhD research initiative focused on **Human-Centric AI and Cognitive Sovereignty**. We are exploring how the spatial and structural externalization of AI reasoning impacts:
1.  **Trust Calibration:** Do users trust AI more or less when they see the "sausage being made"?
2.  **Error Detection:** Does structured text improve the rate of human-led hallucination spotting?
3.  **Agency:** Does metacognitive feedback prevent the loss of critical thinking skills in high-stakes environments?

---

## 🤝 Contributing

We welcome contributions from Cognitive Scientists, UX Designers, and AI Engineers. This is an **Open Core** project—we believe the syntax of transparency should be a public good.

---

## 📄 License

MIT License.

---

## ✉️ Contact & Research Collaboration

**[Seu Nome]**
*Ex-Head of AI | PhD Researcher | Specialist in Human-AI Interaction*
[Link para LinkedIn/Site]

---

### Próximo Passo:
Agora, podes copiar este conteúdo para o teu GitHub e, em seguida, passar o seguinte prompt para o teu agente de código (Copilot/Cursor):

> "Using the MCP TypeScript SDK, create a server that implements a tool called `analyze_reasoning`. This tool should take a raw string of text (the AI's thought process) and use a structured template to return a Markdown Table. The table must categorize the input into: 'Core Premises', 'Assumptions to Verify', and 'Potential Logical Risks'. Ensure the output is formatted for optimal readability in the Claude Desktop Artifacts window."
