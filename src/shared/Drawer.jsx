import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { MdClose } from "react-icons/md";

const DrawerWrapper = ({
  open,
  setOpen,
  title,
  children,
  modalFooter = false,
  width = "max-w-xs sm:max-w-xl",
}) => {
  useHotkeys("Esc", () => setOpen(false), [open]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[99] overflow-hidden"
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
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                  <div className="absolute left-0 top-0 -ml-12 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="hover:border-red hover:text-red flex  h-8 w-8 items-center justify-center rounded-full border border-white bg-white transition hover:rotate-90 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <MdClose />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  {title ? (
                    <div className="h-16 border-b bg-light px-4 py-5 sm:px-6">
                      <Dialog.Title className="text-base font-bold">
                        {title}
                      </Dialog.Title>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="relative flex-1 overflow-auto px-6 py-6">
                    {/* Replace with your content */}
                    {children}
                    {/* /End replace */}
                  </div>
                  {modalFooter ? (
                    <div className="modal-footer flex items-center justify-end gap-3 border-t bg-light px-4 py-4">
                      {modalFooter}
                    </div>
                  ) : (
                    <></>
                  )}
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
