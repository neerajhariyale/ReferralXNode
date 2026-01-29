
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logo: string;
  description: string;
  postedAt: string;
  tags: string[];
  category?: 'Engineering' | 'Marketing' | 'Sales' | 'Operations' | 'Human Resources' | 'Design' | 'Other';
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  connectionDegree: '1st' | '2nd' | '3rd';
}

export interface AnalysisResult {
  matchScore: number;
  missingKeywords: string[];
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow AI',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140k - $180k',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TF',
    description: 'We are looking for a Senior Frontend Engineer to lead our UI/UX transformation...',
    postedAt: '2 days ago',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    category: 'Engineering',
  },
  {
    id: '6',
    title: 'Human Resources Manager',
    company: 'PeopleFirst Inc.',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$90k - $120k',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=PF',
    description: 'Looking for an HR Manager to oversee recruitment and employee relations...',
    postedAt: '5 hours ago',
    tags: ['HR', 'Recruiting', 'Management'],
    category: 'Human Resources',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120k - $150k',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CS',
    description: 'Join our award-winning design team and shape the future of digital products...',
    postedAt: '1 day ago',
    tags: ['Figma', 'UI/UX', 'Design Systems'],
    category: 'Design',
  },
  {
    id: '7',
    title: 'Sales Representative',
    company: 'Global Sales Co.',
    location: 'Remote',
    type: 'Commission',
    salary: '$50k + Commission',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GS',
    description: 'Driven sales representative needed to expand our market reach...',
    postedAt: '1 day ago',
    tags: ['Sales', 'Communication', 'B2B'],
    category: 'Sales',
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'DataCorp',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$80/hr',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DC',
    description: 'Seeking an experienced Backend Developer with Strong Java and Spring Boot skills...',
    postedAt: '4 hours ago',
    tags: ['Java', 'Spring Boot', 'AWS'],
    category: 'Engineering',
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'GrowthHackerz',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90k - $110k',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GH',
    description: 'Lead our marketing initiatives and drive growth for our SaaS platform...',
    postedAt: '3 days ago',
    tags: ['Marketing', 'SEO', 'Content Strategy'],
    category: 'Marketing',
  },
  {
    id: '8',
    title: 'Operations Coordinator',
    company: 'Logistics Pro',
    location: 'Miami, FL',
    type: 'Full-time',
    salary: '$60k - $75k',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=LP',
    description: 'Coordinate daily operations and ensure smooth supply chain management...',
    postedAt: '2 days ago',
    tags: ['Operations', 'Logistics', 'Supply Chain'],
    category: 'Operations',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$150k - $190k',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=ClS',
    description: 'We need a DevOps expert to manage our cloud infrastructure and CI/CD pipelines...',
    postedAt: '1 week ago',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
    category: 'Engineering',
  },
];

export const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Engineering Manager',
    company: 'TechFlow AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    connectionDegree: '1st',
  },
  {
    id: '2',
    name: 'Michael Ross',
    role: 'Senior Developer',
    company: 'TechFlow AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    connectionDegree: '2nd',
  },
  {
    id: '3',
    name: 'Jessica Lee',
    role: 'Talent Acquisition',
    company: 'TechFlow AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    connectionDegree: '2nd',
  },
];
