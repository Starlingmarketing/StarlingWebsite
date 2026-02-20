import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const reviews = [
  {
    name: 'Daijah Davis',
    rating: 5,
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
    text: "I cannot recommend Starling Photo Studios enough! Their attention to detail, quality of service, and genuine care for their clients are unmatched. Starling Photo Studios exceeded my expectations—everything was done efficiently and with great expertise. The team went above and beyond to ensure my satisfaction, and it's clear they take pride in what they do. If you're looking for a reliable and professional photographer/videographer look no further. I'll definitely be booking their services again soon!",
  },
  {
    name: 'Nick D',
    rating: 5,
    text: "I can't say enough how happy we were to work with the team at Starling Photo Studios. Ben was easy to connect with, always responded to emails quickly and the photos turned out beautifully! We would absolutely recommend Starling Photos for any wedding or party.",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewCard = ({ review }) => (
  <div className="flex-shrink-0 w-[340px] md:w-[400px] bg-white border border-slate-100 p-8 flex flex-col justify-between">
    <p className="text-slate-600 font-light leading-relaxed text-sm mb-6">
      "{review.text}"
    </p>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-900 text-sm font-medium">{review.name}</p>
        <p className="text-slate-400 text-xs mt-0.5">Google Review</p>
      </div>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: review.rating }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
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
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={trackRef} className="flex gap-6 w-max">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
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
