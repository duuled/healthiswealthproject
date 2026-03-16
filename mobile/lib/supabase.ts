import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kagjweasrjvxxjptulvp.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZ2p3ZWFzcmp2eHhqcHR1bHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNjM2NjQsImV4cCI6MjA3NzkzOTY2NH0.MoNgaiJ5Cr-eqxxYmm6lhWygoYHwrpHUDvFaaDwIFXg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
