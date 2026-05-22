import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';

export default function Board({ columns, onDragEnd, onAddCard, onDeleteCard }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-5 lg:grid-cols-3">
        {columns.map((column) => (
          <Column key={column.id} column={column} onAddCard={onAddCard} onDeleteCard={onDeleteCard} />
        ))}
      </div>
    </DragDropContext>
  );
}
