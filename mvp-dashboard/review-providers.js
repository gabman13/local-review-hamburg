(function registerReviewProviders(global) {
  const providerDefinitions = [
    {
      id: "google",
      domains: ["google.com", "maps.google.com", "maps.app.goo.gl", "g.page"],
      publicDataset: "partial",
      connection: "server-google-places",
    },
    {
      id: "trustpilot",
      domains: ["trustpilot.com"],
      publicDataset: "unknown",
      connection: "server-trustpilot-api",
    },
    {
      id: "tripadvisor",
      domains: ["tripadvisor.com", "tripadvisor.de", "tripadvisor.co.uk"],
      publicDataset: "partial",
      connection: "server-tripadvisor-partner",
    },
    {
      id: "yelp",
      domains: ["yelp.com", "yelp.de", "yelp.co.uk"],
      publicDataset: "partial",
      connection: "server-yelp-fusion",
    },
    {
      id: "facebook",
      domains: ["facebook.com", "fb.com"],
      publicDataset: "unknown",
      connection: "not-supported",
    },
  ];

  function parseUrl(value) {
    try {
      const candidate = /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`;
      return new URL(candidate);
    } catch {
      return null;
    }
  }

  function matchesDomain(hostname, domain) {
    return hostname === domain || hostname.endsWith(`.${domain}`);
  }

  function findProvider(url) {
    return providerDefinitions.find((provider) => provider.domains.some((domain) => matchesDomain(url.hostname, domain)));
  }

  function detect(input) {
    const url = parseUrl(input);

    if (!url) {
      return { ok: false, reason: "invalid-url" };
    }

    const provider = findProvider(url);

    if (!provider) {
      return { ok: false, reason: "unsupported-platform", originalUrl: url.toString() };
    }

    url.hash = "";
    return {
      ok: true,
      provider: provider.id,
      originalUrl: input.trim(),
      normalizedUrl: url.toString(),
      publicDataset: provider.publicDataset,
      connection: provider.connection,
    };
  }

  global.ReviewProviders = Object.freeze({
    detect,
    providers: Object.freeze(providerDefinitions.map((provider) => Object.freeze({ ...provider }))),
  });
})(window);
