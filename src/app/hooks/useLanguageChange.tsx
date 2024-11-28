import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/features/intl/languageSlice";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const useLanguageChange = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const handleLanguageChange = (language: string) => {
		dispatch(setLanguage(language));
		setDropdownOpen(false);

		if (pathname === `/bn` || pathname === `/en` || pathname === `/`) {
			router.push(language);
		} else {
			const newPathname = pathname.replace(/^\/[a-z]{2}\//, `/${language}/`);
			router.push(newPathname);
		}
	};

	return handleLanguageChange;
};

export default useLanguageChange;
