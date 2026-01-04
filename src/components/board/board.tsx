"use client";

import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useBoard } from "@/hooks/use-board";
import { Column } from "./column";
import { CardModal } from "@/components/modals/card-modal";
import { ColumnModal } from "@/components/modals/column-modal";
import { Button } from "@/components/ui/button";
import { Card as CardType } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function Board() {
  const {
    board,
    isLoading,
    addCard,
    updateCard,
    deleteCard,
    addColumn,
    updateColumn,
    deleteColumn,
    moveCard,
    reorderColumns,
  } = useBoard();

  // Modal states
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [editingColumn, setEditingColumn] = useState<{ id: string; title: string } | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reordering columns
    if (type === "COLUMN") {
      reorderColumns(source.index, destination.index);
      return;
    }

    // Moving cards
    moveCard(
      draggableId,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  const handleAddCard = (columnId: string) => {
    setSelectedColumnId(columnId);
    setSelectedCard(null);
    setCardModalOpen(true);
  };

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    setSelectedColumnId(null);
    setCardModalOpen(true);
  };

  const handleSaveCard = (title: string, description: string, labels: CardType["labels"]) => {
    if (selectedCard) {
      // Update existing card
      updateCard(selectedCard.id, { title, description, labels });
    } else if (selectedColumnId) {
      // Add new card
      addCard(selectedColumnId, title, description, labels);
    }
    setCardModalOpen(false);
    setSelectedCard(null);
    setSelectedColumnId(null);
  };

  const handleDeleteCard = () => {
    if (selectedCard) {
      deleteCard(selectedCard.id);
      setCardModalOpen(false);
      setSelectedCard(null);
    }
  };

  const handleAddColumn = () => {
    setEditingColumn(null);
    setColumnModalOpen(true);
  };

  const handleEditColumn = (columnId: string, title: string) => {
    setEditingColumn({ id: columnId, title });
    setColumnModalOpen(true);
  };

  const handleSaveColumn = (title: string) => {
    if (editingColumn) {
      updateColumn(editingColumn.id, title);
    } else {
      addColumn(title);
    }
    setColumnModalOpen(false);
    setEditingColumn(null);
  };

  const handleDeleteColumn = (columnId: string) => {
    deleteColumn(columnId);
  };

  if (isLoading || !board) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
          <div className="p-4 md:p-6">
            <Droppable droppableId="board" type="COLUMN" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-4 items-start"
                >
                  {board.columnOrder.map((columnId, index) => {
                    const column = board.columns[columnId];
                    if (!column) return null;

                    const cards = column.cardIds
                      .map((cardId) => board.cards[cardId])
                      .filter(Boolean);

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        cards={cards}
                        index={index}
                        onAddCard={() => handleAddCard(column.id)}
                        onEditColumn={() => handleEditColumn(column.id, column.title)}
                        onDeleteColumn={() => handleDeleteColumn(column.id)}
                        onCardClick={handleCardClick}
                      />
                    );
                  })}
                  {provided.placeholder}

                  {/* Add Column Button */}
                  <Button
                    variant="outline"
                    className="h-10 w-72 flex-shrink-0 cursor-pointer border-dashed"
                    onClick={handleAddColumn}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Column
                  </Button>
                </div>
              )}
            </Droppable>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DragDropContext>

      {/* Card Modal */}
      <CardModal
        open={cardModalOpen}
        onOpenChange={setCardModalOpen}
        card={selectedCard}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
      />

      {/* Column Modal */}
      <ColumnModal
        open={columnModalOpen}
        onOpenChange={setColumnModalOpen}
        column={editingColumn}
        onSave={handleSaveColumn}
      />
    </>
  );
}
