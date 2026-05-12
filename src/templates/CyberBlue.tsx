'use client';

import { CVData } from '@/store/useCVStore';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function CyberBlue({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-900 min-h-[1122px] w-full shadow-lg flex font-sans">
      {/* Sidebar */}
      <aside className="w-[250px] bg-indigo-900 text-indigo-50 p-8 flex flex-col">
        <div className="mb-10 text-center">
          <div className="w-32 h-32 rounded-full bg-indigo-700 mx-auto mb-4 border-4 border-indigo-800 flex items-center justify-center overflow-hidden">
             {/* Profile image placeholder */}
             <div className="w-full h-full bg-indigo-800" />
          </div>
          <h1 className="text-xl font-bold leading-tight">{data.personalInfo.fullName}</h1>
          <p className="text-indigo-300 text-sm mt-2">{data.personalInfo.position}</p>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-indigo-300 border-b border-indigo-700 pb-2">Contact</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span className="truncate">{data.personalInfo.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span>{data.personalInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>{data.personalInfo.address}</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-indigo-300 border-b border-indigo-700 pb-2">Skills</h3>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-indigo-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-400 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-indigo-300 border-b border-indigo-700 pb-2">Languages</h3>
            <ul className="space-y-2 text-xs">
              {data.languages.map((lang) => (
                <li key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-indigo-400">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-white">
        <section className="mb-10">
          <h3 className="text-lg font-bold text-indigo-900 uppercase tracking-wide mb-4 flex items-center">
            <span className="w-8 h-1 bg-indigo-600 mr-3" />
            About Me
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-indigo-100 pl-4">
            {data.personalInfo.about}
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-indigo-900 uppercase tracking-wide mb-6 flex items-center">
            <span className="w-8 h-1 bg-indigo-600 mr-3" />
            Experience
          </h3>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full before:z-10 after:absolute after:left-[3px] after:top-4 after:bottom-[-2rem] after:w-[2px] after:bg-indigo-100 last:after:hidden">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-slate-800">{exp.position}</h4>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-500 mb-2">{exp.company}</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-indigo-900 uppercase tracking-wide mb-6 flex items-center">
            <span className="w-8 h-1 bg-indigo-600 mr-3" />
            Education
          </h3>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-xs font-bold text-slate-400">
                  {edu.startDate} — {edu.endDate}
                </div>
                <div className="col-span-3">
                  <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                  <p className="text-sm text-slate-500">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
