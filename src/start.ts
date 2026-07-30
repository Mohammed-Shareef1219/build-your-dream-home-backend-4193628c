import { createMiddleware, createStart } from '@tanstack/react-start'
import { setResponseHeaders } from '@tanstack/react-start/server'
import { attachSupabaseAuth } from '@/integrations/supabase/auth-attacher'

const securityMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url)

  // Serve .well-known/security.txt from a lightweight inline response
  if (url.pathname === '/.well-known/security.txt') {
    const body = [
      'Contact: mailto:buildyourhom@gmail.com',
      'Contact: tel:+20111639205',
      'Policy: /privacy',
      'Preferred-Languages: en, ar',
      '',
    ].join('\n')

    return new Response(body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  const result = await next()

  // Defense-in-depth headers applied to every SSR / server response
  setResponseHeaders({
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.r2.dev https://*.supabase.co",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-src 'self' https://www.google.com https://accounts.google.com",
      "form-action 'self'",
      "base-uri 'self'",
    ].join('; '),
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  })

  return result
})

export const startInstance = createStart(() => ({
  requestMiddleware: [securityMiddleware],
  functionMiddleware: [attachSupabaseAuth],
}))
