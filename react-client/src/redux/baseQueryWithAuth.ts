import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import type { RootState } from '@/redux/store'
import { BACKEND_URL } from '@/shared/urls'

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${BACKEND_URL}/shorty/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).authToken
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

export default baseQueryWithAuth
