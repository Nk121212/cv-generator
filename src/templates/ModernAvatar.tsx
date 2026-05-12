'use client';

import { CVData } from '@/store/useCVStore';

export default function ModernAvatar({ data }: { data: CVData }) {
  // Get initials for profile picture fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white text-slate-800 min-h-[1122px] w-full shadow-lg font-sans flex flex-col justify-between overflow-hidden relative">
      {/* Exquisite Top Geometric Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-50 to-teal-50/30 rounded-bl-full -z-10" />

      <div>
        {/* Superior Header Row with Profile Photo */}
        <header className="px-12 pt-12 pb-8 border-b border-slate-100 flex items-center space-x-8">
          {/* Avatar Container */}
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 p-1 shadow-md">
              <div className="w-full h-full rounded-[14px] bg-white overflow-hidden flex items-center justify-center">
                {data.personalInfo.profileImage ? (
                  <img 
                    src={data.personalInfo.profileImage} 
                    alt={data.personalInfo.fullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-teal-600 tracking-wider">
                    {getInitials(data.personalInfo.fullName) || 'CV'}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-teal-50 text-teal-700 font-bold px-2.5 py-0.5 rounded-md text-[10px] border border-teal-100 shadow-sm uppercase tracking-widest">
              PRO
            </div>
          </div>

          {/* Title & Core Bio */}
          <div className="flex-grow space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              {data.personalInfo.fullName}
            </h1>
            <h2 className="text-lg font-bold text-teal-600 uppercase tracking-wider">
              {data.personalInfo.position}
            </h2>
            <p className="text-xs text-slate-500 max-w-xl line-clamp-2 italic leading-relaxed">
              &quot;{data.personalInfo.about}&quot;
            </p>
          </div>
        </header>

        {/* Contact Banner Bar */}
        <div className="bg-slate-50 px-12 py-3 flex flex-wrap gap-x-8 gap-y-1 text-xs text-slate-600 font-medium border-b border-slate-100">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
            {data.personalInfo.email}
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
            {data.personalInfo.address}
          </span>
        </div>

        {/* Main Content Splitting */}
        <div className="p-12 grid grid-cols-12 gap-10">
          {/* Left Main Stream: Experience & Education */}
          <div className="col-span-8 space-y-10">
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-xs font-black px-2 py-1 bg-slate-900 text-white rounded">EXP</span>
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-widest">
                  Work Experience
                </h3>
                <div className="flex-grow h-px bg-slate-100" />
              </div>

              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                      <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {exp.company}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-xs font-black px-2 py-1 bg-slate-900 text-white rounded">EDU</span>
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-widest">
                  Education
                </h3>
                <div className="flex-grow h-px bg-slate-100" />
              </div>

              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{edu.school}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap ml-4">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Pillar: Skills & Languages */}
          <div className="col-span-4 space-y-10">
            <section>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                Core Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[11px] font-bold rounded-md hover:border-teal-200 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                Languages
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{lang.name}</span>
                    <span className="text-[10px] font-semibold text-teal-600 bg-teal-50/50 px-2 py-0.5 rounded border border-teal-100/30">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {data.projects && data.projects.length > 0 && (
              <section>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                  Selected Projects
                </h3>
                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-800">{proj.name}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Exquisite Bottom Branding Indicator */}
      <footer className="px-12 py-4 bg-slate-50 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
        Modern Avatar Layout • ATS Verified
      </footer>
    </div>
  );
}
