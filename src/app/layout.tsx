import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/common/Providers";
import "react-quill/dist/quill.snow.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
	title: "Honeyraj",
	description: "Honeyraj",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<head>
				<title>{metadata.title as string}</title>
				<meta name="description" content={metadata.description as string} />
			</head>
			<body className={inter.className}>
				<NextIntlClientProvider messages={messages}>
					<CookiesProvider>
						<Providers>
							<main>{children}</main>
						</Providers>
					</CookiesProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
