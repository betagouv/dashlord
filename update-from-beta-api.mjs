import fs from "fs";
import { parse, stringify } from "yaml";

/**
 * updates dashlord.yml tags from beta api and remove "alumni"
 */
const dashlordConfig = parse(fs.readFileSync("./dashlord.yml", "utf8"));

const startups = await fetch(
  "https://beta.gouv.fr/api/v2.5/startups.json"
).then((r) => r.json());

dashlordConfig.urls.forEach((url) => {
  if (!url.betaId) {
    console.error("no beta id", url.url);
  } else {
    const startup = startups.data.find((d) => d.id === url.betaId);
    if (!startup) {
      console.error(
        "startup not found",
        url.betaId,
        `https://beta.gouv.fr/startups/${url.betaId}.html`
      );
    } else {
      if (!url.tags) {
        url.tags = [];
      }
      const incubator = startup.relationships.incubator.data.id;
      if (url.category && url.category !== incubator) {
        url.tags.push(url.category);
      }
      url.category = incubator;
      if (!url.category) {
        console.error("incubator not found", url.url, url.betaId);
      }
    }
  }
});

const startupsToRemove = startups.data
  .filter((startup) => {
    const phases = startup.attributes.phases.sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );
    const latestPhase = phases.length && phases[phases.length - 1];
    const isOutdated = latestPhase && latestPhase.name === "alumni";
    return isOutdated;
  })
  .map((s) => s.id);

dashlordConfig.urls = dashlordConfig.urls.filter(
  (url) => !startupsToRemove.includes(url.betaId)
);

console.log(stringify(dashlordConfig, null, 2));
