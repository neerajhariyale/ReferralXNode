# ReferralNode Implementation Plan

## 1. Project Structure
We will use a monorepo-style structure for clarity, separating the Backend and Frontend.

```text
ReferralNode/
├── backend/                 # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/referralnode/
│   │   │   │   ├── config/          # Security, Swagger, CORS configs
│   │   │   │   ├── controller/      # REST Controllers (API Layer)
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA Entities (DB Models)
│   │   │   │   ├── repository/      # Spring Data Repositories
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   └── ReferralNodeApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties # DB & API Keys
│   │   │       └── schema.sql       # Init SQL (optional)
│   ├── pom.xml                      # Maven Dependencies
│   └── .gitignore
│
├── frontend/                # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router Pages
│   │   │   ├── page.tsx     # Landing/Job Feed
│   │   │   ├── layout.tsx   # Root Layout
│   │   │   └── globals.css  # Global Styles & Tailwind
│   │   ├── components/
│   │   │   ├── ui/          # Shadcn UI Components
│   │   │   ├── jobs/        # Job specific components
│   │   │   └── shared/      # Shared components (Header, Footer)
│   │   ├── lib/             # Utils (API clients, helpers)
│   │   └── types/           # TS Interfaces
│   ├── public/
│   ├── components.json      # Shadcn Config
│   ├── tailwind.config.ts
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 2. Database Schema (PostgreSQL)

We will use 3 core tables for Phase 1. Relationship management will be handled via Foreign Keys.

### Table: `users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique User ID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User Email |
| `password_hash` | VARCHAR(255) | NOT NULL | BCrypt Encrypted Password |
| `full_name` | VARCHAR(100) | NOT NULL | Display Name |
| `resume_url` | TEXT | | Supabase Storage URL for Resume |
| `preferences` | JSONB | | Job Filters (Remote, Salary, etc.) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | |

### Table: `jobs`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Job ID |
| `title` | VARCHAR(255) | NOT NULL | Job Title |
| `company` | VARCHAR(255) | NOT NULL | Company Name |
| `location` | VARCHAR(100) | | e.g., "Remote", "NY" |
| `description` | TEXT | NOT NULL | Full Job Description (Markdown/HTML) |
| `salary_range` | VARCHAR(100) | | e.g. "$120k - $150k" |
| `posted_at` | TIMESTAMP | NOT NULL | Original posting date |
| `source_url` | TEXT | NOT NULL | Original application link |
| `tags` | TEXT[] | | Array of strings: ["Java", "React"] |

### Table: `applications` (Tracking)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Application entry ID |
| `user_id` | UUID | FK -> users(id) | Applicant |
| `job_id` | UUID | FK -> jobs(id) | Job applied for |
| `status` | VARCHAR(50) | DEFAULT 'SAVED' | APPLIED, INTERVIEWING, REJECTED |
| `match_score` | INT | | AI ATS Score (0-100) |
| `applied_at` | TIMESTAMP | DEFAULT NOW() | |

## 3. Immediate Next Steps
1. Create `backend` and `frontend` folders.
2. Initialize Spring Boot (create `pom.xml`, `Application.java`, proper folder structure).
3. Initialize Next.js (run `npx create-next-app`).
