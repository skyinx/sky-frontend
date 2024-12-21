import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoWarningOutline } from "react-icons/io5";

import Button from "@/widgets/Button";
import { MdClose } from "react-icons/md";
import { useHotkeys } from "react-hotkeys-hook";

const Modal = ({
  title,
  description,
  open = false,
  loading = false,
  confirmBtn = "Confirm",
  cancelBtn = "Cancel",
  setOpen = () => {},
  onConfirm = () => {},
  onDecline = () => {},
}) => {
  useHotkeys("Esc", () => setOpen(false), [open]);
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onDecline}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-opacity fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="relative flex min-h-full items-center justify-center p-4 text-center">
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
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex items-center gap-3 text-xl font-medium leading-6 text-gray-900"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary bg-opacity-10">
                    <IoWarningOutline className="mb-1.5 h-10 w-10 text-primary" />
                  </span>
                  {title}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                  <Button
                    loading={loading}
                    disabled={loading}
                    onClick={onConfirm}
                    className="w-28"
                  >
                    {confirmBtn}
                  </Button>
                  <Button
                    outline
                    disabled={loading}
                    onClick={onDecline}
                    className="w-28"
                  >
                    {cancelBtn}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
