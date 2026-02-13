import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight, Heart, Users, Calendar, Mail, CheckCircle, Sparkles, ChevronDown, Star, Phone, Instagram, Linkedin, Loader2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import BlogSection from './BlogSection'; 
import Preloader from './Preloader'; 
import AnnouncementBanner from './AnnouncementBanner'; 

// --- IMAGE IMPORTS ---
import feminaImage from './images/Femina.jpg';
import logo from './images/logoimage.jpg';
import event1 from './images/event1.jpg';
import event5 from './images/event5.jpg';
import event11 from './images/event11.jpg';
import event15 from './images/event15.jpg';
import event7 from './images/event7.jpg';
import event8 from './images/event8.jpg';
import bolaimg from './images/bolaimage.jpg';
import why from './images/whyfeminaaid.jpg';
import home from './images/homepage.jpg'; 
import founerimage from './images/founder.jpg';
import newhero from './images/learnhero.jpg';
import second from './images/seond.jpg';
import lastone from './images/lastone.jpg';


// --- CUSTOM STYLES & ANIMATIONS ---
const customStyles = `
  .bg-noise {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% auto;
    animation: gradient 4s ease infinite;
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow { animation: float-slow 3s ease-in-out infinite; }
  .animate-bounce-slow-delay { animation: float-slow 4s ease-in-out infinite 1s; }
  
  /* Custom Scrollbar */
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #E62C79; border-radius: 4px; }
`;

// --- HELPER: Scroll Reveal Animation ---
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

// --- ICONS: Custom SVG Components ---
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.88-3.11 6.24-2.12 1.45-4.8 1.48-6.95.1-2.12-1.36-3.32-3.7-3.13-6.22.18-2.53 1.68-4.7 3.91-5.83 2.11-1.07 4.63-1.01 6.69.17V13c-1.32-.88-2.92-.88-4.24 0-1.18.79-1.8 2.22-1.58 3.63.22 1.41 1.25 2.57 2.6 2.97 1.35.4 2.82.02 3.86-1.03.95-.97 1.43-2.34 1.34-3.7-.01-4.9-.01-9.8-.01-14.7l-3.46-.13z"/>
  </svg>
);

