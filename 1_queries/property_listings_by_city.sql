SELECT p.id, p.title, p.cost_per_night, AVG(r.rating) AS average_rating
FROM properties p
JOIN property_reviews r ON p.id = r.property_id
WHERE p.city = 'Vancouver' AND r.rating >= 4
GROUP BY p.id, p.title, p.cost_per_night
ORDER BY p.cost_per_night ASC;