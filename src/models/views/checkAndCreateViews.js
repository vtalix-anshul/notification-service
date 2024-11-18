const sequelize = require("../../config/db");


async function checkAndCreateViews() {
  const views = [
    {
      name: 'UserPatientView',
      query: `
        CREATE VIEW UserPatientView AS
        SELECT 
          u.id AS user_id,
          u.full_name,
          u.email,
          u.phone,
          u.city,
          u.state,
          u.country,
          u.date_of_birth,
          p.programmes,
          p.total_amount_spent,
          p.therapy_type,
          p.medicine,
          u.status,
          u.about,
          u.role,
        FROM 
          users u
        JOIN 
          patients p ON u.id = p.id;
      `,
    },
    {
      name: 'UserDoctorView',
      query: `
        CREATE VIEW UserDoctorView AS
        SELECT 
            u.id AS user_id,
            d.main_specialization,
            d.expertise,
            d.experience,
            d.is_approved,
            d.price,
            d.discount_on_3_appointments,
            d.discount_on_5_appointments,
            d.total_appointments,
            d.total_appointments_completed,
            d.total_appointments_cancelled,
            d.rating,
            u.full_name,
            u.about,
            u.profile_picture_url,
            u.gender
        FROM 
            doctors d
        JOIN 
            users u ON d.id = u.id;
        `
    },
    // Add more view definitions here
  ];

  for (const view of views) {
    try {
      // Check if the view exists
      const [results] = await sequelize.query(`
        SELECT * 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE()  
        AND table_name = '${view.name}';
      `);
      // If the view doesn't exist, create it
      if (results.length === 0) {
        console.log(`${view.name} does not exist. Creating the view...`);
        await sequelize.query(view.query);
        console.log(`${view.name} has been created successfully.`);
      } else {
        console.log(`${view.name} already exists.`);
      }
    } catch (error) {
      console.error(`Error checking or creating ${view.name}:`, error);
    }
  }
}

module.exports = checkAndCreateViews;
