/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('email', 'application'),
      defaultValue: 'application'
    },
    category: {
      type: DataTypes.ENUM('created', 'updated', 'status', 'comment'),
      allowNull: false
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'false'
    },
    tripId: {
      type: DataTypes.UUID,
      isUUID: 4,
      references: {
        model: 'trips',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    addedBy: {
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
  await queryInterface.dropTable('notifications');
}
