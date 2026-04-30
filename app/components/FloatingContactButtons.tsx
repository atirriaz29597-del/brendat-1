"use client";

import { MessageCircle, Phone } from "lucide-react";

const PHONE_NUMBER = "+13032468693";
const WHATSAPP_NUMBER = "13032468693";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi Brendat, I need help with my business formation.");

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {/* <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call Brendat now"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-black text-white shadow-xl shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a> */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Brendat on WhatsApp"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#25D366]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1fb45a]"
      >
        <MessageCircle className="h-4 w-4" />
        Live Chat
      </a>
    </div>
  );
}