/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable import/no-import-module-exports */

'use strict';

import * as ApplicationError from '../../utils/errors/applicationsErrors';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'trips',
        [
          {
            id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
            departure: 'Huye',
            destination: 'Rwamagana',
            dateOfTravel: new Date(),
            dateOfReturn: new Date(),
            travelReason: "I am traveling for fun",
            accomodationId: 3,
            userId:"b66cfc7c-be2c-41f5-b459-e888bfe881a6",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'b66cfc7c-be2c-41f5-b459-e888bfe881b9',
            departure: 'Muhanga',
            destination: 'Kigali',
            dateOfTravel: new Date(),
            dateOfReturn: new Date(),
            travelReason: "I am traveling on business",
            accomodationId: 2,
            userId:"b66cfc7c-be2c-41f5-b459-e888bfe881a6",
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
    } catch (error) {
        console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trips', null, {});
  }
};