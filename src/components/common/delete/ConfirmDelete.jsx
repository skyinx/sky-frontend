import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoWarningOutline } from "react-icons/io5";

import Button from "@/widgets/Button";

const ConfirmDelete = ({
  title = "Are you sure ?",
  open = false,
  onConfirm = () => {},
  onDecline = () => {},
  loading,
}) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onDecline}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 modal-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    <span className="w-14 h-14 flex justify-center items-center rounded-full bg-primary bg-opacity-10">
                      <IoWarningOutline className="w-10 h-10 mb-1.5 text-primary" />
                    </span>
                    {title}
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      This action cannot be undone. All values associated with
                      this field will be lost.
                    </p>
                  </div>

                  <div className="flex mt-8 justify-center gap-2">
                    <Button
                      loading={loading}
                      disabled={loading}
                      onClick={onConfirm}
                      className="w-28"
                    >
                      Confirm
                    </Button>
                    <Button
                      outline
                      disabled={loading}
                      onClick={onDecline}
                      className="w-28"
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConfirmDelete;
