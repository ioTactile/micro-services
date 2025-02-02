"use client";

import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { useCreateTalk } from "@/modules/react/mutations/useCreateTalk";
import {
  createTalkSchema,
  CreateTalkInputs,
} from "@/modules/react/sections/talks/_schemas/create-talk";
import { useEffect, useState } from "react";
import { TALK_TITLE_MAX_LENGTH } from "@/app/_constants/app";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";

const TalkForm = () => {
  const form = useForm<CreateTalkInputs>({
    resolver: zodResolver(createTalkSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    watch,
  } = form;

  const { user } = useUser();

  const createTalkMutation = useCreateTalk();

  const handleCreateTalkSubmit: SubmitHandler<CreateTalkInputs> = (data) => {
    if (!user) return;

    const talk = {
      title: data.title,
      content: data.content || null,
      authorId: user.id,
    };

    createTalkMutation.mutate(talk);
    reset();
  };

  const [titleSize, setTitleSize] = useState<number>(0);

  const title = watch("title");
  useEffect(() => {
    setTitleSize(title.length);
  }, [title]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateTalkSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Titre*"
                  {...field}
                  maxLength={TALK_TITLE_MAX_LENGTH}
                  className="resize-none shadow-none"
                  rows={1}
                />
              </FormControl>
              <div className="flex justify-between items-center mx-2">
                <FormMessage />
                <span className="text-xs text-muted-foreground ml-auto">
                  {titleSize}/{TALK_TITLE_MAX_LENGTH}
                </span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Corps"
                  {...field}
                  value={field.value || ""}
                  className="shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isValid}
          className="rounded-full self-end"
        >
          Publier
        </Button>
      </form>
    </Form>
  );
};

export default TalkForm;
