import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      const userSummary = String(data || "").trim();

      if (!userSummary) {
        toast.error("Please enter a summary first.");
        return;
      }

      setIsGenerating(true);

      const prompt = `Enhance the following professional summary for a resume:\n\n"${userSummary}"`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const enhanced = response?.data?.enhancedContent;
      if (!enhanced) {
        toast.error("AI failed to generate a summary.");
        return;
      }

      setResumeData((prev) => ({
        ...(prev || {}),
        professional_summary: enhanced.trim(),
      }));

      toast.success("Summary enhanced!");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-500">
              Add a summary for your resume here
            </p>
          </div>

          {/* {<button
            disabled={isGenerating}
            onClick={generateSummary}
            className={`flex items-center gap-2 px-3 py-1 text-sm rounded-md transition-colors
              ${isGenerating 
                ? "bg-purple-200 text-purple-500 cursor-not-allowed" 
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"}`}
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {isGenerating ? "Enhancing..." : "AI Enhance"}
          </button> } */}
        </div>
      </div>

      <div>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your strengths..."
        />
        <p className="text-xs text-gray-500 max-w-[80%] mx-auto text-center">
          Tip: Keep it concise (3–4 sentences) and highlight your strongest skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;

