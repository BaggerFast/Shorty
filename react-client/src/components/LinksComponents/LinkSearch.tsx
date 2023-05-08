'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { SearchContext } from '@/components/SearchProvider'

export default function LinkSearch({ searchText }: { searchText: string }) {
  const { searchString, setSearchString } = useContext(SearchContext)

  return (
    <div className="hidden h-8 w-[300px] items-center space-x-2 rounded-3xl bg-white px-4 pb-[1px] shadow-sm dark:bg-[#1f1e29] dark:shadow-md md:flex">
      <MagnifyingGlassIcon className="h-5 w-5 stroke-gray-400" />
      <input
        value={searchString}
        onChange={event => setSearchString(event.target.value)}
        placeholder={searchText}
        className="w-full bg-white/[.0] placeholder:text-base focus:outline-none"
      />
    </div>
  )
}
