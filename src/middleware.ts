import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value
  const resetPasswordAllowed = request.cookies.get('resetPasswordAllowed')?.value
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(request.nextUrl.pathname)

  // Kiểm tra trang reset-password
  if (request.nextUrl.pathname === '/reset-password') {
    if (!resetPasswordAllowed) {
      return NextResponse.redirect(new URL('/forgot-password', request.url))
    }
    return NextResponse.next()
  }

  // Nếu đã đăng nhập và cố truy cập trang auth -> chuyển về trang chủ
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Nếu chưa đăng nhập và truy cập trang yêu cầu auth -> chuyển về login
  if (!token && !isAuthPage) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/profile',
    '/product-management',
    '/exchange-management',
    '/user-style',
    '/exchange-management',
    '/change-password',
    '/orders-management',
    '/checkout/:orderId',
    '/sell-management',
    '/banking-infor',
    '/packet',
    '/dashboard',
  ],
}
