Smart Tank Monitor (Hydroleum Solution)
A professional, real-time Internet of Things (IoT) dashboard designed for monitoring petrol pump fuel tanks. This application provides live contamination status, critical alerts, and detailed historical data analytics to ensure fuel integrity and operational safety.

The UI is built to a high standard, featuring a responsive, soft-shadow aesthetic optimized for clarity and ease of use.

✨ Key Features
This application delivers critical monitoring capabilities to prevent costly fuel contamination:

Real-time Monitoring: Dynamic display of Water Level, Petrol Purity, Pump State, and Emergency Switch status with a 15-second data refresh interval from external IoT APIs.

Dynamic Visualization: Animated tank representation with wave effects and dynamic color-coding to visualize contamination levels.

Multi-Level Alerts: Integration with external IoT and ML endpoints to provide multi-level alerts:

Warning State: Visual flag if Water Level > 16%.

Critical Alert: Audio and visual pulsing alert if Water Level > 20%.

Historical Data & Reporting: Dedicated history viewer supporting filtering by date range and status.

Client-Side PDF Export: Functionality to generate and export professional, structured PDF reports of historical data.

Responsive UI: Fully optimized layout using a 12-column grid system for seamless viewing on desktop, tablet, and mobile devices.

🛠 Technology Stack
This project is built using modern front-end technologies for speed and maintainability:

Category	Technology	Purpose
Framework	React	Component-based UI development.
Language	TypeScript	Ensures type safety and improves code quality.
Build Tool	Vite	Extremely fast development server and optimized builds.
Styling	Tailwind CSS	Utility-first framework for responsive, modern styling.
Components	shadcn/ui	High-quality, customizable component primitives.
Routing	React Router v6	Declarative navigation for the single-page application (SPA).

Export to Sheets
🚀 Getting Started
Follow these instructions to set up the project locally for development.

Prerequisites
Node.js (LTS recommended)

npm (comes with Node.js)

Installation
Clone the repository:

Bash

git clone <YOUR_GIT_URL>
Navigate to the project directory:

Bash

cd <YOUR_PROJECT_NAME>
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
The application will be accessible at http://localhost:5173 (or the port specified by Vite).

Testing Authentication
The application uses protected routes. You can test the login functionality using the following credentials:

Field	Value
Email	admin@tankmonitor.com
Password	admin123

Export to Sheets
⚙️ Data Integration (API Endpoints)
The application utilizes the following endpoints for dynamic data:

Description	Endpoint	Fetch Type
IoT Real-Time	https://api.thingspeak.com/channels/3024727/feeds.json?results=1	Polling (15-second interval)
Historical Data	https://api.thingspeak.com/channels/3024727/feeds.json?results=10000	Fetch on History page load
ML Threat Model	http://10.70.52.94:5000/api/threat	Polling (30-second interval)

Export to Sheets
📦 Deployment
To create a production-ready bundle of your application:

Bash

npm run build
