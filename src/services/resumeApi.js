import { auth } from "../firebase";
import { saveResumeAnalysis } from "./saveResumeAnalysis";

export async function analyzeResume(text) {
  const prompt = `You are an expert HR professional and ATS (Applicant Tracking System) analyzer.

Analyze this resume PDF and provide a comprehensive analysis.

CRITICAL: Respond ONLY with valid JSON. No markdown, no code blocks, no explanations - just pure JSON.

Required JSON structure:
{
  "is_resume": true/false,
  "reason": "explanation if not a resume",
  "atsScore": 0-100,
  "skills": {"Skill Name": proficiency_score, ...},
  "roles": [
    {"role": "Job Title", "score": 0-100, "evidence": "why this role fits"}
  ],
  "projects": [
    {"original": "brief project description", "enhanced": ["enhanced bullet 1", "enhanced bullet 2"]}
  ],
  "summary": "2-3 sentence professional summary",
  "suggestions": ["actionable suggestion 1", "suggestion 2", ...]
}

Analysis guidelines:
- If not a resume, set is_resume to false and provide reason
- Extract 6-10 key skills with proficiency scores (0-100)
- Predict top 3 job roles with match scores and evidence
- Enhance 2-3 projects into ATS-optimized bullet points
- Provide 4-6 specific, actionable improvement suggestions
- Calculate ATS score based on keyword optimization, formatting, and completeness

  Resume text:
  ${text}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `API error: ${response.status}`
    );
  }

  const data = await response.json();
  const output = data?.choices?.[0]?.message?.content ?? "";
  console.log("output", output);
  const cleanOutput = output
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
  const uid = auth.currentUser?.uid;
  console.log("cleanOutput", cleanOutput);
  if (uid && cleanOutput.is_resume) {
    await saveResumeAnalysis(uid, cleanOutput);
  }
  return JSON.parse(cleanOutput);
}
