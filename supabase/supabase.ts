import { createClient, SupabaseClient } from "@supabase/supabase-js"


export interface EventHandler {
    (data : string):void
}


export class Supabase {
    supabase : SupabaseClient

    public HandlerCount : number
    handleWorkerEvent : Map<number,EventHandler>

    constructor() {
        this.HandlerCount = 0;
        this.handleWorkerEvent = new Map<number,EventHandler>();
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY
        )
    }


    public RegisterHandler(handler: EventHandler): void {
        this.HandlerCount++
        this.handleWorkerEvent.set(this.HandlerCount,handler);
    }
}