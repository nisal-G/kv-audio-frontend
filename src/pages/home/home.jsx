import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const features = [
    {
      icon: "🎤",
      title: "Premium Equipment",
      description: "High-quality audio gear from industry-leading brands, meticulously maintained for professional results."
    },
    {
      icon: "⚡",
      title: "Quick & Easy Booking",
      description: "Browse, select, and book your equipment in minutes with our streamlined booking process."
    },
    {
      icon: "🛡️",
      title: "Reliable & Trusted",
      description: "Professional service with quality assurance and support throughout your rental period."
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description: "Transparent pricing with no hidden fees. Get professional equipment at affordable rates."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Browse Equipment",
      description: "Explore our extensive collection of audio equipment and event gear."
    },
    {
      number: "02",
      title: "Select & Book",
      description: "Choose your items, pick your dates, and complete your booking online."
    },
    {
      number: "03",
      title: "Ready to Use",
      description: "Receive your equipment and create unforgettable experiences."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-primary text-text">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-accent/95 to-accent/90">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-white/90 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Professional Audio Equipment Rental
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Premium Audio Gear
              <br />
              <span className="text-white/90">For Your Next Event</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              High-quality audio equipment and event gear at your fingertips. Browse, book, and bring your events to life with KV Audio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/items"
                className="group w-full sm:w-auto px-8 py-4 bg-white text-accent font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Browse Equipment
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
              Everything You Need
            </h2>
            <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
              Professional-grade equipment and exceptional service to make your events unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-full bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-text/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary to-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
              Getting started with KV Audio is quick and easy. Just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 relative"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent/80 text-white text-2xl font-bold rounded-2xl shadow-lg shadow-accent/30 mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector - hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-6 lg:-right-8 text-accent/30">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-accent via-accent/95 to-accent/90 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Event?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Browse our collection of premium audio equipment and find everything you need for your next event.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/items"
                className="group w-full sm:w-auto px-8 py-4 bg-white text-accent font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Equipment
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style>{`
        .animate-on-scroll {
          transition-property: opacity, transform;
        }
        .animate-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
