import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n.config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const { referer } = negotiatorHeaders;

  const defaultUrl = referer?.split(":")[2].split("/")[1];

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, defaultUrl);

  switch (defaultUrl) {
    case "en":
      return locales[0];
    case "kr":
      return locales[1];
  }

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // locale : en , ko
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    if (pathname.length > 1) {
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}/1`,
        request.url
      )
    );
  }
}

//
// // export const config = {
// //   // Matcher ignoring `/_next/` and `/api/`
// //   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// // };

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'kr'],
//
//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: 'en',
//   localePrefix: 'always',
// });

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)

  // matcher: ["/en/:path*, '/kr/:path*'"],
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/en/:path*",
    "/ko/:path*",
  ],
};
