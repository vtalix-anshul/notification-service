const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DoctorSlots = sequelize.define('DoctorSlots', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        // allowNull: false,
    },
    doctor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    slots: {
        type: DataTypes.JSON, 
        allowNull: false,
    }
    // the slots object will look something like this
    /* 
        id,
        startTime,
        endTime,
        patientId, // if patient has blocked the slot,
        bookedUntil, // if patient has booked the slot, this will be the date until which the slot is booked which will at most be 15 mins
        appointmentId: if the slot is booked, the appointment id will be stored here and the slot will be unavailable for other users.
    */
}, {
    timestamps: true,
    underscored: true,
    tableName: 'doctorslots',
    indexes: [
        { fields: ['doctor_id'] },             // Index for faster queries by doctor
        { fields: ['date'] },                  // Index for faster queries by date
        { fields: ['id'] },                    // Index for querying by slot ID
        { fields: ['doctor_id', 'date'], unique: true }, // Composite index for doctor/date
    ]
});

DoctorSlots.beforeCreate(async (slot)=>{
    console.log("im here");
    // find the last slot created.
    const lastSlot = await DoctorSlots.findOne({order: [['id', 'DESC']]});
    console.log("last wala h: ", lastSlot);
    // if last slot exists, increment the id by 1
    const lastSlotId = lastSlot ? parseInt(lastSlot.id.split('_')[2]) : 0;
    slot.id = `vtalix_slot_${lastSlotId + 1}`;
    console.log('im done, new id is ', slot.id);
});

module.exports = DoctorSlots;
