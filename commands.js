import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';
import storyController from './db/controllers/stories.js';

// Get the story choices from game.js
async function createCommandChoices() {
  const storyChoices = await storyController.getAllStories();
  return storyChoices.map((story) => {
    return { name: story.name, value: story.id }
  });
}
// Command containing options
const START_STORY = {
  name: 'cyoa-start',
  description: 'Start',
  options: [
    {
      type: 3,
      name: 'stories',
      description: 'Pick a story',
      required: true,
      choices: await createCommandChoices(),
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [START_STORY];
console.log('installing commands', ALL_COMMANDS);
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);