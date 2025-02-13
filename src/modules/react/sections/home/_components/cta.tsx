import { Button } from "@/app/_components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const CTASection = () => {
  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-0 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Prêt à rejoindre la communauté ?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Créez votre compte gratuitement et commencez à partager votre passion
          pour l&apos;escalade
        </p>
        <SignInButton>
          <Button size="lg" className="rounded-full">
            Commencer maintenant
          </Button>
        </SignInButton>
      </div>
    </section>
  );
};

export default CTASection;
