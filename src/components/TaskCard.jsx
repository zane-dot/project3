import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';

const priorityColor = {
  High: 'border-red-300 bg-red-100 text-red-700 dark:border-red-400/30 dark:bg-red-500/20 dark:text-red-300',
  Medium: 'border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/20 dark:text-amber-300',
  Low: 'border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/20 dark:text-emerald-300',
};

export default function TaskCard({ task, index, onDelete }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className={`rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition duration-200 dark:border-slate-600 dark:bg-slate-700 ${
            snapshot.isDragging ? 'scale-[1.02] shadow-2xl ring-2 ring-violet-400/70' : 'hover:shadow-lg'
          }`}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{task.title}</h4>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
            >
              Delete
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className={`rounded-md border px-2 py-1 text-xs font-medium ${priorityColor[task.priority]}`}>{task.priority}</span>
            {task.dueDate ? (
              <span className="text-xs text-slate-500 dark:text-slate-300">Due {task.dueDate}</span>
            ) : (
              <span className="text-xs text-slate-400 dark:text-slate-400">No due date</span>
            )}
          </div>
        </motion.div>
      )}
    </Draggable>
  );
}
