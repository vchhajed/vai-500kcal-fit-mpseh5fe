export interface BusinessInfo { name: string; tagline: string; phone: string; email: string; address: string; mapUrl: string; }
export interface HeroSection { headline: string; subheadline: string; ctaText: string; ctaSecondaryText: string; image: string; }
export interface AboutSection { badge: string; title: string; body: string; stats: Array<{ value: string; label: string }>; image: string; }
export interface Service { name: string; description: string; icon: string; image: string; }
export interface Testimonial { name: string; text: string; role: string; rating: number; }
export interface ContactSection { title: string; subtitle: string; }
export interface FooterSection { tagline: string; links: Array<{ label: string; href: string }>; }
export interface Theme { primary: string; primaryDark: string; secondary: string; accent: string; background: string; surface: string; textPrimary: string; textSecondary: string; headingFont: string; bodyFont: string; }
export interface SiteContent { business: BusinessInfo; hero: HeroSection; about: AboutSection; services: Service[]; testimonials: Testimonial[]; contact: ContactSection; footer: FooterSection; theme: Theme; }

export const content: SiteContent = {
  business: {
    name: "500Kcal.fit",
    tagline: "Professional Food Delivery Services",
    phone: "+91 98765 43210",
    email: "hello@business.com",
    address: "India",
    mapUrl: "https://maps.google.com/?q=India",
  },
  hero: {
    headline: "Track Your Metrics, Transform Your Body, Deliver Your Goals",
    subheadline: "Download our app to monitor health metrics, order personalized meals, and get expert nutritionist guidance. Build lean muscle with professional food delivery tailored to your fitness journey.",
    ctaText: "Download App Now",
    ctaSecondaryText: "Learn More",
    image: "/images/hero.jpg",
  },
  about: {
    badge: "About 500Kcal.fit",
    title: "Your Complete Health Transformation Platform",
    body: "We combine cutting-edge body metrics tracking with professional meal delivery and expert nutritionist consultations. Our app helps you achieve lean muscle growth and sustainable health goals through personalized nutrition and real-time progress monitoring. Available on our website, Zomato, and Swiggy for your convenience.",
    stats: [
      { value: "15K+", label: "Active Users" },
      { value: "2500+", label: "Meals Delivered Daily" },
      { value: "50+", label: "Certified Nutritionists" },
      { value: "4.8★", label: "Average Rating" },
    ],
    image: "/images/about.jpg",
  },
  services: [
    {
    name: "Body Metrics Tracking",
    description: "Advanced app-based tracking of weight, body composition, muscle mass, and metabolic data with real-time analytics and progress insights.",
    icon: "📊",
    image: "/images/service-1.jpg",
  },
    {
    name: "Personalized Meal Plans",
    description: "AI-powered meal recommendations customized to your fitness goals, dietary preferences, and calorie targets for optimal results.",
    icon: "🍽️",
    image: "/images/service-2.jpg",
  },
    {
    name: "Professional Nutrition Consultation",
    description: "One-on-one sessions with certified nutritionists to create customized diet strategies aligned with your health objectives.",
    icon: "👨‍⚕️",
    image: "/images/service-3.jpg",
  },
    {
    name: "Fresh Meal Delivery",
    description: "Ready-to-eat meals prepared with premium ingredients, delivered hot to your doorstep with macro-balanced nutrition information.",
    icon: "🚚",
    image: "/images/service-4.jpg",
  },
    {
    name: "Fitness Goal Monitoring",
    description: "Track lean muscle gain, fat loss, and performance metrics with weekly progress reports and expert recommendations for optimization.",
    icon: "💪",
    image: "/images/service-5.jpg",
  },
    {
    name: "Multi-Platform Integration",
    description: "Access seamless service across our dedicated app, website, Zomato, and Swiggy for maximum convenience and flexibility.",
    icon: "📱",
    image: "/images/service-6.jpg",
  },
  ],
  testimonials: [
    { name: "Arjun Sharma", text: "500Kcal.fit completely transformed my fitness journey. The meal plans are perfectly balanced, and tracking my metrics through the app kept me motivated. I've gained 5kg of lean muscle in 3 months.", role: "Fitness Enthusiast", rating: 5 },
    { name: "Priya Kapoor", text: "The nutritionist consultations are game-changing. They understood my goals and created a personalized plan that actually works. Combined with their meal delivery, seeing results has never been easier.", role: "Health Coach", rating: 5 },
    { name: "Rajesh Patel", text: "Best food delivery service for fitness goals. Fresh meals, accurate macros, and the app integration is seamless. Worth every penny for the quality and convenience.", role: "Professional Athlete", rating: 5 },
  ],
  contact: {
    title: "Start Your Transformation Today",
    subtitle: "Download our app, register on the website, or order through Zomato and Swiggy. Connect with our nutritionists and begin your lean muscle journey with professional food delivery.",
  },
  footer: {
    tagline: "Professional food delivery for health-conscious individuals committed to achieving their fitness goals.",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  theme: {
    "primary": "#2563eb",
    "primaryDark": "#1d4ed8",
    "secondary": "#f0f9ff",
    "accent": "#0ea5e9",
    "background": "#ffffff",
    "surface": "#f1f5f9",
    "textPrimary": "#0f172a",
    "textSecondary": "#64748b",
    "headingFont": "Space Grotesk",
    "bodyFont": "Inter"
  },
};