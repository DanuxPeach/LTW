import os
import uuid
import datetime

project_root = os.path.dirname(os.path.abspath(__file__))
video_folder = os.path.join(project_root, 'Backend', 'public', 'videos')

# Open the SQL file for writing with explicit encoding
sql_file = open('addtovideos.sql', 'w', encoding='utf-8')

for filename in os.listdir(video_folder):
    if filename.endswith('.mkv') or filename.endswith('.mp4'):
        video_uuid = str(uuid.uuid4())
        title = os.path.splitext(filename)[0]
        description = 'Video Description'  
        upload_date = datetime.datetime.now().date()
        thumbnail_url = 'public\\thumbnails\\'
        video_url = 'public\\videos\\' + filename

        # Generate the SQL statement and write it to the file
        sql_statement = f"INSERT INTO Videos (video_uuid, title, description, upload_date, duration, thumbnail_url, video_url) " \
                        f"VALUES ('{video_uuid}', '{title.replace('\'', '\'\'')}', '{description.replace('\'', '\'\'')}', " \
                        f"'{upload_date}', '{thumbnail_url.replace('\\', '\\\\')}', " \
                        f"'{video_url.replace('\\', '\\\\')}');\n"
        sql_file.write(sql_statement)

# Close the SQL file
sql_file.close()