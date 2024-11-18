const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Doctor = require("./Doctor");  // Assuming the Doctor model is already created

const Education = sequelize.define('Education', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto increment for each education record
        allowNull: false,
    },
    doctor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "doctors",  // Reference the Doctor table
            key: 'id',
        },
        onDelete: 'CASCADE',  // Cascade delete if the doctor record is deleted
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false,
        lowercase: true,
    },
    university: {
        type: DataTypes.STRING,
        allowNull: false,
        lowercase: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    file_url: {
        type: DataTypes.STRING,
        // allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    tableName: 'educations',
    indexes: [
        { fields: ['doctor_id'] },  // Index for fast lookups by doctor_id
    ]
});

// Establish the one-to-many relationship between Doctor and Education
Education.belongsTo(sequelize.models.Doctor, { foreignKey: 'doctor_id' });
sequelize.models.Doctor.hasMany(Education, { foreignKey: 'doctor_id' });

module.exports = Education;
