import sequelize from '../connection.js';
import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';

const Story = sequelize.define('Story', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  discordId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Prompt = sequelize.define('Prompt', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  command: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  narrative: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  gameIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  choices: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

Prompt.hasOne(Player);
Prompt.belongsTo(Story);
export { Story, Player, Prompt };
