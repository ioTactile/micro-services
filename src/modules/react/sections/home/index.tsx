import FeaturesSection from "@/modules/react/sections/home/_components/features";
import CTASection from "@/modules/react/sections/home/_components/cta";
import HeroSection from "@/modules/react/sections/home/_components/hero";
import { currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const user = await currentUser();

  return (
    <div>
      <HeroSection user={user} />
      <FeaturesSection />
      {!user && <CTASection />}
    </div>
  );
};

export default Home;
