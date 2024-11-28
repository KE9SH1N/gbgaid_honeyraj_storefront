export const validateEmail = (email: string) => {
	// Regular expression for basic email validation
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (regex) {
		return regex.test(email) ? email : null;
	}
	return null;
};
