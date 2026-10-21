# ---- Base image ----
# Debian-based slim image so apt-get / qpdf are available.
FROM node:22.23.4-bookworm-slim

# ---- System dependencies ----
# qpdf is invoked directly by backend/controllers/patientDataController.js and
# checked for on startup in backend/server.js, so it must exist as a real
# system binary on PATH (not an npm package).
RUN apt-get update \
    && apt-get install -y --no-install-recommends qpdf ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ---- Distrust eMudhra / emSign ----
# Oct 2026: private keys for eight eMudhra intermediate CA certificates were
# compromised, letting anyone mint certificates chaining to eMudhra roots.
# Two separate trust stores need handling:
#   1. This one, the Debian system store (used by curl, openssl and other
#      system tools): deselect every emSign/eMudhra root, rebuild it, and
#      fail the build if any survive.
#   2. Node's own built-in Mozilla roots, which Node uses instead of this
#      store: handled at startup by scripts/distrust-emudhra.js (see CMD).
COPY scripts/assert-no-emudhra.js /opt/assert-no-emudhra.js
RUN sed -i -E 's#^(mozilla/(emSign|eMudhra))#!\1#I' /etc/ca-certificates.conf \
    && echo '--- emSign/eMudhra entries in ca-certificates.conf ---' \
    && (grep -i -E 'emsign|emudhra' /etc/ca-certificates.conf || echo '(none listed)')
RUN update-ca-certificates --fresh
RUN node /opt/assert-no-emudhra.js

# ---- App setup ----
WORKDIR /app

# Copy manifest + lockfile first so `npm ci` is cached unless dependencies change
COPY package.json package-lock.json ./

# npm ci: this repo has a committed package-lock.json, so use it for a fully
# reproducible install. --omit=dev skips mocha/chai/nodemon (test-only deps,
# not needed to run the server).
RUN npm ci --omit=dev

# Copy the rest of the application source
COPY . .

# Render assigns a port at runtime via the PORT env var; backend/server.js
# already reads process.env.PORT (falling back to 5000), so no code change
# is needed. This ENV is just a sane default for local `docker run` testing.
ENV PORT=5000
EXPOSE 5000

# Same command as "scripts.start" in package.json, run directly so the
# preload below applies to the server process only (not to npm as well) and
# signals from Render reach Node directly. The preload keeps Node's own
# built-in root list but removes the remaining eMudhra/emSign root(s) before
# any TLS connection is made. Leave Render's "Docker Command" setting empty
# so it doesn't override this CMD.
CMD ["node", "--require", "./scripts/distrust-emudhra.js", "backend/server.js"]
