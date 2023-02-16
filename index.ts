import * as grpc from "@grpc/grpc-js"
import {getServer} from "./gRPC/grpc"
import * as dotenv from 'dotenv' 
import { TurnServer } from "edge-turn/dist/index"
dotenv.config()

const CLIENT_ID     = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const prod = true

const LOCAL_ANON_KEY = process.env.SUPABASE_LOCAL_ANON_KEY
const ANON_KEY = process.env.SUPABASE_ANON_KEY

const URL      = process.env.SUPABSE_REGISTER_URL
const PORT_TURN = 3478
const PORT_GRPC = 9090

const startturn = async () => {
    const ip = await (await fetch('http://api.ipify.org/')).text();
    const resp = await fetch(prod ? URL : 'http://localhost:54321/functions/v1/',{
        method: "POST",
        headers: {
            'Authorization': `Bearer ${prod ? ANON_KEY : LOCAL_ANON_KEY}`,
            'Content-Type': 'application/json',
            'client_id' : CLIENT_ID,
            'client_secret' : CLIENT_SECRET
        },
        body: JSON.stringify({
            public_ip:    ip,
            turn_port:   PORT_TURN
        })       
    })

    if(resp.status != 200) {
        console.log(`error ${await resp.text()}`)
        return;
    }


    const {username,password} = await resp.json()
    const turn = new TurnServer(username,password,PORT_TURN,(log) => {
        console.log(`message from turn server : ${log}`)
    });
    await turn.Start()
}


const host = `0.0.0.0:${PORT_GRPC}`;
const server = getServer();

startturn()
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