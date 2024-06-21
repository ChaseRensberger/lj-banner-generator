import os
import sys

import googleapiclient.discovery
import googleapiclient.errors

from google.oauth2.credentials import Credentials 
from google.auth.transport.requests import Request
from googleapiclient.http import MediaFileUpload

scopes = ["https://www.googleapis.com/auth/youtube"]

def main():

    channel_id = sys.argv[1]

    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
   
    api_service_name = "youtube"
    api_version = "v3"
    credentials = Credentials.from_authorized_user_file('credentials.json')
    if credentials.expired:
        credentials.refresh(Request())
        with open('credentials.json', 'w') as file:
            file.write(credentials.to_json())

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    media = MediaFileUpload('input_banner.jpeg', mimetype='image/jpeg')
    request = youtube.channelBanners().insert(
        media_body=media
    )
    response = request.execute()
    print(response)

    request = youtube.channels().update(
        part='brandingSettings',
        body={
            'id': channel_id,
            'brandingSettings': {
                'image': {
                    'bannerExternalUrl': response['url']
                }
            }
        }

    ).execute()
    response = request.execute()

    print(response)

if __name__ == "__main__":
    main()