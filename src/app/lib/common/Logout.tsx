import { deleteCookie } from "cookie-handler-pro";
import { redirect } from "next/navigation";

export const handleLogout = () => {
	localStorage.removeItem("accessToken");
	deleteCookie("accessToken");
	deleteCookie("accessToken", {
		path: "/",
		domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
	});
	redirect("/");
};
