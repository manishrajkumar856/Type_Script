/**
 * Mock service for AI Model Battle logic.
 * In a real app, this would call an API (e.g., Langgraph, OpenAI, etc.)
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const chatService = {
  /**
   * Generates a battle result for a given prompt.
   * Returns solution1, solution2, and a judge verdict.
   */
  async generateBattle(prompt) {
    // Simulate network delay
    await delay(2000);

    const solution1 = `### Model A Solution\n\nTo address "${prompt}", here is a robust JavaScript implementation:\n\n\`\`\`javascript\n// Solution from Model A\nconst result = (input) => {\n  return input.split('').reverse().join('');\n};\n\`\`\`\n\n**Pros:**\n- Concise and idiomatic.\n- High readability.`;

    const solution2 = `### Model B Solution\n\nCertainly! For "${prompt}", I recommend a more manual approach for performance:\n\n\`\`\`javascript\n// Solution from Model B\nfunction reverse(s) {\n  let o = '';\n  for (let i = s.length - 1; i >= 0; i--)\n    o += s[i];\n  return o;\n}\n\`\`\`\n\n**Key Benefit:**\n- Avoids array allocation overhead.`;

    const judge = {
      score1: 9.2,
      score2: 8.5,
      reasoning1: "Model A provides a clean, modern JavaScript approach suitable for most web environments. It follows best practices for developer experience and maintainability.",
      reasoning2: "Model B offers a performance-optimized loop that is better for large data sets, though it's less concise. It's a solid alternative for backend processing.",
      verdict: "Model A wins for its idiomatic clarity and adherence to modern standard JS patterns."
    };

    return {
      id: Date.now().toString(),
      user: prompt,
      solution1,
      solution2,
      judge,
      timestamp: new Date().toISOString()
    };
  }
};
