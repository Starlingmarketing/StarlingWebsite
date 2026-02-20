import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../utils/cloudinary';

const About = () => {
  const aboutImage = cld.image('AF1I5294_gu67ej');

  return (
    <div className="animate-fade-in opacity-0 min-h-screen px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Image Section */}
        <div className="order-2 lg:order-1">
          <div className="aspect-[4/5] bg-slate-100 w-full relative overflow-hidden">
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
          <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">About Starling</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-10 leading-[1.1]">
            <span className="italic font-serif text-slate-500">Our</span> story.
          </h1>
          
          <div className="space-y-6 text-slate-600 font-light leading-relaxed">
            <p>
              Founded on the belief that the most profound moments are often the quietest. Starling Photography
              is a boutique studio dedicated to capturing the elegance of human connection.
            </p>
            <p>
              Our approach is rooted in a documentary style infused with an editorial eye. We look for the in-between moments,
              the subtle glances, and the raw emotions that define a narrative. Every frame is carefully considered,
              yet effortlessly natural.
            </p>
            <p>
              Based in London, we accept a limited number of commissions worldwide each year to ensure each client
              receives an unparalleled, bespoke experience.
            </p>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-100">
            <h3 className="text-lg font-light text-slate-900 mb-4">Features & Press</h3>
            <ul className="flex flex-wrap gap-8 text-xs uppercase tracking-widest text-slate-400">
              <li>Vogue Weddings</li>
              <li>The Anti-Bride</li>
              <li>Harper's Bazaar</li>
              <li>Together Journal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
