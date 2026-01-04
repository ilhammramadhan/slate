"use client";

import { useState, useEffect, useCallback } from "react";
import { Board, Card, Column, Label } from "@/lib/types";
import { demoBoard } from "@/lib/demo-data";

const STORAGE_KEY = "slate-board";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useBoard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBoard(JSON.parse(stored));
      } catch {
        setBoard(demoBoard);
      }
    } else {
      setBoard(demoBoard);
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (board && !isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    }
  }, [board, isLoading]);

  // Card operations
  const addCard = useCallback((columnId: string, title: string, description?: string, labels?: Label[]) => {
    const cardId = `card-${generateId()}`;
    const newCard: Card = {
      id: cardId,
      title,
      description,
      labels: labels || [],
      createdAt: Date.now(),
    };

    setBoard((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cards: { ...prev.cards, [cardId]: newCard },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            cardIds: [...prev.columns[columnId].cardIds, cardId],
          },
        },
      };
    });

    return cardId;
  }, []);

  const updateCard = useCallback((cardId: string, updates: Partial<Card>) => {
    setBoard((prev) => {
      if (!prev || !prev.cards[cardId]) return prev;
      return {
        ...prev,
        cards: {
          ...prev.cards,
          [cardId]: { ...prev.cards[cardId], ...updates },
        },
      };
    });
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    setBoard((prev) => {
      if (!prev) return prev;

      // Find which column has this card
      const columnId = Object.keys(prev.columns).find((colId) =>
        prev.columns[colId].cardIds.includes(cardId)
      );

      if (!columnId) return prev;

      const newCards = { ...prev.cards };
      delete newCards[cardId];

      return {
        ...prev,
        cards: newCards,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            cardIds: prev.columns[columnId].cardIds.filter((id) => id !== cardId),
          },
        },
      };
    });
  }, []);

  // Column operations
  const addColumn = useCallback((title: string) => {
    const columnId = `column-${generateId()}`;
    const newColumn: Column = {
      id: columnId,
      title,
      cardIds: [],
    };

    setBoard((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: { ...prev.columns, [columnId]: newColumn },
        columnOrder: [...prev.columnOrder, columnId],
      };
    });

    return columnId;
  }, []);

  const updateColumn = useCallback((columnId: string, title: string) => {
    setBoard((prev) => {
      if (!prev || !prev.columns[columnId]) return prev;
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [columnId]: { ...prev.columns[columnId], title },
        },
      };
    });
  }, []);

  const deleteColumn = useCallback((columnId: string) => {
    setBoard((prev) => {
      if (!prev) return prev;

      // Delete all cards in this column
      const cardIdsToDelete = prev.columns[columnId]?.cardIds || [];
      const newCards = { ...prev.cards };
      cardIdsToDelete.forEach((cardId) => delete newCards[cardId]);

      const newColumns = { ...prev.columns };
      delete newColumns[columnId];

      return {
        ...prev,
        cards: newCards,
        columns: newColumns,
        columnOrder: prev.columnOrder.filter((id) => id !== columnId),
      };
    });
  }, []);

  // Drag and drop
  const moveCard = useCallback(
    (
      cardId: string,
      sourceColumnId: string,
      destColumnId: string,
      sourceIndex: number,
      destIndex: number
    ) => {
      setBoard((prev) => {
        if (!prev) return prev;

        const sourceColumn = prev.columns[sourceColumnId];
        const destColumn = prev.columns[destColumnId];

        if (!sourceColumn || !destColumn) return prev;

        // Same column reorder
        if (sourceColumnId === destColumnId) {
          const newCardIds = Array.from(sourceColumn.cardIds);
          newCardIds.splice(sourceIndex, 1);
          newCardIds.splice(destIndex, 0, cardId);

          return {
            ...prev,
            columns: {
              ...prev.columns,
              [sourceColumnId]: { ...sourceColumn, cardIds: newCardIds },
            },
          };
        }

        // Moving to different column
        const sourceCardIds = Array.from(sourceColumn.cardIds);
        sourceCardIds.splice(sourceIndex, 1);

        const destCardIds = Array.from(destColumn.cardIds);
        destCardIds.splice(destIndex, 0, cardId);

        return {
          ...prev,
          columns: {
            ...prev.columns,
            [sourceColumnId]: { ...sourceColumn, cardIds: sourceCardIds },
            [destColumnId]: { ...destColumn, cardIds: destCardIds },
          },
        };
      });
    },
    []
  );

  const reorderColumns = useCallback((sourceIndex: number, destIndex: number) => {
    setBoard((prev) => {
      if (!prev) return prev;

      const newColumnOrder = Array.from(prev.columnOrder);
      const [removed] = newColumnOrder.splice(sourceIndex, 1);
      newColumnOrder.splice(destIndex, 0, removed);

      return {
        ...prev,
        columnOrder: newColumnOrder,
      };
    });
  }, []);

  // Reset to demo
  const resetBoard = useCallback(() => {
    setBoard(demoBoard);
  }, []);

  return {
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
    resetBoard,
  };
}
