"use client"
import { useState } from "react";
import { ModernDesign } from "@/components/feedback/ModernDesign";
import { PlayfulDesign } from "@/components/feedback/PlayfulDesign";
import { CafeDesign } from "@/components/feedback/CafeDesign";
import type { FeedbackData } from "@/components/feedback/types";

export default function Home() {
  const [design, setDesign] = useState<'modern' | 'playful' | 'cafe'>('cafe');

  const handleFeedbackSubmit = (data: FeedbackData) => {
    console.log('Feedback submitted:', data);
    // Handle submission logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto mb-4">
        <select
          value={design}
          onChange={(e) => setDesign(e.target.value as 'modern' | 'playful' | 'cafe')}
          className="w-full p-2 rounded-lg border border-gray-300"
        >
          <option value="cafe">Cafe Design</option>
          <option value="modern">Modern Design</option>
          <option value="playful">Playful Design</option>
        </select>
      </div>

      <div className="flex justify-center">
        {design === 'modern' ? (
          <ModernDesign
            userName="John"
            points={50}
            walletBalance={250}
            onSubmit={handleFeedbackSubmit}
          />
        ) : design === 'playful' ? (
          <PlayfulDesign
            userName="John"
            points={50}
            walletBalance={250}
            onSubmit={handleFeedbackSubmit}
          />
        ) : (
          <CafeDesign
            userName="Anita"
            points={50}
            walletBalance={250}
            onSubmit={handleFeedbackSubmit}
          />
        )}
      </div>
    </div>
  );
}
