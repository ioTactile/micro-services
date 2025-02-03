import { ExtendedTalk } from "@/modules/core/model/Talk";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import { getCapitalize } from "@/modules/core/utils/string";
import { useRouter } from "next/navigation";
import Avatar from "@/modules/react/sections/_components/avatar";
import { Button } from "@/app/_components/ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/app/_hooks/use-toast";

interface TalkCardProps {
  talk: ExtendedTalk;
}

const TalkCard = ({ talk }: TalkCardProps) => {
  const router = useRouter();

  const { toast } = useToast();

  function handleShare(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/talks/${talk.id}/${talk.title}`
    );
    toast({
      title: "Succès",
      description: "Le lien a été copié dans le presse-papiers",
    });
  }

  return (
    <div
      className="flex flex-col gap-2 bg-card rounded-xl text-card-foreground px-4 py-1 my-1 cursor-pointer hover:bg-accent/20 transition-all duration-300"
      onClick={() => router.push(`/talks/${talk.id}/${talk.title}`)}
    >
      <div className="flex items-center gap-1 text-xs">
        <Avatar
          alt={talk.author.name}
          src={talk.author.imageUrl}
          className="w-6 h-6"
        />

        <span className="font-bold">
          {getCapitalize(talk.author.name ?? "")}
        </span>

        <span>•</span>

        <span className="text-muted-foreground">
          il y a {getTimeBetweenDateAndNow(talk.updatedAt)}
        </span>
      </div>

      <span className="text-lg font-semibold">{talk.title}</span>

      <p>{talk.content}</p>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="rounded-full">
          <MessageCircle className="w-4 h-4" />
          {talk._count.talkComments}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Partager
        </Button>
      </div>
    </div>
  );
};

export default TalkCard;
