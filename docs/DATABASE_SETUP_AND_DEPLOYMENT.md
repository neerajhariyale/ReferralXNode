
# 🗄️ Database Setup & Deployment Guide for ReferralXNode

This guide will walk you through setting up your **PostgreSQL** database, connecting to it via **DBeaver**, and preparing your backend for deployment.

---

## 1. Which Database Should You Use?

**Recommendation: PostgreSQL**
We strongly recommend **PostgreSQL** for this project.
*   **Why?** It is the world's most advanced open-source relational database. It works perfectly with Java (Spring Boot) and handles complex data (like users, jobs, and applications) securely.

### Option A: Cloud Database (Recommended for Easy Deployment)
Instead of installing PostgreSQL locally and trying to expose it to the internet, use a managed cloud provider. This allows you to access the DB from your local computer AND your deployed backend.

**Best Free Tier Options:**
1.  **[Neon.tech](https://neon.tech)** (Easiest, Serverless Postgres)
2.  **[Supabase](https://supabase.com)** (Excellent UI, great free tier)
3.  **[Railway](https://railway.app)** (Great for hosting both DB and App)

**Steps to Create a Cloud DB (Example with Neon.tech):**
1.  Go to [Neon.tech](https://neon.tech) and Sign Up.
2.  Create a **New Project** named `ReferralXNode`.
3.  It will verify and give you a **Connection String** that looks like:
    `postgres://neondb_owner:AbC123...@ep-cool-cloud.aws.neon.tech/neondb?sslmode=require`
4.  **Save this string!** You will need it for DBeaver and your Spring Boot application.

---

## 2. Using DBeaver to Manage Your Logic

**DBeaver** is a tool to view and edit your database.

1.  **Download & Install**: [Download DBeaver Community](https://dbeaver.io/download/)
2.  **Connect to Database**:
    *   Open DBeaver.
    *   Click the **New Database Connection** icon (plug with a plus sign).
    *   Select **PostgreSQL**.
    *   **Host/Port/User/Password**: You can fill these manually OR just paste your **Connection String** (from Neon/Supabase) into the `Main` tab (sometimes DBeaver auto-fills details if you paste the URI).
    *   Click **Test Connection** to ensure it works.
    *   Click **Finish**.

### What to Run in DBeaver?
Once connected, open a **SQL Editor** (right-click your database -> SQL Editor). Copy and run the following script to create your tables:

```sql
-- 1. Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'USER', -- 'ADMIN' or 'USER'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Jobs Table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    type VARCHAR(50),      -- 'Full-time', 'Part-time', etc.
    category VARCHAR(100), -- 'Engineering', 'Marketing', etc.
    salary_range VARCHAR(100),
    description TEXT,
    company_logo_url TEXT,
    posted_by INT REFERENCES users(id), -- Link to the admin who posted it
    status VARCHAR(50) DEFAULT 'ACTIVE', -- 'ACTIVE', 'CLOSED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Applications Table (For later)
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(id),
    user_id INT REFERENCES users(id),
    resume_url TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert a Test Admin User
-- Password is 'admin123' (In real app, this should be hashed, but for testing plain text or manual hash)
INSERT INTO users (email, password_hash, full_name, role) 
VALUES ('admin@referralxnode.com', 'admin123', 'Super Admin', 'ADMIN');
```

Select all the text and press **Execute** (Orange Play Button). You now have a database structure!

---

## 3. Connecting Spring Boot Backend

Open your Spring Boot project (Backend folder). You need to configure it to talk to this new database.

1.  Open `src/main/resources/application.properties`.
2.  Update the file with your Database Credentials:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://ep-cool-cloud.aws.neon.tech/neondb?sslmode=require
spring.datasource.username=neondb_owner
spring.datasource.password=YOUR_PASSWORD_HERE

# Hibernate Settings
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
*(Replace the URL, Username, and Password with the ones from your Cloud Provider)*

---

## 4. Deploying Your Backend

To make your backend accessible to everyone (and your frontend), you need to deploy it.

**Easiest Option: [Railway.app](https://railway.app) or [Render.com](https://render.com)**

### Steps for Railway (Recommended for beginners):
1.  Push your entire project (Frontend + Backend code) to **GitHub**.
2.  Login to **Railway** using GitHub.
3.  Click **New Project** -> **Deploy from GitHub repo**.
4.  Select your `ReferralXNode` repository.
5.  **Configure Backend**:
    *   Railway usually detects the Java/Maven structure in the `backend` folder.
    *   Go to **Variables** tab in Railway.
    *   Add your Database Environment Variables (so you don't hardcode passwords in GitHub!):
        *   `SPRING_DATASOURCE_URL`: `jdbc:postgresql://...`
        *   `SPRING_DATASOURCE_USERNAME`: `...`
        *   `SPRING_DATASOURCE_PASSWORD`: `...`
6.  **Deploy**. Railway will build your Java app and give you a public URL (e.g., `https://referral-backend.up.railway.app`).

### Steps for Deployment (General):
1.  **Build**: Run `./mvnw clean package` to create a JAR file.
2.  **Run**: The cloud provider runs `java -jar target/myapp.jar`.

---

## Summary Checklist
- [ ] Create Cloud Database (Neon/Supabase).
- [ ] Install DBeaver.
- [ ] Connect DBeaver to Cloud DB.
- [ ] Run the SQL Script above to create tables.
- [ ] Update Spring Boot `application.properties` with DB credentials.
- [ ] Run Backend locally to test connection.
- [ ] Push to GitHub and Deploy to Railway/Render.
