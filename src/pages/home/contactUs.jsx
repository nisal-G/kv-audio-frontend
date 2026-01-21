import { FaLocationDot, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to send a message");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(
        `${backendUrl}/api/inquiries/add`,
        { message: message.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Message sent successfully! We'll get back to you soon.");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] pt-24 pb-12 bg-primary text-text">
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-b from-secondary/90 to-primary shadow-[0_20px_60px_-30px_rgba(17,45,78,0.35)] border border-text/5 overflow-hidden">
          <div className="px-5 sm:px-8 py-10 sm:py-12">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-text/70 bg-white/60 border border-text/10 rounded-full px-3 py-1">
              We're here to help
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
              Contact KV Audio
            </h1>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-text/70 max-w-prose">
              Have a question about products, bookings, or availability? Send us a message and we'll get back to you soon.
            </p>
          </div>
        </section>

        {/* Content grid */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: contact cards */}
          <div className="lg:col-span-2 grid gap-4">
            <div className="rounded-3xl bg-white/70 border border-text/10 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <FaPhone />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-lg">Phone</h2>
                  <p className="mt-1 text-sm text-text/70">
                    Tap to call us (mobile-friendly).
                  </p>
                  <a
                    href="tel:+94000000000"
                    className="mt-3 inline-flex text-base font-semibold text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                  >
                    +94 00 000 0000
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/70 border border-text/10 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <FaEnvelope />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-lg">Email</h2>
                  <p className="mt-1 text-sm text-text/70">
                    Best for invoices, quotes, and details.
                  </p>
                  <a
                    href="mailto:info@kvaudio.lk"
                    className="mt-3 inline-flex text-base font-semibold text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent break-all"
                  >
                    info@kvaudio.lk
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/70 border border-text/10 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <FaLocationDot />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-lg">Location</h2>
                  <p className="mt-1 text-sm text-text/70">
                    Visit us for demos and pickups.
                  </p>
                  <p className="mt-3 text-base font-semibold text-text">
                    KV Audio, Your City, Sri Lanka
                  </p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/70 border border-text/10 shadow-sm p-5">
              <h2 className="font-bold text-lg">Hours</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="text-text/70">Mon – Sat</div>
                <div className="font-semibold text-text text-right">
                  9:00 AM – 6:00 PM
                </div>
                <div className="text-text/70">Sunday</div>
                <div className="font-semibold text-text text-right">
                  10:00 AM – 2:00 PM
                </div>
              </div>
              <p className="mt-3 text-xs text-text/60">
                Hours can vary on holidays. Call before visiting.
              </p>
            </div>
          </div>

          {/* Right: Message Form + FAQ */}
          <div className="lg:col-span-3 grid gap-6">
            {/* Message Form */}
            <div className="rounded-3xl bg-white/70 border border-text/10 shadow-sm p-5 sm:p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <FaPaperPlane />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-lg">Send us a message</h2>
                  <p className="mt-1 text-sm text-text/70">
                    We'll respond to your inquiry as soon as possible.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border border-text/20 rounded-2xl outline-none bg-white/60 text-text placeholder-text/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
                    placeholder="Type your message here... Include details like preferred date/time, items you're interested in, event location, etc."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-bold py-3 px-4 rounded-2xl transform transition hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className={isSubmitting ? "animate-pulse" : ""} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-text/60 text-center">
                  Your email and phone number will be automatically included from your account.
                </p>
              </form>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl bg-white/70 border border-text/10 shadow-sm p-5 sm:p-6">
              <h2 className="font-bold text-lg">Quick answers</h2>
              <div className="mt-4 space-y-3">
                <details className="group rounded-2xl border border-text/10 bg-white/60 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-text flex items-center justify-between gap-4">
                    How do I book items?
                    <span className="text-text/60 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-text/70 leading-relaxed">
                    Browse items, add to booking, and confirm your details. If you
                    need help choosing a setup, contact us and we'll recommend a
                    package.
                  </p>
                </details>

                <details className="group rounded-2xl border border-text/10 bg-white/60 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-text flex items-center justify-between gap-4">
                    Do you offer delivery and setup?
                    <span className="text-text/60 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-text/70 leading-relaxed">
                    Yes, depending on location and availability. Share your event
                    location and time when you contact us.
                  </p>
                </details>

                <details className="group rounded-2xl border border-text/10 bg-white/60 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-text flex items-center justify-between gap-4">
                    What should I include in a message?
                    <span className="text-text/60 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-text/70 leading-relaxed">
                    Date, venue/city, expected audience size, and any items you're
                    considering (speakers, mixers, lights, etc.).
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
