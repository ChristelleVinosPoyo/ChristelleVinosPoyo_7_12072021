class User {
    constructor(firstname, lastname, email, password, age, picture) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.age = age;
        this.picture = picture;
    }
}

module.exports = User;

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const User = sequelize.define('User', {
//     firstname: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastname: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
//     age: {
//         type: DataTypes.NUMBER
//         // allowNull defaults to true
//     }
//     picture: {
//         type: DataTypes.STRING
//         // allowNull defaults to true
//     }
// }, {
//     tableName: 'users'
// });


console.log(User === sequelize.models.User); // true