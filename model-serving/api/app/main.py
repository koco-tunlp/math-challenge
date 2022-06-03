from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from app.model import Model

class Message(BaseModel):
    problem: str

app = FastAPI()
model = Model()

origins = [
    "http://math-challenge.wetov.io",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def read_root():
    return { "status": "up" }

@app.post("/generate")
async def generate(message: Message):
    generated = model.generate(message.problem)
    return generated
