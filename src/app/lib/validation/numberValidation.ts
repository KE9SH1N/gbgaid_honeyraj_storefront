export const validatePhoneNumber = (value: string) => {
	if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value) && value.length <= 11) {
		return value;
	}
	return null;
};
