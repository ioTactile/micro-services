import { SubmitHandler } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useCreateTalkComment } from "@/modules/react/mutations/useCreateTalkComment";
import * as React from "react";
import TextArea from "@/modules/react/sections/_components/inputs/text-area";
import { useZodForm } from "@/app/_components/ui/form";
import {
  CreateTalkCommentInputs,
  createTalkCommentSchema,
} from "@/modules/react/sections/talks/_schemas/create-talk-comment";

interface TalkCommentFormProps {
  talkId: string;
  replyToUserId: string | null;
  replyToId: string | null;
  onCancel?: () => void;
  isExpandedFromParent?: boolean;
}

const TalkCommentForm = ({
  talkId,
  replyToUserId,
  replyToId,
  onCancel,
  isExpandedFromParent,
}: TalkCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useZodForm({
    schema: createTalkCommentSchema,
    defaultValues: {
      content: "",
    },
  });

  const { user } = useUser();

  const createTalkCommentMutation = useCreateTalkComment();

  const handleCreateTalkCommentSubmit: SubmitHandler<
    CreateTalkCommentInputs
  > = (data) => {
    if (!user) return;

    const talkComment = {
      content: data.content,
      authorId: user.id,
      talkId: talkId,
      replyToId: replyToId,
      replyToUserId: replyToUserId,
    };

    createTalkCommentMutation.mutate(talkComment);
    reset();

    if (isExpanded) setIsExpanded(false);
    if (onCancel) onCancel();
  };

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isExpandedFromParent) setIsExpanded(true);
  }, [isExpandedFromParent]);

  return (
    <form onSubmit={handleSubmit(handleCreateTalkCommentSubmit)}>
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

export default TalkCommentForm;
