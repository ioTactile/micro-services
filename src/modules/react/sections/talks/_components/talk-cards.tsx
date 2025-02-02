"use client";

import * as React from "react";
import useTalks from "@/modules/react/hooks/use-talks";
import TalkCard from "@/modules/react/sections/talks/_components/talk-card";
import { Separator } from "@/app/_components/ui/separator";

const TalkCards = () => {
  const { data: talks } = useTalks();

  return (
    <div className="flex flex-col">
      {talks?.map((talk, index) => (
        <React.Fragment key={talk.id}>
          <TalkCard talk={talk} />
          {index < talks.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TalkCards;
