"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaGoogle, FaLinkedin } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { getCurrentYear } from "../../lib/helper/getCurrentYear";
import { TfiYoutube } from "react-icons/tfi";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const FooterMain: React.FC = () => {
	// For multi-language
	const t = useTranslations("footerMain");

	const selectedLanguage = useSelector(languageSelector);
	return (
		<footer className=" bg-blackBg mb-16 lg:mb-0">
			{/* for large display */}
			<div className="ct-container hidden text-white text-xs md:ct-flex-between py-10">
				<div>
					<p>
						<span>© {getCurrentYear()}</span>&nbsp;&nbsp;
						<span>{t("copyright")}</span>
					</p>
				</div>
				<div>
					<ul className="flex items-center justify-center space-x-8">
						<li>
							<Link href={`/policy`}>{t("footerMenu.privecy")}</Link>
						</li>
						<li>
							<Link href={`/terms`}>{t("footerMenu.terms")}</Link>
						</li>
						<li>
							<Link href={`/return-refund`}>
								{t("footerMenu.refund-policy")}
							</Link>
						</li>
						<li>
							<Link href={`/faq`}>{t("footerMenu.faq")}</Link>
						</li>
						<li>
							<Link href={`https://www.youtube.com/@Ghorerbazar`}>
								<TfiYoutube className="text-2xl" />
							</Link>
						</li>

						<li>
							<Link
								href={` https://www.facebook.com/Ghorerbazarbd.comm?mibextid=ZbWKwL`}
							>
								<FaFacebookSquare className="text-2xl" />
							</Link>
						</li>

						<li>
							<Link href={`https://www.linkedin.com/company/ghorerbazar-bd/`}>
								<FaLinkedin className="text-2xl" />
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="ct-container flex-col pt-0 space-y-4 md:hidden pb-6">
				<div className="text-white text-xs">
					<ul
						className="ct-flex-center gap-x-6 py-6 
					"
					>
						<li>
							<Link href={`/contact`}>{t("footerMenu.contact")}</Link>
						</li>
						<li>
							<Link href={`/faq`}>{t("footerMenu.faq")}</Link>
						</li>
						<li>
							<Link href={`/about`}>{t("footerMenu.about-us")}</Link>
						</li>
					</ul>
					<ul className="ct-flex-center gap-x-6 py-6 border-t border-footerMainBorderTop">
						<li>
							<Link href={`/terms`}>{t("footerMenu.terms")}</Link>
						</li>
						<li>
							<Link href={`/policy`}>{t("footerMenu.privecy")}</Link>
						</li>
					</ul>
				</div>
				<div className="text-center border-t border-footerMainBorderTop">
					<p className=" text-xs text-footerMainText pt-6">{t("copyright")}</p>
				</div>
				<div>
					<ul className="ct-flex-evenly">
						<li>
							<Link href={`https://www.youtube.com/@Ghorerbazar`}>
								<TfiYoutube className="text-2xl text-white" />
							</Link>
						</li>
						<li>
							<Link
								href={`https://www.facebook.com/Ghorerbazarbd.comm?mibextid=ZbWKwL`}
							>
								<FaFacebookSquare className="text-2xl text-white" />
							</Link>
						</li>
						<li>
							<Link href={`https://www.linkedin.com/company/ghorerbazar-bd/`}>
								<FaLinkedin className="text-2xl text-white" />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default FooterMain;
