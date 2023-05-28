import 'dotenv/config';
import storyController from './db/controllers/stories.js';
import promptController from './db/controllers/prompts.js';
import testStory from './stories/test.json' assert { type: 'json' };
async function populateData() {
  try {
    // Create the story
    const story = (await storyController.createStory({ name: testStory.title })).toJSON();
    // Create prompts & set choices for each
    await Promise.all(testStory.prompts.map(async(prompt) => {
      await promptController.createPrompt({ ...prompt, StoryId: story.id });
    }));

    console.log('Data populated successfully.');
  } catch (error) {
    console.error('Error populating data:', error);
  }
}

populateData();
