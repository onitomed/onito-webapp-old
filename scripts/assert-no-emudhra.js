// Fails (exit 1) if the given PEM CA bundle still contains any eMudhra/emSign
// root. Offline on purpose, so it's safe to run during `docker build`.
// Usage: node scripts/assert-no-emudhra.js [path-to-bundle]
const fs = require('fs');
const { X509Certificate } = require('crypto');

const bundlePath = process.argv[2] || '/etc/ssl/certs/ca-certificates.crt';
const pems = fs.readFileSync(bundlePath, 'utf8').match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) || [];

const hits = pems
  .map((pem) => new X509Certificate(pem))
  .filter((cert) => /emsign|emudhra/i.test(`${cert.subject}\n${cert.issuer}`));

if (hits.length > 0) {
  console.error(`FAIL: ${hits.length} eMudhra/emSign certificate(s) still trusted in ${bundlePath}:`);
  hits.forEach((c) => console.error(` - ${c.subject.replace(/\n/g, ', ')} (sha256 ${c.fingerprint256})`));
  process.exit(1);
}
console.log(`OK: none of the ${pems.length} certificates in ${bundlePath} are eMudhra/emSign.`);
a
