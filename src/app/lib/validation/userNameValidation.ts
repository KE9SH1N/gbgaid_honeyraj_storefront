export const validateUserName = (value: string) => {
	if (/^[a-zA-Z\s]*$/.test(value) && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
		return value;
	}
	return null;
};
