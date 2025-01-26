import { Input } from "@mm/components/ui/input";
import { Textarea } from "@mm/components/ui/textarea";
import { Button } from "@mm/components/ui/button";
import {
  CreatePostFormData,
  createPostSchema,
} from "@mm/modules/core/model/Post";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useCreatePost } from "@mm/modules/react/mutations/useCreatePost";

const PostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  });

  const { user } = useUser();

  const createPostMutation = useCreatePost();

  const handleCreatePostSubmit: SubmitHandler<CreatePostFormData> = (data) => {
    if (!user) return;

    const post = {
      title: data.title,
      content: data.content || null,
      authorId: user.id,
    };
    createPostMutation.mutate(post);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreatePostSubmit)}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Titre" type="text" {...register("title")} />
      <Textarea placeholder="Corps" {...register("content")} />
      <Button type="submit" disabled={!isValid}>
        Publier
      </Button>
    </form>
  );
};

export default PostForm;
