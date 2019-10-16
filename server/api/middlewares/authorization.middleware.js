const jwtMiddleware = require('./jwt.middleware');


const authorizationMiddleware = (routesWhiteList) => async (ctx, next) => {
  routesWhiteList.some(route => route === ctx.request.path)
    ? await next()
    : await jwtMiddleware(ctx, next);
};

module.exports = authorizationMiddleware;
