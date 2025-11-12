const { openai } = require("@ai-sdk/openai");
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateQuestions(pdfText) {
  const prompt = `Generate 5 MCQ questions with options and correct answers from this content:\n\n${pdfText}`;

  const { text } = await generateText({
    model: openai("gpt-5"),
    prompt,
  });

  return text;
}

module.exports = { generateQuestions };
