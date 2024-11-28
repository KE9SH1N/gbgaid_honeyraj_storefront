export const formatDate = (dateString: any) => {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, "0");
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = Math.floor(date.getMinutes() / 10);

	const period = hours >= 12 ? "pm" : "am";
	hours = hours % 12 || 12;

	const formattedTime = `${hours}.${minutes}${period}`;

	return `${day}-${month}-${year}, ${formattedTime}`;
};

export const formatDateMobile = (dateString: any) => {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, "0");
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
};
