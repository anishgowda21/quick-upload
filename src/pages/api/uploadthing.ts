import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "../../server/uploadthing-router";

let config: { token: any; callbackUrl?: any } = {
  token: import.meta.env.UPLOADTHING_TOKEN,
};

if (import.meta.env.UPLOADTHING_CALLBACK_URL) {
  console.log(
    "Callback url found ===>",
    import.meta.env.UPLOADTHING_CALLBACK_URL
  );
  config["callbackUrl"] = import.meta.env.UPLOADTHING_CALLBACK_URL;
}

const handlers = createRouteHandler({
  router: ourFileRouter,
  config,
});

export { handlers as GET, handlers as POST };
