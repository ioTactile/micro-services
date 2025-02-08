"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tag = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },

  {
    accessorKey: "createdAt",
    header: "Date de création",
  },

  {
    accessorKey: "updatedAt",
    header: "Date de mise à jour",
  },
];
