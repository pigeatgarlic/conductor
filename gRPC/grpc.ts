import * as grpc from "@grpc/grpc-js"
import * as loader from "@grpc/proto-loader"
import { ProtoGrpcType } from "./generated/define"
import { AuthRequest } from "./generated/protobuf/AuthRequest";
import { AuthResult } from "./generated/protobuf/AuthResult";
import { StreamServiceHandlers } from "./generated/protobuf/StreamService";
import { WorkerCommand } from "./generated/protobuf/WorkerCommand";
import { WorkerStatus } from "./generated/protobuf/WorkerStatus";




const exampleServer: StreamServiceHandlers = {
    StreamRequest( call: grpc.ServerDuplexStream<WorkerStatus, WorkerCommand>,) {
		call.metadata.get("authorization")
    },
    Auth(call : grpc.ServerUnaryCall<AuthRequest,AuthResult>){
    }
}

export function getServer(): grpc.Server {
  const packageDefinition = loader.loadSync('./proto/define.proto');
  const proto = (grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown) as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.protobuf.StreamService.service, exampleServer);
  return server;
}