/* eslint-disable require-jsdoc */

export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('bookings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    accomodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'accomodations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    roomId: {
      type: DataTypes.UUID,
      references: {
        model: 'rooms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.ENUM({
        values: ['booked', 'checkedOut', 'checkedIn']
      }),
      defaultValue: 'booked'
    },
    arrivalDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
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
export async function down(queryInterface) {
  await queryInterface.dropTable('bookings');
}
