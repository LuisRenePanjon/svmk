import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  console.log('username:', username);
  console.log('password:', password);
  try {
    // Obtiene cookies del lado del servidor
    const cookieStore = await cookies();

    // Crea el cliente de Supabase en el servidor
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    // Intentar login con email y contraseña
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'mariajosesita@minovia.com',  // Suponiendo que el email es generado a partir del username
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error de autenticación:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
