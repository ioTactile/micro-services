"use client";

import { useParams } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import { getCapitalize } from "@/modules/core/utils/string";
import TalkCommentForm from "@/modules/react/sections/talks/_components/talk-comment-form";
import TalkCommentCard from "@/modules/react/sections/talks/_components/talk-comment-card";
import Avatar from "@/modules/react/sections/_components/avatar";
import Link from "next/link";
import useTalkWithComments from "@/modules/react/hooks/use-talk-with-comments";

const Talk = () => {
  const { id } = useParams();

  const { data: talkWithComments } = useTalkWithComments(id as string);

  if (!talkWithComments) return null;

  return (
    <div className="flex flex-col gap-2 container mx-auto mt-2 px-4 sm:px-0">
      <div className="flex items-center gap-2">
        <Button className="rounded-full w-8 h-8" asChild>
          <Link href="/talks">
            <ArrowLeft />
          </Link>
        </Button>

        <Avatar
          alt={talkWithComments.author.name}
          src={talkWithComments.author.imageUrl}
        />

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="font-medium">
            {getCapitalize(talkWithComments.author.name ?? "")}
          </span>

          <span>•</span>

          <span>
            il y a {getTimeBetweenDateAndNow(talkWithComments.updatedAt)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{talkWithComments?.title}</h1>

        <p className="text-sm">{talkWithComments?.content}</p>

        <TalkCommentForm
          talkId={talkWithComments.id}
          replyToId={null}
          replyToUserId={null}
        />
      </div>

      {talkWithComments.talkComments &&
        talkWithComments.talkComments.length > 0 && (
          <div className="flex flex-col gap-2 mt-6">
            {talkWithComments.talkComments
              .filter((comment) => !comment.replyToId)
              .map((comment) => (
                <TalkCommentCard
                  key={comment.id}
                  talkComment={comment}
                  depth={0}
                />
              ))}
          </div>
        )}
    </div>
  );
};

export default Talk;
