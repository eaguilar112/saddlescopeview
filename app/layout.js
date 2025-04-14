import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calgary Zoo",
  description: "Welcome to the Calgary Zoo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Fixed Navbar at top */}
        <Navbar />

        {/* Push content below the navbar */}
        <div className="mt-[1px]">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
