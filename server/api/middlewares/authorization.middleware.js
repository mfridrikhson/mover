const jwtMiddleware = require('./jwt.middleware');


const authorizationMiddleware = (routesWhiteList) => (ctx, next) => {
  routesWhiteList.some(route => route === ctx.request.path)
    ? next()
    : jwtMiddleware(ctx, next);
};

module.exports = authorizationMiddleware;
