import { defineMiddleware } from "astro/middleware";
import { createClient } from "@supabase/supabase-js";

const PROTECTED_PREFIXES = ["/admin/dashboard", "/admin/articles", "/admin/uploads", "/admin/messages", "/admin/statistics"];

function supabaseServer() {
  return createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = decodeURI(context.url.pathname);

  if (pathname.startsWith("/api/auth/")) return next();

  const isAdminApi = pathname.startsWith("/api/admin/");

  const isProtected = isAdminApi || PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return next();

  const access = context.cookies.get("sb-access-token")?.value;
  const refresh = context.cookies.get("sb-refresh-token")?.value;

  if (!access && !refresh) return context.redirect("/admin/");

  const supabase = supabaseServer();

  const cookieBase = {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: import.meta.env.PROD,
  };

  if (access) {
    try {
      const { data, error } = await supabase.auth.getClaims(access);

      if (!error && data) {
        context.locals.claims = data.claims;
        return next();
      }

      if (error && !error.message.includes("JWT has expired")) {
        context.cookies.delete("sb-access-token", { path: "/" });
        context.cookies.delete("sb-refresh-token", { path: "/" });
        return context.redirect("/admin/");
      }

    } catch (e: any) {
      if (!String(e?.message ?? "").includes("JWT has expired")) {
        context.cookies.delete("sb-access-token", { path: "/" });
        context.cookies.delete("sb-refresh-token", { path: "/" });
        return context.redirect("/admin/");
      }
    }
  }

  if (!refresh) {
    context.cookies.delete("sb-access-token", { path: "/" });
    return context.redirect("/admin/");
  }

  const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession({
    refresh_token: refresh,
  });

  if (refreshError || !refreshed?.session) {
    context.cookies.delete("sb-access-token", { path: "/" });
    context.cookies.delete("sb-refresh-token", { path: "/" });
    return context.redirect("/admin/");
  }

  context.cookies.set("sb-access-token", refreshed.session.access_token, {
    ...cookieBase,
    maxAge: 60 * 60 * 24 * 30,
  })
  context.cookies.set("sb-refresh-token", refreshed.session.refresh_token, {
    ...cookieBase,
    maxAge: 60 * 60 * 24 * 30,
  });

  const { data: claims2, error: claims2Error } = await supabase.auth.getClaims(
    refreshed.session.access_token
  );

  if (claims2Error || !claims2) {
    context.cookies.delete("sb-access-token", { path: "/" });
    context.cookies.delete("sb-refresh-token", { path: "/" });
    return context.redirect("/admin/");
  }

  context.locals.claims = claims2.claims;
  return next();
});
