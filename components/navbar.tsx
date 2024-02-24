import Link from "next/link";

import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";

const Navbar = () => {
  return ( 
      <Container>
        <div className="relative flex items-center h-16 md:h-20">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <NavbarActions />
        </div>
      </Container>
  );
};
 
export default Navbar;
