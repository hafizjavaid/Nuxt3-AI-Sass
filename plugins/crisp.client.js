export default defineNuxtPlugin(() => {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "d65aaebb-bef1-46fc-80ba-562e7c2956ed";

  (function () {
    var d = document;
    var s = d.createElement("script");

    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
});
