import ChangeDevice from "@/components/ChangeDevice";
import Providers from "@/lib/Providers";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import NavBar from "@/components/navBar/NavBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://cookoff.codechefvit.com/"),
  title: "CookOff 9.0",
  description: "Made with ♡ by CodeChef-VIT",
  icons: [{ rel: "icon", url: "/chefshat.svg" }],
  openGraph: {
    title: "CookOff 9.0",
    images: [{ url: "/cookoff.png" }],
    url: "https://cookoff.codechefvit.com/",
    type: "website",
    description: "Made with ♡ by CodeChef-VIT",
    siteName: "CookOff 9.0",
  },
  applicationName: "CookOff 9.0",
  keywords: [
    "CodeChef",
    "VIT",
    "Vellore Institute of Technology",
    "GraVITas",
    "gravitas",
    "CodeChef-VIT",
    "Sulu",
    "Judge0",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-dark">
        <div className="block lg:hidden">
          <ChangeDevice />
        </div>
        <div className="hidden bg-[#FFF8D8] lg:block">
          {/* <NavBar /> */}
          <Toaster position="top-right" toastOptions={{ id: "_toast" }} />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
