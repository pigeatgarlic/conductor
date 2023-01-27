import * as grpc from "@grpc/grpc-js"
import * as loader from "@grpc/proto-loader"
import { ProtoGrpcType } from "./generated/define"
import { StreamServiceHandlers } from "./generated/protobuf/StreamService";
import { WorkerCommand } from "./generated/protobuf/WorkerCommand";
import { WorkerStatus } from "./generated/protobuf/WorkerStatus";




const exampleServer: StreamServiceHandlers = {
    StreamRequest(call: grpc.ServerDuplexStream<WorkerStatus, WorkerCommand>,) {
		const auth = call.metadata.get("authorization");

		const readLoop = (async (): Promise<void> => {
			while(true) {
				const status = call.read()


			}
		})
		const writeLoop = (async (): Promise<void> => {
			const command = {
				command: null,
				data: null
			}

			while(true) {


				call.write(command);
			}
		})

		readLoop();
		writeLoop();
    },
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