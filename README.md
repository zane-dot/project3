# AI Task Board ✦

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-10A37F)

A polished AI-powered Kanban board that decomposes goals into actionable tasks.

### Highlights
- AI-assisted task decomposition with safe fallback for demo reliability
- Drag-and-drop Todo / In Progress / Done workflow with smooth interactions
- Dark/Light theme persistence and localStorage-based board state

## ✨ Features
- Kanban board with three columns and free drag-and-drop between columns
- AI input area to convert goals into 3–6 subtasks
- Task cards with title, priority, optional due date, and delete action
- Per-column “＋ Add Card” form
- Animated card transitions and button hover micro-interactions
- Theme toggle (🌙/☀️) with persisted preference

## 🛠 Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Drag & Drop | @hello-pangea/dnd |
| AI | OpenAI Node SDK (`gpt-4o-mini`) |
| Persistence | localStorage |

## 🚀 Quick Start
```bash
git clone https://github.com/zane-dot/project3.git
cd project3
npm install
cp .env.example .env
# Fill in VITE_OPENAI_API_KEY in .env
npm run dev
```

## 📸 Screenshots
- Add your dark mode and light mode board screenshots here.

## 🤖 AI Feature
The app calls OpenAI with your goal prompt and requests 3–6 concise subtasks. If API key/config/network fails, it automatically falls back to 3 `[Demo]` tasks so demos never break.

## 📄 License
MIT
