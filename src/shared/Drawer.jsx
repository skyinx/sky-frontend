import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { MdClose } from "react-icons/md";

const DrawerWrapper = ({
  open,
  setOpen,
  title,
  children,
  modalFooter,
  width = "max-w-xl",
}) => {
  useHotkeys("Esc", () => setOpen(false), [open]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-[999]"
        onClose={() => false}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className={`relative w-screen ${width}`}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-full bg-white border  border-white hover:border-red hover:text-red h-8 w-8 flex items-center justify-center focus:outline-none hover:rotate-90 transition"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <MdClose />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col shadow-xl overflow-y-scroll bg-white">
                  <div className="px-4 sm:px-6 py-5 bg-light border-b h-16">
                    <Dialog.Title className="text-base font-bold">
                      {title}
                    </Dialog.Title>
                  </div>
                  <div className="relative flex-1 px-6 py-6 overflow-auto">
                    {/* Replace with your content */}
                    {children}
                    {/* /End replace */}
                  </div>
                  <div className="modal-footer px-4 py-4 bg-light border-t flex items-center justify-end gap-3">
                    {modalFooter}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DrawerWrapper;
