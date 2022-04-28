/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('users_notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    isAllowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'false'
    },
    type: {
      type: DataTypes.ENUM('email', 'application'),
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      isUUID: 4,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
export async function down(queryInterface) {
  await queryInterface.dropTable('users_notifications');
}
