import React from "react";

interface backtoTop {
	buttonText: string;
}

const CustomButton: React.FC<backtoTop> = ({ buttonText }) => {
	return <span>{buttonText}</span>;
};

export default CustomButton;
