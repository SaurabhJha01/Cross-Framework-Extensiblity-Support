

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;
module.exports = {
    output: {
        uniqueName: "host"
    },
    optimization: {
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({                    
            shared: [
                {
                    ...deps,
                    "@angular/core": { singleton: true },
                    "@angular/router": { singleton: true, strictVersion: true },
                    "@angular/common": { singleton: true },                  
                    "@ngrx/core": { singleton: true },
                    "@ngrx/store": { singleton: true },
                    "@ngrx/effects": { singleton: true },
                    "base-app-lib": {singleton: true }
                }
            ],
        })
    ]
};