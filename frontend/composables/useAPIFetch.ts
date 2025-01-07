import { useFetch } from '#app'
import { LocalStorageKeys } from '~/shared'

type useFetchType = typeof useFetch

export const useAPIFetch: useFetchType = (path, options = {}) => {
	const config = useRuntimeConfig()

	return useFetch(path, {
		baseURL: config.public.baseUrl as string,
		onRequest({ options }) {
			const token = localStorage.getItem(LocalStorageKeys.Token)
			if (token) {
				options.headers.set('Authorization', `Bearer ${token}`)
			}
		},
		...options,
	})
}
