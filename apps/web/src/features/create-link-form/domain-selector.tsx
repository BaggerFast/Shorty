import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useSignal } from '@preact-signals/safe-react'
import { Button } from '@repo/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/command'
import { cn } from '@repo/ui/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Skeleton } from '@repo/ui/skeleton'

import { useGetClientDomains } from '@/entities/domain'

import {
  currentDomain,
  currentSubdomain,
  subdomainStub,
} from './create-form-context'

export default function DomainSelector() {
  const search = useSignal<string>('')
  const { data: domains, isLoading } = useGetClientDomains()

  if (isLoading || domains === undefined) {
    return (
      <Skeleton className="h-10 w-full overflow-hidden rounded-none border" />
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between rounded-none border-x-0 pr-2"
        >
          <span className="truncate">{currentDomain.value.value}</span>
          <ChevronUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={search.value}
            onValueChange={(value) => {
              search.value = value
            }}
            maxLength={16}
            placeholder="Search subdomain..."
          />
          <CommandList>
            <CommandEmpty>No domains found.</CommandEmpty>
            <CommandGroup>
              {domains.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.uid}
                  onSelect={() => {
                    if (currentDomain.value === item) return
                    currentDomain.value = item
                    currentSubdomain.value = subdomainStub.value
                  }}
                  disabled={false}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 size-4',
                      item.value === currentDomain.value.value
                        ? 'visible'
                        : 'invisible'
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
