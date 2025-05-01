import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // if (path === '/auth' && request.cookies.get('next-auth.session-token')?.value) {
    //     setTimeout(() => {
    //         console.log("Redirecting now...");
    //     }, 1000);
    //     return NextResponse.redirect(new URL('/upload', request.nextUrl));
    // }

    const isPublicPath = path === '/' || path === '/auth' || path === '/contact-us';

    const token = request.cookies.get('next-auth.session-token')?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;

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
        "/contact-us",
    ]
}