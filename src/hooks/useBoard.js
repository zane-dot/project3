import { useEffect, useMemo, useState } from 'react';
import { decomposeGoalToTasks } from '../utils/openai';
import { BOARD_STORAGE_KEY, loadFromStorage, saveToStorage } from '../utils/storage';

const initialData = {
  columns: {
    'col-1': { id: 'col-1', title: 'Todo', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
    'col-3': { id: 'col-3', title: 'Done', taskIds: ['task-4'] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3'],
  tasks: {
    'task-1': { id: 'task-1', title: 'Design landing page wireframe', priority: 'High', dueDate: '2026-06-01' },
    'task-2': { id: 'task-2', title: 'Set up React + Vite project', priority: 'Medium', dueDate: '2026-05-25' },
    'task-3': { id: 'task-3', title: 'Implement drag and drop', priority: 'High', dueDate: '2026-05-28' },
    'task-4': { id: 'task-4', title: 'Configure Tailwind CSS', priority: 'Low', dueDate: '2026-05-22' },
  },
};

const makeTaskId = () => `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const useBoard = () => {
  const [board, setBoard] = useState(() => loadFromStorage(BOARD_STORAGE_KEY) ?? initialData);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    saveToStorage(BOARD_STORAGE_KEY, board);
  }, [board]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Handle reordering inside the same column by moving the dragged task ID.
    if (destination.droppableId === source.droppableId) {
      const column = board.columns[source.droppableId];
      const nextTaskIds = [...column.taskIds];
      nextTaskIds.splice(source.index, 1);
      nextTaskIds.splice(destination.index, 0, draggableId);

      setBoard((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [column.id]: { ...column, taskIds: nextTaskIds },
        },
      }));
      return;
    }

    // Handle movement across columns by removing from source and inserting into destination.
    const sourceColumn = board.columns[source.droppableId];
    const destinationColumn = board.columns[destination.droppableId];
    const sourceTaskIds = [...sourceColumn.taskIds];
    const destinationTaskIds = [...destinationColumn.taskIds];

    sourceTaskIds.splice(source.index, 1);
    destinationTaskIds.splice(destination.index, 0, draggableId);

    setBoard((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [sourceColumn.id]: { ...sourceColumn, taskIds: sourceTaskIds },
        [destinationColumn.id]: { ...destinationColumn, taskIds: destinationTaskIds },
      },
    }));
  };

  const addCard = (columnId, payload) => {
    const id = makeTaskId();
    const newTask = {
      id,
      title: payload.title.trim(),
      priority: payload.priority,
      dueDate: payload.dueDate || '',
    };

    setBoard((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: newTask,
      },
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          taskIds: [...prev.columns[columnId].taskIds, id],
        },
      },
    }));
  };

  const deleteCard = (columnId, taskId) => {
    setBoard((prev) => {
      const nextTasks = { ...prev.tasks };
      delete nextTasks[taskId];

      return {
        ...prev,
        tasks: nextTasks,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: prev.columns[columnId].taskIds.filter((id) => id !== taskId),
          },
        },
      };
    });
  };

  const addAiTasks = async (goal) => {
    if (!goal.trim()) return;
    setAiLoading(true);
    try {
      const taskTitles = await decomposeGoalToTasks(goal.trim());
      setBoard((prev) => {
        const nextTasks = { ...prev.tasks };
        const newTaskIds = taskTitles.map((title, index) => {
          const id = makeTaskId();
          nextTasks[id] = {
            id,
            title,
            priority: index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low',
            dueDate: '',
          };
          return id;
        });

        return {
          ...prev,
          tasks: nextTasks,
          columns: {
            ...prev.columns,
            'col-1': {
              ...prev.columns['col-1'],
              taskIds: [...newTaskIds, ...prev.columns['col-1'].taskIds],
            },
          },
        };
      });
    } finally {
      setAiLoading(false);
    }
  };

  const columns = useMemo(
    () => board.columnOrder.map((columnId) => ({ ...board.columns[columnId], tasks: board.columns[columnId].taskIds.map((taskId) => board.tasks[taskId]) })),
    [board],
  );

  return { board, columns, aiLoading, onDragEnd, addCard, deleteCard, addAiTasks };
};
