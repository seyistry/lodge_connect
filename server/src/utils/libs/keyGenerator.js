export const otpGenerator = (len = 4) =>
	String(Math.ceil(Math.random() * 10 ** len)).padEnd(len, "0");
