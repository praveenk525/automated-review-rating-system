// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Shield } from "lucide-react";
import Reviews from "./ReviewPage";

const Home: React.FC = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gray-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Welcome to Review Rating System
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Submit your review and instantly see predicted star ratings powered by
              AI. Experience the future of sentiment analysis and review insights.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto sm:pb-8 sm:px-6 flex flex-col items-center mt-4 lg:mt-0 lg:pt-0">
        

        <Reviews />
      </div>
    </div>
  );
};

export default Home;