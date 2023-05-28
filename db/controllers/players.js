import { Player } from '../models/index.js';

const playerController = {
  deletePlayerById: async (id, opts = { raw: true }) => {
    const player = await Player.findByPk(id, opts);
    if (!player) {
      throw new Error(`Could not delete. Player ${id} not found`);
    }
    await player.destroy();
    return { message: 'Player deleted successfully' };
  },

  getAllPlayers: async (opts = { raw: true }) => Player.findAll(opts),
  
  getPlayerById: async (id, opts = { raw: true }) => Player.findByPk(id, opts),

  getPlayerByDiscordId: async (discordId, opts = { raw: true }) => await Player.findOne({ where: { discordId } }, opts),
  
  updatePlayerById: async (id, update, opts = { raw: true }) => {
    const player = await Player.findByPk(id, opts);
    if (!player) {
      throw new Error(`Could not update. Player ${id} not found`);
    }
    await player.update(update);
  },

  updatePlayerByDiscordId: async (discordId, update, opts = { raw: true }) => {
    const player = await playerController.getPlayerByDiscordId(discordId, opts);
    if (!player) {
      throw new Error(`Could not update. Player ${id} not found`);
    }
    await player.update(update);
  },

  upsertPlayer: async (playerInput, opts = { raw: true }) => {
    const foundPlayer = await playerController.getPlayerByDiscordId(playerInput.discordId, opts);
    if (!foundPlayer) {
      await Player.create(playerInput);
    } else {
      await foundPlayer.update(playerInput);
    }
  },
}

export default playerController;
