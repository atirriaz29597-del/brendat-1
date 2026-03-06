import Link from "next/link";
import { Briefcase, Globe, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="rounded-lg bg-accent p-1.5">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Brendat
              </span>
            </Link>
            <p className="max-w-sm mb-8 leading-relaxed text-sm">
              Georgia-based business formation and management platform empowering entrepreneurs across all 50 states to start, run, and grow with confidence.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <p><span className="text-gray-500">Phone:</span> <a href="tel:+13032468693" className="hover:text-accent-light transition-colors">+1 303 246-8693</a></p>
              <p><span className="text-gray-500">Email:</span> <a href="mailto:contact@brendat.com" className="hover:text-accent-light transition-colors">contact@brendat.com</a></p>
              <p><span className="text-gray-500">Hours:</span> Mon–Sat: 8AM–8PM CT</p>
            </div>
            <div className="flex gap-3">
              {[Globe, Phone, MessageCircle].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-accent hover:border-accent text-gray-400 hover:text-white transition-all cursor-pointer">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Formation */}
          <div>
            <h5 className="text-white font-bold mb-5">Formation</h5>
            <ul className="space-y-3 text-sm">
              {["LLC", "S Corporation", "C Corporation", "Nonprofit", "DBA Name"].map(s => (
                <li key={s}><Link href="#" className="hover:text-accent-light transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-bold mb-5">Services</h5>
            <ul className="space-y-3 text-sm">
              {["Registered Agent", "EIN / Tax ID", "Annual Reports", "Trademark", "Virtual Address"].map(s => (
                <li key={s}><Link href="#" className="hover:text-accent-light transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-white font-bold mb-5">Resources</h5>
            <ul className="space-y-3 text-sm">
              {["Formation Guide", "Blog", "Help Center", "Contact Us", "Privacy Policy"].map(s => (
                <li key={s}><Link href="#" className="hover:text-accent-light transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs max-w-2xl leading-relaxed text-center md:text-left">
            <strong className="text-gray-300">Disclaimer:</strong> Brendat is a document filing service and is NOT a law firm. We do not provide legal, financial, or tax advice. Information provided is for general purposes only. Georgia, USA.
          </p>
          <p className="text-xs whitespace-nowrap text-gray-500">
            © {new Date().getFullYear()} Brendat Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
