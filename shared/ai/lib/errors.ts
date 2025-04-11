export class AIServiceValidationError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AIServiceValidationError'
		Object.setPrototypeOf(this, AIServiceValidationError.prototype)
	}
}

export class AIServiceError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AIServiceError'
		Object.setPrototypeOf(this, AIServiceError.prototype)
	}
}
