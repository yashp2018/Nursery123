import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    login: "Login",
    cart: "Cart",
    orderNow: "Order Now",
    email: "Email",
    callUs: "Call Us",
    whatsapp: "WhatsApp",
    language: "Language",
    
    // Hero Section
    trustedFarmers: "Trusted by 5000+ Farmers Across India",
    yearsExperience: "28+ Years of",
    farmingExcellence: "Farming Excellence",
    heroDescription: "Ultra-strong grafted seedlings with world-class technology. Premium varieties of Tomato, Chili, Brinjal, Capsicum & more. Bulk orders from 15,000+ plants.",
    exploreProducts: "Explore Products",
    contactUs: "Contact Us",
    isoCertified: "🏆 ISO Certified",
    japaneseGrafting: "🧬 Japanese Grafting Tech",
    panIndiaDelivery: "🚚 Pan-India Delivery",
    b2bPricing: "💰 B2B Pricing",
    scroll: "Scroll",
    
    // Stats
    yearsExp: "Years Experience",
    plantsSupplied: "Plants Supplied",
    happyFarmers: "Happy Farmers",
    statesCovered: "States Covered",
    
    // Categories
    ourCategories: "Our Categories",
    whatWeGrow: "What We Grow",
    categoriesDesc: "Premium grafted seedlings across multiple crop categories, carefully cultivated for Indian farming conditions.",
    crops: "crops",
    varieties: "varieties",
    varietiesAvailable: "varieties available",
    browseCategory: "Browse Category",
    
    // Featured Products
    bestSellers: "Best Sellers",
    featuredVarieties: "Featured Varieties",
    featuredDesc: "Hand-picked premium varieties with proven performance in Indian farming conditions.",
    viewAllProducts: "View All Products",
    
    // Why Choose Us
    ourAdvantages: "Our Advantages",
    whyChooseUs: "Why Choose Us",
    diseaseResistant: "Disease Resistant",
    diseaseResistantDesc: "Our grafted plants offer superior resistance to soil-borne diseases, reducing crop losses significantly.",
    advancedGrafting: "Advanced Grafting",
    advancedGraftingDesc: "World-class Japanese grafting technology ensuring 98%+ survival rate in your fields.",
    timelyDelivery: "Timely Delivery",
    timelyDeliveryDesc: "Precise scheduling of plant readiness and delivery to match your planting season perfectly.",
    premiumQuality: "Premium Quality",
    premiumQualityDesc: "Every seedling undergoes strict quality control before dispatch. No compromise on plant health.",
    panIndiaShipping: "Pan-India Shipping",
    panIndiaShippingDesc: "Temperature-controlled logistics network covering 15+ states with 24-48 hour delivery.",
    expertSupport: "Expert Support",
    expertSupportDesc: "Dedicated agronomists provide variety selection guidance and post-planting crop advisory.",
    
    // Pricing
    transparentPricing: "Transparent Pricing",
    bulkOrderPricing: "Bulk Order Pricing",
    pricingDesc: "Our B2B pricing structure ensures the best rates for your farm. Bigger orders = better prices.",
    
    // CTA
    readyToOrder: "Ready to Place Your Order?",
    ctaDesc: "Contact us for custom quotes, delivery scheduling, and variety recommendations for your region.",
    browseCatalog: "Browse Catalog",
    whatsappUs: "WhatsApp Us",
    callNow: "Call Now",
  },
  hi: {
    // Header
    home: "होम",
    products: "उत्पाद",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    login: "लॉगिन",
    cart: "कार्ट",
    orderNow: "अभी ऑर्डर करें",
    email: "ईमेल",
    callUs: "कॉल करें",
    whatsapp: "व्हाट्सएप",
    language: "भाषा",
    
    // Hero Section
    trustedFarmers: "भारत भर में 5000+ किसानों द्वारा विश्वसनीय",
    yearsExperience: "28+ वर्षों का",
    farmingExcellence: "कृषि उत्कृष्टता",
    heroDescription: "विश्व स्तरीय तकनीक के साथ अति-मजबूत ग्राफ्टेड पौधे। टमाटर, मिर्च, बैंगन, शिमला मिर्च और अधिक की प्रीमियम किस्में। 15,000+ पौधों से थोक ऑर्डर।",
    exploreProducts: "उत्पाद देखें",
    contactUs: "संपर्क करें",
    isoCertified: "🏆 आईएसओ प्रमाणित",
    japaneseGrafting: "🧬 जापानी ग्राफ्टिंग तकनीक",
    panIndiaDelivery: "🚚 पैन-इंडिया डिलीवरी",
    b2bPricing: "💰 बी2बी मूल्य निर्धारण",
    scroll: "स्क्रॉल करें",
    
    // Stats
    yearsExp: "वर्षों का अनुभव",
    plantsSupplied: "पौधे आपूर्ति किए",
    happyFarmers: "खुश किसान",
    statesCovered: "राज्य कवर किए",
    
    // Categories
    ourCategories: "हमारी श्रेणियां",
    whatWeGrow: "हम क्या उगाते हैं",
    categoriesDesc: "भारतीय कृषि परिस्थितियों के लिए सावधानीपूर्वक खेती की गई कई फसल श्रेणियों में प्रीमियम ग्राफ्टेड पौधे।",
    crops: "फसलें",
    varieties: "किस्में",
    varietiesAvailable: "किस्में उपलब्ध",
    browseCategory: "श्रेणी ब्राउज़ करें",
    
    // Featured Products
    bestSellers: "सर्वश्रेष्ठ विक्रेता",
    featuredVarieties: "विशेष किस्में",
    featuredDesc: "भारतीय कृषि परिस्थितियों में सिद्ध प्रदर्शन के साथ हाथ से चुनी गई प्रीमियम किस्में।",
    viewAllProducts: "सभी उत्पाद देखें",
    
    // Why Choose Us
    ourAdvantages: "हमारे लाभ",
    whyChooseUs: "हमें क्यों चुनें",
    diseaseResistant: "रोग प्रतिरोधी",
    diseaseResistantDesc: "हमारे ग्राफ्टेड पौधे मिट्टी जनित रोगों के खिलाफ बेहतर प्रतिरोध प्रदान करते हैं।",
    advancedGrafting: "उन्नत ग्राफ्टिंग",
    advancedGraftingDesc: "विश्व स्तरीय जापानी ग्राफ्टिंग तकनीक जो आपके खेतों में 98%+ जीवित रहने की दर सुनिश्चित करती है।",
    timelyDelivery: "समय पर डिलीवरी",
    timelyDeliveryDesc: "आपके रोपण सीजन से पूरी तरह मेल खाने के लिए पौधों की तैयारी और डिलीवरी का सटीक शेड्यूलिंग।",
    premiumQuality: "प्रीमियम गुणवत्ता",
    premiumQualityDesc: "प्रत्येक पौधा भेजने से पहले सख्त गुणवत्ता नियंत्रण से गुजरता है।",
    panIndiaShipping: "पैन-इंडिया शिपिंग",
    panIndiaShippingDesc: "24-48 घंटे की डिलीवरी के साथ 15+ राज्यों को कवर करने वाला तापमान-नियंत्रित लॉजिस्टिक्स नेटवर्क।",
    expertSupport: "विशेषज्ञ सहायता",
    expertSupportDesc: "समर्पित कृषि विशेषज्ञ किस्म चयन मार्गदर्शन और रोपण के बाद फसल सलाह प्रदान करते हैं।",
    
    // Pricing
    transparentPricing: "पारदर्शी मूल्य निर्धारण",
    bulkOrderPricing: "थोक ऑर्डर मूल्य निर्धारण",
    pricingDesc: "हमारी बी2बी मूल्य निर्धारण संरचना आपके खेत के लिए सर्वोत्तम दरें सुनिश्चित करती है।",
    
    // CTA
    readyToOrder: "अपना ऑर्डर देने के लिए तैयार हैं?",
    ctaDesc: "कस्टम कोट्स, डिलीवरी शेड्यूलिंग और आपके क्षेत्र के लिए किस्म की सिफारिशों के लिए हमसे संपर्क करें।",
    browseCatalog: "कैटलॉग ब्राउज़ करें",
    whatsappUs: "हमें व्हाट्सएप करें",
    callNow: "अभी कॉल करें",
  },
  mr: {
    // Header
    home: "मुख्यपृष्ठ",
    products: "उत्पादने",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
    login: "लॉगिन",
    cart: "कार्ट",
    orderNow: "आता ऑर्डर करा",
    email: "ईमेल",
    callUs: "कॉल करा",
    whatsapp: "व्हाट्सअॅप",
    language: "भाषा",
    
    // Hero Section
    trustedFarmers: "संपूर्ण भारतातील 5000+ शेतकऱ्यांचा विश्वास",
    yearsExperience: "28+ वर्षांचा",
    farmingExcellence: "शेती उत्कृष्टता",
    heroDescription: "जागतिक दर्जाच्या तंत्रज्ञानासह अति-मजबूत कलम रोपे। टोमॅटो, मिरची, वांगी, ढोबळी मिरची आणि अधिकच्या प्रीमियम जाती। 15,000+ रोपांपासून मोठ्या प्रमाणात ऑर्डर.",
    exploreProducts: "उत्पादने पहा",
    contactUs: "संपर्क साधा",
    isoCertified: "🏆 आयएसओ प्रमाणित",
    japaneseGrafting: "🧬 जपानी कलम तंत्रज्ञान",
    panIndiaDelivery: "🚚 पॅन-इंडिया डिलिव्हरी",
    b2bPricing: "💰 बी2बी किंमत",
    scroll: "स्क्रोल करा",
    
    // Stats
    yearsExp: "वर्षांचा अनुभव",
    plantsSupplied: "रोपे पुरवली",
    happyFarmers: "समाधानी शेतकरी",
    statesCovered: "राज्ये व्यापली",
    
    // Categories
    ourCategories: "आमच्या श्रेणी",
    whatWeGrow: "आम्ही काय पिकवतो",
    categoriesDesc: "भारतीय शेती परिस्थितीसाठी काळजीपूर्वक लागवड केलेल्या अनेक पीक श्रेणींमध्ये प्रीमियम कलम रोपे.",
    crops: "पिके",
    varieties: "जाती",
    varietiesAvailable: "जाती उपलब्ध",
    browseCategory: "श्रेणी ब्राउझ करा",
    
    // Featured Products
    bestSellers: "सर्वोत्तम विक्रेते",
    featuredVarieties: "वैशिष्ट्यीकृत जाती",
    featuredDesc: "भारतीय शेती परिस्थितीत सिद्ध कामगिरीसह हाताने निवडलेल्या प्रीमियम जाती.",
    viewAllProducts: "सर्व उत्पादने पहा",
    
    // Why Choose Us
    ourAdvantages: "आमचे फायदे",
    whyChooseUs: "आम्हाला का निवडावे",
    diseaseResistant: "रोग प्रतिरोधक",
    diseaseResistantDesc: "आमची कलम रोपे मातीजन्य रोगांविरुद्ध उत्कृष्ट प्रतिकार देतात.",
    advancedGrafting: "प्रगत कलम",
    advancedGraftingDesc: "जागतिक दर्जाचे जपानी कलम तंत्रज्ञान जे तुमच्या शेतात 98%+ जगण्याचा दर सुनिश्चित करते.",
    timelyDelivery: "वेळेवर डिलिव्हरी",
    timelyDeliveryDesc: "तुमच्या लागवड हंगामाशी पूर्णपणे जुळण्यासाठी रोपांची तयारी आणि डिलिव्हरीचे अचूक शेड्यूलिंग.",
    premiumQuality: "प्रीमियम गुणवत्ता",
    premiumQualityDesc: "प्रत्येक रोप पाठवण्यापूर्वी कठोर गुणवत्ता नियंत्रणातून जाते.",
    panIndiaShipping: "पॅन-इंडिया शिपिंग",
    panIndiaShippingDesc: "24-48 तासांच्या डिलिव्हरीसह 15+ राज्यांना कव्हर करणारे तापमान-नियंत्रित लॉजिस्टिक नेटवर्क.",
    expertSupport: "तज्ञ समर्थन",
    expertSupportDesc: "समर्पित कृषी तज्ञ जात निवड मार्गदर्शन आणि लागवडीनंतर पीक सल्ला देतात.",
    
    // Pricing
    transparentPricing: "पारदर्शक किंमत",
    bulkOrderPricing: "मोठ्या प्रमाणात ऑर्डर किंमत",
    pricingDesc: "आमची बी2बी किंमत रचना तुमच्या शेतासाठी सर्वोत्तम दर सुनिश्चित करते.",
    
    // CTA
    readyToOrder: "तुमची ऑर्डर देण्यास तयार आहात?",
    ctaDesc: "कस्टम कोट्स, डिलिव्हरी शेड्यूलिंग आणि तुमच्या प्रदेशासाठी जातीच्या शिफारशींसाठी आमच्याशी संपर्क साधा.",
    browseCatalog: "कॅटलॉग ब्राउझ करा",
    whatsappUs: "आम्हाला व्हाट्सअॅप करा",
    callNow: "आता कॉल करा",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
