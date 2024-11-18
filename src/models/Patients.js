const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Patients = sequelize.define('Patient', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    programmes: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    coupons: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    favorite_doctors: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    is_permitted: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    pending_request: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    total_amount_spent: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        // Add indexing in options
        indexes: [{ unique: false, fields: ['total_amount_spent'] }]
    },
    therapy_type: {
        type: DataTypes.ENUM('individual', 'couples', 'teens'),
        allowNull: true,
        // Add indexing in options
        indexes: [{ unique: false, fields: ['therapy_type'] }]
    },
    medicine: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    timestamps: true,
    underscored: true,
    tableName: 'patients',
    indexes: [
        { fields: ['therapy_type'] }, // Global index for therapy_type
        { fields: ['total_amount_spent'] } // Global index for total_amount_spent
    ]
});

// Optionally, you can add hooks for data manipulation or validation

module.exports = Patients;
