import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Needs API to ensure user is of the correct account type
  } else if (request.nextUrl.pathname.startsWith("/sales")) {
    // Needs API to ensure user is of the correct account type
  } else if (request.nextUrl.pathname.startsWith("/distribution")) {
    // Needs API to ensure user is of the correct account type
  } else if (request.nextUrl.pathname.startsWith("/csupport")) {
    // Needs API to ensure user is of the correct account type
  } else {
    return await ensureUserLoggedIn(request);
  }
  return NextResponse.next();
}

/**
 * Handle a request that should be okay for all users logged in
 * @param request The request for restricted content
 * @returns If the request fails, redirect them to the login page,
 * if the request succeeds, move them to the page they requested
 */
const ensureUserLoggedIn = async (request: NextRequest) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/`,
    {
      headers: {
        "Content-type": "application/json",
        Cookie: `${request.cookies}`,
      },
      credentials: "include",
      method: "GET",
    }
  );
  if (res.ok) {
    return NextResponse.next();
  } else {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (request.cookies.has("auth")) {
      response.cookies.delete("auth");
    }
    return response;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/settings", "/favourites", "/checkout", "/orders", "/support"],
};
