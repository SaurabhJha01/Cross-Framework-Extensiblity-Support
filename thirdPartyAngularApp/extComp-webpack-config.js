const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    output: {
        uniqueName: "extComp"
    },
    optimization: {
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({
            shared: {
                "@angular/core": { singleton: true },
                "@angular/common": { singleton: true },
                "@angular/router": { singleton: true, strictVersion: true },
                "@ngrx/core": { singleton: true },
                "@ngrx/store": { singleton: true },
                "@ngrx/effects": { singleton: true },
                "base-app-lib": {singleton: true }
            },
            name: "extApp", // name of the remote container that will be used by host application
            filename: "aotCompiledExt.js",// The code of this extensible application will get compiled into and will get refernced by host
            exposes: {
                 "ExtModule": "./src/app/app.module.ts" // Any name can be given but for writing more flexible consumer applicatioon code, use the same name as that of module name which is ExtModule here
             
              
            }
        })
    ]
}