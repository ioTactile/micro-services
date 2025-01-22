"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
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

  const { data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => postGateway.getPost(id as string),
  });

  const { data: postComments } = useQuery({
    queryKey: ["post-comments"],
    queryFn: () => postGateway.getPostComments(id as string),
  });

  if (!post) return null;

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
            {getCapitalize(post.author.name ?? "")}
          </span>

          <span>•</span>

          <span>il y a {getTimeBetweenDateAndNow(post.updatedAt)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{post?.title}</h1>

        <p className="text-sm">{post?.content}</p>

        <PostCommentForm postId={post.id} replyToId={null} />
      </div>

      {postComments && postComments.length > 0 && (
        <div className="flex flex-col gap-2 mt-8">
          {postComments
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
