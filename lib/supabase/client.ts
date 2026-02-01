import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({ select: () => ({ data: [], error: { message: 'Missing Supabase Configuration' } }), insert: () => ({ error: { message: 'Missing Config' } }) }),
        storage: { from: () => ({ upload: () => ({}), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) }
    } as any
