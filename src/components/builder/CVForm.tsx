'use client';

import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Languages, 
  Folder, 
  Award,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

export default function CVForm() {
  const { 
    data, 
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification
  } = useCVStore();

  return (
    <div className="space-y-6 pb-20">
      <Accordion multiple defaultValue={['personal']} className="space-y-4">
        {/* Personal Info */}
        <AccordionItem value="personal" className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <User className="text-indigo-600 w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Personal Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            {/* Profile Photo Upload */}
            <div className="space-y-2 pb-2">
              <Label>Profile Photo (Optional)</Label>
              <div className="flex items-center space-x-4">
                {data.personalInfo.profileImage && (
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <img src={data.personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow">
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updatePersonalInfo({ profileImage: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                {data.personalInfo.profileImage && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => updatePersonalInfo({ profileImage: '' })}
                    className="text-red-500 hover:text-red-700 text-xs px-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input 
                  value={data.personalInfo.position}
                  onChange={(e) => updatePersonalInfo({ position: e.target.value })}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input 
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  placeholder="+62 ..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input 
                value={data.personalInfo.address}
                onChange={(e) => updatePersonalInfo({ address: e.target.value })}
                placeholder="Jakarta, Indonesia"
              />
            </div>
            <div className="space-y-2">
              <Label>About Me</Label>
              <Textarea 
                value={data.personalInfo.about}
                onChange={(e) => updatePersonalInfo({ about: e.target.value })}
                placeholder="Brief summary about yourself..."
                rows={4}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience */}
        <AccordionItem value="experience" className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Briefcase className="text-blue-600 w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-4 relative group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input 
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input 
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input 
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input 
                      type="text"
                      placeholder="e.g. 2023-12 or Present"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full border-dashed">
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education" className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-green-600 w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-4 relative group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School / University</Label>
                    <Input 
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input 
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input 
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input 
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addEducation} variant="outline" className="w-full border-dashed">
              <Plus className="w-4 h-4 mr-2" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills" className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Code className="text-purple-600 w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Skills</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Input 
                    className="flex-grow"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="Skill name"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeSkill(skill.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addSkill} variant="outline" className="w-full border-dashed">
              <Plus className="w-4 h-4 mr-2" /> Add Skill
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
