import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
Image;

const Certificates = () => {
	// For multi-language
	const t = useTranslations("certificates");
	return (
		<div className="flex-col ct-flex-center gap-x-4">
			<div className="">
				<div className="ct-flex-start items-center gap-x-3 my-2 px-3 py-1 border border-gbPrimaryColor rounded-lg">
					<div>
						<Image src="/image/BSTI_Logo.png" alt="" width={40} height={28} />
					</div>
					<div>
						<p className=" text-xl font-bold capitalize">{t("bsti")}</p>
					</div>
				</div>
			</div>

			<div className="">
				<div className="ct-flex-start items-center gap-x-3 my-2 px-3 py-1 border border-gbPrimaryColor rounded-lg">
					<div>
						<Image src="/image/medal.svg" alt="" width={18} height={29} />
					</div>
					<div>
						<p className=" text-xl font-bold capitalize">{t("achievement")}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Certificates;
