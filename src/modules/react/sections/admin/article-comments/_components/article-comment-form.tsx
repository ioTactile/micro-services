"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import {
  createArticleCommentSchema,
  CreateArticleCommentInputs,
} from "@/modules/react/sections/admin/article-comments/_schemas/create-article-comment";
import { useCreateArticleComment } from "@/modules/core/mutations/useCreateArticleComment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";

const ArticleCommentForm = () => {
  const { id } = useParams();

  const form = useForm<CreateArticleCommentInputs>({
    resolver: zodResolver(createArticleCommentSchema),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  const { user } = useUser();

  const router = useRouter();

  const createArticleCommentMutation = useCreateArticleComment();

  const handleCreateArticleCommentSubmit: SubmitHandler<
    CreateArticleCommentInputs
  > = (data) => {
    if (!user) return;

    const articleComment = {
      content: data.content,
    };

    createArticleCommentMutation.mutate(
      {
        ...articleComment,
        authorId: user.id,
        articleId: id as string,
        replyToId: null,
        replyToUserId: null,
      },
      {
        onSuccess: () => {
          reset();
          router.push(`/admin/articles/${id as string}/comments`);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateArticleCommentSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} className="shadow-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isValid}
          className="rounded-full self-end"
        >
          Créer
        </Button>
      </form>
    </Form>
  );
};

export default ArticleCommentForm;
