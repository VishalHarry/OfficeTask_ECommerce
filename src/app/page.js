import { ThemeProvider } from "next-themes";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import LiveDealBanner from "./Components/LiveDealBanner";
import FeaturedProducts from "./Components/FeaturedProducts";
import CategoryGrid from "./Components/CategoryGrid";
import TrustSection from "./Components/TrustSection";
import NewsletterSection from "./Components/NewsletterSection";


export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
     
      <div className="min-h-screen flex flex-col">
   
        <Header />
        <main className="flex-grow">
          <HeroSection/>
          <LiveDealBanner/>
          <div className="container mx-auto px-4 py-12 space-y-24">
           <FeaturedProducts/>
           <CategoryGrid/>
           <TrustSection/>
           <NewsletterSection/>
          </div>
        </main>
        <Footer />
        
      </div>
    </ThemeProvider>
  )
}
