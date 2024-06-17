"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  return (
    <header className="bg-transparent fixed w-full z-20">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-8 w-auto"
              src="/zurich-icon.png"
              alt="zurich logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session && session.user ? (
            <span
              onClick={() => signOut()}
              className="flex items-center gap-x-3 text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
            >
              Howdy, {session.user.name}
              <ArrowRightStartOnRectangleIcon
                className="h-5 w-5 text-gray-900"
                aria-hidden="true"
                title="Log out"
              />
            </span>
          ) : (
            <span
              onClick={() => popupCenter("/login", "Login with google")}
              className="flex items-center gap-x-3 text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
            >
              Log in{" "}
              <ArrowRightEndOnRectangleIcon
                className="h-5 w-5 flex-none text-gray-900"
                aria-hidden="true"
                title="Log in"
              />
            </span>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
