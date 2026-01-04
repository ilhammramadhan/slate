"use client";

import { useState, useEffect } from "react";
import { Card, Label, LABEL_COLORS } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: Card | null;
  onSave: (title: string, description: string, labels: Label[]) => void;
  onDelete: () => void;
}

const AVAILABLE_LABELS = Object.entries(LABEL_COLORS).map(([key, value]) => ({
  id: key,
  name: value.name,
  color: key,
}));

export function CardModal({
  open,
  onOpenChange,
  card,
  onSave,
  onDelete,
}: CardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);

  const isEditing = !!card;

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description || "");
      setSelectedLabels(card.labels);
    } else {
      setTitle("");
      setDescription("");
      setSelectedLabels([]);
    }
  }, [card, open]);

  const handleLabelToggle = (label: Label) => {
    setSelectedLabels((prev) => {
      const exists = prev.some((l) => l.id === label.id);
      if (exists) {
        return prev.filter((l) => l.id !== label.id);
      }
      return [...prev, label];
    });
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim(), description.trim(), selectedLabels);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Card" : "Add Card"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a more detailed description..."
              rows={3}
            />
          </div>

          {/* Labels */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Labels</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_LABELS.map((label) => {
                const colors = LABEL_COLORS[label.color];
                const isSelected = selectedLabels.some((l) => l.id === label.id);
                return (
                  <Badge
                    key={label.id}
                    variant="secondary"
                    className={cn(
                      "cursor-pointer transition-all",
                      colors?.light,
                      colors?.dark,
                      isSelected && "ring-2 ring-primary ring-offset-2"
                    )}
                    onClick={() => handleLabelToggle(label)}
                  >
                    {label.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {isEditing && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
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
              {isEditing ? "Save Changes" : "Add Card"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
