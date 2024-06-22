from google_auth_oauthlib.flow import InstalledAppFlow

flow = InstalledAppFlow.from_client_secrets_file(
    "client_secret.json", scopes=["https://www.googleapis.com/auth/youtube"]
)

flow.run_local_server(port=8080, prompt="consent", authorization_prompt_message="")

crendentials = flow.credentials

print(crendentials.to_json())
