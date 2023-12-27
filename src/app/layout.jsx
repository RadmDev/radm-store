import Navbar from "@/components/layouts/fragments/Navbar";
import { Poppins } from "next/font/google";
import ComponentException from "./ComponentException";
import { NextAuthProvider } from "./Providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const disableNavbar = ["auth", "admin"];

export const metadata = {
  title: "Home",
  description: "Home page from radm store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ComponentException paths={disableNavbar} component={<Navbar />} />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
