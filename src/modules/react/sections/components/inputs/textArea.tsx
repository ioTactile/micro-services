import { Button } from "@mm/components/ui/button";

import { Textarea } from "@mm/components/ui/textarea";
import { CreatePostCommentDto } from "@mm/modules/core/model/PostComment";
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  register: UseFormRegister<CreatePostCommentDto>;
  setIsExpanded: (isExpanded: boolean) => void;
  onCancel?: () => void;
  isValid: boolean;
  isExpanded: boolean;
}

const TextArea = ({
  register,
  setIsExpanded,
  onCancel,
  isValid,
  isExpanded,
}: TextAreaProps) => {
  const handleClick = () => {
    if (onCancel) onCancel();
    setIsExpanded(false);
  };

  return isExpanded ? (
    <div className="border rounded-xl overflow-hidden">
      <div className="p-2">
        <Textarea
          {...register("content")}
          className="border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
        />
      </div>

      <div className="flex justify-end items-center gap-2 bg-primary-foreground p-2 border-t">
        <Button onClick={handleClick} variant="ghost" size="sm">
          Annuler
        </Button>
        <Button type="submit" disabled={!isValid} size="sm">
          Commentaire
        </Button>
      </div>
    </div>
  ) : (
    <Button
      onClick={() => setIsExpanded(true)}
      variant="outline"
      className="w-full shadow-none justify-start"
    >
      Ajouter un commentaire
    </Button>
  );
};

export default TextArea;
