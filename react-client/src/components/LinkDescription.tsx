'use client'
import { LinkRecordType } from '@/shared/LinkRecordType'
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/solid'
import convertDate from '@/shared/convertDate'
import QRGenerator from '@/components/QRGenerator'
import ky from 'ky'
import { apiURL } from '@/shared/fetcher'
import './LinkStyle.css'
import { useState } from 'react'

export default function LinkDescription({
  translate,
  linkData,
  hideLink,
  reloadLinks
}: {
  translate: { [_: string]: string }
  linkData: LinkRecordType
  hideLink: () => void
  reloadLinks: () => void
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const shortURL = 'http://localhost:3031/' + linkData.refRoute
  const removeLink = async () => {
    await ky.delete(`${apiURL}/links/${linkData.uid}`)
    reloadLinks()
    hideLink()
  }
  const editLink = () => {
    if (!(inputValue.length === 0 || inputValue === linkData.title)) {
      ky.put(`${apiURL}/links/${linkData.uid}`, {
        json: {
          title: inputValue,
          ref: linkData.ref
        }
      })
      reloadLinks()
      linkData.title = inputValue
    }
    setIsEdit(false)
  }
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.05)] dark:bg-[#23212e] dark:shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1)] sm:hidden">
        <p className="text-lg font-bold ">{translate['windowTitle']}</p>
        <button type="button" onClick={hideLink}>
          <XMarkIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div className="h-[calc(100%-64px)] bg-white px-4 py-8 dark:bg-[#23212e] sm:h-full sm:rounded-xl md:px-16">
        <div className="flex items-start justify-between">
          {isEdit ? (
            <input
              type="text"
              onChange={event => setInputValue(event.target.value)}
              defaultValue={linkData.title}
              className="mr-6 w-full border-b-2 border-black text-4xl font-bold focus:outline-none"
            />
          ) : (
            <p className="line-clamp-2 pb-2 text-4xl font-bold">
              {linkData.title}
            </p>
          )}
          <div className="mt-3 flex flex-row items-center space-x-4">
            {isEdit ? (
              <>
                <button
                  type="button"
                  onClick={editLink}
                  className="transition hover:scale-105 active:scale-95"
                >
                  <CheckIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="transition hover:scale-105 active:scale-95"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={removeLink}
                  className="transition hover:scale-105 active:scale-95"
                >
                  <TrashIcon className="h-6 w-6 text-red-700" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="transition hover:scale-105 active:scale-95"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
        <p>
          {translate['windowDate']} {convertDate(linkData.createDt)}
        </p>
        <a
          target="_blank"
          href={linkData.ref}
          className="line-clamp-3 text-2xl font-bold text-blue-400"
        >
          {linkData.ref}
        </a>
        <div>
          <p>Short link:</p>
          <a
            target="_blank"
            href={shortURL}
            className="pt-5 text-2xl font-bold text-blue-400"
          >
            {shortURL}
          </a>
        </div>
        <QRGenerator translate={translate} hrefLink={shortURL} />
      </div>
    </>
  )
}
