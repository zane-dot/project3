import { useState } from 'react';

const defaultState = { title: '', priority: 'Medium', dueDate: '' };

export default function AddCardForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    onAdd(form);
    setForm(defaultState);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-lg border border-dashed border-violet-400/50 px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-500/10"
      >
        ＋ Add Card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-700/70">
      <input
        value={form.title}
        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        placeholder="Task title"
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-500 dark:bg-slate-800"
      />
      <div className="grid grid-cols-2 gap-2">
        <select
          value={form.priority}
          onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
          className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none dark:border-slate-500 dark:bg-slate-800"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
          className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none dark:border-slate-500 dark:bg-slate-800"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600"
        >
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-500">
          Add
        </button>
      </div>
    </form>
  );
}
