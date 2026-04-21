export interface SkillGroup {
  category: string
  items: string[]
}

export interface ExperienceItem {
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
}

export interface ProjectItem {
  title: string
  subtitle?: string
  tags: string[]
  description: string
  highlights: string[]
}

export interface EducationItem {
  school: string
  location?: string
  degree: string
  period: string
  notes: string[]
}

export interface StatItem {
  value: number
  suffix?: string
  label: string
}

export const profile = {
  name: 'Shams Nahid K',
  firstName: 'Shams',
  lastName: 'Nahid',
  role: 'Software Developer',
  tagline:
    'I build resilient backend services, distributed systems, and full-stack products — with a deep affinity for clean architecture and meaningful detail.',
  summary:
    'Software developer with 2+ years of experience designing scalable backend systems, distributed services, and full-stack applications. Comfortable across the stack — from gRPC services and REST APIs to data pipelines and product features used by hundreds of users. I care about systems that are well-tested, well-named, and well-loved.',
  location: 'Chicago, USA',
  email: 'nahidshams65@gmail.com',
  phone: '(872) 346-0872',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',
  resume: '/resume.pdf',
  yearsExperience: '2+',
}

export const stats: StatItem[] = [
  { value: 2, suffix: '+', label: 'Years building software' },
  { value: 500, suffix: '+', label: 'Users served by shipped modules' },
  { value: 4, label: 'Production projects shipped' },
  { value: 15, suffix: '+', label: 'Languages, tools & frameworks' },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Backend & Systems',
    items: ['REST APIs', 'FastAPI', 'gRPC', 'Distributed Systems', 'Multithreading', 'ETL Pipelines'],
  },
  {
    category: 'Frontend & Full-Stack',
    items: ['React', 'JavaScript', 'HTML / CSS', 'Component Architecture', 'Responsive UI'],
  },
  {
    category: 'Data & ML',
    items: ['NumPy', 'Pandas', 'OpenCV', 'TensorFlow', 'PyTorch', 'Matplotlib', 'Seaborn'],
  },
  {
    category: 'Platform & DevOps',
    items: ['Docker', 'Git', 'CI/CD Workflows', 'Agile / Scrum', 'JIRA', 'Confluence'],
  },
  {
    category: 'Practices',
    items: ['Clean Architecture', 'Code Review', 'Unit Testing', 'Refactoring', 'SDLC', 'API Design'],
  },
]

export const marqueeSkills = [
  'Python',
  'TypeScript',
  'React',
  'gRPC',
  'FastAPI',
  'Docker',
  'PostgreSQL',
  'Distributed Systems',
  'REST APIs',
  'Java',
  'Git',
  'Agile',
  'Clean Architecture',
  'OpenCV',
  'PyTorch',
  'TensorFlow',
]

export const experience: ExperienceItem[] = [
  {
    company: 'DePaul University',
    role: 'Software Developer (D2L)',
    location: 'Chicago, USA',
    period: 'Nov 2023 – Mar 2025',
    bullets: [
      'Designed and shipped scalable backend-driven learning modules used by 500+ users, focused on modular design and long-term maintainability.',
      'Refactored legacy systems for better performance and readability, raising code quality and reducing onboarding time for future contributors.',
      'Practiced disciplined unit testing, bug triage, and iterative improvement inside Agile sprint cycles.',
      'Worked cross-functionally between research, engineering, and deployment teams to ship features end-to-end.',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'ServiceNow Developer',
    location: 'India',
    period: 'Aug 2021 – Dec 2022',
    bullets: [
      'Automated enterprise workflows using scripted logic, rule engines, and API integrations across multiple Fortune-500 clients.',
      'Engineered backend logic for data-driven decision flows, reinforcing strong system-level thinking and integration design.',
      'Delivered production-grade solutions with measurable efficiency improvements — fewer manual steps, fewer errors, faster turnarounds.',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Distributed File Retrieval Engine',
    subtitle: 'gRPC · Multithreaded · Backend Architecture',
    tags: ['gRPC', 'Distributed Systems', 'Multithreading', 'Backend'],
    description:
      'A high-performance client–server retrieval system designed for scale. Built around gRPC with efficient indexing and multithreaded execution to search across large datasets without sacrificing latency.',
    highlights: [
      'High-throughput client–server architecture over gRPC',
      'Custom indexing layer with multithreaded query execution',
      'Designed for horizontal extensibility and clean service boundaries',
    ],
  },
  {
    title: 'Learning Modules Platform',
    subtitle: 'Backend Engineering · DePaul University',
    tags: ['Backend', 'APIs', 'Refactoring', 'Agile'],
    description:
      'Production backend modules powering parts of DePaul\'s D2L platform — modular, maintainable, and used daily by hundreds of students and faculty.',
    highlights: [
      'Modular backend services serving 500+ active users',
      'Legacy refactor that improved performance and readability',
      'Disciplined unit testing and iterative delivery',
    ],
  },
  {
    title: 'Puzzle Solver',
    subtitle: 'Self-Supervised Deep Learning · Research Project',
    tags: ['PyTorch', 'CNN', 'Self-Supervised', 'Places365'],
    description:
      'A self-supervised CNN encoder–decoder architecture trained to reconstruct shuffled image patches — a research project demonstrating spatial reasoning and end-to-end ML system design.',
    highlights: [
      'Encoder–decoder architecture with custom patch-shuffling logic',
      'Trained on Places365 with strong SSIM and PSNR metrics',
      'Custom loss functions and full evaluation pipeline',
    ],
  },
  {
    title: 'Face Swapping & Morphing System',
    subtitle: 'Computer Vision · Built From Scratch',
    tags: ['Python', 'OpenCV', 'Image Processing', 'Algorithms'],
    description:
      'A Python-based image system implemented with custom algorithms — no external CV libraries — performing facial alignment, blending, and morphing with pixel-level precision.',
    highlights: [
      'Facial alignment implemented from first principles',
      'Pixel-level blending and morphing without external dependencies',
      'Strong foundation in algorithms and numerical computation',
    ],
  },
]

export const education: EducationItem[] = [
  {
    school: 'DePaul University',
    location: 'Chicago, USA',
    degree: 'Master of Science in Computer Science',
    period: 'Jan 2023 – Jun 2025',
    notes: [
      'Coursework: Distributed Systems, Full-Stack Applications, Machine Learning, Computer Vision, Data Science',
    ],
  },
  {
    school: 'Mohan Babu University',
    degree: 'B.Tech – Electrical & Electronics Engineering',
    period: 'Jun 2017 – Jun 2021',
    notes: [
      'Final Project: Fuzzy Logic-Based Fault Detection for Induction Motors',
      'Strong foundation in signals, systems, and applied computation',
    ],
  },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export const sectionIds = ['top', 'about', 'skills', 'experience', 'projects', 'education', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]
