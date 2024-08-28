import { createServer, Model, Response } from "miragejs";
import users from "./fixtures/users";
import auths from "./fixtures/auths";
import centers from "./fixtures/centers";
import config from "@/config";

const API_URL = import.meta.env.VITE_API_URL;
const API_PLACE_URL = import.meta.env.VITE_API_PLACE_URL;

function checkValidToken(token) {
  if (token) {
    const [timeOut, id] = token.split(" ")[1].split("-");
    if (timeOut && id && Date.now() <= parseInt(timeOut)) {
      return id;
    }
  }
  throw Error("Unauthorized");
}

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model.extend(),
      auth: Model.extend(),
      center: Model.extend(),
    },

    fixtures: {
      users,
      auths,
      centers,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.namespace = "/api";

      // POST /api/auth/signin
      this.post("/auth/sign-in", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const auth = schema.auths.findBy({
          username: attrs.username,
          password: attrs.password,
        });
        if (auth) {
          return {
            token: `${Date.now() + 1 * 60 * 1000}-${auth.id}`,
          };
        }
        return new Response(401, {}, "Unauthorized");
      });

      // GET /api/user/:id
      this.get("/users/profile", (schema, request) => {
        const token = request.requestHeaders.Authorization;
        try {
          const userId = checkValidToken(token);
          return schema.users.find(userId).attrs;
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });

      // GET /api/map/autocomplete/json
      this.get("/autocomplete/json", async (schema, request) => {
        // get all query params from request
        const params = request.queryParams;
        const res = await fetch(
          `${API_PLACE_URL}/autocomplete/json?${new URLSearchParams(params)}`,
        );
        return res.json();
      });

      // GET /api/map/details/json
      this.get("/details/json", async (schema, request) => {
        // get all query params from request
        const params = request.queryParams;
        const res = await fetch(`${API_PLACE_URL}/details/json?${new URLSearchParams(params)}`);
        return res.json();
      });

      // GET /api/centers/:id
      this.get("//center/:id", (schema, request) => {
        const centerId = request.params.id;
        return schema.centers.find(centerId).attrs;
      });

      // POST /api/centers
      this.post("/centers", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const page = body.page || 1;
        const size = body.size || 0;

        // find by lat and lng inside north-east and south-west bounds
        const listCenter = schema.centers.all().models.map((center) => center.attrs);
        if ((!body.viewPortSW || !body.viewPortSW) && !body.owners) {
          return {
            page,
            size,
            total: listCenter.length,
            data: [],
          };
        }
        let centers = listCenter;

        if (body.owners) {
          centers = centers.filter((center) => body.owners.includes(center.owner));
        }

        centers = centers.filter(
          (center) =>
            center.latitude >= body.viewPortSW.lat &&
            center.latitude <= body.viewPortNE.lat &&
            center.longitude >= body.viewPortSW.lng &&
            center.longitude <= body.viewPortNE.lng,
        );

        const pageList = centers.slice((body.page - 1) * body.size, body.page * body.size);

        return {
          page: page,
          size: size,
          total: centers?.length ?? 0,
          data: pageList ?? [],
        };
      });

      this.passthrough(`${API_URL}/**`);
      this.passthrough(`${API_PLACE_URL}/**`);
      this.passthrough(`https://maps.googleapis.com/**`);
    },
  });

  return server;
}
