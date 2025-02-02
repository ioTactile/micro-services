import TalksHeader from "@/modules/react/sections/talks/_components/talks-header";
import TalkCards from "@/modules/react/sections/talks/_components/talk-cards";

const Talks = () => {
  return (
    <div className="container mx-auto flex flex-col gap-2 mt-2">
      <TalksHeader />
      <TalkCards />
    </div>
  );
};

export default Talks;
