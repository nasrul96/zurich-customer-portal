import { Footer, Header, Providers } from "@app/components";
import "@styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zurich Customer Portal",
  description:
    "Zurich is uniquely positioned in Malaysia where we offer a wide range of Insurance and Takaful solutions – covering conventional products of Life Insurance and General Insurance as well as Shariah-compliant products of Family Takaful and General Takaful under one single brand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
