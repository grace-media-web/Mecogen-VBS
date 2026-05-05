/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  HandHelping, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Users, 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  Mail, 
  Navigation,
  Globe,
  QrCode,
  DollarSign
} from 'lucide-react';
import { VBS_DATA, Region } from './constants';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-editorial-bg shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-end border-b border-editorial-text/10 pb-4">
        <a href="#" className="flex items-baseline gap-3">
          <span className={`font-black text-2xl tracking-tighter transition-colors ${isScrolled ? 'text-editorial-text' : 'text-white'}`}>
            MECOGEN
          </span>
          <span className={`text-[10px] uppercase tracking-widest font-bold opacity-60 hidden sm:block ${isScrolled ? 'text-editorial-text' : 'text-white'}`}>
            VBS Project 2026
          </span>
        </a>
        <div className={`hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-bold ${isScrolled ? 'text-editorial-text' : 'text-white/80'}`}>
          <a href="#about" className="hover:text-editorial-accent transition-colors">Mission</a>
          <a href="#vision" className="hover:text-editorial-accent transition-colors">Impact</a>
          <a href="#villages" className="hover:text-editorial-accent transition-colors">Villages</a>
          <a href="#donate" className="text-editorial-accent">Support Now</a>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <h2 className={`text-2xl md:text-3xl font-serif font-black italic ${light ? 'text-white' : 'text-editorial-text'}`}>{title}</h2>
      <div className="h-px flex-1 bg-editorial-text/10 overflow-hidden">
        <div className="h-full bg-editorial-accent w-16"></div>
      </div>
    </div>
    {subtitle && <p className={`max-w-2xl text-[11px] uppercase tracking-[0.2em] font-bold ${light ? 'text-white/60' : 'text-editorial-text/60'}`}>{subtitle}</p>}
  </div>
);

