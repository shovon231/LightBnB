SELECT r.id, p.title, r.start_date, p.cost_per_night, AVG(rv.rating) AS average_rating
FROM reservations r
JOIN properties p ON r.property_id = p.id
LEFT JOIN property_reviews rv ON r.id = rv.reservation_id
WHERE r.guest_id = 1
GROUP BY r.id, p.title, r.start_date, p.cost_per_night
ORDER BY r.start_date
LIMIT 10;