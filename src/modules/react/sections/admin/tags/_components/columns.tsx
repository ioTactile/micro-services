"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";
import { useShare } from "@/app/_hooks/use-share";
import { useDeleteTag } from "@/modules/core/mutations/useDeleteTag";

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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tag = row.original;

      return <ActionCell tag={tag} />;
    },
  },
];

const ActionCell = ({ tag }: { tag: Tag }) => {
  const { handleShare } = useShare();
  const deleteTagMutation = useDeleteTag();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{tag.name}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            handleShare(tag.name, "Le tag a été copié dans le presse-papiers")
          }
        >
          Copier le tag
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/tags/update?id=${tag.id}`}>Mettre à jour</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-500 focus:text-white"
          onClick={() => deleteTagMutation.mutate(tag.id)}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
