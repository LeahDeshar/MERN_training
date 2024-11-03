from fastapi import FastAPI
import grpc
from concurrent import futures
import service_pb2_grpc
import service_pb2

app = FastAPI()

class Greeter(service_pb2_grpc.MyServiceServicer):
    def SayHello(self, request, context):
        response = service_pb2.HelloResponse()
        response.message = f"Hello, {request.name}!"
        return response
    
    
@app.get("/api/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello, {name}!"}


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_MyServiceServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server running on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
