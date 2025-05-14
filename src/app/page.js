import { ThemeProvider } from "next-themes";
import HeroSection from "./Components/HeroSection";
import LiveDealBanner from "./Components/LiveDealBanner";
import FeaturedProducts from "./Components/FeaturedProducts";
import CategoryGrid from "./Components/CategoryGrid";
import TrustSection from "./Components/TrustSection";
import NewsletterSection from "./Components/NewsletterSection";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import WhyChooseUs from "./Components/WhyChooseUs";
import AboutUs from "./Components/AboutUs";



export default function Home() {
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
     
      <div className="min-h-screen flex flex-col">
   
        
        <main className="flex-grow">
          {/* <Header/> */}
          <HeroSection/>
          <LiveDealBanner/>
          <WhyChooseUs/>
          <div className="container mx-auto px-4 py-12 space-y-24">
           <CategoryGrid/>
           <FeaturedProducts/>
           <FeaturedProducts/>
           <FeaturedProducts/>
           <TrustSection/>
           <AboutUs/>
           <NewsletterSection/>
           <Footer/>
          </div>
        </main>
      
        
      </div>
    </ThemeProvider>
  )
}
