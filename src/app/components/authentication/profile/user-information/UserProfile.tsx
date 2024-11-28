"use client";
import React, { useState } from "react";
import UserProfileHead from "./UserProfileHead";
import UserProfileBio from "./UserProfileBio";
import UserProfileEdit from "./UserProfileEdit";

const UserProfile = () => {
	const [editProfile, setEditProfile] = useState<boolean>(false);

	const handleUserProfileEdit = () => {
		setEditProfile(!editProfile);
	};
	return (
		<div className="w-full">
			{!editProfile ? (
				<div>
					<UserProfileHead handleUserProfileEdit={handleUserProfileEdit} />
					<UserProfileBio />
				</div>
			) : (
				<div>
					<UserProfileEdit handleUserProfileEdit={handleUserProfileEdit} />
				</div>
			)}
		</div>
	);
};

export default UserProfile;
