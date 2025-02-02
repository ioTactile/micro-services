import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen-minus-header flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <div className="space-y-3 text-center">
            <span className="text-4xl font-bold">404</span>
            <h1 className="text-2xl font-bold">Page not found</h1>
            <p>
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
