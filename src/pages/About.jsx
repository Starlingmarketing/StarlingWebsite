import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../utils/cloudinary';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const About = () => {
  const aboutImage = cld.image('AF1I5294_gu67ej');

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ phone: '' });
  const [quoteStatus, setQuoteStatus] = useState('idle');

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteStatus('sending');
    
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: 'Quick Quote Request',
          email: 'quote@request.com',
          phone: quoteForm.phone,
          date: '',
          time: new Date().toLocaleString(),
          location: '',
          message: `Quick quote request.\nPhone: ${quoteForm.phone}`,
          reply_to: 'quote@request.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setQuoteStatus('success');
        setTimeout(() => {
          setShowQuoteModal(false);
          setQuoteStatus('idle');
          setQuoteForm({ phone: '' });
        }, 3000);
      })
      .catch(() => {
        setQuoteStatus('error');
      });
  };

  return (
    <div className="animate-fade-in opacity-0 min-h-[80vh] px-6 md:px-12 max-w-7xl mx-auto py-8 md:py-16 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="aspect-[4/5] bg-slate-100 w-[90%] md:w-[80%] lg:w-[85%] relative overflow-hidden">
            <AdvancedImage
              cldImg={aboutImage}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-slate-50 -z-10 hidden md:block"></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="order-1 lg:order-2">
          <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">About Starling</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-6 leading-[1.1]">
            <span className="italic font-serif text-slate-500">Our</span> Approach.
          </h1>
          
          <div className="space-y-4 text-slate-600 font-light leading-relaxed">
            <p>
              There is a time and place for everything in art. Sometimes, the story calls for a clean, classic,
              and timeless capture. Other times, it demands that we completely break the mold to build a bold,
              entirely unique aesthetic.
            </p>
            <p>
              At Starling, versatility is our greatest strength. With over a decade of experience across photography,
              videography, advertising, and marketing, we understand exactly how to adapt our medium to fit your
              specific needs. We aren't bound by a single, rigid style or a specific location. Based in Philadelphia
              but available worldwide, we go wherever the story takes us.
            </p>
            <p>
              Our approach is highly collaborative. We obsess over our work so you don't have to, bringing relentless
              dedication and an elevated artistic eye to every wedding, portrait, and commercial project we take on.
              No matter the subject, our mission is simple: to help you capture your vision and share our love for
              art with you.
            </p>
          </div>

          <div className="flex justify-start mt-10">
            <button
              onClick={() => setShowQuoteModal(true)}
              className="group inline-flex items-center justify-center gap-1.5 w-[112px] h-[24px] bg-[#242424] text-white rounded-[17px] text-[12px] font-normal hover:bg-black transition-colors duration-300"
            >
              <span>Reach Out</span>
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ animation: 'lightboxIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div
            className="absolute inset-0 bg-white/70 backdrop-blur-3xl"
            onClick={() => setShowQuoteModal(false)}
          />

          <button
            onClick={() => setShowQuoteModal(false)}
            className="absolute top-8 right-8 z-20 p-2 text-slate-400 hover:text-slate-800 transition-colors duration-300"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div
            className="relative z-10 w-full animate-fade-in"
            style={{
              maxWidth: 608,
              borderRadius: 22,
              backgroundColor: '#242424',
              border: '1px solid #000000',
              padding: '36px 44px',
            }}
          >
            <form onSubmit={handleQuoteSubmit}>
              <style>
                {`
                  .sending-state label,
                  .sending-state h3,
                  .sending-state p {
                    opacity: 0 !important;
                    transition: opacity 0.3s ease;
                  }
                  .sending-state input {
                    color: transparent !important;
                    -webkit-text-fill-color: transparent !important;
                    transition: color 0.3s ease, -webkit-text-fill-color 0.3s ease;
                  }
                  .sending-state input:-webkit-autofill,
                  .sending-state input:-webkit-autofill:hover, 
                  .sending-state input:-webkit-autofill:focus, 
                  .sending-state input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px #242424 inset !important;
                    -webkit-text-fill-color: transparent !important;
                    transition: background-color 5000s ease-in-out 0s, -webkit-text-fill-color 0.3s ease !important;
                  }
                  .sending-state input::placeholder {
                    color: transparent !important;
                  }
                `}
              </style>
              <div
                className={quoteStatus === 'sending' ? 'sending-state' : ''}
                style={{
                  pointerEvents: quoteStatus === 'sending' ? 'none' : 'auto',
                }}
              >
              <div className="mb-8 text-center">
                <h3 className="text-white text-xl font-serif tracking-wide mb-2">Request a Quote</h3>
                <p className="text-slate-400 text-sm font-light">Enter your details and we'll reach out to you shortly.</p>
              </div>

              <div className="grid grid-cols-1 gap-y-7">
                <div>
                  <label htmlFor="quote-phone" className="block text-xs uppercase tracking-widest mb-4" style={{ color: '#FFFFFF' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="quote-phone"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ phone: e.target.value })}
                    required
                    className="w-full bg-transparent py-2 text-sm text-white font-light focus:outline-none"
                    style={{ border: 'none', borderBottom: '1px solid #B7B7B7' }}
                  />
                </div>
              </div>

              </div>

              <div className="flex justify-center mt-9">
                <button
                  type="submit"
                  disabled={quoteStatus === 'sending'}
                  className="flex items-center justify-center cursor-pointer transition-opacity duration-300"
                  style={{
                    width: 143,
                    height: 24,
                    backgroundColor: '#F7F7F7',
                    borderRadius: 6,
                    color: '#000000',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: 14,
                    border: 'none',
                    opacity: quoteStatus === 'sending' ? 0.8 : 1,
                  }}
                >
                  {quoteStatus === 'sending' ? '' : 'Get a Quote'}
                </button>
              </div>

              {quoteStatus === 'success' && (
                <p className="text-green-400 text-sm font-light mt-6 text-center">
                  Thank you! We'll be in touch shortly.
                </p>
              )}
              {quoteStatus === 'error' && (
                <p className="text-red-400 text-sm font-light mt-6 text-center">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
