const ursa = require('strong-ursa')
const PADDING = ursa.RSA_PKCS1_PADDING

module.exports = function(RED) {
  function LowerCaseNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
        const key = ursa.createPrivateKey(config.key)
        const dec = key.decrypt(msg.payload, 'base64', 'utf8', PADDING)

        msg.payload = dec;
        node.send(msg);
      });
  }
  RED.nodes.registerType("decrypt",LowerCaseNode);
}