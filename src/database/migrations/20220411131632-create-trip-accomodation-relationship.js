module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'trips', // name of Source model
        'accomodationId', // name of the key we're adding 
        {
        
          type: Sequelize.INTEGER,
          references: {
            model: 'accomodations', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
      await queryInterface.addColumn(
        'trips', // name of Source model
        'userId', // name of the key we're adding 
        {
        
          type: Sequelize.UUID,
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    },
  
    async down (queryInterface) {
      await queryInterface.removeColumn(
        'trips', // name of Source model
        'accomodationId' // key we want to remove
      );
      await queryInterface.removeColumn(
        'trips', // name of Source model
        'userId' // key we want to remove
      );
    }
  };