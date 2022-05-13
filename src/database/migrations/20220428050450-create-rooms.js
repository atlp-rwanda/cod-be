/* eslint-disable require-jsdoc */
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('rooms', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    roomNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM({
        values: ['available', 'booked']
      }),
      defaultValue: 'available'
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
  await queryInterface.dropTable('rooms');
}
