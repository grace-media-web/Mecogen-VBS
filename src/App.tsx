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
  DollarSign,
  ArrowUp
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Grace Ministries" className="h-10 w-auto" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Logo')} />
          <span className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-primary-800' : 'text-white'}`}>
            MECOGEN VBS
          </span>
        </a>
        <div className={`hidden md:flex gap-8 font-medium ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>
          <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
          <a href="#vision" className="hover:text-blue-500 transition-colors">Vision</a>
          <a href="#mission" className="hover:text-blue-500 transition-colors">Mission</a>
          <a href="#involve" className="hover:text-blue-500 transition-colors">Involve</a>
          <a href="#donate" className="hover:text-blue-500 transition-colors">Donate</a>
        </div>
        <a href="#donate" className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
          Support Now
        </a>
      </div>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    <div className="w-16 h-1.5 bg-yellow-400 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className={`max-w-2xl mx-auto text-lg ${light ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const MissionTracker = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  let heldVillages = 0;
  VBS_DATA.forEach((region) => {
    region.fields.forEach((field) => {
      field.villages.forEach((village) => {
        if (village.status === 'held') heldVillages++;
      });
    });
  });

  const childrenGoal = 27000;
  const villageGoal = 575;
  const vbsGoal = 575;

  const currentVillages = heldVillages || 35; // Default for display so bars have some fill if 0
  const currentVBS = heldVillages || 35;
  const currentChildren = (heldVillages || 35) * 45; 

  const progressProps = (current: number, goal: number) => {
     const pct = Math.max(1, Math.min(100, (current / goal) * 100));
     return { current, goal, pct };
  }

  const childProgress = progressProps(currentChildren, childrenGoal);
  const villageProgress = progressProps(currentVillages, villageGoal);
  const vbsProgress = progressProps(currentVBS, vbsGoal);

  return (
    <section id="mission" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <SectionHeader 
          light
          title="Reached Goal" 
          subtitle="நடைபெற்ற முடிந்த VBS எண்ணிக்கை"
        />
        
        <div className="max-w-4xl mx-auto space-y-8 mb-20 bg-gray-800 p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl">
           <div className="space-y-3">
             <div className="flex justify-between text-sm md:text-base font-bold text-gray-200 mb-1">
               <span className="flex items-center gap-2"><Users size={18} className="text-blue-400"/> Child Outreach Goal</span>
               <span>{currentChildren.toLocaleString()} / {childrenGoal.toLocaleString()}</span>
             </div>
             <div className="w-full bg-gray-900 h-4 rounded-full overflow-hidden border border-gray-700">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${childProgress.pct}%` }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full" 
               />
             </div>
           </div>

           <div className="space-y-3">
             <div className="flex justify-between text-sm md:text-base font-bold text-gray-200 mb-1">
               <span className="flex items-center gap-2"><MapPin size={18} className="text-green-400"/> Villages Reached</span>
               <span>{currentVillages.toLocaleString()} / {villageGoal.toLocaleString()}</span>
             </div>
             <div className="w-full bg-gray-900 h-4 rounded-full overflow-hidden border border-gray-700">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${villageProgress.pct}%` }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                 className="bg-gradient-to-r from-green-600 to-green-400 h-full rounded-full" 
               />
             </div>
           </div>

           <div className="space-y-3">
             <div className="flex justify-between text-sm md:text-base font-bold text-gray-200 mb-1">
               <span className="flex items-center gap-2"><Heart size={18} className="text-yellow-400"/> VBS Completed</span>
               <span>{currentVBS.toLocaleString()} / {vbsGoal.toLocaleString()}</span>
             </div>
             <div className="w-full bg-gray-900 h-4 rounded-full overflow-hidden border border-gray-700">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${vbsProgress.pct}%` }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                 className="bg-gradient-to-r from-yellow-500 to-yellow-300 h-full rounded-full" 
               />
             </div>
           </div>
        </div>
        
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-3 text-white">நமது கிராம ஊழியங்கள் (Our Village Missions)</h3>
          <p className="text-gray-400 mb-8">தமிழகம் முழுவதும் நடைபெற்று வரும் VBS பணித்தளங்கள்</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-gray-900">
          {VBS_DATA.map((region) => (
            <div key={region.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setExpandedId(expandedId === region.id ? null : region.id)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Navigation size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{region.name}</h3>
                </div>
                {expandedId === region.id ? <ChevronDown /> : <ChevronRight />}
              </button>
              
              <AnimatePresence>
                {expandedId === region.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 space-y-6">
                      {region.fields.map((field, idx) => (
                        <div key={idx} className="bg-blue-50/50 rounded-xl p-4">
                          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                             <MapPin size={16} /> {field.name}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {field.villages.map((village, vIdx) => (
                              <div key={vIdx} className="flex items-center gap-2 text-gray-700 bg-white p-2 rounded-lg border border-blue-100/50">
                                <CheckCircle2 size={14} className={village.status === 'held' ? 'text-green-500' : 'text-orange-400'} />
                                <span className="text-sm font-medium">{village.name}</span>
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
  const [formData, setFormData] = useState({ name: '', mobile: '', place: '' });
  const [showQR, setShowQR] = useState(false);
  const [donationAmount, setDonationAmount] = useState<string>('100');
  const [donationType, setDonationType] = useState<'child' | 'village' | 'custom'>('child');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAmountSelect = (type: 'child' | 'village') => {
    setDonationType(type);
    setDonationAmount(type === 'child' ? '100' : '5000');
  };

  const handleCustomAmount = (val: string) => {
    setDonationType('custom');
    setDonationAmount(val.replace(/\D/g, ''));
  };

  const handleDonation = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name.length < 2 || !/^[6-9]\d{9}$/.test(formData.mobile) || formData.place.length < 2) {
      alert("தயவு செய்து சரியான விவரங்களை உள்ளிடவும் (Please enter valid details)");
      return;
    }
    if (!donationAmount || Number(donationAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setShowQR(true);
  };

  const sendWhatsApp = () => {
    const UPI_ID = "graceministriesindia@okhdfcbank";
    const msg = `*MECOGEN VBS 2026*%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Place:* ${formData.place}%0A*Amount:* ₹${donationAmount}%0A%0ASupport confirmed. Sending screenshot.`;
    window.open(`https://wa.me/919443289026?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900/80 z-10" />
          <img 
            src="/images/hero-bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover" 
            onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1540317580114-ed684c0cff02?auto=format&fit=crop&q=80&w=2000')}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.3em] font-black text-blue-300 md:text-xl mb-6"
          >
            Meeting Coming Generation
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-black mb-8 leading-tight drop-shadow-2xl"
          >
            VBS <span className="text-yellow-400">2026</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-yellow-400 mb-12 drop-shadow-lg"
          >
            வா இயேசுவிடம் வா
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#about" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-xl inline-flex items-center gap-2">
              Learn More <ChevronRight size={20} />
            </a>
            <a href="#mission" className="bg-blue-600/30 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-xl inline-flex items-center gap-2">
              Mission Goals
            </a>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="About MECOGEN" 
            subtitle="மீக்கோஜன் - எதிர்காலத் தலைமுறையை சந்திப்போம்"
          />
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong className="text-blue-600 block text-2xl mb-2">MECOGEN (Meeting Coming Generation)</strong> 
                கிருபையின் ஊழியங்களின் இளைஞர் இணை இயக்கமான ஆத்தும ஆதாயகர் இளைஞர் இயக்கத்தின் (Young soul winners mission) மூலமாக ஆலயம் இல்லா கிராமங்களில் உள்ள சிறுவர்களை சந்திக்கும் நடைபெறும் VBS நற்செய்தி பணி.
              </p>
              <p>
                ஆலயம் இல்லா கிராமங்களில் VBS மூலமாக சந்திக்கப்படுகிற சிறுவர்களை இரட்சிப்பின் பாதையில் வழி நடத்தி அவர்கள் மூலமாக கிராமங்களை சந்தித்து தேவனுக்காய் ஆலயங்களை எழுப்புவதே எங்களின் உன்னத நோக்கம் ஆகும்.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl" />
              <img 
                src="https://images.unsplash.com/photo-1540317580114-ed684c0cff02?auto=format&fit=crop&q=80&w=800" 
                alt="VBS Training" 
                className="relative z-10 w-full h-auto rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:-translate-y-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 bg-blue-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader light title="Our Vision" subtitle="நமது இலக்கு மற்றும் தரிசனம்" />
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="bg-yellow-400 text-blue-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">27,000+</h3>
              <p className="text-white/70">வளர்  தலைமுறையை இயேசுவுக்காய் ஆயத்தப்படுத்துவது எங்கள் நஎங்களின் பிரதான நோக்கம்</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="bg-yellow-400 text-blue-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">11 Districts</h3>
              <p className="text-white/70">தமிழகத்தில் உள்ள 11 மாவட்டங்களில்</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="bg-yellow-400 text-blue-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Navigation size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">575 Villages</h3>
              <p className="text-white/70">ஆலயம் இல்லா கிராமங்களில் கோடைகால VBS ஊழியங்கள்</p>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x"
          >
            {[1, 2, 3, 4, 5].map((i, index) => (
              <motion.img 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                src={`/images/photo${i}.png`} 
                alt={`VBS Photo ${i}`} 
                className="w-80 h-56 object-cover rounded-2xl flex-shrink-0 snap-center shadow-2xl border-4 border-white/10"
                onError={(e) => (e.currentTarget.src = `https://placehold.co/400x300?text=VBS+Photo+${i}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tracker Component */}
      <MissionTracker />

      {/* Get Involved Section */}
      <section id="involve" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Get Involved" subtitle="இந்த ஊழியத்தில் நீங்களும் இணைந்து செயல்படலாம்" />
          
          <div className="max-w-4xl mx-auto">
            <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
              <button 
                onClick={() => setActiveTab('pray')}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'pray' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <HandHelping size={20} /> Pray (ஜெபிக்க)
              </button>
              <button 
                onClick={() => setActiveTab('volunteer')}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'volunteer' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Users size={20} /> Volunteer (தன்னார்வலராக)
              </button>
              <button 
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'support' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Heart size={20} /> Support (தாங்க)
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {activeTab === 'pray' && (
                  <motion.div 
                    key="pray"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid gap-4"
                  >
                    {[
                      "27,000 சிறுவர்களை மிஷனரிகள் மற்றும் தன்னார்வ ஊழியர்கள் சந்திக்க ஜெபியுங்கள்.",
                      "தமிழகத்தின் 11 மாவட்டங்களில் 575 VBS-களை வதடையில்லாமல் நடத்த ஜெபியுங்கள்.",
                      "நடைபெற்று வருகிற VBS களுக்காக தேவனை துதியுங்கள்.",
                      "ஒரு கிராம VBSஐ ரூ 5,000 கொடுத்து தாங்கும் ஆத்தும பாரம் உள்ள பங்காளர்கள் எழும்ப ஜெபியுங்கள்.",
                      "VBS நடத்துகிற ஊழியர்கள் மற்றும் தன்னார்வ ஊழியர்கள் வெயிலின் தாக்கத்தினால் பாதிக்கப்படாமல் இருக்க ஜெபியுங்கள்.",
                      "ஊழியர்கள் பிரயாணம் செய்யும் வாகனங்கள் பாதுகாப்பிற்காக ஜெபியுங்கள்."
                    ].map((point, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold">{idx + 1}</div>
                        <p className="text-gray-700 font-medium">{point}</p>
                      </div>
                    ))}
                    <div className="mt-8 text-center">
                      <a href="https://wa.me/919443289026?text=Praying for MECOGEN" className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-blue-200 transition-all">
                        <MessageSquare size={20} /> எங்களோடு இணைந்து ஜெபிக்க
                      </a>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'volunteer' && (
                  <motion.div 
                    key="volunteer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center py-12"
                  >
                    <div className="bg-yellow-100 text-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Users size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">Join as a Volunteer</h3>
                    <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
                      ஆலயம் இல்லா கிராமங்களில் VBS வகுப்புகளை நடத்துவதற்கு ஆத்தும பாரம் உள்ள தன்னார்வ ஊழியர்களை நாங்கள் வரவேற்கிறோம்
                      </p>
                      <p>
                      நீங்களும் இந்த விடுமுறை நாட்களில் எங்களோடு VBS பணிகளில் இணைந்து தேவனுடைய ராஜ்யத்தை கட்டலாம்!</p>
                    <a href="https://docs.google.com/forms/d/your-id" target="_blank" className="bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-blue-700 shadow-xl inline-block">
                      Join the Mission
                    </a>
                  </motion.div>
                )}

                {activeTab === 'support' && (
                  <motion.div 
                    key="support"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center py-12"
                  >
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                      <div className="bg-green-50 border border-green-100 p-8 rounded-3xl">
                        <p className="text-gray-600 mb-1">ஒரு கிராமம் / 1 Village</p>
                        <h4 className="text-3xl font-black text-green-700">₹ 5,000</h4>
                        <p className="text-sm text-green-600 mt-2 font-medium">(6 Days VBS Expenses)</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
                        <p className="text-gray-600 mb-1">ஒரு பிள்ளை / 1 Child</p>
                        <h4 className="text-3xl font-black text-blue-700">₹ 100</h4>
                        <p className="text-sm text-blue-600 mt-2 font-medium">(Study Kits & Materials)</p>
                      </div>
                    </div>
                    <a href="#donate" className="bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-blue-700 shadow-xl inline-block">
                      Make a Donation
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader title="Support the Mission" subtitle="உங்கள் காணிக்கை ஒரு தலைமுறையை மாற்றும்" />
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 min-h-[600px]">
             
             {/* Left Column: Form & Amount */}
             <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Donation Registry</h3>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Donation Purpose</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => handleAmountSelect('child')}
                        className={`p-4 md:p-6 text-left border-2 rounded-2xl transition-all ${donationType === 'child' ? 'border-yellow-400 bg-yellow-50/50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                      >
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">1 Child / ஒரு பிள்ளைி</p>
                        <h4 className="text-2xl md:text-3xl font-black text-yellow-500">₹ 100</h4>
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleAmountSelect('village')}
                        className={`p-4 md:p-6 text-left border-2 rounded-2xl transition-all ${donationType === 'village' ? 'border-yellow-400 bg-yellow-50/50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                      >
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">1 Village / ஒரு கிராமம்</p>
                        <h4 className="text-2xl md:text-3xl font-black text-yellow-500">₹ 5,000</h4>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Or Enter Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
                      <input 
                        type="text" 
                        value={donationAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        placeholder="100" 
                        className="w-full pl-8 py-3 bg-transparent border-b-2 border-gray-100 focus:border-blue-500 transition-colors outline-none text-2xl font-bold text-gray-800 placeholder-gray-300"
                      />
                    </div>
                  </div>

                  <form onSubmit={handleDonation} className="space-y-8 pt-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value.replace(/[0-9]/g, '')})}
                        className="w-full py-3 bg-transparent border-b-2 border-gray-100 focus:border-blue-500 transition-colors outline-none text-lg font-medium text-gray-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Mobile Contact</label>
                      <input 
                        type="tel" 
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        maxLength={10}
                        className="w-full py-3 bg-transparent border-b-2 border-gray-100 focus:border-blue-500 transition-colors outline-none text-lg font-medium tracking-wider text-gray-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Place of Residence</label>
                      <input 
                        type="text" 
                        value={formData.place}
                        onChange={(e) => setFormData({...formData, place: e.target.value})}
                        className="w-full py-3 bg-transparent border-b-2 border-gray-100 focus:border-blue-500 transition-colors outline-none text-lg font-medium text-gray-800"
                        required
                      />
                    </div>
                    
                    <button type="submit" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                       Next Step &rarr;
                    </button>
                  </form>
                </div>
             </div>

             {/* Right Column: QR Gateway */}
             <div className="bg-[#f9f8f5] p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-200">
                <AnimatePresence mode="wait">
                  {!showQR ? (
                    <motion.div 
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="text-center px-6"
                    >
                      <p className="text-gray-500 italic text-xl font-serif">
                        Please complete the form to generate your specialized UPI gateway.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="qr"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-sm flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                        <QrCode size={32} />
                      </div>
                      <h4 className="text-2xl font-black mb-2 text-gray-900">Scan to Pay</h4>
                      <p className="text-gray-500 font-medium mb-8">Amount: <span className="text-gray-900 font-bold">₹{parseInt(donationAmount).toLocaleString()}</span></p>
                      
                      <div className="p-4 bg-white border border-gray-200 rounded-3xl shadow-sm mb-8 w-full flex justify-center">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=graceministriesindia@okhdfcbank&pn=MECOGEN%20VBS&cu=INR&am=${donationAmount}`)}`}
                          alt="Payment QR"
                          className="w-56 h-56"
                        />
                      </div>
                      
                      <button 
                        onClick={sendWhatsApp}
                        className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-all shadow-md"
                      >
                        Confirm via WhatsApp 📱
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-xl">
                    <QrCode size={24} />
                  </div>
                  <span className="font-black text-2xl tracking-tighter uppercase">MECOGEN</span>
                </div>
                <p className="text-gray-400 leading-relaxed font-medium">
                  Transforming the next generation through prayer, mission, and dedication in the remote villages of India.
                </p>
              </div>
              
              <div>
                <h5 className="text-lg font-bold mb-8 text-blue-400">Quick Links</h5>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li><a href="#about" className="hover:text-white transition-colors">About Story</a></li>
                  <li><a href="#vision" className="hover:text-white transition-colors">Goal 2026</a></li>
                  <li><a href="#mission" className="hover:text-white transition-colors">Mission Tracker</a></li>
                  <li><a href="#donate" className="hover:text-white transition-colors">Support Center</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-bold mb-8 text-blue-400">Contact Us</h5>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="flex items-center gap-3"><Phone size={18} className="text-blue-500" /> +91 9443289026</li>
                  <li className="flex items-center gap-3"><Mail size={18} className="text-blue-500" /> info@mecogen.org</li>
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-blue-500 mt-1" />
                    <span>Grace Ministries, Abraham Nagar,<br/> Tuticorin 628101, TN</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-bold mb-8 text-blue-400">Get Involved</h5>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li><a href="#involve" className="hover:text-white transition-colors">Join as Volunteer</a></li>
                  <li><a href="#involve" className="hover:text-white transition-colors">Prayer Warriors</a></li>
                  <li><a href="#donate" className="hover:text-white transition-colors">Sponsor a Village VBS</a></li>
                </ul>
              </div>
           </div>
           
           <div className="pt-12 border-t border-gray-800 text-center text-gray-500 font-medium flex flex-col md:flex-row justify-between items-center gap-6">
              <p>© 2026 MECOGEN VBS - Project of Grace Ministries</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
           </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-yellow-400 hover:text-blue-900 transition-colors focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
