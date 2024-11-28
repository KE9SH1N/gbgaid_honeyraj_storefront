export const handlePhoneNumber = (
	e: React.ChangeEvent<HTMLInputElement>,
	dispatch: any,
	setUserCreateAccountPhoneNumber?: any,
	setUserLoginPhoneNumber?: any
) => {
	const value = e.target.value;
	if (/^[\d০১২৩৪৫৬৭৮৯]*$/.test(value) && value.length <= 11) {
		if (setUserCreateAccountPhoneNumber) {
			dispatch(setUserCreateAccountPhoneNumber(value));
		}
		if (setUserLoginPhoneNumber) {
			dispatch(setUserLoginPhoneNumber(value));
		}
	}
};
