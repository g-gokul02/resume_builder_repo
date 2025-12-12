// controller for enhancing a resume's professional summary

import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// -------------------------------------
// 1. Enhance Professional Summary
// -------------------------------------
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the professional summary into 1–2 compelling, ATS-friendly sentences. Return only the improved text."
                },
                {
                    role: "user",
                    content: userContent,
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content.trim();

        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// -------------------------------------
// 2. Enhance Job Description
// -------------------------------------
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the job description into 2–3 ATS-friendly sentences highlighting achievements and key responsibilities. Return only the improved text."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ]
        });

        const enhancedContent = response.choices[0].message.content.trim();

        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// -------------------------------------
// 3. Upload Resume → Extract Data + Save
// -------------------------------------
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // SYSTEM PROMPT
        const systemPrompt = "You are an expert resume parser AI. Extract structured data from resumes and output only valid JSON with no extra text.";

        // USER PROMPT (clean JSON format, no mongoose types)
        const userPrompt = `
Extract all relevant resume information from the following text and output ONLY a clean JSON object:

RESUME TEXT:
${resumeText}

Return JSON in exactly this structure (empty string if missing):

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "title": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
Only return JSON. No extra text.
        `;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        const extractedJson = response.choices[0].message.content;

        // SAFE PARSING
        let parsedData;
        try {
            parsedData = JSON.parse(extractedJson);
        } catch (err) {
            return res.status(400).json({
                message: "AI returned invalid JSON",
                raw: extractedJson
            });
        }

        // Save to DB
        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        return res.json({ resumeId: newResume._id });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
