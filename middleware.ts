import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { determinePageStage } from './app/_lib/page-stage-util'

export function middleware(request: NextRequest) {
  const request_time = new Date()
  const current_stage_at_request_time = determinePageStage(request_time);

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-page-stage', current_stage_at_request_time?.stage || 'default')

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
