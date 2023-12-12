/** @format */

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
// import { Inter } from 'next/font/google'
import "./globals.css";
import Navbar from "./components/navbar/NavBar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModel";
import LoginModal from "./components/Modals/LoginModel";
import RentModal from "./components/Modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/Modals/SearchModal";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb project",
};
const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
