# Adaptive Fitness Companion Chatbot

**React Native (Expo) + Node.js + LLM API**

---

## 1. Overview

The **Adaptive Fitness Companion Chatbot** is a mobile-first AI-powered fitness assistant designed to provide **personalized, behavior-aware fitness guidance**.

Unlike a simple Q&A bot, this application dynamically adapts:

* Its **tone**
* Its **structure**
* Its **coaching style**

based on:

* User personality
* App usage duration
* Basic lifestyle context (movement & sleep)

⚠️ This app is **not a medical tool** and intentionally avoids providing medical, injury-related, or medication advice.

---

## 2. Problem Statement

The goal of this project is to design and build a fitness chatbot that demonstrates:

* Strong **React Native UI/UX**
* Thoughtful **AI behavior design**
* Clean **prompt composition**
* Responsible **health-related scope handling**

The core challenge is not answering fitness questions, but **adapting AI behavior** to different user contexts in a safe, empathetic, and structured manner.

---

## 3. Tech Stack

### Frontend

* **React Native**
* **Expo (Managed Workflow)**
* Expo Router
* AsyncStorage (local persistence)

### Backend

* **Node.js (v20.x LTS)**
* **Express**
* SQLite (for chat history storage)

### AI

* LLM API (Chat Completion style)
* Custom prompt composition logic (system-level prompts)

---

## 4. Core Features

### 4.1 Welcome / Home Screen

* Introduces what the chatbot **can** and **cannot** help with
* Clear disclaimer against medical advice
* Primary CTA: **“Start Chat”**

---

### 4.2 Chat Screen

* Chat-style UI:

  * User messages → right aligned
  * AI messages → left aligned
* Input bar with send button
* Loading indicators & error handling
* Structured AI responses using:

  * Bullet points
  * Sections
  * Actionable steps

---

### 4.3 Structured AI Responses

AI responses are never returned as a plain text blob.
They are formatted using:

* Bullet-point guidance
* Step-wise plans
* Clear sections (especially for goal-focused users)

---

## 5. Adaptive AI Behavior (Core Feature)

### 5.1 Personality-Based Behavior

The chatbot supports **three predefined personalities**:

| Personality              | Traits                                         |
| ------------------------ | ---------------------------------------------- |
| **Encouragement Seeker** | Needs reassurance, gentle motivation           |
| **Creative Explorer**    | Prefers creative framing, avoids spoon-feeding |
| **Goal Finisher**        | Wants structure, checklists, actionable steps  |

Personality can be toggled in-app for demo purposes.

---

### 5.2 Usage Duration–Based Coaching Style

The AI adjusts tone based on how long the user has been using the app:

| Days Using App | AI Behavior                                           |
| -------------- | ----------------------------------------------------- |
| **0–3 days**   | Empathetic, allows venting, avoids unsolicited advice |
| **4–8 days**   | Friendly listener, short suggestions after context    |
| **9+ days**    | Coach-like, direct actionable guidance                |

Usage duration is calculated using **AsyncStorage** based on first app launch date.

---

### 5.3 Lifestyle Context (Dummy Data)

Each AI response considers mock lifestyle data:

```json
{
  "steps": 4200,
  "exerciseMinutes": 25,
  "sleepHours": 5.5
}
```

This data is included in prompt composition to influence AI tone and recommendations.

---

## 6. Prompt Composition Strategy

Every AI request combines **five layers of context**:

1. **User Personality**
2. **Usage Duration Behavior**
3. **Movement Data (steps, exercise minutes)**
4. **Sleep Data**
5. **User’s Question**

### Example (Conceptual)

```
SYSTEM PROMPT:
- Personality rules
- Usage duration rules
- Safety constraints
- Lifestyle context

USER MESSAGE:
"How can I stay consistent with workouts?"
```

This ensures responses are:

* Context-aware
* Behaviorally consistent
* Safe and structured

---

## 7. Safety & Scope Guardrails

The chatbot **explicitly refuses** to answer questions involving:

* Diseases (e.g., diabetes, heart disease)
* Injuries (e.g., fractures, ligament tears)
* Medication or supplements

### Handling Strategy

* Keyword-based checks on the backend
* Polite refusal response
* Suggestion to consult a certified professional

Example refusal response:

> “I can’t help with medical or injury-related advice. Please consult a certified healthcare professional.”

---

## 8. Bonus Enhancements Implemented

### 🪙 Coin-Based Reward System

* Users earn **1 coin per message**
* Coins are stored using AsyncStorage
* Displayed persistently in the chat header

---

### 📚 RAG-lite (FAQ Prompt Enrichment)

* Curated local JSON of fitness FAQs
* Relevant FAQs are injected into the prompt when applicable
* Helps guide AI responses without external retrieval systems

---

### 🕘 Chat History Screen

* Displays last **5–10 chat messages**
* Stored using SQLite on backend
* Retrieved via `/history` API

---

### 🎨 Theming & Branding

* Clean typography
* Soft, fitness-friendly color palette
* Thoughtful spacing and layout
* Platform-consistent UI

---

## 9. Running the Project

### Install dependencies

```bash
npm install
```

### Start backend

```bash
node backend/index.js
```

### Start Expo app

```bash
npx expo start
```

> For physical devices, ensure backend runs on the same local network and the correct local IP is used.

---

## 10. Folder Structure (High Level)

```
/app
  /(tabs)
    index.tsx        → Home screen
    chat.tsx         → Chat screen
    history.tsx      → Chat history
/backend
  index.js           → Express server
  db.js              → SQLite setup
  utils/promptBuilder.js
/constants
  lifestyle.ts
  personality.ts
  fitnessFAQ.ts
```

---

## 11. AI Tools Used

* LLM API (Chat Completion style)
* Custom system prompts
* No auto-generated answers without prompt constraints

---

## 12. Demo & Evaluation Notes

This project focuses on:

* **AI behavior design**
* **UX empathy**
* **Safety-first fitness guidance**
* **Clean architecture**

It intentionally avoids being a medical or diagnostic tool.

---

## 13. Final Note

This submission prioritizes **intelligent experience design**, not just API calls.
Every feature is built to demonstrate how AI systems should adapt to **real human behavior**, especially in sensitive domains like fitness and wellness.
