'use client';

import { CVData } from '@/store/useCVStore';

export default function CreativeGradient({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-900 min-h-[1122px] w-full shadow-lg font-sans overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="h-6 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      
      <div className="p-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-indigo-600 tracking-tight">
              {data.personalInfo.fullName.split(' ')[0]}<br />
              <span className="text-indigo-600">{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg font-medium text-slate-400">{data.personalInfo.position}</p>
          </div>
          <div className="text-right space-y-1 text-sm text-slate-500">
            <p className="font-bold text-slate-900">{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.address}</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8 space-y-12">
            <section>
              <h3 className="text-xl font-black mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mr-4">
                  <span className="text-indigo-600 text-sm">01</span>
                </span>
                EXPERIENCE
              </h3>
              <div className="space-y-8 pl-14">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-bold text-slate-800">{exp.position}</h4>
                      <span className="text-xs font-bold text-indigo-500">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 mb-3">{exp.company}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-black mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-sm">02</span>
                </span>
                EDUCATION
              </h3>
              <div className="space-y-6 pl-14">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-lg font-bold text-slate-800">{edu.degree}</h4>
                      <span className="text-xs font-bold text-purple-500">{edu.startDate} — {edu.endDate}</span>
                    </div>
                    <p className="text-sm text-slate-500">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-4 space-y-12">
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-black text-slate-400 tracking-widest mb-6">SUMMARY</h3>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                &quot;{data.personalInfo.about}&quot;
              </p>
            </section>

            <section>
              <h3 className="text-sm font-black text-slate-400 tracking-widest mb-6 uppercase">My Stack</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black text-slate-400 tracking-widest mb-6 uppercase">Projects</h3>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl border-2 border-slate-50 hover:border-indigo-100 transition-colors">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">{proj.name}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2">{proj.description}</p>
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
