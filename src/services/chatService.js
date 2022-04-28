import models from '../database/models';

export const addMessage = async (data) => {
  try {
    return models.ChatMessage.create({ ...data });
  } catch (error) {
    return { error };
  }
};

export const getMessages = async (room) => {
  try {
    return models.ChatMessage.findAll({
      where: { room },
      include: [
        {
          model: models.Users,
          attributes: ['firstname', 'lastname']
        }
      ]
    });
  } catch (error) {
    return { error };
  }
};
