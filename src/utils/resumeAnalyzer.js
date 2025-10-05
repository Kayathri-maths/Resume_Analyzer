import OpenAI from "openai";
import pdfjsLib from "pdfjs-dist";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

async function analyzeResume(file) {
  // 1️⃣ Read PDF as ArrayBuffer
  const pdfData = await file.arrayBuffer();

  // 2️⃣ Parse PDF text using pdfjs
  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }

  // 3️⃣ Create prompt
  const prompt = `
You are an expert HR recruiter and ATS evaluator.
Analyze this resume and return JSON with:
1. "ats_score"
2. "key_skills"
3. "summary"
4. "suggestions"

Resume text:
${text}
`;

  // 4️⃣ Send request to OpenAI
  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [{ role: "user", content: prompt }],
  });

  const result = response.choices[0].message.content;
  console.log("Analysis Result:\n", result);
}

// Example usage in a browser (for testing)
document.getElementById("resumeInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  analyzeResume(file);
});
