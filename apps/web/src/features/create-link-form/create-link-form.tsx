/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { TrashIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useComputed, useSignal } from '@preact-signals/safe-react'
import { Button } from '@repo/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { cn } from '@repo/ui/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { useToast } from '@repo/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetClientDomains } from '@/entities/domain'
import { createLinkAction, getShortLink } from '@/entities/record'

import {
  currentDomain,
  currentSubdomain,
  subdomainStub,
} from './create-form-context'
import createFormSchema from './create-form-scheme'
import DomainSelector from './domain-selector'
import generateUrlPath from './generate-url-path'
import SubdomainSelector from './subdomain-selector'

type UrlType = z.infer<typeof createFormSchema>['urls'][number]

const singleUrl: UrlType[] = [{ url: '' }]

const groupUrls: UrlType[] = [{ url: '' }, { url: '' }]

export default function CreateLinkForm({
  onFormSubmit,
}: {
  onFormSubmit?: () => void
}) {
  const { toast } = useToast()
  const router = useRouter()
  const type = useSignal<string>('single')

  const { data: domains } = useGetClientDomains()

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: '',
      urls: singleUrl,
      path: generateUrlPath(),
      password: '',
    },
  })

  const { fields, append, replace, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  useEffect(() => {
    currentSubdomain.value = subdomainStub.value
    // @ts-expect-error preact signals warning
    currentDomain.value =
      domains && domains.length > 0 ? domains[0] : currentDomain.value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shortUrl = useComputed(() => {
    const { path } = form.getValues()
    const subdomain =
      currentSubdomain.value === subdomainStub.value
        ? ''
        : currentSubdomain.value.value
    const domain = currentDomain.value.value
    return getShortLink({ subdomain, domain, path })
  })

  const handleTypeChange = (value: string) => {
    replace(value === 'single' ? singleUrl : groupUrls)
    type.value = value
  }

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    const result = await createLinkAction({
      title: values.title?.trim() ?? '',
      password: values.password?.trim(),
      domainUid: currentDomain.value.uid ?? '',
      urls: values.urls.map((item) => item.url.trim()),
      subdomainUid:
        currentSubdomain.value === subdomainStub.value
          ? ''
          : currentSubdomain.value.uid,
      path: values.path.trim(),
    })

    if (!result?.data || 'failure' in result.data) {
      toast({
        title: 'Form error',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    router.push(`/main?linkUid=${result.data.uid}`, { scroll: false })
    if (onFormSubmit) onFormSubmit()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <Tabs value={type.value} onValueChange={handleTypeChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="group">Group</TabsTrigger>
          </TabsList>
        </Tabs>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormDescription>
                This name will only be displayed in the application
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((url_field, index) => (
            <FormField
              control={form.control}
              key={url_field.id}
              name={`urls.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} />
                      {type.value === 'group' && index >= 2 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            remove(index)
                          }}
                        >
                          <TrashIcon className="mx-2 size-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {type.value === 'group' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                append({ url: '' })
              }}
            >
              Add URL
            </Button>
          )}
        </div>
        <div className="w-full space-y-2">
          <div className="flex w-full items-center">
            <div className="w-1/3">
              <span className="text-sm font-medium leading-none">
                Subdomain
              </span>
            </div>
            <div className="w-1/3">
              <span className="text-sm font-medium leading-none">Domain</span>
            </div>
            <div className="w-1/3">
              <span className="text-sm font-medium leading-none">Path</span>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3">
              <SubdomainSelector
                currentDomainUid={currentDomain.value.uid ?? ''}
              />
            </div>
            <div className="w-1/3">
              <DomainSelector />
            </div>
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormControl>
                    <Input {...field} className="rounded-l-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Final url will be {shortUrl.toString()}
          </p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password..."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The link is initially public, but if you enter a password,
                further access will require it
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
