const createCustomer = `
    INSERT INTO customers (first_name, last_name, address, city, state_abbreviation, zip, email, phone, password, square_feet, date_created, area_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

const checkUserAuth = `SELECT * FROM customers WHERE email = $1`;

const getUsers = `SELECT * FROM customers`;

const getUserById = `
SELECT 
    first_name,
    last_name,
    address,
    city,
    state_abbreviation,
    zip,
    square_feet,
    email,
    phone
FROM customers WHERE customer_id = $1`;

const updateUserByIdPart1 = 'UPDATE customers SET ';
const updateUserByIdPart2 = ' WHERE customer_id = $1';

const selectAllServices = `SELECT * FROM services`;

const getServiceById = `SELECT * FROM services WHERE service_id = $1`;

const getServiceByTargetPest = `
    SELECT DISTINCT
        MIN(services.service_id) AS service_id,
    MIN(services.service_name) AS service_name,
    MIN(services.price_per_square_foot) AS price_per_square_foot,
    MIN(services.billing_type) AS billing_type,
    MIN(services.tier_multiplier) AS tier_multiplier,
    MIN(services.services_per_year) AS services_per_year,
    MIN(services.base_price) AS base_price,
    MIN(services.setup_fee) AS setup_fee,
    MAX(pests.tier) AS pests_tier
    FROM services
    INNER JOIN services_pests 
            ON services.service_id = services_pests.service_id
    INNER JOIN pests
            ON services_pests.pest_name = pests.pest_name
    WHERE pests.pest_name = 'Spiders' OR pests.pest_name = 'Rodents'
    GROUP BY services.service_name;
`;

const getServiceByTargetPestAndServicePart1 = `
    SELECT DISTINCT
        MIN(services.service_id) AS service_id,
        MIN(services.service_name) AS service_name,
        MIN(services.price_per_square_foot) AS price_per_square_foot,
        MIN(services.billing_type) AS billing_type,
        MIN(services.tier_multiplier) AS tier_multiplier,
        MIN(services.services_per_year) AS services_per_year,
        MIN(services.base_price) AS base_price,
        MIN(services.setup_fee) AS setup_fee,
        MAX(pests.tier) AS pests_tier
    FROM services
    INNER JOIN services_pests 
            ON services.service_id = services_pests.service_id
    INNER JOIN pests
            ON services_pests.pest_name = pests.pest_name
    WHERE (`;

const getServiceByTargetPestAndServicePart2 = `
    ) AND services.service_id = $1
    GROUP BY services.service_name;
`

const addServiceToCart = `
    INSERT INTO cart (customer_id, service_id, price, setup_fee, billing_amount, billing_type)
    VALUES ($1, $2, $3, $4, $5, $6);
`;

const getSquareFeet = `SELECT square_feet FROM customers WHERE customer_id = $1`;

const getUserCart = `
    SELECT * 
    FROM cart
    INNER JOIN services
    ON cart.service_id = services.service_id
    WHERE customer_id = $1;    
`

const deleteCartItem = `
    DELETE FROM cart WHERE cart_id = $1;
`

const deleteDuplicateCartItems = `
    DELETE FROM cart
    WHERE customer_id = $1
    AND service_id = $2;
`

const clearCart = `
    DELETE FROM cart WHERE customer_id = $1;
`

const createOrder = `
    INSERT INTO orders (service_id, date_created, customer_id, complete, date_scheduled, price, address, city, state, zip, first_name, last_name) VALUES
    ($1, $2, 4, false, $3, $4, $5, $6, $7, $8, $9, $10);
`

const getAllOrders = `SELECT * FROM orders`;

const getOrderById = `SELECT * FROM orders WHERE order_id = $1`;

const getServiceByTarget = `
SELECT 
    services_pests.service_id,
    services.service_name,
    services.price_per_square_foot,
    services.billing_type,
    services.tier_multiplier,
    services.services_per_year,
    services.base_price,
    services.setup_fee,
    services.img_path,
    services.frequency
FROM services_pests 
INNER JOIN services
ON services_pests.service_id = services.service_id
WHERE pest_name = $1;
`

const getBenefitsByServiceId = `SELECT * FROM benefits WHERE service_id = $1;`

const getTestimonialByServiceId = `SELECT * FROM testimonial WHERE service_id = $1;`

const getPestTier = `SELECT tier FROM pests WHERE pest_name = $1;`

const getCoveredPestsByServiceId = `SELECT pest_name AS pests FROM services_pests WHERE service_id = $1`

const getTargetsForHomePage = `SELECT * FROM pests WHERE include_home = true;`
const getTargetsForWizardPage = `SELECT * FROM pests WHERE include_wizard = true;`

const getServiceImages = `
    SELECT
        service_images.image_id,
        services_service_images.type,
        service_images.path,
        service_images.file_type
    FROM services_service_images
    INNER JOIN service_images
       ON services_service_images.image_id = service_images.image_id
    WHERE services_service_images.service_id = $1
`;

const getCities = `SELECT city FROM areas`;
const getAreaId = `SELECT area_id FROM areas WHERE city = $1`;

const getAvailability = `
SELECT
    routes.route_id,
    routes.route_date,
    areas.area_id,
    routes.tech_id,
    routes.slots_available,
    techs.tech_first_name,
    techs.tech_last_name,
    techs.tech_profile_pic,
    areas.city
FROM routes
INNER JOIN techs
    ON routes.tech_id = techs.tech_id
INNER JOIN areas
    ON techs.tech_id = areas.tech_id
WHERE area_id = $1
    AND route_date >= $2
ORDER BY route_date ASC;`

const getAreaIdByCustomer = `
    SELECT area_id FROM customers WHERE customer_id = $1;
`


module.exports = {
    createCustomer,
    checkUserAuth,
    getUsers,
    getUserById,
    updateUserByIdPart1,
    updateUserByIdPart2,
    selectAllServices,
    getServiceById,
    addServiceToCart,
    getSquareFeet,
    getServiceByTargetPestAndServicePart1,
    getServiceByTargetPestAndServicePart2,
    getUserCart,
    deleteCartItem,
    clearCart,
    createOrder,
    getAllOrders,
    getOrderById,
    getServiceByTarget,
    getBenefitsByServiceId,
    getTestimonialByServiceId,
    getPestTier,
    getCoveredPestsByServiceId,
    getTargetsForHomePage,
    getTargetsForWizardPage,
    getServiceImages,
    getCities,
    getAreaId,
    getAvailability,
    getAreaIdByCustomer,
    deleteDuplicateCartItems
}