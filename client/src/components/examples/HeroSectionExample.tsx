import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <HeroSection 
      phoneNumber="089 123 456 78" 
      onRequestQuote={() => console.log("Request quote clicked")} 
    />
  );
}
