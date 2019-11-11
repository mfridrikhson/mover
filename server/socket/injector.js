module.exports = io => async (ctx, next) => {
  ctx.io = io;
  await next();
};
