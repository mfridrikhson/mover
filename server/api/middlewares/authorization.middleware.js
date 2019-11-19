const jwtMiddleware = require('./jwt.middleware');

const authorizationMiddleware = (routesWhiteList) => async (ctx, next) => {
  routesWhiteList.some(route => ctx.request.path.startsWith(route))
    ? await next()
    : await jwtMiddleware(ctx, next);
};

module.exports = authorizationMiddleware;
