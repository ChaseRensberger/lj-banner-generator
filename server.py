from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.post("/")
def read_root():
    subprocess.run(["./execute.sh"])
    return "Attempted to Execute"
