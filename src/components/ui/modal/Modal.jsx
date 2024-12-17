import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { modelClose, back1, close1 } from "../../../assets/images/icons";

export default function Modal({
  isOpen = () => {},
  closeModal = () => {},
  backFunc = () => {
    closeModal();
  },
  title = "",
  children = "placeholder",
  childrenPadding = "p-6",
  width = "w-full",
  height = "h-[100dvh] sm:h-auto",
  isFullScreen = true,
  hasCloseButton = false,
}) {
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(localStorage.getItem("i18nextLng") === "ar");
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${width} ${height} transform overflow-hidden sm:rounded-3xl bg-white text-start align-middle shadow-xl transition-all ${
                  isFullScreen ? "max-w-4xl" : "max-w-md"
                }`}
              >
                <div className={`${isArabic ? "text-right" : "text-left"}`}>
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="flex justify-between items-center text-white bg-[#7CC9D1] p-6">
                        <div className="flex gap-3">
                          <button className="w-4" onClick={backFunc}>
                            <img src={back1} alt="" role="button" />
                          </button>

                          <p>{title}</p>
                        </div>

                        <button className="w-4" onClick={closeModal}>
                          <img src={modelClose} alt="" role="button" />
                        </button>
                      </div>
                    </Dialog.Title>
                  )}

                  {/* {hasCloseButton && (
                    <button
                      className="absolute z-20 right-1 top-1"
                      onClick={closeModal}
                    >
                      <img src={close1} alt="" />
                    </button>
                  )} */}

                  <div
                    className={`overflow-y-scroll  md:max-h-[70dvh] max-h-[90dvh] no-scrollbar ${childrenPadding}`}
                  >
                    {children}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
