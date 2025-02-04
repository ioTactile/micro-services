import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";
import { SITE_NAME } from "@/app/_constants/seo";

interface Props extends Omit<ComponentProps<typeof Link>, "href"> {
  className?: string;
}

const AppLogo = ({ className, ...props }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl lg:text-3xl relative",
        "bg-gradient-to-r from-primary via-accent to-secondary",
        "dark:from-primary dark:via-accent dark:to-secondary",
        "bg-clip-text text-transparent",
        "hover:opacity-80 transition-opacity",
        className
      )}
      {...props}
    >
      <span className="font-bold">{SITE_NAME}</span>
    </Link>
  );
};

export default AppLogo;
