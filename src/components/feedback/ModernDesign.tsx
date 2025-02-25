"use client"
import { useState } from 'react';
import { Star, MessageSquare, ArrowRight } from 'lucide-react';
import type { FeedbackProps } from './types';

export function ModernDesign({
  userName = 'Guest',
  points = 0,
  walletBalance = 0,
  orderDetails,
  onSubmit
}: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ rating, comment: feedback });
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
        <h2 className="text-xl font-medium mb-2">Hello {userName}</h2>
        <div className="flex items-center text-sm">
          <span>Points earned: {points}</span>
          <div className="ml-2 bg-white/10 px-3 py-1 rounded-full">
            Balance: {walletBalance} <ArrowRight size={12} className="inline" />
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          How was your experience?
        </h3>
        <div className="flex space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`p-2 rounded-lg transition ${
                rating >= star ? 'bg-slate-900 text-white' : 'bg-gray-100'
              }`}
            >
              <Star
                size={20}
                fill={rating >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>

        {/* Feedback Input */}
        <div className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-3 border rounded-lg resize-none h-32 focus:ring-2 focus:ring-slate-900 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
} 