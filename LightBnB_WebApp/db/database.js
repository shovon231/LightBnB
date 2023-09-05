const { Pool } = require("pg");

// Create a new pool for connecting to the PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

/// Users

/**
 * Helper function for executing database queries.
 * @param {string} sql - SQL query string
 * @param {Array} params - Array of query parameters
 * @returns {Promise} A Promise that resolves with the query result or rejects with an error.
 */
const queryDatabase = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool
      .query(sql, params)
      .then((result) => resolve(result.rows))
      .catch((err) => {
        console.error("Error:", err.message);
        reject(err);
      });
  });
};

/**
 * Get a single user from the database given their email.
 * @param {string} email - The email of the user.
 * @returns {Promise} A promise that resolves to the user or null if not found.
 */
const getUserWithEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = $1";
  const params = [email];

  const result = await queryDatabase(sql, params);

  return result.length > 0 ? result[0] : null;
};

/**
 * Get a single user from the database given their id.
 * @param {string} id - The id of the user.
 * @returns {Promise} A promise that resolves to the user or null if not found.
 */
const getUserWithId = async (id) => {
  const sql = "SELECT * FROM users WHERE id = $1";
  const params = [id];

  const result = await queryDatabase(sql, params);

  return result.length > 0 ? result[0] : null;
};

/**
 * Add a new user to the database.
 * @param {object} user - An object containing user information.
 * @returns {Promise} A promise that resolves to the newly added user.
 */
const addUser = async (user) => {
  const sql =
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
  const params = [user.name, user.email, user.password];

  const result = await queryDatabase(sql, params);

  return result[0];
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id - The id of the user.
 * @param {number} limit - The maximum number of reservations to retrieve.
 * @returns {Promise} A promise that resolves to an array of reservations.
 */
const getAllReservations = (guest_id, limit = 10) => {
  const queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `;
  const values = [guest_id, limit];
  return queryDatabase(queryString, values);
};

/**
 * Get all properties based on query options.
 * @param {object} options - An object containing query options.
 * @param {number} limit - The maximum number of properties to retrieve.
 * @returns {Promise} A promise that resolves to an array of properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    FULL OUTER JOIN property_reviews ON properties.id = property_id 
    WHERE 1=1
  `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += ` AND properties.owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    //console.log("minimum", options.minimum_price_per_night);
    queryParams.push(options.minimum_price_per_night * 100); // Convert dollars to cents
    queryString += ` AND cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100); // Convert dollars to cents
    queryString += ` AND cost_per_night <= $${queryParams.length}`;
  }
  queryString += `
    GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  return queryDatabase(queryString, queryParams);
};

/**
 * Add a property to the database
 * @param {object} property - An object containing all of the property details.
 * @returns {Promise} A promise that resolves to the added property.
 */
const addProperty = function (property) {
  return new Promise((resolve, reject) => {
    const {
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms,
    } = property;

    // Parameterized queries to avoid SQL injection
    const query = {
      text: `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
             RETURNING *;`,
      values: [
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night * 100,
        street,
        city,
        province,
        post_code,
        country,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms,
      ],
    };

    pool
      .query(query)
      .then((result) => {
        // The saved property will be returned as a part of the 'result' object
        const savedProperty = result.rows[0];
        resolve(savedProperty);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
