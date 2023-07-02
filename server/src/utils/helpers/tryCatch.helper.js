export default (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((error) => {
			if (process.env.NODE_ENV === "development") console.log(error);
			return next(error);
		});
	};
};
