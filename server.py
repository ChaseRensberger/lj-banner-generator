from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.get("/")
def read_root():
    subprocess.run(["./execute.sh"])
