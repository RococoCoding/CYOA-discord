'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const story = [{
      id: uuidv4(),
      name: "Test Story",
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    const res = await queryInterface.bulkInsert('Stories', story, { returning: true });
    const prompts = [
      {
        id: uuidv4(),
        choices: [1, 2],
        command: "start",
        gameIndex: 0,
        narrative: "You wake up in a mysterious forest.",
        StoryId: res[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        choices: [3],
        command: "left",
        gameIndex: 1,
        narrative: "You go left.",
        StoryId: res[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        choices: [3],
        command: "right",
        gameIndex: 2,
        narrative: "You go right.",
        StoryId: res[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        choices: queryInterface.sequelize.literal('ARRAY[]::integer[]'),
        command: "end",
        gameIndex: 3,
        narrative: "You are mauled by a bear. Your adventure ends here.",
        StoryId: res[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Prompts', prompts, {});

    console.log('Test story seeded successfully.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stories', {});
    await queryInterface.bulkDelete('Prompts', {});

    console.log('Test story seed reverted successfully.');
  }
};
