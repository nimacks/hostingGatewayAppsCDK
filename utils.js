function isHTMLApp(app) {
  return !app.spa && app.platform !== "WEB_COMPUTE";
}

module.exports = {
  isHTMLApp,
};
