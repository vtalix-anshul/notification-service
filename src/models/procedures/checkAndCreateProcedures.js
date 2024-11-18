const sequelize = require("../../config/db");

async function checkAndCreateProcedures() {
    const procedures = [
        {
            name: "updateDoctorDetails",
            type: "PROCEDURE",
            query: `

                CREATE PROCEDURE updateDoctorDetails(
                    IN userId VARCHAR(255),
                    IN full_name VARCHAR(255),
                    IN city VARCHAR(255),
                    IN state VARCHAR(255),
                    IN country VARCHAR(255),
                    IN zip VARCHAR(20),
                    IN gender VARCHAR(10),
                    IN expertise JSON,
                    IN main_specialization VARCHAR(255),
                    IN experience INT,
                    IN about VARCHAR(255),
                    IN clinic_address_complete TEXT,
                    IN clinic_phone VARCHAR(20),
                    IN registration_number VARCHAR(50),
                    IN registration_council VARCHAR(255),
                    IN registration_year YEAR,
                    OUT result BOOLEAN,
                    OUT error_msg TEXT
                )
                BEGIN
                    DECLARE EXIT HANDLER FOR SQLEXCEPTION
                    BEGIN
                        ROLLBACK;
                        SET result = FALSE;
                        SET error_msg = "An error occurred during the transaction.";
                    END;

                    START TRANSACTION;

                    UPDATE users
                    SET 
                        full_name = IF(full_name IS NOT NULL, full_name, users.full_name),
                        city = IF(city IS NOT NULL, city, users.city),
                        state = IF(state IS NOT NULL, state, users.state),
                        country = IF(country IS NOT NULL, country, users.country),
                        zip = IF(zip IS NOT NULL, zip, users.zip),
                        gender = IF(gender IS NOT NULL, gender, users.gender),
                        about = IF(about IS NOT NULL, about, users.about)
                    WHERE id = userId;

                    IF (SELECT COUNT(*) FROM doctors WHERE id = userId) = 0 THEN
                        INSERT INTO doctors (
                            id, main_specialization, expertise, experience, clinic_address_complete, 
                            clinic_phone, registration_number, registration_council, registration_year
                        ) VALUES (
                            userId, main_specialization, expertise, experience, clinic_address_complete, 
                            clinic_phone, registration_number, registration_council, registration_year
                        );
                    ELSE
                        UPDATE doctors
                        SET 
                            main_specialization = IF(main_specialization IS NOT NULL, main_specialization, doctors.main_specialization),
                            expertise = IF(expertise IS NOT NULL, expertise, doctors.expertise),
                            experience = IF(experience IS NOT NULL, experience, doctors.experience),
                            clinic_address_complete = IF(clinic_address_complete IS NOT NULL, clinic_address_complete, doctors.clinic_address_complete),
                            clinic_phone = IF(clinic_phone IS NOT NULL, clinic_phone, doctors.clinic_phone),
                            registration_number = IF(registration_number IS NOT NULL, registration_number, doctors.registration_number),
                            registration_council = IF(registration_council IS NOT NULL, registration_council, doctors.registration_council),
                            registration_year = IF(registration_year IS NOT NULL, registration_year, doctors.registration_year)
                        WHERE id = userId;
                    END IF;

                    COMMIT;
                    SET result = TRUE;
                    SET error_msg = NULL;
                END;
            `
        }
    ];

    for (const procedure of procedures) {
        try {
            // Check if the procedure already exists in the database
            const [results] = await sequelize.query(`
                SELECT * 
                FROM information_schema.routines
                WHERE routine_schema = DATABASE()
                AND routine_name = '${procedure.name}';
            `);

            // If the procedure doesn't exist, create it
            if (results.length === 0) {
                const check = await sequelize.query(procedure.query);
                console.log("Procedure created:", check);  
                console.log(`Creating procedure ${procedure.name}`);
            } else {
                console.log(`Procedure ${procedure.name} already exists`);
            }
        } catch (err) {
            console.log("Error in procedures:", err);
        }
    }
}

module.exports = checkAndCreateProcedures;
