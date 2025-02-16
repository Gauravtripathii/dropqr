import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/auth';

    const token = request.cookies.get('token')?.value || "";

    // if (isPublicPath && token)
    //     return NextResponse.redirect(new URL('/upload', request.nextUrl));

    if (!isPublicPath && !token)
        return NextResponse.redirect(new URL('/auth', request.nextUrl));

}

export const config = {
    matcher: [
        '/',
        '/auth',
        // '/profile/:path*',
        '/upload',
        // '/verifyemail'
    ]
}