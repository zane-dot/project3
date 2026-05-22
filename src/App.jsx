import AIInput from './components/AIInput';
import Board from './components/Board';
import Header from './components/Header';
import { useBoard } from './hooks/useBoard';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { columns, aiLoading, onDragEnd, addCard, deleteCard, addAiTasks } = useBoard();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 transition-colors dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <AIInput loading={aiLoading} onSubmit={addAiTasks} />
        <Board columns={columns} onDragEnd={onDragEnd} onAddCard={addCard} onDeleteCard={deleteCard} />
      </div>
    </main>
  );
}
