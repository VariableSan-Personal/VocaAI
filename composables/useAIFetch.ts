import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'

export function useAIFetch<T>(url: string, options?: FetchOptions): Promise<T> {
	const customFetch = ofetch.create({})

	return customFetch(url, {
		...options,
	}) as Promise<T>
}
