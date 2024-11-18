const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notifications = sequelize.define("Notifications", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'system'
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // 'pending', 'sent', 'failed'
    },
    send_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
    },
    delivery_method: {
        type: DataTypes.STRING,
        allowNull: false, // 'push', 'email', 'sms'
    },
    extra_data: {
        type: DataTypes.JSONB, // Optional data for additional context
        defaultValue: {},
    },
    broadcast:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
});

module.exports = Notifications;