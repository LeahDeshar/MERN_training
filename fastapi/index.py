from fastapi import FastAPI,APIRouter,Request,HTTPException,status, Depends
from pydantic import BaseModel,EmailStr
from sqlalchemy.orm import Session
app = FastAPI()
router = APIRouter()


class User(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool = True

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"Request: Method -> {request.method} URL -> {request.url} -----------")
    response = await call_next(request)
    return response



class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

@app.post("/register")
async def register_user(user: RegisterRequest, db: Session = Depends(get_db)):
    try:
        username = user.username
        email = user.email
        password = user.password

        find_email = db.query(Users).filter(Users.email == email).first()
        if find_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )

        # Create a new user
        new_user = Users(username=username, email=email, password=password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "msg": "User created successfully",
            "success": True,
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email,
            }
        }

    except HTTPException as e:
        raise e  # Re-raise known HTTP exceptions
    except Exception as e:
        # Log the error and return a generic error message
        print(f"Error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error"
        )









@router.get("/users/")
def get_users():
    return {"users": ["Alice", "Bob"]}


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/item/{id}")
def read_one(id:int):
    return {"message": f"path parameter {id}"}


@app.get("/item/")
def read_query(skip:int,limit:int):
    return {"message": f"query data skip:{skip} limit:{limit}"}


@app.post("/create")
def create_post(user: User):
    return {"message": "You've created the post",
            "data": user}
    
    
    
    
app.include_router(router, prefix="/api/v1")
