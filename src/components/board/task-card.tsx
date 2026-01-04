"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { LABEL_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  card: Card;
  index: number;
  onClick: () => void;
}

export function TaskCard({ card, index, onClick }: TaskCardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={cn(
            "group rounded-lg border border-border bg-card p-3 shadow-sm transition-all duration-200 cursor-pointer",
            "hover:border-primary/50 hover:shadow-md",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            snapshot.isDragging && "shadow-lg ring-2 ring-primary/50 rotate-2"
          )}
        >
          {/* Labels */}
          {card.labels.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {card.labels.map((label) => {
                const colors = LABEL_COLORS[label.color];
                return (
                  <Badge
                    key={label.id}
                    variant="secondary"
                    className={cn(
                      "text-xs font-medium px-1.5 py-0",
                      colors?.light,
                      colors?.dark
                    )}
                  >
                    {label.name}
                  </Badge>
                );
              })}
            </div>
          )}

          {/* Title */}
          <h4 className="text-sm font-medium text-card-foreground leading-snug">
            {card.title}
          </h4>

          {/* Description preview */}
          {card.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
}
