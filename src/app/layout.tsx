import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "moong - 반려견 지출 관리 가족 앱",
  description:
    "뭉뭉이와 함께한 모든 순간, 뭉이 대신 기억해드려요. 가족과 함께하는 반려견 지출 관리 앱 moong.",
  openGraph: {
    title: "moong - 반려견 지출 관리 가족 앱",
    description:
      "뭉뭉이와 함께한 모든 순간, 뭉이 대신 기억해드려요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} antialiased`}>{children}</body>
    </html>
  );
}
