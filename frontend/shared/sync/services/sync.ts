import type { Card, StorageService } from '~/shared'

export class SyncService {
	constructor(
		private localStore: StorageService,
		private remoteStore: StorageService,
		private deviceId: string
	) {}

	async sync() {
		const lastSync = await this.getLastSync()

		// Get local and remote changes since last sync
		const [localChanges, remoteChanges] = await Promise.all([
			this.localStore.getModifiedSince(lastSync),
			this.remoteStore.getModifiedSince(lastSync),
		])

		// Resolve conflicts - newer wins
		const resolved = this.resolveConflicts(localChanges, remoteChanges)

		// Save resolved states
		await Promise.all([
			...resolved.local.map((card) => this.localStore.saveCard(card)),
			...resolved.remote.map((card) => this.remoteStore.saveCard(card)),
		])

		await this.updateLastSync()
	}

	private resolveConflicts(local: Card[], remote: Card[]) {
		// Implementation of conflict resolution strategy
		// Returns arrays of cards to save to each store
		return {
			local: [],
			remote: [],
		}
	}

	private async getLastSync(): Promise<number> {
		// Get last sync timestamp from storage
		return 0
	}

	private async updateLastSync(): Promise<void> {
		// Save current timestamp as last sync
	}
}
