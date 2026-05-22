export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
          AI Task Board ✦
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Powered by GPT · Built with React</p>
      </div>
      <button
        type="button"
        onClick={onToggleTheme}
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-lg shadow-sm transition hover:scale-105 hover:shadow-md dark:border-slate-600 dark:bg-slate-800"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
