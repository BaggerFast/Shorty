'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { setAuthToken } from '@/redux/Slices/authTokenSlice'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next-intl/client'
import { BACKEND_URL } from '@/shared/urls'

export default function LogOutDialog({
  translation
}: {
  translation: { [_: string]: string }
}) {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogOut = () => {
    setOpen(false)
    setTimeout(() => dispatch(setAuthToken('')), 1000)
    router.push(`${BACKEND_URL}/shorty/logout`)
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex gap-3 text-gray-400"
      >
        <ArrowLeftOnRectangleIcon className="h-7 w-7 text-gray-600 sm:h-6 sm:w-6 sm:text-gray-400" />
        <p className="hidden lg:block">{translation.modalLogOutOpenButton}</p>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="block min-h-screen items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500/[.75] transition-opacity" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {translation.modalLogOutTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {translation.modalLogOutDescription}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleLogOut}
                  >
                    {translation.modalLogOutAcceptButton}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {translation.modalLogOutCancelButton}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
