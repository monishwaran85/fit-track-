require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in .env');
}

// Initialize AI Studio client with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generates a personalized workout recommendation
const generateWorkoutRecommendation = async (age, fitnessGoal, experience) => {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    });

    const prompt = `Generate a personalized workout recommendation for a person with the following details:
- Age: ${age}
- Fitness Goal: ${fitnessGoal}
- Experience Level: ${experience}

Please keep the recommendation extremely direct, practical, and concise (within 2-3 paragraphs). Do not include any greeting, markdown bold stars (*), bullet points, or introductory phrases. Speak directly and provide a clear step-by-step execution plan.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini Recommendation Error:', error.message);
    throw new Error(`Failed to generate workout recommendation from Gemini AI: ${error.message}`);
  }
};

// Generates personalized fitness insights
const generateFitnessInsights = async (totalWorkouts, averageDuration, totalCaloriesBurned) => {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    });

    const prompt = `Analyze this user's fitness progress and generate a highly personalized, encouraging fitness insight:
- Total Workouts Logged: ${totalWorkouts}
- Average Workout Duration: ${averageDuration} minutes
- Total Calories Burned: ${totalCaloriesBurned} kcal

Please keep the insight extremely direct, actionable, and concise (within 2-3 sentences). Do not include any greeting, markdown bold stars (*), bullet points, or introductory phrases. Provide guidance on what to adjust or continue.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini Insights Error:', error.message);
    throw new Error(`Failed to generate fitness insights from Gemini AI: ${error.message}`);
  }
};

module.exports = {
  generateWorkoutRecommendation,
  generateFitnessInsights,
};