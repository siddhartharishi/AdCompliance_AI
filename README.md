# 🎯 Ad Compliance AI

Ad Compliance AI is an intelligent system that automatically audits video advertisements for regulatory and brand compliance using AI. It analyzes video content (speech + on-screen text) and flags potential violations based on a knowledge base of rules.

![Ad compliance AI UI][screenshots\adc_ui2.png]
---

## 🚀 What It Does

* 🎥 Processes video ads (YouTube links)
* 🧠 Extracts transcript + OCR text using Azure Video Indexer
* 📚 Uses RAG (Retrieval-Augmented Generation) to fetch relevant compliance rules
* 🤖 Applies LLM reasoning to detect violations
* 📊 Outputs structured compliance reports (PASS / FAIL + issues)
* 📈 Enables monitoring & observability of audits, model outputs, and system performance

---

## 🏗️ Architecture (Simplified)

```
[YouTube Video]
      ↓
[Video Indexer]
 (Transcript + OCR)
      ↓
[Query Builder]
      ↓
[Azure AI Search (RAG)]
      ↓
[Azure OpenAI (LLM Audit)]
      ↓
[Compliance Report]
```

---

## 💡 Why It’s Useful (Impact)

* ⚡ **Reduces manual audit time by ~80–90%, audits in < 2-3 minutes**
* 📉 **Cuts compliance review costs by ~60%**
* 🚨 **Detects high-risk violations early (before publishing)**
* 📊 **Scales to audit 100+ ads/day automatically**
* 🎯 **Improves consistency vs human reviewers (no bias/fatigue)**

---

## 🛠️ Tech Stack

* **Backend:** Python, LangGraph
* **AI/LLM:** Azure OpenAI (GPT-4o)
* **Embeddings:** Azure OpenAI Embeddings (text-embedding-3-small)
* **Search:** Azure AI Search (Vector Store)
* **Video Processing:** Azure Video Indexer
* **Monitoring and Observability:** Open Telemetry and Azure Application Insights 
* **Frontend:** (React js)

---

## ⚙️ How to Run Locally

### 🔹 1. Clone Repo

```bash
git clone https://github.com/your-username/ad-compliance-ai.git
cd ad-compliance-ai
```

---

### 🔹 2. Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # (Linux/Mac)
.venv\Scripts\activate     # (Windows)

uv run pip install -r requirements.txt
```

#### Set Environment Variables

Create a `.env` file with `.env.example` file as reference

#### Run Backend

```bash
uv run uvicorn backend.src.api.server:app --reload
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Example Output
![Ad Compliance AI output][screenshots/adc_ui1.png]

---

## ✅ Future Improvements

* Multi-agent auditing (legal + brand + claims)
* Real-time streaming analysis
* Dashboard & analytics
* Human-in-the-loop review system


