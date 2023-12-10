SELECT DISTINCT v.video_uuid, v.title, v.thumbnail_url, v.video_url
    FROM Videos v
    WHERE v.title LIKE CONCAT('%', (SELECT title FROM Videos WHERE video_uuid = '4550befc-0956-480c-aeb7-829045b76ba2'), '%');

SELECT *
FROM Videos
WHERE MATCH(title) AGAINST(
    (SELECT title FROM Videos WHERE video_uuid = '4550befc-0956-480c-aeb7-829045b76ba2')
    IN NATURAL LANGUAGE MODE);

