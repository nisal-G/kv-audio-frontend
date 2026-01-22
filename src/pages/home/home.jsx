import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const observerRef = useRef(null);

  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

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

  // Form submission handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Validation
    if (rating === 0) {
      showNotification("error", "Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      showNotification("error", "Comment must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        showNotification("error", "Please log in to submit a review");
        setIsSubmitting(false);
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        { rating, comment },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      showNotification("success", "Thank you! Your review has been submitted for approval.");

      // Reset form
      setRating(0);
      setComment("");

    } catch (error) {
      if (error.response?.status === 401) {
        showNotification("error", "Please log in to submit a review");
      } else if (error.response?.data?.error === "Review addition failed") {
        showNotification("error", "You have already submitted a review");
      } else {
        showNotification("error", "Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

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

      {/* Add Review Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
              Share Your Experience
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
              Add Your Review
            </h2>
            <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
              Help others by sharing your experience with our equipment and service.
            </p>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-text/10 shadow-2xl">
              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-lg font-semibold text-text mb-4">
                    Rating <span className="text-accent">*</span>
                  </label>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all duration-200 hover:scale-110 focus:outline-none focus:scale-110"
                      >
                        <svg
                          className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-text/20 fill-none'
                            }`}
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-text/60 mt-2 text-center sm:text-left">
                      You rated: {rating} star{rating !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="comment" className="block text-lg font-semibold text-text mb-3">
                    Your Review <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with our equipment and service... (minimum 10 characters)"
                    rows="5"
                    className="w-full px-4 py-3 bg-primary/50 border-2 border-text/10 rounded-xl text-text placeholder-text/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
                  />
                  <p className="text-sm text-text/60 mt-2">
                    {comment.length} characters {comment.length >= 10 && '✓'}
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-accent/30 transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-xl hover:shadow-accent/40 hover:scale-105'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Review
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
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

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 animate-visible">
          <div className={`max-w-sm px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border-2 flex items-start gap-3 ${notification.type === 'success'
              ? 'bg-green-500/90 border-green-400 text-white'
              : 'bg-red-500/90 border-red-400 text-white'
            }`}>
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification({ show: false, type: "", message: "" })}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

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
