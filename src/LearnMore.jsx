import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { 
  Heart, Shield, BookOpen, Users, Globe, Award, 
  DollarSign, HandHeart, 
  ChevronDown, Building2, ArrowLeft, X, Copy, Check, Loader2, Phone, Mail
} from 'lucide-react';

// --- IMAGE IMPORTS ---
import award1 from './images/imagecertificate.jpg'; 
import logo from './images/logoimage.jpg'; 

import event5 from './images/event5.jpg';
import newImpactImage from './images/realimpactpeople.jpg';
import about from './images/aboutpage.jpg';
import newhero from './images/learnhero.jpg';
import second from './images/seond.jpg';
import lastone from './images/lastone.jpg';
import fcmblogo from './images/fcmb.jpg'


// --- CUSTOM CSS FOR ANIMATIONS ---
const styles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  @keyframes float-delayed {
    0% { transform: translateY(0px); }
    50% { transform: translateY(20px); }
    100% { transform: translateY(0px); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
`;


const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all">
             <img src={logo} alt="Femina Logo" className="h-10 w-auto object-contain" />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors hidden md:block ${
               isScrolled ? 'text-slate-900' : 'text-white'
             }`}>
             Femina Aid Network.
          </span>
        </Link>

        {/* Back Button */}
        <Link 
          to="/" 
          className={`inline-flex items-center px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
            isScrolled 
              ? 'bg-slate-900 text-white hover:bg-[#E62C79]' 
              : 'bg-white text-[#E62C79] hover:bg-slate-100 shadow-lg'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back Home
        </Link>
      </div>
    </nav>
  );
};

// --- HELPER: Scroll Animation Wrapper ---
const FadeInSection = ({ children, delay = "0ms" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const currentElement = domRef.current;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });

    if (currentElement) observer.observe(currentElement);
    return () => currentElement && observer.unobserve(currentElement);
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

// --- COMPONENT: Donate Modal (Zenith Bank) ---
const DonateModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const accountNumber = "2006043567"; 
  const accountName = "FEMINA AID NETWORK";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurry Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="bg-[#E62C79] p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
          <Heart className="w-12 h-12 mx-auto mb-2 text-white fill-white animate-pulse" />
          <h3 className="text-2xl font-bold">Support Our Cause</h3>
          <p className="text-pink-100 text-sm">Your contribution changes lives.</p>
        </div>

        <div className="p-8 text-center space-y-6">
          {/* Zenith Bank Logo */}
          <div className="flex justify-center mb-4">
             <img 
               src={fcmblogo}
               alt="FCMB" 
               className="h-12 object-contain"
             />
          </div>

          <div className="space-y-1">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Account Name</p>
            <p className="text-slate-900 font-bold text-lg">{accountName}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="text-left">
              <p className="text-slate-500 text-xs font-bold uppercase">Account Number</p>
              <p className="text-2xl font-mono font-bold text-slate-800 tracking-wider">{accountNumber}</p>
            </div>
            <button 
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-[#E62C79]'}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Femina Aid Network is a registered non-profit. All donations go directly to funding legal aid and educational programs.
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Registration/Volunteer Modal ---
const RegistrationModal = ({ isOpen, onClose }) => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Use your EmailJS credentials
    const YOUR_SERVICE_ID = "service_hl03cri";
    const YOUR_TEMPLATE_ID = "template_us5olx8";
    const YOUR_PUBLIC_KEY = "X_FxYmtNGH__gpFHX";

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, { publicKey: YOUR_PUBLIC_KEY })
      .then(() => {
          alert("Application Sent Successfully! We will contact you shortly.");
          setIsSubmitting(false);
          onClose();
        }, (error) => {
          console.error('FAILED...', error.text);
          alert("Failed to send. Please try again.");
          setIsSubmitting(false);
        });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#E62C79] to-[#009EE3] p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">Join the Team</h3>
            <p className="text-pink-100 text-sm mt-1">Volunteer your skills for the movement.</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form ref={form} onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input name="name" type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none" placeholder="Jane Doe"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none" placeholder="jane@example.com"/>
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Skill to Offer (Tech, Law, Design, etc)</label>
             <input name="skill" type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none" placeholder="e.g. Graphic Design"/>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center px-5 py-3 bg-[#E62C79] text-white rounded-xl font-bold hover:bg-[#c91d64] disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</> : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENT: Awards Section ---
const AwardsSection = () => {
  const awards = [
    { title: "Certificate of Recognition", image: award1, desc: "Recognized for outstanding presentation as Guest speaker" }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E62C79]/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#009EE3]/5 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 text-sm font-bold mb-4">
              <Award className="w-4 h-4 mr-2" />
              Recognition
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Awards & Certifications</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by leading global institutions.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((item, index) => (
            <FadeInSection key={index} delay={`${index * 150}ms`}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="h-64 w-full bg-slate-100 rounded-xl overflow-hidden mb-6 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/0 transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-[#009EE3] text-sm font-bold mb-3 uppercase tracking-wide">{item.organization}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
const LearnMore = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // --- HERO SLIDESHOW LOGIC ---
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Images of African female children/students for the background
  const heroImages = [
    newhero, // Smiling girl
    second, // Students in uniform
    lastone  // Girl writing
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Slideshow Timer
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [heroImages.length]); // <--- Fixed here

  const scrollToFooter = () => {
    const footerElement = document.getElementById('footer-contact');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#E62C79] selection:text-white">
      <style>{styles}</style>
      
      {/* MODALS */}
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <RegistrationModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      <StickyHeader />

      {/* 1. HERO HEADER (Updated with Slideshow) */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Background Slideshow */}
        <div className="absolute inset-0 w-full h-full bg-slate-900">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-60 scale-110' : 'opacity-0 scale-100'
              }`}
              style={{ 
                backgroundImage: `url(${img})`,
                // Adding a slow transition to the transform property for the "Ken Burns" zoom effect
                transition: 'opacity 1.5s ease-in-out, transform 6s ease-out'
              }}
            />
          ))}
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90"></div>
          
          {/* Mesh Pattern Overlay (Optional, adds texture) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center pt-20">
          <FadeInSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E62C79] mr-2 animate-pulse"></span>
              Restoring Hope. Building Futures.
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-tight text-white drop-shadow-xl">
              Our Story. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62C79] to-[#009EE3]">
                Our Fight.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90 leading-relaxed font-light drop-shadow-md mb-10">
              Understanding the heart, soul, and strategy behind Femina A Network's mission to empower the African girl child.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                  onClick={() => setIsDonateOpen(true)}
                  className="px-8 py-4 rounded-full bg-[#E62C79] text-white font-bold text-lg hover:bg-[#c91d64] transition-all shadow-[0_0_20px_rgba(230,44,121,0.5)] hover:shadow-[0_0_30px_rgba(230,44,121,0.8)]"
               >
                 Support the Cause
               </button>
            </div>
          </FadeInSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-24 max-w-7xl mx-auto px-4 relative">
        <FadeInSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#009EE3]/20 rounded-tr-[100px] rounded-bl-[100px] -z-10 group-hover:rotate-2 transition-transform duration-500"></div>
              <img 
                src={about} 
                alt="Our Founder" 
                className="rounded-tr-[80px] rounded-bl-[80px] shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-[#E62C79]/10 text-[#E62C79] font-bold text-sm mb-4">
                WHO WE ARE
              </div>
              <h2 className="text-4xl font-bold mb-6 text-slate-900 leading-tight">Born from Necessity, <br/>Fueled by Hope.</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Femina Aid Network is a non-profit organization committed to advancing the dignity, wellbeing, and empowerment of women and young girls, particularly within underserved communities.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our journey began around 2015 as Omolabake Charity Movement, a grassroots initiative founded out of a deep desire to give back and connect meaningfully with communities. In its early years, the movement focused on community outreach; distributing foodstuffs to the less privileged, visiting orphanages, engaging schools through career talks, and serving vulnerable communities across Lagos, including Makoko and faith-based institutions such as the Seventh-day Adventist community in Ile-Ife.
                These early experiences laid a strong foundation of service and compassion. However, as the organization evolved, so did its vision.
                Through lived experiences and deeper exposure to social realities, the Founder recognized a critical need for an intentional support system for women and young girls. It became clear that issues affecting the female gender required focused attention, advocacy, and sustainable intervention. This realization marked a turning point.
                As a result, Omolabake Charity Movement was restructured and rebranded into Femina Aid Network, with a renewed mission centered on supporting, educating, and advocating for women and girls.
                Today, Femina Aid Network is a registered non-governmental organization with the Corporate Affairs Commission (CAC), dedicated to addressing challenges that affect young women and girls, including access to information, protection, health awareness, self-worth, and social inclusion.
                Our work is driven by the belief that when women and girls are supported, entire communities thrive. Through advocacy, education, outreach programs, and partnerships, we are committed to creating safe spaces, amplifying voices, and empowering the next generation of women to live with confidence, dignity, and purpose.
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center min-w-[100px]">
                  <h4 className="text-3xl font-bold text-[#009EE3]">5+</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase">Years</p>
                </div>
                
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full opacity-40 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInSection>
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-sm border-l-8 border-[#E62C79] hover:shadow-xl hover:bg-white transition-all h-full group">
                <div className="w-14 h-14 bg-[#E62C79]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Globe className="w-7 h-7 text-[#E62C79]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To dismantle barriers limiting women’s access to professional and leadership spaces through education, legal advocacy, and mentorship. We act now to create meaningful and lasting change.
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay="200ms">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-sm border-l-8 border-[#009EE3] hover:shadow-xl hover:bg-white transition-all h-full group">
                <div className="w-14 h-14 bg-[#009EE3]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Heart className="w-7 h-7 text-[#009EE3]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A future where gender implies no limitation. A world where safety, dignity, and leadership 
                  are accessible realities for every woman and girl, regardless of geography.
                </p>
              </div>
            </FadeInSection>
          </div>

          <div className="mt-16 text-center">
            <h4 className="text-xl font-bold text-slate-900 mb-8">Driven by Core Values</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {['Equality', 'Justice', 'Inclusion', 'Dignity', 'Safety'].map((val, i) => (
                <FadeInSection key={i} delay={`${i * 50}ms`}>
                  <span className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-medium shadow-sm hover:border-[#E62C79] hover:text-[#E62C79] transition-colors cursor-default">
                    {val}
                  </span>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Programs & Initiatives</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">We don't use academic jargon. We do the work. Here is how.</p>
          </div>
        </FadeInSection>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Legal Aid & Advocacy", desc: "Providing pro-bono defense for survivors.", icon: <Shield className="w-6 h-6 text-white"/>, color: "bg-[#E62C79]" },
            { title: "Education Programs", desc: "Scholarships, mentorship, and educational support across multiple fields of study and career paths.", icon: <BookOpen className="w-6 h-6 text-white"/>, color: "bg-[#009EE3]" },
            { title: "Emergency Support", desc: "We provide emotional support, guidance, and referrals for girls and women facing urgent or distressing situations.", icon: <Heart className="w-6 h-6 text-white"/>, color: "bg-slate-800" },
            { title: "Community Engagement", desc: "Grassroots outreach initiatives, community conversations, and educational forums focused on empowerment, inclusion, and social development.", icon: <Users className="w-6 h-6 text-white"/>, color: "bg-[#009EE3]" },
            { title: "Policy Research", desc: "Data-driven campaigns for law change.", icon: <Building2 className="w-6 h-6 text-white"/>, color: "bg-[#E62C79]" },
            { title: "Digital Literacy", desc: "Teaching coding and digital safety.", icon: <Globe className="w-6 h-6 text-white"/>, color: "bg-slate-800" },
          ].map((item, i) => (
            <FadeInSection key={i} delay={`${i * 100}ms`}>
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-5 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-150`}></div>
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-md`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 5. WHY FEMINISM MATTERS */}
      <section className="py-24 bg-[#009EE3] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeInSection>
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-white/80" />
            <h2 className="text-4xl font-bold mb-8">Why "Feminism"?</h2>
            <div className="bg-white/10 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-2xl">
              <p className="text-2xl md:text-3xl font-light leading-relaxed mb-6 italic">
                "Feminism is rooted in a simple truth: women matter. Their voices, choices, dignity, and potential deserve recognition, protection, and space to flourish."
              </p>
              <div className="w-20 h-1 bg-white/30 mx-auto mb-6 rounded-full"></div>
              <p className="text-white/80 text-lg">
                We believe that when women are empowered to live fully and safely, societies are transformed. Women’s progress strengthens families, drives economic growth, and builds healthier, more resilient communities. Gender equality is not merely a women’s concern; it is a human and societal imperative.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 6. IMPACT */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 leading-tight">
              Real Impact, Real People.
            </h2>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Our work is grounded in real lives, real stories, and real change. We work closely with women and girls, while supporting survivors and grassroots efforts through advocacy, education, and community engagement.
              </p>
              <p>
                Our impact is often seen in quiet but powerful moments—after seminars and community conversations, when young girls approach us to share their dreams with renewed confidence. Many speak about feeling encouraged to pursue paths they once thought were beyond reach.
              </p>
              
              {/* Highlighted Quote within the text */}
              <p className="text-xl font-medium text-[#E62C79] italic py-2 pl-4 border-l-2 border-[#E62C79]">
                “One day, I want to become a lawyer like you.”
              </p>

              <p>
                Femina Aid Network is growing, and so is our impact. Every programme, conversation, and partnership is part of a larger movement to amplify women’s voices and build safer, more equitable communities.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection delay="200ms">
            <div className="grid grid-cols-2 gap-4">
               {/* I replaced the Unsplash URLs with variables. Just import your new images at the top of your file! */}
               <img 
                 src={newImpactImage} /* REPLACE THIS WITH YOUR NEW IMPORTED IMAGE */
                 className="w-full h-[400px] object-cover rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-500" 
                 alt="Femina Impact Story"
               />
               <img 
                 src={event5} /* Using one of your existing images for the second slot */
                 className="w-full h-[400px] object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" 
                 alt="Community Impact"
               />
            </div>
          </FadeInSection>
        </div>
      </section>
      {/* --- 7. AWARDS & CERTIFICATIONS --- */}
      <AwardsSection />

      {/* 8. FUNDING */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <DollarSign className="w-8 h-8 text-[#009EE3] mr-3" />
                How We Are Funded
              </h2>
              <p className="text-slate-400 mb-6">
                Transparency builds trust. We rely on a mix of funding sources to keep our lights on and our programs running freely.
              </p>
              <div className="space-y-4">
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                  <div className="bg-[#E62C79] h-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Individual Donations</span>
                  <span className="font-bold text-[#E62C79]">60%</span>
                </div>
                
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                  <div className="bg-[#009EE3] h-full" style={{ width: '30%' }}></div>
                </div>
                 <div className="flex justify-between text-sm">
                  <span>Corporate Grants</span>
                  <span className="font-bold text-[#009EE3]">30%</span>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay="200ms">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold mb-4">Where the Money Goes</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Program Operations</span> <span>70%</span>
                  </li>
                   <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Outreach & Marketing</span> <span>20%</span>
                  </li>
                   <li className="flex justify-between">
                    <span>Admin & Logistics</span> <span>10%</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 9. HOW YOU CAN HELP */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Be Part of the Solution</h2>
        </FadeInSection>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Donate */}
          <FadeInSection delay="0ms">
            <div className="p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white flex flex-col items-center group h-full justify-between">
              <div>
                <div className="mb-4 bg-slate-50 p-4 rounded-full group-hover:scale-110 transition-transform w-16 h-16 flex items-center justify-center mx-auto">
                   <Heart className="w-8 h-8 text-[#E62C79]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Donate</h3>
                <p className="text-slate-600 mb-6">Every Naira/Dollar counts towards legal aid.</p>
              </div>
              <button 
                onClick={() => setIsDonateOpen(true)}
                className="px-8 py-3 rounded-full bg-[#E62C79] text-white font-bold hover:bg-[#c91d64] transition-all shadow-lg shadow-pink-500/30 w-full"
              >
                Donate Now
              </button>
            </div>
          </FadeInSection>

          {/* Card 2: Volunteer */}
          <FadeInSection delay="100ms">
            <div className="p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white flex flex-col items-center group h-full justify-between">
              <div>
                <div className="mb-4 bg-slate-50 p-4 rounded-full group-hover:scale-110 transition-transform w-16 h-16 flex items-center justify-center mx-auto">
                   <HandHeart className="w-8 h-8 text-[#009EE3]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Volunteer</h3>
                <p className="text-slate-600 mb-6">Lend your skills in tech, law, or design.</p>
              </div>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="px-8 py-3 rounded-full border-2 border-[#009EE3] text-[#009EE3] font-bold hover:bg-[#009EE3] hover:text-white transition-all w-full"
              >
                Join Team
              </button>
            </div>
          </FadeInSection>

          {/* Card 3: Partner */}
          <FadeInSection delay="200ms">
            <div className="p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all bg-white flex flex-col items-center group h-full justify-between">
              <div>
                <div className="mb-4 bg-slate-50 p-4 rounded-full group-hover:scale-110 transition-transform w-16 h-16 flex items-center justify-center mx-auto">
                   <Users className="w-8 h-8 text-slate-800" />
                </div>
                <h3 className="text-xl font-bold mb-2">Partner</h3>
                <p className="text-slate-600 mb-6">Collaborate with your NGO or Company.</p>
              </div>
              <button 
                onClick={scrollToFooter}
                className="px-8 py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all w-full"
              >
                Contact Us
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 10. PARTNERS */}
      <section className="py-12 bg-slate-50 text-center">
        <p className="text-slate-500 uppercase tracking-widest font-bold text-sm mb-6">Proudly Partnered With</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          
          <span className="text-xl font-bold">Legal Aid Council</span>
          
        </div>
      </section>

      {/* 11. FAQs */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is this organization political?", a: "We are non-partisan. However, we advocate for policies that protect human rights and gender equality." },
            { q: "Who can access your services?", a: "Our services are open to all women and girls, regardless of religion, ethnicity, or background. Some programs are specifically for marginalized communities." },
            { q: "How do you ensure accountability?", a: "We ensure accountability through clear internal oversight, proper record-keeping, and regular documentation of our activities and outcomes." }
          ].map((faq, i) => (
            <FadeInSection key={i} delay={`${i * 50}ms`}>
              <details className="group bg-white border border-slate-200 rounded-xl p-4 cursor-pointer open:border-[#E62C79] transition-all open:shadow-md">
                <summary className="flex justify-between items-center font-bold text-lg list-none text-slate-800 group-hover:text-[#E62C79]">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 12. FOOTER CTA */}
      <section id="footer-contact" className="py-24 bg-[#E62C79] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-xl text-white/90 mb-10">
            Whether you donate, volunteer, or just share our message, you are part of the movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <button onClick={() => setIsDonateOpen(true)} className="bg-white text-[#E62C79] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg hover:-translate-y-1 transform">
               Donate Now
             </button>
             <Link to="/" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
               Back to Home
             </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/20 grid md:grid-cols-3 gap-8 text-left text-sm">
             <div>
               <h5 className="font-bold mb-2">Visit Us</h5>
               <p className="opacity-80">COMING SOON!!!</p>
             </div>
             <div>
               <h5 className="font-bold mb-2">Contact</h5>
               <p className="opacity-80 flex items-center gap-2"><Phone className="w-4 h-4"/> +234 807 890 2701</p>
               <p className="opacity-80 flex items-center gap-2"><Mail className="w-4 h-4"/> hello@femina.com</p>
             </div>
             <div>
               <h5 className="font-bold mb-2">Legal</h5>
               <div className="flex gap-4 opacity-80">
                 <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                 {/* <a href="" className="hover:underline">Terms</a> */}
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LearnMore;