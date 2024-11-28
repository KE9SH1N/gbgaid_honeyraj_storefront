"use client";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import React, { useRef } from "react";

const VideoPlayer = () => {
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);
	return (
		<div
			ref={imageRef}
			className="ct-container flex justify-center items-center py-6"
		>
			<video
				className="w-full lg:h-[284px] h-[148px] mx-auto"
				controls
				poster="/image/Video banner.png"
			>
				<source src="/" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export default VideoPlayer;
