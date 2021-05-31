const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

const isAuthorized = (req) => {
  const method = ["POST", "PUT", "PATCH", "DELETE"];
  if (
    method.includes(req.method) &&
    req.headers.authorization !== "Bearer 987654321"
  ) {
    return false;
  }
  return true;
};

server.use(middlewares);
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});
server.use(router);

server.listen(port);
