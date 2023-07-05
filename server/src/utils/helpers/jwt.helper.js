import jwt from 'jsonwebtoken'

export const generateJwtToken = (payload, expiresIn) => {
	try {
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
	} catch (error) {
		return false;
	}
}

export const verifyJwtToken = (token)=> {
	try {
		return jwt.verify(token, (process.env.JWT_SECRET));
	} catch (err) {
		return false;
	}
};
