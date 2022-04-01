/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('ratings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accomodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accomodations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    serviceRating: {
      type: DataTypes.INTEGER
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
  await queryInterface.dropTable('ratings');
}
