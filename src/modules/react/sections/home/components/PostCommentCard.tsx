import { Button } from "@mm/components/ui/button";
import { ExtendedPostComment } from "@mm/modules/core/model/PostComment";
import Avatar from "@mm/modules/react/sections/components/Avatar";
import { MessageCircle, MinusCircle, PlusCircle } from "lucide-react";
import PostCommentForm from "@home/components/postCommentForm";
import { useState } from "react";
import Link from "next/link";

interface PostCommentCardProps {
  postComment: ExtendedPostComment;
  depth: number;
}

const PostCommentCard = ({ postComment, depth }: PostCommentCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const MAX_DEPTH = 1;
  const indentationWidth = depth < MAX_DEPTH ? "ml-4" : "ml-0";

  return (
    <div className={`relative ${indentationWidth}`}>
      {depth > 0 && (
        <div className="absolute left-[-16px] top-0 bottom-0 w-[2px] bg-gray-200 hover:bg-gray-300" />
      )}
      <div className="flex flex-col gap-2">
        <summary className="flex items-center gap-2">
          <Avatar
            src={postComment.author.imageUrl}
            alt={postComment.author.name}
          />
          <div className="text-sm truncate font-medium">
            {postComment.author.name}
          </div>
        </summary>

        <p className="text-sm ml-10">
          {postComment.replyToId && (
            <Link
              href={`/user/${postComment.author.id}`}
              className=" hover:underline font-semibold"
            >
              {postComment.author.name + " "}
            </Link>
          )}
          {postComment.content}
        </p>

        <div className="flex items-center gap-2">
          {postComment.replies && postComment.replies.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <MinusCircle className="w-4 h-4" />
              ) : (
                <PlusCircle className="w-4 h-4" />
              )}
            </Button>
          )}

          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(true)}>
            <MessageCircle className="w-4 h-4" />
            Répondre
          </Button>
        </div>

        {isExpanded && (
          <PostCommentForm
            postId={postComment.postId}
            replyToId={postComment.replyToId}
            onCancel={() => setIsExpanded(false)}
            isExpandedFromParent={isExpanded}
          />
        )}
      </div>

      {showReplies && postComment.replies && postComment.replies.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 ml-4">
          {postComment.replies.map((comment) => (
            <PostCommentCard
              key={comment.id}
              postComment={{
                ...comment,
                postId: postComment.postId,
              }}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCommentCard;
