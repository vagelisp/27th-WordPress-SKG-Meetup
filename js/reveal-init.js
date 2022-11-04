/**
 * @file
 * Initialize the Reveal handler.
 */

(function () {
  // Use a random theme if reveal container has 'pattern--random' class.
  const themes = [
    // "hills",
    // "indigo",
    // "molecules",
    // "night-sky",
    // "orange-river",
    // "palette",
    // "playground",
    // "pop",
    // "quilt",
    // "stream",
    // "stripes",
    // "waterfall",
    "waves",
  ];
  document.addEventListener("DOMContentLoaded", function () {
    const reveal = document.getElementsByClassName("reveal").item(0);
    if (!reveal.classList.contains("pattern--random")) {
      return;
    }

    reveal.classList.forEach(function (value) {
      if (value.substr(0, 7) === "pattern") {
        reveal.classList.remove(value);
      }
    });
    const index = Math.floor(Math.random() * themes.length);
    reveal.classList.add("pattern--" + themes[index]);
  });

  // More info about config & dependencies:
  // - https://github.com/hakimel/reveal.js#configuration
  // - https://github.com/hakimel/reveal.js#dependencies
  Reveal.initialize({
    center: false,
    width: "100%",
    height: "100%",
    margin: 0,
    minScale: 1,
    maxScale: 1,
    history: true,
    controls: true,
    progress: true,

    // Arrow keys progress through sub-slides
    keyboard: {
      40: "next", // right key
      38: "prev", // left key
    },
    seminar: {
      server: "https://reveal-seminar.herokuapp.com",
      port: 4433,
      hash: "$2a$05$Rl4wSSYlw7oDoDY3QuQX9OavNOn/0PY4uQLQqowHIue.8JpK6p2oC", // password for the hash is 'wcath22'
      room: room,
      logger: logger,
      autoJoin: true,
    },
    chart: {
      defaults: {
        color: "lightgray", // color of labels
        scale: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: "lightgray" }, // color of grid lines
        },
      },
      bar: {
        backgroundColor: [
          "rgba(20,220,220,.8)",
          "rgba(220,120,120,.8)",
          "rgba(20,120,220,.8)",
        ],
      },
      pie: {
        backgroundColor: [
          [
            "rgba(20,220,220,.8)",
            "rgba(220,120,120,.8)",
            "rgba(20,120,220,.8)",
          ],
        ],
      },
    },

    // transition: "convex", // none/fade/slide/convex/concave/zoom
    // backgroundTransition: "none",
    backgroundTransition: "zoom",
    dependencies: [
      { src: "plugin/markdown/marked.js" },
      { src: "plugin/markdown/markdown.js" },
      { src: "plugin/notes/notes.js", async: true },
      //   { src: "plugin/seminar/plugin.js", async: true },
      {
        src: "plugin/highlight/highlight.js",
        async: true,
        condition: function () {
          // Trim whitespace from code blocks, and prevent HTML escaping by default.
          // This must be done before the plugin is loaded.
          Array.prototype.forEach.call(
            document.querySelectorAll("pre code"),
            function (element) {
              if (!element.hasAttribute("data-notrim")) {
                element.setAttribute("data-trim", "");
              }
              if (!element.hasAttribute("data-escape")) {
                element.setAttribute("data-noescape", "");
              }
            }
          );
          return true;
        },
        callback: function () {
          hljs.initHighlightingOnLoad();
        },
      },
    ],
    plugins: [RevealSeminar, RevealPoll, RevealChart],
  });
})();
