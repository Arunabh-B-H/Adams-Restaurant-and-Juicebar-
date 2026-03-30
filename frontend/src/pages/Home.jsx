// import { useEffect, useState } from 'react';
// import API from '../api';
// import Navbar from '../components/Navbar';
// import HeroSection from '../components/HeroSection';
// import AboutSection from '../components/AboutSection';
// import FounderSection from '../components/FounderSection';
// import GallerySection from '../components/GallerySection';
// import MenuSection from '../components/MenuSection';
// import ReviewsSection from '../components/ReviewsSection';
// import ContactSection from '../components/ContactSection';
// import Footer from '../components/Footer';

// export default function Home() {
//   const [content, setContent] = useState({});

//   useEffect(() => {
//     API.get('/content').then(res => setContent(res.data)).catch(() => {});
//   }, []);
// if (loading) return <div>Loading Restaurant...</div>;
//   return (
//     <div>
//       <Navbar />
//       <HeroSection content={content.hero} />
//       <AboutSection content={content.about} />
//       <FounderSection content={content.founder} />
//       <GallerySection />
//       <MenuSection content={content.menuHighlights} />
//       <ReviewsSection />
//       <ContactSection content={content.contact} />
//       <Footer />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FounderSection from "../components/FounderSection";
import GallerySection from "../components/GallerySection";
import MenuSection from "../components/MenuSection";
import ReviewsSection from "../components/ReviewsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true); // <--- THIS WAS MISSING

  useEffect(() => {
    API.get("/content")
      .then((res) => {
        setContent(res.data);
        setLoading(false); // Update state to false when data arrives
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setLoading(false); // Stop loading even if there is an error
      });
  }, []);

  if (loading) return <div>Loading Restaurant...</div>;

  return (
    <div>
      <Navbar />
      {/* Use optional chaining (?.) to prevent crashes if data is missing */}
      <HeroSection content={content?.hero} />
      <AboutSection content={content?.about} />
      <FounderSection content={content?.founder} />
      <GallerySection />
      <MenuSection content={content?.menuHighlights} />
      <ReviewsSection />
      <ContactSection content={content?.contact} />
      <Footer content={content?.contact} />
    </div>
  );
}
