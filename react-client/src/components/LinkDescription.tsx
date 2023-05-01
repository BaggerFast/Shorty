'use client'
import { LinkRecordType } from '@/shared/LinkRecordType'
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { convertDateTime } from '@/shared/convertDate'
import ky from 'ky'
import { apiURL } from '@/shared/fetcher'
import './LinkStyle.css'
import { useState } from 'react'
import GroupInput from '@/components/Common/GroupInput'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ButtonTemplate from '@/components/Common/ButtonTemplate'

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <ButtonTemplate onClick={onClick}>
      <TrashIcon className="h-6 w-6 text-red-700" />
    </ButtonTemplate>
  )
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <ButtonTemplate onClick={onClick}>
      <PencilIcon className="h-5 w-5" />
    </ButtonTemplate>
  )
}

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <ButtonTemplate onClick={onClick}>
      <XMarkIcon className="h-6 w-6" />
    </ButtonTemplate>
  )
}

function ApplyButton({ onClick }: { onClick: () => void }) {
  return (
    <ButtonTemplate onClick={onClick}>
      <CheckIcon className="h-6 w-6" />
    </ButtonTemplate>
  )
}

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
      <div className="flex items-start justify-between">
        {isEdit ? (
          <input
            type="text"
            onChange={event => setInputValue(event.target.value)}
            defaultValue={linkData.title}
            className="mr-6 w-full border-b-2 border-black text-4xl font-bold focus:outline-none"
          />
        ) : (
          <p className="line-clamp-1 pb-1 text-4xl font-bold">
            {linkData.title}
          </p>
        )}
        <div className="mt-3 flex flex-row items-center space-x-4">
          {isEdit ? (
            <>
              <ApplyButton onClick={editLink} />
              <CancelButton onClick={() => setIsEdit(false)} />
            </>
          ) : (
            <>
              <DeleteButton onClick={removeLink} />
              <EditButton onClick={() => setIsEdit(true)} />
            </>
          )}
        </div>
      </div>
      <p className="line-clamp-1">
        {translate['windowDate']} {convertDateTime(linkData.createDt)}
      </p>
      <div className="mt-4">
        <GroupInput value={linkData.ref} label="Link" />
      </div>
      <div className="mt-2 flex gap-2">
        <div className="w-[320px]">
          <GroupInput value={shortURL} label="Short link" />
        </div>
        <CopyToClipboard text={shortURL}>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
          >
            <DocumentDuplicateIcon className="h-5 w-[20px] text-neutral-500" />
          </button>
        </CopyToClipboard>
        <a target="_blank" href={shortURL}>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-neutral-500" />
          </button>
        </a>
      </div>
    </>
  )
}
