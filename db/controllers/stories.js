import { Story } from '../models/index.js';
const storyController = {
  createStory: async (story) => Story.create(story),

  getAllStories: async (opts = { raw: true }) => Story.findAll(opts),

  getStoryById: async (id, opts = { raw: true }) => Story.findByPk(id, opts),

  setInitialPrompt: async (prompt) => Story.setInitialPrompt(prompt),

  updateStoryById: async (id, update, opts = { raw: true }) => {
    const story = await Story.findByPk(id, opts);
    if (!story) {
      throw new Error(`Could not update. Story ${id} not found`);
    }
    await story.update(update);
  },

  deleteStoryById: async (id, opts = { raw: true }) => {
    const story = await Story.findByPk(id, opts);
    if (!story) {
      throw new Error(`Could not delete. Story ${id} not found`);
    }
    await story.destroy();
  },
}

export default storyController;
