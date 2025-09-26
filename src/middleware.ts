import { auth } from "./utils/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
const guestOnlyRoutes = ["/sign-in", "/sign-up"]; 
    const isAuthed = await auth.api
        .getSession({
            headers: context.request.headers,
        })
        .catch(() => {
            return null;
        });
    if (context.url.pathname === "/" && !isAuthed) {
        return context.redirect("/sign-in");
    }
    if (isAuthed && guestOnlyRoutes.includes(context.url.pathname)) {
        return context.redirect("/");
    }

    return next();
});
