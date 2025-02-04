import type { NextRequest } from 'next/server';
import {updateSession} from "@/app/utils/supabase/middleware";

export async function middleware(req: NextRequest) {
    await updateSession(req);
}

export const config = {
  matcher: ['/:path*'], // Asegúrate de que el middleware aplica a todas las rutas
}
