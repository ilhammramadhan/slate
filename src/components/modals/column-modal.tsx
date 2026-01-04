"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  column: { id: string; title: string } | null;
  onSave: (title: string) => void;
}

export function ColumnModal({
  open,
  onOpenChange,
  column,
  onSave,
}: ColumnModalProps) {
  const [title, setTitle] = useState("");

  const isEditing = !!column;

  useEffect(() => {
    if (column) {
      setTitle(column.title);
    } else {
      setTitle("");
    }
  }, [column, open]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && title.trim()) {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Rename Column" : "Add Column"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="column-title" className="text-sm font-medium">
              Column Name
            </label>
            <Input
              id="column-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., To Do, In Progress, Done"
              autoFocus
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim()}
            className="cursor-pointer"
          >
            {isEditing ? "Save" : "Add Column"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
