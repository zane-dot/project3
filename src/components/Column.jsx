import { Droppable } from '@hello-pangea/dnd';
import { AnimatePresence } from 'framer-motion';
import AddCardForm from './AddCardForm';
import TaskCard from './TaskCard';

export default function Column({ column, onAddCard, onDeleteCard }) {
  return (
    <div className="flex h-fit min-h-[480px] w-full max-w-sm flex-col rounded-2xl bg-white/90 p-4 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex min-h-[340px] flex-1 flex-col gap-3 rounded-xl p-2 transition ${
              snapshot.isDraggingOver ? 'bg-violet-500/10 ring-2 ring-violet-400/50' : 'bg-transparent'
            }`}
          >
            <AnimatePresence>
              {column.tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} onDelete={(taskId) => onDeleteCard(column.id, taskId)} />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCardForm onAdd={(payload) => onAddCard(column.id, payload)} />
    </div>
  );
}
