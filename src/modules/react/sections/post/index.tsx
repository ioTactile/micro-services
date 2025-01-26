"use client";

import { useParams } from "next/navigation";
import usePostComments from "@mm/modules/react/hooks/usePostComments";
import { Button } from "@mm/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTimeBetweenDateAndNow } from "@mm/modules/core/utils/date";
import { getCapitalize } from "@mm/modules/core/utils/string";
import PostCommentForm from "@mm/modules/react/sections/home/components/postCommentForm";
import PostCommentCard from "@mm/modules/react/sections/home/components/PostCommentCard";

const Post = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: postWithComments } = usePostComments(id as string);

  if (!postWithComments) return null;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          onClick={() => {
            router.push("/");
          }}
          className="rounded-full w-8 h-8 "
        >
          <ArrowLeft />
        </Button>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="font-medium">
            {getCapitalize(postWithComments.author.name ?? "")}
          </span>

          <span>•</span>

          <span>
            il y a {getTimeBetweenDateAndNow(postWithComments.updatedAt)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{postWithComments?.title}</h1>

        <p className="text-sm">{postWithComments?.content}</p>

        <PostCommentForm
          postId={postWithComments.id}
          replyToId={null}
          replyToUserId={null}
        />
      </div>

      {postWithComments.comments && postWithComments.comments.length > 0 && (
        <div className="flex flex-col gap-2 mt-8">
          {postWithComments.comments
            .filter((comment) => !comment.replyToId)
            .map((comment) => (
              <PostCommentCard
                key={comment.id}
                postComment={comment}
                depth={0}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Post;
