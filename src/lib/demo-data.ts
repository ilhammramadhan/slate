import { Board } from "./types";

export const demoBoard: Board = {
  columnOrder: ["backlog", "todo", "in-progress", "done"],
  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      cardIds: ["card-1", "card-2"],
    },
    todo: {
      id: "todo",
      title: "To Do",
      cardIds: ["card-3", "card-4"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      cardIds: ["card-5"],
    },
    done: {
      id: "done",
      title: "Done",
      cardIds: ["card-6", "card-7"],
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Research competitors",
      description: "Analyze top 5 Kanban apps and identify key features",
      labels: [{ id: "feature", name: "Feature", color: "feature" }],
      createdAt: Date.now() - 86400000 * 5,
    },
    "card-2": {
      id: "card-2",
      title: "Define color palette",
      description: "Create light and dark mode color schemes",
      labels: [{ id: "design", name: "Design", color: "design" }],
      createdAt: Date.now() - 86400000 * 4,
    },
    "card-3": {
      id: "card-3",
      title: "Set up project structure",
      description: "Initialize Next.js with TypeScript, Tailwind, and shadcn/ui",
      labels: [{ id: "feature", name: "Feature", color: "feature" }],
      createdAt: Date.now() - 86400000 * 3,
    },
    "card-4": {
      id: "card-4",
      title: "Create component library",
      description: "Build reusable UI components for cards, columns, and modals",
      labels: [{ id: "enhancement", name: "Enhancement", color: "enhancement" }],
      createdAt: Date.now() - 86400000 * 2,
    },
    "card-5": {
      id: "card-5",
      title: "Build drag & drop",
      description: "Implement drag and drop functionality using @hello-pangea/dnd",
      labels: [
        { id: "feature", name: "Feature", color: "feature" },
        { id: "urgent", name: "Urgent", color: "urgent" },
      ],
      createdAt: Date.now() - 86400000,
    },
    "card-6": {
      id: "card-6",
      title: "Initial planning",
      description: "Define project scope and create design specification",
      labels: [{ id: "feature", name: "Feature", color: "feature" }],
      createdAt: Date.now() - 86400000 * 7,
    },
    "card-7": {
      id: "card-7",
      title: "Design mockups",
      description: "Create UI mockups for all screens and interactions",
      labels: [{ id: "design", name: "Design", color: "design" }],
      createdAt: Date.now() - 86400000 * 6,
    },
  },
};
