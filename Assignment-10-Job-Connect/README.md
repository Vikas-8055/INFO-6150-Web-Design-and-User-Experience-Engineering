# OVERVIEW 

This project enhances the existing Job Portal application by introducing robust role-based functionality for Admin and Employee users. The application is developed using React, Redux, and Axios, with backend support for authentication, job management, and user administration. The application also incorporates Material UI for designing visually appealing and responsive components.

# FEATURES

1.	Added role-based functionality by introducing an Admin Portal and an Employee Portal.
2.	Modified the /user/create API to include a new type field (admin or employee) with strict validation.
3.	Enhanced the Get All Users API to retrieve all user details except passwords.
4.	Built a Login Page that validates user credentials using the /users/login API and redirects users based on their role (Admin or   Employee).
5.	Created two distinct portals:
	1.	Admin Portal
	•	Employees Page: Displays all registered users in a table format with fields such as email, name, and role type.
	•	Add Jobs Page: Allows Admins to add job postings using the /create/job API with fields like company name, job title, description, and salary.
	2.	Employee Portal
	•	Jobs Page: Displays available job listings fetched from the /get/jobs API.

6.	Ensured all pages are protected and inaccessible without login credentials.
7.	Restricted routing so Admin users can only access Admin Portal pages and Employee users can only access Employee Portal pages.
8.	Integrated Redux for state management, handling authentication, user data, and job data efficiently.
9.	Used Material UI for designing a responsive and modern UI, including components such as Navbar, Tables, Forms, and Cards.
10. Designed a Navbar for seamless navigation across the application.
11. Leveraged React Router for dynamic routing and role-based navigation.
12. Enabled secure session management to ensure user roles and data integrity during navigation.
13. Provided robust login functionality with validation, error handling, and secure logout options.
14. Optimized the backend with improved validation for user creation, login, and job posting APIs.node -v
