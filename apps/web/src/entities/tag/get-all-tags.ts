'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { TagType } from './tag-type'

const getAllTags = async (): Promise<TagType[]> => {
  const session = await auth()
  const response = await fetch(`${envServer.BACKEND_URL}/user/tags`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken ?? ''}`,
    },
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  const responseData = (await response.json()) as { data: TagType[] }
  return responseData.data
}

export default getAllTags
