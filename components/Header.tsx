import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link className="flex items-center space-x-2" href={"/"}>
        <div>
          <Image
            alt="logo"
            src={"https://i.ibb.co/Vw10P4X/dropbox.png"}
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-xl">DropBox</h1>
      </Link>

      <div className="flex px-5 space-x-2 items-center">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
