import * as grpc from "@grpc/grpc-js"
import {getServer} from "./gRPC/grpc"
import * as dotenv from 'dotenv' 
dotenv.config()


const host = '0.0.0.0:9090';
const server = getServer();
server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
        if (err) {
            console.error(`Server error: ${err.message}`);
        } else {
            console.log(`Server bound on port: ${port}`);
            server.start();
        }
    }
);