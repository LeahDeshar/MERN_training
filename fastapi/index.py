from fastapi import FastAPI, APIRouter, Request, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

import models, schemas
from database import engine, Base, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool = True
    
# loggin middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"Request: Method -> {request.method} URL -> {request.url} -----------")
    response = await call_next(request)
    return response


def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    db_user = models.User(username=user.username, email=user.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login", response_model=schemas.UserResponse)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    # login functionality with sqlite
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    # if db.query(models.User).filter(models.User.username == user.username).first():
    #     raise HTTPException(status_code=400, detail="Username already taken")
    # if db.query(models.User).filter(models.User.email == user.email).first():
    #     raise HTTPException(status_code=400, detail="Email already registered")
    
    # hashed_password = hash_password(user.password)
    # db_user = models.User(username=user.username, email=user.email, password=hashed_password)
    # db.add(db_user)
    # db.commit()
    # db.refresh(db_user)
    
    return db_user




@router.get("/users/")
def get_users():
    return {"users": ["Alice", "Bob"]}

@app.get("/")
def read_root():
 return {"Hello": "World"}

@app.get("/item/{id}")
def read_one(id: int):
    return {"message": f"path parameter {id}"}

@app.get("/item/")
def read_query(skip: int, limit: int):
    return {"message": f"query data skip:{skip} limit:{limit}"}

@app.post("/create")
def create_post(user: User):
    return {"message": "You've created the post",
            "data": user}

app.include_router(router, prefix="/api/v1")