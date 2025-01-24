from fastapi import FastAPI, APIRouter, Request, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Depends, HTTPException
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from database import engine, Base, get_db
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
import models, schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool = True
    
# logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"Request: Method -> {request.method} URL -> {request.url} -----------")
    response = await call_next(request)
    return response




def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = verify_access_token(token)
    user = db.query(models.User).filter(models.User.email == payload.get("sub")).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user    
    
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
    
    return JSONResponse(content={"message": "User registered successfully", "user": db_user})

@router.post("/login", response_model=schemas.UserResponse)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
   
   
    
    access_token = create_access_token(data={"sub": db_user.email})
    return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})



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