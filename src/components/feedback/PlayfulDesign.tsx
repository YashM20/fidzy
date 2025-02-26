"use client"
import { useState } from 'react';
import { Star, Heart, Sparkles } from 'lucide-react';
import type { FeedbackProps } from './types';

export function PlayfulDesign({
  userName = 'Friend',
  points = 0,
  walletBalance = 0,
  orderDetails,
  onSubmit
}: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="w-full max-w-md rounded-3xl bg-white shadow-lg overflow-hidden">
      {/* Fun Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Hey {userName}! ✨</h2>
        </div>
        <div className="bg-white/20 rounded-2xl p-4">
          <p className="text-lg">You&apos;re amazing! You just earned</p>
          <p className="text-3xl font-bold">{points} Points! 🎉</p>
        </div>
      </div>

      {/* Playful Rating */}
      <div className="p-6 bg-gradient-to-b from-white to-purple-50">
        <h3 className="text-xl font-bold text-purple-900 mb-4">
          Did we make you smile today? 😊
        </h3>
        <div className="flex justify-center space-x-4 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`transform transition hover:scale-110 ${
                rating >= star ? 'text-yellow-400 animate-bounce' : 'text-gray-300'
              }`}
            >
              <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what made your day special! ✨"
            className="w-full p-4 border-2 border-purple-200 rounded-2xl resize-none h-32 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            onClick={() => onSubmit?.({ rating, comment: feedback })}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold hover:opacity-90 transition flex items-center justify-center space-x-2"
          >
            <Heart className="h-5 w-5" />
            <span>Share the Love!</span>
          </button>
        </div>
      </div>
    </div>
  );
} 