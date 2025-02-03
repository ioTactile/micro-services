import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const TalksHeader = () => {
  return (
    <>
      <div
        className="w-full h-16 rounded-xl bg-gradient-to-r from-primary via-accent to-secondary
        dark:from-primary/80 dark:via-accent/80 dark:to-secondary/80
        relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      <div className="flex justify-between items-center mt-2 px-2">
        <h1 className="text-2xl lg:text-3xl font-bold">Discussions</h1>

        <Button variant="outline" size="sm" asChild className="rounded-full">
          <Link href="/talks/create">
            <Plus />
            Créer une discussion
          </Link>
        </Button>
      </div>
    </>
  );
};

export default TalksHeader;
