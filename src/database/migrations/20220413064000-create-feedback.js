/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('feedbacks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    feedback: {
      type: DataTypes.STRING,
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
    accomodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'accomodations',
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
export async function down(queryInterface, DataTypes) {
  await queryInterface.dropTable('feedbacks');
}
