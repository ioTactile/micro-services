import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TalksHeader = () => {
  return (
    <>
      <Image
        src="/assets/talks-header-bg.jpg"
        alt="Talks Header"
        width={1920}
        height={1080}
        className="w-full h-16 object-cover rounded-xl"
      />

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
