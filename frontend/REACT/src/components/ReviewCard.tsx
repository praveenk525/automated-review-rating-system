import React from "react";
import {
  Star,
  CheckCircle,
  ThumbsUp,
  MessageCircle,
  Calendar,
} from "lucide-react";
import type { Review } from "../interfaces/review.interface";

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 transition-all duration-300 ${
            star <= rating
              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const getSentimentStyles = (sentiment: string) => {
    if (sentiment === "4" || sentiment === "5") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (sentiment === "3") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    } else {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  const getSentimentText = (sentiment: string) => {
    if (sentiment === "4" || sentiment === "5") return "Positive";
    else if (sentiment === "3") return "Neutral";
    else return "Negative";
  };

  return (
    <div className="border-none rounded-xl py-2 mb-6 transition-all duration-300 transform">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {
                review.name.charAt(0).toUpperCase().length === 0 ? "U" : review.name.charAt(0).toUpperCase()
              }
            </div>
            {review.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">
              {review.name.length === 0 ? "Unknown" : review.name}
            </h4>
            {review.verified && (
              <div className="flex items-center gap-1 text-sm text-emerald-600 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="font-medium">Verified Purchase</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating and Title Section */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          {renderStars(review.predicted_rating)}
          <div className="flex items-center gap-2">
            {/* <span className="font-semibold text-gray-700 text-sm">
              {review.predicted_rating}.0 out of 5 stars
            </span> */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight transition-colors duration-200">
              {review.title}
            </h3>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          Reviewed on 
          <Calendar className="w-3 h-3" />
          <span>{new Date(review.created_at).toLocaleDateString()}</span>
        </div>

        
      </div>

      {/* Content */}
      <div className="mb-2">
        <p className="text-gray-700 leading-relaxed text-base">
          {review.content}
        </p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center gap-12 pt-2 border-t border-gray-100">
        {/* Sentiment Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getSentimentStyles(
            review.predicted_sentiment
          )}`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{getSentimentText(review.predicted_sentiment)} Review</span>
        </div>

        {/* Interaction Area */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful</span>
            <span>{review.helpful}</span>
          </button>

          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-sm font-medium">
            Report
          </button>
        </div>
      </div>

      {/* Subtle accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ReviewCard;