/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('comments', {
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
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
      isUUID: 4,
      references: {
        model: 'trips',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 500],
          msg: 'Comment has to be between 3 or 500 characters'
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
  await queryInterface.dropTable('comments');
}
