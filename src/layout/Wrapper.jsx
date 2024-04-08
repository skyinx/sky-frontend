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
import { IoMdColorPalette } from "react-icons/io";
import { BiSolidColor } from "react-icons/bi";

const Wrapper = ({ title, children, headerDetails = "" }) => {
  const list = [
    {
      icon: <IoColorFill className="w-6 h-6 group-hover:animate-wiggle" />,
      title: "Ink",
      href: "/ink",
    },
    {
      icon: (
        <IoColorFilterSharp className="w-6 h-6 group-hover:animate-wiggle" />
      ),
      title: "Product",
      href: "/product",
    },
    {
      icon: <BiSolidColor className="w-6 h-6 group-hover:animate-wiggle" />,
      title: "Pigment",
      href: "/pigment",
    },
  ];

  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  return (
    <main className={`min-h-screen sm:grid grid-cols-10 gap-2.5 p-1 sm:p-2.5`}>
      <section className="relative rounded-xl flex flex-col gap-2 sm:hidden">
        <div className="shadow-md bg-white relative flex items-center justify-end p-2 py-2 border rounded-lg border-primary z-0  w-full">
          <p className="text-primary font-bold text-2xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Sky Inx
          </p>
          <span
            className="border border-primary rounded-lg cursor-pointer p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <IoClose className="text-primary w-8 h-8" />
            ) : (
              <IoMenu className="text-primary w-8 h-8" />
            )}
          </span>
        </div>

        <DrawerWrapper open={open} setOpen={setOpen}>
          <div
            className={`w-full p-1 border rounded-lg flex-col justify-between bg-white h-full 
              `}
          >
            <ul className="flex flex-col gap-1.5">
              {list.map(({ title, href, icon }) => {
                return (
                  <Link href={href} key={title} className="group">
                    <li
                      className={`flex justify-between items-center px-2 gap-2 h-12 border border-white rounded-lg font-semibold text-sm ${
                        pathname === href
                          ? "bg-primary text-white border-primary"
                          : "hover:border hover:border-primary hover:text-black"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {icon} {title}
                      </span>
                      <HiOutlineChevronRight
                        className={`w-6 h-6 hidden text-primary group-hover:block ${
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
      <section className="hidden sm:col-span-3 xl:col-span-2 border p-2 rounded-xl bg-white sm:flex flex-col gap-2">
        <div className="flex p-2 py-2 justify-center items-center border rounded-lg border-primary z-0 bg-primary bg-opacity-10">
          <p className="text-primary font-bold text-2xl text-center">Sky Inx</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col gap-1.5">
            {list.map(({ title, href, icon }) => {
              return (
                <Link href={href} key={title} className="group">
                  <li
                    className={`flex justify-between items-center px-2 gap-2 h-12 border border-white rounded-lg font-semibold text-sm ${
                      pathname === href
                        ? "bg-primary text-white border-primary"
                        : "hover:border hover:border-primary hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {icon} {title}
                    </span>
                    <HiOutlineChevronRight
                      className={`w-6 h-6 hidden text-primary group-hover:block ${
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
      </section>
      <section className="sm:col-span-7 xl:col-span-8 flex flex-col gap-2.5">
        <nav className="h-16 flex pl-4 pr-2 items-center justify-between border rounded-xl bg-white text-xl font-semibold">
          {title}
          <div>{headerDetails}</div>
        </nav>
        <div className="p-3 border rounded-xl h-full w-full overflow-y-auto bg-white">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Wrapper;
