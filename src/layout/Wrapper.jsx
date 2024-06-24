import React, { useState } from "react";
import {
  IoColorFill,
  IoMenu,
  IoClose,
  IoColorFilterSharp,
} from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import DrawerWrapper from "@/shared/Drawer";
import { BiSolidColor } from "react-icons/bi";
import { MdOutlineExitToApp } from "react-icons/md";
import { post } from "@/api";
import { toast } from "react-toastify";

const Wrapper = ({ title, children, headerDetails = "" }) => {
  const list = [
    {
      icon: <IoColorFill className="h-6 w-6 group-hover:animate-wiggle" />,
      title: "Ink",
      href: "/ink",
    },
    {
      icon: (
        <IoColorFilterSharp className="h-6 w-6 group-hover:animate-wiggle" />
      ),
      title: "Product",
      href: "/product",
    },
    {
      icon: <BiSolidColor className="h-6 w-6 group-hover:animate-wiggle" />,
      title: "Pigment",
      href: "/pigment",
    },
  ];

  const [open, setOpen] = useState(false);
  const { pathname, push } = useRouter();

  const logout = async () => {
    await post({
      action: "logout",
    }).then(({ message }) => {
      toast.success(message);
      push("/");
    });
  };

  return (
    <main className={`min-h-screen grid-cols-10 gap-2.5 p-1 sm:grid sm:p-2.5`}>
      <section className="relative flex flex-col gap-2 rounded-xl sm:hidden">
        <div className="relative z-0 flex w-full items-center justify-end rounded-lg border border-primary bg-white p-2 py-2  shadow-md">
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-bold text-primary">
            Sky Inx
          </p>
          <span
            className="cursor-pointer rounded-lg border border-primary p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <IoClose className="h-8 w-8 text-primary" />
            ) : (
              <IoMenu className="h-8 w-8 text-primary" />
            )}
          </span>
        </div>

        <DrawerWrapper open={open} setOpen={setOpen}>
          <div
            className={`h-full w-full flex-col justify-between rounded-lg border bg-white p-1 
              `}
          >
            <ul className="flex flex-col gap-1.5">
              {list.map(({ title, href, icon }) => {
                return (
                  <Link href={href} key={title} className="group">
                    <li
                      className={`flex h-12 items-center justify-between gap-2 rounded-lg border border-white px-2 text-sm font-semibold ${
                        pathname === href
                          ? "border-primary bg-primary text-white"
                          : "hover:border hover:border-primary hover:text-black"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {icon} {title}
                      </span>
                      <HiOutlineChevronRight
                        className={`hidden h-6 w-6 text-primary group-hover:block ${
                          pathname === href
                            ? "group-hover:text-white"
                            : "group-hover:text-primary"
                        }`}
                      />
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </DrawerWrapper>
      </section>
      <section className="hidden flex-col justify-between gap-2 rounded-xl border bg-white p-2 sm:col-span-3 sm:flex xl:col-span-2">
        <div className="flex-col gap-2 sm:col-span-3 sm:flex xl:col-span-2">
          <div className="z-0 flex items-center justify-center rounded-lg border border-primary bg-primary bg-opacity-10 p-2 py-2">
            <p className="text-center text-2xl font-bold text-primary">
              Sky Inx
            </p>
          </div>
          <div className="flex h-full flex-col justify-between">
            <ul className="flex flex-col gap-1.5">
              {list.map(({ title, href, icon }) => {
                return (
                  <Link href={href} key={title} className="group">
                    <li
                      className={`flex h-12 items-center justify-between gap-2 rounded-lg border border-white px-2 text-sm font-semibold ${
                        pathname === href
                          ? "border-primary bg-primary text-white"
                          : "hover:border hover:border-primary hover:text-black"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {icon} {title}
                      </span>
                      <HiOutlineChevronRight
                        className={`hidden h-6 w-6 text-primary group-hover:block ${
                          pathname === href
                            ? "group-hover:text-white"
                            : "group-hover:text-primary"
                        }`}
                      />
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="group">
          <li
            onClick={logout}
            className={`flex h-12 items-center gap-2 rounded-lg border border-primary bg-primary bg-opacity-10 px-2 text-sm font-bold text-primary hover:bg-primary hover:text-white`}
          >
            <MdOutlineExitToApp
              className={`h-6 w-6 text-primary group-hover:block group-hover:text-white`}
            />
            <span className="flex items-center gap-3">Logout</span>
          </li>
        </div>
      </section>
      <section className="flex flex-col gap-2.5 sm:col-span-7 xl:col-span-8">
        <nav className="flex h-16 items-center justify-between rounded-xl border bg-white pl-4 pr-2 text-xl font-semibold">
          {title}
          <div>{headerDetails}</div>
        </nav>
        <div className="h-full w-full overflow-y-auto rounded-xl border bg-white p-3">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Wrapper;
