Financial Risk Dashboard
A full-stack financial dashboard platform that provides analysts and decision-makers with comprehensive insights into customer financial health. This platform visualizes income, expenses, credit scores, and risk categorization, supported by a responsive and modular front-end (React + TypeScript) and a scalable Node.js backend.

🎥 Demo Video:
Loom Walkthrough: https://drive.google.com/file/d/1oumk9vcz0p6qFsW2dOrmHZfA550M65aM/view?usp=sharing

🚀 Project Features
📈 Dashboard KPIs: Real-time display of total income, expenses, and average credit score.

🧾 Monthly Line Chart: Visualizes income and expense trends over 6 months.

🧠 Risk Distribution Pie Chart: Segments customers into High, Medium, and Low risk groups.

📋 Interactive Table: Search, sort, filter, and manage customer financial data.

⚙️ Status Workflow: Update and track customer onboarding or risk-related status.

🔌 API-Driven: Data fetched and updated through Node.js REST API.

🔧 Fully modular: Separated components for scalability and reusability.

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

git clone https://github.com/yourusername/financial-dashboard.git

Set up Backend:

cd server
npm install
npm run dev

→ Runs on http://localhost:5000

Set up Frontend:

cd client
npm install
npm run dev

→ Runs on http://localhost:5173

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

Risk Score Tag in table

Color-coded distribution Pie Chart

🤖 AI Tool Usage Breakdown
During development, AI (ChatGPT) was used for resolving advanced issues—not for full code generation. Key contributions include:

TypeScript Type Mismatch Resolution

Issue: "Type 'CustomerType[]' is not assignable to type 'ChartDataItem[]'."
AI assisted in designing a clean transformation function to align chart data to expected shape for Recharts components.

Complex Component Typing in React

Issue: "Cannot find name 'setSearchText'."
AI helped modularize and pass props across components using React.FC<Props> syntax with proper interfaces.

Modularization & JSX Fixes

Issue: "JSX expressions must have one parent element."
AI helped refactor JSX blocks into reusable components and suggested best practices to structure prop interfaces cleanly.

Backend Middleware Typing

Issue: Express req.body was treated as any.
AI assisted in defining request payload interfaces and applying them for clean API contracts with TypeScript in Node.js.

Error Debugging for Uncaught Backend Exceptions

Issue: "TypeError: Cannot read property 'status' of undefined."
AI guided on validating and safely accessing request body fields and returning meaningful HTTP error responses.

📝 Note: AI was used solely to unblock technical implementation, resolve type safety issues, and improve code structure—not for writing core logic or design.
