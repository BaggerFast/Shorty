'use client'

import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

import TagGroupItem from '@/components/Selector/TagGroupItem'
import useFilteredLinks from '@/hooks/useFilteredLinks'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function SelectorTagGroup({
  tagTitle,
  links,
}: {
  tagTitle: string
  links: LinkRecordType[]
}) {
  const filteredLinks = useFilteredLinks(links)
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div
      className={clsx(
        filteredLinks.length === 0 ? 'hidden' : 'flex',
        'w-full flex-col'
      )}
    >
      <div className="h-8 w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-full w-full items-center justify-between overflow-hidden border-b bg-white px-4 dark:border-b-white/[.1] dark:bg-neutral-900/[.6]"
        >
          <p className="">{tagTitle}</p>
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <ul
        className={clsx(
          isOpen ? 'flex' : 'hidden',
          'w-full flex-col gap-1 border-b dark:border-b-white/[.15]'
        )}
      >
        {filteredLinks.map((item) => (
          <li key={item.uid}>
            <TagGroupItem link={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
