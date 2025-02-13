"use client";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTagInputs,
  createTagSchema,
} from "@/modules/react/sections/admin/tags/_schemas/create-tag";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { useCreateTag } from "@/modules/core/mutations/useCreateTag";
import { useUpdateTag } from "@/modules/core/mutations/useUpdateTag";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GetTagResponse } from "@/modules/core/model/Tag";
import { useAuthAction } from "@/app/_hooks/use-auth-action";

interface TagFormProps {
  mode: "create" | "update";
  initialData?: GetTagResponse;
}

const TagForm = ({ mode, initialData }: TagFormProps) => {
  const form = useForm<CreateTagInputs>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    setValue,
  } = form;

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
    }
  }, [initialData, setValue]);

  const router = useRouter();

  const updateTagMutation = useUpdateTag();
  const createTagMutation = useCreateTag();

  const { handleAuthAction } = useAuthAction();

  const handleCreateOrUpdateTagSubmit: SubmitHandler<CreateTagInputs> = (
    data
  ) => {
    handleAuthAction(() => {
      const tag = {
        name: data.name,
      };

      if (mode === "create") {
        createTagMutation.mutate(tag, {
          onSuccess: () => {
            reset();
            router.push("/admin/tags");
          },
        });
      } else {
        updateTagMutation.mutate(
          {
            id: initialData!.id,
            name: data.name,
            updatedAt: new Date(),
          },
          {
            onSuccess: () => {
              reset();
            },
          }
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateOrUpdateTagSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nom du tag*" {...field} />
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
          {mode === "create" ? "Créer" : "Mettre à jour"}
        </Button>
      </form>
    </Form>
  );
};

export default TagForm;
