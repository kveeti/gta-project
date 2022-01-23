export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export const jwtSecret = process.env.JWT_SECRET || "secret";

export const accessTokenHeaderName = process.env.NEXT_PUBLIC_ACCESS_TOKEN_HEADER_NAME;
export const refreshCookieName = process.env.NEXT_PUBLIC_REFRESH_COOKIE_NAME;
