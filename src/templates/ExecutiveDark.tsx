'use client';

import { CVData } from '@/store/useCVStore';

export default function ExecutiveDark({ data }: { data: CVData }) {
  return (
    <div className="bg-[#0f172a] text-[#f1f5f9] min-h-[1122px] w-full shadow-lg font-sans">
      {/* Golden Accent Line */}
      <div className="h-2 w-full bg-[#d4af37]" />

      <div className="p-16">
        {/* Header */}
        <header className="mb-16 text-center border-b border-slate-800 pb-12">
          <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-[#d4af37] uppercase">{data.personalInfo.fullName}</h1>
          <h2 className="text-xl text-slate-400 font-medium tracking-[0.2em] mb-8">{data.personalInfo.position}</h2>
          <div className="flex justify-center space-x-8 text-sm text-slate-500 uppercase tracking-widest">
            <span>{data.personalInfo.email}</span>
            <span className="text-[#d4af37]">•</span>
            <span>{data.personalInfo.phone}</span>
            <span className="text-[#d4af37]">•</span>
            <span>{data.personalInfo.address}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          <section>
            <h3 className="text-sm font-bold text-[#d4af37] tracking-[0.4em] uppercase mb-6 text-center">Professional Profile</h3>
            <p className="text-base text-slate-400 leading-relaxed text-center max-w-2xl mx-auto italic">
              &quot;{data.personalInfo.about}&quot;
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#d4af37] tracking-[0.4em] uppercase mb-8 border-b border-slate-800 pb-2">Experience</h3>
            <div className="space-y-12">
              {data.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-4 gap-8">
                  <div className="col-span-1 text-right">
                    <p className="text-sm font-bold text-slate-500">{exp.startDate}</p>
                    <p className="text-xs text-slate-600 uppercase mt-1">{exp.endDate}</p>
                  </div>
                  <div className="col-span-3">
                    <h4 className="text-lg font-bold text-[#f1f5f9] mb-1">{exp.position}</h4>
                    <p className="text-sm text-[#d4af37] font-semibold mb-4 uppercase tracking-wider">{exp.company}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-16">
            <section>
              <h3 className="text-sm font-bold text-[#d4af37] tracking-[0.4em] uppercase mb-8 border-b border-slate-800 pb-2">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="text-base font-bold text-[#f1f5f9] mb-1">{edu.degree}</h4>
                    <p className="text-sm text-slate-400">{edu.school}</p>
                    <p className="text-xs text-slate-600 mt-1 uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-[#d4af37] tracking-[0.4em] uppercase mb-8 border-b border-slate-800 pb-2">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{skill.name}</span>
                    <div className="h-[2px] w-full bg-slate-800">
                      <div 
                        className="h-full bg-[#d4af37]" 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
