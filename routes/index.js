import { Router } from 'express';
import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
} from 'discord-interactions';
import promptController from '../db/controllers/prompts.js';
import playerController from '../db/controllers/players.js';
import { createButtons, formatButtonData } from '../utils.js';

const router = Router();

router.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data, member } = req.body;
  console.log(req.body)

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    if (data.name === 'cyoa-start' && id) {
      const { id, username } = member.user;
      const storyId = data.options[0].value;

      // retrieve story to get initialPrompt
      const initialPrompt = await promptController.getInitialPrompt(storyId);
      if (!initialPrompt) {
        console.log(`Could not find initial prompt for story ${storyId}`)
        return res.status(404).json({ error: `Could not find initial prompt for story ${storyId}` });
      }
      // create or update player with their spot in the story (promptId)
      await playerController.upsertPlayer({
        discordId: id,
        name: username || '',
        PromptId: initialPrompt.id,
      })

      const choices = await Promise.all(initialPrompt.choices.map(async(choice) => await promptController.getPromptByGameIndex(storyId, choice)));
      const choiceButtons = createButtons(choices);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: initialPrompt.narrative,
          components: [{
            type: MessageComponentTypes.ACTION_ROW,
            components: choiceButtons
          }],
        },
      });
    }
  } else if (type === InteractionType.MESSAGE_COMPONENT) {
    // custom_id set in payload when sending message component
    const promptId = data.custom_id;
    // user who clicked button
    const discordId = member.user.id;
    // update player's position in the story
    await playerController.updatePlayerByDiscordId(
      discordId,
      { PromptId: promptId },
    )

    // get prompt
    const selectedPrompt = await promptController.getPromptById(promptId);
    const choices = await Promise.all(selectedPrompt.choices.map(async (choice) => await promptController.getPromptByGameIndex(selectedPrompt.StoryId, choice)));
    const choiceButtons = choices && createButtons(choices);
    const returnData = formatButtonData(selectedPrompt.narrative, choiceButtons);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: returnData,
    });
  }
});

export default router;