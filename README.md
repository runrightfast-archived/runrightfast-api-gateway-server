runrightfast-api-gateway-server
===============================

RunRightFast API Gateway Server

## Configuration Files

The [config](https://npmjs.org/package/config) is used to manage configuration.

**Recommended approach is to specify an external config dir for deployments** 

Node-config reads configuration files stored in the directory specified by the **NODE_CONFIG_DIR** environment variable, which defaults to the config directory within your top-level application directory. Configuration files can be in JavaScript format, JSON format, COFFEE format, or YAML format - whichever you prefer.
Configuration files in the config directory are loaded in the following order:

    default.EXT
    hostname.EXT
    deployment.EXT
    hostname-deployment.EXT
    runtime.json
    
Where EXT can be .yml, .yaml, .coffee, .json, or .js depending on the format you prefer. 

NOTE: If you use .yml, .yaml, or .coffee file extensions, the 'yaml' or 'coffee-script' modules must be available. 
These external dependencies are not included from this package.

hostname is the $HOST environment variable if set, otherwise the $HOSTNAME environment variable if set, otherwise the hostname found from require('os').hostname(). 
Once a hostname is found, everything from the first period ('.') onwards is removed. For example, abc.example.com becomes abc

deployment is the deployment type, found in the **$NODE_ENV** environment variable. Defaults to 'development'.

The runtime.json file contains configuration changes made at runtime either manually, or by the application setting a configuration value. 
The location is specified by NODE_CONFIG_RUNTIME_JSON environment variable. By default, it is a file called runtime.json in NODE_CONFIG_DIR directory. 
Node-config monitors this file and loads any new configurations it detects. 
This file is loaded after all other configurations, including the $NODE_CONFIG environment variable and --NODE_CONFIG command line parameter (see below).

In the running application, each configuration parameter is internally monitored for changes, and persisted to runtime.json upon change. 
This keeps configurations in sync in a mutli-node deployment. 
If you want to disable this persistance and sync you can set the environment variable NODE_CONFIG_PERSIST_ON_CHANGE to "N". 
This will lead to lower I/O if you change variables very often in your application.

runtime.json file watching can be disabled by setting the **NODE_CONFIG_DISABLE_FILE_WATCH** environment variable 
or --NODE_CONFIG_DISABLE_FILE_WATCH command line parameter to "Y" prior to running your application.

### Command Line Alternatives to Environment Variables

All environment variables described above may also be supplied on the command line.
Example:
    $ node myApp.js --NODE_ENV=staging --NODE_APP_INSTANCE=3 '--NODE_CONFIG={"Customer":{"dbPort":5984}}'
  
The format must be two dashes followed by the environment variable name, an equals sign, and the value (as in the example above).
