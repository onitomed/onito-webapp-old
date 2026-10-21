// Fails (exit 1) if the given PEM CA bundle still contains any eMudhra/emSign
// root. Offline on purpose, so it's safe to run during `docker build`.
// Usage: node scripts/assert-no-emudhra.js [path-to-bundle]
const fs = require('fs');
const { X509Certificate } = require('crypto');

const bundlePath = process.argv[2] || '/etc/ssl/certs/ca-certificates.crt';
let raw;
try {
  raw = fs.readFileSync(bundlePath, 'utf8');
} catch (err) {
  console.error(`ERROR: cannot read ${bundlePath}: ${err.message}`);
  process.exit(2);
}
const pems = raw.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) || [];

// Exit codes: 1 = an eMudhra/emSign cert is still trusted, 2 = the bundle
// couldn't be read/parsed (so we can't vouch for it either way).
let certs;
try {
  certs = pems.map((pem, i) => {
    try {
      return new X509Certificate(pem);
    } catch (err) {
      throw new Error(`certificate #${i + 1} could not be parsed: ${err.message}`);
    }
  });
} catch (err) {
  console.error(`ERROR reading ${bundlePath}: ${err.message}`);
  process.exit(2);
}
if (certs.length === 0) {
  console.error(`ERROR: no certificates found in ${bundlePath}`);
  process.exit(2);
}

const hits = certs.filter((cert) => /emsign|emudhra/i.test(`${cert.subject}\n${cert.issuer}`));

if (hits.length > 0) {
  console.error(`FAIL: ${hits.length} eMudhra/emSign certificate(s) still trusted in ${bundlePath}:`);
  hits.forEach((c) => console.error(` - ${c.subject.replace(/\n/g, ', ')} (sha256 ${c.fingerprint256})`));
  process.exit(1);
}
console.log(`OK: none of the ${certs.length} certificates in ${bundlePath} are eMudhra/emSign.`);
