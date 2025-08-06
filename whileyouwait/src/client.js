import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://dxegpultntthcpmhcsqb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4ZWdwdWx0bnR0aGNwbWhjc3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzM5ODcsImV4cCI6MjA3MDAwOTk4N30.5fwFVHKFF_MbRxDucg-ias7a5kN4HL73Dy03izb_dV0'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;