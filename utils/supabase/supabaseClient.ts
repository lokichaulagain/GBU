import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wnmdsfcgklevznryhgmp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubWRzZmNna2xldnpucnloZ21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMTc2OTgsImV4cCI6MjAyNzU5MzY5OH0.aPqU-niF_tY7VQifaFsjDtJgLiUqFosYzhUN6lcJKVo";
export const supabase = createClient(supabaseUrl, supabaseKey);
