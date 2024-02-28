import Link from "next/link";
import { auth, UserButton } from "@clerk/nextjs";

import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { userId } = auth();

  return (
    <Container>
      <div className="relative flex justify-between items-center py-5">
        <Link href="/" className="flex gap-x-2">
          <p className="font-bold text-xl">PeachMango</p>
        </Link>
        <NavbarActions />
        <div className="ml-4">
          {userId ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-10 h-10 rounded-md",
                },
              }}
            />
          ) : (
            <Button>
              <Link href='/sign-in'>
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;