import TalkForm from "@/modules/react/sections/talks/_components/talk-form";

const CreateTalk = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl font-bold text-muted-foreground">
        Créer une discussion
      </h1>
      <TalkForm />
    </div>
  );
};

export default CreateTalk;
