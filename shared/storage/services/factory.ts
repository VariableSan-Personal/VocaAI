import { StorageError, StorageServiceType } from '../lib'
import type { AbstractStorageService } from './abstract'
import { IndexedDBStorage } from './indexeddb'

export class StorageServiceFactory {
	private static instance: StorageServiceFactory
	private currentService: AbstractStorageService | null = null

	private constructor() {}

	public static getInstance(): StorageServiceFactory {
		if (!StorageServiceFactory.instance) {
			StorageServiceFactory.instance = new StorageServiceFactory()
		}
		return StorageServiceFactory.instance
	}

	/**
	 * Creates and returns a storage service based on the specified type.
	 * @throws {StorageError} When an unsupported storage service type is specified.
	 */
	public createService(type: StorageServiceType): AbstractStorageService {
		switch (type) {
			case StorageServiceType.IndexedDB:
				this.currentService = new IndexedDBStorage()
				break
			default:
				throw new StorageError(`Unsupported storage service type: ${type}`)
		}
		return this.currentService
	}

	public getCurrentService(): AbstractStorageService | null {
		return this.currentService
	}
}
