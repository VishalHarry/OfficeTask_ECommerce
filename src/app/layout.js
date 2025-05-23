import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ThemeProvider } from "next-themes";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "EDUKAN",
  description: "Edukan is a e-commerce shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
        <ThemeProvider
         attribute="class" 
         defaultTheme="system" 
         enableSystem
         disableTransitionOnChange>
            <Header/>
          {children}
          <Toaster/>
          {/* <Footer/> */}
        </ThemeProvider >
          
      </body>
    </html>
  );
}
