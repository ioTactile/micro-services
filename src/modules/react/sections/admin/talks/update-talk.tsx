"use client";

import { useGetFetchQuery } from "@/modules/core/hooks/use-get-fetch-talk";
import { GetTalkResponse } from "@/modules/core/model/Talk";
import TalkForm from "@/modules/react/sections/admin/talks/_components/talk-form";
import { redirect, useSearchParams } from "next/navigation";

const UpdateTalk = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: talk } = useGetFetchQuery(id as string);

  if (!talk) {
    redirect("/admin/talks");
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">
        Mettre à jour : {talk.title}
      </h1>

      <TalkForm mode="update" initialData={talk as GetTalkResponse} />
    </div>
  );
};

export default UpdateTalk;
