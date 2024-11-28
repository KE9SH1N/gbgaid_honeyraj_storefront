export const validatePassword = (value: string) => {
	if (/^[a-zA-Z0-9]*$/.test(value) && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
		return value;
	}
	return null;
};
