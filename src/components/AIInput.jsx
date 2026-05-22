import { useState } from 'react';

export default function AIInput({ loading, onSubmit }) {
  const [goal, setGoal] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!goal.trim()) return;
    await onSubmit(goal);
    setGoal('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-fuchsia-500/20 p-[1px] shadow-lg"
    >
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 dark:bg-slate-800 sm:flex-row">
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Describe your goal, AI will break it into tasks..."
          className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none ring-violet-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Generating...' : '✦ AI 拆解'}
        </button>
      </div>
    </form>
  );
}
