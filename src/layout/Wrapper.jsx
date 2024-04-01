import React from "react";
import { IoColorFill } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

const Wrapper = ({ title, children, headerDetails = "" }) => {
  const list = [
    {
      icon: <IoColorFill className="w-6 h-6 group-hover:animate-wiggle" />,
      title: "Water Based",
      href: "/",
    },
  ];
  const { pathname } = useRouter();
  return (
    <main className={`min-h-screen grid grid-cols-10 gap-2.5 p-2.5`}>
      <section className="col-span-2 border p-2 rounded-xl bg-white flex flex-col gap-2">
        <div className="flex p-2 py-2 justify-center items-center">
          {/* <img src="/img/logo-png.png" alt="N" className="w-10 h-10" /> */}
          <p className="text-primary font-bold text-2xl text-center">Sky Ink</p>
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
                    <span className="flex items-center gap-2">
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
      <section className="col-span-8 flex flex-col gap-2.5">
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
