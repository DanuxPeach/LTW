INSERT INTO Categories (category_id, name) VALUES
  (1, 'animals'),
  (2, 'art'),
  (3, 'languages'),
  (4, 'numbers'),
  (5, 'cartoons');

INSERT INTO Video_Category_Relation (relation_id, video_uuid, category_id) VALUES
  (1, 'bd3dddf5-cd88-493a-baee-d46e2449a321', 1),
  (2, '4550befc-0956-480c-aeb7-829045b76ba2', 1),
  (3, 'f96f1455-43b4-4388-aed5-98bc23e187a4', 3),
  (4, 'a5f7e7d1-e461-4be4-896f-0d849f29be84', 3),
  (5, 'f53ba0b6-8f99-4ba2-b5ef-9d0554d5bb77', 3),
  (6, '0f700a82-60c3-4557-9b62-5cd3cec7c369', 4),
  (7, '772ed302-1b29-4b9c-967a-24867ffb4d54', 5),
  (8, '5aa58528-9c3a-46d3-8d41-6e5d7add1d89', 4),
  (9, '69b0e88d-af3d-4f8b-821a-4180a60b2932', 4),
  (10, 'afcf508d-090c-4080-9386-3cf9510e8245', 2),
  (11, '55751ea7-970b-4fa1-a116-04fa85cb6be2', 2),
  (12, 'bcd8de8c-cfe9-47b2-8b67-1c77c15a8ac7', 2),
  (13, 'bcc773c4-3e47-45b5-a0b1-97ef910b936a', 2),
  (14, '0420904d-e681-4656-b9ba-9d2b1fd09a51', 4),
  (15, 'd3baf33c-ea3d-4251-9a57-cb27040a46f1', 4),
  (16, 'eb77514b-327d-48a9-b957-3fdeae2b3274', 5),
  (17, '74eb5823-a856-4153-95ab-be3e1261af5c', 5),
  (18, '9aa3e8e4-9f82-4025-99d2-07afecdc8b59', 1),
  (19, '74eb5823-a856-4153-95ab-be3e1261af5c', 1),
  (20, '55751ea7-970b-4fa1-a116-04fa85cb6be2', 1),
  (21, 'bcd8de8c-cfe9-47b2-8b67-1c77c15a8ac7', 1);
