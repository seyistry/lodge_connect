class AppError extends Error {
	constructor(message, statusCode = 500) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.statusCode = statusCode || this.statusCode;
	}
}

export default AppError;
