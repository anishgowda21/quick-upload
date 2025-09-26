import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "../../server/uploadthing";

const t = import.meta.env.UPLOADTHING_TOKEN;

const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: import.meta.env.UPLOADTHING_TOKEN,
  },
});

export { handlers as GET, handlers as POST };
