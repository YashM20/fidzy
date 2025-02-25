"use client"
import { useState } from "react";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Info, 
  MessageSquare, 
  MoreHorizontal, 
  Share, 
  Star, 
  Download 
} from "lucide-react";
import type { FeedbackProps } from './types';

export function CafeDesign({
  userName = 'Anita',
  points = 50,
  walletBalance = 250,
  orderDetails,
  onSubmit
}: FeedbackProps) {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-lg">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">caféccino</h1>
          <div className="bg-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
            <span className="text-red-500 text-xs font-bold">tfs</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-lg">Hello {userName},</p>
          <p className="text-lg mb-1">Thank you for coming.</p>
          <div className="flex items-center">
            <p className="text-lg font-medium">You earned {points} pts.</p>
            <div className="ml-2 bg-white/20 text-white text-xs py-1 px-2 rounded-full">
              Wallet: {walletBalance} pts <ArrowRight size={12} className="inline ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      <div className="bg-white border-b border-gray-100">
        <div className="p-5 border-b border-dashed border-gray-200">
          {/* ... existing receipt section code ... */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-blue-600 text-2xl font-bold">₹228.00</span>
              <p className="text-gray-500 text-xs">Total Amount Paid By Cash</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-blue-600 font-medium">₹</span>
            </div>
          </div>

          {/* ... rest of the receipt details ... */}
          <div className="text-sm text-gray-600 pt-2">
            <p>Date & Time</p>
            <p className="text-blue-600">22 January 2022, Saturday - 10:58 AM</p>
          </div>

          <div className="text-sm text-gray-600 pt-2">
            <p>Order Number - ID</p>
            <p className="text-blue-600">123456NKAD</p>
          </div>

          <button
            onClick={toggleExpand}
            className="flex items-center mt-3 text-blue-600 text-sm"
          >
            <Check size={16} className="mr-1" />
            {expanded ? "Show less" : "Tap to expand"}
            <ChevronDown size={16} className={`ml-1 transform transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Expandable content */}
        {expanded && (
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span>Cappuccino (Large)</span>
                <span>₹180.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Chocolate Muffin</span>
                <span>₹65.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Taxes & Charges</span>
                <span>₹17.00</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>₹228.00</span>
              </div>
            </div>
          </div>
        )}

        {/* ... rest of the component ... */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between text-gray-700 mb-4">
            <span>Discounts, Offers & Coupons</span>
            <button className="text-blue-600">
              <Info size={18} />
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
            <p>No offers applied to this order</p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-medium text-gray-800 mb-3">
            How likely are you to recommend us to your family and friends?
          </h3>
          <p className="text-sm text-gray-600 mb-3">Rate Us 1-5, Where 5 Is The Highest</p>

          <div className="flex space-x-4 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                  rating >= star
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Star size={16} fill={rating >= star ? "currentColor" : "none"} />
              </button>
            ))}
          </div>

          <h3 className="font-medium text-gray-800 mb-3">Write us a feedback</h3>
          <div className="relative">
            <textarea
              placeholder="Tap to write your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm h-24"
            />
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <button className="text-yellow-500">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-gray-50">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <button className="text-gray-600 flex items-center text-sm">
                <Share size={16} className="mr-1" />
                Share
              </button>
              <button className="text-gray-600 flex items-center text-sm">
                <Download size={16} className="mr-1" />
                Download
              </button>
            </div>
            <button className="text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex justify-between mb-2">
              <span>Store Policy</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex justify-between">
              <span>Follow Us</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 