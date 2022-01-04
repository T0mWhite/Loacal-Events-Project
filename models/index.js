const User = require('./User');
const Event = require('./Event');
const Volunteers = require('./Volunteers');

User.belongsToMany(Event, {
    through: {
        model: Volunteers,
        unique: false
    }
});

Event.belongsToMany(User, {
    through: {
        model: Volunteers,
        unique: false
    }
});

// Event.belongsTo(User, {
//     foreignKey: { name: "user_id", as: "hosted_id" }
//    }
// );








// // Users
// User.hasMany(Event, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Event.belongsTo(User, {
//   foreignKey: 'organizer_id'
// });

// // Events
// Event.hasMany(User, {
//   foreignKey: 'volunteer_id',
//   onDelete: 'CASCADE'
// });

// Event.hasMany(Role, {
//   foreignKey: 'required_role',
//   onDelete: 'CASCADE'
// });

// // Roles
// EventPost.belongsTo(User, {
//   foreignKey: 'user_id'
// });


module.exports = { User, Event, Volunteers };
