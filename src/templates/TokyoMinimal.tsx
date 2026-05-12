'use client';

import { CVData } from '@/store/useCVStore';

export default function TokyoMinimal({ data }: { data: CVData }) {
  return (
    <div className="bg-[#fdfdfd] text-[#1a1a1a] p-16 min-h-[1122px] w-full shadow-lg font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-4">{data.personalInfo.fullName}</h1>
          <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-slate-400">
            <span>{data.personalInfo.position}</span>
            <span>/</span>
            <span>{data.personalInfo.address}</span>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-16">
          <aside className="col-span-1">
            <section className="mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-slate-300">Contact</h3>
              <div className="space-y-4 text-xs leading-loose">
                <div>
                  <p className="text-slate-400 uppercase tracking-tighter text-[9px] mb-1">Email</p>
                  <p>{data.personalInfo.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase tracking-tighter text-[9px] mb-1">Phone</p>
                  <p>{data.personalInfo.phone}</p>
                </div>
                {data.personalInfo.website && (
                  <div>
                    <p className="text-slate-400 uppercase tracking-tighter text-[9px] mb-1">Site</p>
                    <p>{data.personalInfo.website}</p>
                  </div>
                )}
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-slate-300">Expertise</h3>
              <ul className="space-y-3 text-xs">
                {data.skills.map((skill) => (
                  <li key={skill.id} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-black" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-slate-300">Certifications</h3>
              <div className="space-y-4 text-xs">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-bold">{cert.name}</p>
                    <p className="text-slate-400">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <main className="col-span-2">
            <section className="mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-slate-300">Profile</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                {data.personalInfo.about}
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-300">Experience</h3>
              <div className="space-y-10">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider">{exp.position}</h4>
                      <span className="text-[9px] text-slate-400">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">{exp.company}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-300">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider">{edu.degree}</h4>
                      <span className="text-[9px] text-slate-400">{edu.startDate} — {edu.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
