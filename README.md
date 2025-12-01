# HackathonHunt

## Project Overview

HackathonHunt is a comprehensive platform designed to simplify the discovery and management of hackathons. It aggregates hackathon data from various sources, providing a centralized, user-friendly interface for developers to find events that match their interests, skills, and schedules. The platform features a robust backend API for data collection and processing, and a dynamic frontend application for an engaging user experience.

## Features

*   **Aggregated Hackathon Listings:** Gathers information from multiple hackathon platforms (Devfolio, Devpost, Dorahacks, MLH, Unstop).
*   **Search and Filtering:** Allows users to easily find hackathons based on various criteria.
*   **Detailed Hackathon Pages:** Provides comprehensive information for each hackathon, including dates, locations, themes, and prize details.
*   **User Authentication:** Secure user login and session management.
*   **Responsive Design:** Optimized for various devices and screen sizes.

## Technologies Used

### Backend

*   **Language:** Python
*   **Framework:** FastAPI
*   **Dependencies:** `uvicorn`, `requests`, `beautifulsoup4`, `cloudscraper`, `pydantic`
*   **Database:** PostgreSQL (assumed, as it's a common choice for such applications)

### Frontend

*   **Language:** TypeScript, JavaScript
*   **Framework:** Next.js (React)
*   **Authentication:** NextAuth.js
*   **Styling:** Tailwind CSS, PostCSS
*   **UI Components:** Radix UI, various custom components
*   **Other Libraries:** `swr`, `framer-motion`, `react-hook-form`, `zod`

## Getting Started

Follow these instructions to set up and run HackathonHunt locally.

### Prerequisites

*   **Node.js** (LTS version recommended) and **npm** or **Yarn** for the frontend.
*   **Python 3.8+** and **pip** for the backend.
*   **PostgreSQL** database instance.

### 1. Clone the Repository

```bash
git clone https://github.com/ShaikhWarsi/HackathonHunt.git
cd HackathonHunt
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

#### Install Dependencies

It is recommended to create a virtual environment:

```bash
python -m venv venv
.\venv\Scripts\activate # On Windows
source venv/bin/activate # On macOS/Linux
```

Install the required Python packages. If `requirements.txt` is not present, you can create one with the following content:

```
fastapi
uvicorn
requests
beautifulsoup4
cloudscraper
pydantic
```

Then install:

```bash
pip install -r requirements.txt
```


#### Run the Backend

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The backend API will be accessible at `http://localhost:8000`.

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install # or yarn install
```

#### Environment Variables

Create a `.env.local` file in the `frontend` directory. This file will contain environment variables for Next.js and NextAuth.js.

Example `.env.local`:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Important:** Replace `YOUR_RANDOM_SECRET_STRING` with a strong, randomly generated string.

#### Run the Frontend

```bash
npm run dev # or yarn dev
```

The frontend application will be accessible at `http://localhost:3000`.

## Usage

### Accessing the Application

Once both the backend and frontend servers are running, open your web browser and navigate to `http://localhost:3000`. You will see the HackathonHunt dashboard with aggregated hackathon listings.

### Backend API Endpoints

The backend provides the following primary endpoint:

*   **GET `/hackathons`**: Retrieves a list of all aggregated hackathons.
    *   **Method:** `GET`
    *   **Description:** Fetches data from all configured scraper modules and returns a JSON array of `Hackathon` objects.
    *   **Example Response:**
        ```json
        [
          {
            "id": "string",
            "title": "string",
            "url": "string",
            "thumbnail_url": "string",
            "featured": false,
            "organization_name": "string",
            "isOpen": true,
            "submission_period_dates": "string",
            "displayed_location": "string",
            "registrations_count": 0,
            "prizeText": "string",
            "time_left_to_submission": "string",
            "themes": [
              "string"
            ],
            "start_a_submission_url": "string",
            "source": "string",
            "start_date": "2023-10-27",
            "end_date": "2023-10-27",
            "mode": "string",
            "location": "string",
            "tags": [
              "string"
            ]
          }
        ]
        ```

### Scraping Workflow

The backend automatically runs all configured scrapers when the `/hackathons` endpoint is called. The scraped data is then aggregated and returned. Error logs for scraping are stored in `scraper_errors.log` in the `backend` directory.

## Troubleshooting

*   **Backend not starting:**
    *   Ensure all Python dependencies are installed (`pip install -r requirements.txt`).
    *   Check your `.env` file for correct database configuration and API keys.
    *   Verify that PostgreSQL is running and accessible.
    *   Look for error messages in the terminal where you ran `uvicorn`.
*   **Frontend not starting:**
    *   Ensure all Node.js dependencies are installed (`npm install` or `yarn install`).
    *   Check your `.env.local` file for `NEXT_PUBLIC_BACKEND_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET`.
    *   Verify that the backend server is running at the address specified in `NEXT_PUBLIC_BACKEND_URL`.
    *   Check the browser console and terminal for any error messages.
*   **No hackathons displayed:**
    *   Ensure the backend is running and accessible from the frontend.
    *   Check `backend/scraper_errors.log` for any issues during the scraping process.
    *   Verify that the external hackathon platforms are accessible.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure tests pass.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate documentation.

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.
