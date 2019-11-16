const defaultSocketInjector = io => async (ctx, next) => {
  ctx.io = io;
  await next();
};

const driversSocketInjector = driversNsp => async (ctx, next) => {
  ctx.driversNsp = driversNsp;
  await next();
};

module.exports = {
  defaultSocketInjector,
  driversSocketInjector
};

