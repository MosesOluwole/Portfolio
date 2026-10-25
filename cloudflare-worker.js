/**
 * Cloudflare entry point. Runs before the Next.js app (built by OpenNext)
 * so host and protocol rules apply to every request, whatever the dashboard
 * settings:
 *   - http://… on the production domains → https:// (301)
 *   - www.mosesoluwole.com → mosesoluwole.com (301), keeping path and query
 * Everything else is handed to the Next.js worker unchanged.
 */
import nextWorker from "./.open-next/worker.js";

// Re-exported because OpenNext's worker declares them (unused by this site).
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";

const APEX = "mosesoluwole.com";
const HOSTS = new Set([APEX, `www.${APEX}`]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (HOSTS.has(url.hostname) && (url.hostname !== APEX || url.protocol !== "https:")) {
      // Built as a string: assigning url.protocol isn't reliable in every runtime.
      return Response.redirect(`https://${APEX}${url.pathname}${url.search}`, 301);
    }
    return nextWorker.fetch(request, env, ctx);
  },
};
