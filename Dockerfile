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
# Deselect every emSign/eMudhra root from the system store, rebuild it, and
# fail the build if any survive. (Node needs --use-openssl-ca below to
# actually honour this store; by default it uses its own bundled roots.)
COPY scripts/assert-no-emudhra.js /opt/assert-no-emudhra.js
RUN sed -i -E 's#^(mozilla/(emSign|eMudhra))#!\1#I' /etc/ca-certificates.conf \
    && update-ca-certificates --fresh \
    && node /opt/assert-no-emudhra.js

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

# Make Node trust the (pruned) system CA store instead of its compiled-in
# Mozilla bundle, which still contains the eMudhra roots. Covers axios,
# the MongoDB driver and anything else using Node's TLS.
ENV NODE_OPTIONS=--use-openssl-ca

# Matches "scripts.start": "node backend/server.js" in package.json
CMD ["npm", "start"]
