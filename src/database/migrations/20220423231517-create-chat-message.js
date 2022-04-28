/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('chatMessages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      isUUID: 4,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    room: {
      type: DataTypes.STRING,
      default: 'barefoot',
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 500],
          msg: 'Message should not be empty and not exceed 500 characters'
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('chatMessages');
}
