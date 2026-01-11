# Adaptive Fitness Companion Chatbot

A mobile-first AI-powered fitness companion built using **React Native (Expo)** and **Node.js**, designed to provide **adaptive, behavior-aware fitness guidance** based on user personality, app usage duration, and lifestyle context.

> ⚠️ This application is **not a medical tool** and does not provide advice related to injuries, diseases, medications, or supplements.

---

## Problem Statement

The goal of this project is to design an AI fitness chatbot that goes beyond answering questions and instead **adapts its tone, structure, and guidance** based on:

* User personality
* How long the user has been using the app
* Basic lifestyle context (movement & sleep)

The focus is on **AI behavior design, UX empathy, and responsible prompt composition**, not just API integration.

---

## Objectives Achieved

This project demonstrates:

* Strong **React Native UI/UX** skills
* Conversational AI integration with **LLM APIs**
* Thoughtful **behavior-aware product design**
* Clean **prompt architecture**
* Responsible **safety guardrails** for health-related topics

---

## 🧱 Tech Stack

### Frontend

* React Native (Expo – Managed Workflow)
* Expo Router
* AsyncStorage (local persistence)

### Backend

* Node.js + Express
* SQLite (chat history storage)

### AI

* LLM API (Groq / OpenAI-compatible interface)
* Prompt-based behavior control

---

## ✨ Core Features

### 1️⃣ Welcome / Home Screen

* Clear explanation of what the chatbot **can** and **cannot** do
* Medical disclaimer
* Primary CTA: **“Start Chat”**

---

### 2️⃣ Chat Screen

* Input bar for fitness-related queries
* Chat UI:

  * User messages → right aligned
  * AI responses → left aligned
* Loading states and graceful error handling

Example queries:

* “Create a beginner workout plan for 3 days a week”
* “What are good warm-up exercises before running?”
* “How can I stay consistent with workouts?”

---

### 3️⃣ Structured AI Responses

AI responses are **structured and readable**, using:

* Bullet points
* Day-wise workout breakdowns
* Clear sections instead of plain text blobs

---

## 🧠 Adaptive AI Behavior (CORE FEATURE)

### 5.1 Personality-Based Behavior

The chatbot supports **three predefined personalities**:

| Personality          | Behavior                                     |
| -------------------- | -------------------------------------------- |
| Encouragement Seeker | Empathetic, reassuring, gentle nudges        |
| Creative Explorer    | Playful, metaphor-driven, non-linear         |
| Goal Finisher        | Structured, checklist-based, action-oriented |

👉 For demo clarity, personality can be switched via UI buttons.

---

### 5.2 Usage Duration–Based Coaching

AI behavior adapts based on how long the user has used the app:

| Days Using App | AI Behavior                                          |
| -------------- | ---------------------------------------------------- |
| 0–3 days       | Empathetic, allows venting, avoids instant solutions |
| 4–8 days       | Friendly listener, short suggestions after context   |
| 9+ days        | Coach-like, direct actionable guidance               |

Usage duration is calculated using **persistent local storage** (first app launch date).

---

### 5.3 Lifestyle Context (Dummy Data)

Each request includes mock lifestyle data:

```json
{
  "steps": 4200,
  "exerciseMinutes": 25,
  "sleepHours": 5.5
}
```

This context subtly influences AI responses (e.g., recovery emphasis for low sleep).

---

### 5.4 Prompt Composition Strategy

Every AI request combines:

```
User Personality
+ Usage Duration Rules
+ Lifestyle Context (steps, exercise, sleep)
+ User Question
```

Prompt composition is centralized in a dedicated prompt builder to ensure:

* Clean architecture
* Consistent behavior
* Easy extensibility

---

## 🛑 Safety & Scope Guardrails

The chatbot **politely refuses** to answer questions involving:

* Injuries
* Diseases
* Medication or supplements

In such cases, it:

* Clearly states it is **not a medical professional**
* Suggests consulting a certified healthcare provider

This behavior is demonstrated explicitly in the demo video.

---

## ⭐ Bonus Features Implemented

✔ **Coin-Based Reward System**

* Users earn **1 coin per prompt**
* Coins persist across sessions using local storage

✔ **RAG-lite FAQ Enrichment**

* Curated fitness FAQs stored locally in JSON
* Relevant FAQs are injected into prompts when applicable

✔ **Chat History Screen**

* Displays the last **5–10 conversations**
* Stored in SQLite and fetched via backend API

✔ **Theming & Branding**

* Clean typography
* Consistent color palette
* Mobile-first design with subtle animations

---

## 🎥 Demo Video

[Click here to watch the demo video](https://drive.google.com/file/d/1Z9ZQ5VEah1T_Ryg7HpAYlzJ9LRNIxOe-/view?usp=sharing)

### Demo Highlights:

* Welcome screen & disclaimer
* Chat interaction
* Personality-based behavior (same question, different tones)
* Usage-duration adaptation
* Structured AI responses
* Safety refusal example
* Bonus features (coins & history)

### 🔁 Note on Demo Design

The **same question is intentionally reused** across personalities to clearly demonstrate **tone and guidance adaptation**.
Personality toggles are used for demo purposes, as waiting multiple days is impractical in a screening assignment.

---

## ▶️ Running the Project

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npx expo start
```

---

## 📦 Android App Bundle (AAB)

[Download Android AAB](https://expo.dev/artifacts/eas/eeZ6LvBHJU2DbsqnjTEqTs.aab)

---

## 📌 Final Notes

* No medical advice is provided
* All AI behavior shown is real model output, not hardcoded
* The project strictly follows the provided starter template and tech constraints

