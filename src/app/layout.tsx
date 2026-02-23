import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
