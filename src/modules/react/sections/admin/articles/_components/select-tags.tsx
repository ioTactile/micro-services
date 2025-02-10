import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Control } from "react-hook-form";
import { CreateArticleInputs } from "../_schemas/create-article";
import useTags from "@/modules/core/hooks/use-tags";

interface SelectTagsProps {
  control: Control<CreateArticleInputs>;
}

const SelectTags = ({ control }: SelectTagsProps) => {
  const { data: tags, isLoading } = useTags();

  return (
    <FormField
      control={control}
      name="articleTags"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              disabled={isLoading}
              onValueChange={(value) => {
                const tagId = value;
                const currentTags = field.value || [];

                // Ajouter le tag s'il n'est pas déjà présent
                if (!currentTags.includes(tagId)) {
                  field.onChange([...currentTags, tagId]);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner des tags" />
              </SelectTrigger>
              <SelectContent>
                {tags?.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectTags;
