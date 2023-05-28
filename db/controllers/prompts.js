import { Prompt, Story } from '../models/index.js';

const promptController = {
  createPrompt: async (prompt) => Prompt.create(prompt),
    
  getAllPrompts: async (opts = { raw: true }) => Prompt.findAll({
    ...opts,
    attributes: { include: ['StoryId'] },
  }),
    
  getPromptById: async (id, opts = { raw: true }) => Prompt.findByPk(id, {
    ...opts,
    attributes: { include: ['StoryId'] },
  }),

  getInitialPrompt: async (StoryId, opts = { raw: true }) => Prompt.findOne({ where: { StoryId, gameIndex: 0 } }, {
    ...opts,
    attributes: { include: ['StoryId'] },
  }),

  getPromptByGameIndex: async (StoryId, gameIndex, opts = { raw: true }) => Prompt.findOne({ where: { StoryId, gameIndex } }, {
    ...opts,
    attributes: { include: ['StoryId'] },
  }),
    
  addChoices: async (choices) => Prompt.addChoices(choices),
    
  setChoices: async (choices) => Prompt.setChoices(choices),
    
  updatePromptById: async (id, update, opts = { raw: true }) => {
    const prompt = await Prompt.findByPk(id, {
      ...opts,
      attributes: { include: ['StoryId'] },
    });
      if (!prompt) {
        throw new Error(`Could not update. Prompt ${id} not found`);
      }
      await prompt.update(update);
    },
    
  deletePromptById: async (id, opts = { plain: true }) => {
    const prompt = await Prompt.findByPk(id, {
      ...opts,
      attributes: { include: ['StoryId'] },
    });
      if (!prompt) {
        throw new Error(`Could not delete. Prompt ${id} not found`);
      }
      await prompt.destroy();
    },
}

export default promptController;
