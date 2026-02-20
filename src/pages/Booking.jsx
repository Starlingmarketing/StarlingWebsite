import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { cld } from '../utils/cloudinary';

const reviews = [
  {
    name: 'Daijah Davis',
    rating: 5,
    avatar: 'unnamed_3_ws0t7o',
    text: 'Starling Photo Studios shot my wedding this past August. Our photographer was so amazing, he got my wedding from all angles. He also worked with my budget which was much appreciated, because wedding are expensive. I cannot thank him enough for these amazing wedding photos! He also got the photos to me in a very timely manner. I would recommend',
  },
  {
    name: 'Lauren Rowe',
    rating: 5,
    text: 'Ben was an outstanding wedding photographer - professional, kind, and patient, making our experience with him truly enjoyable. We highly recommend Ben to any couple seeking a talented photographer - his work is exceptional!',
  },
  {
    name: 'Gilbert Soto',
    rating: 5,
    avatar: 'unnamed_glcrfb',
    text: 'Absolutely amazing personalized, customer service with a true professional. Constant, open communication and willingness to work with a client at all times. I highly recommend hiring this professional and allowing him to take care of all details. You will not be disappointed.',
  },
  {
    name: 'Kyle Schwab',
    rating: 5,
    text: "I hired Ben for my engagement proposal. Ben captured our special moment beautifully. Even after the proposal we walked around for over an hour where he took candid and staged photos of my fiancé and myself. He provided tons of pictures throughout the day. Ben was easy to work with and was very responsive through the whole process. If you're looking to book a photographer for an event. Look no further as I can ensure you Ben is your guy! Thank you Ben!",
  },
  {
    name: 'Danielle Tate',
    rating: 5,
    avatar: 'unnamed_1_npgrws',
    text: "I cannot recommend Starling Photo Studios enough! Their attention to detail, quality of service, and genuine care for their clients are unmatched. Starling Photo Studios exceeded my expectations—everything was done efficiently and with great expertise. The team went above and beyond to ensure my satisfaction, and it's clear they take pride in what they do. If you're looking for a reliable and professional photographer/videographer look no further. I'll definitely be booking their services again soon!",
  },
  {
    name: 'Nick D',
    rating: 5,
    avatar: 'unnamed_2_bud5q1',
    text: "I can't say enough how happy we were to work with the team at Starling Photo Studios. Ben was easy to connect with, always responded to emails quickly and the photos turned out beautifully! We would absolutely recommend Starling Photos for any wedding or party.",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="#FBBC04"
    />
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const avatarColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#7B1FA2', '#FF6D00'];

const ReviewCard = ({ review, index }) => (
  <div className="flex-shrink-0 w-[340px] md:w-[400px] bg-white rounded-lg border border-slate-200 p-5 flex flex-col justify-between">
    <div>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {review.avatar ? (
            <img
              src={cld.image(review.avatar).toURL()}
              alt={review.name}
              className="w-10 h-10 flex-shrink-0"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
            >
              {review.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-slate-900 text-sm font-medium leading-tight">{review.name}</p>
            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: review.rating }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <GoogleLogo />
        </div>
      </div>
      <p className="text-slate-700 text-[13px] leading-relaxed mt-3">
        {review.text}
      </p>
    </div>
  </div>
);

const ReviewSlider = () => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    const speed = 0.4;

    const step = () => {
      if (!isPaused) {
        posRef.current -= speed;
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  const doubled = [...reviews, ...reviews];

  return (
    <section className="mt-24 -mx-6 md:-mx-12">
      <h2 className="text-center text-xs uppercase tracking-[0.2em] text-slate-400 mb-10">
        What Our Clients Say
      </h2>
      <div
        className="overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={trackRef} className="flex gap-6 w-max px-4">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const formatField = (value) => {
    const trimmed = String(value ?? '').trim();
    return trimmed.length ? trimmed : '—';
  };

  const buildInquiryBody = (data) =>
    [
      `Name: ${formatField(data.name)}`,
      `Email: ${formatField(data.email)}`,
      `Phone: ${formatField(data.phone)}`,
      `Event date: ${formatField(data.date)}`,
      `Location: ${formatField(data.location)}`,
      '',
      'Message:',
      formatField(data.message),
    ].join('\n');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const inquiryBody = buildInquiryBody(formData);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: new Date().toLocaleString(),
          location: formData.location,
          message: inquiryBody,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', date: '', location: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div className="animate-fade-in opacity-0 min-h-screen px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Info Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-8">
            Inquire
          </h1>
          <p className="text-slate-500 font-light leading-relaxed mb-12 max-w-md">
            We know how exciting it is to start planning your shoot, so we make it a priority to get back to you as quickly as possible. From our very first chat to the moment you receive your final gallery, we are completely dedicated to giving you an exceptional experience and capturing photos you'll treasure forever. Let's create something beautiful together!
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-2">Email</h3>
              <p className="text-slate-900 font-light">starlingphotostudios@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-slate-50/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-500">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-slate-500">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="date" className="text-xs uppercase tracking-widest text-slate-500">
                  Event Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-xs uppercase tracking-widest text-slate-500">
                  Location / Venue
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                  placeholder="Lake Como, Italy"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-slate-500">
                Tell us about your event
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-colors resize-none"
                placeholder="Share your vision, aesthetic, and what drew you to our work..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              className={`relative mt-8 px-12 py-4 text-xs uppercase tracking-[0.2em] w-full md:w-auto inline-flex items-center justify-center overflow-hidden ${
                status === 'sending'
                  ? 'bg-slate-200 text-transparent cursor-wait'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <span className={status === 'sending' ? 'invisible' : 'visible'}>Send Inquiry</span>
            </button>

            {status === 'success' && (
              <p className="text-green-700 text-sm font-light mt-4">
                Thank you for your inquiry — we'll be in touch shortly!
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm font-light mt-4">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>

      <ReviewSlider />
    </div>
  );
};

export default Booking;
