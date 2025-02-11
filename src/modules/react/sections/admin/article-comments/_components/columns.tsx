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
import { useDeleteArticleComment } from "@/modules/core/mutations/useDeleteArticleComment";

export type ArticleComment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  articleId: string;
};

export const columns: ColumnDef<ArticleComment>[] = [
  {
    accessorKey: "content",
    header: "Contenu",
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
      const articleComment = row.original;
      return <ActionCell articleComment={articleComment} />;
    },
  },
];

const ActionCell = ({ articleComment }: { articleComment: ArticleComment }) => {
  const deleteArticleCommentMutation = useDeleteArticleComment();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/articles/update?id=${articleComment.id}`}>
            Mettre à jour
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-500 focus:text-white"
          onClick={() =>
            deleteArticleCommentMutation.mutate({
              articleId: articleComment.articleId,
              articleCommentId: articleComment.id,
            })
          }
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
