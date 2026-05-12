import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CVData {
  personalInfo: {
    fullName: string
    position: string
    email: string
    phone: string
    address: string
    website: string
    about: string
    profileImage: string
  }
  experience: {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }[]
  education: {
    id: string
    school: string
    degree: string
    startDate: string
    endDate: string
    description: string
  }[]
  skills: {
    id: string
    name: string
    level: number
  }[]
  languages: {
    id: string
    name: string
    level: string
  }[]
  projects: {
    id: string
    name: string
    description: string
    link: string
  }[]
  certifications: {
    id: string
    name: string
    issuer: string
    date: string
  }[]
  templateId: string
}

interface CVStore {
  data: CVData
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void
  addExperience: () => void
  updateExperience: (id: string, info: Partial<CVData['experience'][0]>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, info: Partial<CVData['education'][0]>) => void
  removeEducation: (id: string) => void
  addSkill: () => void
  updateSkill: (id: string, info: Partial<CVData['skills'][0]>) => void
  removeSkill: (id: string) => void
  addLanguage: () => void
  updateLanguage: (id: string, info: Partial<CVData['languages'][0]>) => void
  removeLanguage: (id: string) => void
  addProject: () => void
  updateProject: (id: string, info: Partial<CVData['projects'][0]>) => void
  removeProject: (id: string) => void
  addCertification: () => void
  updateCertification: (id: string, info: Partial<CVData['certifications'][0]>) => void
  removeCertification: (id: string) => void
  setTemplate: (templateId: string) => void
}

const initialData: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    position: 'Senior Frontend Engineer',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: 'Jakarta, Indonesia',
    website: 'https://johndoe.com',
    about: 'Passionate frontend developer with 5+ years of experience building scalable web applications. Expert in React, Next.js, and modern UI/UX principles.',
    profileImage: '',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Developer',
      startDate: '2021-01',
      endDate: 'Present',
      description: 'Leading the frontend team in developing high-performance web applications using Next.js and Tailwind CSS.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: '2016-09',
      endDate: '2020-06',
      description: 'Graduated with Honors. Focused on Software Engineering and UI Design.',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 90 },
    { id: '2', name: 'TypeScript', level: 85 },
    { id: '3', name: 'Next.js', level: 95 },
  ],
  languages: [
    { id: '1', name: 'English', level: 'Fluent' },
    { id: '2', name: 'Indonesian', level: 'Native' },
  ],
  projects: [
    { id: '1', name: 'CVForge', description: 'A modern CV generator SaaS platform built with Next.js 15.', link: 'https://cvforge.com' },
  ],
  certifications: [
    { id: '1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2022-05' },
  ],
  templateId: 'neo-minimal',
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: initialData,

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
        })),

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              { id: Math.random().toString(36).substr(2, 9), company: '', position: '', startDate: '', endDate: '', description: '' },
            ],
          },
        })),

      updateExperience: (id, info) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) => (exp.id === id ? { ...exp, ...info } : exp)),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              { id: Math.random().toString(36).substr(2, 9), school: '', degree: '', startDate: '', endDate: '', description: '' },
            ],
          },
        })),

      updateEducation: (id, info) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) => (edu.id === id ? { ...edu, ...info } : edu)),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, { id: Math.random().toString(36).substr(2, 9), name: '', level: 50 }],
          },
        })),

      updateSkill: (id, info) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((skill) => (skill.id === id ? { ...skill, ...info } : skill)),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((skill) => skill.id !== id),
          },
        })),

      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [...state.data.languages, { id: Math.random().toString(36).substr(2, 9), name: '', level: 'Beginner' }],
          },
        })),

      updateLanguage: (id, info) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((lang) => (lang.id === id ? { ...lang, ...info } : lang)),
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((lang) => lang.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, { id: Math.random().toString(36).substr(2, 9), name: '', description: '', link: '' }],
          },
        })),

      updateProject: (id, info) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((proj) => (proj.id === id ? { ...proj, ...info } : proj)),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((proj) => proj.id !== id),
          },
        })),

      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [...state.data.certifications, { id: Math.random().toString(36).substr(2, 9), name: '', issuer: '', date: '' }],
          },
        })),

      updateCertification: (id, info) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((cert) => (cert.id === id ? { ...cert, ...info } : cert)),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter((cert) => cert.id !== id),
          },
        })),

      setTemplate: (templateId) =>
        set((state) => ({
          data: { ...state.data, templateId },
        })),
    }),
    {
      name: 'cv-forge-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
