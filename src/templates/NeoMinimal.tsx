'use client';

import { CVData } from '@/store/useCVStore';

export default function NeoMinimal({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-slate-900 p-8 min-h-[1122px] w-full shadow-lg font-serif">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
        <h2 className="text-xl text-slate-600 mb-4 font-sans">{data.personalInfo.position}</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-sans">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.address}</span>
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>

      {/* About */}
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b border-slate-200 pb-1 mb-3">About</h3>
        <p className="text-sm leading-relaxed text-slate-700">{data.personalInfo.about}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b border-slate-200 pb-1 mb-4">Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-base">{exp.position} at {exp.company}</h4>
                <span className="text-sm text-slate-500 font-sans">{exp.startDate} — {exp.endDate}</span>
              </div>
              <p className="text-sm text-slate-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b border-slate-200 pb-1 mb-4">Education</h3>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <h4 className="font-bold text-base">{edu.degree}</h4>
                <p className="text-sm text-slate-700">{edu.school}</p>
              </div>
              <span className="text-sm text-slate-500 font-sans">{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-lg font-bold uppercase border-b border-slate-200 pb-1 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span key={skill.id} className="text-sm border border-slate-200 px-2 py-1 rounded bg-slate-50">
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Watermark for Free Template */}
      <div className="mt-20 text-center opacity-30 pointer-events-none">
        <p className="text-[10px] font-sans">Created with CVForge — Get more templates at cvforge.app</p>
      </div>
    </div>
  );
}
