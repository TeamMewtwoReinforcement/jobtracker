import dotenv from 'dotenv';
dotenv.config();
import { createClient, SupabaseClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wzhqlyiccgxxhvxdvndq.supabase.co'
const supabaseKey: string  = process.env.SUPABASE_KEY as string
const supabase: SupabaseClient  = createClient(supabaseUrl, supabaseKey)





export default supabase;