import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const context = { window: {}, URL };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("./review-providers.js", import.meta.url), "utf8"), context);

const { detect } = context.window.ReviewProviders;

assert.equal(detect("https://maps.google.com/?cid=123").provider, "google");
assert.equal(detect("https://maps.google.com/?query_place_id=ChIJ123").externalReference.type, "place-id");
assert.equal(detect("https://maps.google.com/?query_place_id=ChIJ123").externalReference.value, "ChIJ123");
assert.equal(detect("https://maps.google.com/?cid=123").externalReference.type, "cid");
assert.equal(detect("https://maps.google.com/?cid=123").externalReference.value, "123");
assert.equal(detect("https://maps.app.goo.gl/example").provider, "google");
assert.equal(detect("trustpilot.com/review/example.com").provider, "trustpilot");
assert.equal(detect("https://www.tripadvisor.de/Restaurant_Review-example").provider, "tripadvisor");
assert.equal(detect("https://www.yelp.com/biz/example").provider, "yelp");
assert.equal(detect("https://www.facebook.com/example/reviews").provider, "facebook");
assert.deepEqual(detect("https://example.invalid/reviews").reason, "unsupported-platform");
assert.deepEqual(detect("not a url").reason, "invalid-url");

console.log("review-provider detection tests passed");
