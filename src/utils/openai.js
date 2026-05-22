import OpenAI from 'openai';

const fallbackTasks = (goal) => [
  `[Demo] Analyze goal scope: ${goal || 'Project goal'}`,
  `[Demo] Draft implementation plan`,
  `[Demo] Build and validate core UI flow`,
];

export const decomposeGoalToTasks = async (goal) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackTasks(goal);
  }

  try {
    // Use the OpenAI SDK in browser mode with an environment-provided API key.
    // The model returns concise actionable subtasks that we parse line-by-line.
    const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a project planner. Return 3-6 concise subtasks only, each on a new line without numbering.',
        },
        {
          role: 'user',
          content: `Break this goal into subtasks: ${goal}`,
        },
      ],
      temperature: 0.5,
    });

    const content = completion.choices?.[0]?.message?.content ?? '';
    const tasks = content
      .split('\n')
      .map((line) => line.replace(/^[-\d.)\s]+/, '').trim())
      .filter(Boolean)
      .slice(0, 6);

    return tasks.length >= 3 ? tasks : fallbackTasks(goal);
  } catch {
    return fallbackTasks(goal);
  }
};
