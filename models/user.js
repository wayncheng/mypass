'use strict';
(function(){
	module.exports = function(sequelize, DataTypes) {
		var User = sequelize.define("User", {
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1]
				}
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1],
					isEmail: true
				}
			},
			pw: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1]
				}
			},
			firstname: {
				type: DataTypes.STRING,
				allowNull: true
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: true
			}
		});
		return User;
	};
})();