// --- COMPONENT: Infinite Marquee ---
const Marquee = () => {
  const items = ["Networking", "Mentorship", "Career Growth", "Women in Tech", "Entrepreneurship", "Leadership", "Funding", "Skills", "Community"];
  return (
    <div className="bg-[#009EE3] py-4 overflow-hidden whitespace-nowrap border-y border-[#009EE3]">
      <div className="inline-flex animate-scroll hover:[animation-play-state:paused]">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="mx-8 inline-flex items-center text-white font-bold uppercase tracking-widest text-sm">
            <span className="text-[#E62C79] mr-4 text-xl">•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: Tweet Card (Glassmorphism Style) ---
const TweetCard = ({ name, content }) => (
  <div className="relative group h-full">
    <div className="relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E62C79] to-[#009EE3] p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-900 font-bold text-lg">
                {name[0]}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{name}</h4>
             
            </div>
          </div>
          <div className="text-slate-300 group-hover:text-[#E62C79] transition-colors">
            <XIcon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed text-sm mb-6 font-medium">"{content}"</p>
      </div>
     
    </div>
  </div>
);

// --- COMPONENT: Stats Section ---
const Stats = () => (
  <section className="py-20 border-t border-slate-100 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
     
    </div>
  </section>
);

// --- COMPONENT: Cookie Consent ---
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("femina_cookie_consent");
    if (!accepted) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("femina_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 animate-in slide-in-from-bottom-4">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2">We value your privacy</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            We use cookies to enhance your browsing experience and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsVisible(false)} className="px-6 py-2.5 rounded-full text-slate-300 font-medium hover:text-white transition-colors">Decline</button>
          <button onClick={acceptCookies} className="px-8 py-2.5 rounded-full bg-[#E62C79] text-white font-bold hover:bg-[#c91d64] transition-all shadow-lg shadow-pink-500/20">Accept</button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Founder Video Interview ---
const FounderVideo = () => {
  const videoUrl = "https://youtu.be/K24B_LjmTsA?si=vbbC0gIiBu7SJd4N"; 
  const thumbnail = event1; 

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E62C79]/10 border border-[#E62C79]/20 text-[#E62C79] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E62C79] mr-2 animate-pulse"></span>
                INTERVIEW
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                "We didn't just build a network. We built a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62C79] to-[#009EE3]">lifeline.</span>"
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Watch Alero Ejeye discuss in an interview, Menstrual Hygiene Training: Health Experts Call for More Menstrual Education and Access
              </p>
              <a 
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-bold text-[#009EE3] hover:text-[#E62C79] transition-colors group"
              >
                Watch the full interview on YouTube 
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeInSection>

          <FadeInSection delay="200ms">
            <div className="relative group cursor-pointer">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src={thumbnail} 
                  alt="Founder Interview" 
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#E62C79] rounded-full opacity-0 group-hover:animate-ping"></div>
                    <div className="relative w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#E62C79] group-hover:text-white transition-all duration-300">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <span>Watch Now</span>
                </div>
              </a>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#009EE3]/10 rounded-3xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: Registration Form Modal ---
const RegistrationModal = ({ isOpen, onClose }) => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const YOUR_SERVICE_ID = "service_hl03cri";
    const YOUR_TEMPLATE_ID = "template_us5olx8";
    const YOUR_PUBLIC_KEY = "X_FxYmtNGH__gpFHX";

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, { publicKey: YOUR_PUBLIC_KEY })
      .then(() => {
          alert("Registration Sent Successfully! We will contact you shortly.");
          setIsSubmitting(false);
          onClose();
        }, (error) => {
          console.error('FAILED...', error.text);
          alert("Failed to send registration. Please try again.");
          setIsSubmitting(false);
        });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#E62C79] to-[#009EE3] p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">Join the Network</h3>
            <p className="text-pink-100 text-sm mt-1">Fill in your details to get started.</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <form ref={form} onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input name="name" type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none transition-all" placeholder="Jane Doe"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
              <div className="relative">
                <select name="sex" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none appearance-none bg-white text-slate-600">
                  <option value="" disabled selected>Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Prefer not to say</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age Range</label>
              <div className="relative">
                <select name="age" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none appearance-none bg-white text-slate-600">
                  <option value="" disabled selected>Select</option>
                  <option value="18-24">18 - 24</option>
                  <option value="25-34">25 - 34</option>
                  <option value="35-44">35 - 44</option>
                  <option value="45-54">45 - 54</option>
                  <option value="55+">55+</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <div className="relative">
              <select name="location" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none appearance-none bg-white text-slate-600">
                <option value="" disabled selected>Select Location</option>
                <option value="lagos">Lagos, Nigeria</option>
                <option value="abuja">Abuja, Nigeria</option>
                <option value="accra">Accra, Ghana</option>
                <option value="nairobi">Nairobi, Kenya</option>
                <option value="london">London, UK</option>
                <option value="newyork">New York, USA</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none" placeholder="jane@example.com"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input name="phone" type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E62C79] outline-none" placeholder="+234..."/>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-[#E62C79] to-[#009EE3] group-hover:from-[#E62C79] group-hover:to-[#009EE3] hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="relative w-full px-5 py-3 transition-all ease-in duration-75 bg-white text-slate-900 rounded-[10px] group-hover:bg-opacity-0 group-hover:text-white font-bold text-lg flex justify-center items-center">
                {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</> : "Register Now"}
              </span>
            </button>
          </div>
          <p className="text-xs text-center text-slate-400 mt-4">By registering, you agree to our Terms of Service.</p>
        </form>
      </div>
    </div>
  );
};

// --- UPDATED COMPONENT: Team Member Card ---
const TeamCard = ({ name, role, bio, image, socials }) => {
  return (
    <div className="group relative h-[500px] w-full overflow-hidden rounded-[2rem] shadow-2xl cursor-pointer bg-slate-200">
      <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"></div>
      <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl ring-1 ring-white/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold tracking-widest uppercase bg-[#E62C79] text-white rounded-full shadow-lg">{role}</span>
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{name}</h3>
            <div className="grid grid-rows-[0fr] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:grid-rows-[1fr]">
               <div className="overflow-hidden">
                 <div className="max-h-[200px] overflow-y-auto pr-2 mt-2 space-y-3 custom-scrollbar">
                   {bio.split('\n').map((paragraph, i) => (
                     <p key={i} className="text-slate-200 text-sm leading-relaxed font-light">{paragraph}</p>
                   ))}
                 </div>
                 <div className="flex gap-2 text-white mt-5 pt-4 border-t border-white/10">
                    {socials?.linkedin && (<a href={socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0077B5] hover:text-white transition-all backdrop-blur-sm"><Linkedin className="w-4 h-4"/></a>)}
                    {socials?.twitter && (<a href={socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-black hover:text-white transition-all backdrop-blur-sm"><XIcon className="w-4 h-4"/></a>)}
                    {socials?.instagram && (<a href={socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#E1306C] hover:text-white transition-all backdrop-blur-sm"><Instagram className="w-4 h-4"/></a>)}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED COMPONENT: The Team Section ---
const TeamSection = () => {
    const members = [
      { 
        name: "Alero Ejeye", 
        role: "Founder ", 
        bio: `Alero Ejeye is a legal practitioner with a strong professional background in corporate and finance law, with particular specialization in regulatory compliance. Alongside her legal practice, she has built a sustained record of service in community development and advocacy, particularly in advancing the rights and wellbeing of women and young girls.\n\nShe has been actively involved in volunteerism and charitable work since 2015, channeling her passion for social impact into structured, purpose-driven initiatives. This commitment culminated in the establishment of Femina Aid Network, a registered non-governmental organization dedicated to women’s empowerment, girl-child advocacy, gender-based violence awareness, sexual and reproductive health education, and mentorship programs for young girls.\n\nAlero’s advocacy is deeply informed by lived experiences of gender-based discrimination and a lifelong belief in collective support among women; what she often describes as being “a girl’s girl.” She believes that sustainable progress for women is achieved through education, solidarity, and access to safe, empowering spaces.\n\nBeyond her NGO work, Alero serves in youth leadership at New Revelation Baptist Church, Ikeja, Lagos, where she currently holds the positions of Welfare Officer and Treasurer of the Youth Fellowship, and previously served as a Youth Deaconess during Youth Week 2025. She has also spoken at programs organized by ReachHerHub, for which she received an award for participation, and actively supports menstrual health initiatives, including the donation of over 200 sanitary pads to help girls stay healthy and comfident.\n\nThrough Femina Aid Network, Alero remains committed to building systems of support that enable women and girls to thrive with dignity, confidence, and opportunity.`,
        image: founerimage, 
        socials: { linkedin: "https://linkedin.com/in/your-profile", twitter: "https://x.com/your-profile", instagram: "https://instagram.com/your-profile" }
      },
      { 
        name: "Bola-Mustapha Ibironke", 
        role: "Lead Programme Volunteer", 
        bio: "Ibironke Bola-Mustapha is a lawyer with expertise in criminal law, property litigation, and regulatory compliance.", 
        image: bolaimg, 
        socials: { linkedin: "https://linkedin.com", twitter: "https://x.com", instagram: "https://instagram.com" }
      },
      
    ];
  
    return (
      <section id="team" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-[#ED70A4]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-[#009EE3]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ED70A4]/10 border border-[#ED70A4]/20 text-[#E62C79] text-sm font-medium mb-4">
                <Users className="w-4 h-4 mr-2" />
                The Power Behind the Network
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Meet the Team</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                The dedicated team working tirelessly to build connections, create opportunities, and support your journey.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {members.map((member, index) => (
              <FadeInSection key={index} delay={`${index * 100}ms`}>
                <TeamCard {...member} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    );
};

// --- COMPONENT: Image Carousel ---
const Gallery = () => {
  const images = [event1, event5, event15, event7, event8, event8, event11];
  const scrollContainer = useRef(null);
  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-12">
             <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#009EE3]/10 border border-[#009EE3]/20 text-[#009EE3] text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Moments
              </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Captured Memories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A glimpse into the energy, connection, and joy of our events.</p>
          </div>
        </FadeInSection>
        <div className="relative group">
          <button onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:bg-[#E62C79] hover:text-white transition-all opacity-0 group-hover:opacity-100"><ChevronLeft className="w-6 h-6" /></button>
          <div ref={scrollContainer} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {images.map((src, index) => (
              <div key={index} className="flex-shrink-0 w-[300px] md:w-[400px] h-[250px] md:h-[300px] rounded-2xl overflow-hidden snap-center relative shadow-md group/img">
                <img src={src} alt={`Event ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6"><p className="text-white font-medium">Femina Event {index + 1}</p></div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:bg-[#E62C79] hover:text-white transition-all opacity-0 group-hover:opacity-100"><ChevronRight className="w-6 h-6" /></button>
        </div>
        <div className="text-center mt-8">
          <Link to="/gallery" className="inline-flex items-center px-8 py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all group">View Full Gallery <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
        </div>
      </div>
    </section>  
  );
};

// --- COMPONENT: FAQ Section ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { question: "What does Femina Aid Network do?", answer: "Femina Aid Network empowers young girls through educational outreaches, mentorship, and advocacy programs designed to build confidence, self-worth, and leadership skills. Our goal is to help girls believe in themselves and realise their full potential." },
    { question: "Who are your programs for?", answer: "Our programs are for girls and women of all ages. While we place strong emphasis on empowering young girls, Femina Aid Network exists to support every woman; helping them build confidence, find mentorship, and access the encouragement they need to thrive at every stage of life." },
    { question: "How can I support or get involved with Femina Aid Network?", answer: "You can support Femina Aid Network by volunteering, partnering with us for outreaches, mentoring young girls, or making donations. Every form of support helps us reach more girls and change lives." },
    { question: "Do you care about men?What about men?", answer: "Yes, we do. Femina Aid Network focuses on empowering girls and women because they face unique social, economic, and systemic challenges. However, we believe true empowerment thrives in inclusive communities. We support positive engagement with men and boys and welcome allies who share our commitment to dignity, equality, and social development." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about joining the ecosystem.</p>
          </div>
        </FadeInSection>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeInSection key={index} delay={`${index * 50}ms`}>
              <div key={index} className={`border rounded-2xl transition-all duration-300 ${openIndex === index ? "border-[#E62C79] bg-pink-50/30" : "border-slate-200 hover:border-pink-200"}`}>
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className={`font-bold text-lg ${openIndex === index ? "text-[#E62C79]" : "text-slate-800"}`}>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-[#009EE3] ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MAIN WEBSITE COMPONENT ---
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const features = [
    { title: "Mentorship Programs", description: "Connect with industry leaders who can guide your career path and help you navigate challenges with confidence.", icon: <Users className="w-6 h-6 text-[#E62C79]" /> },
    { title: "Exclusive Events", description: "Join webinars, workshops, and in-person meetups designed to upskill and inspire our diverse community.", icon: <Calendar className="w-6 h-6 text-[#E62C79]" /> },
    { title: "Safe Community", description: "A supportive space where you can share experiences, ask questions, and grow without judgement.", icon: <Heart className="w-6 h-6 text-[#E62C79]" /> }
  ];

  const tweets = [
    { name: "Bimpe Alabi", handle: "sarah_tech", content: "Before Femina Aid Network came to my school, I used to doubt myself a lot. Listening to the speakers made me realise that my fears don’t define me. I now believe I can become anything I want, and I’m no longer afraid to speak up", date: "2 days ago" },
    { name: "Folashade Adegbile", handle: "amara_designs", content: "“Femina Aid Network changed the way I see myself. I met mentors who encouraged me and showed me that my dreams are valid. I left the programme feeling confident and inspired to work hard and believe in myself.", date: "1 week ago" },
    { name: "Chiamaka Bernard", handle: "ngozi_codes", content: "After the Femina Aid Network outreach, I found courage I didn’t know I had. I stopped feeling alone and learnt that other girls face the same struggles. Today, I am more confident, focused, and hopeful about my future.", date: "3 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-900 relative overflow-x-hidden">
  <style>{customStyles}</style>
  
  {/* --- 1. THE SUBTLE GRID PATTERN --- */}
  <div 
    className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}
  ></div>

  {/* --- 2. AMBIENT MESH GRADIENTS (The Glow) --- */}
  {/* Top Right Pink Glow */}
  <div className="fixed top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#E62C79]/10 to-transparent blur-[100px] z-0 pointer-events-none animate-bounce-slow"></div>
  
  {/* Middle Left Blue Glow */}
  <div className="fixed top-[40%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#009EE3]/10 to-transparent blur-[120px] z-0 pointer-events-none animate-bounce-slow-delay"></div>
  
  {/* Bottom Right Mixed Glow */}
  <div className="fixed bottom-[-20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-[#E62C79]/5 via-[#009EE3]/5 to-transparent blur-[100px] z-0 pointer-events-none animate-bounce-slow"></div>

  {/* --- 3. EXISTING NOISE TEXTURE --- */}
  <div className="bg-noise z-0"></div>

  <Preloader />
    
       <AnnouncementBanner /> 

      <RegistrationModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src={logo} alt="Femina Logo" className="h-10 w-auto object-contain" />
              <span className="font-bold text-xl tracking-tight text-slate-800">Femina Aid Network</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-600 hover:text-[#E62C79] transition-colors font-medium">About</a>
              <a href="#team" className="text-slate-600 hover:text-[#E62C79] transition-colors font-medium">Team</a>
              <a href="#community" className="text-slate-600 hover:text-[#E62C79] transition-colors font-medium">Community</a>
              <button onClick={() => setIsRegisterOpen(true)} className="bg-[#E62C79] hover:bg-[#b01e58] text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105">Join Network</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)} className="text-slate-600 hover:text-[#E62C79]"><Menu className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- PREMIUM MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
           <span className="font-bold text-xl tracking-tight text-slate-900">Femina Aid.</span>
           <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-900 hover:bg-[#E62C79] hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[80%] space-y-8">
          {['About', 'Team', 'Community', 'Features'].map((item, idx) => (
            <a key={idx} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-slate-800 hover:text-[#E62C79] transition-colors">{item}</a>
          ))}
          <button onClick={() => { setIsMenuOpen(false); setIsRegisterOpen(true); }} className="mt-8 px-10 py-4 bg-[#E62C79] text-white text-lg font-bold rounded-full shadow-xl shadow-pink-500/30">Join Network</button>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40 bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ED70A4]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#009EE3]/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <FadeInSection>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-pink-100 text-[#E62C79] text-sm font-bold mb-8 shadow-sm"><Sparkles className="w-4 h-4 mr-2 fill-current" /> Thriving Community for Women</div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">Connect. Grow. <br /><span className="relative inline-block mt-2"><span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#E62C79] via-[#009EE3] to-[#E62C79] bg-[length:200%_auto] animate-gradient">Love. Liberty. Light.</span><span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300/40 -z-0 rounded-sm transform -rotate-1"></span></span></h1>
                <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">Unlock your potential with <b>Femina Aid Network</b>. We provide the mentorship, funding access, and safe spaces you need to lead with confidence.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button onClick={() => setIsRegisterOpen(true)} className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#E62C79] border-2 border-[#E62C79] rounded-full hover:bg-[#c91d64] hover:border-[#c91d64] shadow-lg shadow-pink-500/30 hover:-translate-y-1">Join the Network</button>
                  <Link to="/learn-more" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900">Learn More</Link>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 justify-center lg:justify-start">
                   <div className="flex -space-x-3">
                      <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src= {newhero} alt=""/>
                      <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src={second} alt=""/>
                      <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src={lastone} alt=""/>
                      
                   </div>
                 
                </div>
              </div>
            </FadeInSection>
            <div className="relative hidden lg:block">
               <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
                  <img src={home} alt="Women Networking" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
               </div>
               <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><CheckCircle className="w-6 h-6" /></div>
                  
               </div>
               
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E62C79]/30 to-[#009EE3]/30 rounded-2xl transform -rotate-2"></div>
                <img src={why} alt="Women networking" className="relative rounded-xl shadow-xl w-full object-cover" />
              </div>
            </FadeInSection>
            <FadeInSection delay="200ms">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Femina Aid Network?</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">We believe that when women support women, incredible things happen. Our network was founded on the principle that access to resources and a strong community are the keys to breaking barriers.</p>
                <ul className="space-y-4">
                  {["Access to exclusive industry insights"].map((item, index) => (
                    <li key={index} className="flex items-start"><CheckCircle className="w-6 h-6 text-[#009EE3] mr-3 flex-shrink-0" /><span className="text-slate-700 font-medium">{item}</span></li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <FounderVideo />

      {/* Benefits / Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Empowerment in Action</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We provide the tools and space you need to thrive personally and professionally.</p>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={index} delay={`${index * 100}ms`}>
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#ED70A4]/10 rounded-xl flex items-center justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      <Gallery />

      {/* Wall of Love */}
      <section id="community" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#009EE3]/10 border border-[#009EE3]/20 text-[#009EE3] text-sm font-medium mb-4"><Star className="w-4 h-4 mr-2" /> Community Voices</div>
              <h2 className="text-3xl font-bold text-slate-900">What Our Members Say</h2>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-6">
            {tweets.map((t, i) => (
              <FadeInSection key={i} delay={`${i * 100}ms`}>
                <TweetCard {...t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <BlogSection />
      <Stats />
      <FAQ />

      {/* --- UPDATED FLOATING GLASS FOOTER --- */}
      <div className="pb-12 px-4 bg-white">
        <footer className="max-w-7xl mx-auto bg-slate-900/95 backdrop-blur-xl rounded-[3rem] text-white py-16 px-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
               <div className="flex items-center gap-2 mb-4">
                 <img src={logo} alt="Femina Logo" className="h-10 w-auto object-contain bg-white rounded-md p-1" />
                <span className="font-bold text-xl text-white">Femina Aid Network</span>
              </div>
              <p className="text-white/80 leading-relaxed max-w-xs">Empowering women to lead, innovate, and grow through connection and mentorship.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
              <div className="space-y-4">
                <a href="mailto:hello@feminaanetwork.com" className="flex items-center gap-3 hover:text-[#ED70A4] transition-colors text-white/90"><Mail className="w-5 h-5 text-white" /><span>feminaaidnetwork@gmail.com</span></a>
                <div className="flex items-center gap-3 text-white/90"><Phone className="w-5 h-5 text-white" /><span> +234 80 78902701</span></div>
              </div>  
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://x.com/FeminaANetwork" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#E62C79] text-white transition-all transform hover:-translate-y-1"><XIcon className="w-5 h-5" /></a>
                <a href=" https://www.instagram.com/feminaanetwork?igsh=MTU3ZXY2bDgxb2NmOA%3D%3D&utm_source=qr" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#E62C79] text-white transition-all transform hover:-translate-y-1"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#E62C79] text-white transition-all transform hover:-translate-y-1"><TikTokIcon className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <div>© {new Date().getFullYear()} Femina A Network. All rights reserved.</div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      <CookieBanner />
    </div>
  );
};

export default Home;