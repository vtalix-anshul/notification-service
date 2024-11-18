const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appointments = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    doctor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "doctors",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointment_type: {
      type: DataTypes.ENUM("individual", "teen", "couple"),
    },
    appointment_status: {
      type: DataTypes.ENUM(
        "scheduled",
        "rescheduled",
        "completed",
        "cancelled"
      ),
      defaultValue: "scheduled",
    },
    previous_doctor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancelled_on: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    cancellation_reason: {
      type: DataTypes.STRING,
    },
    appointment_description: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointment_medium: {
      type: DataTypes.ENUM("video", "audio", "chat"),
      defaultValue: "video",
    },
    doctor_completed_appointment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    patient_completed_appointment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    feedback_description: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    summary: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "appointments",
    indexes: [
        { fields: ["patient_id"] },           // Index for fetching appointments by patient
        { fields: ["doctor_id"] },            // Index for fetching appointments by doctor
        { fields: ["date"] },                 // Index for fetching appointments by date
        { fields: ["appointment_status"] },   // Index for filtering appointments by status (scheduled, cancelled, etc.)
        { fields: ["is_active"] },            // Index for querying active/inactive appointments
        { fields: ["start_time"] },           // Index for sorting/filtering by appointment start time
        { fields: ["end_time"] },             // Index for sorting/filtering by appointment end time
        { fields: ["patient_id", "doctor_id"] },  // Composite index for fetching appointments for a specific patient and doctor
    ],
  }
);

Appointments.beforeCreate(async (appointment) => {
    // Find the last appointment by createdAt in descending order
    const lastAppointment = await Appointments.findOne({ order: [['createdAt', 'DESC']] });

    // Extract the last appointment's numeric part of the ID, or start from 0 if no appointments found
    const lastAppointmentId = lastAppointment ? parseInt(lastAppointment.id.split('_')[2]) : 0;

    // Increment and assign the new appointment ID with the required format
    appointment.id = `vtalix_appointment_${lastAppointmentId + 1}`;
});



module.exports = Appointments;
