import { createClient, Session, SupabaseClient, User } from "@supabase/supabase-js"
import { CHANNEL_STATES }  from "@supabase/realtime-js/dist/main/lib/constants"
import { ICE } from "../gRPC/generated/protobuf/ICE";
import { SDP } from "../gRPC/generated/protobuf/SDP";




export class SessionClient {
    public Exited : () => Promise<void>
    private shouldExit : boolean

    private supabase : SupabaseClient
    private User : User
    private Session : Session
    private session_id : number
    private MessageCount : number

    SDPCallback:   (from_id: number, message: SDP) => (void);
    ICECallback:   (from_id: number, message: ICE) => (void);
    STARTCallback: (from_id: number) => (void);
    ENDCallback:   (from_id: number) => (void);

    constructor (SDPCallback:   (from_id: number, message: SDP) => (Promise<void>),
                 ICECallback:   (from_id: number, message: ICE) => (Promise<void>),
                 STARTCallback: (from_id: number) => (Promise<void>),
                 ENDCallback:   (from_id: number) => (Promise<void>))
    {
        this.shouldExit = false
        this.MessageCount = 0;
        this.ENDCallback = ENDCallback
        this.STARTCallback = STARTCallback
        this.ICECallback = ICECallback
        this.SDPCallback = SDPCallback
        this.Exited = async () => {
            while (!this.shouldExit) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    async Register (refresh_key: string, session_key: string, session_id: number) : Promise<{c:SessionClient,e:null} | {c:null,e:Error}>{
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY
        )

        const {data:{user,session},error} = await this.supabase.auth.setSession({
            access_token: session_key,
            refresh_token: refresh_key
        })

        if (error != null) {
            return {c:null,e:error}
        }

        this.User = user
        this.Session = session
        this.session_id = session_id

        this.syncLoop()
        return {c:this,e:null}
    }

    async syncLoop() : Promise<void>{
        const messageListener = this.supabase.channel('db-changes')
        .on<{
            from_id       : number
            message_type  : 'SDP'| 'ICE'| 'START'| 'END'
            message       : any
        }>( 'postgres_changes',
            { 
                event: 'INSERT', 
                schema: 'public', 
                table: 'session_mail',
                filter: `to_id=eq.${this.session_id}`
            }, (payload) => {
                const {
                    from_id,
                    message_type,
                    message,
                } = payload.new

                this.MessageCount++
                switch (message_type) {
                    case 'ICE':
                        let ice : ICE = message
                        this.ICECallback(from_id,ice)
                        break;
                    case 'SDP':
                        let sdp: SDP = message
                        this.SDPCallback(from_id,sdp)
                        break;
                    case 'START':
                        this.STARTCallback(from_id)
                        break;
                    case 'END':
                        this.ENDCallback(from_id)
                        break;
                }
        }).subscribe()

        while ( (messageListener.state == CHANNEL_STATES.closed) ||
                (messageListener.state == CHANNEL_STATES.errored) ) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        this.shouldExit = true
    }

}