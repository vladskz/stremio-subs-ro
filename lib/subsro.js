const { getLimiter } = require("./rateLimiter");

class SubsRoClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    // NOTE: use subs.ro/api (NOT api.subs.ro) — the api.subs.ro host is
    // behind Cloudflare bot protection that blocks Vercel/cloud IPs.
    this.baseUrl = "https://subs.ro/api/v1.0";
  }

  async searchByImdb(imdbId) {
    try {
      const url = `${this.baseUrl}/search/imdbid/${imdbId}`;
      const limiter = getLimiter(this.apiKey);

      const data = await limiter.searchRequest(url, {
        headers: { "X-Subs-Api-Key": this.apiKey },
      });

      if (data && Array.isArray(data.items)) {
        return data.items;
      }
      return [];
    } catch (error) {
      console.error(
        "[SUBSRO] searchByImdb failed:",
        error.message,
        error.response?.status,
        error.code,
      );
      return [];
    }
  }

  async validate() {
    try {
      const url = `${this.baseUrl}/quota`;
      const limiter = getLimiter(this.apiKey);

      const data = await limiter.searchRequest(url, {
        headers: { "X-Subs-Api-Key": this.apiKey },
      });
      return data?.quota?.remaining_quota >= 0;
    } catch (error) {
      console.error(
        "[SUBSRO] validate failed:",
        error.message,
        error.response?.status,
        error.code,
      );
      return false;
    }
  }
}

module.exports = SubsRoClient;
