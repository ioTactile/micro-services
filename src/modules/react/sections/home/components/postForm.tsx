import { TextField } from "@components/inputs/textField";
import { Post } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

const PostForm = () => {
  const { register, handleSubmit } = useForm<Post>();

  const handleCreatePostSubmit: SubmitHandler<Post> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleCreatePostSubmit)}>
      <TextField
        label="Titre"
        placeholder="Titre"
        type="text"
        {...register("title")}
      />
      <TextField
        label="Contenu"
        placeholder="Contenu"
        type="text"
        {...register("content")}
      />
    </form>
  );
};

export default PostForm;
