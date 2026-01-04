export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  labels: Label[];
  createdAt: number;
}

export interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Board {
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  columnOrder: string[];
}

export const LABEL_COLORS: Record<string, { light: string; dark: string; name: string }> = {
  bug: { light: "bg-red-100 text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400", name: "Bug" },
  feature: { light: "bg-blue-100 text-blue-700", dark: "dark:bg-blue-900/30 dark:text-blue-400", name: "Feature" },
  enhancement: { light: "bg-purple-100 text-purple-700", dark: "dark:bg-purple-900/30 dark:text-purple-400", name: "Enhancement" },
  urgent: { light: "bg-orange-100 text-orange-700", dark: "dark:bg-orange-900/30 dark:text-orange-400", name: "Urgent" },
  design: { light: "bg-pink-100 text-pink-700", dark: "dark:bg-pink-900/30 dark:text-pink-400", name: "Design" },
};

export const DEFAULT_LABELS: Label[] = [
  { id: "bug", name: "Bug", color: "bug" },
  { id: "feature", name: "Feature", color: "feature" },
  { id: "enhancement", name: "Enhancement", color: "enhancement" },
  { id: "urgent", name: "Urgent", color: "urgent" },
  { id: "design", name: "Design", color: "design" },
];
