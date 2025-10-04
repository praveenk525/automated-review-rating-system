# Review Rating System

A modern, AI-powered review management system built with React and TypeScript. This application allows users to submit reviews and automatically predicts star ratings and sentiment analysis using machine learning.

## 🌟 Features

- **AI-Powered Analysis**: Automatic star rating prediction and sentiment analysis for submitted reviews
- **Real-time Review Management**: Submit, view, and sort reviews with instant updates
- **Advanced Sorting**: Sort reviews by date, rating, helpfulness, and more
- **Responsive Design**: Fully responsive UI that works across all device sizes
- **Interactive UI**: Modern interface with smooth animations and transitions
- **Review Statistics**: Visual rating distribution with progress bars and analytics
- **Form Validation**: Comprehensive client-side validation with error handling
- **Toast Notifications**: User-friendly feedback for all actions

## 🚀 Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **HTTP Client**: Axios (via custom API service)
- **State Management**: React Hooks (useState, useEffect, useMemo)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd review-rating-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

The application will open at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ReviewCard.tsx          # Individual review display component
│   ├── ReviewForm.tsx          # Review submission form
│   └── ...
├── interfaces/
│   └── review.interface.ts     # TypeScript interfaces
├── service/
│   └── review.service.ts       # API service configuration
├── pages/
│   ├── Home.tsx               # Main application page
│   └── ReviewPage.tsx         # Reviews listing and management
└── ...
```

## 🔧 API Integration

The application expects a backend API with the following endpoints:

### Get Reviews
```http
GET /reviews/
```
Returns an array of review objects.

### Create Review
```http
POST /reviews/
Content-Type: application/json

{
  "name": "string",
  "title": "string",
  "content": "string"
}
```

### Review Object Schema
```typescript
interface Review {
  id: number;
  name: string;
  title: string;
  content: string;
  predicted_rating: number;    // AI-predicted rating (1-5)
  predicted_sentiment: string; // AI-predicted sentiment
  created_at: string;          // ISO date string
  helpful: number;            // Helpfulness count
  verified: boolean;          // Verification status
}
```

## 🎨 UI Components

### ReviewCard
- Displays individual reviews with user avatars
- Shows AI-predicted ratings with star visualization
- Includes sentiment badges and verification status
- Interactive elements for helpfulness and reporting

### ReviewForm
- Multi-field form for review submission
- Real-time validation with error messaging
- Loading states and success feedback
- Responsive design with modern styling

### Reviews (Main Component)
- Review listing with multiple sorting options
- Rating statistics and distribution charts
- Loading states and empty state handling
- Toggle between review list and submission form

## 🔍 Features in Detail

### AI-Powered Predictions
- Automatic star rating prediction (1-5 scale)
- Sentiment analysis (Positive, Neutral, Negative)
- Real-time processing upon review submission

### Sorting Options
- **Most Recent**: Latest reviews first
- **Highest Rated**: Best ratings first
- **Lowest Rated**: Lowest ratings first
- **Most Helpful**: Based on community feedback

### Responsive Design
- Mobile-first approach
- Adaptive layouts for tablet and desktop
- Touch-friendly interface elements
- Optimized typography and spacing

### Form Validation
- Required field validation
- Character restrictions (no numbers/special chars)
- Real-time error feedback
- Prevents submission with validation errors

## 🎯 Usage

1. **View Reviews**: Browse existing reviews with ratings and sentiment analysis
2. **Sort Reviews**: Use the filter dropdown to sort by different criteria
3. **Submit Review**: Click "Submit a review" to open the submission form
4. **Form Completion**: Fill in your name, title, and detailed review
5. **AI Analysis**: Receive instant AI-powered rating and sentiment predictions
6. **Review Management**: View statistics and rating distribution

## 🚀 Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```







