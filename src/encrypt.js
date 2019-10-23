const ursa = require('strong-ursa')
const PADDING = ursa.RSA_PKCS1_PADDING

module.exports = function(RED) {
  function LowerCaseNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
        const crt = ursa.createPublicKey(config.key)
        const enc = crt.encrypt(msg.payload, 'utf8', 'base64', PADDING)

        msg.payload = enc;
        node.send(msg);
      });
  }
  RED.nodes.registerType("encrypt",LowerCaseNode);
}