const VillageTracker = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section id="villages" className="py-24 bg-editorial-panel border-y border-editorial-text/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Village Honor Roll 2026</h2>
          <span className="h-px flex-1 bg-editorial-text/10 mx-4"></span>
          <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Master Registry</span>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {VBS_DATA.map((region) => (
            <div key={region.id} className="border-b border-editorial-text/10 pb-8 h-fit">
              <button 
                onClick={() => setExpandedId(expandedId === region.id ? null : region.id)}
                className="w-full flex justify-between items-baseline mb-4 text-left group"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono opacity-40">{region.id.toString().padStart(2, '0')}</span>
                  <h3 className="font-serif font-black text-xl italic group-hover:text-editorial-accent transition-colors">{region.name}</h3>
                </div>
                <span className="text-xs font-mono opacity-40">{expandedId === region.id ? '[ - ]' : '[ + ]'}</span>
              </button>
              
              <AnimatePresence>
                {expandedId === region.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 pl-8">
                      {region.fields.map((field, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-[9px] font-black uppercase tracking-widest text-editorial-accent flex items-center gap-2">
                             {field.name}
                          </h4>
                          <div className="grid grid-cols-1 gap-1">
                            {field.villages.map((village, vIdx) => (
                              <div key={vIdx} className="flex justify-between items-center text-[11px] font-medium border-b border-editorial-text/5 pb-1">
                                <span className={village.status === 'held' ? 'text-editorial-text' : 'text-editorial-text/40'}>{village.name}</span>
                                {village.status === 'held' && <span className="text-[9px] uppercase tracking-tighter text-green-600 font-bold">Verified</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'pray' | 'volunteer' | 'support'>('pray');
  const [formData, setFormData] = useState({ name: '', mobile: '', place: '', amount: '100' });
  const [showQR, setShowQR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Paste your Google Apps Script Web App URL here
  const GOOGLE_SCRIPT_URL = ""; 

  const handleDonation = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.name.length < 2 || !/^[6-9]\d{9}$/.test(formData.mobile) || formData.place.length < 2 || !formData.amount) {
      alert("தயவு செய்து சரியான விவரங்களை உள்ளிடவும் (Please enter valid details and amount)");
      return;
    }
    
    if (GOOGLE_SCRIPT_URL) {
      try {
        setIsSubmitting(true);
        const submitData = new FormData();
        submitData.append('Name', formData.name);
        submitData.append('Mobile', formData.mobile);
        submitData.append('Place', formData.place);
        submitData.append('Amount', formData.amount);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: submitData,
          mode: 'no-cors'
        });
      } catch (error) {
        console.error("Error submitting form to sheet", error);
      } finally {
        setIsSubmitting(false);
      }
    }

    setShowQR(true);

    if (window.innerWidth < 768) {
      const isAndroid = /android/i.test(navigator.userAgent);
      const upiUrl = isAndroid 
        ? `intent://pay?pa=graceministriesindia@okhdfcbank&pn=MECOGEN%20VBS&cu=INR&am=${formData.amount}#Intent;scheme=upi;end;`
        : `upi://pay?pa=graceministriesindia@okhdfcbank&pn=MECOGEN%20VBS&cu=INR&am=${formData.amount}`;
      
      const link = document.createElement('a');
      link.href = upiUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sendWhatsApp = () => {
    const msg = `*MECOGEN VBS 2026*%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Place:* ${formData.place}%0A*Amount:* ₹${formData.amount}%0A%0ASupport confirmed. Sending screenshot.`;
    window.open(`https://wa.me/919443289026?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-editorial-bg font-sans text-editorial-text selection:bg-editorial-accent/20">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block bg-editorial-text text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4"
              >
                Grace Ministries Presents
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-7xl lg:text-[100px] leading-tight lg:leading-[0.85] font-serif font-black italic tracking-tighter"
              >
                வா இயேசுவிடம் <span className="block text-editorial-accent mt-2 lg:mt-0 not-italic">வா.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl leading-relaxed max-w-lg font-serif opacity-80"
              >
                MECOGEN is a movement reaching the coming generation in unreached villages. Through VBS, we guide children toward the path of salvation.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 mt-12 border-t border-b border-editorial-text/10"
            >
              <div className="flex flex-col">
                <span className="text-5xl font-black font-serif">27k</span>
                <span className="text-[9px] uppercase tracking-wider font-bold opacity-60">Children Reached</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-black font-serif">575</span>
                <span className="text-[9px] uppercase tracking-wider font-bold opacity-60">Villages Impacted</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-black font-serif">11</span>
                <span className="text-[9px] uppercase tracking-wider font-bold opacity-60">Districts Covered</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <a href="#donate" className="flex-1 bg-editorial-text text-white p-6 flex flex-col justify-between cursor-pointer group transition-all hover:bg-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Support the Mission</span>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-xl font-bold italic font-serif">Donate ₹5,000</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
              <a href="#involve" className="flex-1 border-2 border-editorial-text p-6 flex flex-col justify-between cursor-pointer group transition-all hover:bg-editorial-panel">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Participation</span>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-xl font-bold italic font-serif">Volunteer Now</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            </motion.div>
          </div>
          
          <div className="hidden lg:block col-span-5 relative">
            <div className="absolute inset-0 bg-editorial-panel rounded-full blur-3xl opacity-50 -z-10" />
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              src="/images/photo1.png" 
              className="w-full h-auto rounded-3xl object-cover shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-editorial-text/5 transform rotate-2"
              onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1540317580114-ed684c0cff02?auto=format&fit=crop&q=80&w=1200')}
            />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
             <div className="md:w-1/3">
                <h2 className="text-[60px] font-serif font-black italic leading-none text-editorial-text mb-6">ஆலயம் இல்லாக் கிராமங்கள்.</h2>
                <div className="w-16 h-1.5 bg-editorial-accent mb-8"></div>
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">Mecogen Story</p>
             </div>
             <div className="md:w-2/3 space-y-8 text-xl font-serif leading-relaxed italic opacity-90">
                <p>
                  <strong className="not-italic font-sans text-editorial-accent text-[11px] uppercase tracking-widest block mb-4">Mission Statement</strong>
                  MECOGEN (Meeting Coming Generation) கிருபையின் ஊழியங்களின் இளைஞர் இணை இயக்கமான ஆத்தும ஆதாயகர் இளைஞர் இயக்கத்தின் மூலமாக ஆலயம் இல்லா கிராமங்களில் உள்ள சிறுவர்களை சந்திக்கும் நடைபெறும் VBS நற்செய்தி பணி.
                </p>
                <p>
                  ஆலயம் இல்லா கிராமங்களில் VBS மூலமாக சந்திக்கப்படுகிற சிறுவர்களை இரட்சிப்பின் பாதையில் வழி நடத்தி அவர்கள் மூலமாக கிராமங்களை சந்தித்து தேவனுக்காய் ஆலயங்களை எழுப்புவதே எங்களின் உன்னத நோக்கம் ஆகும்.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Vision Photo Carousel */}
      <section id="vision" className="pb-32">
        <div className="container mx-auto px-6">
          <div 
            className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide snap-x"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <img 
                key={i} 
                src={`/images/photo${i}.png`} 
                alt={`VBS Photo ${i}`} 
                className="w-[85vw] sm:w-[450px] aspect-[4/3] object-cover flex-shrink-0 snap-center border border-editorial-text/10"
                onError={(e) => (e.currentTarget.src = `https://placehold.co/800x600?text=VBS+Exhibit+${i}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Villages Tracker Component */}
      <VillageTracker />

      {/* Get Involved Section */}
      <section id="involve" className="py-32 bg-editorial-bg">
        <div className="container mx-auto px-6">
          <SectionHeader title="Get Involved" subtitle="Participation in the Divine Calling" />
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row border border-editorial-text/10">
            <div className="md:w-1/3 flex flex-row overflow-x-auto md:flex-col border-b md:border-b-0 md:border-r border-editorial-text/10 bg-editorial-panel/30">
              <button 
                onClick={() => setActiveTab('pray')}
                className={`flex-1 min-w-[120px] p-6 md:p-8 text-center md:text-left text-[10px] uppercase font-bold tracking-widest border-r md:border-r-0 md:border-b border-editorial-text/10 transition-all ${activeTab === 'pray' ? 'bg-editorial-text text-white' : 'hover:bg-editorial-panel'}`}
              >
                01. Pray <br className="md:hidden"/>(ஜெபிக்க)
              </button>
              <button 
                onClick={() => setActiveTab('volunteer')}
                className={`flex-1 min-w-[120px] p-6 md:p-8 text-center md:text-left text-[10px] uppercase font-bold tracking-widest border-r md:border-r-0 md:border-b border-editorial-text/10 transition-all ${activeTab === 'volunteer' ? 'bg-editorial-text text-white' : 'hover:bg-editorial-panel'}`}
              >
                02. Volunteer <br className="md:hidden"/>(தன்னார்வலராக)
              </button>
              <button 
                onClick={() => setActiveTab('support')}
                className={`flex-1 min-w-[120px] p-6 md:p-8 text-center md:text-left text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'support' ? 'bg-editorial-text text-white' : 'hover:bg-editorial-panel'}`}
              >
                03. Support <br className="md:hidden"/>(தாங்க)
              </button>
            </div>

            <div className="md:w-2/3 p-12">
              <AnimatePresence mode="wait">
                {activeTab === 'pray' && (
                  <motion.div 
                    key="pray"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-serif font-black italic mb-8">Prayer Altars.</h3>
                    {[
                      "27,000 சிறுவர்களை மிஷனரிகள் மற்றும் தன்னார்வலர்கள் சந்திக்க ஜெபியுங்கள்.",
                      "தமிழகத்தின் 11 மாவட்டங்களில் 575 VBS-களை வெற்றிகரமாக நடத்த ஜெபியுங்கள்.",
                      "நடைபெற்று வருகிற VBS களுக்காக தேவனை துதியுங்கள்.",
                      "ஊழியர்கள் பிரயாணம் செய்யும் வாகனங்கள் பாதுகாப்பிற்காக ஜெபியுங்கள்."
                    ].map((point, idx) => (
                      <div key={idx} className="flex gap-4 items-start border-b border-editorial-text/5 pb-4">
                        <span className="text-[10px] font-mono opacity-30 mt-1">{idx + 1}</span>
                        <p className="text-sm font-medium tracking-tight">{point}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'volunteer' && (
                  <motion.div 
                    key="volunteer"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <h3 className="text-3xl font-serif font-black italic mb-6">Service.</h3>
                    <p className="text-lg font-serif italic mb-10 opacity-80 leading-relaxed">
                      ஆலயம் இல்லா கிராமங்களில் VBS வகுப்புகளை நடத்துவதற்கு ஆத்தும பாரம் உள்ள தன்னார்வ ஊழியர்களை நாங்கள் வரவேற்கிறோம்.
                    </p>
                    <a href="https://docs.google.com/forms/d/your-id" target="_blank" className="inline-block border-2 border-editorial-text px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-editorial-text hover:text-white transition-all w-fit">
                      Apply to Volunteer
                    </a>
                  </motion.div>
                )}

                {activeTab === 'support' && (
                  <motion.div 
                    key="support"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <h3 className="text-3xl font-serif font-black italic mb-10">Stewardship.</h3>
                    <div className="grid grid-cols-1 gap-4 mb-10">
                      <div className="border border-editorial-text/10 p-6 flex justify-between items-center group hover:border-editorial-accent transition-colors">
                        <div>
                          <p className="text-[9px] uppercase font-bold tracking-widest opacity-40 mb-1">Impact Level: Primary</p>
                          <h4 className="text-xl font-bold font-serif italic">1 Child / ஒரு குட்டி</h4>
                        </div>
                        <span className="text-2xl font-black text-editorial-accent">₹ 100</span>
                      </div>
                      <div className="border border-editorial-text/10 p-6 flex justify-between items-center group hover:border-editorial-accent transition-colors">
                        <div>
                          <p className="text-[9px] uppercase font-bold tracking-widest opacity-40 mb-1">Impact Level: Community</p>
                          <h4 className="text-xl font-bold font-serif italic">1 Village / ஒரு கிராமம்</h4>
                        </div>
                        <span className="text-2xl font-black text-editorial-accent">₹ 5,000</span>
                      </div>
                    </div>
                    <a href="#donate" className="inline-block bg-editorial-text text-white px-10 py-5 font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all w-fit shadow-xl">
                      Proceed to Support
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate" className="py-32 bg-editorial-panel">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 bg-editorial-bg border border-editorial-text/10 overflow-hidden shadow-2xl">
            <div className="p-12 border-r border-editorial-text/10">
              <h3 className="text-4xl font-serif font-black italic mb-4 leading-none">Support the <span className="text-editorial-accent">Mission.</span></h3>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 mb-12">Donation Registry</p>
              
              <form onSubmit={handleDonation} className="space-y-8">
                <div className="space-y-4 mb-4">
                  <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Donation Purpose</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`block border p-4 cursor-pointer transition-colors ${formData.amount === '100' ? 'border-editorial-accent bg-editorial-accent/10' : 'border-editorial-text/20 hover:border-editorial-accent/50'}`}>
                      <input type="radio" name="amount" value="100" checked={formData.amount === '100'} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="hidden" />
                      <div className="text-[9px] uppercase tracking-widest opacity-50 mb-1">1 Child / ஒரு குட்டி</div>
                      <div className="text-xl font-serif font-black italic text-editorial-accent">₹ 100</div>
                    </label>
                    <label className={`block border p-4 cursor-pointer transition-colors ${formData.amount === '5000' ? 'border-editorial-accent bg-editorial-accent/10' : 'border-editorial-text/20 hover:border-editorial-accent/50'}`}>
                      <input type="radio" name="amount" value="5000" checked={formData.amount === '5000'} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="hidden" />
                      <div className="text-[9px] uppercase tracking-widest opacity-50 mb-1">1 Village / ஒரு கிராமம்</div>
                      <div className="text-xl font-serif font-black italic text-editorial-accent">₹ 5,000</div>
                    </label>
                  </div>
                  <div className="pt-2">
                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60 block mb-2">Or enter any custom amount</label>
                    <div className="flex items-center gap-2 border-b border-editorial-text/20 pb-2 focus-within:border-editorial-accent transition-colors">
                      <span className="font-serif italic text-lg opacity-60">₹</span>
                      <input 
                        type="number" 
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full bg-transparent outline-none font-serif text-lg italic transition-colors"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mt-8">
                  <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value.replace(/[0-9]/g, '')})}
                    className="w-full bg-transparent border-b border-editorial-text/20 py-2 focus:border-editorial-accent outline-none font-serif text-lg italic transition-colors"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Mobile Contact</label>
                  <input 
                    type="tel" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-transparent border-b border-editorial-text/20 py-2 focus:border-editorial-accent outline-none font-serif text-lg italic transition-colors"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Place of Birth/Residence</label>
                  <input 
                    type="text" 
                    value={formData.place}
                    onChange={(e) => setFormData({...formData, place: e.target.value})}
                    className="w-full bg-transparent border-b border-editorial-text/20 py-2 focus:border-editorial-accent outline-none font-serif text-lg italic transition-colors"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-editorial-text text-white py-5 font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Next Step →'}
                </button>
              </form>
            </div>

            <div className="bg-editorial-panel/50 flex items-center justify-center p-12">
              <AnimatePresence mode="wait">
                {!showQR ? (
                  <motion.div 
                    key="intro" 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center italic font-serif opacity-40 text-sm"
                  >
                    Please complete the form to generate your specialized UPI gateway.
                  </motion.div>
                ) : (
                  <motion.div 
                    key="qr"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="text-center w-full"
                  >
                    <div className="bg-white p-4 inline-block mb-6 shadow-xl border border-editorial-text/5">
                       <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=graceministriesindia@okhdfcbank&pn=MECOGEN%20VBS&cu=INR&am=${formData.amount}`)}`}
                          alt="Payment QR"
                          className="w-48 h-48"
                        />
                    </div>
                    <p className="hidden md:block text-[9px] uppercase font-bold tracking-widest opacity-60 mb-8 max-w-xs mx-auto">Scan with GPay, PhonePe, or any UPI terminal to pay ₹{formData.amount}</p>
                    <p className="md:hidden text-[9px] uppercase font-bold tracking-widest opacity-60 mb-4 max-w-xs mx-auto">Pay ₹{formData.amount} using any UPI App</p>
                    <a 
                      href={/android/i.test(navigator.userAgent) ? `intent://pay?pa=graceministriesindia@okhdfcbank&pn=MECOGEN%20VBS&cu=INR&am=${formData.amount}#Intent;scheme=upi;end;` : `upi://pay?pa=graceministriesindia@okhdfcbank&pn=MECOGEN%20VBS&cu=INR&am=${formData.amount}`} 
                      className="md:hidden inline-block bg-editorial-text text-white px-6 py-3 font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all mb-8 shadow-md"
                    >
                      Open UPI App
                    </a>
                    <br className="md:hidden" />
                    <button 
                      onClick={sendWhatsApp}
                      className="inline-block border-b-2 border-editorial-text font-black text-xs uppercase tracking-[0.2em] pb-1 hover:text-editorial-accent hover:border-editorial-accent transition-all"
                    >
                      Confirm via WhatsApp
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 bg-editorial-bg border-t border-editorial-text/10">
        <div className="container mx-auto px-6 overflow-hidden">
           <div className="flex flex-col md:flex-row justify-between items-end gap-12 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 pb-8 border-b border-editorial-text/5">
              <div className="space-y-1">
                <p>Tuticorin, Tamil Nadu</p>
                <p>628101, India</p>
              </div>
              <div className="text-center">
                <p>© 2026 Grace Ministries India</p>
              </div>
              <div className="text-right space-y-1">
                <p>MECOGEN VBS 2026</p>
                <p>Meeting Coming Generation</p>
              </div>
           </div>
           
           <div className="flex justify-center mt-12 mb-8">
              <span className="text-[120px] md:text-[200px] leading-none font-serif font-black italic opacity-[0.03] pointer-events-none select-none">
                MECOGEN
              </span>
           </div>
        </div>
      </footer>
    </div>
  );
}
