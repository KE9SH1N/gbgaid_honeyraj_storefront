export const getPhoneInputClassName = (phoneNumber: string | null) => {
	let inputClassName =
		"w-full rounded px-3 py-2 border focus:outline-none placeholder:capitalize";

	if (phoneNumber === null || phoneNumber.length === 0) {
		// Null or empty string case
		inputClassName += " bg-[#F6F6F6] focus:border-[#F68821]";
	} else if (phoneNumber.length < 11) {
		// Less than 11 digits
		inputClassName += " bg-[#FFE9E9] focus:border-[#FF2622]";
	} else if (phoneNumber.length === 11) {
		// Exactly 11 digits
		inputClassName += " bg-white focus:border-[#00B500]";
	}

	return inputClassName;
};
