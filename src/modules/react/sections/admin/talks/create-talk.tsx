import TalkForm from "@/modules/react/sections/admin/talks/_components/talk-form";
import TalksHeader from "@/modules/react/sections/admin/talks/_components/talks-header";

const CreateTalk = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <TalksHeader />
      <TalkForm mode="create" />
    </div>
  );
};

export default CreateTalk;
