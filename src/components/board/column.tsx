"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Column as ColumnType, Card } from "@/lib/types";
import { TaskCard } from "./task-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ColumnProps {
  column: ColumnType;
  cards: Card[];
  index: number;
  onAddCard: () => void;
  onEditColumn: () => void;
  onDeleteColumn: () => void;
  onCardClick: (card: Card) => void;
}

export function Column({
  column,
  cards,
  index,
  onAddCard,
  onEditColumn,
  onDeleteColumn,
  onCardClick,
}: ColumnProps) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex w-72 flex-shrink-0 flex-col rounded-xl bg-column"
        >
          {/* Column Header */}
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-between p-3 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{column.title}</h3>
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {cards.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 cursor-pointer"
                onClick={onAddCard}
                aria-label={`Add card to ${column.title}`}
              >
                <Plus className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 cursor-pointer"
                    aria-label="Column options"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEditColumn} className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDeleteColumn}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Cards */}
          <Droppable droppableId={column.id} type="CARD">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "flex flex-1 flex-col gap-2 px-2 pb-2 min-h-[100px] transition-colors duration-200 rounded-b-xl",
                  snapshot.isDraggingOver && "bg-primary/5"
                )}
              >
                {cards.map((card, cardIndex) => (
                  <TaskCard
                    key={card.id}
                    card={card}
                    index={cardIndex}
                    onClick={() => onCardClick(card)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
