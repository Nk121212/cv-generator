import Link from 'next/link';
import { FileText, Mail, Globe, Link as LinkIcon, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">
              CVForge
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Platform pembuat CV modern untuk anak muda pencari kerja. Buat CV ATS-friendly dalam hitungan menit.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
            <li><Link href="/builder" className="hover:text-white transition-colors">Builder</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Social</h3>
          <div className="flex space-x-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <LinkIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CVForge. All rights reserved. Built with ❤️ for Gen Z.
      </div>
    </footer>
  );
}
