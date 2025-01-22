import {
  CreatePostCommentDto,
  createPostCommentSchema,
} from "@mm/modules/core/model/PostComment";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useCreatePostComment } from "@mm/modules/core/mutations/post-comment";
import { useEffect, useState } from "react";
import TextArea from "@mm/modules/react/sections/components/inputs/textArea";

interface PostCommentFormProps {
  postId: string;
  replyToUserId: string | null;
  replyToId: string | null;
  onCancel?: () => void;
  isExpandedFromParent?: boolean;
}

const PostCommentForm = ({
  postId,
  replyToUserId,
  replyToId,
  onCancel,
  isExpandedFromParent,
}: PostCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CreatePostCommentDto>({
    resolver: zodResolver(createPostCommentSchema),
  });

  const { user } = useUser();

  const createPostCommentMutation = useCreatePostComment();

  const handleCreatePostCommentSubmit: SubmitHandler<CreatePostCommentDto> = (
    data
  ) => {
    if (!user) return;

    const postComment = {
      content: data.content,
      authorId: user.id,
      postId: postId,
      replyToId: replyToId,
      replyToUserId: replyToUserId,
    };

    createPostCommentMutation.mutate(postComment);
    reset();

    if (isExpanded) setIsExpanded(false);
    if (onCancel) onCancel();
  };

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (isExpandedFromParent) setIsExpanded(true);
  }, [isExpandedFromParent]);

  return (
    <form onSubmit={handleSubmit(handleCreatePostCommentSubmit)}>
      <TextArea
        register={register}
        setIsExpanded={setIsExpanded}
        isValid={isValid}
        isExpanded={isExpanded}
        onCancel={onCancel}
      />
    </form>
  );
};

export default PostCommentForm;
