
# ReferralXNode 🚀

**ReferralXNode** is a modern, full-stack job referral platform designed to connect job seekers with professionals who can refer them to top companies. It streamlines the hiring process by leveraging the power of referrals, providing a unified dashboard for candidates, admins, and referrers.

---

## 🛠️ Technology Stack

### **Frontend**
*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Hooks
*   **Rich Text:** React Quill New

### **Backend**
*   **Framework:** [Spring Boot 3](https://spring.io/projects/spring-boot) (Java 17+)
*   **Database:** PostgreSQL
*   **ORM:** Spring Data JPA / Hibernate
*   **Authentication:** Spring Security (planned)

---

## ✨ Key Features

*   **🌐 Modern Landing Page:** Beautiful, responsive design with "Shimmer" effects and smooth animations.
*   **💼 Job Listings:** Browse and filter jobs by category, role, and company.
*   **🛠️ Admin Dashboard:**
    *   **Manage Jobs:** Create, edit, and delete job postings.
    *   **Rich Text Editor:** Format job descriptions seamlessly.
    *   **Analytics:** View job distribution and application stats (Charts).
    *   **Dark Mode:** Fully supported across the entire admin panel.
    *   **Responsive Sidebar:** Mobile-friendly navigation with overlay support.
*   **📄 Legal Pages:** Privacy Policy and Terms of Service pages included.
*   **🔐 Security:** Secure admin login (UI implemented, backend integration in progress).

---

## 📂 Project Structure

```bash
ReferralXNode/
├── frontend/           # Next.js Application
│   ├── src/app/        # App Router Pages (Admin, Auth, Public)
│   ├── src/components/ # Reusable UI Components
│   └── public/         # Static Assets
├── backend/            # Spring Boot Application
│   ├── src/main/java/  # Java Source Code
│   └── src/main/resources/ # Config (application.properties)
├── docs/               # Project Documentation
│   └── DATABASE_SETUP.md # Database & Deployment Guide
└── README.md           # Project Documentation (You are here)
```

---

## 🚀 Getting Started

### 1. Prerequisites
*   **Node.js** (v18 or higher)
*   **Java JDK** (17 or higher)
*   **PostgreSQL** (Local or Cloud)

### 2. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The application will start at `http://localhost:3000`.

### 3. Backend Setup
Navigate to the backend directory:
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```
The server will start at `http://localhost:8080`.

### 4. Database Setup
For detailed instructions on setting up PostgreSQL and connecting it to the application, please read the **[Database Setup Guide](./docs/DATABASE_SETUP_AND_DEPLOYMENT.md)**.

---

## 📸 Screenshots
*(Add screenshots of your Dashboard, Landing Page, and Job Board here)*

---

## 🤝 Contributing
1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License
This project is licensed under the MIT License.
