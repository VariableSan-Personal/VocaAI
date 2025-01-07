import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import { LocalStorageKeys } from '~/shared'

export function useAPIFetch<T>(url: string, options?: FetchOptions): Promise<T> {
	const config = useRuntimeConfig()

	const customFetch = ofetch.create({ baseURL: config.public.baseUrl })

	return customFetch(url, {
		baseURL: config.public.baseUrl as string,
		onRequest({ options }) {
			const token = localStorage.getItem(LocalStorageKeys.Token)
			if (token) {
				options.headers.set('Authorization', `Bearer ${token}`)
			}
		},
		...options,
	}) as Promise<T>
}
