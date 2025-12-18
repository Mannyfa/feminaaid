import React, { useState, useRef } from 'react';
import { Menu, X, ArrowRight, Heart, Users, Calendar, Mail, CheckCircle, Sparkles, ChevronDown, Star, Phone, Instagram, Linkedin, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import BlogSection from './BlogSection'; 
import feminaImage from './images/Femina (1).jpg';

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
  const items = ["Networking", "Mentorship", "Career Growth", "Women in Tech", "Entrepreneurship", "Leadership", "Funding", "Skills"];
  return (
    <div className="bg-slate-900 py-4 overflow-hidden whitespace-nowrap border-y border-slate-800">
      <div className="inline-flex animate-scroll hover:[animation-play-state:paused]">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="mx-8 inline-flex items-center text-white font-bold uppercase tracking-widest text-sm">
            <span className="text-fuchsia-500 mr-4 text-xl">•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: Tweet Card ---
const TweetCard = ({ name, handle, content, date }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold">
          {name[0]}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
          <p className="text-slate-500 text-xs">@{handle}</p>
        </div>
      </div>
      <div className="text-fuchsia-600">
        <XIcon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-slate-700 leading-relaxed text-sm mb-4">{content}</p>
    <p className="text-slate-400 text-xs">{date}</p>
  </div>
);

// --- COMPONENT: Stats Section ---
const Stats = () => (
  <section className="py-20 border-t border-slate-100 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Active Members", value: "2,500+" },
          { label: "Cities Reached", value: "15+" },
          { label: "Events Hosted", value: "40+" },
          { label: "Jobs Secured", value: "150+" },
        ].map((stat, idx) => (
          <div key={idx} className="p-4">
            <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600 mb-2">
              {stat.value}
            </h3>
            <p className="text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- COMPONENT: Registration Form Modal (UPDATED WITH EMAILJS) ---
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

    emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        form.current,
        { publicKey: YOUR_PUBLIC_KEY }
      )
      .then(
        () => {
          alert("Registration Sent Successfully! We will contact you shortly.");
          setIsSubmitting(false);
          onClose();
        },
        (error) => {
          console.error('FAILED...', error.text);
          alert("Failed to send registration. Please try again.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">Join the Network</h3>
            <p className="text-fuchsia-100 text-sm mt-1">Fill in your details to get started.</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Fields */}
        <form ref={form} onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              name="name" // Matches {{name}} in EmailJS
              type="text" 
              required 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all" 
              placeholder="Jane Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sex Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
              <div className="relative">
                <select name="sex" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none appearance-none bg-white text-slate-600">
                  <option value="" disabled selected>Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Prefer not to say</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Age Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age Range</label>
              <div className="relative">
                <select name="age" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none appearance-none bg-white text-slate-600">
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

          {/* Location Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <div className="relative">
              <select name="location" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none appearance-none bg-white text-slate-600">
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

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              required 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none" 
              placeholder="jane@example.com"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input 
              name="phone"
              type="tel" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none" 
              placeholder="+234..."
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-fuchsia-600 to-purple-600 group-hover:from-fuchsia-600 group-hover:to-purple-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative w-full px-5 py-3 transition-all ease-in duration-75 bg-white text-slate-900 rounded-[10px] group-hover:bg-opacity-0 group-hover:text-white font-bold text-lg flex justify-center items-center">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
                  </>
                ) : "Register Now"}
              </span>
            </button>
          </div>
          
          <p className="text-xs text-center text-slate-400 mt-4">
            By registering, you agree to our Terms of Service.
          </p>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENT: Team Member Card (With increased spacing) ---
const TeamCard = ({ name, role, bio, imageId, index, total }) => {
    const isEven = index % 2 === 0;
    
    // Increased padding inside the card for more breathing room
    const baseStyle = `relative bg-white p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 max-w-md w-full mx-auto transition-all duration-500 ease-out group hover:z-50 hover:scale-105 hover:shadow-[0_20px_60px_-15px_rgba(192,38,211,0.3)]`;
    
    // Adjusted margins (-mt-10 and -mt-20) to make them overlap less
    const stackStyle = index === 0 
      ? 'z-40' 
      : `-mt-10 md:-mt-20 z-[${40 - index}] ${isEven ? '-translate-x-6 md:-translate-x-16' : 'translate-x-6 md:translate-x-16'}`;
  
    return (
      <div className={`${baseStyle} ${stackStyle}`}>
        {/* Decorative blur behind the card on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 to-purple-600/0 rounded-2xl transition-all duration-500 group-hover:from-fuchsia-600/5 group-hover:to-purple-600/5 -z-10"></div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Avatar Image with Gradient Border */}
          <div className="flex-shrink-0 p-1 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-sm">
            <img 
              src={`https://source.unsplash.com/${imageId}/150x150`} 
              alt={name} 
              className="w-24 h-24 rounded-full border-2 border-white object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-slate-900">{name}</h4>
            <p className="text-fuchsia-600 font-medium text-sm mb-3">{role}</p>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{bio}</p>
            
            <div className="flex gap-3 justify-center sm:justify-start text-slate-400">
               <a href="#" className="hover:text-fuchsia-600 transition-colors"><Linkedin className="w-4 h-4"/></a>
               <a href="#" className="hover:text-fuchsia-600 transition-colors"><XIcon className="w-4 h-4"/></a>
            </div>
          </div>
        </div>
      </div>
    );
  };

// --- COMPONENT: The Team Section (With bottom padding) ---
const TeamSection = () => {
    // Placeholder data
    const members = [
      { name: "Dr. Amina Bello", role: "Founder & Lead Mentor", bio: "Amina is a cardiologist and advocate for women's health, founding the network to bridge the gap in medical leadership.", imageId: "SibwBVCA7dY" },
      { name: "Chioma Eze", role: "Head of Partnerships", bio: "Chioma connects our members with global corporations and NGOs to create tangible career opportunities.", imageId: "rDEOVtE7vOs" },
      { name: "Zainab Al-Fayed", role: "Community Manager", bio: "The heart of our community, Zainab ensures every member feels welcomed, heard, and supported in our safe spaces.", imageId: "IF9TK5Uy-KI" },
      { name: "Nadia Johnson", role: "Tech & Innovation Lead", bio: "Nadia spearheads our digital initiatives and coding bootcamps, empowering women with future-proof skills.", imageId: "9MingMlgHwQ" },
      { name: "Grace Osei", role: "Events Coordinator", bio: "Grace curates impactful workshops and our annual summit, bringing inspiring speakers to our stage.", imageId: "KIPqvvTOC1s" },
    ];
  
    return (
      <section id="team" className="py-24 bg-slate-50 overflow-hidden relative">
         {/* Subtle background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[-10%] w-64 h-64 bg-fuchsia-100/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-64 h-64 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              The Power Behind the Network
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Meet the Femina Aid Members</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              The dedicated team working tirelessly to build connections, create opportunities, and support your journey.
            </p>
          </div>
  
          {/* Added pb-32 to give space at the bottom */}
          <div className="flex flex-col items-center pb-32 px-4">
            {members.map((member, index) => (
              <TeamCard key={index} index={index} total={members.length} {...member} />
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
    {
      title: "Mentorship Programs",
      description: "Connect with industry leaders who can guide your career path and help you navigate challenges with confidence.",
      icon: <Users className="w-6 h-6 text-fuchsia-600" />
    },
    {
      title: "Exclusive Events",
      description: "Join webinars, workshops, and in-person meetups designed to upskill and inspire our diverse community.",
      icon: <Calendar className="w-6 h-6 text-fuchsia-600" />
    },
    {
      title: "Safe Community",
      description: "A supportive space where you can share experiences, ask questions, and grow without judgement.",
      icon: <Heart className="w-6 h-6 text-fuchsia-600" />
    }
  ];

  const tweets = [
    { name: "Sarah J.", handle: "sarah_tech", content: "I found my co-founder through Femina A! The mentorship circle changed my perspective on leadership entirely.", date: "2 days ago" },
    { name: "Amara K.", handle: "amara_designs", content: "Finally a safe space where I can ask 'stupid' questions without judgement. The resources are top tier.", date: "1 week ago" },
    { name: "Ngozi E.", handle: "ngozi_codes", content: "Landed my first remote role thanks to the job board. This community is the real deal.", date: "3 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      <RegistrationModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Femina A Network</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-600 hover:text-fuchsia-600 transition-colors font-medium">About</a>
              <a href="#team" className="text-slate-600 hover:text-fuchsia-600 transition-colors font-medium">Team</a>
              <a href="#community" className="text-slate-600 hover:text-fuchsia-600 transition-colors font-medium">Community</a>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105"
              >
                Join Network
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#about" className="block px-3 py-2 text-slate-600 hover:bg-fuchsia-50 hover:text-fuchsia-600 rounded-md">About</a>
              <a href="#team" className="block px-3 py-2 text-slate-600 hover:bg-fuchsia-50 hover:text-fuchsia-600 rounded-md">Team</a>
              <a href="#community" className="block px-3 py-2 text-slate-600 hover:bg-fuchsia-50 hover:text-fuchsia-600 rounded-md">Community</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsRegisterOpen(true);
                }}
                className="w-full mt-4 bg-fuchsia-600 text-white px-5 py-3 rounded-lg font-medium"
              >
                Join Network
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Empowering Women Everywhere
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Connect. Grow. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">
              Lead with Purpose.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Femina A Network is the premier digital ecosystem for women to find mentorship, 
            unlock professional opportunities, and build lasting relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsRegisterOpen(true)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-fuchsia-600 to-purple-600 group-hover:from-fuchsia-600 group-hover:to-purple-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 shadow-lg shadow-purple-500/30"
            >
              <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white text-slate-900 rounded-full group-hover:bg-opacity-0 group-hover:text-white font-bold text-lg flex items-center">
                Become a Member <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </button>
            
            <button className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-all mb-2">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-100 to-purple-100 rounded-2xl transform -rotate-2"></div>
              {/* NOTE: If you imported your image, replace the src below with: src={aboutImage} */}
              <img 
                src={feminaImage} 
                alt="Women networking" 
                className="relative rounded-xl shadow-xl w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Femina A Network?</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                We believe that when women support women, incredible things happen. Our network was founded 
                on the principle that access to resources and a strong community are the keys to 
                breaking barriers.
              </p>
              <ul className="space-y-4">
                {[
                  "Access to exclusive industry insights",
                  "Weekly peer-to-peer support circles",
                  "Direct channels to potential employers"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / Features Grid */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Empowerment in Action</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We provide the tools and space you need to thrive personally and professionally.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-fuchsia-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Love (Community) */}
      <section id="community" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Community Voices
            </div>
            <h2 className="text-3xl font-bold text-slate-900">What Our Members Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tweets.map((t, i) => <TweetCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <TeamSection />
      <BlogSection />
      <Stats />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                <span className="font-bold text-xl text-white">Femina A Network</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-xs">
                Empowering women to lead, innovate, and grow through connection and mentorship.
              </p>
            </div>

            {/* Column 2: Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
              <div className="space-y-4">
                <a href="mailto:hello@feminaanetwork.com" className="flex items-center gap-3 hover:text-fuchsia-400 transition-colors">
                  <Mail className="w-5 h-5 text-fuchsia-500" />
                  <span>hello@feminaanetwork.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-fuchsia-500" />
                  <span>+234 800 123 4567</span>
                </div>
              </div>
            </div>

            {/* Column 3: Socials */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://x.com/FeminaANetwork" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-fuchsia-600 text-white transition-all transform hover:-translate-y-1">
                  <XIcon className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-fuchsia-600 text-white transition-all transform hover:-translate-y-1">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-fuchsia-600 text-white transition-all transform hover:-translate-y-1">
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>
              © {new Date().getFullYear()} Femina A Network. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-fuchsia-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-fuchsia-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;