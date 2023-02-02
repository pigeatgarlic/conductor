import * as grpc from "@grpc/grpc-js"
import * as loader from "@grpc/proto-loader"
import { SessionClient } from "../supabase/supabase";
import { Queue } from "../utils/queue";
import { ProtoGrpcType } from "./generated/define"
import { ICE } from "./generated/protobuf/ICE";
import { SDP } from "./generated/protobuf/SDP";
import { SignalingHandlers } from "./generated/protobuf/Signaling";
import { SignalingMessage } from "./generated/protobuf/SignalingMessage";




const signalingServer: SignalingHandlers = {
    async handshake(call: grpc.ServerDuplexStream<SignalingMessage, SignalingMessage>,) {
		const auth = call.metadata.get("authorization").at(0);
		const claims = Buffer.from(typeof auth == "string" ? auth:auth.toString(), 'base64').toString('utf8')

		const {
			session_key,
			refresh_key,
			session_id 
		} = JSON.parse(claims)

		const sdp_queue : Queue<SDP> = new Queue<SDP>()
		const ice_queue : Queue<ICE> = new Queue<ICE>()
			
		const {c,e} = await new SessionClient(
			async (from_id: number, sdp: SDP) => {sdp_queue.enqueue(sdp)},
			async (from_id: number, ice: ICE) => {ice_queue.enqueue(ice)},
			async (from_id: number) => {},
			async (from_id: number) => {},
		).Register(refresh_key,session_key,session_id)

		if (e != null) {
			console.log(`error register client ${e.message}`)
			return
		}


		const readLoop = (async (): Promise<void> => {
			while(true) {
				const status = call.read()


			}
		})
		const writeICELoop = (async (): Promise<void> => {
			while(true) {
				let ice = await ice_queue.dequeue()

				call.write({
					type: "ICE",
					ice: ice,
				})
			}
		})
		const writeSDPLoop = (async (): Promise<void> => {
			while(true) {
				let sdp = await sdp_queue.dequeue()

				call.write({
					type: "SDP",
					sdp: sdp,
				})
			}
		})

		readLoop();
		writeSDPLoop();
		writeICELoop();
		await c.Exited()
    },
}

export function getServer(): grpc.Server {
	const packageDefinition = loader.loadSync('./proto/define.proto');
	const proto = (grpc.loadPackageDefinition(
		packageDefinition
	) as unknown) as ProtoGrpcType;
	const server = new grpc.Server();
	server.addService(proto.protobuf.Signaling.service, signalingServer);
	return server;
}