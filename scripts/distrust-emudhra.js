// Preloaded with `node --require` before the app starts (see the Dockerfile
// CMD). Takes Node's default CA list (its built-in Mozilla roots, plus
// anything added deliberately via NODE_EXTRA_CA_CERTS) and removes every
// eMudhra/emSign root before any TLS connection is made, so axios, the
// MongoDB driver and everything else using Node's default trust ignore them.
// Fails hard rather than silently starting with those roots still trusted.
const tls = require('tls');
const { X509Certificate } = require('crypto');

if (typeof tls.setDefaultCACertificates !== 'function' || typeof tls.getCACertificates !== 'function') {
  throw new Error(
    'distrust-emudhra: this Node.js has no tls.setDefaultCACertificates (needs 22.19+); ' +
    'refusing to start with eMudhra roots trusted'
  );
}

const isEmudhra = (pem) => {
  const cert = new X509Certificate(pem);
  return /emsign|emudhra/i.test(`${cert.subject}\n${cert.issuer}`);
};

const before = tls.getCACertificates('default');
const kept = before.filter((pem) => !isEmudhra(pem));
tls.setDefaultCACertificates(kept);

const after = tls.getCACertificates('default');
if (after.length === 0 || after.some(isEmudhra)) {
  throw new Error('distrust-emudhra: eMudhra/emSign roots are still trusted after filtering; refusing to start');
}
console.log(`TLS trust: ${before.length} default roots, removed ${before.length - kept.length} eMudhra/emSign, ${after.length} remain`);
