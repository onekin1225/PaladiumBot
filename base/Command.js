module.exports = class Command {
    constructor(client, {
      name = null,
      description = false,
      usage = false,
      enabled = true,
      aliases = new Array(),
      permission = false,
      botpermissions = new Array(),
      examples = false,
      owner = false,
      cooldown = 5000
    })
    {
      this.client = client;
      this.conf = { enabled, aliases, permission, botpermissions, owner, cooldown};
      this.help = { name, description, usage, examples };
    };
  };