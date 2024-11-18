const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DoctorBankDetails = sequelize.define('DoctorBankDetails', {
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'  
        }
    },
    account_number:{
        type:  DataTypes.STRING,
        allowNull: false,
    },
    account_holder_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ifsc:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps:true,
    tableName: "doctorbankdetails",
    underscored:true,
    // need the indexing for the id
    indexes: [
        {
            unique: true,
            fields: ['id'],
        },
    ],
});

module.exports = DoctorBankDetails;