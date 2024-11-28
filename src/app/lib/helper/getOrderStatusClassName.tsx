export const getStatusClassName = (statusValue: any) => {
	if (statusValue === "1") {
		return "bg-[#E6E6E6] text-[#0B0B0B]"; //Pending
	} else if (statusValue === "2") {
		return "bg-[#edfffe] text-[#000000]"; //Approved
	} else if (statusValue === "4") {
		return "bg-[#fff3e5] text-[#ff8800]"; //Hold
	} else if (statusValue === "3") {
		return "bg-[#fffbe5] text-[#ff8800]"; //Unreachable
	} else if (statusValue === "5") {
		return "bg-[#9faff7] text-[#000000]"; //Store
	} else if (statusValue === "6") {
		return "bg-[#c0c0c0] text-[#ff8800]"; //Packing
	} else if (statusValue === "0") {
		return "bg-[#fe2e2e] text-white"; //Cancel
	} else if (statusValue === "8") {
		return "text-[#15B22E] bg-[#CCF0CC]"; //Delivered
	} else if (statusValue === "7") {
		return "bg-[#e4fffe] text-[#00e1e2]"; //In-Transite
	} else if (statusValue === "11") {
		return "bg-[#ffe8ff] text-[#000000]"; //Return
	} else if (statusValue === "12") {
		return "bg-[#ffb3d9] text-[#000000]"; //Partial Return
	} else {
		return "bg-[#9e9e9e] text-[#ffffff]"; //Cancel
	}
};
