import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@mm/lib/checkUser";

const Header = async () => {
  const user = await checkUser();
  console.log(user);

  return (
    <div className="flex justify-between items-center p-4">
      <div>Micro-services</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
