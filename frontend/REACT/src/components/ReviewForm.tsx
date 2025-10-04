import React, { useState } from "react";
// import type { Review } from "../interfaces/review.interface";
import api from "../service/review.service";
import { Bounce, toast } from "react-toastify";
import { Shield, User, Edit3, MessageSquare, Send } from "lucide-react";

interface Props {
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<Props> = ({ onReviewAdded }) => {
  const [reviewText, setReviewText] = useState({
    name: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    title?: string;
    content?: string;
  }>({});

  // Validation rules
  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required`;
    } else if (/[^a-zA-Z.,'\s]/.test(value)) {
      error = `${name} cannot contain numbers or special characters`;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewText((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "content") validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateField("content", reviewText.content);

    if (errors.title || errors.content || errors.name) {
      toast.warning("Please fix validation errors before submitting.", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);
    try {
      console.log(reviewText);
      const response = await api.post("/reviews/", {
        name: reviewText.name,
        title: reviewText.title,
        content: reviewText.content,
      });
      console.log(response);

      if (response.status === 201) {
        setReviewText({ name: "", title: "", content: "" });
        setErrors({});
        toast.success(response.data.message || "Review Added Successfully", {
          position: "top-center",
        });
      }
      onReviewAdded();
    } catch (err: any) {
      const errorData = err.response?.data;

      let errorMessage = "Failed to add review";

      if (errorData?.detail) {
        errorMessage = errorData.detail;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }

      toast.error(errorMessage, {
        position: "top-center",
        transition: Bounce,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6 overflow-hidden md:w-xl lg:w-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:block items-center justify-center sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
            <Shield className="w-4 h-4" />
            <span>AI-Verified Reviews</span>
          </div>
        </div>
        <p className="text-base text-gray-600 leading-relaxed">
          Share your experiences and discover insights from our AI-powered
          review analysis system.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-blue-600" />
          Write Your Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={reviewText.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full pl-11 pr-4 py-3 border ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? "focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
                } placeholder-gray-400`}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Title Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Title
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="title"
                value={reviewText.title}
                onChange={handleChange}
                placeholder="Excellent Experience"
                className={`w-full pl-11 pr-4 py-3 border ${
                  errors.title
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.title
                    ? "focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
                } placeholder-gray-400`}
              />
            </div>
            {errors.title && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Content Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              className={`w-full px-4 py-3 border ${
                errors.content
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              } rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.content
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } placeholder-gray-400 resize-none`}
              placeholder="What did you like or dislike? How did this product meet your expectations?"
              name="content"
              value={reviewText.content}
              onChange={handleChange}
              rows={5}
              required
            />
            {errors.content && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.content}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
