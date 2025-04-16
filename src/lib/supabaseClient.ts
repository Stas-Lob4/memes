import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kbinsvixyzuvosyzdsph.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaW5zdml4eXp1dm9zeXpkc3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTk0ODIsImV4cCI6MjA2MDM5NTQ4Mn0.waR8v1SfXOaDV77e4BPB3cFtIesV3vx2ujCxpdJiHEI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
