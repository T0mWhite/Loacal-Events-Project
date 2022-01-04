const sequelize = require('../config/connection');
const { User, Event } = require('../models');

const userData = require('./user.json');
const eventData = require('./event.json');


const seedDatabase = async () => {
  await console.log(userData);
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const user of userData) {
  //   await User.create({
  //     ...user,
  //     user_id: [Math.floor(Math.random() * userData.length)],
  //   });
  // }

  for (const event of eventData) {
    await Event.create({
      ...event,
      event_id: [Math.floor(Math.random() * eventData.length)],
    });
  }

  process.exit(0);
};

seedDatabase();
