export interface Review {
  id: number;
  name: string;
  title: string;
  content: string;
  rating: number;
  predicted_rating: number;
  predicted_sentiment: string;
  created_at: string;
  updated_at: string;
  verified?: boolean; // optional
  helpful?: number;   // optional
  images?: string[];  // optional
}
