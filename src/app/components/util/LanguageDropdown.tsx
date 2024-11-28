import React, { startTransition, useEffect, useRef, useState } from "react";
import { IoIosGlobe } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
	languageSelector,
	setLanguage,
} from "../../redux/features/intl/languageSlice";
import { useParams, usePathname } from "next/navigation";
import useLanguageChange from "../../hooks/useLanguageChange";
import { useTranslations } from "next-intl";
import UseOutsideClickAndEscape from "../../hooks/useDropdown";
import { useCookies } from "next-client-cookies";
import { defaultLocale, Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";

interface LanguageDropdownColorProps {
	textColor: string;
	borderColor: string;
	bgColor: string;
	dropdownopenColor: string;
}

const LanguageDropdown: React.FC<LanguageDropdownColorProps> = ({
	textColor,
	borderColor,
	bgColor,
	dropdownopenColor,
}) => {
	const dispatch = useDispatch();
	const cookies = useCookies();
	const path = usePathname();
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const dropdownRef = useRef<HTMLDivElement>(null);

	// const params = useParams();

	// const handleLanguageChange = useLanguageChange();

	// For multi-language
	const t = useTranslations("languageChange");

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	let activeLanguage = cookies.get("NEXT_LOCALE");

	// useEffect(() => {
	// 	if (params.locale === "bn" || params.locale === "en") {
	// 		dispatch(setLanguage(params.locale));
	// 	} else {
	// 		dispatch(setLanguage("bn"));
	// 	}
	// }, [params.locale, dispatch]);

	const handleHover = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const target = e.target as HTMLButtonElement;

		target.style.backgroundColor = textColor;
		target.style.color = bgColor;
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const target = e.target as HTMLElement;

		target.style.backgroundColor = "";
		target.style.color = textColor;
	};

	useEffect(() => {
		if (activeLanguage) {
			cookies.set("NEXT_LOCALE", defaultLocale);
			dispatch(setLanguage(defaultLocale));
			startTransition(() => {
				setUserLocale(defaultLocale);
			});
		}
	}, [path]);

	// next intl language selector
	const handleLanguage = (language: string) => {
		const locale = language as Locale;
		startTransition(() => {
			setUserLocale(locale);
		});
		dispatch(setLanguage(language));
		setDropdownOpen(false);
	};

	const selectedLanguage = useSelector(languageSelector);

	return (
		<div
			className="relative flex-col items-center w-20 rounded-sm"
			ref={dropdownRef}
		>
			<button
				onClick={() => setDropdownOpen((prev) => !prev)}
				className="w-full p-1 ct-flex-between rounded-sm capitalize"
			>
				<IoIosGlobe className="text-xl" style={{ color: textColor }} />
				<span className={`text-${textColor}`}>
					{selectedLanguage === "bn" ? "বাং" : "En"}
				</span>
				<div>
					<FaAngleDown
						className={`${
							isDropdownOpen ? "" : "rotate-180"
						} smooth-animation-mid`}
						style={{ color: textColor }}
					/>
				</div>
			</button>

			<div
				className={`absolute w-full top-10 flex flex-col items-start rounded-sm overflow-hidden border border-${borderColor} ${
					isDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				} smooth-animation-mid`}
				style={{ backgroundColor: bgColor, borderColor: borderColor }}
			>
				<ul
					className={`w-full flex flex-col justify-between text-sm font-light cursor-pointer rounded-sm capitalize`}
					style={{ color: textColor }}
				>
					<li
						onClick={() => handleLanguage("bn")}
						className={`hover:bg-${textColor} hover:text-${bgColor} p-2`}
						onMouseEnter={handleHover}
						onMouseLeave={handleMouseLeave}
					>
						{t("bangla")}
					</li>
					<li
						onClick={() => handleLanguage("en")}
						className={`hover:bg-${textColor} hover:text-${bgColor} p-2`}
						onMouseEnter={handleHover}
						onMouseLeave={handleMouseLeave}
					>
						{t("english")}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default LanguageDropdown;
