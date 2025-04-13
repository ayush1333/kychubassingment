Dashboard for Financial Risk A platform for full-stack financial dashboards that gives analysts and decision-makers thorough information about the financial health of their clients. This platform uses a scalable Node.js backend and a responsive and modular front-end (React + TypeScript) to visualize income, expenses, credit scores, and risk classification.

🎥 Loom Walkthrough Demo Video: https://drive.google.com/file/d/1oumk9vcz0p6qFsW2dOrmHZfA550M65aM/view


🚀 Project Features 📈 Dashboard KPIs: Average credit score, total income, and expenses are shown in real time.

🧾 Monthly Line Chart: Shows trends in income and expenses over a period of six months.

The pie chart for risk distribution divides clients into three risk categories: high, medium, and low.

📋 Interactive Table: Manage, search, filter, and sort client financial information.

⚙️ Status Workflow: Monitor and update risk-related or customer onboarding status.

🔌 API-Driven: Node.js REST API is used to retrieve and update data.

🔧 Completely modular: Divided parts for reuse and scalability.

🛠️ Tech Stack
Frontend: React.js, TypeScript, Ant Design, Recharts

Backend: Node.js, Express.js, TypeScript

Data: Mocked JSON data, future-ready for DB integration

Tools: ESLint, Prettier, Concurrently, VS Code, AI-assisted linting/debugging

📦 Setup Instructions
🔧 Prerequisites:

Node.js (v18+)

npm or yarn

Clone the repository:

git clone https://github.com/ayush1333/kychubassingment

Set up Backend:

cd server
npm install
npm run dev

→ Runs on http://localhost:5000

Set up Frontend:

cd client
npm install
npm run dev

→ Runs on http://localhost:3000

Optional: Configure environment variables (.env file)

PORT=5000
CLIENT_URL=http://localhost:5173

🧮 Risk Scoring Explanation
Each customer is assigned a risk score between 0–100, calculated using weighted financial metrics:

Credit Score (40%)

Repayment History / Status (30%)

Income-to-Expense Ratio (30%)

The logic combines and normalizes these values to compute a composite risk score. Based on the score:

0–40 → 🔴 High Risk

41–70 → 🟠 Medium Risk

71–100 → 🟢 Low Risk

The score is dynamically updated on user interaction and visualized through:

assigned to type 'CustomerType[]'."
AI helped create a clean transformation function that aligned chart data with Recharts components' expected shapes.

Typing Complex Components in React

The problem is "Cannot find name'setSearchText'."
Using React, AI assisted in modularizing and passing props between components.FC<Props> syntax with appropriate interfaces.

Modularization & JSX Fixes

"JSX expressions must have one parent element" is the problem.
AI offered best practices for organizing prop interfaces neatly and assisted in refactoring JSX blocks into reusable components.

Typing in Backend Middleware

Problem: Express req.body was handled like any other.
AI helped define request payload interfaces and apply them to TypeScript-based clean API contracts in Node.js.

Error Debugging for Uncaught Backend Exceptions

The problem is "TypeError: Cannot read property'status' of undefined."
AI provided guidance on how to safely access and validate request body fields and provide insightful HTTP error responses.

📝 Note: AI was not used to write core logic or design; rather, it was used only to improve code structure, unblock technical implementation, and fix type safety issues.



