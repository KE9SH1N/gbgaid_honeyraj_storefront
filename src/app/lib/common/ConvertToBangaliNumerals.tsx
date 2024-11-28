// lib/ConvertToBangaliNumerals.ts
export function convertToBengaliNumerals(number: string): string {
	const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
	return number
		.split("")
		.map((digit) => {
			const num = parseInt(digit, 10);
			return isNaN(num) ? digit : bengaliNumerals[num];
		})
		.join("");
}
