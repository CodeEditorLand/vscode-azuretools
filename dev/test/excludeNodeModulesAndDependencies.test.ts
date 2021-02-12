/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import FileManagerWebpackPlugin = require('filemanager-webpack-plugin');
import * as os from 'os';
import { Configuration } from 'webpack';
import { excludeNodeModulesAndDependencies, getExternalsEntries, getNodeModuleCopyEntries, getNodeModulesDependencyClosure, PackageLock } from "../src/webpack/excludeNodeModulesAndDependencies";

const packageLockJson: PackageLock = {
    "name": "vscode-azureextensiondev",
    "version": "0.7.0",
    "lockfileVersion": 2,
    "requires": true,
    "packages": {
        "": {
            "name": "vscode-azureextensiondev",
            "version": "0.7.0",
            "license": "MIT",
            "dependencies": {
                "@azure/arm-subscriptions": "^2.0.0",
                "@azure/ms-rest-azure-env": "^2.0.0",
                "@azure/ms-rest-js": "^2.2.1",
                "@azure/ms-rest-nodeauth": "^3.0.5",
                "clean-webpack-plugin": "^3.0.0",
                "filemanager-webpack-plugin": "^2.0.5",
                "fs-extra": "^8.0.0",
                "terser-webpack-plugin": "^1.2.2",
                "ts-loader": "^5.3.3",
                "webpack": "4.28.1"
            },
            "devDependencies": {
                "@types/fs-extra": "^8.0.0",
                "@types/mocha": "^7.0.2",
                "@types/node": "^12.0.0",
                "@types/terser-webpack-plugin": "^1.2.0",
                "@types/vscode": "1.48.0",
                "@typescript-eslint/eslint-plugin": "^4.14.2",
                "@typescript-eslint/parser": "^4.14.2",
                "eslint": "^7.19.0",
                "eslint-plugin-import": "^2.22.1",
                "glob": "^7.1.6",
                "mocha": "^7.1.1",
                "mocha-junit-reporter": "^1.18.0",
                "mocha-multi-reporters": "^1.1.7",
                "ts-node": "^7.0.1",
                "typescript": "^3.8.3",
                "vscode-test": "^1.3.0"
            }
        },
        "node_modules/@azure/abort-controller": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/@azure/abort-controller/-/abort-controller-1.0.2.tgz",
            "integrity": "sha512-XUyTo+bcyxHEf+jlN2MXA7YU9nxVehaubngHV1MIZZaqYmZqykkoeAz/JMMEeR7t3TcyDwbFa3Zw8BZywmIx4g==",
            "dependencies": {
                "tslib": "^2.0.0"
            },
            "engines": {
                "node": ">=8.0.0"
            }
        },
        "node_modules/@azure/abort-controller/node_modules/tslib": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.1.0.tgz",
            "integrity": "sha512-hcVC3wYEziELGGmEEXue7D75zbwIIVUMWAVbHItGPx0ziyXxrOMQx4rQEVEV45Ut/1IotuEvwqPopzIOkDMf0A=="
        },
        "node_modules/@azure/arm-subscriptions": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/@azure/arm-subscriptions/-/arm-subscriptions-2.0.0.tgz",
            "integrity": "sha512-+ys2glK5YgwZ9KhwWblfAQIPABtiB5OdKEpPOpcvr7B5ygYTwZuSUNObX9MRu/MyiRo1zDlUvlxHltBphq/bLQ==",
            "dependencies": {
                "@azure/ms-rest-azure-js": "^2.0.1",
                "@azure/ms-rest-js": "^2.0.4",
                "tslib": "^1.10.0"
            }
        },
        "node_modules/@azure/core-auth": {
            "version": "1.1.4",
            "resolved": "https://registry.npmjs.org/@azure/core-auth/-/core-auth-1.1.4.tgz",
            "integrity": "sha512-+j1embyH1jqf04AIfJPdLafd5SC1y6z1Jz4i+USR1XkTp6KM8P5u4/AjmWMVoEQdM/M29PJcRDZcCEWjK9S1bw==",
            "dependencies": {
                "@azure/abort-controller": "^1.0.0",
                "tslib": "^2.0.0"
            },
            "engines": {
                "node": ">=8.0.0"
            }
        },
        "node_modules/@azure/core-auth/node_modules/tslib": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.1.0.tgz",
            "integrity": "sha512-hcVC3wYEziELGGmEEXue7D75zbwIIVUMWAVbHItGPx0ziyXxrOMQx4rQEVEV45Ut/1IotuEvwqPopzIOkDMf0A=="
        },
        "node_modules/@azure/ms-rest-azure-env": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-azure-env/-/ms-rest-azure-env-2.0.0.tgz",
            "integrity": "sha512-dG76W7ElfLi+fbTjnZVGj+M9e0BIEJmRxU6fHaUQ12bZBe8EJKYb2GV50YWNaP2uJiVQ5+7nXEVj1VN1UQtaEw=="
        },
        "node_modules/@azure/ms-rest-azure-js": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-azure-js/-/ms-rest-azure-js-2.0.1.tgz",
            "integrity": "sha512-5e+A710O7gRFISoV4KI/ZyLQbKmjXxQZ1L8Z/sx7jSUQqmswjTnN4yyIZxs5JzfLVkobU0rXxbi5/LVzaI8QXQ==",
            "dependencies": {
                "@azure/ms-rest-js": "^2.0.4",
                "tslib": "^1.10.0"
            }
        },
        "node_modules/@azure/ms-rest-js": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-js/-/ms-rest-js-2.2.1.tgz",
            "integrity": "sha512-vd8SIsoC27u8gpxatDQQ1Z5+wcnkAVhOUxA2VXRDse/zKRN0RuYoj7jTRIiJlNEOyUX4a+oGFplSZNQEsLZVbg==",
            "dependencies": {
                "@azure/core-auth": "^1.1.4",
                "@types/node-fetch": "^2.3.7",
                "@types/tunnel": "0.0.1",
                "abort-controller": "^3.0.0",
                "form-data": "^2.5.0",
                "node-fetch": "^2.6.0",
                "tough-cookie": "^3.0.1",
                "tslib": "^1.10.0",
                "tunnel": "0.0.6",
                "uuid": "^3.3.2",
                "xml2js": "^0.4.19"
            }
        },
        "node_modules/@azure/ms-rest-js/node_modules/form-data": {
            "version": "2.5.1",
            "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.5.1.tgz",
            "integrity": "sha512-m21N3WOmEEURgk6B9GLOE4RuWOFf28Lhh9qGYeNlGq4VDXUlJy2th2slBNU8Gp8EzloYZOibZJ7t5ecIrFSjVA==",
            "dependencies": {
                "asynckit": "^0.4.0",
                "combined-stream": "^1.0.6",
                "mime-types": "^2.1.12"
            },
            "engines": {
                "node": ">= 0.12"
            }
        },
        "node_modules/@azure/ms-rest-js/node_modules/tough-cookie": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-3.0.1.tgz",
            "integrity": "sha512-yQyJ0u4pZsv9D4clxO69OEjLWYw+jbgspjTue4lTQZLfV0c5l1VmK2y1JK8E9ahdpltPOaAThPcp5nKPUgSnsg==",
            "dependencies": {
                "ip-regex": "^2.1.0",
                "psl": "^1.1.28",
                "punycode": "^2.1.1"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/@azure/ms-rest-nodeauth": {
            "version": "3.0.5",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-nodeauth/-/ms-rest-nodeauth-3.0.5.tgz",
            "integrity": "sha512-GoP9tn4rFNHJqE00+ARtHmPKufC3h4j7xEuyveOueUrguLT/Q0c5aEPgS9bmXWiHGoreRn2hVGGwd3m8oDdV3g==",
            "dependencies": {
                "@azure/ms-rest-azure-env": "^2.0.0",
                "@azure/ms-rest-js": "^2.0.4",
                "adal-node": "^0.1.28"
            }
        },
        "node_modules/@babel/code-frame": {
            "version": "7.8.3",
            "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.8.3.tgz",
            "integrity": "sha512-a9gxpmdXtZEInkCSHUJDLHZVBgb1QS0jhss4cPP93EW7s+uC5bikET2twEF3KV+7rDblJcmNvTR7VJejqd2C2g==",
            "dev": true,
            "dependencies": {
                "@babel/highlight": "^7.8.3"
            }
        },
        "node_modules/@babel/helper-validator-identifier": {
            "version": "7.9.0",
            "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.9.0.tgz",
            "integrity": "sha512-6G8bQKjOh+of4PV/ThDm/rRqlU7+IGoJuofpagU5GlEl29Vv0RGqqt86ZGRV8ZuSOY3o+8yXl5y782SMcG7SHw==",
            "dev": true
        },
        "node_modules/@babel/highlight": {
            "version": "7.9.0",
            "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.9.0.tgz",
            "integrity": "sha512-lJZPilxX7Op3Nv/2cvFdnlepPXDxi29wxteT57Q965oc5R9v86ztx0jfxVrTcBk8C2kcPkkDa2Z4T3ZsPPVWsQ==",
            "dev": true,
            "dependencies": {
                "@babel/helper-validator-identifier": "^7.9.0",
                "chalk": "^2.0.0",
                "js-tokens": "^4.0.0"
            }
        },
        "node_modules/@eslint/eslintrc": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-0.3.0.tgz",
            "integrity": "sha512-1JTKgrOKAHVivSvOYw+sJOunkBjUOvjqWk1DPja7ZFhIS2mX/4EgTT8M7eTK9jrKhL/FvXXEbQwIs3pg1xp3dg==",
            "dev": true,
            "dependencies": {
                "ajv": "^6.12.4",
                "debug": "^4.1.1",
                "espree": "^7.3.0",
                "globals": "^12.1.0",
                "ignore": "^4.0.6",
                "import-fresh": "^3.2.1",
                "js-yaml": "^3.13.1",
                "lodash": "^4.17.20",
                "minimatch": "^3.0.4",
                "strip-json-comments": "^3.1.1"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            }
        },
        "node_modules/@eslint/eslintrc/node_modules/ajv": {
            "version": "6.12.6",
            "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
            "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
            "dev": true,
            "dependencies": {
                "fast-deep-equal": "^3.1.1",
                "fast-json-stable-stringify": "^2.0.0",
                "json-schema-traverse": "^0.4.1",
                "uri-js": "^4.2.2"
            },
            "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/epoberezkin"
            }
        },
        "node_modules/@eslint/eslintrc/node_modules/debug": {
            "version": "4.3.1",
            "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
            "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
            "dev": true,
            "dependencies": {
                "ms": "2.1.2"
            },
            "engines": {
                "node": ">=6.0"
            },
            "peerDependenciesMeta": {
                "supports-color": {
                    "optional": true
                }
            }
        },
        "node_modules/@eslint/eslintrc/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/@eslint/eslintrc/node_modules/strip-json-comments": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
            "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
            "dev": true,
            "engines": {
                "node": ">=8"
            },
            "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
            }
        },
        "node_modules/@nodelib/fs.scandir": {
            "version": "2.1.4",
            "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.4.tgz",
            "integrity": "sha512-33g3pMJk3bg5nXbL/+CY6I2eJDzZAni49PfJnL5fghPTggPvBd/pFNSgJsdAgWptuFu7qq/ERvOYFlhvsLTCKA==",
            "dev": true,
            "dependencies": {
                "@nodelib/fs.stat": "2.0.4",
                "run-parallel": "^1.1.9"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/@nodelib/fs.stat": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.4.tgz",
            "integrity": "sha512-IYlHJA0clt2+Vg7bccq+TzRdJvv19c2INqBSsoOLp1je7xjtr7J26+WXR72MCdvU9q1qTzIWDfhMf+DRvQJK4Q==",
            "dev": true,
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/@nodelib/fs.walk": {
            "version": "1.2.6",
            "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.6.tgz",
            "integrity": "sha512-8Broas6vTtW4GIXTAHDoE32hnN2M5ykgCpWGbuXHQ15vEMqr23pB76e/GZcYsZCHALv50ktd24qhEyKr6wBtow==",
            "dev": true,
            "dependencies": {
                "@nodelib/fs.scandir": "2.1.4",
                "fastq": "^1.6.0"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/@types/anymatch": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/@types/anymatch/-/anymatch-1.3.1.tgz",
            "integrity": "sha512-/+CRPXpBDpo2RK9C68N3b2cOvO0Cf5B9aPijHsoDQTHivnGSObdOF2BRQOYjojWTDy6nQvMjmqRXIxH55VjxxA=="
        },
        "node_modules/@types/events": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/@types/events/-/events-3.0.0.tgz",
            "integrity": "sha512-EaObqwIvayI5a8dCzhFrjKzVwKLxjoG9T6Ppd5CEo07LRKfQ8Yokw54r5+Wq7FaBQ+yXRvQAYPrHwya1/UFt9g=="
        },
        "node_modules/@types/fs-extra": {
            "version": "8.1.0",
            "resolved": "https://registry.npmjs.org/@types/fs-extra/-/fs-extra-8.1.0.tgz",
            "integrity": "sha512-UoOfVEzAUpeSPmjm7h1uk5MH6KZma2z2O7a75onTGjnNvAvMVrPzPL/vBbT65iIGHWj6rokwfmYcmxmlSf2uwg==",
            "dev": true,
            "dependencies": {
                "@types/node": "*"
            }
        },
        "node_modules/@types/glob": {
            "version": "7.1.1",
            "resolved": "https://registry.npmjs.org/@types/glob/-/glob-7.1.1.tgz",
            "integrity": "sha512-1Bh06cbWJUHMC97acuD6UMG29nMt0Aqz1vF3guLfG+kHHJhy3AyohZFFxYk2f7Q1SQIrNwvncxAE0N/9s70F2w==",
            "dependencies": {
                "@types/events": "*",
                "@types/minimatch": "*",
                "@types/node": "*"
            }
        },
        "node_modules/@types/glob/node_modules/@types/node": {
            "version": "12.12.31",
            "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.31.tgz",
            "integrity": "sha512-T+wnJno8uh27G9c+1T+a1/WYCHzLeDqtsGJkoEdSp2X8RTh3oOCZQcUnjAx90CS8cmmADX51O0FI/tu9s0yssg=="
        },
        "node_modules/@types/json-schema": {
            "version": "7.0.7",
            "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.7.tgz",
            "integrity": "sha512-cxWFQVseBm6O9Gbw1IWb8r6OS4OhSt3hPZLkFApLjM8TEXROBuQGLAH2i2gZpcXdLBIrpXuTDhH7Vbm1iXmNGA==",
            "dev": true
        },
        "node_modules/@types/json5": {
            "version": "0.0.29",
            "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
            "integrity": "sha1-7ihweulOEdK4J7y+UnC86n8+ce4=",
            "dev": true
        },
        "node_modules/@types/minimatch": {
            "version": "3.0.3",
            "resolved": "https://registry.npmjs.org/@types/minimatch/-/minimatch-3.0.3.tgz",
            "integrity": "sha512-tHq6qdbT9U1IRSGf14CL0pUlULksvY9OZ+5eEgl1N7t+OA3tGvNpxJCzuKQlsNgCVwbAs670L1vcVQi8j9HjnA=="
        },
        "node_modules/@types/mocha": {
            "version": "7.0.2",
            "resolved": "https://registry.npmjs.org/@types/mocha/-/mocha-7.0.2.tgz",
            "integrity": "sha512-ZvO2tAcjmMi8V/5Z3JsyofMe3hasRcaw88cto5etSVMwVQfeivGAlEYmaQgceUSVYFofVjT+ioHsATjdWcFt1w==",
            "dev": true
        },
        "node_modules/@types/node": {
            "version": "12.12.39",
            "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.39.tgz",
            "integrity": "sha512-pADGfwnDkr6zagDwEiCVE4yQrv7XDkoeVa4OfA9Ju/zRTk6YNDLGtQbkdL4/56mCQQCs4AhNrBIag6jrp7ZuOg=="
        },
        "node_modules/@types/node-fetch": {
            "version": "2.5.8",
            "resolved": "https://registry.npmjs.org/@types/node-fetch/-/node-fetch-2.5.8.tgz",
            "integrity": "sha512-fbjI6ja0N5ZA8TV53RUqzsKNkl9fv8Oj3T7zxW7FGv1GSH7gwJaNF8dzCjrqKaxKeUpTz4yT1DaJFq/omNpGfw==",
            "dependencies": {
                "@types/node": "*",
                "form-data": "^3.0.0"
            }
        },
        "node_modules/@types/node-fetch/node_modules/form-data": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/form-data/-/form-data-3.0.0.tgz",
            "integrity": "sha512-CKMFDglpbMi6PyN+brwB9Q/GOw0eAnsrEZDgcsH5Krhz5Od/haKHAX0NmQfha2zPPz0JpWzA7GJHGSnvCRLWsg==",
            "dependencies": {
                "asynckit": "^0.4.0",
                "combined-stream": "^1.0.8",
                "mime-types": "^2.1.12"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/@types/source-list-map": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/@types/source-list-map/-/source-list-map-0.1.2.tgz",
            "integrity": "sha512-K5K+yml8LTo9bWJI/rECfIPrGgxdpeNbj+d53lwN4QjW1MCwlkhUms+gtdzigTeUyBr09+u8BwOIY3MXvHdcsA=="
        },
        "node_modules/@types/tapable": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/@types/tapable/-/tapable-1.0.5.tgz",
            "integrity": "sha512-/gG2M/Imw7cQFp8PGvz/SwocNrmKFjFsm5Pb8HdbHkZ1K8pmuPzOX4VeVoiEecFCVf4CsN1r3/BRvx+6sNqwtQ=="
        },
        "node_modules/@types/terser-webpack-plugin": {
            "version": "1.2.1",
            "resolved": "https://registry.npmjs.org/@types/terser-webpack-plugin/-/terser-webpack-plugin-1.2.1.tgz",
            "integrity": "sha512-5mzQulZabFsqiLh0PhJdccIKqpd5535UYpZ+Skugz8kPzZdajMMYBRKQSzM1KOkZ42NwLxbZSzQp6xKtaq46Gg==",
            "dev": true,
            "dependencies": {
                "@types/webpack": "*",
                "terser": "^3.16.1"
            }
        },
        "node_modules/@types/terser-webpack-plugin/node_modules/terser": {
            "version": "3.17.0",
            "resolved": "https://registry.npmjs.org/terser/-/terser-3.17.0.tgz",
            "integrity": "sha512-/FQzzPJmCpjAH9Xvk2paiWrFq+5M6aVOf+2KRbwhByISDX/EujxsK+BAvrhb6H+2rtrLCHK9N01wO014vrIwVQ==",
            "dev": true,
            "dependencies": {
                "commander": "^2.19.0",
                "source-map": "~0.6.1",
                "source-map-support": "~0.5.10"
            },
            "bin": {
                "terser": "bin/uglifyjs"
            },
            "engines": {
                "node": ">=6.0.0"
            }
        },
        "node_modules/@types/tunnel": {
            "version": "0.0.1",
            "resolved": "https://registry.npmjs.org/@types/tunnel/-/tunnel-0.0.1.tgz",
            "integrity": "sha512-AOqu6bQu5MSWwYvehMXLukFHnupHrpZ8nvgae5Ggie9UwzDR1CCwoXgSSWNZJuyOlCdfdsWMA5F2LlmvyoTv8A==",
            "dependencies": {
                "@types/node": "*"
            }
        },
        "node_modules/@types/uglify-js": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/@types/uglify-js/-/uglify-js-3.0.4.tgz",
            "integrity": "sha512-SudIN9TRJ+v8g5pTG8RRCqfqTMNqgWCKKd3vtynhGzkIIjxaicNAMuY5TRadJ6tzDu3Dotf3ngaMILtmOdmWEQ==",
            "dependencies": {
                "source-map": "^0.6.1"
            }
        },
        "node_modules/@types/vscode": {
            "version": "1.48.0",
            "resolved": "https://registry.npmjs.org/@types/vscode/-/vscode-1.48.0.tgz",
            "integrity": "sha512-sZJKzsJz1gSoFXcOJWw3fnKl2sseUgZmvB4AJZS+Fea+bC/jfGPVhmFL/FfQHld/TKtukVONsmoD3Pkyx9iadg==",
            "dev": true
        },
        "node_modules/@types/webpack": {
            "version": "4.41.8",
            "resolved": "https://registry.npmjs.org/@types/webpack/-/webpack-4.41.8.tgz",
            "integrity": "sha512-mh4litLHTlDG84TGCFv1pZldndI34vkrW9Mks++Zx4KET7DRMoCXUvLbTISiuF4++fMgNnhV9cc1nCXJQyBYbQ==",
            "dependencies": {
                "@types/anymatch": "*",
                "@types/node": "*",
                "@types/tapable": "*",
                "@types/uglify-js": "*",
                "@types/webpack-sources": "*",
                "source-map": "^0.6.0"
            }
        },
        "node_modules/@types/webpack-sources": {
            "version": "0.1.7",
            "resolved": "https://registry.npmjs.org/@types/webpack-sources/-/webpack-sources-0.1.7.tgz",
            "integrity": "sha512-XyaHrJILjK1VHVC4aVlKsdNN5KBTwufMb43cQs+flGxtPAf/1Qwl8+Q0tp5BwEGaI8D6XT1L+9bSWXckgkjTLw==",
            "dependencies": {
                "@types/node": "*",
                "@types/source-list-map": "*",
                "source-map": "^0.6.1"
            }
        },
        "node_modules/@types/webpack-sources/node_modules/@types/node": {
            "version": "12.12.31",
            "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.31.tgz",
            "integrity": "sha512-T+wnJno8uh27G9c+1T+a1/WYCHzLeDqtsGJkoEdSp2X8RTh3oOCZQcUnjAx90CS8cmmADX51O0FI/tu9s0yssg=="
        },
        "node_modules/@types/webpack/node_modules/@types/node": {
            "version": "12.12.31",
            "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.31.tgz",
            "integrity": "sha512-T+wnJno8uh27G9c+1T+a1/WYCHzLeDqtsGJkoEdSp2X8RTh3oOCZQcUnjAx90CS8cmmADX51O0FI/tu9s0yssg=="
        },
        "node_modules/@typescript-eslint/eslint-plugin": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-4.15.0.tgz",
            "integrity": "sha512-DJgdGZW+8CFUTz5C/dnn4ONcUm2h2T0itWD85Ob5/V27Ndie8hUoX5HKyGssvR8sUMkAIlUc/AMK67Lqa3kBIQ==",
            "dev": true,
            "dependencies": {
                "@typescript-eslint/experimental-utils": "4.15.0",
                "@typescript-eslint/scope-manager": "4.15.0",
                "debug": "^4.1.1",
                "functional-red-black-tree": "^1.0.1",
                "lodash": "^4.17.15",
                "regexpp": "^3.0.0",
                "semver": "^7.3.2",
                "tsutils": "^3.17.1"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            },
            "peerDependencies": {
                "@typescript-eslint/parser": "^4.0.0",
                "eslint": "^5.0.0 || ^6.0.0 || ^7.0.0"
            },
            "peerDependenciesMeta": {
                "typescript": {
                    "optional": true
                }
            }
        },
        "node_modules/@typescript-eslint/eslint-plugin/node_modules/debug": {
            "version": "4.3.1",
            "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
            "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
            "dev": true,
            "dependencies": {
                "ms": "2.1.2"
            },
            "engines": {
                "node": ">=6.0"
            },
            "peerDependenciesMeta": {
                "supports-color": {
                    "optional": true
                }
            }
        },
        "node_modules/@typescript-eslint/eslint-plugin/node_modules/lru-cache": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
            "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
            "dev": true,
            "dependencies": {
                "yallist": "^4.0.0"
            },
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/@typescript-eslint/eslint-plugin/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/@typescript-eslint/eslint-plugin/node_modules/semver": {
            "version": "7.3.4",
            "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.4.tgz",
            "integrity": "sha512-tCfb2WLjqFAtXn4KEdxIhalnRtoKFN7nAwj0B3ZXCbQloV2tq5eDbcTmT68JJD3nRJq24/XgxtQKFIpQdtvmVw==",
            "dev": true,
            "dependencies": {
                "lru-cache": "^6.0.0"
            },
            "bin": {
                "semver": "bin/semver.js"
            },
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/@typescript-eslint/eslint-plugin/node_modules/tsutils": {
            "version": "3.20.0",
            "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-3.20.0.tgz",
            "integrity": "sha512-RYbuQuvkhuqVeXweWT3tJLKOEJ/UUw9GjNEZGWdrLLlM+611o1gwLHBpxoFJKKl25fLprp2eVthtKs5JOrNeXg==",
            "dev": true,
            "dependencies": {
                "tslib": "^1.8.1"
            },
            "engines": {
                "node": ">= 6"
            },
            "peerDependencies": {
                "typescript": ">=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta"
            }
        },
        "node_modules/@typescript-eslint/eslint-plugin/node_modules/yallist": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
            "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
            "dev": true
        },
        "node_modules/@typescript-eslint/experimental-utils": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/experimental-utils/-/experimental-utils-4.15.0.tgz",
            "integrity": "sha512-V4vaDWvxA2zgesg4KPgEGiomWEBpJXvY4ZX34Y3qxK8LUm5I87L+qGIOTd9tHZOARXNRt9pLbblSKiYBlGMawg==",
            "dev": true,
            "dependencies": {
                "@types/json-schema": "^7.0.3",
                "@typescript-eslint/scope-manager": "4.15.0",
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/typescript-estree": "4.15.0",
                "eslint-scope": "^5.0.0",
                "eslint-utils": "^2.0.0"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            },
            "peerDependencies": {
                "eslint": "*"
            }
        },
        "node_modules/@typescript-eslint/experimental-utils/node_modules/eslint-scope": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.1.1.tgz",
            "integrity": "sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==",
            "dev": true,
            "dependencies": {
                "esrecurse": "^4.3.0",
                "estraverse": "^4.1.1"
            },
            "engines": {
                "node": ">=8.0.0"
            }
        },
        "node_modules/@typescript-eslint/parser": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-4.15.0.tgz",
            "integrity": "sha512-L6Dtbq8Bc7g2aZwnIBETpmUa9XDKCMzKVwAArnGp5Mn7PRNFjf3mUzq8UeBjL3K8t311hvevnyqXAMSmxO8Gpg==",
            "dev": true,
            "dependencies": {
                "@typescript-eslint/scope-manager": "4.15.0",
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/typescript-estree": "4.15.0",
                "debug": "^4.1.1"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            },
            "peerDependencies": {
                "eslint": "^5.0.0 || ^6.0.0 || ^7.0.0"
            },
            "peerDependenciesMeta": {
                "typescript": {
                    "optional": true
                }
            }
        },
        "node_modules/@typescript-eslint/parser/node_modules/debug": {
            "version": "4.3.1",
            "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
            "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
            "dev": true,
            "dependencies": {
                "ms": "2.1.2"
            },
            "engines": {
                "node": ">=6.0"
            },
            "peerDependenciesMeta": {
                "supports-color": {
                    "optional": true
                }
            }
        },
        "node_modules/@typescript-eslint/parser/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/@typescript-eslint/scope-manager": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-4.15.0.tgz",
            "integrity": "sha512-CSNBZnCC2jEA/a+pR9Ljh8Y+5TY5qgbPz7ICEk9WCpSEgT6Pi7H2RIjxfrrbUXvotd6ta+i27sssKEH8Azm75g==",
            "dev": true,
            "dependencies": {
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/visitor-keys": "4.15.0"
            },
            "engines": {
                "node": "^8.10.0 || ^10.13.0 || >=11.10.1"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            }
        },
        "node_modules/@typescript-eslint/types": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-4.15.0.tgz",
            "integrity": "sha512-su4RHkJhS+iFwyqyXHcS8EGPlUVoC+XREfy5daivjLur9JP8GhvTmDipuRpcujtGC4M+GYhUOJCPDE3rC5NJrg==",
            "dev": true,
            "engines": {
                "node": "^8.10.0 || ^10.13.0 || >=11.10.1"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-4.15.0.tgz",
            "integrity": "sha512-jG6xTmcNbi6xzZq0SdWh7wQ9cMb2pqXaUp6bUZOMsIlu5aOlxGxgE/t6L/gPybybQGvdguajXGkZKSndZJpksA==",
            "dev": true,
            "dependencies": {
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/visitor-keys": "4.15.0",
                "debug": "^4.1.1",
                "globby": "^11.0.1",
                "is-glob": "^4.0.1",
                "semver": "^7.3.2",
                "tsutils": "^3.17.1"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            },
            "peerDependenciesMeta": {
                "typescript": {
                    "optional": true
                }
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/array-union": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/array-union/-/array-union-2.1.0.tgz",
            "integrity": "sha512-HGyxoOTYUyCM6stUe6EJgnd4EoewAI7zMdfqO+kGjnlZmBDz/cR5pf8r/cR4Wq60sL/p0IkcjUEEPwS3GFrIyw==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/debug": {
            "version": "4.3.1",
            "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
            "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
            "dev": true,
            "dependencies": {
                "ms": "2.1.2"
            },
            "engines": {
                "node": ">=6.0"
            },
            "peerDependenciesMeta": {
                "supports-color": {
                    "optional": true
                }
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/globby": {
            "version": "11.0.2",
            "resolved": "https://registry.npmjs.org/globby/-/globby-11.0.2.tgz",
            "integrity": "sha512-2ZThXDvvV8fYFRVIxnrMQBipZQDr7MxKAmQK1vujaj9/7eF0efG7BPUKJ7jP7G5SLF37xKDXvO4S/KKLj/Z0og==",
            "dev": true,
            "dependencies": {
                "array-union": "^2.1.0",
                "dir-glob": "^3.0.1",
                "fast-glob": "^3.1.1",
                "ignore": "^5.1.4",
                "merge2": "^1.3.0",
                "slash": "^3.0.0"
            },
            "engines": {
                "node": ">=10"
            },
            "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/ignore": {
            "version": "5.1.8",
            "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.1.8.tgz",
            "integrity": "sha512-BMpfD7PpiETpBl/A6S498BaIJ6Y/ABT93ETbby2fP00v4EbvPBXWEoaR1UBPKs3iR53pJY7EtZk5KACI57i1Uw==",
            "dev": true,
            "engines": {
                "node": ">= 4"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/is-extglob": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
            "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/is-glob": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
            "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
            "dev": true,
            "dependencies": {
                "is-extglob": "^2.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/lru-cache": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
            "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
            "dev": true,
            "dependencies": {
                "yallist": "^4.0.0"
            },
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
            "version": "7.3.4",
            "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.4.tgz",
            "integrity": "sha512-tCfb2WLjqFAtXn4KEdxIhalnRtoKFN7nAwj0B3ZXCbQloV2tq5eDbcTmT68JJD3nRJq24/XgxtQKFIpQdtvmVw==",
            "dev": true,
            "dependencies": {
                "lru-cache": "^6.0.0"
            },
            "bin": {
                "semver": "bin/semver.js"
            },
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/tsutils": {
            "version": "3.20.0",
            "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-3.20.0.tgz",
            "integrity": "sha512-RYbuQuvkhuqVeXweWT3tJLKOEJ/UUw9GjNEZGWdrLLlM+611o1gwLHBpxoFJKKl25fLprp2eVthtKs5JOrNeXg==",
            "dev": true,
            "dependencies": {
                "tslib": "^1.8.1"
            },
            "engines": {
                "node": ">= 6"
            },
            "peerDependencies": {
                "typescript": ">=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta"
            }
        },
        "node_modules/@typescript-eslint/typescript-estree/node_modules/yallist": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
            "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
            "dev": true
        },
        "node_modules/@typescript-eslint/visitor-keys": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-4.15.0.tgz",
            "integrity": "sha512-RnDtJwOwFucWFAMjG3ghCG/ikImFJFEg20DI7mn4pHEx3vC48lIAoyjhffvfHmErRDboUPC7p9Z2il4CLb7qxA==",
            "dev": true,
            "dependencies": {
                "@typescript-eslint/types": "4.15.0",
                "eslint-visitor-keys": "^2.0.0"
            },
            "engines": {
                "node": "^8.10.0 || ^10.13.0 || >=11.10.1"
            },
            "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/typescript-eslint"
            }
        },
        "node_modules/@webassemblyjs/ast": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.7.11.tgz",
            "integrity": "sha512-ZEzy4vjvTzScC+SH8RBssQUawpaInUdMTYwYYLh54/s8TuT0gBLuyUnppKsVyZEi876VmmStKsUs28UxPgdvrA==",
            "dependencies": {
                "@webassemblyjs/helper-module-context": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/wast-parser": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/floating-point-hex-parser": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.7.11.tgz",
            "integrity": "sha512-zY8dSNyYcgzNRNT666/zOoAyImshm3ycKdoLsyDw/Bwo6+/uktb7p4xyApuef1dwEBo/U/SYQzbGBvV+nru2Xg=="
        },
        "node_modules/@webassemblyjs/helper-api-error": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.7.11.tgz",
            "integrity": "sha512-7r1qXLmiglC+wPNkGuXCvkmalyEstKVwcueZRP2GNC2PAvxbLYwLLPr14rcdJaE4UtHxQKfFkuDFuv91ipqvXg=="
        },
        "node_modules/@webassemblyjs/helper-buffer": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.7.11.tgz",
            "integrity": "sha512-MynuervdylPPh3ix+mKZloTcL06P8tenNH3sx6s0qE8SLR6DdwnfgA7Hc9NSYeob2jrW5Vql6GVlsQzKQCa13w=="
        },
        "node_modules/@webassemblyjs/helper-code-frame": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.7.11.tgz",
            "integrity": "sha512-T8ESC9KMXFTXA5urJcyor5cn6qWeZ4/zLPyWeEXZ03hj/x9weSokGNkVCdnhSabKGYWxElSdgJ+sFa9G/RdHNw==",
            "dependencies": {
                "@webassemblyjs/wast-printer": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/helper-fsm": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.7.11.tgz",
            "integrity": "sha512-nsAQWNP1+8Z6tkzdYlXT0kxfa2Z1tRTARd8wYnc/e3Zv3VydVVnaeePgqUzFrpkGUyhUUxOl5ML7f1NuT+gC0A=="
        },
        "node_modules/@webassemblyjs/helper-module-context": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.7.11.tgz",
            "integrity": "sha512-JxfD5DX8Ygq4PvXDucq0M+sbUFA7BJAv/GGl9ITovqE+idGX+J3QSzJYz+LwQmL7fC3Rs+utvWoJxDb6pmC0qg=="
        },
        "node_modules/@webassemblyjs/helper-wasm-bytecode": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.7.11.tgz",
            "integrity": "sha512-cMXeVS9rhoXsI9LLL4tJxBgVD/KMOKXuFqYb5oCJ/opScWpkCMEz9EJtkonaNcnLv2R3K5jIeS4TRj/drde1JQ=="
        },
        "node_modules/@webassemblyjs/helper-wasm-section": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.7.11.tgz",
            "integrity": "sha512-8ZRY5iZbZdtNFE5UFunB8mmBEAbSI3guwbrsCl4fWdfRiAcvqQpeqd5KHhSWLL5wuxo53zcaGZDBU64qgn4I4Q==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-buffer": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/wasm-gen": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/ieee754": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.7.11.tgz",
            "integrity": "sha512-Mmqx/cS68K1tSrvRLtaV/Lp3NZWzXtOHUW2IvDvl2sihAwJh4ACE0eL6A8FvMyDG9abes3saB6dMimLOs+HMoQ==",
            "dependencies": {
                "@xtuc/ieee754": "^1.2.0"
            }
        },
        "node_modules/@webassemblyjs/leb128": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.7.11.tgz",
            "integrity": "sha512-vuGmgZjjp3zjcerQg+JA+tGOncOnJLWVkt8Aze5eWQLwTQGNgVLcyOTqgSCxWTR4J42ijHbBxnuRaL1Rv7XMdw==",
            "dependencies": {
                "@xtuc/long": "4.2.1"
            }
        },
        "node_modules/@webassemblyjs/utf8": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.7.11.tgz",
            "integrity": "sha512-C6GFkc7aErQIAH+BMrIdVSmW+6HSe20wg57HEC1uqJP8E/xpMjXqQUxkQw07MhNDSDcGpxI9G5JSNOQCqJk4sA=="
        },
        "node_modules/@webassemblyjs/wasm-edit": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.7.11.tgz",
            "integrity": "sha512-FUd97guNGsCZQgeTPKdgxJhBXkUbMTY6hFPf2Y4OedXd48H97J+sOY2Ltaq6WGVpIH8o/TGOVNiVz/SbpEMJGg==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-buffer": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/helper-wasm-section": "1.7.11",
                "@webassemblyjs/wasm-gen": "1.7.11",
                "@webassemblyjs/wasm-opt": "1.7.11",
                "@webassemblyjs/wasm-parser": "1.7.11",
                "@webassemblyjs/wast-printer": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/wasm-gen": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.7.11.tgz",
            "integrity": "sha512-U/KDYp7fgAZX5KPfq4NOupK/BmhDc5Kjy2GIqstMhvvdJRcER/kUsMThpWeRP8BMn4LXaKhSTggIJPOeYHwISA==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/ieee754": "1.7.11",
                "@webassemblyjs/leb128": "1.7.11",
                "@webassemblyjs/utf8": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/wasm-opt": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.7.11.tgz",
            "integrity": "sha512-XynkOwQyiRidh0GLua7SkeHvAPXQV/RxsUeERILmAInZegApOUAIJfRuPYe2F7RcjOC9tW3Cb9juPvAC/sCqvg==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-buffer": "1.7.11",
                "@webassemblyjs/wasm-gen": "1.7.11",
                "@webassemblyjs/wasm-parser": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/wasm-parser": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.7.11.tgz",
            "integrity": "sha512-6lmXRTrrZjYD8Ng8xRyvyXQJYUQKYSXhJqXOBLw24rdiXsHAOlvw5PhesjdcaMadU/pyPQOJ5dHreMjBxwnQKg==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-api-error": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/ieee754": "1.7.11",
                "@webassemblyjs/leb128": "1.7.11",
                "@webassemblyjs/utf8": "1.7.11"
            }
        },
        "node_modules/@webassemblyjs/wast-parser": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.7.11.tgz",
            "integrity": "sha512-lEyVCg2np15tS+dm7+JJTNhNWq9yTZvi3qEhAIIOaofcYlUp0UR5/tVqOwa/gXYr3gjwSZqw+/lS9dscyLelbQ==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/floating-point-hex-parser": "1.7.11",
                "@webassemblyjs/helper-api-error": "1.7.11",
                "@webassemblyjs/helper-code-frame": "1.7.11",
                "@webassemblyjs/helper-fsm": "1.7.11",
                "@xtuc/long": "4.2.1"
            }
        },
        "node_modules/@webassemblyjs/wast-printer": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.7.11.tgz",
            "integrity": "sha512-m5vkAsuJ32QpkdkDOUPGSltrg8Cuk3KBx4YrmAGQwCZPRdUHXxG4phIOuuycLemHFr74sWL9Wthqss4fzdzSwg==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/wast-parser": "1.7.11",
                "@xtuc/long": "4.2.1"
            }
        },
        "node_modules/@xtuc/ieee754": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
            "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA=="
        },
        "node_modules/@xtuc/long": {
            "version": "4.2.1",
            "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.1.tgz",
            "integrity": "sha512-FZdkNBDqBRHKQ2MEbSC17xnPFOhZxeJ2YGSfr2BKf3sujG49Qe3bB+rGCwQfIaA7WHnGeGkSijX4FuBCdrzW/g=="
        },
        "node_modules/abort-controller": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
            "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
            "dependencies": {
                "event-target-shim": "^5.0.0"
            },
            "engines": {
                "node": ">=6.5"
            }
        },
        "node_modules/acorn": {
            "version": "5.7.4",
            "resolved": "https://registry.npmjs.org/acorn/-/acorn-5.7.4.tgz",
            "integrity": "sha512-1D++VG7BhrtvQpNbBzovKNc1FLGGEE/oGe7b9xJm/RFHMBeUaUGpluV9RLjZa47YFdPcDAenEYuq9pQPcMdLJg==",
            "bin": {
                "acorn": "bin/acorn"
            },
            "engines": {
                "node": ">=0.4.0"
            }
        },
        "node_modules/acorn-dynamic-import": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/acorn-dynamic-import/-/acorn-dynamic-import-3.0.0.tgz",
            "integrity": "sha512-zVWV8Z8lislJoOKKqdNMOB+s6+XV5WERty8MnKBeFgwA+19XJjJHs2RP5dzM57FftIs+jQnRToLiWazKr6sSWg==",
            "dependencies": {
                "acorn": "^5.0.0"
            }
        },
        "node_modules/adal-node": {
            "version": "0.1.28",
            "resolved": "https://registry.npmjs.org/adal-node/-/adal-node-0.1.28.tgz",
            "integrity": "sha1-RoxLs+u9lrEnBmn0ucuk4AZepIU=",
            "dependencies": {
                "@types/node": "^8.0.47",
                "async": ">=0.6.0",
                "date-utils": "*",
                "jws": "3.x.x",
                "request": ">= 2.52.0",
                "underscore": ">= 1.3.1",
                "uuid": "^3.1.0",
                "xmldom": ">= 0.1.x",
                "xpath.js": "~1.1.0"
            },
            "engines": {
                "node": ">= 0.6.15"
            }
        },
        "node_modules/adal-node/node_modules/@types/node": {
            "version": "8.10.59",
            "resolved": "https://registry.npmjs.org/@types/node/-/node-8.10.59.tgz",
            "integrity": "sha512-8RkBivJrDCyPpBXhVZcjh7cQxVBSmRk9QM7hOketZzp6Tg79c0N8kkpAIito9bnJ3HCVCHVYz+KHTEbfQNfeVQ=="
        },
        "node_modules/agent-base": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
            "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
            "dev": true,
            "dependencies": {
                "es6-promisify": "^5.0.0"
            },
            "engines": {
                "node": ">= 4.0.0"
            }
        },
        "node_modules/ajv": {
            "version": "6.12.0",
            "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.0.tgz",
            "integrity": "sha512-D6gFiFA0RRLyUbvijN74DWAjXSFxWKaWP7mldxkVhyhAV3+SWA9HEJPHQ2c9soIeTFJqcSdFDGFgdqs1iUU2Hw==",
            "dependencies": {
                "fast-deep-equal": "^3.1.1",
                "fast-json-stable-stringify": "^2.0.0",
                "json-schema-traverse": "^0.4.1",
                "uri-js": "^4.2.2"
            }
        },
        "node_modules/ajv-errors": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.1.tgz",
            "integrity": "sha512-DCRfO/4nQ+89p/RK43i8Ezd41EqdGIU4ld7nGF8OQ14oc/we5rEntLCUa7+jrn3nn83BosfwZA0wb4pon2o8iQ=="
        },
        "node_modules/ajv-keywords": {
            "version": "3.4.1",
            "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.4.1.tgz",
            "integrity": "sha512-RO1ibKvd27e6FEShVFfPALuHI3WjSVNeK5FIsmme/LYRNxjKuNj+Dt7bucLa6NdSv3JcVTyMlm9kGR84z1XpaQ=="
        },
        "node_modules/ansi-colors": {
            "version": "3.2.3",
            "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-3.2.3.tgz",
            "integrity": "sha512-LEHHyuhlPY3TmuUYMh2oz89lTShfvgbmzaBcxve9t/9Wuy7Dwf4yoAKcND7KFT1HAQfqZ12qtc+DUrBMeKF9nw==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/ansi-regex": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
            "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/ansi-styles": {
            "version": "3.2.1",
            "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
            "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
            "dependencies": {
                "color-convert": "^1.9.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/anymatch": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-1.3.2.tgz",
            "integrity": "sha512-0XNayC8lTHQ2OI8aljNCN3sSx6hsr/1+rlcDAotXJR7C1oZZHCNsfpbKwMjRA3Uqb5tF1Rae2oloTr4xpq+WjA==",
            "dependencies": {
                "micromatch": "^2.1.5",
                "normalize-path": "^2.0.0"
            }
        },
        "node_modules/anymatch/node_modules/normalize-path": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
            "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
            "dependencies": {
                "remove-trailing-separator": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/aproba": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
            "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw=="
        },
        "node_modules/archiver": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/archiver/-/archiver-3.1.1.tgz",
            "integrity": "sha512-5Hxxcig7gw5Jod/8Gq0OneVgLYET+oNHcxgWItq4TbhOzRLKNAFUb9edAftiMKXvXfCB0vbGrJdZDNq0dWMsxg==",
            "dependencies": {
                "archiver-utils": "^2.1.0",
                "async": "^2.6.3",
                "buffer-crc32": "^0.2.1",
                "glob": "^7.1.4",
                "readable-stream": "^3.4.0",
                "tar-stream": "^2.1.0",
                "zip-stream": "^2.1.2"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/archiver-utils": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/archiver-utils/-/archiver-utils-2.1.0.tgz",
            "integrity": "sha512-bEL/yUb/fNNiNTuUz979Z0Yg5L+LzLxGJz8x79lYmR54fmTIb6ob/hNQgkQnIUDWIFjZVQwl9Xs356I6BAMHfw==",
            "dependencies": {
                "glob": "^7.1.4",
                "graceful-fs": "^4.2.0",
                "lazystream": "^1.0.0",
                "lodash.defaults": "^4.2.0",
                "lodash.difference": "^4.5.0",
                "lodash.flatten": "^4.4.0",
                "lodash.isplainobject": "^4.0.6",
                "lodash.union": "^4.6.0",
                "normalize-path": "^3.0.0",
                "readable-stream": "^2.0.0"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/archiver-utils/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/archiver-utils/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/archiver/node_modules/async": {
            "version": "2.6.3",
            "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",
            "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",
            "dependencies": {
                "lodash": "^4.17.14"
            }
        },
        "node_modules/argparse": {
            "version": "1.0.10",
            "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
            "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
            "dev": true,
            "dependencies": {
                "sprintf-js": "~1.0.2"
            }
        },
        "node_modules/arr-diff": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
            "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
            "dependencies": {
                "arr-flatten": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/arr-flatten": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
            "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/arr-union": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
            "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/array-includes": {
            "version": "3.1.2",
            "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.2.tgz",
            "integrity": "sha512-w2GspexNQpx+PutG3QpT437/BenZBj0M/MZGn5mzv/MofYqo0xmRHzn4lFsoDlWJ+THYsGJmFlW68WlDFx7VRw==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "es-abstract": "^1.18.0-next.1",
                "get-intrinsic": "^1.0.1",
                "is-string": "^1.0.5"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/array-includes/node_modules/es-abstract": {
            "version": "1.18.0-next.2",
            "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.0-next.2.tgz",
            "integrity": "sha512-Ih4ZMFHEtZupnUh6497zEL4y2+w8+1ljnCyaTa+adcoafI1GOvMwFlDjBLfWR7y9VLfrjRJe9ocuHY1PSR9jjw==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.2",
                "es-to-primitive": "^1.2.1",
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1",
                "is-callable": "^1.2.2",
                "is-negative-zero": "^2.0.1",
                "is-regex": "^1.1.1",
                "object-inspect": "^1.9.0",
                "object-keys": "^1.1.1",
                "object.assign": "^4.1.2",
                "string.prototype.trimend": "^1.0.3",
                "string.prototype.trimstart": "^1.0.3"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/array-includes/node_modules/object.assign": {
            "version": "4.1.2",
            "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
            "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "has-symbols": "^1.0.1",
                "object-keys": "^1.1.1"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/array-union": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
            "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
            "dependencies": {
                "array-uniq": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/array-uniq": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
            "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/array-unique": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
            "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/array.prototype.flat": {
            "version": "1.2.4",
            "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.2.4.tgz",
            "integrity": "sha512-4470Xi3GAPAjZqFcljX2xzckv1qeKPizoNkiS0+O4IoPR2ZNpcjE0pkhdihlDouK+x6QOast26B4Q/O9DJnwSg==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "es-abstract": "^1.18.0-next.1"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/array.prototype.flat/node_modules/es-abstract": {
            "version": "1.18.0-next.2",
            "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.0-next.2.tgz",
            "integrity": "sha512-Ih4ZMFHEtZupnUh6497zEL4y2+w8+1ljnCyaTa+adcoafI1GOvMwFlDjBLfWR7y9VLfrjRJe9ocuHY1PSR9jjw==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.2",
                "es-to-primitive": "^1.2.1",
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1",
                "is-callable": "^1.2.2",
                "is-negative-zero": "^2.0.1",
                "is-regex": "^1.1.1",
                "object-inspect": "^1.9.0",
                "object-keys": "^1.1.1",
                "object.assign": "^4.1.2",
                "string.prototype.trimend": "^1.0.3",
                "string.prototype.trimstart": "^1.0.3"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/array.prototype.flat/node_modules/object.assign": {
            "version": "4.1.2",
            "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
            "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "has-symbols": "^1.0.1",
                "object-keys": "^1.1.1"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/arrify": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
            "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/asn1": {
            "version": "0.2.4",
            "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
            "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
            "dependencies": {
                "safer-buffer": "~2.1.0"
            }
        },
        "node_modules/asn1.js": {
            "version": "4.10.1",
            "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
            "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
            "dependencies": {
                "bn.js": "^4.0.0",
                "inherits": "^2.0.1",
                "minimalistic-assert": "^1.0.0"
            }
        },
        "node_modules/assert": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/assert/-/assert-1.5.0.tgz",
            "integrity": "sha512-EDsgawzwoun2CZkCgtxJbv392v4nbk9XDD06zI+kQYoBM/3RBWLlEyJARDOmhAAosBjWACEkKL6S+lIZtcAubA==",
            "dependencies": {
                "object-assign": "^4.1.1",
                "util": "0.10.3"
            }
        },
        "node_modules/assert-plus": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
            "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
            "engines": {
                "node": ">=0.8"
            }
        },
        "node_modules/assert/node_modules/inherits": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
            "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE="
        },
        "node_modules/assert/node_modules/util": {
            "version": "0.10.3",
            "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
            "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
            "dependencies": {
                "inherits": "2.0.1"
            }
        },
        "node_modules/assign-symbols": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
            "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/astral-regex": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/astral-regex/-/astral-regex-2.0.0.tgz",
            "integrity": "sha512-Z7tMw1ytTXt5jqMcOP+OQteU1VuNK9Y02uuJtKQ1Sv69jXQKKg5cibLwGJow8yzZP+eAc18EmLGPal0bp36rvQ==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/async": {
            "version": "2.6.0",
            "resolved": "https://registry.npmjs.org/async/-/async-2.6.0.tgz",
            "integrity": "sha512-xAfGg1/NTLBBKlHFmnd7PlmUW9KhVQIUuSrYem9xzFUZy13ScvtyGGejaae9iAVRiRq9+Cx7DPFaAAhCpyxyPw==",
            "dependencies": {
                "lodash": "^4.14.0"
            }
        },
        "node_modules/async-each": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.3.tgz",
            "integrity": "sha512-z/WhQ5FPySLdvREByI2vZiTWwCnF0moMJ1hK9YQwDTHKh6I7/uSckMetoRGb5UBZPC1z0jlw+n/XCgjeH7y1AQ=="
        },
        "node_modules/asynckit": {
            "version": "0.4.0",
            "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
            "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
        },
        "node_modules/atob": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
            "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg==",
            "bin": {
                "atob": "bin/atob.js"
            },
            "engines": {
                "node": ">= 4.5.0"
            }
        },
        "node_modules/aws-sign2": {
            "version": "0.7.0",
            "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
            "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg=",
            "engines": {
                "node": "*"
            }
        },
        "node_modules/aws4": {
            "version": "1.9.1",
            "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.9.1.tgz",
            "integrity": "sha512-wMHVg2EOHaMRxbzgFJ9gtjOOCrI80OHLG14rxi28XwOW8ux6IiEbRCGGGqCtdAIg4FQCbW20k9RsT4y3gJlFug=="
        },
        "node_modules/babel-runtime": {
            "version": "6.26.0",
            "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
            "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
            "dependencies": {
                "core-js": "^2.4.0",
                "regenerator-runtime": "^0.11.0"
            }
        },
        "node_modules/balanced-match": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
            "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c="
        },
        "node_modules/base": {
            "version": "0.11.2",
            "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
            "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
            "dependencies": {
                "cache-base": "^1.0.1",
                "class-utils": "^0.3.5",
                "component-emitter": "^1.2.1",
                "define-property": "^1.0.0",
                "isobject": "^3.0.1",
                "mixin-deep": "^1.2.0",
                "pascalcase": "^0.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base/node_modules/define-property": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
            "dependencies": {
                "is-descriptor": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/base64-js": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
            "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g=="
        },
        "node_modules/bcrypt-pbkdf": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
            "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
            "dependencies": {
                "tweetnacl": "^0.14.3"
            }
        },
        "node_modules/big.js": {
            "version": "5.2.2",
            "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
            "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ==",
            "engines": {
                "node": "*"
            }
        },
        "node_modules/binary-extensions": {
            "version": "1.13.1",
            "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
            "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/bindings": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
            "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
            "optional": true,
            "dependencies": {
                "file-uri-to-path": "1.0.0"
            }
        },
        "node_modules/bl": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/bl/-/bl-4.0.3.tgz",
            "integrity": "sha512-fs4G6/Hu4/EE+F75J8DuN/0IpQqNjAdC7aEQv7Qt8MHGUH7Ckv2MwTEEeN9QehD0pfIDkMI1bkHYkKy7xHyKIg==",
            "dependencies": {
                "buffer": "^5.5.0",
                "inherits": "^2.0.4",
                "readable-stream": "^3.4.0"
            }
        },
        "node_modules/bluebird": {
            "version": "3.7.2",
            "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
            "integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
        },
        "node_modules/bn.js": {
            "version": "4.11.8",
            "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.8.tgz",
            "integrity": "sha512-ItfYfPLkWHUjckQCk8xC+LwxgK8NYcXywGigJgSwOP8Y2iyWT4f2vsZnoOXTTbo+o5yXmIUJ4gn5538SO5S3gA=="
        },
        "node_modules/brace-expansion": {
            "version": "1.1.11",
            "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
            "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
            "dependencies": {
                "balanced-match": "^1.0.0",
                "concat-map": "0.0.1"
            }
        },
        "node_modules/braces": {
            "version": "1.8.5",
            "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
            "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
            "dependencies": {
                "expand-range": "^1.8.1",
                "preserve": "^0.2.0",
                "repeat-element": "^1.1.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/brorand": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
            "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8="
        },
        "node_modules/browser-stdout": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/browser-stdout/-/browser-stdout-1.3.1.tgz",
            "integrity": "sha512-qhAVI1+Av2X7qelOfAIYwXONood6XlZE/fXaBSmW/T5SzLAmCgzi+eiWE7fUvbHaeNBQH13UftjpXxsfLkMpgw==",
            "dev": true
        },
        "node_modules/browserify-aes": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
            "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
            "dependencies": {
                "buffer-xor": "^1.0.3",
                "cipher-base": "^1.0.0",
                "create-hash": "^1.1.0",
                "evp_bytestokey": "^1.0.3",
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "node_modules/browserify-cipher": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
            "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
            "dependencies": {
                "browserify-aes": "^1.0.4",
                "browserify-des": "^1.0.0",
                "evp_bytestokey": "^1.0.0"
            }
        },
        "node_modules/browserify-des": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
            "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
            "dependencies": {
                "cipher-base": "^1.0.1",
                "des.js": "^1.0.0",
                "inherits": "^2.0.1",
                "safe-buffer": "^5.1.2"
            }
        },
        "node_modules/browserify-rsa": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
            "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
            "dependencies": {
                "bn.js": "^4.1.0",
                "randombytes": "^2.0.1"
            }
        },
        "node_modules/browserify-sign": {
            "version": "4.0.4",
            "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.0.4.tgz",
            "integrity": "sha1-qk62jl17ZYuqa/alfmMMvXqT0pg=",
            "dependencies": {
                "bn.js": "^4.1.1",
                "browserify-rsa": "^4.0.0",
                "create-hash": "^1.1.0",
                "create-hmac": "^1.1.2",
                "elliptic": "^6.0.0",
                "inherits": "^2.0.1",
                "parse-asn1": "^5.0.0"
            }
        },
        "node_modules/browserify-zlib": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
            "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
            "dependencies": {
                "pako": "~1.0.5"
            }
        },
        "node_modules/buffer": {
            "version": "5.5.0",
            "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.5.0.tgz",
            "integrity": "sha512-9FTEDjLjwoAkEwyMGDjYJQN2gfRgOKBKRfiglhvibGbpeeU/pQn1bJxQqm32OD/AIeEuHxU9roxXxg34Byp/Ww==",
            "dependencies": {
                "base64-js": "^1.0.2",
                "ieee754": "^1.1.4"
            }
        },
        "node_modules/buffer-crc32": {
            "version": "0.2.13",
            "resolved": "https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.13.tgz",
            "integrity": "sha1-DTM+PwDqxQqhRUq9MO+MKl2ackI=",
            "engines": {
                "node": "*"
            }
        },
        "node_modules/buffer-equal-constant-time": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
            "integrity": "sha1-+OcRMvf/5uAaXJaXpMbz5I1cyBk="
        },
        "node_modules/buffer-from": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
            "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A=="
        },
        "node_modules/buffer-xor": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
            "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk="
        },
        "node_modules/builtin-status-codes": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
            "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug="
        },
        "node_modules/cacache": {
            "version": "12.0.4",
            "resolved": "https://registry.npmjs.org/cacache/-/cacache-12.0.4.tgz",
            "integrity": "sha512-a0tMB40oefvuInr4Cwb3GerbL9xTj1D5yg0T5xrjGCGyfvbxseIXX7BAO/u/hIXdafzOI5JC3wDwHyf24buOAQ==",
            "dependencies": {
                "bluebird": "^3.5.5",
                "chownr": "^1.1.1",
                "figgy-pudding": "^3.5.1",
                "glob": "^7.1.4",
                "graceful-fs": "^4.1.15",
                "infer-owner": "^1.0.3",
                "lru-cache": "^5.1.1",
                "mississippi": "^3.0.0",
                "mkdirp": "^0.5.1",
                "move-concurrently": "^1.0.1",
                "promise-inflight": "^1.0.1",
                "rimraf": "^2.6.3",
                "ssri": "^6.0.1",
                "unique-filename": "^1.1.1",
                "y18n": "^4.0.0"
            }
        },
        "node_modules/cache-base": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
            "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
            "dependencies": {
                "collection-visit": "^1.0.0",
                "component-emitter": "^1.2.1",
                "get-value": "^2.0.6",
                "has-value": "^1.0.0",
                "isobject": "^3.0.1",
                "set-value": "^2.0.0",
                "to-object-path": "^0.3.0",
                "union-value": "^1.0.0",
                "unset-value": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/cache-base/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/call-bind": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.2.tgz",
            "integrity": "sha512-7O+FbCihrB5WGbFYesctwmTKae6rOiIzmz1icreWJ+0aA7LJfuqhEso2T9ncpcFtzMQtzXf2QGGueWJGTYsqrA==",
            "dev": true,
            "dependencies": {
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/callsites": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
            "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/camelcase": {
            "version": "5.3.1",
            "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
            "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/caseless": {
            "version": "0.12.0",
            "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
            "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
        },
        "node_modules/chalk": {
            "version": "2.4.2",
            "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
            "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
            "dependencies": {
                "ansi-styles": "^3.2.1",
                "escape-string-regexp": "^1.0.5",
                "supports-color": "^5.3.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/charenc": {
            "version": "0.0.2",
            "resolved": "https://registry.npmjs.org/charenc/-/charenc-0.0.2.tgz",
            "integrity": "sha1-wKHS86cJLgN3S/qD8UwPxXkKhmc=",
            "dev": true,
            "engines": {
                "node": "*"
            }
        },
        "node_modules/chokidar": {
            "version": "1.7.0",
            "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-1.7.0.tgz",
            "integrity": "sha1-eY5ol3gVHIB2tLNg5e3SjNortGg=",
            "dependencies": {
                "anymatch": "^1.3.0",
                "async-each": "^1.0.0",
                "glob-parent": "^2.0.0",
                "inherits": "^2.0.1",
                "is-binary-path": "^1.0.0",
                "is-glob": "^2.0.0",
                "path-is-absolute": "^1.0.0",
                "readdirp": "^2.0.0"
            },
            "optionalDependencies": {
                "fsevents": "^1.0.0"
            }
        },
        "node_modules/chownr": {
            "version": "1.1.4",
            "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
            "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg=="
        },
        "node_modules/chrome-trace-event": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.2.tgz",
            "integrity": "sha512-9e/zx1jw7B4CO+c/RXoCsfg/x1AfUBioy4owYH0bJprEYAx5hRFLRhWBqHAG57D0ZM4H7vxbP7bPe0VwhQRYDQ==",
            "dependencies": {
                "tslib": "^1.9.0"
            },
            "engines": {
                "node": ">=6.0"
            }
        },
        "node_modules/cipher-base": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
            "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
            "dependencies": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "node_modules/class-utils": {
            "version": "0.3.6",
            "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
            "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
            "dependencies": {
                "arr-union": "^3.1.0",
                "define-property": "^0.2.5",
                "isobject": "^3.0.0",
                "static-extend": "^0.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/class-utils/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/class-utils/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/clean-webpack-plugin": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/clean-webpack-plugin/-/clean-webpack-plugin-3.0.0.tgz",
            "integrity": "sha512-MciirUH5r+cYLGCOL5JX/ZLzOZbVr1ot3Fw+KcvbhUb6PM+yycqd9ZhIlcigQ5gl+XhppNmw3bEFuaaMNyLj3A==",
            "dependencies": {
                "@types/webpack": "^4.4.31",
                "del": "^4.1.1"
            },
            "engines": {
                "node": ">=8.9.0"
            }
        },
        "node_modules/cliui": {
            "version": "5.0.0",
            "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
            "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
            "dev": true,
            "dependencies": {
                "string-width": "^3.1.0",
                "strip-ansi": "^5.2.0",
                "wrap-ansi": "^5.1.0"
            }
        },
        "node_modules/cliui/node_modules/ansi-regex": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
            "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/cliui/node_modules/string-width": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
            "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
            "dev": true,
            "dependencies": {
                "emoji-regex": "^7.0.1",
                "is-fullwidth-code-point": "^2.0.0",
                "strip-ansi": "^5.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/cliui/node_modules/strip-ansi": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
            "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
            "dev": true,
            "dependencies": {
                "ansi-regex": "^4.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/collection-visit": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
            "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
            "dependencies": {
                "map-visit": "^1.0.0",
                "object-visit": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/color-convert": {
            "version": "1.9.3",
            "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
            "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
            "dependencies": {
                "color-name": "1.1.3"
            }
        },
        "node_modules/color-name": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
            "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU="
        },
        "node_modules/combined-stream": {
            "version": "1.0.8",
            "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
            "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
            "dependencies": {
                "delayed-stream": "~1.0.0"
            },
            "engines": {
                "node": ">= 0.8"
            }
        },
        "node_modules/commander": {
            "version": "2.20.3",
            "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
            "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
        },
        "node_modules/commondir": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
            "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs="
        },
        "node_modules/component-emitter": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
            "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg=="
        },
        "node_modules/compress-commons": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/compress-commons/-/compress-commons-2.1.1.tgz",
            "integrity": "sha512-eVw6n7CnEMFzc3duyFVrQEuY1BlHR3rYsSztyG32ibGMW722i3C6IizEGMFmfMU+A+fALvBIwxN3czffTcdA+Q==",
            "dependencies": {
                "buffer-crc32": "^0.2.13",
                "crc32-stream": "^3.0.1",
                "normalize-path": "^3.0.0",
                "readable-stream": "^2.3.6"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/compress-commons/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/compress-commons/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/concat-map": {
            "version": "0.0.1",
            "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
            "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s="
        },
        "node_modules/concat-stream": {
            "version": "1.6.2",
            "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
            "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
            "engines": [
                "node >= 0.8"
            ],
            "dependencies": {
                "buffer-from": "^1.0.0",
                "inherits": "^2.0.3",
                "readable-stream": "^2.2.2",
                "typedarray": "^0.0.6"
            }
        },
        "node_modules/concat-stream/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/concat-stream/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/console-browserify": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.2.0.tgz",
            "integrity": "sha512-ZMkYO/LkF17QvCPqM0gxw8yUzigAOZOSWSHg91FH6orS7vcEj5dVZTidN2fQ14yBSdg97RqhSNwLUXInd52OTA=="
        },
        "node_modules/constants-browserify": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
            "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U="
        },
        "node_modules/contains-path": {
            "version": "0.1.0",
            "resolved": "https://registry.npmjs.org/contains-path/-/contains-path-0.1.0.tgz",
            "integrity": "sha1-/ozxhP9mcLa67wGp1IYaXL7EEgo=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/copy-concurrently": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
            "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
            "dependencies": {
                "aproba": "^1.1.1",
                "fs-write-stream-atomic": "^1.0.8",
                "iferr": "^0.1.5",
                "mkdirp": "^0.5.1",
                "rimraf": "^2.5.4",
                "run-queue": "^1.0.0"
            }
        },
        "node_modules/copy-descriptor": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
            "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/core-js": {
            "version": "2.6.11",
            "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.11.tgz",
            "integrity": "sha512-5wjnpaT/3dV+XB4borEsnAYQchn00XSgTAWKDkEqv+K8KevjbzmofK6hfJ9TZIlpj2N0xQpazy7PiRQiWHqzWg=="
        },
        "node_modules/core-util-is": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
            "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
        },
        "node_modules/cpx": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/cpx/-/cpx-1.5.0.tgz",
            "integrity": "sha1-GFvgGFEdhycN7czCkxceN2VauI8=",
            "dependencies": {
                "babel-runtime": "^6.9.2",
                "chokidar": "^1.6.0",
                "duplexer": "^0.1.1",
                "glob": "^7.0.5",
                "glob2base": "^0.0.12",
                "minimatch": "^3.0.2",
                "mkdirp": "^0.5.1",
                "resolve": "^1.1.7",
                "safe-buffer": "^5.0.1",
                "shell-quote": "^1.6.1",
                "subarg": "^1.0.0"
            },
            "bin": {
                "cpx": "bin/index.js"
            }
        },
        "node_modules/crc": {
            "version": "3.8.0",
            "resolved": "https://registry.npmjs.org/crc/-/crc-3.8.0.tgz",
            "integrity": "sha512-iX3mfgcTMIq3ZKLIsVFAbv7+Mc10kxabAGQb8HvjA1o3T1PIYprbakQ65d3I+2HGHt6nSKkM9PYjgoJO2KcFBQ==",
            "dependencies": {
                "buffer": "^5.1.0"
            }
        },
        "node_modules/crc32-stream": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/crc32-stream/-/crc32-stream-3.0.1.tgz",
            "integrity": "sha512-mctvpXlbzsvK+6z8kJwSJ5crm7yBwrQMTybJzMw1O4lLGJqjlDCXY2Zw7KheiA6XBEcBmfLx1D88mjRGVJtY9w==",
            "dependencies": {
                "crc": "^3.4.4",
                "readable-stream": "^3.4.0"
            },
            "engines": {
                "node": ">= 6.9.0"
            }
        },
        "node_modules/create-ecdh": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.3.tgz",
            "integrity": "sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==",
            "dependencies": {
                "bn.js": "^4.1.0",
                "elliptic": "^6.0.0"
            }
        },
        "node_modules/create-hash": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
            "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
            "dependencies": {
                "cipher-base": "^1.0.1",
                "inherits": "^2.0.1",
                "md5.js": "^1.3.4",
                "ripemd160": "^2.0.1",
                "sha.js": "^2.4.0"
            }
        },
        "node_modules/create-hmac": {
            "version": "1.1.7",
            "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
            "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
            "dependencies": {
                "cipher-base": "^1.0.3",
                "create-hash": "^1.1.0",
                "inherits": "^2.0.1",
                "ripemd160": "^2.0.0",
                "safe-buffer": "^5.0.1",
                "sha.js": "^2.4.8"
            }
        },
        "node_modules/cross-spawn": {
            "version": "7.0.3",
            "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.3.tgz",
            "integrity": "sha512-iRDPJKUPVEND7dHPO8rkbOnPpyDygcDFtWjpeWNCgy8WP2rXcxXL8TskReQl6OrB2G7+UJrags1q15Fudc7G6w==",
            "dev": true,
            "dependencies": {
                "path-key": "^3.1.0",
                "shebang-command": "^2.0.0",
                "which": "^2.0.1"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/cross-spawn/node_modules/which": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
            "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
            "dev": true,
            "dependencies": {
                "isexe": "^2.0.0"
            },
            "bin": {
                "node-which": "bin/node-which"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/crypt": {
            "version": "0.0.2",
            "resolved": "https://registry.npmjs.org/crypt/-/crypt-0.0.2.tgz",
            "integrity": "sha1-iNf/fsDfuG9xPch7u0LQRNPmxBs=",
            "dev": true,
            "engines": {
                "node": "*"
            }
        },
        "node_modules/crypto-browserify": {
            "version": "3.12.0",
            "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
            "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
            "dependencies": {
                "browserify-cipher": "^1.0.0",
                "browserify-sign": "^4.0.0",
                "create-ecdh": "^4.0.0",
                "create-hash": "^1.1.0",
                "create-hmac": "^1.1.0",
                "diffie-hellman": "^5.0.0",
                "inherits": "^2.0.1",
                "pbkdf2": "^3.0.3",
                "public-encrypt": "^4.0.0",
                "randombytes": "^2.0.0",
                "randomfill": "^1.0.3"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/cyclist": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-1.0.1.tgz",
            "integrity": "sha1-WW6WmP0MgOEgOMK4LW6xs1tiJNk="
        },
        "node_modules/dashdash": {
            "version": "1.14.1",
            "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
            "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
            "dependencies": {
                "assert-plus": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10"
            }
        },
        "node_modules/date-utils": {
            "version": "1.2.21",
            "resolved": "https://registry.npmjs.org/date-utils/-/date-utils-1.2.21.tgz",
            "integrity": "sha1-YfsWzcEnSzyayq/+n8ad+HIKK2Q=",
            "engines": {
                "node": ">0.4.0"
            }
        },
        "node_modules/debug": {
            "version": "2.6.9",
            "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
            "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
            "dependencies": {
                "ms": "2.0.0"
            }
        },
        "node_modules/decamelize": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
            "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/decode-uri-component": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
            "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU=",
            "engines": {
                "node": ">=0.10"
            }
        },
        "node_modules/deep-is": {
            "version": "0.1.3",
            "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.3.tgz",
            "integrity": "sha1-s2nW+128E+7PUk+RsHD+7cNXzzQ=",
            "dev": true
        },
        "node_modules/define-properties": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.3.tgz",
            "integrity": "sha512-3MqfYKj2lLzdMSf8ZIZE/V+Zuy+BgD6f164e8K2w7dgnpKArBDerGYpM46IYYcjnkdPNMjPk9A6VFB8+3SKlXQ==",
            "dev": true,
            "dependencies": {
                "object-keys": "^1.0.12"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/define-property": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
            "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
            "dependencies": {
                "is-descriptor": "^1.0.2",
                "isobject": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/define-property/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/define-property/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/define-property/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/define-property/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/define-property/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/del": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/del/-/del-4.1.1.tgz",
            "integrity": "sha512-QwGuEUouP2kVwQenAsOof5Fv8K9t3D8Ca8NxcXKrIpEHjTXK5J2nXLdP+ALI1cgv8wj7KuwBhTwBkOZSJKM5XQ==",
            "dependencies": {
                "@types/glob": "^7.1.1",
                "globby": "^6.1.0",
                "is-path-cwd": "^2.0.0",
                "is-path-in-cwd": "^2.0.0",
                "p-map": "^2.0.0",
                "pify": "^4.0.1",
                "rimraf": "^2.6.3"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/delayed-stream": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
            "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk=",
            "engines": {
                "node": ">=0.4.0"
            }
        },
        "node_modules/des.js": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.1.tgz",
            "integrity": "sha512-Q0I4pfFrv2VPd34/vfLrFOoRmlYj3OV50i7fskps1jZWK1kApMWWT9G6RRUeYedLcBDIhnSDaUvJMb3AhUlaEA==",
            "dependencies": {
                "inherits": "^2.0.1",
                "minimalistic-assert": "^1.0.0"
            }
        },
        "node_modules/diff": {
            "version": "3.5.0",
            "resolved": "https://registry.npmjs.org/diff/-/diff-3.5.0.tgz",
            "integrity": "sha512-A46qtFgd+g7pDZinpnwiRJtxbC1hpgf0uzP3iG89scHk0AUC7A1TGxf5OiiOUv/JMZR8GOt8hL900hV0bOy5xA==",
            "dev": true,
            "engines": {
                "node": ">=0.3.1"
            }
        },
        "node_modules/diffie-hellman": {
            "version": "5.0.3",
            "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
            "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
            "dependencies": {
                "bn.js": "^4.1.0",
                "miller-rabin": "^4.0.0",
                "randombytes": "^2.0.0"
            }
        },
        "node_modules/dir-glob": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-3.0.1.tgz",
            "integrity": "sha512-WkrWp9GR4KXfKGYzOLmTuGVi1UWFfws377n9cc55/tb6DuqyF6pcQ5AbiHEshaDpY9v6oaSr2XCDidGmMwdzIA==",
            "dev": true,
            "dependencies": {
                "path-type": "^4.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/dir-glob/node_modules/path-type": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
            "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/doctrine": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
            "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",
            "dev": true,
            "dependencies": {
                "esutils": "^2.0.2"
            },
            "engines": {
                "node": ">=6.0.0"
            }
        },
        "node_modules/domain-browser": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
            "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA==",
            "engines": {
                "node": ">=0.4",
                "npm": ">=1.2"
            }
        },
        "node_modules/duplexer": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/duplexer/-/duplexer-0.1.1.tgz",
            "integrity": "sha1-rOb/gIwc5mtX0ev5eXessCM0z8E="
        },
        "node_modules/duplexify": {
            "version": "3.7.1",
            "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.7.1.tgz",
            "integrity": "sha512-07z8uv2wMyS51kKhD1KsdXJg5WQ6t93RneqRxUHnskXVtlYYkLqM0gqStQZ3pj073g687jPCHrqNfCzawLYh5g==",
            "dependencies": {
                "end-of-stream": "^1.0.0",
                "inherits": "^2.0.1",
                "readable-stream": "^2.0.0",
                "stream-shift": "^1.0.0"
            }
        },
        "node_modules/duplexify/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/duplexify/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/ecc-jsbn": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
            "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
            "dependencies": {
                "jsbn": "~0.1.0",
                "safer-buffer": "^2.1.0"
            }
        },
        "node_modules/ecdsa-sig-formatter": {
            "version": "1.0.11",
            "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
            "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
            "dependencies": {
                "safe-buffer": "^5.0.1"
            }
        },
        "node_modules/elliptic": {
            "version": "6.5.3",
            "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.3.tgz",
            "integrity": "sha512-IMqzv5wNQf+E6aHeIqATs0tOLeOTwj1QKbRcS3jBbYkl5oLAserA8yJTT7/VyHUYG91PRmPyeQDObKLPpeS4dw==",
            "dependencies": {
                "bn.js": "^4.4.0",
                "brorand": "^1.0.1",
                "hash.js": "^1.0.0",
                "hmac-drbg": "^1.0.0",
                "inherits": "^2.0.1",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.0"
            }
        },
        "node_modules/emoji-regex": {
            "version": "7.0.3",
            "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
            "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA==",
            "dev": true
        },
        "node_modules/emojis-list": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-3.0.0.tgz",
            "integrity": "sha512-/kyM18EfinwXZbno9FyUGeFh87KC8HRQBQGildHZbEuRyWFOmv1U10o9BBp8XVZDVNNuQKyIGIu5ZYAAXJ0V2Q==",
            "engines": {
                "node": ">= 4"
            }
        },
        "node_modules/end-of-stream": {
            "version": "1.4.4",
            "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
            "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
            "dependencies": {
                "once": "^1.4.0"
            }
        },
        "node_modules/enhanced-resolve": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.1.1.tgz",
            "integrity": "sha512-98p2zE+rL7/g/DzMHMTF4zZlCgeVdJ7yr6xzEpJRYwFYrGi9ANdn5DnJURg6RpBkyk60XYDnWIv51VfIhfNGuA==",
            "dependencies": {
                "graceful-fs": "^4.1.2",
                "memory-fs": "^0.5.0",
                "tapable": "^1.0.0"
            },
            "engines": {
                "node": ">=6.9.0"
            }
        },
        "node_modules/enquirer": {
            "version": "2.3.6",
            "resolved": "https://registry.npmjs.org/enquirer/-/enquirer-2.3.6.tgz",
            "integrity": "sha512-yjNnPr315/FjS4zIsUxYguYUPP2e1NK4d7E7ZOLiyYCcbFBiTMyID+2wvm2w6+pZ/odMA7cRkjhsPbltwBOrLg==",
            "dev": true,
            "dependencies": {
                "ansi-colors": "^4.1.1"
            },
            "engines": {
                "node": ">=8.6"
            }
        },
        "node_modules/enquirer/node_modules/ansi-colors": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-4.1.1.tgz",
            "integrity": "sha512-JoX0apGbHaUJBNl6yF+p6JAFYZ666/hhCGKN5t9QFjbJQKUU/g8MNbFDbvfrgKXvI1QpZplPOnwIo99lX/AAmA==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/errno": {
            "version": "0.1.7",
            "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.7.tgz",
            "integrity": "sha512-MfrRBDWzIWifgq6tJj60gkAwtLNb6sQPlcFrSOflcP1aFmmruKQ2wRnze/8V6kgyz7H3FF8Npzv78mZ7XLLflg==",
            "dependencies": {
                "prr": "~1.0.1"
            },
            "bin": {
                "errno": "cli.js"
            }
        },
        "node_modules/error-ex": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
            "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
            "dev": true,
            "dependencies": {
                "is-arrayish": "^0.2.1"
            }
        },
        "node_modules/es-abstract": {
            "version": "1.17.5",
            "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.5.tgz",
            "integrity": "sha512-BR9auzDbySxOcfog0tLECW8l28eRGpDpU3Dm3Hp4q/N+VtLTmyj4EUN088XZWQDW/hzj6sYRDXeOFsaAODKvpg==",
            "dev": true,
            "dependencies": {
                "es-to-primitive": "^1.2.1",
                "function-bind": "^1.1.1",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1",
                "is-callable": "^1.1.5",
                "is-regex": "^1.0.5",
                "object-inspect": "^1.7.0",
                "object-keys": "^1.1.1",
                "object.assign": "^4.1.0",
                "string.prototype.trimleft": "^2.1.1",
                "string.prototype.trimright": "^2.1.1"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/es-to-primitive": {
            "version": "1.2.1",
            "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.1.tgz",
            "integrity": "sha512-QCOllgZJtaUo9miYBcLChTUaHNjJF3PYs1VidD7AwiEj1kYxKeQTctLAezAOH5ZKRH0g2IgPn6KwB4IT8iRpvA==",
            "dev": true,
            "dependencies": {
                "is-callable": "^1.1.4",
                "is-date-object": "^1.0.1",
                "is-symbol": "^1.0.2"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/es6-promise": {
            "version": "4.2.8",
            "resolved": "https://registry.npmjs.org/es6-promise/-/es6-promise-4.2.8.tgz",
            "integrity": "sha512-HJDGx5daxeIvxdBxvG2cb9g4tEvwIk3i8+nhX0yGrYmZUzbkdg8QbDevheDB8gd0//uPj4c1EQua8Q+MViT0/w==",
            "dev": true
        },
        "node_modules/es6-promisify": {
            "version": "5.0.0",
            "resolved": "https://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz",
            "integrity": "sha1-UQnWLz5W6pZ8S2NQWu8IKRyKUgM=",
            "dev": true,
            "dependencies": {
                "es6-promise": "^4.0.3"
            }
        },
        "node_modules/escape-string-regexp": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
            "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ=",
            "engines": {
                "node": ">=0.8.0"
            }
        },
        "node_modules/eslint": {
            "version": "7.19.0",
            "resolved": "https://registry.npmjs.org/eslint/-/eslint-7.19.0.tgz",
            "integrity": "sha512-CGlMgJY56JZ9ZSYhJuhow61lMPPjUzWmChFya71Z/jilVos7mR/jPgaEfVGgMBY5DshbKdG8Ezb8FDCHcoMEMg==",
            "dev": true,
            "dependencies": {
                "@babel/code-frame": "^7.0.0",
                "@eslint/eslintrc": "^0.3.0",
                "ajv": "^6.10.0",
                "chalk": "^4.0.0",
                "cross-spawn": "^7.0.2",
                "debug": "^4.0.1",
                "doctrine": "^3.0.0",
                "enquirer": "^2.3.5",
                "eslint-scope": "^5.1.1",
                "eslint-utils": "^2.1.0",
                "eslint-visitor-keys": "^2.0.0",
                "espree": "^7.3.1",
                "esquery": "^1.2.0",
                "esutils": "^2.0.2",
                "file-entry-cache": "^6.0.0",
                "functional-red-black-tree": "^1.0.1",
                "glob-parent": "^5.0.0",
                "globals": "^12.1.0",
                "ignore": "^4.0.6",
                "import-fresh": "^3.0.0",
                "imurmurhash": "^0.1.4",
                "is-glob": "^4.0.0",
                "js-yaml": "^3.13.1",
                "json-stable-stringify-without-jsonify": "^1.0.1",
                "levn": "^0.4.1",
                "lodash": "^4.17.20",
                "minimatch": "^3.0.4",
                "natural-compare": "^1.4.0",
                "optionator": "^0.9.1",
                "progress": "^2.0.0",
                "regexpp": "^3.1.0",
                "semver": "^7.2.1",
                "strip-ansi": "^6.0.0",
                "strip-json-comments": "^3.1.0",
                "table": "^6.0.4",
                "text-table": "^0.2.0",
                "v8-compile-cache": "^2.0.3"
            },
            "bin": {
                "eslint": "bin/eslint.js"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            },
            "funding": {
                "url": "https://opencollective.com/eslint"
            }
        },
        "node_modules/eslint-import-resolver-node": {
            "version": "0.3.4",
            "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.4.tgz",
            "integrity": "sha512-ogtf+5AB/O+nM6DIeBUNr2fuT7ot9Qg/1harBfBtaP13ekEWFQEEMP94BCB7zaNW3gyY+8SHYF00rnqYwXKWOA==",
            "dev": true,
            "dependencies": {
                "debug": "^2.6.9",
                "resolve": "^1.13.1"
            }
        },
        "node_modules/eslint-module-utils": {
            "version": "2.6.0",
            "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.6.0.tgz",
            "integrity": "sha512-6j9xxegbqe8/kZY8cYpcp0xhbK0EgJlg3g9mib3/miLaExuuwc3n5UEfSnU6hWMbT0FAYVvDbL9RrRgpUeQIvA==",
            "dev": true,
            "dependencies": {
                "debug": "^2.6.9",
                "pkg-dir": "^2.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-module-utils/node_modules/find-up": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
            "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
            "dev": true,
            "dependencies": {
                "locate-path": "^2.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-module-utils/node_modules/locate-path": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
            "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
            "dev": true,
            "dependencies": {
                "p-locate": "^2.0.0",
                "path-exists": "^3.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-module-utils/node_modules/p-limit": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
            "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
            "dev": true,
            "dependencies": {
                "p-try": "^1.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-module-utils/node_modules/p-locate": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
            "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
            "dev": true,
            "dependencies": {
                "p-limit": "^1.1.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-module-utils/node_modules/p-try": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
            "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-module-utils/node_modules/pkg-dir": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
            "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
            "dev": true,
            "dependencies": {
                "find-up": "^2.1.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-plugin-import": {
            "version": "2.22.1",
            "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.22.1.tgz",
            "integrity": "sha512-8K7JjINHOpH64ozkAhpT3sd+FswIZTfMZTjdx052pnWrgRCVfp8op9tbjpAk3DdUeI/Ba4C8OjdC0r90erHEOw==",
            "dev": true,
            "dependencies": {
                "array-includes": "^3.1.1",
                "array.prototype.flat": "^1.2.3",
                "contains-path": "^0.1.0",
                "debug": "^2.6.9",
                "doctrine": "1.5.0",
                "eslint-import-resolver-node": "^0.3.4",
                "eslint-module-utils": "^2.6.0",
                "has": "^1.0.3",
                "minimatch": "^3.0.4",
                "object.values": "^1.1.1",
                "read-pkg-up": "^2.0.0",
                "resolve": "^1.17.0",
                "tsconfig-paths": "^3.9.0"
            },
            "engines": {
                "node": ">=4"
            },
            "peerDependencies": {
                "eslint": "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0"
            }
        },
        "node_modules/eslint-plugin-import/node_modules/doctrine": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
            "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
            "dev": true,
            "dependencies": {
                "esutils": "^2.0.2",
                "isarray": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/eslint-scope": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
            "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
            "dependencies": {
                "esrecurse": "^4.1.0",
                "estraverse": "^4.1.1"
            },
            "engines": {
                "node": ">=4.0.0"
            }
        },
        "node_modules/eslint-utils": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/eslint-utils/-/eslint-utils-2.1.0.tgz",
            "integrity": "sha512-w94dQYoauyvlDc43XnGB8lU3Zt713vNChgt4EWwhXAP2XkBvndfxF0AgIqKOOasjPIPzj9JqgwkwbCYD0/V3Zg==",
            "dev": true,
            "dependencies": {
                "eslint-visitor-keys": "^1.1.0"
            },
            "engines": {
                "node": ">=6"
            },
            "funding": {
                "url": "https://github.com/sponsors/mysticatea"
            }
        },
        "node_modules/eslint-utils/node_modules/eslint-visitor-keys": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.3.0.tgz",
            "integrity": "sha512-6J72N8UNa462wa/KFODt/PJ3IU60SDpC3QXC1Hjc1BXXpfL2C9R5+AU7jhe0F6GREqVMh4Juu+NY7xn+6dipUQ==",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/eslint-visitor-keys": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-2.0.0.tgz",
            "integrity": "sha512-QudtT6av5WXels9WjIM7qz1XD1cWGvX4gGXvp/zBn9nXG02D0utdU3Em2m/QjTnrsk6bBjmCygl3rmj118msQQ==",
            "dev": true,
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/eslint/node_modules/ansi-regex": {
            "version": "5.0.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
            "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/eslint/node_modules/ansi-styles": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
            "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
            "dev": true,
            "dependencies": {
                "color-convert": "^2.0.1"
            },
            "engines": {
                "node": ">=8"
            },
            "funding": {
                "url": "https://github.com/chalk/ansi-styles?sponsor=1"
            }
        },
        "node_modules/eslint/node_modules/chalk": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.0.tgz",
            "integrity": "sha512-qwx12AxXe2Q5xQ43Ac//I6v5aXTipYrSESdOgzrN+9XjgEpyjpKuvSGaN4qE93f7TQTlerQQ8S+EQ0EyDoVL1A==",
            "dev": true,
            "dependencies": {
                "ansi-styles": "^4.1.0",
                "supports-color": "^7.1.0"
            },
            "engines": {
                "node": ">=10"
            },
            "funding": {
                "url": "https://github.com/chalk/chalk?sponsor=1"
            }
        },
        "node_modules/eslint/node_modules/color-convert": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
            "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
            "dev": true,
            "dependencies": {
                "color-name": "~1.1.4"
            },
            "engines": {
                "node": ">=7.0.0"
            }
        },
        "node_modules/eslint/node_modules/color-name": {
            "version": "1.1.4",
            "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
            "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
            "dev": true
        },
        "node_modules/eslint/node_modules/debug": {
            "version": "4.3.1",
            "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
            "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
            "dev": true,
            "dependencies": {
                "ms": "2.1.2"
            },
            "engines": {
                "node": ">=6.0"
            },
            "peerDependenciesMeta": {
                "supports-color": {
                    "optional": true
                }
            }
        },
        "node_modules/eslint/node_modules/eslint-scope": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.1.1.tgz",
            "integrity": "sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==",
            "dev": true,
            "dependencies": {
                "esrecurse": "^4.3.0",
                "estraverse": "^4.1.1"
            },
            "engines": {
                "node": ">=8.0.0"
            }
        },
        "node_modules/eslint/node_modules/glob-parent": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
            "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
            "dev": true,
            "dependencies": {
                "is-glob": "^4.0.1"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/eslint/node_modules/has-flag": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
            "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/eslint/node_modules/is-extglob": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
            "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/eslint/node_modules/is-glob": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
            "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
            "dev": true,
            "dependencies": {
                "is-extglob": "^2.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/eslint/node_modules/lru-cache": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
            "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
            "dev": true,
            "dependencies": {
                "yallist": "^4.0.0"
            },
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/eslint/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/eslint/node_modules/semver": {
            "version": "7.3.4",
            "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.4.tgz",
            "integrity": "sha512-tCfb2WLjqFAtXn4KEdxIhalnRtoKFN7nAwj0B3ZXCbQloV2tq5eDbcTmT68JJD3nRJq24/XgxtQKFIpQdtvmVw==",
            "dev": true,
            "dependencies": {
                "lru-cache": "^6.0.0"
            },
            "bin": {
                "semver": "bin/semver.js"
            },
            "engines": {
                "node": ">=10"
            }
        },
        "node_modules/eslint/node_modules/strip-ansi": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
            "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
            "dev": true,
            "dependencies": {
                "ansi-regex": "^5.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/eslint/node_modules/strip-json-comments": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
            "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
            "dev": true,
            "engines": {
                "node": ">=8"
            },
            "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
            }
        },
        "node_modules/eslint/node_modules/supports-color": {
            "version": "7.2.0",
            "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
            "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
            "dev": true,
            "dependencies": {
                "has-flag": "^4.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/eslint/node_modules/yallist": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
            "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
            "dev": true
        },
        "node_modules/espree": {
            "version": "7.3.1",
            "resolved": "https://registry.npmjs.org/espree/-/espree-7.3.1.tgz",
            "integrity": "sha512-v3JCNCE64umkFpmkFGqzVKsOT0tN1Zr+ueqLZfpV1Ob8e+CEgPWa+OxCoGH3tnhimMKIaBm4m/vaRpJ/krRz2g==",
            "dev": true,
            "dependencies": {
                "acorn": "^7.4.0",
                "acorn-jsx": "^5.3.1",
                "eslint-visitor-keys": "^1.3.0"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            }
        },
        "node_modules/espree/node_modules/acorn": {
            "version": "7.4.1",
            "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.4.1.tgz",
            "integrity": "sha512-nQyp0o1/mNdbTO1PO6kHkwSrmgZ0MT/jCCpNiwbUjGoRN4dlBhqJtoQuCnEOKzgTVwg0ZWiCoQy6SxMebQVh8A==",
            "dev": true,
            "bin": {
                "acorn": "bin/acorn"
            },
            "engines": {
                "node": ">=0.4.0"
            }
        },
        "node_modules/espree/node_modules/acorn-jsx": {
            "version": "5.3.1",
            "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.1.tgz",
            "integrity": "sha512-K0Ptm/47OKfQRpNQ2J/oIN/3QYiK6FwW+eJbILhsdxh2WTLdl+30o8aGdTbm5JbffpFFAg/g+zi1E+jvJha5ng==",
            "dev": true,
            "peerDependencies": {
                "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
            }
        },
        "node_modules/espree/node_modules/eslint-visitor-keys": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.3.0.tgz",
            "integrity": "sha512-6J72N8UNa462wa/KFODt/PJ3IU60SDpC3QXC1Hjc1BXXpfL2C9R5+AU7jhe0F6GREqVMh4Juu+NY7xn+6dipUQ==",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/esprima": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
            "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
            "dev": true,
            "bin": {
                "esparse": "bin/esparse.js",
                "esvalidate": "bin/esvalidate.js"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/esquery": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.4.0.tgz",
            "integrity": "sha512-cCDispWt5vHHtwMY2YrAQ4ibFkAL8RbH5YGBnZBc90MolvvfkkQcJro/aZiAQUlQ3qgrYS6D6v8Gc5G5CQsc9w==",
            "dev": true,
            "dependencies": {
                "estraverse": "^5.1.0"
            },
            "engines": {
                "node": ">=0.10"
            }
        },
        "node_modules/esquery/node_modules/estraverse": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.2.0.tgz",
            "integrity": "sha512-BxbNGGNm0RyRYvUdHpIwv9IWzeM9XClbOxwoATuFdOE7ZE6wHL+HQ5T8hoPM+zHvmKzzsEqhgy0GrQ5X13afiQ==",
            "dev": true,
            "engines": {
                "node": ">=4.0"
            }
        },
        "node_modules/esrecurse": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
            "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
            "dependencies": {
                "estraverse": "^5.2.0"
            },
            "engines": {
                "node": ">=4.0"
            }
        },
        "node_modules/esrecurse/node_modules/estraverse": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.2.0.tgz",
            "integrity": "sha512-BxbNGGNm0RyRYvUdHpIwv9IWzeM9XClbOxwoATuFdOE7ZE6wHL+HQ5T8hoPM+zHvmKzzsEqhgy0GrQ5X13afiQ==",
            "engines": {
                "node": ">=4.0"
            }
        },
        "node_modules/estraverse": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
            "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==",
            "engines": {
                "node": ">=4.0"
            }
        },
        "node_modules/esutils": {
            "version": "2.0.3",
            "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
            "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/event-target-shim": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
            "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/events": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/events/-/events-3.1.0.tgz",
            "integrity": "sha512-Rv+u8MLHNOdMjTAFeT3nCjHn2aGlx435FP/sDHNaRhDEMwyI/aB22Kj2qIN8R0cw3z28psEQLYwxVKLsKrMgWg==",
            "engines": {
                "node": ">=0.8.x"
            }
        },
        "node_modules/evp_bytestokey": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
            "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
            "dependencies": {
                "md5.js": "^1.3.4",
                "safe-buffer": "^5.1.1"
            }
        },
        "node_modules/expand-brackets": {
            "version": "0.1.5",
            "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
            "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
            "dependencies": {
                "is-posix-bracket": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/expand-range": {
            "version": "1.8.2",
            "resolved": "https://registry.npmjs.org/expand-range/-/expand-range-1.8.2.tgz",
            "integrity": "sha1-opnv/TNf4nIeuujiV+x5ZE/IUzc=",
            "dependencies": {
                "fill-range": "^2.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/extend": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
            "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
        },
        "node_modules/extend-shallow": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
            "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
            "dependencies": {
                "assign-symbols": "^1.0.0",
                "is-extendable": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/extend-shallow/node_modules/is-extendable": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
            "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
            "dependencies": {
                "is-plain-object": "^2.0.4"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/extglob": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
            "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
            "dependencies": {
                "is-extglob": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/extsprintf": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
            "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU=",
            "engines": [
                "node >=0.6.0"
            ]
        },
        "node_modules/fast-deep-equal": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.1.tgz",
            "integrity": "sha512-8UEa58QDLauDNfpbrX55Q9jrGHThw2ZMdOky5Gl1CDtVeJDPVrG4Jxx1N8jw2gkWaff5UUuX1KJd+9zGe2B+ZA=="
        },
        "node_modules/fast-glob": {
            "version": "3.2.5",
            "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.2.5.tgz",
            "integrity": "sha512-2DtFcgT68wiTTiwZ2hNdJfcHNke9XOfnwmBRWXhmeKM8rF0TGwmC/Qto3S7RoZKp5cilZbxzO5iTNTQsJ+EeDg==",
            "dev": true,
            "dependencies": {
                "@nodelib/fs.stat": "^2.0.2",
                "@nodelib/fs.walk": "^1.2.3",
                "glob-parent": "^5.1.0",
                "merge2": "^1.3.0",
                "micromatch": "^4.0.2",
                "picomatch": "^2.2.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/fast-glob/node_modules/braces": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
            "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
            "dev": true,
            "dependencies": {
                "fill-range": "^7.0.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/fast-glob/node_modules/fill-range": {
            "version": "7.0.1",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
            "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
            "dev": true,
            "dependencies": {
                "to-regex-range": "^5.0.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/fast-glob/node_modules/glob-parent": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
            "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
            "dev": true,
            "dependencies": {
                "is-glob": "^4.0.1"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/fast-glob/node_modules/is-extglob": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
            "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fast-glob/node_modules/is-glob": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
            "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
            "dev": true,
            "dependencies": {
                "is-extglob": "^2.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fast-glob/node_modules/is-number": {
            "version": "7.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
            "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
            "dev": true,
            "engines": {
                "node": ">=0.12.0"
            }
        },
        "node_modules/fast-glob/node_modules/micromatch": {
            "version": "4.0.2",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.2.tgz",
            "integrity": "sha512-y7FpHSbMUMoyPbYUSzO6PaZ6FyRnQOpHuKwbo1G+Knck95XVU4QAiKdGEnj5wwoS7PlOgthX/09u5iFJ+aYf5Q==",
            "dev": true,
            "dependencies": {
                "braces": "^3.0.1",
                "picomatch": "^2.0.5"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/fast-glob/node_modules/to-regex-range": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
            "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
            "dev": true,
            "dependencies": {
                "is-number": "^7.0.0"
            },
            "engines": {
                "node": ">=8.0"
            }
        },
        "node_modules/fast-json-stable-stringify": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
            "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="
        },
        "node_modules/fast-levenshtein": {
            "version": "2.0.6",
            "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
            "integrity": "sha1-PYpcZog6FqMMqGQ+hR8Zuqd5eRc=",
            "dev": true
        },
        "node_modules/fastq": {
            "version": "1.10.1",
            "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.10.1.tgz",
            "integrity": "sha512-AWuv6Ery3pM+dY7LYS8YIaCiQvUaos9OB1RyNgaOWnaX+Tik7Onvcsf8x8c+YtDeT0maYLniBip2hox5KtEXXA==",
            "dev": true,
            "dependencies": {
                "reusify": "^1.0.4"
            }
        },
        "node_modules/figgy-pudding": {
            "version": "3.5.2",
            "resolved": "https://registry.npmjs.org/figgy-pudding/-/figgy-pudding-3.5.2.tgz",
            "integrity": "sha512-0btnI/H8f2pavGMN8w40mlSKOfTK2SVJmBfBeVIj3kNw0swwgzyRq0d5TJVOwodFmtvpPeWPN/MCcfuWF0Ezbw=="
        },
        "node_modules/file-entry-cache": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-6.0.0.tgz",
            "integrity": "sha512-fqoO76jZ3ZnYrXLDRxBR1YvOvc0k844kcOg40bgsPrE25LAb/PDqTY+ho64Xh2c8ZXgIKldchCFHczG2UVRcWA==",
            "dev": true,
            "dependencies": {
                "flat-cache": "^3.0.4"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            }
        },
        "node_modules/file-uri-to-path": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
            "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
            "optional": true
        },
        "node_modules/filemanager-webpack-plugin": {
            "version": "2.0.5",
            "resolved": "https://registry.npmjs.org/filemanager-webpack-plugin/-/filemanager-webpack-plugin-2.0.5.tgz",
            "integrity": "sha512-Yj5XIdKI2AN2r66uZc4MZ/n18SMqe2KKlkAqHHMW1OwveDs2Vc5129CpbFcI73rq/rjqso+2HsxieS7u5sx6XA==",
            "dependencies": {
                "archiver": "^3.0.0",
                "cpx": "^1.5.0",
                "fs-extra": "^7.0.0",
                "make-dir": "^1.1.0",
                "mv": "^2.1.1",
                "rimraf": "^2.6.2"
            }
        },
        "node_modules/filemanager-webpack-plugin/node_modules/fs-extra": {
            "version": "7.0.1",
            "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-7.0.1.tgz",
            "integrity": "sha512-YJDaCJZEnBmcbw13fvdAM9AwNOJwOzrE4pqMqBq5nFiEqXUqHwlK4B+3pUw6JNvfSPtX05xFHtYy/1ni01eGCw==",
            "dependencies": {
                "graceful-fs": "^4.1.2",
                "jsonfile": "^4.0.0",
                "universalify": "^0.1.0"
            },
            "engines": {
                "node": ">=6 <7 || >=8"
            }
        },
        "node_modules/filename-regex": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/filename-regex/-/filename-regex-2.0.1.tgz",
            "integrity": "sha1-wcS5vuPglyXdsQa3XB4wH+LxiyY=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fill-range": {
            "version": "2.2.4",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-2.2.4.tgz",
            "integrity": "sha512-cnrcCbj01+j2gTG921VZPnHbjmdAf8oQV/iGeV2kZxGSyfYjjTyY79ErsK1WJWMpw6DaApEX72binqJE+/d+5Q==",
            "dependencies": {
                "is-number": "^2.1.0",
                "isobject": "^2.0.0",
                "randomatic": "^3.0.0",
                "repeat-element": "^1.1.2",
                "repeat-string": "^1.5.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/find-cache-dir": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.1.0.tgz",
            "integrity": "sha512-Tq6PixE0w/VMFfCgbONnkiQIVol/JJL7nRMi20fqzA4NRs9AfeqMGeRdPi3wIhYkxjeBaWh2rxwapn5Tu3IqOQ==",
            "dependencies": {
                "commondir": "^1.0.1",
                "make-dir": "^2.0.0",
                "pkg-dir": "^3.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/find-cache-dir/node_modules/make-dir": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
            "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
            "dependencies": {
                "pify": "^4.0.1",
                "semver": "^5.6.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/find-index": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/find-index/-/find-index-0.1.1.tgz",
            "integrity": "sha1-Z101iyyjiS15Whq0cjL4tuLg3eQ="
        },
        "node_modules/find-up": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
            "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
            "dependencies": {
                "locate-path": "^3.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/flat": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/flat/-/flat-4.1.0.tgz",
            "integrity": "sha512-Px/TiLIznH7gEDlPXcUD4KnBusa6kR6ayRUVcnEAbreRIuhkqow/mun59BuRXwoYk7ZQOLW1ZM05ilIvK38hFw==",
            "dev": true,
            "dependencies": {
                "is-buffer": "~2.0.3"
            },
            "bin": {
                "flat": "cli.js"
            }
        },
        "node_modules/flat-cache": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-3.0.4.tgz",
            "integrity": "sha512-dm9s5Pw7Jc0GvMYbshN6zchCA9RgQlzzEZX3vylR9IqFfS8XciblUXOKfW6SiuJ0e13eDYZoZV5wdrev7P3Nwg==",
            "dev": true,
            "dependencies": {
                "flatted": "^3.1.0",
                "rimraf": "^3.0.2"
            },
            "engines": {
                "node": "^10.12.0 || >=12.0.0"
            }
        },
        "node_modules/flat-cache/node_modules/rimraf": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
            "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
            "dev": true,
            "dependencies": {
                "glob": "^7.1.3"
            },
            "bin": {
                "rimraf": "bin.js"
            },
            "funding": {
                "url": "https://github.com/sponsors/isaacs"
            }
        },
        "node_modules/flat/node_modules/is-buffer": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-2.0.4.tgz",
            "integrity": "sha512-Kq1rokWXOPXWuaMAqZiJW4XxsmD9zGx9q4aePabbn3qCRGedtH7Cm+zV8WETitMfu1wdh+Rvd6w5egwSngUX2A==",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/flatted": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.1.1.tgz",
            "integrity": "sha512-zAoAQiudy+r5SvnSw3KJy5os/oRJYHzrzja/tBDqrZtNhUw8bt6y8OBzMWcjWr+8liV8Eb6yOhw8WZ7VFZ5ZzA==",
            "dev": true
        },
        "node_modules/flush-write-stream": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.1.1.tgz",
            "integrity": "sha512-3Z4XhFZ3992uIq0XOqb9AreonueSYphE6oYbpt5+3u06JWklbsPkNv3ZKkP9Bz/r+1MWCaMoSQ28P85+1Yc77w==",
            "dependencies": {
                "inherits": "^2.0.3",
                "readable-stream": "^2.3.6"
            }
        },
        "node_modules/flush-write-stream/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/flush-write-stream/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/for-in": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
            "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/for-own": {
            "version": "0.1.5",
            "resolved": "https://registry.npmjs.org/for-own/-/for-own-0.1.5.tgz",
            "integrity": "sha1-UmXGgaTylNq78XyVCbZ2OqhFEM4=",
            "dependencies": {
                "for-in": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/forever-agent": {
            "version": "0.6.1",
            "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
            "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE=",
            "engines": {
                "node": "*"
            }
        },
        "node_modules/form-data": {
            "version": "2.3.3",
            "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
            "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
            "dependencies": {
                "asynckit": "^0.4.0",
                "combined-stream": "^1.0.6",
                "mime-types": "^2.1.12"
            },
            "engines": {
                "node": ">= 0.12"
            }
        },
        "node_modules/fragment-cache": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
            "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
            "dependencies": {
                "map-cache": "^0.2.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/from2": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
            "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
            "dependencies": {
                "inherits": "^2.0.1",
                "readable-stream": "^2.0.0"
            }
        },
        "node_modules/from2/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/from2/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/fs-constants": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
            "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow=="
        },
        "node_modules/fs-extra": {
            "version": "8.1.0",
            "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-8.1.0.tgz",
            "integrity": "sha512-yhlQgA6mnOJUKOsRUFsgJdQCvkKhcz8tlZG5HBQfReYZy46OwLcY+Zia0mtdHsOo9y/hP+CxMN0TU9QxoOtG4g==",
            "dependencies": {
                "graceful-fs": "^4.2.0",
                "jsonfile": "^4.0.0",
                "universalify": "^0.1.0"
            },
            "engines": {
                "node": ">=6 <7 || >=8"
            }
        },
        "node_modules/fs-write-stream-atomic": {
            "version": "1.0.10",
            "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
            "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
            "dependencies": {
                "graceful-fs": "^4.1.2",
                "iferr": "^0.1.5",
                "imurmurhash": "^0.1.4",
                "readable-stream": "1 || 2"
            }
        },
        "node_modules/fs-write-stream-atomic/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/fs-write-stream-atomic/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/fs.realpath": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
            "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="
        },
        "node_modules/fsevents": {
            "version": "1.2.12",
            "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.12.tgz",
            "integrity": "sha512-Ggd/Ktt7E7I8pxZRbGIs7vwqAPscSESMrCSkx2FtWeqmheJgCo2R74fTsZFCifr0VTPwqRpPv17+6b8Zp7th0Q==",
            "bundleDependencies": [
                "abbrev",
                "ansi-regex",
                "aproba",
                "are-we-there-yet",
                "balanced-match",
                "brace-expansion",
                "chownr",
                "code-point-at",
                "concat-map",
                "console-control-strings",
                "core-util-is",
                "debug",
                "deep-extend",
                "delegates",
                "detect-libc",
                "fs-minipass",
                "fs.realpath",
                "gauge",
                "glob",
                "has-unicode",
                "iconv-lite",
                "ignore-walk",
                "inflight",
                "inherits",
                "ini",
                "is-fullwidth-code-point",
                "isarray",
                "minimatch",
                "minimist",
                "minipass",
                "minizlib",
                "mkdirp",
                "ms",
                "needle",
                "node-pre-gyp",
                "nopt",
                "npm-bundled",
                "npm-normalize-package-bin",
                "npm-packlist",
                "npmlog",
                "number-is-nan",
                "object-assign",
                "once",
                "os-homedir",
                "os-tmpdir",
                "osenv",
                "path-is-absolute",
                "process-nextick-args",
                "rc",
                "readable-stream",
                "rimraf",
                "safe-buffer",
                "safer-buffer",
                "sax",
                "semver",
                "set-blocking",
                "signal-exit",
                "string-width",
                "string_decoder",
                "strip-ansi",
                "strip-json-comments",
                "tar",
                "util-deprecate",
                "wide-align",
                "wrappy",
                "yallist"
            ],
            "optional": true,
            "os": [
                "darwin"
            ],
            "dependencies": {
                "bindings": "^1.5.0",
                "nan": "^2.12.1",
                "node-pre-gyp": "*"
            },
            "engines": {
                "node": ">= 4.0"
            }
        },
        "node_modules/fsevents/node_modules/abbrev": {
            "version": "1.1.1",
            "integrity": "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/ansi-regex": {
            "version": "2.1.1",
            "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/aproba": {
            "version": "1.2.0",
            "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/are-we-there-yet": {
            "version": "1.1.5",
            "integrity": "sha512-5hYdAkZlcG8tOLujVDTgCT+uPX0VnpAH28gWsLfzpXYm7wP6mp5Q/gYyR7YQ0cKVJcXJnl3j2kpBan13PtQf6w==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "delegates": "^1.0.0",
                "readable-stream": "^2.0.6"
            }
        },
        "node_modules/fsevents/node_modules/balanced-match": {
            "version": "1.0.0",
            "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c=",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/brace-expansion": {
            "version": "1.1.11",
            "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "balanced-match": "^1.0.0",
                "concat-map": "0.0.1"
            }
        },
        "node_modules/fsevents/node_modules/chownr": {
            "version": "1.1.4",
            "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/code-point-at": {
            "version": "1.1.0",
            "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/concat-map": {
            "version": "0.0.1",
            "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s=",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/console-control-strings": {
            "version": "1.1.0",
            "integrity": "sha1-PXz0Rk22RG6mRL9LOVB/mFEAjo4=",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/core-util-is": {
            "version": "1.0.2",
            "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac=",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/debug": {
            "version": "3.2.6",
            "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "ms": "^2.1.1"
            }
        },
        "node_modules/fsevents/node_modules/deep-extend": {
            "version": "0.6.0",
            "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=4.0.0"
            }
        },
        "node_modules/fsevents/node_modules/delegates": {
            "version": "1.0.0",
            "integrity": "sha1-hMbhWbgZBP3KWaDvRM2HDTElD5o=",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/detect-libc": {
            "version": "1.0.3",
            "integrity": "sha1-+hN8S9aY7fVc1c0CrFWfkaTEups=",
            "inBundle": true,
            "license": "Apache-2.0",
            "optional": true,
            "bin": {
                "detect-libc": "bin/detect-libc.js"
            },
            "engines": {
                "node": ">=0.10"
            }
        },
        "node_modules/fsevents/node_modules/fs-minipass": {
            "version": "1.2.7",
            "integrity": "sha512-GWSSJGFy4e9GUeCcbIkED+bgAoFyj7XF1mV8rma3QW4NIqX9Kyx79N/PF61H5udOV3aY1IaMLs6pGbH71nlCTA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "minipass": "^2.6.0"
            }
        },
        "node_modules/fsevents/node_modules/fs.realpath": {
            "version": "1.0.0",
            "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8=",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/gauge": {
            "version": "2.7.4",
            "integrity": "sha1-LANAXHU4w51+s3sxcCLjJfsBi/c=",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "aproba": "^1.0.3",
                "console-control-strings": "^1.0.0",
                "has-unicode": "^2.0.0",
                "object-assign": "^4.1.0",
                "signal-exit": "^3.0.0",
                "string-width": "^1.0.1",
                "strip-ansi": "^3.0.1",
                "wide-align": "^1.1.0"
            }
        },
        "node_modules/fsevents/node_modules/glob": {
            "version": "7.1.6",
            "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
            },
            "engines": {
                "node": "*"
            },
            "funding": {
                "url": "https://github.com/sponsors/isaacs"
            }
        },
        "node_modules/fsevents/node_modules/has-unicode": {
            "version": "2.0.1",
            "integrity": "sha1-4Ob+aijPUROIVeCG0Wkedx3iqLk=",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/iconv-lite": {
            "version": "0.4.24",
            "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "safer-buffer": ">= 2.1.2 < 3"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/ignore-walk": {
            "version": "3.0.3",
            "integrity": "sha512-m7o6xuOaT1aqheYHKf8W6J5pYH85ZI9w077erOzLje3JsB1gkafkAhHHY19dqjulgIZHFm32Cp5uNZgcQqdJKw==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "minimatch": "^3.0.4"
            }
        },
        "node_modules/fsevents/node_modules/inflight": {
            "version": "1.0.6",
            "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "once": "^1.3.0",
                "wrappy": "1"
            }
        },
        "node_modules/fsevents/node_modules/inherits": {
            "version": "2.0.4",
            "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/ini": {
            "version": "1.3.5",
            "integrity": "sha512-RZY5huIKCMRWDUqZlEi72f/lmXKMvuszcMBduliQ3nnWbx9X/ZBQO7DijMEYS9EhHBb2qacRUMtC7svLwe0lcw==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "engines": {
                "node": "*"
            }
        },
        "node_modules/fsevents/node_modules/is-fullwidth-code-point": {
            "version": "1.0.0",
            "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "number-is-nan": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/isarray": {
            "version": "1.0.0",
            "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE=",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/minimatch": {
            "version": "3.0.4",
            "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "brace-expansion": "^1.1.7"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/fsevents/node_modules/minimist": {
            "version": "1.2.5",
            "integrity": "sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw==",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/minipass": {
            "version": "2.9.0",
            "integrity": "sha512-wxfUjg9WebH+CUDX/CdbRlh5SmfZiy/hpkxaRI16Y9W56Pa75sWgd/rvFilSgrauD9NyFymP/+JFV3KwzIsJeg==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "safe-buffer": "^5.1.2",
                "yallist": "^3.0.0"
            }
        },
        "node_modules/fsevents/node_modules/minizlib": {
            "version": "1.3.3",
            "integrity": "sha512-6ZYMOEnmVsdCeTJVE0W9ZD+pVnE8h9Hma/iOwwRDsdQoePpoX56/8B6z3P9VNwppJuBKNRuFDRNRqRWexT9G9Q==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "minipass": "^2.9.0"
            }
        },
        "node_modules/fsevents/node_modules/mkdirp": {
            "version": "0.5.3",
            "integrity": "sha512-P+2gwrFqx8lhew375MQHHeTlY8AuOJSrGf0R5ddkEndUkmwpgUob/vQuBD1V22/Cw1/lJr4x+EjllSezBThzBg==",
            "deprecated": "Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "minimist": "^1.2.5"
            },
            "bin": {
                "mkdirp": "bin/cmd.js"
            }
        },
        "node_modules/fsevents/node_modules/ms": {
            "version": "2.1.2",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/needle": {
            "version": "2.3.3",
            "integrity": "sha512-EkY0GeSq87rWp1hoq/sH/wnTWgFVhYlnIkbJ0YJFfRgEFlz2RraCjBpFQ+vrEgEdp0ThfyHADmkChEhcb7PKyw==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "debug": "^3.2.6",
                "iconv-lite": "^0.4.4",
                "sax": "^1.2.4"
            },
            "bin": {
                "needle": "bin/needle"
            },
            "engines": {
                "node": ">= 4.4.x"
            }
        },
        "node_modules/fsevents/node_modules/node-pre-gyp": {
            "version": "0.14.0",
            "integrity": "sha512-+CvDC7ZttU/sSt9rFjix/P05iS43qHCOOGzcr3Ry99bXG7VX953+vFyEuph/tfqoYu8dttBkE86JSKBO2OzcxA==",
            "inBundle": true,
            "license": "BSD-3-Clause",
            "optional": true,
            "dependencies": {
                "detect-libc": "^1.0.2",
                "mkdirp": "^0.5.1",
                "needle": "^2.2.1",
                "nopt": "^4.0.1",
                "npm-packlist": "^1.1.6",
                "npmlog": "^4.0.2",
                "rc": "^1.2.7",
                "rimraf": "^2.6.1",
                "semver": "^5.3.0",
                "tar": "^4.4.2"
            },
            "bin": {
                "node-pre-gyp": "bin/node-pre-gyp"
            }
        },
        "node_modules/fsevents/node_modules/nopt": {
            "version": "4.0.3",
            "integrity": "sha512-CvaGwVMztSMJLOeXPrez7fyfObdZqNUK1cPAEzLHrTybIua9pMdmmPR5YwtfNftIOMv3DPUhFaxsZMNTQO20Kg==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "abbrev": "1",
                "osenv": "^0.1.4"
            },
            "bin": {
                "nopt": "bin/nopt.js"
            }
        },
        "node_modules/fsevents/node_modules/npm-bundled": {
            "version": "1.1.1",
            "integrity": "sha512-gqkfgGePhTpAEgUsGEgcq1rqPXA+tv/aVBlgEzfXwA1yiUJF7xtEt3CtVwOjNYQOVknDk0F20w58Fnm3EtG0fA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "npm-normalize-package-bin": "^1.0.1"
            }
        },
        "node_modules/fsevents/node_modules/npm-normalize-package-bin": {
            "version": "1.0.1",
            "integrity": "sha512-EPfafl6JL5/rU+ot6P3gRSCpPDW5VmIzX959Ob1+ySFUuuYHWHekXpwdUZcKP5C+DS4GEtdJluwBjnsNDl+fSA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/npm-packlist": {
            "version": "1.4.8",
            "integrity": "sha512-5+AZgwru5IevF5ZdnFglB5wNlHG1AOOuw28WhUq8/8emhBmLv6jX5by4WJCh7lW0uSYZYS6DXqIsyZVIXRZU9A==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "ignore-walk": "^3.0.1",
                "npm-bundled": "^1.0.1",
                "npm-normalize-package-bin": "^1.0.1"
            }
        },
        "node_modules/fsevents/node_modules/npmlog": {
            "version": "4.1.2",
            "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "are-we-there-yet": "~1.1.2",
                "console-control-strings": "~1.1.0",
                "gauge": "~2.7.3",
                "set-blocking": "~2.0.0"
            }
        },
        "node_modules/fsevents/node_modules/number-is-nan": {
            "version": "1.0.1",
            "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/object-assign": {
            "version": "4.1.1",
            "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/once": {
            "version": "1.4.0",
            "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "wrappy": "1"
            }
        },
        "node_modules/fsevents/node_modules/os-homedir": {
            "version": "1.0.2",
            "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/os-tmpdir": {
            "version": "1.0.2",
            "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/osenv": {
            "version": "0.1.5",
            "integrity": "sha512-0CWcCECdMVc2Rw3U5w9ZjqX6ga6ubk1xDVKxtBQPK7wis/0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "os-homedir": "^1.0.0",
                "os-tmpdir": "^1.0.0"
            }
        },
        "node_modules/fsevents/node_modules/path-is-absolute": {
            "version": "1.0.1",
            "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/process-nextick-args": {
            "version": "2.0.1",
            "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/rc": {
            "version": "1.2.8",
            "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
            "inBundle": true,
            "license": "(BSD-2-Clause OR MIT OR Apache-2.0)",
            "optional": true,
            "dependencies": {
                "deep-extend": "^0.6.0",
                "ini": "~1.3.0",
                "minimist": "^1.2.0",
                "strip-json-comments": "~2.0.1"
            },
            "bin": {
                "rc": "cli.js"
            }
        },
        "node_modules/fsevents/node_modules/readable-stream": {
            "version": "2.3.7",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/fsevents/node_modules/rimraf": {
            "version": "2.7.1",
            "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "glob": "^7.1.3"
            },
            "bin": {
                "rimraf": "bin.js"
            }
        },
        "node_modules/fsevents/node_modules/safe-buffer": {
            "version": "5.1.2",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/safer-buffer": {
            "version": "2.1.2",
            "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/sax": {
            "version": "1.2.4",
            "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/semver": {
            "version": "5.7.1",
            "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "bin": {
                "semver": "bin/semver"
            }
        },
        "node_modules/fsevents/node_modules/set-blocking": {
            "version": "2.0.0",
            "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc=",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/signal-exit": {
            "version": "3.0.2",
            "integrity": "sha1-tf3AjxKH6hF4Yo5BXiUTK3NkbG0=",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/string_decoder": {
            "version": "1.1.1",
            "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "safe-buffer": "~5.1.0"
            }
        },
        "node_modules/fsevents/node_modules/string-width": {
            "version": "1.0.2",
            "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "code-point-at": "^1.0.0",
                "is-fullwidth-code-point": "^1.0.0",
                "strip-ansi": "^3.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/strip-ansi": {
            "version": "3.0.1",
            "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "dependencies": {
                "ansi-regex": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/strip-json-comments": {
            "version": "2.0.1",
            "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo=",
            "inBundle": true,
            "license": "MIT",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/fsevents/node_modules/tar": {
            "version": "4.4.13",
            "integrity": "sha512-w2VwSrBoHa5BsSyH+KxEqeQBAllHhccyMFVHtGtdMpF4W7IRWfZjFiQceJPChOeTsSDVUpER2T8FA93pr0L+QA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "chownr": "^1.1.1",
                "fs-minipass": "^1.2.5",
                "minipass": "^2.8.6",
                "minizlib": "^1.2.1",
                "mkdirp": "^0.5.0",
                "safe-buffer": "^5.1.2",
                "yallist": "^3.0.3"
            },
            "engines": {
                "node": ">=4.5"
            }
        },
        "node_modules/fsevents/node_modules/util-deprecate": {
            "version": "1.0.2",
            "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8=",
            "inBundle": true,
            "license": "MIT",
            "optional": true
        },
        "node_modules/fsevents/node_modules/wide-align": {
            "version": "1.1.3",
            "integrity": "sha512-QGkOQc8XL6Bt5PwnsExKBPuMKBxnGxWWW3fU55Xt4feHozMUhdUMaBCk290qpm/wG5u/RSKzwdAC4i51YigihA==",
            "inBundle": true,
            "license": "ISC",
            "optional": true,
            "dependencies": {
                "string-width": "^1.0.2 || 2"
            }
        },
        "node_modules/fsevents/node_modules/wrappy": {
            "version": "1.0.2",
            "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8=",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/fsevents/node_modules/yallist": {
            "version": "3.1.1",
            "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
            "inBundle": true,
            "license": "ISC",
            "optional": true
        },
        "node_modules/function-bind": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
            "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
        },
        "node_modules/functional-red-black-tree": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/functional-red-black-tree/-/functional-red-black-tree-1.0.1.tgz",
            "integrity": "sha1-GwqzvVU7Kg1jmdKcDj6gslIHgyc=",
            "dev": true
        },
        "node_modules/get-caller-file": {
            "version": "2.0.5",
            "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
            "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
            "dev": true,
            "engines": {
                "node": "6.* || 8.* || >= 10.*"
            }
        },
        "node_modules/get-intrinsic": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.1.1.tgz",
            "integrity": "sha512-kWZrnVM42QCiEA2Ig1bG8zjoIMOgxWwYCEeNdwY6Tv/cOSeGpcoX4pXHfKUxNKVoArnrEr2e9srnAxxGIraS9Q==",
            "dev": true,
            "dependencies": {
                "function-bind": "^1.1.1",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/get-value": {
            "version": "2.0.6",
            "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
            "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/getpass": {
            "version": "0.1.7",
            "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
            "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
            "dependencies": {
                "assert-plus": "^1.0.0"
            }
        },
        "node_modules/glob": {
            "version": "7.1.6",
            "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
            "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
            "dependencies": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/glob-base": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/glob-base/-/glob-base-0.3.0.tgz",
            "integrity": "sha1-27Fk9iIbHAscz4Kuoyi0l98Oo8Q=",
            "dependencies": {
                "glob-parent": "^2.0.0",
                "is-glob": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/glob-parent": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
            "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
            "dependencies": {
                "is-glob": "^2.0.0"
            }
        },
        "node_modules/glob2base": {
            "version": "0.0.12",
            "resolved": "https://registry.npmjs.org/glob2base/-/glob2base-0.0.12.tgz",
            "integrity": "sha1-nUGbPijxLoOjYhZKJ3BVkiycDVY=",
            "dependencies": {
                "find-index": "^0.1.1"
            },
            "engines": {
                "node": ">= 0.10"
            }
        },
        "node_modules/globals": {
            "version": "12.4.0",
            "resolved": "https://registry.npmjs.org/globals/-/globals-12.4.0.tgz",
            "integrity": "sha512-BWICuzzDvDoH54NHKCseDanAhE3CeDorgDL5MT6LMXXj2WCnd9UC2szdk4AWLfjdgNBCXLUanXYcpBBKOSWGwg==",
            "dev": true,
            "dependencies": {
                "type-fest": "^0.8.1"
            },
            "engines": {
                "node": ">=8"
            },
            "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
            }
        },
        "node_modules/globby": {
            "version": "6.1.0",
            "resolved": "https://registry.npmjs.org/globby/-/globby-6.1.0.tgz",
            "integrity": "sha1-9abXDoOV4hyFj7BInWTfAkJNUGw=",
            "dependencies": {
                "array-union": "^1.0.1",
                "glob": "^7.0.3",
                "object-assign": "^4.0.1",
                "pify": "^2.0.0",
                "pinkie-promise": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/globby/node_modules/pify": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
            "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/graceful-fs": {
            "version": "4.2.3",
            "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.3.tgz",
            "integrity": "sha512-a30VEBm4PEdx1dRB7MFK7BejejvCvBronbLjht+sHuGYj8PHs7M/5Z+rt5lw551vZ7yfTCj4Vuyy3mSJytDWRQ=="
        },
        "node_modules/growl": {
            "version": "1.10.5",
            "resolved": "https://registry.npmjs.org/growl/-/growl-1.10.5.tgz",
            "integrity": "sha512-qBr4OuELkhPenW6goKVXiv47US3clb3/IbuWF9KNKEijAy9oeHxU9IgzjvJhHkUzhaj7rOUD7+YGWqUjLp5oSA==",
            "dev": true,
            "engines": {
                "node": ">=4.x"
            }
        },
        "node_modules/har-schema": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
            "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI=",
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/har-validator": {
            "version": "5.1.3",
            "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.3.tgz",
            "integrity": "sha512-sNvOCzEQNr/qrvJgc3UG/kD4QtlHycrzwS+6mfTrrSq97BvaYcPZZI1ZSqGSPR73Cxn4LKTD4PttRwfU7jWq5g==",
            "dependencies": {
                "ajv": "^6.5.5",
                "har-schema": "^2.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/has": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
            "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
            "dependencies": {
                "function-bind": "^1.1.1"
            },
            "engines": {
                "node": ">= 0.4.0"
            }
        },
        "node_modules/has-flag": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
            "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0=",
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/has-symbols": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
            "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg==",
            "dev": true,
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/has-value": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
            "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
            "dependencies": {
                "get-value": "^2.0.6",
                "has-values": "^1.0.0",
                "isobject": "^3.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/has-value/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/has-values": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
            "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
            "dependencies": {
                "is-number": "^3.0.0",
                "kind-of": "^4.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/has-values/node_modules/is-number": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
            "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/has-values/node_modules/is-number/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/has-values/node_modules/kind-of": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
            "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/hash-base": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.0.4.tgz",
            "integrity": "sha1-X8hoaEfs1zSZQDMZprCj8/auSRg=",
            "dependencies": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/hash.js": {
            "version": "1.1.7",
            "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
            "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
            "dependencies": {
                "inherits": "^2.0.3",
                "minimalistic-assert": "^1.0.1"
            }
        },
        "node_modules/he": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
            "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw==",
            "dev": true,
            "bin": {
                "he": "bin/he"
            }
        },
        "node_modules/hmac-drbg": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
            "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
            "dependencies": {
                "hash.js": "^1.0.3",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.1"
            }
        },
        "node_modules/hosted-git-info": {
            "version": "2.8.8",
            "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.8.8.tgz",
            "integrity": "sha512-f/wzC2QaWBs7t9IYqB4T3sR1xviIViXJRJTWBlx2Gf3g0Xi5vI7Yy4koXQ1c9OYDGHN9sBy1DQ2AB8fqZBWhUg==",
            "dev": true
        },
        "node_modules/http-proxy-agent": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-2.1.0.tgz",
            "integrity": "sha512-qwHbBLV7WviBl0rQsOzH6o5lwyOIvwp/BdFnvVxXORldu5TmjFfjzBcWUWS5kWAZhmv+JtiDhSuQCp4sBfbIgg==",
            "dev": true,
            "dependencies": {
                "agent-base": "4",
                "debug": "3.1.0"
            },
            "engines": {
                "node": ">= 4.5.0"
            }
        },
        "node_modules/http-proxy-agent/node_modules/debug": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
            "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
            "dev": true,
            "dependencies": {
                "ms": "2.0.0"
            }
        },
        "node_modules/http-signature": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
            "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
            "dependencies": {
                "assert-plus": "^1.0.0",
                "jsprim": "^1.2.2",
                "sshpk": "^1.7.0"
            },
            "engines": {
                "node": ">=0.8",
                "npm": ">=1.3.7"
            }
        },
        "node_modules/https-browserify": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
            "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM="
        },
        "node_modules/https-proxy-agent": {
            "version": "2.2.4",
            "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.4.tgz",
            "integrity": "sha512-OmvfoQ53WLjtA9HeYP9RNrWMJzzAz1JGaSFr1nijg0PVR1JaD/xbJq1mdEIIlxGpXp9eSe/O2LgU9DJmTPd0Eg==",
            "dev": true,
            "dependencies": {
                "agent-base": "^4.3.0",
                "debug": "^3.1.0"
            },
            "engines": {
                "node": ">= 4.5.0"
            }
        },
        "node_modules/https-proxy-agent/node_modules/debug": {
            "version": "3.2.6",
            "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
            "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
            "dev": true,
            "dependencies": {
                "ms": "^2.1.1"
            }
        },
        "node_modules/https-proxy-agent/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/ieee754": {
            "version": "1.1.13",
            "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
            "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
        },
        "node_modules/iferr": {
            "version": "0.1.5",
            "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
            "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE="
        },
        "node_modules/ignore": {
            "version": "4.0.6",
            "resolved": "https://registry.npmjs.org/ignore/-/ignore-4.0.6.tgz",
            "integrity": "sha512-cyFDKrqc/YdcWFniJhzI42+AzS+gNwmUzOSFcRCQYwySuBBBy/KjuxWLZ/FHEH6Moq1NizMOBWyTcv8O4OZIMg==",
            "dev": true,
            "engines": {
                "node": ">= 4"
            }
        },
        "node_modules/import-fresh": {
            "version": "3.3.0",
            "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.0.tgz",
            "integrity": "sha512-veYYhQa+D1QBKznvhUHxb8faxlrwUnxseDAbAp457E0wLNio2bOSKnjYDhMj+YiAq61xrMGhQk9iXVk5FzgQMw==",
            "dev": true,
            "dependencies": {
                "parent-module": "^1.0.0",
                "resolve-from": "^4.0.0"
            },
            "engines": {
                "node": ">=6"
            },
            "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
            }
        },
        "node_modules/imurmurhash": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
            "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o=",
            "engines": {
                "node": ">=0.8.19"
            }
        },
        "node_modules/infer-owner": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/infer-owner/-/infer-owner-1.0.4.tgz",
            "integrity": "sha512-IClj+Xz94+d7irH5qRyfJonOdfTzuDaifE6ZPWfx0N0+/ATZCbuTPq2prFl526urkQd90WyUKIh1DfBQ2hMz9A=="
        },
        "node_modules/inflight": {
            "version": "1.0.6",
            "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
            "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
            "dependencies": {
                "once": "^1.3.0",
                "wrappy": "1"
            }
        },
        "node_modules/inherits": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
            "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
        },
        "node_modules/ip-regex": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/ip-regex/-/ip-regex-2.1.0.tgz",
            "integrity": "sha1-+ni/XS5pE8kRzp+BnuUUa7bYROk=",
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/is-accessor-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-arrayish": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
            "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0=",
            "dev": true
        },
        "node_modules/is-binary-path": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
            "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
            "dependencies": {
                "binary-extensions": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-buffer": {
            "version": "1.1.6",
            "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
            "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w=="
        },
        "node_modules/is-callable": {
            "version": "1.2.3",
            "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.3.tgz",
            "integrity": "sha512-J1DcMe8UYTBSrKezuIUTUwjXsho29693unXM2YhJUTR2txK/eG47bvNa/wipPFmZFgr/N6f1GA66dv0mEyTIyQ==",
            "dev": true,
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/is-core-module": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.2.0.tgz",
            "integrity": "sha512-XRAfAdyyY5F5cOXn7hYQDqh2Xmii+DEfIcQGxK/uNwMHhIkPWO0g8msXcbzLe+MpGoR951MlqM/2iIlU4vKDdQ==",
            "dependencies": {
                "has": "^1.0.3"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/is-data-descriptor": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-date-object": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.2.tgz",
            "integrity": "sha512-USlDT524woQ08aoZFzh3/Z6ch9Y/EWXEHQ/AaRN0SkKq4t2Jw2R2339tSXmwuVoY7LLlBCbOIlx2myP/L5zk0g==",
            "dev": true,
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/is-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
            "dependencies": {
                "is-accessor-descriptor": "^0.1.6",
                "is-data-descriptor": "^0.1.4",
                "kind-of": "^5.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-descriptor/node_modules/kind-of": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-dotfile": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/is-dotfile/-/is-dotfile-1.0.3.tgz",
            "integrity": "sha1-pqLzL/0t+wT1yiXs0Pa4PPeYoeE=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-equal-shallow": {
            "version": "0.1.3",
            "resolved": "https://registry.npmjs.org/is-equal-shallow/-/is-equal-shallow-0.1.3.tgz",
            "integrity": "sha1-IjgJj8Ih3gvPpdnqxMRdY4qhxTQ=",
            "dependencies": {
                "is-primitive": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-extendable": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
            "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-extglob": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
            "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-fullwidth-code-point": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
            "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/is-glob": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
            "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
            "dependencies": {
                "is-extglob": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-negative-zero": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.1.tgz",
            "integrity": "sha512-2z6JzQvZRa9A2Y7xC6dQQm4FSTSTNWjKIYYTt4246eMTJmIo0Q+ZyOsU66X8lxK1AbB92dFeglPLrhwpeRKO6w==",
            "dev": true,
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/is-number": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-2.1.0.tgz",
            "integrity": "sha1-Afy7s5NGOlSPL0ZszhbezknbkI8=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-path-cwd": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/is-path-cwd/-/is-path-cwd-2.2.0.tgz",
            "integrity": "sha512-w942bTcih8fdJPJmQHFzkS76NEP8Kzzvmw92cXsazb8intwLqPibPPdXf4ANdKV3rYMuuQYGIWtvz9JilB3NFQ==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/is-path-in-cwd": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-path-in-cwd/-/is-path-in-cwd-2.1.0.tgz",
            "integrity": "sha512-rNocXHgipO+rvnP6dk3zI20RpOtrAM/kzbB258Uw5BWr3TpXi861yzjo16Dn4hUox07iw5AyeMLHWsujkjzvRQ==",
            "dependencies": {
                "is-path-inside": "^2.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/is-path-inside": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-2.1.0.tgz",
            "integrity": "sha512-wiyhTzfDWsvwAW53OBWF5zuvaOGlZ6PwYxAbPVDhpm+gM09xKQGjBq/8uYN12aDvMxnAnq3dxTyoSoRNmg5YFg==",
            "dependencies": {
                "path-is-inside": "^1.0.2"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/is-plain-object": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
            "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
            "dependencies": {
                "isobject": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-plain-object/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-posix-bracket": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/is-posix-bracket/-/is-posix-bracket-0.1.1.tgz",
            "integrity": "sha1-MzTceXdDaOkvAW5vvAqI9c1ua8Q=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-primitive": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/is-primitive/-/is-primitive-2.0.0.tgz",
            "integrity": "sha1-IHurkWOEmcB7Kt8kCkGochADRXU=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-regex": {
            "version": "1.1.2",
            "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.1.2.tgz",
            "integrity": "sha512-axvdhb5pdhEVThqJzYXwMlVuZwC+FF2DpcOhTS+y/8jVq4trxyPgfcwIxIKiyeuLlSQYKkmUaPQJ8ZE4yNKXDg==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.2",
                "has-symbols": "^1.0.1"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/is-string": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.0.5.tgz",
            "integrity": "sha512-buY6VNRjhQMiF1qWDouloZlQbRhDPCebwxSjxMjxgemYT46YMd2NR0/H+fBhEfWX4A/w9TBJ+ol+okqJKFE6vQ==",
            "dev": true,
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/is-symbol": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.3.tgz",
            "integrity": "sha512-OwijhaRSgqvhm/0ZdAcXNZt9lYdKFpcRDT5ULUuYXPoT794UNOdU+gpT6Rzo7b4V2HUl/op6GqY894AZwv9faQ==",
            "dev": true,
            "dependencies": {
                "has-symbols": "^1.0.1"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/is-typedarray": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
            "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
        },
        "node_modules/is-windows": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
            "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/is-wsl": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
            "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0=",
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/isarray": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
            "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE="
        },
        "node_modules/isexe": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
            "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA=",
            "dev": true
        },
        "node_modules/isobject": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
            "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
            "dependencies": {
                "isarray": "1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/isstream": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
            "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
        },
        "node_modules/js-tokens": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
            "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
            "dev": true
        },
        "node_modules/js-yaml": {
            "version": "3.13.1",
            "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.13.1.tgz",
            "integrity": "sha512-YfbcO7jXDdyj0DGxYVSlSeQNHbD7XPWvrVWeVUujrQEoZzWJIRrCPoyk6kL6IAjAG2IolMK4T0hNUe0HOUs5Jw==",
            "dev": true,
            "dependencies": {
                "argparse": "^1.0.7",
                "esprima": "^4.0.0"
            },
            "bin": {
                "js-yaml": "bin/js-yaml.js"
            }
        },
        "node_modules/jsbn": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
            "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
        },
        "node_modules/json-parse-better-errors": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
            "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw=="
        },
        "node_modules/json-schema": {
            "version": "0.2.3",
            "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
            "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM="
        },
        "node_modules/json-schema-traverse": {
            "version": "0.4.1",
            "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
            "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
        },
        "node_modules/json-stable-stringify-without-jsonify": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
            "integrity": "sha1-nbe1lJatPzz+8wp1FC0tkwrXJlE=",
            "dev": true
        },
        "node_modules/json-stringify-safe": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
            "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
        },
        "node_modules/json5": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
            "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
            "dependencies": {
                "minimist": "^1.2.0"
            },
            "bin": {
                "json5": "lib/cli.js"
            }
        },
        "node_modules/jsonfile": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
            "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
            "dependencies": {
                "graceful-fs": "^4.1.6"
            }
        },
        "node_modules/jsprim": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
            "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
            "engines": [
                "node >=0.6.0"
            ],
            "dependencies": {
                "assert-plus": "1.0.0",
                "extsprintf": "1.3.0",
                "json-schema": "0.2.3",
                "verror": "1.10.0"
            }
        },
        "node_modules/jwa": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz",
            "integrity": "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==",
            "dependencies": {
                "buffer-equal-constant-time": "1.0.1",
                "ecdsa-sig-formatter": "1.0.11",
                "safe-buffer": "^5.0.1"
            }
        },
        "node_modules/jws": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/jws/-/jws-3.2.2.tgz",
            "integrity": "sha512-YHlZCB6lMTllWDtSPHz/ZXTsi8S00usEV6v1tjq8tOUZzw7DpSDWVXjXDre6ed1w/pd495ODpHZYSdkRTsa0HA==",
            "dependencies": {
                "jwa": "^1.4.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/lazystream": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/lazystream/-/lazystream-1.0.0.tgz",
            "integrity": "sha1-9plf4PggOS9hOWvolGJAe7dxaOQ=",
            "dependencies": {
                "readable-stream": "^2.0.5"
            },
            "engines": {
                "node": ">= 0.6.3"
            }
        },
        "node_modules/lazystream/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/lazystream/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/levn": {
            "version": "0.4.1",
            "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
            "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
            "dev": true,
            "dependencies": {
                "prelude-ls": "^1.2.1",
                "type-check": "~0.4.0"
            },
            "engines": {
                "node": ">= 0.8.0"
            }
        },
        "node_modules/load-json-file": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
            "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
            "dev": true,
            "dependencies": {
                "graceful-fs": "^4.1.2",
                "parse-json": "^2.2.0",
                "pify": "^2.0.0",
                "strip-bom": "^3.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/load-json-file/node_modules/pify": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
            "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/loader-runner": {
            "version": "2.4.0",
            "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.4.0.tgz",
            "integrity": "sha512-Jsmr89RcXGIwivFY21FcRrisYZfvLMTWx5kOLc+JTxtpBOG6xML0vzbc6SEQG2FO9/4Fc3wW4LVcB5DmGflaRw==",
            "engines": {
                "node": ">=4.3.0 <5.0.0 || >=5.10"
            }
        },
        "node_modules/loader-utils": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.4.0.tgz",
            "integrity": "sha512-qH0WSMBtn/oHuwjy/NucEgbx5dbxxnxup9s4PVXJUDHZBQY+s0NWA9rJf53RBnQZxfch7euUui7hpoAPvALZdA==",
            "dependencies": {
                "big.js": "^5.2.2",
                "emojis-list": "^3.0.0",
                "json5": "^1.0.1"
            },
            "engines": {
                "node": ">=4.0.0"
            }
        },
        "node_modules/locate-path": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
            "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
            "dependencies": {
                "p-locate": "^3.0.0",
                "path-exists": "^3.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/lodash": {
            "version": "4.17.20",
            "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.20.tgz",
            "integrity": "sha512-PlhdFcillOINfeV7Ni6oF1TAEayyZBoZ8bcshTHqOYJYlrqzRK5hagpagky5o4HfCzzd1TRkXPMFq6cKk9rGmA=="
        },
        "node_modules/lodash.defaults": {
            "version": "4.2.0",
            "resolved": "https://registry.npmjs.org/lodash.defaults/-/lodash.defaults-4.2.0.tgz",
            "integrity": "sha1-0JF4cW/+pN3p5ft7N/bwgCJ0WAw="
        },
        "node_modules/lodash.difference": {
            "version": "4.5.0",
            "resolved": "https://registry.npmjs.org/lodash.difference/-/lodash.difference-4.5.0.tgz",
            "integrity": "sha1-nMtOUF1Ia5FlE0V3KIWi3yf9AXw="
        },
        "node_modules/lodash.flatten": {
            "version": "4.4.0",
            "resolved": "https://registry.npmjs.org/lodash.flatten/-/lodash.flatten-4.4.0.tgz",
            "integrity": "sha1-8xwiIlqWMtK7+OSt2+8kCqdlph8="
        },
        "node_modules/lodash.isplainobject": {
            "version": "4.0.6",
            "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
            "integrity": "sha1-fFJqUtibRcRcxpC4gWO+BJf1UMs="
        },
        "node_modules/lodash.union": {
            "version": "4.6.0",
            "resolved": "https://registry.npmjs.org/lodash.union/-/lodash.union-4.6.0.tgz",
            "integrity": "sha1-SLtQiECfFvGCFmZkHETdGqrjzYg="
        },
        "node_modules/log-symbols": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-3.0.0.tgz",
            "integrity": "sha512-dSkNGuI7iG3mfvDzUuYZyvk5dD9ocYCYzNU6CYDE6+Xqd+gwme6Z00NS3dUh8mq/73HaEtT7m6W+yUPtU6BZnQ==",
            "dev": true,
            "dependencies": {
                "chalk": "^2.4.2"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/lru-cache": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
            "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
            "dependencies": {
                "yallist": "^3.0.2"
            }
        },
        "node_modules/make-dir": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-1.3.0.tgz",
            "integrity": "sha512-2w31R7SJtieJJnQtGc7RVL2StM2vGYVfqUOvUDxH6bC6aJTxPxTF0GnIgCyu7tjockiUWAYQRbxa7vKn34s5sQ==",
            "dependencies": {
                "pify": "^3.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/make-dir/node_modules/pify": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
            "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY=",
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/make-error": {
            "version": "1.3.6",
            "resolved": "https://registry.npmjs.org/make-error/-/make-error-1.3.6.tgz",
            "integrity": "sha512-s8UhlNe7vPKomQhC1qFelMokr/Sc3AgNbso3n74mVPA5LTZwkB9NlXf4XPamLxJE8h0gh73rM94xvwRT2CVInw==",
            "dev": true
        },
        "node_modules/map-cache": {
            "version": "0.2.2",
            "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
            "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/map-visit": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
            "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
            "dependencies": {
                "object-visit": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/math-random": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/math-random/-/math-random-1.0.4.tgz",
            "integrity": "sha512-rUxjysqif/BZQH2yhd5Aaq7vXMSx9NdEsQcyA07uEzIvxgI7zIr33gGsh+RU0/XjmQpCW7RsVof1vlkvQVCK5A=="
        },
        "node_modules/md5": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/md5/-/md5-2.2.1.tgz",
            "integrity": "sha1-U6s41f48iJG6RlMp6iP6wFQBJvk=",
            "dev": true,
            "dependencies": {
                "charenc": "~0.0.1",
                "crypt": "~0.0.1",
                "is-buffer": "~1.1.1"
            }
        },
        "node_modules/md5.js": {
            "version": "1.3.5",
            "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
            "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
            "dependencies": {
                "hash-base": "^3.0.0",
                "inherits": "^2.0.1",
                "safe-buffer": "^5.1.2"
            }
        },
        "node_modules/memory-fs": {
            "version": "0.5.0",
            "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.5.0.tgz",
            "integrity": "sha512-jA0rdU5KoQMC0e6ppoNRtpp6vjFq6+NY7r8hywnC7V+1Xj/MtHwGIbB1QaK/dunyjWteJzmkpd7ooeWg10T7GA==",
            "dependencies": {
                "errno": "^0.1.3",
                "readable-stream": "^2.0.1"
            },
            "engines": {
                "node": ">=4.3.0 <5.0.0 || >=5.10"
            }
        },
        "node_modules/memory-fs/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/memory-fs/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/merge2": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
            "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
            "dev": true,
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/micromatch": {
            "version": "2.3.11",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
            "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
            "dependencies": {
                "arr-diff": "^2.0.0",
                "array-unique": "^0.2.1",
                "braces": "^1.8.2",
                "expand-brackets": "^0.1.4",
                "extglob": "^0.3.1",
                "filename-regex": "^2.0.0",
                "is-extglob": "^1.0.0",
                "is-glob": "^2.0.1",
                "kind-of": "^3.0.2",
                "normalize-path": "^2.0.1",
                "object.omit": "^2.0.0",
                "parse-glob": "^3.0.4",
                "regex-cache": "^0.4.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/micromatch/node_modules/normalize-path": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
            "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
            "dependencies": {
                "remove-trailing-separator": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/miller-rabin": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
            "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
            "dependencies": {
                "bn.js": "^4.0.0",
                "brorand": "^1.0.1"
            },
            "bin": {
                "miller-rabin": "bin/miller-rabin"
            }
        },
        "node_modules/mime-db": {
            "version": "1.43.0",
            "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.43.0.tgz",
            "integrity": "sha512-+5dsGEEovYbT8UY9yD7eE4XTc4UwJ1jBYlgaQQF38ENsKR3wj/8q8RFZrF9WIZpB2V1ArTVFUva8sAul1NzRzQ==",
            "engines": {
                "node": ">= 0.6"
            }
        },
        "node_modules/mime-types": {
            "version": "2.1.26",
            "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.26.tgz",
            "integrity": "sha512-01paPWYgLrkqAyrlDorC1uDwl2p3qZT7yl806vW7DvDoxwXi46jsjFbg+WdwotBIk6/MbEhO/dh5aZ5sNj/dWQ==",
            "dependencies": {
                "mime-db": "1.43.0"
            },
            "engines": {
                "node": ">= 0.6"
            }
        },
        "node_modules/minimalistic-assert": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
            "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
        },
        "node_modules/minimalistic-crypto-utils": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
            "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo="
        },
        "node_modules/minimatch": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
            "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
            "dependencies": {
                "brace-expansion": "^1.1.7"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/minimist": {
            "version": "1.2.5",
            "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.5.tgz",
            "integrity": "sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw=="
        },
        "node_modules/mississippi": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
            "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
            "dependencies": {
                "concat-stream": "^1.5.0",
                "duplexify": "^3.4.2",
                "end-of-stream": "^1.1.0",
                "flush-write-stream": "^1.0.0",
                "from2": "^2.1.0",
                "parallel-transform": "^1.1.0",
                "pump": "^3.0.0",
                "pumpify": "^1.3.3",
                "stream-each": "^1.1.0",
                "through2": "^2.0.0"
            },
            "engines": {
                "node": ">=4.0.0"
            }
        },
        "node_modules/mixin-deep": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.2.tgz",
            "integrity": "sha512-WRoDn//mXBiJ1H40rqa3vH0toePwSsGb45iInWlTySa+Uu4k3tYUSxa2v1KqAiLtvlrSzaExqS1gtk96A9zvEA==",
            "dependencies": {
                "for-in": "^1.0.2",
                "is-extendable": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/mixin-deep/node_modules/is-extendable": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
            "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
            "dependencies": {
                "is-plain-object": "^2.0.4"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/mkdirp": {
            "version": "0.5.4",
            "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.4.tgz",
            "integrity": "sha512-iG9AK/dJLtJ0XNgTuDbSyNS3zECqDlAhnQW4CsNxBG3LQJBbHmRX1egw39DmtOdCAqY+dKXV+sgPgilNWUKMVw==",
            "dependencies": {
                "minimist": "^1.2.5"
            },
            "bin": {
                "mkdirp": "bin/cmd.js"
            }
        },
        "node_modules/mocha": {
            "version": "7.1.1",
            "resolved": "https://registry.npmjs.org/mocha/-/mocha-7.1.1.tgz",
            "integrity": "sha512-3qQsu3ijNS3GkWcccT5Zw0hf/rWvu1fTN9sPvEd81hlwsr30GX2GcDSSoBxo24IR8FelmrAydGC6/1J5QQP4WA==",
            "dev": true,
            "dependencies": {
                "ansi-colors": "3.2.3",
                "browser-stdout": "1.3.1",
                "chokidar": "3.3.0",
                "debug": "3.2.6",
                "diff": "3.5.0",
                "escape-string-regexp": "1.0.5",
                "find-up": "3.0.0",
                "glob": "7.1.3",
                "growl": "1.10.5",
                "he": "1.2.0",
                "js-yaml": "3.13.1",
                "log-symbols": "3.0.0",
                "minimatch": "3.0.4",
                "mkdirp": "0.5.3",
                "ms": "2.1.1",
                "node-environment-flags": "1.0.6",
                "object.assign": "4.1.0",
                "strip-json-comments": "2.0.1",
                "supports-color": "6.0.0",
                "which": "1.3.1",
                "wide-align": "1.1.3",
                "yargs": "13.3.2",
                "yargs-parser": "13.1.2",
                "yargs-unparser": "1.6.0"
            },
            "bin": {
                "_mocha": "bin/_mocha",
                "mocha": "bin/mocha"
            },
            "engines": {
                "node": ">= 8.0.0"
            }
        },
        "node_modules/mocha-junit-reporter": {
            "version": "1.23.3",
            "resolved": "https://registry.npmjs.org/mocha-junit-reporter/-/mocha-junit-reporter-1.23.3.tgz",
            "integrity": "sha512-ed8LqbRj1RxZfjt/oC9t12sfrWsjZ3gNnbhV1nuj9R/Jb5/P3Xb4duv2eCfCDMYH+fEu0mqca7m4wsiVjsxsvA==",
            "dev": true,
            "dependencies": {
                "debug": "^2.2.0",
                "md5": "^2.1.0",
                "mkdirp": "~0.5.1",
                "strip-ansi": "^4.0.0",
                "xml": "^1.0.0"
            }
        },
        "node_modules/mocha-multi-reporters": {
            "version": "1.1.7",
            "resolved": "https://registry.npmjs.org/mocha-multi-reporters/-/mocha-multi-reporters-1.1.7.tgz",
            "integrity": "sha1-zH8/TTL0eFIJQdhSq7ZNmYhYfYI=",
            "dev": true,
            "dependencies": {
                "debug": "^3.1.0",
                "lodash": "^4.16.4"
            }
        },
        "node_modules/mocha-multi-reporters/node_modules/debug": {
            "version": "3.2.6",
            "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
            "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
            "dev": true,
            "dependencies": {
                "ms": "^2.1.1"
            }
        },
        "node_modules/mocha-multi-reporters/node_modules/ms": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
            "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
            "dev": true
        },
        "node_modules/mocha/node_modules/anymatch": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.1.tgz",
            "integrity": "sha512-mM8522psRCqzV+6LhomX5wgp25YVibjh8Wj23I5RPkPppSVSjyKD2A2mBJmWGa+KN7f2D6LNh9jkBCeyLktzjg==",
            "dev": true,
            "dependencies": {
                "normalize-path": "^3.0.0",
                "picomatch": "^2.0.4"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/mocha/node_modules/binary-extensions": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.0.0.tgz",
            "integrity": "sha512-Phlt0plgpIIBOGTT/ehfFnbNlfsDEiqmzE2KRXoX1bLIlir4X/MR+zSyBEkL05ffWgnRSf/DXv+WrUAVr93/ow==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/mocha/node_modules/braces": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
            "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
            "dev": true,
            "dependencies": {
                "fill-range": "^7.0.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/mocha/node_modules/chokidar": {
            "version": "3.3.0",
            "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.3.0.tgz",
            "integrity": "sha512-dGmKLDdT3Gdl7fBUe8XK+gAtGmzy5Fn0XkkWQuYxGIgWVPPse2CxFA5mtrlD0TOHaHjEUqkWNyP1XdHoJES/4A==",
            "dev": true,
            "dependencies": {
                "anymatch": "~3.1.1",
                "braces": "~3.0.2",
                "glob-parent": "~5.1.0",
                "is-binary-path": "~2.1.0",
                "is-glob": "~4.0.1",
                "normalize-path": "~3.0.0",
                "readdirp": "~3.2.0"
            },
            "engines": {
                "node": ">= 8.10.0"
            },
            "optionalDependencies": {
                "fsevents": "~2.1.1"
            }
        },
        "node_modules/mocha/node_modules/debug": {
            "version": "3.2.6",
            "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
            "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
            "dev": true,
            "dependencies": {
                "ms": "^2.1.1"
            }
        },
        "node_modules/mocha/node_modules/fill-range": {
            "version": "7.0.1",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
            "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
            "dev": true,
            "dependencies": {
                "to-regex-range": "^5.0.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/mocha/node_modules/fsevents": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.1.2.tgz",
            "integrity": "sha512-R4wDiBwZ0KzpgOWetKDug1FZcYhqYnUYKtfZYt4mD5SBz76q0KR4Q9o7GIPamsVPGmW3EYPPJ0dOOjvx32ldZA==",
            "dev": true,
            "optional": true,
            "os": [
                "darwin"
            ],
            "engines": {
                "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
            }
        },
        "node_modules/mocha/node_modules/glob": {
            "version": "7.1.3",
            "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.3.tgz",
            "integrity": "sha512-vcfuiIxogLV4DlGBHIUOwI0IbrJ8HWPc4MU7HzviGeNho/UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ==",
            "dev": true,
            "dependencies": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/mocha/node_modules/glob-parent": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
            "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
            "dev": true,
            "dependencies": {
                "is-glob": "^4.0.1"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/mocha/node_modules/is-binary-path": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
            "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
            "dev": true,
            "dependencies": {
                "binary-extensions": "^2.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/mocha/node_modules/is-extglob": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
            "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/mocha/node_modules/is-glob": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
            "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
            "dev": true,
            "dependencies": {
                "is-extglob": "^2.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/mocha/node_modules/is-number": {
            "version": "7.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
            "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
            "dev": true,
            "engines": {
                "node": ">=0.12.0"
            }
        },
        "node_modules/mocha/node_modules/mkdirp": {
            "version": "0.5.3",
            "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.3.tgz",
            "integrity": "sha512-P+2gwrFqx8lhew375MQHHeTlY8AuOJSrGf0R5ddkEndUkmwpgUob/vQuBD1V22/Cw1/lJr4x+EjllSezBThzBg==",
            "dev": true,
            "dependencies": {
                "minimist": "^1.2.5"
            },
            "bin": {
                "mkdirp": "bin/cmd.js"
            }
        },
        "node_modules/mocha/node_modules/ms": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
            "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
            "dev": true
        },
        "node_modules/mocha/node_modules/readdirp": {
            "version": "3.2.0",
            "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.2.0.tgz",
            "integrity": "sha512-crk4Qu3pmXwgxdSgGhgA/eXiJAPQiX4GMOZZMXnqKxHX7TaoL+3gQVo/WeuAiogr07DpnfjIMpXXa+PAIvwPGQ==",
            "dev": true,
            "dependencies": {
                "picomatch": "^2.0.4"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/mocha/node_modules/supports-color": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.0.0.tgz",
            "integrity": "sha512-on9Kwidc1IUQo+bQdhi8+Tijpo0e1SS6RoGo2guUwn5vdaxw8RXOF9Vb2ws+ihWOmh4JnCJOvaziZWP1VABaLg==",
            "dev": true,
            "dependencies": {
                "has-flag": "^3.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/mocha/node_modules/to-regex-range": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
            "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
            "dev": true,
            "dependencies": {
                "is-number": "^7.0.0"
            },
            "engines": {
                "node": ">=8.0"
            }
        },
        "node_modules/move-concurrently": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
            "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
            "dependencies": {
                "aproba": "^1.1.1",
                "copy-concurrently": "^1.0.0",
                "fs-write-stream-atomic": "^1.0.8",
                "mkdirp": "^0.5.1",
                "rimraf": "^2.5.4",
                "run-queue": "^1.0.3"
            }
        },
        "node_modules/ms": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
            "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        },
        "node_modules/mv": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/mv/-/mv-2.1.1.tgz",
            "integrity": "sha1-rmzg1vbV4KT32JN5jQPB6pVZtqI=",
            "dependencies": {
                "mkdirp": "~0.5.1",
                "ncp": "~2.0.0",
                "rimraf": "~2.4.0"
            },
            "engines": {
                "node": ">=0.8.0"
            }
        },
        "node_modules/mv/node_modules/glob": {
            "version": "6.0.4",
            "resolved": "https://registry.npmjs.org/glob/-/glob-6.0.4.tgz",
            "integrity": "sha1-DwiGD2oVUSey+t1PnOJLGqtuTSI=",
            "dependencies": {
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "2 || 3",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/mv/node_modules/rimraf": {
            "version": "2.4.5",
            "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.4.5.tgz",
            "integrity": "sha1-7nEM5dk6j9uFb7Xqj/Di11k0sto=",
            "dependencies": {
                "glob": "^6.0.1"
            },
            "bin": {
                "rimraf": "bin.js"
            }
        },
        "node_modules/nan": {
            "version": "2.14.0",
            "resolved": "https://registry.npmjs.org/nan/-/nan-2.14.0.tgz",
            "integrity": "sha512-INOFj37C7k3AfaNTtX8RhsTw7qRy7eLET14cROi9+5HAVbbHuIWUHEauBv5qT4Av2tWasiTY1Jw6puUNqRJXQg==",
            "optional": true
        },
        "node_modules/nanomatch": {
            "version": "1.2.13",
            "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
            "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
            "dependencies": {
                "arr-diff": "^4.0.0",
                "array-unique": "^0.3.2",
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "fragment-cache": "^0.2.1",
                "is-windows": "^1.0.2",
                "kind-of": "^6.0.2",
                "object.pick": "^1.3.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/nanomatch/node_modules/arr-diff": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
            "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/nanomatch/node_modules/array-unique": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
            "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/nanomatch/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/natural-compare": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
            "integrity": "sha1-Sr6/7tdUHywnrPspvbvRXI1bpPc=",
            "dev": true
        },
        "node_modules/ncp": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/ncp/-/ncp-2.0.0.tgz",
            "integrity": "sha1-GVoh1sRuNh0vsSgbo4uR6d9727M=",
            "bin": {
                "ncp": "bin/ncp"
            }
        },
        "node_modules/neo-async": {
            "version": "2.6.1",
            "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.1.tgz",
            "integrity": "sha512-iyam8fBuCUpWeKPGpaNMetEocMt364qkCsfL9JuhjXX6dRnguRVOfk2GZaDpPjcOKiiXCPINZC1GczQ7iTq3Zw=="
        },
        "node_modules/node-environment-flags": {
            "version": "1.0.6",
            "resolved": "https://registry.npmjs.org/node-environment-flags/-/node-environment-flags-1.0.6.tgz",
            "integrity": "sha512-5Evy2epuL+6TM0lCQGpFIj6KwiEsGh1SrHUhTbNX+sLbBtjidPZFAnVK9y5yU1+h//RitLbRHTIMyxQPtxMdHw==",
            "dev": true,
            "dependencies": {
                "object.getownpropertydescriptors": "^2.0.3",
                "semver": "^5.7.0"
            }
        },
        "node_modules/node-fetch": {
            "version": "2.6.1",
            "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.1.tgz",
            "integrity": "sha512-V4aYg89jEoVRxRb2fJdAg8FHvI7cEyYdVAh94HH0UIK8oJxUfkjlDQN9RbMx+bEjP7+ggMiFRprSti032Oipxw==",
            "engines": {
                "node": "4.x || >=6.0.0"
            }
        },
        "node_modules/node-libs-browser": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.2.1.tgz",
            "integrity": "sha512-h/zcD8H9kaDZ9ALUWwlBUDo6TKF8a7qBSCSEGfjTVIYeqsioSKaAX+BN7NgiMGp6iSIXZ3PxgCu8KS3b71YK5Q==",
            "dependencies": {
                "assert": "^1.1.1",
                "browserify-zlib": "^0.2.0",
                "buffer": "^4.3.0",
                "console-browserify": "^1.1.0",
                "constants-browserify": "^1.0.0",
                "crypto-browserify": "^3.11.0",
                "domain-browser": "^1.1.1",
                "events": "^3.0.0",
                "https-browserify": "^1.0.0",
                "os-browserify": "^0.3.0",
                "path-browserify": "0.0.1",
                "process": "^0.11.10",
                "punycode": "^1.2.4",
                "querystring-es3": "^0.2.0",
                "readable-stream": "^2.3.3",
                "stream-browserify": "^2.0.1",
                "stream-http": "^2.7.2",
                "string_decoder": "^1.0.0",
                "timers-browserify": "^2.0.4",
                "tty-browserify": "0.0.0",
                "url": "^0.11.0",
                "util": "^0.11.0",
                "vm-browserify": "^1.0.1"
            }
        },
        "node_modules/node-libs-browser/node_modules/buffer": {
            "version": "4.9.2",
            "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.2.tgz",
            "integrity": "sha512-xq+q3SRMOxGivLhBNaUdC64hDTQwejJ+H0T/NB1XMtTVEwNTrfFF3gAxiyW0Bu/xWEGhjVKgUcMhCrUy2+uCWg==",
            "dependencies": {
                "base64-js": "^1.0.2",
                "ieee754": "^1.1.4",
                "isarray": "^1.0.0"
            }
        },
        "node_modules/node-libs-browser/node_modules/punycode": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
            "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
        },
        "node_modules/node-libs-browser/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/node-libs-browser/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/normalize-package-data": {
            "version": "2.5.0",
            "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.5.0.tgz",
            "integrity": "sha512-/5CMN3T0R4XTj4DcGaexo+roZSdSFW/0AOOTROrjxzCG1wrWXEsGbRKevjlIL+ZDE4sZlJr5ED4YW0yqmkK+eA==",
            "dev": true,
            "dependencies": {
                "hosted-git-info": "^2.1.4",
                "resolve": "^1.10.0",
                "semver": "2 || 3 || 4 || 5",
                "validate-npm-package-license": "^3.0.1"
            }
        },
        "node_modules/normalize-path": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
            "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/oauth-sign": {
            "version": "0.9.0",
            "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
            "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ==",
            "engines": {
                "node": "*"
            }
        },
        "node_modules/object-assign": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
            "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object-copy": {
            "version": "0.1.0",
            "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
            "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
            "dependencies": {
                "copy-descriptor": "^0.1.0",
                "define-property": "^0.2.5",
                "kind-of": "^3.0.3"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object-copy/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object-inspect": {
            "version": "1.9.0",
            "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.9.0.tgz",
            "integrity": "sha512-i3Bp9iTqwhaLZBxGkRfo5ZbE07BQRT7MGu8+nNgwW9ItGp1TzCTw2DLEoWwjClxBjOFI/hWljTAmYGCEwmtnOw==",
            "dev": true,
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/object-keys": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
            "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
            "dev": true,
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/object-visit": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
            "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
            "dependencies": {
                "isobject": "^3.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object-visit/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object.assign": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.0.tgz",
            "integrity": "sha512-exHJeq6kBKj58mqGyTQ9DFvrZC/eR6OwxzoM9YRoGBqrXYonaFyGiFMuc9VZrXf7DarreEwMpurG3dd+CNyW5w==",
            "dev": true,
            "dependencies": {
                "define-properties": "^1.1.2",
                "function-bind": "^1.1.1",
                "has-symbols": "^1.0.0",
                "object-keys": "^1.0.11"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/object.getownpropertydescriptors": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/object.getownpropertydescriptors/-/object.getownpropertydescriptors-2.1.0.tgz",
            "integrity": "sha512-Z53Oah9A3TdLoblT7VKJaTDdXdT+lQO+cNpKVnya5JDe9uLvzu1YyY1yFDFrcxrlRgWrEFH0jJtD/IbuwjcEVg==",
            "dev": true,
            "dependencies": {
                "define-properties": "^1.1.3",
                "es-abstract": "^1.17.0-next.1"
            },
            "engines": {
                "node": ">= 0.8"
            }
        },
        "node_modules/object.omit": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/object.omit/-/object.omit-2.0.1.tgz",
            "integrity": "sha1-Gpx0SCnznbuFjHbKNXmuKlTr0fo=",
            "dependencies": {
                "for-own": "^0.1.4",
                "is-extendable": "^0.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object.pick": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
            "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
            "dependencies": {
                "isobject": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object.pick/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/object.values": {
            "version": "1.1.2",
            "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.1.2.tgz",
            "integrity": "sha512-MYC0jvJopr8EK6dPBiO8Nb9mvjdypOachO5REGk6MXzujbBrAisKo3HmdEI6kZDL6fC31Mwee/5YbtMebixeag==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "es-abstract": "^1.18.0-next.1",
                "has": "^1.0.3"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/object.values/node_modules/es-abstract": {
            "version": "1.18.0-next.2",
            "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.0-next.2.tgz",
            "integrity": "sha512-Ih4ZMFHEtZupnUh6497zEL4y2+w8+1ljnCyaTa+adcoafI1GOvMwFlDjBLfWR7y9VLfrjRJe9ocuHY1PSR9jjw==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.2",
                "es-to-primitive": "^1.2.1",
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1",
                "is-callable": "^1.2.2",
                "is-negative-zero": "^2.0.1",
                "is-regex": "^1.1.1",
                "object-inspect": "^1.9.0",
                "object-keys": "^1.1.1",
                "object.assign": "^4.1.2",
                "string.prototype.trimend": "^1.0.3",
                "string.prototype.trimstart": "^1.0.3"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/object.values/node_modules/object.assign": {
            "version": "4.1.2",
            "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
            "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "has-symbols": "^1.0.1",
                "object-keys": "^1.1.1"
            },
            "engines": {
                "node": ">= 0.4"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/once": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
            "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
            "dependencies": {
                "wrappy": "1"
            }
        },
        "node_modules/optionator": {
            "version": "0.9.1",
            "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.1.tgz",
            "integrity": "sha512-74RlY5FCnhq4jRxVUPKDaRwrVNXMqsGsiW6AJw4XK8hmtm10wC0ypZBLw5IIp85NZMr91+qd1RvvENwg7jjRFw==",
            "dev": true,
            "dependencies": {
                "deep-is": "^0.1.3",
                "fast-levenshtein": "^2.0.6",
                "levn": "^0.4.1",
                "prelude-ls": "^1.2.1",
                "type-check": "^0.4.0",
                "word-wrap": "^1.2.3"
            },
            "engines": {
                "node": ">= 0.8.0"
            }
        },
        "node_modules/os-browserify": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
            "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc="
        },
        "node_modules/p-limit": {
            "version": "2.2.2",
            "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.2.tgz",
            "integrity": "sha512-WGR+xHecKTr7EbUEhyLSh5Dube9JtdiG78ufaeLxTgpudf/20KqyMioIUZJAezlTIi6evxuoUs9YXc11cU+yzQ==",
            "dependencies": {
                "p-try": "^2.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/p-locate": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
            "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
            "dependencies": {
                "p-limit": "^2.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/p-map": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/p-map/-/p-map-2.1.0.tgz",
            "integrity": "sha512-y3b8Kpd8OAN444hxfBbFfj1FY/RjtTd8tzYwhUqNYXx0fXx2iX4maP4Qr6qhIKbQXI02wTLAda4fYUbDagTUFw==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/p-try": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
            "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/pako": {
            "version": "1.0.11",
            "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.11.tgz",
            "integrity": "sha512-4hLB8Py4zZce5s4yd9XzopqwVv/yGNhV1Bl8NTmCq1763HeK2+EwVTv+leGeL13Dnh2wfbqowVPXCIO0z4taYw=="
        },
        "node_modules/parallel-transform": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.2.0.tgz",
            "integrity": "sha512-P2vSmIu38uIlvdcU7fDkyrxj33gTUy/ABO5ZUbGowxNCopBq/OoD42bP4UmMrJoPyk4Uqf0mu3mtWBhHCZD8yg==",
            "dependencies": {
                "cyclist": "^1.0.1",
                "inherits": "^2.0.3",
                "readable-stream": "^2.1.5"
            }
        },
        "node_modules/parallel-transform/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/parallel-transform/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/parent-module": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
            "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
            "dev": true,
            "dependencies": {
                "callsites": "^3.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/parse-asn1": {
            "version": "5.1.5",
            "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.5.tgz",
            "integrity": "sha512-jkMYn1dcJqF6d5CpU689bq7w/b5ALS9ROVSpQDPrZsqqesUJii9qutvoT5ltGedNXMO2e16YUWIghG9KxaViTQ==",
            "dependencies": {
                "asn1.js": "^4.0.0",
                "browserify-aes": "^1.0.0",
                "create-hash": "^1.1.0",
                "evp_bytestokey": "^1.0.0",
                "pbkdf2": "^3.0.3",
                "safe-buffer": "^5.1.1"
            }
        },
        "node_modules/parse-glob": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/parse-glob/-/parse-glob-3.0.4.tgz",
            "integrity": "sha1-ssN2z7EfNVE7rdFz7wu246OIORw=",
            "dependencies": {
                "glob-base": "^0.3.0",
                "is-dotfile": "^1.0.0",
                "is-extglob": "^1.0.0",
                "is-glob": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/parse-json": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
            "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
            "dev": true,
            "dependencies": {
                "error-ex": "^1.2.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/pascalcase": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
            "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/path-browserify": {
            "version": "0.0.1",
            "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.1.tgz",
            "integrity": "sha512-BapA40NHICOS+USX9SN4tyhq+A2RrN/Ws5F0Z5aMHDp98Fl86lX8Oti8B7uN93L4Ifv4fHOEA+pQw87gmMO/lQ=="
        },
        "node_modules/path-dirname": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
            "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA=",
            "optional": true
        },
        "node_modules/path-exists": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
            "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU=",
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/path-is-absolute": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
            "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/path-is-inside": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/path-is-inside/-/path-is-inside-1.0.2.tgz",
            "integrity": "sha1-NlQX3t5EQw0cEa9hAn+s8HS9/FM="
        },
        "node_modules/path-key": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
            "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/path-parse": {
            "version": "1.0.6",
            "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.6.tgz",
            "integrity": "sha512-GSmOT2EbHrINBf9SR7CDELwlJ8AENk3Qn7OikK4nFYAu3Ote2+JYNVvkpAEQm3/TLNEJFD/xZJjzyxg3KBWOzw=="
        },
        "node_modules/path-type": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
            "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
            "dev": true,
            "dependencies": {
                "pify": "^2.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/path-type/node_modules/pify": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
            "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/pbkdf2": {
            "version": "3.0.17",
            "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.17.tgz",
            "integrity": "sha512-U/il5MsrZp7mGg3mSQfn742na2T+1/vHDCG5/iTI3X9MKUuYUZVLQhyRsg06mCgDBTd57TxzgZt7P+fYfjRLtA==",
            "dependencies": {
                "create-hash": "^1.1.2",
                "create-hmac": "^1.1.4",
                "ripemd160": "^2.0.1",
                "safe-buffer": "^5.0.1",
                "sha.js": "^2.4.8"
            },
            "engines": {
                "node": ">=0.12"
            }
        },
        "node_modules/performance-now": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
            "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
        },
        "node_modules/picomatch": {
            "version": "2.2.2",
            "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.2.2.tgz",
            "integrity": "sha512-q0M/9eZHzmr0AulXyPwNfZjtwZ/RBZlbN3K3CErVrk50T2ASYI7Bye0EvekFY3IP1Nt2DHu0re+V2ZHIpMkuWg==",
            "devOptional": true,
            "engines": {
                "node": ">=8.6"
            }
        },
        "node_modules/pify": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
            "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/pinkie": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
            "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/pinkie-promise": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
            "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
            "dependencies": {
                "pinkie": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/pkg-dir": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
            "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
            "dependencies": {
                "find-up": "^3.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/posix-character-classes": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
            "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/prelude-ls": {
            "version": "1.2.1",
            "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
            "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
            "dev": true,
            "engines": {
                "node": ">= 0.8.0"
            }
        },
        "node_modules/preserve": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/preserve/-/preserve-0.2.0.tgz",
            "integrity": "sha1-gV7R9uvGWSb4ZbMQwHE7yzMVzks=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/process": {
            "version": "0.11.10",
            "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
            "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI=",
            "engines": {
                "node": ">= 0.6.0"
            }
        },
        "node_modules/process-nextick-args": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
            "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag=="
        },
        "node_modules/progress": {
            "version": "2.0.3",
            "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",
            "integrity": "sha512-7PiHtLll5LdnKIMw100I+8xJXR5gW2QwWYkT6iJva0bXitZKa/XMrSbdmg3r2Xnaidz9Qumd0VPaMrZlF9V9sA==",
            "dev": true,
            "engines": {
                "node": ">=0.4.0"
            }
        },
        "node_modules/promise-inflight": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
            "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM="
        },
        "node_modules/prr": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
            "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY="
        },
        "node_modules/psl": {
            "version": "1.8.0",
            "resolved": "https://registry.npmjs.org/psl/-/psl-1.8.0.tgz",
            "integrity": "sha512-RIdOzyoavK+hA18OGGWDqUTsCLhtA7IcZ/6NCs4fFJaHBDab+pDDmDIByWFRQJq2Cd7r1OoQxBGKOaztq+hjIQ=="
        },
        "node_modules/public-encrypt": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
            "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
            "dependencies": {
                "bn.js": "^4.1.0",
                "browserify-rsa": "^4.0.0",
                "create-hash": "^1.1.0",
                "parse-asn1": "^5.0.0",
                "randombytes": "^2.0.1",
                "safe-buffer": "^5.1.2"
            }
        },
        "node_modules/pump": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
            "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
            "dependencies": {
                "end-of-stream": "^1.1.0",
                "once": "^1.3.1"
            }
        },
        "node_modules/pumpify": {
            "version": "1.5.1",
            "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.5.1.tgz",
            "integrity": "sha512-oClZI37HvuUJJxSKKrC17bZ9Cu0ZYhEAGPsPUy9KlMUmv9dKX2o77RUmq7f3XjIxbwyGwYzbzQ1L2Ks8sIradQ==",
            "dependencies": {
                "duplexify": "^3.6.0",
                "inherits": "^2.0.3",
                "pump": "^2.0.0"
            }
        },
        "node_modules/pumpify/node_modules/pump": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
            "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
            "dependencies": {
                "end-of-stream": "^1.1.0",
                "once": "^1.3.1"
            }
        },
        "node_modules/punycode": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
            "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/qs": {
            "version": "6.5.2",
            "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.2.tgz",
            "integrity": "sha512-N5ZAX4/LxJmF+7wN74pUD6qAh9/wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91/odN2dW/WOl7qQHNDGA==",
            "engines": {
                "node": ">=0.6"
            }
        },
        "node_modules/querystring": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
            "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA=",
            "engines": {
                "node": ">=0.4.x"
            }
        },
        "node_modules/querystring-es3": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
            "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM=",
            "engines": {
                "node": ">=0.4.x"
            }
        },
        "node_modules/queue-microtask": {
            "version": "1.2.2",
            "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.2.tgz",
            "integrity": "sha512-dB15eXv3p2jDlbOiNLyMabYg1/sXvppd8DP2J3EOCQ0AkuSXCW2tP7mnVouVLJKgUMY6yP0kcQDVpLCN13h4Xg==",
            "dev": true,
            "funding": [
                {
                    "type": "github",
                    "url": "https://github.com/sponsors/feross"
                },
                {
                    "type": "patreon",
                    "url": "https://www.patreon.com/feross"
                },
                {
                    "type": "consulting",
                    "url": "https://feross.org/support"
                }
            ]
        },
        "node_modules/randomatic": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/randomatic/-/randomatic-3.1.1.tgz",
            "integrity": "sha512-TuDE5KxZ0J461RVjrJZCJc+J+zCkTb1MbH9AQUq68sMhOMcy9jLcb3BrZKgp9q9Ncltdg4QVqWrH02W2EFFVYw==",
            "dependencies": {
                "is-number": "^4.0.0",
                "kind-of": "^6.0.0",
                "math-random": "^1.0.1"
            },
            "engines": {
                "node": ">= 0.10.0"
            }
        },
        "node_modules/randomatic/node_modules/is-number": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
            "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/randomatic/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/randombytes": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
            "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
            "dependencies": {
                "safe-buffer": "^5.1.0"
            }
        },
        "node_modules/randomfill": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
            "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
            "dependencies": {
                "randombytes": "^2.0.5",
                "safe-buffer": "^5.1.0"
            }
        },
        "node_modules/read-pkg": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
            "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
            "dev": true,
            "dependencies": {
                "load-json-file": "^2.0.0",
                "normalize-package-data": "^2.3.2",
                "path-type": "^2.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/read-pkg-up": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
            "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
            "dev": true,
            "dependencies": {
                "find-up": "^2.0.0",
                "read-pkg": "^2.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/read-pkg-up/node_modules/find-up": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
            "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
            "dev": true,
            "dependencies": {
                "locate-path": "^2.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/read-pkg-up/node_modules/locate-path": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
            "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
            "dev": true,
            "dependencies": {
                "p-locate": "^2.0.0",
                "path-exists": "^3.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/read-pkg-up/node_modules/p-limit": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
            "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
            "dev": true,
            "dependencies": {
                "p-try": "^1.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/read-pkg-up/node_modules/p-locate": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
            "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
            "dev": true,
            "dependencies": {
                "p-limit": "^1.1.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/read-pkg-up/node_modules/p-try": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
            "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/readable-stream": {
            "version": "3.6.0",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
            "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
            "dependencies": {
                "inherits": "^2.0.3",
                "string_decoder": "^1.1.1",
                "util-deprecate": "^1.0.1"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/readdirp": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
            "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
            "dependencies": {
                "graceful-fs": "^4.1.11",
                "micromatch": "^3.1.10",
                "readable-stream": "^2.0.2"
            },
            "engines": {
                "node": ">=0.10"
            }
        },
        "node_modules/readdirp/node_modules/arr-diff": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
            "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/array-unique": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
            "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/braces": {
            "version": "2.3.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
            "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
            "dependencies": {
                "arr-flatten": "^1.1.0",
                "array-unique": "^0.3.2",
                "extend-shallow": "^2.0.1",
                "fill-range": "^4.0.0",
                "isobject": "^3.0.1",
                "repeat-element": "^1.1.2",
                "snapdragon": "^0.8.1",
                "snapdragon-node": "^2.0.1",
                "split-string": "^3.0.2",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/braces/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets": {
            "version": "2.1.4",
            "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
            "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
            "dependencies": {
                "debug": "^2.3.3",
                "define-property": "^0.2.5",
                "extend-shallow": "^2.0.1",
                "posix-character-classes": "^0.1.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/is-accessor-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/is-accessor-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/is-data-descriptor": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/is-data-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/is-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
            "dependencies": {
                "is-accessor-descriptor": "^0.1.6",
                "is-data-descriptor": "^0.1.4",
                "kind-of": "^5.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/expand-brackets/node_modules/kind-of": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/extglob": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
            "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
            "dependencies": {
                "array-unique": "^0.3.2",
                "define-property": "^1.0.0",
                "expand-brackets": "^2.1.4",
                "extend-shallow": "^2.0.1",
                "fragment-cache": "^0.2.1",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/extglob/node_modules/define-property": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
            "dependencies": {
                "is-descriptor": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/extglob/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/fill-range": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
            "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
            "dependencies": {
                "extend-shallow": "^2.0.1",
                "is-number": "^3.0.0",
                "repeat-string": "^1.6.1",
                "to-regex-range": "^2.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/fill-range/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/is-number": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
            "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/is-number/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/micromatch": {
            "version": "3.1.10",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
            "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
            "dependencies": {
                "arr-diff": "^4.0.0",
                "array-unique": "^0.3.2",
                "braces": "^2.3.1",
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "extglob": "^2.0.4",
                "fragment-cache": "^0.2.1",
                "kind-of": "^6.0.2",
                "nanomatch": "^1.2.9",
                "object.pick": "^1.3.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/readdirp/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/readdirp/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/regenerator-runtime": {
            "version": "0.11.1",
            "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
            "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg=="
        },
        "node_modules/regex-cache": {
            "version": "0.4.4",
            "resolved": "https://registry.npmjs.org/regex-cache/-/regex-cache-0.4.4.tgz",
            "integrity": "sha512-nVIZwtCjkC9YgvWkpM55B5rBhBYRZhAaJbgcFYXXsHnbZ9UZI9nnVWYZpBlCqv9ho2eZryPnWrZGsOdPwVWXWQ==",
            "dependencies": {
                "is-equal-shallow": "^0.1.3"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/regex-not": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
            "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
            "dependencies": {
                "extend-shallow": "^3.0.2",
                "safe-regex": "^1.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/regexpp": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/regexpp/-/regexpp-3.1.0.tgz",
            "integrity": "sha512-ZOIzd8yVsQQA7j8GCSlPGXwg5PfmA1mrq0JP4nGhh54LaKN3xdai/vHUDu74pKwV8OxseMS65u2NImosQcSD0Q==",
            "dev": true,
            "engines": {
                "node": ">=8"
            },
            "funding": {
                "url": "https://github.com/sponsors/mysticatea"
            }
        },
        "node_modules/remove-trailing-separator": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
            "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8="
        },
        "node_modules/repeat-element": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.3.tgz",
            "integrity": "sha512-ahGq0ZnV5m5XtZLMb+vP76kcAM5nkLqk0lpqAuojSKGgQtn4eRi4ZZGm2olo2zKFH+sMsWaqOCW1dqAnOru72g==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/repeat-string": {
            "version": "1.6.1",
            "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
            "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc=",
            "engines": {
                "node": ">=0.10"
            }
        },
        "node_modules/request": {
            "version": "2.88.2",
            "resolved": "https://registry.npmjs.org/request/-/request-2.88.2.tgz",
            "integrity": "sha512-MsvtOrfG9ZcrOwAW+Qi+F6HbD0CWXEh9ou77uOb7FM2WPhwT7smM833PzanhJLsgXjN89Ir6V2PczXNnMpwKhw==",
            "dependencies": {
                "aws-sign2": "~0.7.0",
                "aws4": "^1.8.0",
                "caseless": "~0.12.0",
                "combined-stream": "~1.0.6",
                "extend": "~3.0.2",
                "forever-agent": "~0.6.1",
                "form-data": "~2.3.2",
                "har-validator": "~5.1.3",
                "http-signature": "~1.2.0",
                "is-typedarray": "~1.0.0",
                "isstream": "~0.1.2",
                "json-stringify-safe": "~5.0.1",
                "mime-types": "~2.1.19",
                "oauth-sign": "~0.9.0",
                "performance-now": "^2.1.0",
                "qs": "~6.5.2",
                "safe-buffer": "^5.1.2",
                "tough-cookie": "~2.5.0",
                "tunnel-agent": "^0.6.0",
                "uuid": "^3.3.2"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/require-directory": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
            "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/require-from-string": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
            "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/require-main-filename": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
            "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg==",
            "dev": true
        },
        "node_modules/resolve": {
            "version": "1.20.0",
            "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.20.0.tgz",
            "integrity": "sha512-wENBPt4ySzg4ybFQW2TT1zMQucPK95HSh/nq2CFTZVOGut2+pQvSsgtda4d26YrYcr067wjbmzOG8byDPBX63A==",
            "dependencies": {
                "is-core-module": "^2.2.0",
                "path-parse": "^1.0.6"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/resolve-from": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
            "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/resolve-url": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
            "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo="
        },
        "node_modules/ret": {
            "version": "0.1.15",
            "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
            "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg==",
            "engines": {
                "node": ">=0.12"
            }
        },
        "node_modules/reusify": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
            "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
            "dev": true,
            "engines": {
                "iojs": ">=1.0.0",
                "node": ">=0.10.0"
            }
        },
        "node_modules/rimraf": {
            "version": "2.7.1",
            "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
            "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
            "dependencies": {
                "glob": "^7.1.3"
            },
            "bin": {
                "rimraf": "bin.js"
            }
        },
        "node_modules/ripemd160": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
            "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
            "dependencies": {
                "hash-base": "^3.0.0",
                "inherits": "^2.0.1"
            }
        },
        "node_modules/run-parallel": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
            "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
            "dev": true,
            "funding": [
                {
                    "type": "github",
                    "url": "https://github.com/sponsors/feross"
                },
                {
                    "type": "patreon",
                    "url": "https://www.patreon.com/feross"
                },
                {
                    "type": "consulting",
                    "url": "https://feross.org/support"
                }
            ],
            "dependencies": {
                "queue-microtask": "^1.2.2"
            }
        },
        "node_modules/run-queue": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
            "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
            "dependencies": {
                "aproba": "^1.1.1"
            }
        },
        "node_modules/safe-buffer": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.0.tgz",
            "integrity": "sha512-fZEwUGbVl7kouZs1jCdMLdt95hdIv0ZeHg6L7qPeciMZhZ+/gdesW4wgTARkrFWEpspjEATAzUGPG8N2jJiwbg=="
        },
        "node_modules/safe-regex": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
            "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
            "dependencies": {
                "ret": "~0.1.10"
            }
        },
        "node_modules/safer-buffer": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
            "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
        },
        "node_modules/sax": {
            "version": "1.2.4",
            "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
            "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
        },
        "node_modules/schema-utils": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
            "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
            "dependencies": {
                "ajv": "^6.1.0",
                "ajv-errors": "^1.0.0",
                "ajv-keywords": "^3.1.0"
            },
            "engines": {
                "node": ">= 4"
            }
        },
        "node_modules/semver": {
            "version": "5.7.1",
            "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
            "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
            "bin": {
                "semver": "bin/semver"
            }
        },
        "node_modules/serialize-javascript": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-4.0.0.tgz",
            "integrity": "sha512-GaNA54380uFefWghODBWEGisLZFj00nS5ACs6yHa9nLqlLpVLO8ChDGeKRjZnV4Nh4n0Qi7nhYZD/9fCPzEqkw==",
            "dependencies": {
                "randombytes": "^2.1.0"
            }
        },
        "node_modules/set-blocking": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
            "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc=",
            "dev": true
        },
        "node_modules/set-value": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.1.tgz",
            "integrity": "sha512-JxHc1weCN68wRY0fhCoXpyK55m/XPHafOmK4UWD7m2CI14GMcFypt4w/0+NV5f/ZMby2F6S2wwA7fgynh9gWSw==",
            "dependencies": {
                "extend-shallow": "^2.0.1",
                "is-extendable": "^0.1.1",
                "is-plain-object": "^2.0.3",
                "split-string": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/set-value/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/setimmediate": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
            "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU="
        },
        "node_modules/sha.js": {
            "version": "2.4.11",
            "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
            "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
            "dependencies": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            },
            "bin": {
                "sha.js": "bin.js"
            }
        },
        "node_modules/shebang-command": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
            "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
            "dev": true,
            "dependencies": {
                "shebang-regex": "^3.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/shebang-regex": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
            "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/shell-quote": {
            "version": "1.7.2",
            "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.7.2.tgz",
            "integrity": "sha512-mRz/m/JVscCrkMyPqHc/bczi3OQHkLTqXHEFu0zDhK/qfv3UcOA4SVmRCLmos4bhjr9ekVQubj/R7waKapmiQg=="
        },
        "node_modules/slash": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/slash/-/slash-3.0.0.tgz",
            "integrity": "sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/slice-ansi": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-4.0.0.tgz",
            "integrity": "sha512-qMCMfhY040cVHT43K9BFygqYbUPFZKHOg7K73mtTWJRb8pyP3fzf4Ixd5SzdEJQ6MRUg/WBnOLxghZtKKurENQ==",
            "dev": true,
            "dependencies": {
                "ansi-styles": "^4.0.0",
                "astral-regex": "^2.0.0",
                "is-fullwidth-code-point": "^3.0.0"
            },
            "engines": {
                "node": ">=10"
            },
            "funding": {
                "url": "https://github.com/chalk/slice-ansi?sponsor=1"
            }
        },
        "node_modules/slice-ansi/node_modules/ansi-styles": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
            "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
            "dev": true,
            "dependencies": {
                "color-convert": "^2.0.1"
            },
            "engines": {
                "node": ">=8"
            },
            "funding": {
                "url": "https://github.com/chalk/ansi-styles?sponsor=1"
            }
        },
        "node_modules/slice-ansi/node_modules/color-convert": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
            "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
            "dev": true,
            "dependencies": {
                "color-name": "~1.1.4"
            },
            "engines": {
                "node": ">=7.0.0"
            }
        },
        "node_modules/slice-ansi/node_modules/color-name": {
            "version": "1.1.4",
            "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
            "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
            "dev": true
        },
        "node_modules/slice-ansi/node_modules/is-fullwidth-code-point": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
            "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/snapdragon": {
            "version": "0.8.2",
            "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
            "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
            "dependencies": {
                "base": "^0.11.1",
                "debug": "^2.2.0",
                "define-property": "^0.2.5",
                "extend-shallow": "^2.0.1",
                "map-cache": "^0.2.2",
                "source-map": "^0.5.6",
                "source-map-resolve": "^0.5.0",
                "use": "^3.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
            "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
            "dependencies": {
                "define-property": "^1.0.0",
                "isobject": "^3.0.0",
                "snapdragon-util": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node/node_modules/define-property": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
            "dependencies": {
                "is-descriptor": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-node/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon-util": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
            "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
            "dependencies": {
                "kind-of": "^3.2.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/snapdragon/node_modules/source-map": {
            "version": "0.5.7",
            "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
            "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/source-list-map": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.1.tgz",
            "integrity": "sha512-qnQ7gVMxGNxsiL4lEuJwe/To8UnK7fAnmbGEEH8RpLouuKbeEm0lhbQVFIrNSuB+G7tVrAlVsZgETT5nljf+Iw=="
        },
        "node_modules/source-map": {
            "version": "0.6.1",
            "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
            "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/source-map-resolve": {
            "version": "0.5.3",
            "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.3.tgz",
            "integrity": "sha512-Htz+RnsXWk5+P2slx5Jh3Q66vhQj1Cllm0zvnaY98+NFx+Dv2CF/f5O/t8x+KaNdrdIAsruNzoh/KpialbqAnw==",
            "dependencies": {
                "atob": "^2.1.2",
                "decode-uri-component": "^0.2.0",
                "resolve-url": "^0.2.1",
                "source-map-url": "^0.4.0",
                "urix": "^0.1.0"
            }
        },
        "node_modules/source-map-support": {
            "version": "0.5.16",
            "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.16.tgz",
            "integrity": "sha512-efyLRJDr68D9hBBNIPWFjhpFzURh+KJykQwvMyW5UiZzYwoF6l4YMMDIJJEyFWxWCqfyxLzz6tSfUFR+kXXsVQ==",
            "dependencies": {
                "buffer-from": "^1.0.0",
                "source-map": "^0.6.0"
            }
        },
        "node_modules/source-map-url": {
            "version": "0.4.0",
            "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
            "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM="
        },
        "node_modules/spdx-correct": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.1.1.tgz",
            "integrity": "sha512-cOYcUWwhCuHCXi49RhFRCyJEK3iPj1Ziz9DpViV3tbZOwXD49QzIN3MpOLJNxh2qwq2lJJZaKMVw9qNi4jTC0w==",
            "dev": true,
            "dependencies": {
                "spdx-expression-parse": "^3.0.0",
                "spdx-license-ids": "^3.0.0"
            }
        },
        "node_modules/spdx-exceptions": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.3.0.tgz",
            "integrity": "sha512-/tTrYOC7PPI1nUAgx34hUpqXuyJG+DTHJTnIULG4rDygi4xu/tfgmq1e1cIRwRzwZgo4NLySi+ricLkZkw4i5A==",
            "dev": true
        },
        "node_modules/spdx-expression-parse": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.1.tgz",
            "integrity": "sha512-cbqHunsQWnJNE6KhVSMsMeH5H/L9EpymbzqTQ3uLwNCLZ1Q481oWaofqH7nO6V07xlXwY6PhQdQ2IedWx/ZK4Q==",
            "dev": true,
            "dependencies": {
                "spdx-exceptions": "^2.1.0",
                "spdx-license-ids": "^3.0.0"
            }
        },
        "node_modules/spdx-license-ids": {
            "version": "3.0.7",
            "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.7.tgz",
            "integrity": "sha512-U+MTEOO0AiDzxwFvoa4JVnMV6mZlJKk2sBLt90s7G0Gd0Mlknc7kxEn3nuDPNZRta7O2uy8oLcZLVT+4sqNZHQ==",
            "dev": true
        },
        "node_modules/split-string": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
            "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
            "dependencies": {
                "extend-shallow": "^3.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/sprintf-js": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
            "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw=",
            "dev": true
        },
        "node_modules/sshpk": {
            "version": "1.16.1",
            "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.16.1.tgz",
            "integrity": "sha512-HXXqVUq7+pcKeLqqZj6mHFUMvXtOJt1uoUx09pFW6011inTMxqI8BA8PM95myrIyyKwdnzjdFjLiE6KBPVtJIg==",
            "dependencies": {
                "asn1": "~0.2.3",
                "assert-plus": "^1.0.0",
                "bcrypt-pbkdf": "^1.0.0",
                "dashdash": "^1.12.0",
                "ecc-jsbn": "~0.1.1",
                "getpass": "^0.1.1",
                "jsbn": "~0.1.0",
                "safer-buffer": "^2.0.2",
                "tweetnacl": "~0.14.0"
            },
            "bin": {
                "sshpk-conv": "bin/sshpk-conv",
                "sshpk-sign": "bin/sshpk-sign",
                "sshpk-verify": "bin/sshpk-verify"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ssri": {
            "version": "6.0.1",
            "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
            "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
            "dependencies": {
                "figgy-pudding": "^3.5.1"
            }
        },
        "node_modules/static-extend": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
            "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
            "dependencies": {
                "define-property": "^0.2.5",
                "object-copy": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/static-extend/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/stream-browserify": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.2.tgz",
            "integrity": "sha512-nX6hmklHs/gr2FuxYDltq8fJA1GDlxKQCz8O/IM4atRqBH8OORmBNgfvW5gG10GT/qQ9u0CzIvr2X5Pkt6ntqg==",
            "dependencies": {
                "inherits": "~2.0.1",
                "readable-stream": "^2.0.2"
            }
        },
        "node_modules/stream-browserify/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/stream-browserify/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/stream-each": {
            "version": "1.2.3",
            "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.3.tgz",
            "integrity": "sha512-vlMC2f8I2u/bZGqkdfLQW/13Zihpej/7PmSiMQsbYddxuTsJp8vRe2x2FvVExZg7FaOds43ROAuFJwPR4MTZLw==",
            "dependencies": {
                "end-of-stream": "^1.1.0",
                "stream-shift": "^1.0.0"
            }
        },
        "node_modules/stream-http": {
            "version": "2.8.3",
            "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
            "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
            "dependencies": {
                "builtin-status-codes": "^3.0.0",
                "inherits": "^2.0.1",
                "readable-stream": "^2.3.6",
                "to-arraybuffer": "^1.0.0",
                "xtend": "^4.0.0"
            }
        },
        "node_modules/stream-http/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/stream-http/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/stream-shift": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.1.tgz",
            "integrity": "sha512-AiisoFqQ0vbGcZgQPY1cdP2I76glaVA/RauYR4G4thNFgkTqr90yXTo4LYX60Jl+sIlPNHHdGSwo01AvbKUSVQ=="
        },
        "node_modules/string_decoder": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
            "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
            "dependencies": {
                "safe-buffer": "~5.1.0"
            }
        },
        "node_modules/string_decoder/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/string-width": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
            "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
            "dev": true,
            "dependencies": {
                "is-fullwidth-code-point": "^2.0.0",
                "strip-ansi": "^4.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/string.prototype.trimend": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.3.tgz",
            "integrity": "sha512-ayH0pB+uf0U28CtjlLvL7NaohvR1amUvVZk+y3DYb0Ey2PUV5zPkkKy9+U1ndVEIXO8hNg18eIv9Jntbii+dKw==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/string.prototype.trimleft": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/string.prototype.trimleft/-/string.prototype.trimleft-2.1.1.tgz",
            "integrity": "sha512-iu2AGd3PuP5Rp7x2kEZCrB2Nf41ehzh+goo8TV7z8/XDBbsvc6HQIlUl9RjkZ4oyrW1XM5UwlGl1oVEaDjg6Ag==",
            "dev": true,
            "dependencies": {
                "define-properties": "^1.1.3",
                "function-bind": "^1.1.1"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/string.prototype.trimright": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/string.prototype.trimright/-/string.prototype.trimright-2.1.1.tgz",
            "integrity": "sha512-qFvWL3/+QIgZXVmJBfpHmxLB7xsUXz6HsUmP8+5dRaC3Q7oKUv9Vo6aMCRZC1smrtyECFsIT30PqBJ1gTjAs+g==",
            "dev": true,
            "dependencies": {
                "define-properties": "^1.1.3",
                "function-bind": "^1.1.1"
            },
            "engines": {
                "node": ">= 0.4"
            }
        },
        "node_modules/string.prototype.trimstart": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.3.tgz",
            "integrity": "sha512-oBIBUy5lea5tt0ovtOFiEQaBkoBBkyJhZXzJYrSmDo5IUUqbOPvVezuRs/agBIdZ2p2Eo1FD6bD9USyBLfl3xg==",
            "dev": true,
            "dependencies": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3"
            },
            "funding": {
                "url": "https://github.com/sponsors/ljharb"
            }
        },
        "node_modules/strip-ansi": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
            "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
            "dev": true,
            "dependencies": {
                "ansi-regex": "^3.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/strip-bom": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
            "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/strip-json-comments": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
            "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo=",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/subarg": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/subarg/-/subarg-1.0.0.tgz",
            "integrity": "sha1-9izxdYHplrSPyWVpn1TAauJouNI=",
            "dependencies": {
                "minimist": "^1.1.0"
            }
        },
        "node_modules/supports-color": {
            "version": "5.5.0",
            "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
            "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
            "dependencies": {
                "has-flag": "^3.0.0"
            },
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/table": {
            "version": "6.0.7",
            "resolved": "https://registry.npmjs.org/table/-/table-6.0.7.tgz",
            "integrity": "sha512-rxZevLGTUzWna/qBLObOe16kB2RTnnbhciwgPbMMlazz1yZGVEgnZK762xyVdVznhqxrfCeBMmMkgOOaPwjH7g==",
            "dev": true,
            "dependencies": {
                "ajv": "^7.0.2",
                "lodash": "^4.17.20",
                "slice-ansi": "^4.0.0",
                "string-width": "^4.2.0"
            },
            "engines": {
                "node": ">=10.0.0"
            }
        },
        "node_modules/table/node_modules/ajv": {
            "version": "7.1.0",
            "resolved": "https://registry.npmjs.org/ajv/-/ajv-7.1.0.tgz",
            "integrity": "sha512-svS9uILze/cXbH0z2myCK2Brqprx/+JJYK5pHicT/GQiBfzzhUVAIT6MwqJg8y4xV/zoGsUeuPuwtoiKSGE15g==",
            "dev": true,
            "dependencies": {
                "fast-deep-equal": "^3.1.1",
                "json-schema-traverse": "^1.0.0",
                "require-from-string": "^2.0.2",
                "uri-js": "^4.2.2"
            },
            "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/epoberezkin"
            }
        },
        "node_modules/table/node_modules/ansi-regex": {
            "version": "5.0.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
            "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/table/node_modules/emoji-regex": {
            "version": "8.0.0",
            "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
            "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
            "dev": true
        },
        "node_modules/table/node_modules/is-fullwidth-code-point": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
            "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/table/node_modules/json-schema-traverse": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
            "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
            "dev": true
        },
        "node_modules/table/node_modules/string-width": {
            "version": "4.2.0",
            "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.0.tgz",
            "integrity": "sha512-zUz5JD+tgqtuDjMhwIg5uFVV3dtqZ9yQJlZVfq4I01/K5Paj5UHj7VyrQOJvzawSVlKpObApbfD0Ed6yJc+1eg==",
            "dev": true,
            "dependencies": {
                "emoji-regex": "^8.0.0",
                "is-fullwidth-code-point": "^3.0.0",
                "strip-ansi": "^6.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/table/node_modules/strip-ansi": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
            "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
            "dev": true,
            "dependencies": {
                "ansi-regex": "^5.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/tapable": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.1.3.tgz",
            "integrity": "sha512-4WK/bYZmj8xLr+HUCODHGF1ZFzsYffasLUgEiMBY4fgtltdO6B4WJtlSbPaDTLpYTcGVwM2qLnFTICEcNxs3kA==",
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/tar-stream": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.1.2.tgz",
            "integrity": "sha512-UaF6FoJ32WqALZGOIAApXx+OdxhekNMChu6axLJR85zMMjXKWFGjbIRe+J6P4UnRGg9rAwWvbTT0oI7hD/Un7Q==",
            "dependencies": {
                "bl": "^4.0.1",
                "end-of-stream": "^1.4.1",
                "fs-constants": "^1.0.0",
                "inherits": "^2.0.3",
                "readable-stream": "^3.1.1"
            }
        },
        "node_modules/terser": {
            "version": "4.8.0",
            "resolved": "https://registry.npmjs.org/terser/-/terser-4.8.0.tgz",
            "integrity": "sha512-EAPipTNeWsb/3wLPeup1tVPaXfIaU68xMnVdPafIL1TV05OhASArYyIfFvnvJCNrR2NIOvDVNNTFRa+Re2MWyw==",
            "dependencies": {
                "commander": "^2.20.0",
                "source-map": "~0.6.1",
                "source-map-support": "~0.5.12"
            },
            "bin": {
                "terser": "bin/terser"
            },
            "engines": {
                "node": ">=6.0.0"
            }
        },
        "node_modules/terser-webpack-plugin": {
            "version": "1.4.5",
            "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-1.4.5.tgz",
            "integrity": "sha512-04Rfe496lN8EYruwi6oPQkG0vo8C+HT49X687FZnpPF0qMAIHONI6HEXYPKDOE8e5HjXTyKfqRd/agHtH0kOtw==",
            "dependencies": {
                "cacache": "^12.0.2",
                "find-cache-dir": "^2.1.0",
                "is-wsl": "^1.1.0",
                "schema-utils": "^1.0.0",
                "serialize-javascript": "^4.0.0",
                "source-map": "^0.6.1",
                "terser": "^4.1.2",
                "webpack-sources": "^1.4.0",
                "worker-farm": "^1.7.0"
            },
            "engines": {
                "node": ">= 6.9.0"
            }
        },
        "node_modules/text-table": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
            "integrity": "sha1-f17oI66AUgfACvLfSoTsP8+lcLQ=",
            "dev": true
        },
        "node_modules/through2": {
            "version": "2.0.5",
            "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.5.tgz",
            "integrity": "sha512-/mrRod8xqpA+IHSLyGCQ2s8SPHiCDEeQJSep1jqLYeEUClOFG2Qsh+4FU6G9VeqpZnGW/Su8LQGc4YKni5rYSQ==",
            "dependencies": {
                "readable-stream": "~2.3.6",
                "xtend": "~4.0.1"
            }
        },
        "node_modules/through2/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/through2/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/timers-browserify": {
            "version": "2.0.11",
            "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.11.tgz",
            "integrity": "sha512-60aV6sgJ5YEbzUdn9c8kYGIqOubPoUdqQCul3SBAsRCZ40s6Y5cMcrW4dt3/k/EsbLVJNl9n6Vz3fTc+k2GeKQ==",
            "dependencies": {
                "setimmediate": "^1.0.4"
            },
            "engines": {
                "node": ">=0.6.0"
            }
        },
        "node_modules/to-arraybuffer": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
            "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M="
        },
        "node_modules/to-object-path": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
            "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/to-regex": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
            "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
            "dependencies": {
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "regex-not": "^1.0.2",
                "safe-regex": "^1.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/to-regex-range": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
            "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
            "dependencies": {
                "is-number": "^3.0.0",
                "repeat-string": "^1.6.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/to-regex-range/node_modules/is-number": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
            "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/tough-cookie": {
            "version": "2.5.0",
            "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
            "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
            "dependencies": {
                "psl": "^1.1.28",
                "punycode": "^2.1.1"
            },
            "engines": {
                "node": ">=0.8"
            }
        },
        "node_modules/ts-loader": {
            "version": "5.4.5",
            "resolved": "https://registry.npmjs.org/ts-loader/-/ts-loader-5.4.5.tgz",
            "integrity": "sha512-XYsjfnRQCBum9AMRZpk2rTYSVpdZBpZK+kDh0TeT3kxmQNBDVIeUjdPjY5RZry4eIAb8XHc4gYSUiUWPYvzSRw==",
            "dependencies": {
                "chalk": "^2.3.0",
                "enhanced-resolve": "^4.0.0",
                "loader-utils": "^1.0.2",
                "micromatch": "^3.1.4",
                "semver": "^5.0.1"
            },
            "engines": {
                "node": ">=6.11.5"
            }
        },
        "node_modules/ts-loader/node_modules/arr-diff": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
            "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/array-unique": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
            "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/braces": {
            "version": "2.3.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
            "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
            "dependencies": {
                "arr-flatten": "^1.1.0",
                "array-unique": "^0.3.2",
                "extend-shallow": "^2.0.1",
                "fill-range": "^4.0.0",
                "isobject": "^3.0.1",
                "repeat-element": "^1.1.2",
                "snapdragon": "^0.8.1",
                "snapdragon-node": "^2.0.1",
                "split-string": "^3.0.2",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/braces/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets": {
            "version": "2.1.4",
            "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
            "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
            "dependencies": {
                "debug": "^2.3.3",
                "define-property": "^0.2.5",
                "extend-shallow": "^2.0.1",
                "posix-character-classes": "^0.1.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/is-accessor-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/is-accessor-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/is-data-descriptor": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/is-data-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/is-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
            "dependencies": {
                "is-accessor-descriptor": "^0.1.6",
                "is-data-descriptor": "^0.1.4",
                "kind-of": "^5.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/expand-brackets/node_modules/kind-of": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/extglob": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
            "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
            "dependencies": {
                "array-unique": "^0.3.2",
                "define-property": "^1.0.0",
                "expand-brackets": "^2.1.4",
                "extend-shallow": "^2.0.1",
                "fragment-cache": "^0.2.1",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/extglob/node_modules/define-property": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
            "dependencies": {
                "is-descriptor": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/extglob/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/fill-range": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
            "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
            "dependencies": {
                "extend-shallow": "^2.0.1",
                "is-number": "^3.0.0",
                "repeat-string": "^1.6.1",
                "to-regex-range": "^2.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/fill-range/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/is-number": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
            "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/is-number/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-loader/node_modules/micromatch": {
            "version": "3.1.10",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
            "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
            "dependencies": {
                "arr-diff": "^4.0.0",
                "array-unique": "^0.3.2",
                "braces": "^2.3.1",
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "extglob": "^2.0.4",
                "fragment-cache": "^0.2.1",
                "kind-of": "^6.0.2",
                "nanomatch": "^1.2.9",
                "object.pick": "^1.3.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/ts-node": {
            "version": "7.0.1",
            "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-7.0.1.tgz",
            "integrity": "sha512-BVwVbPJRspzNh2yfslyT1PSbl5uIk03EZlb493RKHN4qej/D06n1cEhjlOJG69oFsE7OT8XjpTUcYf6pKTLMhw==",
            "dev": true,
            "dependencies": {
                "arrify": "^1.0.0",
                "buffer-from": "^1.1.0",
                "diff": "^3.1.0",
                "make-error": "^1.1.1",
                "minimist": "^1.2.0",
                "mkdirp": "^0.5.1",
                "source-map-support": "^0.5.6",
                "yn": "^2.0.0"
            },
            "bin": {
                "ts-node": "dist/bin.js"
            },
            "engines": {
                "node": ">=4.2.0"
            }
        },
        "node_modules/tsconfig-paths": {
            "version": "3.9.0",
            "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.9.0.tgz",
            "integrity": "sha512-dRcuzokWhajtZWkQsDVKbWyY+jgcLC5sqJhg2PSgf4ZkH2aHPvaOY8YWGhmjb68b5qqTfasSsDO9k7RUiEmZAw==",
            "dev": true,
            "dependencies": {
                "@types/json5": "^0.0.29",
                "json5": "^1.0.1",
                "minimist": "^1.2.0",
                "strip-bom": "^3.0.0"
            }
        },
        "node_modules/tslib": {
            "version": "1.11.1",
            "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.11.1.tgz",
            "integrity": "sha512-aZW88SY8kQbU7gpV19lN24LtXh/yD4ZZg6qieAJDDg+YBsJcSmLGK9QpnUjAKVG/xefmvJGd1WUmfpT/g6AJGA=="
        },
        "node_modules/tty-browserify": {
            "version": "0.0.0",
            "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
            "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY="
        },
        "node_modules/tunnel": {
            "version": "0.0.6",
            "resolved": "https://registry.npmjs.org/tunnel/-/tunnel-0.0.6.tgz",
            "integrity": "sha512-1h/Lnq9yajKY2PEbBadPXj3VxsDDu844OnaAo52UVmIzIvwwtBPIuNvkjuzBlTWpfJyUbG3ez0KSBibQkj4ojg==",
            "engines": {
                "node": ">=0.6.11 <=0.7.0 || >=0.7.3"
            }
        },
        "node_modules/tunnel-agent": {
            "version": "0.6.0",
            "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
            "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
            "dependencies": {
                "safe-buffer": "^5.0.1"
            },
            "engines": {
                "node": "*"
            }
        },
        "node_modules/tweetnacl": {
            "version": "0.14.5",
            "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
            "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
        },
        "node_modules/type-check": {
            "version": "0.4.0",
            "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
            "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
            "dev": true,
            "dependencies": {
                "prelude-ls": "^1.2.1"
            },
            "engines": {
                "node": ">= 0.8.0"
            }
        },
        "node_modules/type-fest": {
            "version": "0.8.1",
            "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.8.1.tgz",
            "integrity": "sha512-4dbzIzqvjtgiM5rw1k5rEHtBANKmdudhGyBEajN01fEyhaAIhsoKNy6y7+IN93IfpFtwY9iqi7kD+xwKhQsNJA==",
            "dev": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/typedarray": {
            "version": "0.0.6",
            "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
            "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c="
        },
        "node_modules/typescript": {
            "version": "3.8.3",
            "resolved": "https://registry.npmjs.org/typescript/-/typescript-3.8.3.tgz",
            "integrity": "sha512-MYlEfn5VrLNsgudQTVJeNaQFUAI7DkhnOjdpAp4T+ku1TfQClewlbSuTVHiA+8skNBgaf02TL/kLOvig4y3G8w==",
            "dev": true,
            "bin": {
                "tsc": "bin/tsc",
                "tsserver": "bin/tsserver"
            },
            "engines": {
                "node": ">=4.2.0"
            }
        },
        "node_modules/underscore": {
            "version": "1.9.2",
            "resolved": "https://registry.npmjs.org/underscore/-/underscore-1.9.2.tgz",
            "integrity": "sha512-D39qtimx0c1fI3ya1Lnhk3E9nONswSKhnffBI0gME9C99fYOkNi04xs8K6pePLhvl1frbDemkaBQ5ikWllR2HQ=="
        },
        "node_modules/union-value": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",
            "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",
            "dependencies": {
                "arr-union": "^3.1.0",
                "get-value": "^2.0.6",
                "is-extendable": "^0.1.1",
                "set-value": "^2.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/unique-filename": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.1.tgz",
            "integrity": "sha512-Vmp0jIp2ln35UTXuryvjzkjGdRyf9b2lTXuSYUiPmzRcl3FDtYqAwOnTJkAngD9SWhnoJzDbTKwaOrZ+STtxNQ==",
            "dependencies": {
                "unique-slug": "^2.0.0"
            }
        },
        "node_modules/unique-slug": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.2.tgz",
            "integrity": "sha512-zoWr9ObaxALD3DOPfjPSqxt4fnZiWblxHIgeWqW8x7UqDzEtHEQLzji2cuJYQFCU6KmoJikOYAZlrTHHebjx2w==",
            "dependencies": {
                "imurmurhash": "^0.1.4"
            }
        },
        "node_modules/universalify": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/universalify/-/universalify-0.1.2.tgz",
            "integrity": "sha512-rBJeI5CXAlmy1pV+617WB9J63U6XcazHHF2f2dbJix4XzpUF0RS3Zbj0FGIOCAva5P/d/GBOYaACQ1w+0azUkg==",
            "engines": {
                "node": ">= 4.0.0"
            }
        },
        "node_modules/unset-value": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
            "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
            "dependencies": {
                "has-value": "^0.3.1",
                "isobject": "^3.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/unset-value/node_modules/has-value": {
            "version": "0.3.1",
            "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
            "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
            "dependencies": {
                "get-value": "^2.0.3",
                "has-values": "^0.1.4",
                "isobject": "^2.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/unset-value/node_modules/has-value/node_modules/isobject": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
            "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
            "dependencies": {
                "isarray": "1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/unset-value/node_modules/has-values": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
            "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/unset-value/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/upath": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/upath/-/upath-1.2.0.tgz",
            "integrity": "sha512-aZwGpamFO61g3OlfT7OQCHqhGnW43ieH9WZeP7QxN/G/jS4jfqUkZxoryvJgVPEcrl5NL/ggHsSmLMHuH64Lhg==",
            "optional": true,
            "engines": {
                "node": ">=4",
                "yarn": "*"
            }
        },
        "node_modules/uri-js": {
            "version": "4.2.2",
            "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.2.2.tgz",
            "integrity": "sha512-KY9Frmirql91X2Qgjry0Wd4Y+YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4+0Baa5idK2ZQuELRwPznQ==",
            "dependencies": {
                "punycode": "^2.1.0"
            }
        },
        "node_modules/urix": {
            "version": "0.1.0",
            "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
            "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI="
        },
        "node_modules/url": {
            "version": "0.11.0",
            "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
            "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
            "dependencies": {
                "punycode": "1.3.2",
                "querystring": "0.2.0"
            }
        },
        "node_modules/url/node_modules/punycode": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
            "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0="
        },
        "node_modules/use": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
            "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/util": {
            "version": "0.11.1",
            "resolved": "https://registry.npmjs.org/util/-/util-0.11.1.tgz",
            "integrity": "sha512-HShAsny+zS2TZfaXxD9tYj4HQGlBezXZMZuM/S5PKLLoZkShZiGk9o5CzukI1LVHZvjdvZ2Sj1aW/Ndn2NB/HQ==",
            "dependencies": {
                "inherits": "2.0.3"
            }
        },
        "node_modules/util-deprecate": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
            "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8="
        },
        "node_modules/util/node_modules/inherits": {
            "version": "2.0.3",
            "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
            "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
        },
        "node_modules/uuid": {
            "version": "3.4.0",
            "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.4.0.tgz",
            "integrity": "sha512-HjSDRw6gZE5JMggctHBcjVak08+KEVhSIiDzFnT9S9aegmp85S/bReBVTb4QTFaRNptJ9kuYaNhnbNEOkbKb/A==",
            "bin": {
                "uuid": "bin/uuid"
            }
        },
        "node_modules/v8-compile-cache": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/v8-compile-cache/-/v8-compile-cache-2.2.0.tgz",
            "integrity": "sha512-gTpR5XQNKFwOd4clxfnhaqvfqMpqEwr4tOtCyz4MtYZX2JYhfr1JvBFKdS+7K/9rfpZR3VLX+YWBbKoxCgS43Q==",
            "dev": true
        },
        "node_modules/validate-npm-package-license": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
            "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
            "dev": true,
            "dependencies": {
                "spdx-correct": "^3.0.0",
                "spdx-expression-parse": "^3.0.0"
            }
        },
        "node_modules/verror": {
            "version": "1.10.0",
            "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
            "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
            "engines": [
                "node >=0.6.0"
            ],
            "dependencies": {
                "assert-plus": "^1.0.0",
                "core-util-is": "1.0.2",
                "extsprintf": "^1.2.0"
            }
        },
        "node_modules/vm-browserify": {
            "version": "1.1.2",
            "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-1.1.2.tgz",
            "integrity": "sha512-2ham8XPWTONajOR0ohOKOHXkm3+gaBmGut3SRuu75xLd/RRaY6vqgh8NBYYk7+RW3u5AtzPQZG8F10LHkl0lAQ=="
        },
        "node_modules/vscode-test": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/vscode-test/-/vscode-test-1.3.0.tgz",
            "integrity": "sha512-LddukcBiSU2FVTDr3c1D8lwkiOvwlJdDL2hqVbn6gIz+rpTqUCkMZSKYm94Y1v0WXlHSDQBsXyY+tchWQgGVsw==",
            "dev": true,
            "dependencies": {
                "http-proxy-agent": "^2.1.0",
                "https-proxy-agent": "^2.2.4",
                "rimraf": "^2.6.3"
            },
            "engines": {
                "node": ">=8.9.3"
            }
        },
        "node_modules/watchpack": {
            "version": "1.7.5",
            "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.7.5.tgz",
            "integrity": "sha512-9P3MWk6SrKjHsGkLT2KHXdQ/9SNkyoJbabxnKOoJepsvJjJG8uYTR3yTPxPQvNDI3w4Nz1xnE0TLHK4RIVe/MQ==",
            "dependencies": {
                "graceful-fs": "^4.1.2",
                "neo-async": "^2.5.0"
            },
            "optionalDependencies": {
                "chokidar": "^3.4.1",
                "watchpack-chokidar2": "^2.0.1"
            }
        },
        "node_modules/watchpack-chokidar2": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/watchpack-chokidar2/-/watchpack-chokidar2-2.0.1.tgz",
            "integrity": "sha512-nCFfBIPKr5Sh61s4LPpy1Wtfi0HE8isJ3d2Yb5/Ppw2P2B/3eVSEBjKfN0fmHJSK14+31KwMKmcrzs2GM4P0Ww==",
            "optional": true,
            "dependencies": {
                "chokidar": "^2.1.8"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/anymatch": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
            "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
            "optional": true,
            "dependencies": {
                "micromatch": "^3.1.4",
                "normalize-path": "^2.1.1"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/anymatch/node_modules/normalize-path": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
            "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
            "optional": true,
            "dependencies": {
                "remove-trailing-separator": "^1.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/arr-diff": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
            "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/array-unique": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
            "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/braces": {
            "version": "2.3.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
            "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
            "optional": true,
            "dependencies": {
                "arr-flatten": "^1.1.0",
                "array-unique": "^0.3.2",
                "extend-shallow": "^2.0.1",
                "fill-range": "^4.0.0",
                "isobject": "^3.0.1",
                "repeat-element": "^1.1.2",
                "snapdragon": "^0.8.1",
                "snapdragon-node": "^2.0.1",
                "split-string": "^3.0.2",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/braces/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "optional": true,
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/chokidar": {
            "version": "2.1.8",
            "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.1.8.tgz",
            "integrity": "sha512-ZmZUazfOzf0Nve7duiCKD23PFSCs4JPoYyccjUFF3aQkQadqBhfzhjkwBH2mNOG9cTBwhamM37EIsIkZw3nRgg==",
            "optional": true,
            "dependencies": {
                "anymatch": "^2.0.0",
                "async-each": "^1.0.1",
                "braces": "^2.3.2",
                "fsevents": "^1.2.7",
                "glob-parent": "^3.1.0",
                "inherits": "^2.0.3",
                "is-binary-path": "^1.0.0",
                "is-glob": "^4.0.0",
                "normalize-path": "^3.0.0",
                "path-is-absolute": "^1.0.0",
                "readdirp": "^2.2.1",
                "upath": "^1.1.1"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets": {
            "version": "2.1.4",
            "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
            "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
            "optional": true,
            "dependencies": {
                "debug": "^2.3.3",
                "define-property": "^0.2.5",
                "extend-shallow": "^2.0.1",
                "posix-character-classes": "^0.1.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "optional": true,
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "optional": true,
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/is-accessor-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
            "optional": true,
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/is-accessor-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "optional": true,
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/is-data-descriptor": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
            "optional": true,
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/is-data-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "optional": true,
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/is-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
            "optional": true,
            "dependencies": {
                "is-accessor-descriptor": "^0.1.6",
                "is-data-descriptor": "^0.1.4",
                "kind-of": "^5.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/expand-brackets/node_modules/kind-of": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/extglob": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
            "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
            "optional": true,
            "dependencies": {
                "array-unique": "^0.3.2",
                "define-property": "^1.0.0",
                "expand-brackets": "^2.1.4",
                "extend-shallow": "^2.0.1",
                "fragment-cache": "^0.2.1",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/extglob/node_modules/define-property": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
            "optional": true,
            "dependencies": {
                "is-descriptor": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/extglob/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "optional": true,
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/fill-range": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
            "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
            "optional": true,
            "dependencies": {
                "extend-shallow": "^2.0.1",
                "is-number": "^3.0.0",
                "repeat-string": "^1.6.1",
                "to-regex-range": "^2.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/fill-range/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "optional": true,
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/glob-parent": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
            "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
            "optional": true,
            "dependencies": {
                "is-glob": "^3.1.0",
                "path-dirname": "^1.0.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/glob-parent/node_modules/is-glob": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
            "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
            "optional": true,
            "dependencies": {
                "is-extglob": "^2.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "optional": true,
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "optional": true,
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "optional": true,
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-extglob": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
            "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-glob": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
            "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
            "optional": true,
            "dependencies": {
                "is-extglob": "^2.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-number": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
            "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
            "optional": true,
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/is-number/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "optional": true,
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack-chokidar2/node_modules/micromatch": {
            "version": "3.1.10",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
            "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
            "optional": true,
            "dependencies": {
                "arr-diff": "^4.0.0",
                "array-unique": "^0.3.2",
                "braces": "^2.3.1",
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "extglob": "^2.0.4",
                "fragment-cache": "^0.2.1",
                "kind-of": "^6.0.2",
                "nanomatch": "^1.2.9",
                "object.pick": "^1.3.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack/node_modules/anymatch": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.1.tgz",
            "integrity": "sha512-mM8522psRCqzV+6LhomX5wgp25YVibjh8Wj23I5RPkPppSVSjyKD2A2mBJmWGa+KN7f2D6LNh9jkBCeyLktzjg==",
            "optional": true,
            "dependencies": {
                "normalize-path": "^3.0.0",
                "picomatch": "^2.0.4"
            },
            "engines": {
                "node": ">= 8"
            }
        },
        "node_modules/watchpack/node_modules/binary-extensions": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.2.0.tgz",
            "integrity": "sha512-jDctJ/IVQbZoJykoeHbhXpOlNBqGNcwXJKJog42E5HDPUwQTSdjCHdihjj0DlnheQ7blbT6dHOafNAiS8ooQKA==",
            "optional": true,
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/watchpack/node_modules/braces": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
            "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
            "optional": true,
            "dependencies": {
                "fill-range": "^7.0.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/watchpack/node_modules/chokidar": {
            "version": "3.5.1",
            "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.5.1.tgz",
            "integrity": "sha512-9+s+Od+W0VJJzawDma/gvBNQqkTiqYTWLuZoyAsivsI4AaWTCzHG06/TMjsf1cYe9Cb97UCEhjz7HvnPk2p/tw==",
            "optional": true,
            "dependencies": {
                "anymatch": "~3.1.1",
                "braces": "~3.0.2",
                "fsevents": "~2.3.1",
                "glob-parent": "~5.1.0",
                "is-binary-path": "~2.1.0",
                "is-glob": "~4.0.1",
                "normalize-path": "~3.0.0",
                "readdirp": "~3.5.0"
            },
            "engines": {
                "node": ">= 8.10.0"
            }
        },
        "node_modules/watchpack/node_modules/fill-range": {
            "version": "7.0.1",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
            "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
            "optional": true,
            "dependencies": {
                "to-regex-range": "^5.0.1"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/watchpack/node_modules/fsevents": {
            "version": "2.3.2",
            "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
            "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
            "optional": true,
            "os": [
                "darwin"
            ],
            "engines": {
                "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
            }
        },
        "node_modules/watchpack/node_modules/glob-parent": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
            "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
            "optional": true,
            "dependencies": {
                "is-glob": "^4.0.1"
            },
            "engines": {
                "node": ">= 6"
            }
        },
        "node_modules/watchpack/node_modules/is-binary-path": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
            "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
            "optional": true,
            "dependencies": {
                "binary-extensions": "^2.0.0"
            },
            "engines": {
                "node": ">=8"
            }
        },
        "node_modules/watchpack/node_modules/is-extglob": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
            "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
            "optional": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack/node_modules/is-glob": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
            "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
            "optional": true,
            "dependencies": {
                "is-extglob": "^2.1.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/watchpack/node_modules/is-number": {
            "version": "7.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
            "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
            "optional": true,
            "engines": {
                "node": ">=0.12.0"
            }
        },
        "node_modules/watchpack/node_modules/readdirp": {
            "version": "3.5.0",
            "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.5.0.tgz",
            "integrity": "sha512-cMhu7c/8rdhkHXWsY+osBhfSy0JikwpHK/5+imo+LpeasTF8ouErHrlYkwT0++njiyuDvc7OFY5T3ukvZ8qmFQ==",
            "optional": true,
            "dependencies": {
                "picomatch": "^2.2.1"
            },
            "engines": {
                "node": ">=8.10.0"
            }
        },
        "node_modules/watchpack/node_modules/to-regex-range": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
            "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
            "optional": true,
            "dependencies": {
                "is-number": "^7.0.0"
            },
            "engines": {
                "node": ">=8.0"
            }
        },
        "node_modules/webpack": {
            "version": "4.28.1",
            "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.28.1.tgz",
            "integrity": "sha512-qAS7BFyS5iuOZzGJxyDXmEI289h7tVNtJ5XMxf6Tz55J2riOyH42uaEsWF0F32TRaI+54SmI6qRgHM3GzsZ+sQ==",
            "dependencies": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-module-context": "1.7.11",
                "@webassemblyjs/wasm-edit": "1.7.11",
                "@webassemblyjs/wasm-parser": "1.7.11",
                "acorn": "^5.6.2",
                "acorn-dynamic-import": "^3.0.0",
                "ajv": "^6.1.0",
                "ajv-keywords": "^3.1.0",
                "chrome-trace-event": "^1.0.0",
                "enhanced-resolve": "^4.1.0",
                "eslint-scope": "^4.0.0",
                "json-parse-better-errors": "^1.0.2",
                "loader-runner": "^2.3.0",
                "loader-utils": "^1.1.0",
                "memory-fs": "~0.4.1",
                "micromatch": "^3.1.8",
                "mkdirp": "~0.5.0",
                "neo-async": "^2.5.0",
                "node-libs-browser": "^2.0.0",
                "schema-utils": "^0.4.4",
                "tapable": "^1.1.0",
                "terser-webpack-plugin": "^1.1.0",
                "watchpack": "^1.5.0",
                "webpack-sources": "^1.3.0"
            },
            "bin": {
                "webpack": "bin/webpack.js"
            },
            "engines": {
                "node": ">=6.11.5"
            }
        },
        "node_modules/webpack-sources": {
            "version": "1.4.3",
            "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.4.3.tgz",
            "integrity": "sha512-lgTS3Xhv1lCOKo7SA5TjKXMjpSM4sBjNV5+q2bqesbSPs5FjGmU6jjtBSkX9b4qW87vDIsCIlUPOEhbZrMdjeQ==",
            "dependencies": {
                "source-list-map": "^2.0.0",
                "source-map": "~0.6.1"
            }
        },
        "node_modules/webpack/node_modules/arr-diff": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
            "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/array-unique": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
            "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/braces": {
            "version": "2.3.2",
            "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
            "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
            "dependencies": {
                "arr-flatten": "^1.1.0",
                "array-unique": "^0.3.2",
                "extend-shallow": "^2.0.1",
                "fill-range": "^4.0.0",
                "isobject": "^3.0.1",
                "repeat-element": "^1.1.2",
                "snapdragon": "^0.8.1",
                "snapdragon-node": "^2.0.1",
                "split-string": "^3.0.2",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/braces/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets": {
            "version": "2.1.4",
            "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
            "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
            "dependencies": {
                "debug": "^2.3.3",
                "define-property": "^0.2.5",
                "extend-shallow": "^2.0.1",
                "posix-character-classes": "^0.1.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/define-property": {
            "version": "0.2.5",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
            "dependencies": {
                "is-descriptor": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/is-accessor-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/is-accessor-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/is-data-descriptor": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/is-data-descriptor/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/is-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
            "dependencies": {
                "is-accessor-descriptor": "^0.1.6",
                "is-data-descriptor": "^0.1.4",
                "kind-of": "^5.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/expand-brackets/node_modules/kind-of": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/extglob": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
            "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
            "dependencies": {
                "array-unique": "^0.3.2",
                "define-property": "^1.0.0",
                "expand-brackets": "^2.1.4",
                "extend-shallow": "^2.0.1",
                "fragment-cache": "^0.2.1",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/extglob/node_modules/define-property": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
            "dependencies": {
                "is-descriptor": "^1.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/extglob/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/fill-range": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
            "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
            "dependencies": {
                "extend-shallow": "^2.0.1",
                "is-number": "^3.0.0",
                "repeat-string": "^1.6.1",
                "to-regex-range": "^2.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/fill-range/node_modules/extend-shallow": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
            "dependencies": {
                "is-extendable": "^0.1.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/is-accessor-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
            "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/is-data-descriptor": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
            "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
            "dependencies": {
                "kind-of": "^6.0.0"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/is-descriptor": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
            "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
            "dependencies": {
                "is-accessor-descriptor": "^1.0.0",
                "is-data-descriptor": "^1.0.0",
                "kind-of": "^6.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/is-number": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
            "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
            "dependencies": {
                "kind-of": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/is-number/node_modules/kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "dependencies": {
                "is-buffer": "^1.1.5"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/isobject": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
            "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/kind-of": {
            "version": "6.0.3",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
            "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/memory-fs": {
            "version": "0.4.1",
            "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
            "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
            "dependencies": {
                "errno": "^0.1.3",
                "readable-stream": "^2.0.1"
            }
        },
        "node_modules/webpack/node_modules/micromatch": {
            "version": "3.1.10",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
            "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
            "dependencies": {
                "arr-diff": "^4.0.0",
                "array-unique": "^0.3.2",
                "braces": "^2.3.1",
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "extglob": "^2.0.4",
                "fragment-cache": "^0.2.1",
                "kind-of": "^6.0.2",
                "nanomatch": "^1.2.9",
                "object.pick": "^1.3.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.2"
            },
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/webpack/node_modules/readable-stream": {
            "version": "2.3.7",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
            "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
            "dependencies": {
                "core-util-is": "~1.0.0",
                "inherits": "~2.0.3",
                "isarray": "~1.0.0",
                "process-nextick-args": "~2.0.0",
                "safe-buffer": "~5.1.1",
                "string_decoder": "~1.1.1",
                "util-deprecate": "~1.0.1"
            }
        },
        "node_modules/webpack/node_modules/safe-buffer": {
            "version": "5.1.2",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
            "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
        },
        "node_modules/webpack/node_modules/schema-utils": {
            "version": "0.4.7",
            "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-0.4.7.tgz",
            "integrity": "sha512-v/iwU6wvwGK8HbU9yi3/nhGzP0yGSuhQMzL6ySiec1FSrZZDkhm4noOSWzrNFo/jEc+SJY6jRTwuwbSXJPDUnQ==",
            "dependencies": {
                "ajv": "^6.1.0",
                "ajv-keywords": "^3.1.0"
            },
            "engines": {
                "node": ">= 4"
            }
        },
        "node_modules/which": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
            "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
            "dev": true,
            "dependencies": {
                "isexe": "^2.0.0"
            },
            "bin": {
                "which": "bin/which"
            }
        },
        "node_modules/which-module": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
            "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho=",
            "dev": true
        },
        "node_modules/wide-align": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/wide-align/-/wide-align-1.1.3.tgz",
            "integrity": "sha512-QGkOQc8XL6Bt5PwnsExKBPuMKBxnGxWWW3fU55Xt4feHozMUhdUMaBCk290qpm/wG5u/RSKzwdAC4i51YigihA==",
            "dev": true,
            "dependencies": {
                "string-width": "^1.0.2 || 2"
            }
        },
        "node_modules/word-wrap": {
            "version": "1.2.3",
            "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.3.tgz",
            "integrity": "sha512-Hz/mrNwitNRh/HUAtM/VT/5VH+ygD6DV7mYKZAtHOrbs8U7lvPS6xf7EJKMF0uW1KJCl0H701g3ZGus+muE5vQ==",
            "dev": true,
            "engines": {
                "node": ">=0.10.0"
            }
        },
        "node_modules/worker-farm": {
            "version": "1.7.0",
            "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.7.0.tgz",
            "integrity": "sha512-rvw3QTZc8lAxyVrqcSGVm5yP/IJ2UcB3U0graE3LCFoZ0Yn2x4EoVSqJKdB/T5M+FLcRPjz4TDacRf3OCfNUzw==",
            "dependencies": {
                "errno": "~0.1.7"
            }
        },
        "node_modules/wrap-ansi": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
            "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
            "dev": true,
            "dependencies": {
                "ansi-styles": "^3.2.0",
                "string-width": "^3.0.0",
                "strip-ansi": "^5.0.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/wrap-ansi/node_modules/ansi-regex": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
            "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/wrap-ansi/node_modules/string-width": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
            "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
            "dev": true,
            "dependencies": {
                "emoji-regex": "^7.0.1",
                "is-fullwidth-code-point": "^2.0.0",
                "strip-ansi": "^5.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/wrap-ansi/node_modules/strip-ansi": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
            "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
            "dev": true,
            "dependencies": {
                "ansi-regex": "^4.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/wrappy": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
            "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8="
        },
        "node_modules/xml": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/xml/-/xml-1.0.1.tgz",
            "integrity": "sha1-eLpyAgApxbyHuKgaPPzXS0ovweU=",
            "dev": true
        },
        "node_modules/xml2js": {
            "version": "0.4.23",
            "resolved": "https://registry.npmjs.org/xml2js/-/xml2js-0.4.23.tgz",
            "integrity": "sha512-ySPiMjM0+pLDftHgXY4By0uswI3SPKLDw/i3UXbnO8M/p28zqexCUoPmQFrYD+/1BzhGJSs2i1ERWKJAtiLrug==",
            "dependencies": {
                "sax": ">=0.6.0",
                "xmlbuilder": "~11.0.0"
            },
            "engines": {
                "node": ">=4.0.0"
            }
        },
        "node_modules/xmlbuilder": {
            "version": "11.0.1",
            "resolved": "https://registry.npmjs.org/xmlbuilder/-/xmlbuilder-11.0.1.tgz",
            "integrity": "sha512-fDlsI/kFEx7gLvbecc0/ohLG50fugQp8ryHzMTuW9vSa1GJ0XYWKnhsUx7oie3G98+r56aTQIUB4kht42R3JvA==",
            "engines": {
                "node": ">=4.0"
            }
        },
        "node_modules/xmldom": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/xmldom/-/xmldom-0.3.0.tgz",
            "integrity": "sha512-z9s6k3wxE+aZHgXYxSTpGDo7BYOUfJsIRyoZiX6HTjwpwfS2wpQBQKa2fD+ShLyPkqDYo5ud7KitmLZ2Cd6r0g==",
            "engines": {
                "node": ">=10.0.0"
            }
        },
        "node_modules/xpath.js": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/xpath.js/-/xpath.js-1.1.0.tgz",
            "integrity": "sha512-jg+qkfS4K8E7965sqaUl8mRngXiKb3WZGfONgE18pr03FUQiuSV6G+Ej4tS55B+rIQSFEIw3phdVAQ4pPqNWfQ==",
            "engines": {
                "node": ">=0.4.0"
            }
        },
        "node_modules/xtend": {
            "version": "4.0.2",
            "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
            "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==",
            "engines": {
                "node": ">=0.4"
            }
        },
        "node_modules/y18n": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
            "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
        },
        "node_modules/yallist": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
            "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="
        },
        "node_modules/yargs": {
            "version": "13.3.2",
            "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.2.tgz",
            "integrity": "sha512-AX3Zw5iPruN5ie6xGRIDgqkT+ZhnRlZMLMHAs8tg7nRruy2Nb+i5o9bwghAogtM08q1dpr2LVoS8KSTMYpWXUw==",
            "dev": true,
            "dependencies": {
                "cliui": "^5.0.0",
                "find-up": "^3.0.0",
                "get-caller-file": "^2.0.1",
                "require-directory": "^2.1.1",
                "require-main-filename": "^2.0.0",
                "set-blocking": "^2.0.0",
                "string-width": "^3.0.0",
                "which-module": "^2.0.0",
                "y18n": "^4.0.0",
                "yargs-parser": "^13.1.2"
            }
        },
        "node_modules/yargs-parser": {
            "version": "13.1.2",
            "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-13.1.2.tgz",
            "integrity": "sha512-3lbsNRf/j+A4QuSZfDRA7HRSfWrzO0YjqTJd5kjAq37Zep1CEgaYmrH9Q3GwPiB9cHyd1Y1UwggGhJGoxipbzg==",
            "dev": true,
            "dependencies": {
                "camelcase": "^5.0.0",
                "decamelize": "^1.2.0"
            }
        },
        "node_modules/yargs-unparser": {
            "version": "1.6.0",
            "resolved": "https://registry.npmjs.org/yargs-unparser/-/yargs-unparser-1.6.0.tgz",
            "integrity": "sha512-W9tKgmSn0DpSatfri0nx52Joq5hVXgeLiqR/5G0sZNDoLZFOr/xjBUDcShCOGNsBnEMNo1KAMBkTej1Hm62HTw==",
            "dev": true,
            "dependencies": {
                "flat": "^4.1.0",
                "lodash": "^4.17.15",
                "yargs": "^13.3.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/yargs/node_modules/ansi-regex": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
            "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
            "dev": true,
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/yargs/node_modules/string-width": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
            "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
            "dev": true,
            "dependencies": {
                "emoji-regex": "^7.0.1",
                "is-fullwidth-code-point": "^2.0.0",
                "strip-ansi": "^5.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/yargs/node_modules/strip-ansi": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
            "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
            "dev": true,
            "dependencies": {
                "ansi-regex": "^4.1.0"
            },
            "engines": {
                "node": ">=6"
            }
        },
        "node_modules/yn": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/yn/-/yn-2.0.0.tgz",
            "integrity": "sha1-5a2ryKz0CPY4X8dklWhMiOavaJo=",
            "dev": true,
            "engines": {
                "node": ">=4"
            }
        },
        "node_modules/zip-stream": {
            "version": "2.1.3",
            "resolved": "https://registry.npmjs.org/zip-stream/-/zip-stream-2.1.3.tgz",
            "integrity": "sha512-EkXc2JGcKhO5N5aZ7TmuNo45budRaFGHOmz24wtJR7znbNqDPmdZtUauKX6et8KAVseAMBOyWJqEpXcHTBsh7Q==",
            "dependencies": {
                "archiver-utils": "^2.1.0",
                "compress-commons": "^2.1.1",
                "readable-stream": "^3.4.0"
            },
            "engines": {
                "node": ">= 6"
            }
        }
    },
    "dependencies": {
        "@azure/abort-controller": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/@azure/abort-controller/-/abort-controller-1.0.2.tgz",
            "integrity": "sha512-XUyTo+bcyxHEf+jlN2MXA7YU9nxVehaubngHV1MIZZaqYmZqykkoeAz/JMMEeR7t3TcyDwbFa3Zw8BZywmIx4g==",
            "requires": {
                "tslib": "^2.0.0"
            },
            "dependencies": {
                "tslib": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.1.0.tgz",
                    "integrity": "sha512-hcVC3wYEziELGGmEEXue7D75zbwIIVUMWAVbHItGPx0ziyXxrOMQx4rQEVEV45Ut/1IotuEvwqPopzIOkDMf0A=="
                }
            }
        },
        "@azure/arm-subscriptions": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/@azure/arm-subscriptions/-/arm-subscriptions-2.0.0.tgz",
            "integrity": "sha512-+ys2glK5YgwZ9KhwWblfAQIPABtiB5OdKEpPOpcvr7B5ygYTwZuSUNObX9MRu/MyiRo1zDlUvlxHltBphq/bLQ==",
            "requires": {
                "@azure/ms-rest-azure-js": "^2.0.1",
                "@azure/ms-rest-js": "^2.0.4",
                "tslib": "^1.10.0"
            }
        },
        "@azure/core-auth": {
            "version": "1.1.4",
            "resolved": "https://registry.npmjs.org/@azure/core-auth/-/core-auth-1.1.4.tgz",
            "integrity": "sha512-+j1embyH1jqf04AIfJPdLafd5SC1y6z1Jz4i+USR1XkTp6KM8P5u4/AjmWMVoEQdM/M29PJcRDZcCEWjK9S1bw==",
            "requires": {
                "@azure/abort-controller": "^1.0.0",
                "tslib": "^2.0.0"
            },
            "dependencies": {
                "tslib": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.1.0.tgz",
                    "integrity": "sha512-hcVC3wYEziELGGmEEXue7D75zbwIIVUMWAVbHItGPx0ziyXxrOMQx4rQEVEV45Ut/1IotuEvwqPopzIOkDMf0A=="
                }
            }
        },
        "@azure/ms-rest-azure-env": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-azure-env/-/ms-rest-azure-env-2.0.0.tgz",
            "integrity": "sha512-dG76W7ElfLi+fbTjnZVGj+M9e0BIEJmRxU6fHaUQ12bZBe8EJKYb2GV50YWNaP2uJiVQ5+7nXEVj1VN1UQtaEw=="
        },
        "@azure/ms-rest-azure-js": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-azure-js/-/ms-rest-azure-js-2.0.1.tgz",
            "integrity": "sha512-5e+A710O7gRFISoV4KI/ZyLQbKmjXxQZ1L8Z/sx7jSUQqmswjTnN4yyIZxs5JzfLVkobU0rXxbi5/LVzaI8QXQ==",
            "requires": {
                "@azure/ms-rest-js": "^2.0.4",
                "tslib": "^1.10.0"
            }
        },
        "@azure/ms-rest-js": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-js/-/ms-rest-js-2.2.1.tgz",
            "integrity": "sha512-vd8SIsoC27u8gpxatDQQ1Z5+wcnkAVhOUxA2VXRDse/zKRN0RuYoj7jTRIiJlNEOyUX4a+oGFplSZNQEsLZVbg==",
            "requires": {
                "@azure/core-auth": "^1.1.4",
                "@types/node-fetch": "^2.3.7",
                "@types/tunnel": "0.0.1",
                "abort-controller": "^3.0.0",
                "form-data": "^2.5.0",
                "node-fetch": "^2.6.0",
                "tough-cookie": "^3.0.1",
                "tslib": "^1.10.0",
                "tunnel": "0.0.6",
                "uuid": "^3.3.2",
                "xml2js": "^0.4.19"
            },
            "dependencies": {
                "form-data": {
                    "version": "2.5.1",
                    "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.5.1.tgz",
                    "integrity": "sha512-m21N3WOmEEURgk6B9GLOE4RuWOFf28Lhh9qGYeNlGq4VDXUlJy2th2slBNU8Gp8EzloYZOibZJ7t5ecIrFSjVA==",
                    "requires": {
                        "asynckit": "^0.4.0",
                        "combined-stream": "^1.0.6",
                        "mime-types": "^2.1.12"
                    }
                },
                "tough-cookie": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-3.0.1.tgz",
                    "integrity": "sha512-yQyJ0u4pZsv9D4clxO69OEjLWYw+jbgspjTue4lTQZLfV0c5l1VmK2y1JK8E9ahdpltPOaAThPcp5nKPUgSnsg==",
                    "requires": {
                        "ip-regex": "^2.1.0",
                        "psl": "^1.1.28",
                        "punycode": "^2.1.1"
                    }
                }
            }
        },
        "@azure/ms-rest-nodeauth": {
            "version": "3.0.5",
            "resolved": "https://registry.npmjs.org/@azure/ms-rest-nodeauth/-/ms-rest-nodeauth-3.0.5.tgz",
            "integrity": "sha512-GoP9tn4rFNHJqE00+ARtHmPKufC3h4j7xEuyveOueUrguLT/Q0c5aEPgS9bmXWiHGoreRn2hVGGwd3m8oDdV3g==",
            "requires": {
                "@azure/ms-rest-azure-env": "^2.0.0",
                "@azure/ms-rest-js": "^2.0.4",
                "adal-node": "^0.1.28"
            }
        },
        "@babel/code-frame": {
            "version": "7.8.3",
            "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.8.3.tgz",
            "integrity": "sha512-a9gxpmdXtZEInkCSHUJDLHZVBgb1QS0jhss4cPP93EW7s+uC5bikET2twEF3KV+7rDblJcmNvTR7VJejqd2C2g==",
            "dev": true,
            "requires": {
                "@babel/highlight": "^7.8.3"
            }
        },
        "@babel/helper-validator-identifier": {
            "version": "7.9.0",
            "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.9.0.tgz",
            "integrity": "sha512-6G8bQKjOh+of4PV/ThDm/rRqlU7+IGoJuofpagU5GlEl29Vv0RGqqt86ZGRV8ZuSOY3o+8yXl5y782SMcG7SHw==",
            "dev": true
        },
        "@babel/highlight": {
            "version": "7.9.0",
            "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.9.0.tgz",
            "integrity": "sha512-lJZPilxX7Op3Nv/2cvFdnlepPXDxi29wxteT57Q965oc5R9v86ztx0jfxVrTcBk8C2kcPkkDa2Z4T3ZsPPVWsQ==",
            "dev": true,
            "requires": {
                "@babel/helper-validator-identifier": "^7.9.0",
                "chalk": "^2.0.0",
                "js-tokens": "^4.0.0"
            }
        },
        "@eslint/eslintrc": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-0.3.0.tgz",
            "integrity": "sha512-1JTKgrOKAHVivSvOYw+sJOunkBjUOvjqWk1DPja7ZFhIS2mX/4EgTT8M7eTK9jrKhL/FvXXEbQwIs3pg1xp3dg==",
            "dev": true,
            "requires": {
                "ajv": "^6.12.4",
                "debug": "^4.1.1",
                "espree": "^7.3.0",
                "globals": "^12.1.0",
                "ignore": "^4.0.6",
                "import-fresh": "^3.2.1",
                "js-yaml": "^3.13.1",
                "lodash": "^4.17.20",
                "minimatch": "^3.0.4",
                "strip-json-comments": "^3.1.1"
            },
            "dependencies": {
                "ajv": {
                    "version": "6.12.6",
                    "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
                    "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
                    "dev": true,
                    "requires": {
                        "fast-deep-equal": "^3.1.1",
                        "fast-json-stable-stringify": "^2.0.0",
                        "json-schema-traverse": "^0.4.1",
                        "uri-js": "^4.2.2"
                    }
                },
                "debug": {
                    "version": "4.3.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
                    "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
                    "dev": true,
                    "requires": {
                        "ms": "2.1.2"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                },
                "strip-json-comments": {
                    "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
                    "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
                    "dev": true
                }
            }
        },
        "@nodelib/fs.scandir": {
            "version": "2.1.4",
            "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.4.tgz",
            "integrity": "sha512-33g3pMJk3bg5nXbL/+CY6I2eJDzZAni49PfJnL5fghPTggPvBd/pFNSgJsdAgWptuFu7qq/ERvOYFlhvsLTCKA==",
            "dev": true,
            "requires": {
                "@nodelib/fs.stat": "2.0.4",
                "run-parallel": "^1.1.9"
            }
        },
        "@nodelib/fs.stat": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.4.tgz",
            "integrity": "sha512-IYlHJA0clt2+Vg7bccq+TzRdJvv19c2INqBSsoOLp1je7xjtr7J26+WXR72MCdvU9q1qTzIWDfhMf+DRvQJK4Q==",
            "dev": true
        },
        "@nodelib/fs.walk": {
            "version": "1.2.6",
            "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.6.tgz",
            "integrity": "sha512-8Broas6vTtW4GIXTAHDoE32hnN2M5ykgCpWGbuXHQ15vEMqr23pB76e/GZcYsZCHALv50ktd24qhEyKr6wBtow==",
            "dev": true,
            "requires": {
                "@nodelib/fs.scandir": "2.1.4",
                "fastq": "^1.6.0"
            }
        },
        "@types/anymatch": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/@types/anymatch/-/anymatch-1.3.1.tgz",
            "integrity": "sha512-/+CRPXpBDpo2RK9C68N3b2cOvO0Cf5B9aPijHsoDQTHivnGSObdOF2BRQOYjojWTDy6nQvMjmqRXIxH55VjxxA=="
        },
        "@types/events": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/@types/events/-/events-3.0.0.tgz",
            "integrity": "sha512-EaObqwIvayI5a8dCzhFrjKzVwKLxjoG9T6Ppd5CEo07LRKfQ8Yokw54r5+Wq7FaBQ+yXRvQAYPrHwya1/UFt9g=="
        },
        "@types/fs-extra": {
            "version": "8.1.0",
            "resolved": "https://registry.npmjs.org/@types/fs-extra/-/fs-extra-8.1.0.tgz",
            "integrity": "sha512-UoOfVEzAUpeSPmjm7h1uk5MH6KZma2z2O7a75onTGjnNvAvMVrPzPL/vBbT65iIGHWj6rokwfmYcmxmlSf2uwg==",
            "dev": true,
            "requires": {
                "@types/node": "*"
            }
        },
        "@types/glob": {
            "version": "7.1.1",
            "resolved": "https://registry.npmjs.org/@types/glob/-/glob-7.1.1.tgz",
            "integrity": "sha512-1Bh06cbWJUHMC97acuD6UMG29nMt0Aqz1vF3guLfG+kHHJhy3AyohZFFxYk2f7Q1SQIrNwvncxAE0N/9s70F2w==",
            "requires": {
                "@types/events": "*",
                "@types/minimatch": "*",
                "@types/node": "*"
            },
            "dependencies": {
                "@types/node": {
                    "version": "12.12.31",
                    "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.31.tgz",
                    "integrity": "sha512-T+wnJno8uh27G9c+1T+a1/WYCHzLeDqtsGJkoEdSp2X8RTh3oOCZQcUnjAx90CS8cmmADX51O0FI/tu9s0yssg=="
                }
            }
        },
        "@types/json-schema": {
            "version": "7.0.7",
            "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.7.tgz",
            "integrity": "sha512-cxWFQVseBm6O9Gbw1IWb8r6OS4OhSt3hPZLkFApLjM8TEXROBuQGLAH2i2gZpcXdLBIrpXuTDhH7Vbm1iXmNGA==",
            "dev": true
        },
        "@types/json5": {
            "version": "0.0.29",
            "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
            "integrity": "sha1-7ihweulOEdK4J7y+UnC86n8+ce4=",
            "dev": true
        },
        "@types/minimatch": {
            "version": "3.0.3",
            "resolved": "https://registry.npmjs.org/@types/minimatch/-/minimatch-3.0.3.tgz",
            "integrity": "sha512-tHq6qdbT9U1IRSGf14CL0pUlULksvY9OZ+5eEgl1N7t+OA3tGvNpxJCzuKQlsNgCVwbAs670L1vcVQi8j9HjnA=="
        },
        "@types/mocha": {
            "version": "7.0.2",
            "resolved": "https://registry.npmjs.org/@types/mocha/-/mocha-7.0.2.tgz",
            "integrity": "sha512-ZvO2tAcjmMi8V/5Z3JsyofMe3hasRcaw88cto5etSVMwVQfeivGAlEYmaQgceUSVYFofVjT+ioHsATjdWcFt1w==",
            "dev": true
        },
        "@types/node": {
            "version": "12.12.39",
            "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.39.tgz",
            "integrity": "sha512-pADGfwnDkr6zagDwEiCVE4yQrv7XDkoeVa4OfA9Ju/zRTk6YNDLGtQbkdL4/56mCQQCs4AhNrBIag6jrp7ZuOg=="
        },
        "@types/node-fetch": {
            "version": "2.5.8",
            "resolved": "https://registry.npmjs.org/@types/node-fetch/-/node-fetch-2.5.8.tgz",
            "integrity": "sha512-fbjI6ja0N5ZA8TV53RUqzsKNkl9fv8Oj3T7zxW7FGv1GSH7gwJaNF8dzCjrqKaxKeUpTz4yT1DaJFq/omNpGfw==",
            "requires": {
                "@types/node": "*",
                "form-data": "^3.0.0"
            },
            "dependencies": {
                "form-data": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/form-data/-/form-data-3.0.0.tgz",
                    "integrity": "sha512-CKMFDglpbMi6PyN+brwB9Q/GOw0eAnsrEZDgcsH5Krhz5Od/haKHAX0NmQfha2zPPz0JpWzA7GJHGSnvCRLWsg==",
                    "requires": {
                        "asynckit": "^0.4.0",
                        "combined-stream": "^1.0.8",
                        "mime-types": "^2.1.12"
                    }
                }
            }
        },
        "@types/source-list-map": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/@types/source-list-map/-/source-list-map-0.1.2.tgz",
            "integrity": "sha512-K5K+yml8LTo9bWJI/rECfIPrGgxdpeNbj+d53lwN4QjW1MCwlkhUms+gtdzigTeUyBr09+u8BwOIY3MXvHdcsA=="
        },
        "@types/tapable": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/@types/tapable/-/tapable-1.0.5.tgz",
            "integrity": "sha512-/gG2M/Imw7cQFp8PGvz/SwocNrmKFjFsm5Pb8HdbHkZ1K8pmuPzOX4VeVoiEecFCVf4CsN1r3/BRvx+6sNqwtQ=="
        },
        "@types/terser-webpack-plugin": {
            "version": "1.2.1",
            "resolved": "https://registry.npmjs.org/@types/terser-webpack-plugin/-/terser-webpack-plugin-1.2.1.tgz",
            "integrity": "sha512-5mzQulZabFsqiLh0PhJdccIKqpd5535UYpZ+Skugz8kPzZdajMMYBRKQSzM1KOkZ42NwLxbZSzQp6xKtaq46Gg==",
            "dev": true,
            "requires": {
                "@types/webpack": "*",
                "terser": "^3.16.1"
            },
            "dependencies": {
                "terser": {
                    "version": "3.17.0",
                    "resolved": "https://registry.npmjs.org/terser/-/terser-3.17.0.tgz",
                    "integrity": "sha512-/FQzzPJmCpjAH9Xvk2paiWrFq+5M6aVOf+2KRbwhByISDX/EujxsK+BAvrhb6H+2rtrLCHK9N01wO014vrIwVQ==",
                    "dev": true,
                    "requires": {
                        "commander": "^2.19.0",
                        "source-map": "~0.6.1",
                        "source-map-support": "~0.5.10"
                    }
                }
            }
        },
        "@types/tunnel": {
            "version": "0.0.1",
            "resolved": "https://registry.npmjs.org/@types/tunnel/-/tunnel-0.0.1.tgz",
            "integrity": "sha512-AOqu6bQu5MSWwYvehMXLukFHnupHrpZ8nvgae5Ggie9UwzDR1CCwoXgSSWNZJuyOlCdfdsWMA5F2LlmvyoTv8A==",
            "requires": {
                "@types/node": "*"
            }
        },
        "@types/uglify-js": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/@types/uglify-js/-/uglify-js-3.0.4.tgz",
            "integrity": "sha512-SudIN9TRJ+v8g5pTG8RRCqfqTMNqgWCKKd3vtynhGzkIIjxaicNAMuY5TRadJ6tzDu3Dotf3ngaMILtmOdmWEQ==",
            "requires": {
                "source-map": "^0.6.1"
            }
        },
        "@types/vscode": {
            "version": "1.48.0",
            "resolved": "https://registry.npmjs.org/@types/vscode/-/vscode-1.48.0.tgz",
            "integrity": "sha512-sZJKzsJz1gSoFXcOJWw3fnKl2sseUgZmvB4AJZS+Fea+bC/jfGPVhmFL/FfQHld/TKtukVONsmoD3Pkyx9iadg==",
            "dev": true
        },
        "@types/webpack": {
            "version": "4.41.8",
            "resolved": "https://registry.npmjs.org/@types/webpack/-/webpack-4.41.8.tgz",
            "integrity": "sha512-mh4litLHTlDG84TGCFv1pZldndI34vkrW9Mks++Zx4KET7DRMoCXUvLbTISiuF4++fMgNnhV9cc1nCXJQyBYbQ==",
            "requires": {
                "@types/anymatch": "*",
                "@types/node": "*",
                "@types/tapable": "*",
                "@types/uglify-js": "*",
                "@types/webpack-sources": "*",
                "source-map": "^0.6.0"
            },
            "dependencies": {
                "@types/node": {
                    "version": "12.12.31",
                    "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.31.tgz",
                    "integrity": "sha512-T+wnJno8uh27G9c+1T+a1/WYCHzLeDqtsGJkoEdSp2X8RTh3oOCZQcUnjAx90CS8cmmADX51O0FI/tu9s0yssg=="
                }
            }
        },
        "@types/webpack-sources": {
            "version": "0.1.7",
            "resolved": "https://registry.npmjs.org/@types/webpack-sources/-/webpack-sources-0.1.7.tgz",
            "integrity": "sha512-XyaHrJILjK1VHVC4aVlKsdNN5KBTwufMb43cQs+flGxtPAf/1Qwl8+Q0tp5BwEGaI8D6XT1L+9bSWXckgkjTLw==",
            "requires": {
                "@types/node": "*",
                "@types/source-list-map": "*",
                "source-map": "^0.6.1"
            },
            "dependencies": {
                "@types/node": {
                    "version": "12.12.31",
                    "resolved": "https://registry.npmjs.org/@types/node/-/node-12.12.31.tgz",
                    "integrity": "sha512-T+wnJno8uh27G9c+1T+a1/WYCHzLeDqtsGJkoEdSp2X8RTh3oOCZQcUnjAx90CS8cmmADX51O0FI/tu9s0yssg=="
                }
            }
        },
        "@typescript-eslint/eslint-plugin": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-4.15.0.tgz",
            "integrity": "sha512-DJgdGZW+8CFUTz5C/dnn4ONcUm2h2T0itWD85Ob5/V27Ndie8hUoX5HKyGssvR8sUMkAIlUc/AMK67Lqa3kBIQ==",
            "dev": true,
            "requires": {
                "@typescript-eslint/experimental-utils": "4.15.0",
                "@typescript-eslint/scope-manager": "4.15.0",
                "debug": "^4.1.1",
                "functional-red-black-tree": "^1.0.1",
                "lodash": "^4.17.15",
                "regexpp": "^3.0.0",
                "semver": "^7.3.2",
                "tsutils": "^3.17.1"
            },
            "dependencies": {
                "debug": {
                    "version": "4.3.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
                    "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
                    "dev": true,
                    "requires": {
                        "ms": "2.1.2"
                    }
                },
                "lru-cache": {
                    "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
                    "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
                    "dev": true,
                    "requires": {
                        "yallist": "^4.0.0"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                },
                "semver": {
                    "version": "7.3.4",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.4.tgz",
                    "integrity": "sha512-tCfb2WLjqFAtXn4KEdxIhalnRtoKFN7nAwj0B3ZXCbQloV2tq5eDbcTmT68JJD3nRJq24/XgxtQKFIpQdtvmVw==",
                    "dev": true,
                    "requires": {
                        "lru-cache": "^6.0.0"
                    }
                },
                "tsutils": {
                    "version": "3.20.0",
                    "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-3.20.0.tgz",
                    "integrity": "sha512-RYbuQuvkhuqVeXweWT3tJLKOEJ/UUw9GjNEZGWdrLLlM+611o1gwLHBpxoFJKKl25fLprp2eVthtKs5JOrNeXg==",
                    "dev": true,
                    "requires": {
                        "tslib": "^1.8.1"
                    }
                },
                "yallist": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
                    "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
                    "dev": true
                }
            }
        },
        "@typescript-eslint/experimental-utils": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/experimental-utils/-/experimental-utils-4.15.0.tgz",
            "integrity": "sha512-V4vaDWvxA2zgesg4KPgEGiomWEBpJXvY4ZX34Y3qxK8LUm5I87L+qGIOTd9tHZOARXNRt9pLbblSKiYBlGMawg==",
            "dev": true,
            "requires": {
                "@types/json-schema": "^7.0.3",
                "@typescript-eslint/scope-manager": "4.15.0",
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/typescript-estree": "4.15.0",
                "eslint-scope": "^5.0.0",
                "eslint-utils": "^2.0.0"
            },
            "dependencies": {
                "eslint-scope": {
                    "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.1.1.tgz",
                    "integrity": "sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==",
                    "dev": true,
                    "requires": {
                        "esrecurse": "^4.3.0",
                        "estraverse": "^4.1.1"
                    }
                }
            }
        },
        "@typescript-eslint/parser": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-4.15.0.tgz",
            "integrity": "sha512-L6Dtbq8Bc7g2aZwnIBETpmUa9XDKCMzKVwAArnGp5Mn7PRNFjf3mUzq8UeBjL3K8t311hvevnyqXAMSmxO8Gpg==",
            "dev": true,
            "requires": {
                "@typescript-eslint/scope-manager": "4.15.0",
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/typescript-estree": "4.15.0",
                "debug": "^4.1.1"
            },
            "dependencies": {
                "debug": {
                    "version": "4.3.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
                    "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
                    "dev": true,
                    "requires": {
                        "ms": "2.1.2"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                }
            }
        },
        "@typescript-eslint/scope-manager": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-4.15.0.tgz",
            "integrity": "sha512-CSNBZnCC2jEA/a+pR9Ljh8Y+5TY5qgbPz7ICEk9WCpSEgT6Pi7H2RIjxfrrbUXvotd6ta+i27sssKEH8Azm75g==",
            "dev": true,
            "requires": {
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/visitor-keys": "4.15.0"
            }
        },
        "@typescript-eslint/types": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-4.15.0.tgz",
            "integrity": "sha512-su4RHkJhS+iFwyqyXHcS8EGPlUVoC+XREfy5daivjLur9JP8GhvTmDipuRpcujtGC4M+GYhUOJCPDE3rC5NJrg==",
            "dev": true
        },
        "@typescript-eslint/typescript-estree": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-4.15.0.tgz",
            "integrity": "sha512-jG6xTmcNbi6xzZq0SdWh7wQ9cMb2pqXaUp6bUZOMsIlu5aOlxGxgE/t6L/gPybybQGvdguajXGkZKSndZJpksA==",
            "dev": true,
            "requires": {
                "@typescript-eslint/types": "4.15.0",
                "@typescript-eslint/visitor-keys": "4.15.0",
                "debug": "^4.1.1",
                "globby": "^11.0.1",
                "is-glob": "^4.0.1",
                "semver": "^7.3.2",
                "tsutils": "^3.17.1"
            },
            "dependencies": {
                "array-union": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/array-union/-/array-union-2.1.0.tgz",
                    "integrity": "sha512-HGyxoOTYUyCM6stUe6EJgnd4EoewAI7zMdfqO+kGjnlZmBDz/cR5pf8r/cR4Wq60sL/p0IkcjUEEPwS3GFrIyw==",
                    "dev": true
                },
                "debug": {
                    "version": "4.3.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
                    "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
                    "dev": true,
                    "requires": {
                        "ms": "2.1.2"
                    }
                },
                "globby": {
                    "version": "11.0.2",
                    "resolved": "https://registry.npmjs.org/globby/-/globby-11.0.2.tgz",
                    "integrity": "sha512-2ZThXDvvV8fYFRVIxnrMQBipZQDr7MxKAmQK1vujaj9/7eF0efG7BPUKJ7jP7G5SLF37xKDXvO4S/KKLj/Z0og==",
                    "dev": true,
                    "requires": {
                        "array-union": "^2.1.0",
                        "dir-glob": "^3.0.1",
                        "fast-glob": "^3.1.1",
                        "ignore": "^5.1.4",
                        "merge2": "^1.3.0",
                        "slash": "^3.0.0"
                    }
                },
                "ignore": {
                    "version": "5.1.8",
                    "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.1.8.tgz",
                    "integrity": "sha512-BMpfD7PpiETpBl/A6S498BaIJ6Y/ABT93ETbby2fP00v4EbvPBXWEoaR1UBPKs3iR53pJY7EtZk5KACI57i1Uw==",
                    "dev": true
                },
                "is-extglob": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "dev": true
                },
                "is-glob": {
                    "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "dev": true,
                    "requires": {
                        "is-extglob": "^2.1.1"
                    }
                },
                "lru-cache": {
                    "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
                    "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
                    "dev": true,
                    "requires": {
                        "yallist": "^4.0.0"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                },
                "semver": {
                    "version": "7.3.4",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.4.tgz",
                    "integrity": "sha512-tCfb2WLjqFAtXn4KEdxIhalnRtoKFN7nAwj0B3ZXCbQloV2tq5eDbcTmT68JJD3nRJq24/XgxtQKFIpQdtvmVw==",
                    "dev": true,
                    "requires": {
                        "lru-cache": "^6.0.0"
                    }
                },
                "tsutils": {
                    "version": "3.20.0",
                    "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-3.20.0.tgz",
                    "integrity": "sha512-RYbuQuvkhuqVeXweWT3tJLKOEJ/UUw9GjNEZGWdrLLlM+611o1gwLHBpxoFJKKl25fLprp2eVthtKs5JOrNeXg==",
                    "dev": true,
                    "requires": {
                        "tslib": "^1.8.1"
                    }
                },
                "yallist": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
                    "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
                    "dev": true
                }
            }
        },
        "@typescript-eslint/visitor-keys": {
            "version": "4.15.0",
            "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-4.15.0.tgz",
            "integrity": "sha512-RnDtJwOwFucWFAMjG3ghCG/ikImFJFEg20DI7mn4pHEx3vC48lIAoyjhffvfHmErRDboUPC7p9Z2il4CLb7qxA==",
            "dev": true,
            "requires": {
                "@typescript-eslint/types": "4.15.0",
                "eslint-visitor-keys": "^2.0.0"
            }
        },
        "@webassemblyjs/ast": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.7.11.tgz",
            "integrity": "sha512-ZEzy4vjvTzScC+SH8RBssQUawpaInUdMTYwYYLh54/s8TuT0gBLuyUnppKsVyZEi876VmmStKsUs28UxPgdvrA==",
            "requires": {
                "@webassemblyjs/helper-module-context": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/wast-parser": "1.7.11"
            }
        },
        "@webassemblyjs/floating-point-hex-parser": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.7.11.tgz",
            "integrity": "sha512-zY8dSNyYcgzNRNT666/zOoAyImshm3ycKdoLsyDw/Bwo6+/uktb7p4xyApuef1dwEBo/U/SYQzbGBvV+nru2Xg=="
        },
        "@webassemblyjs/helper-api-error": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.7.11.tgz",
            "integrity": "sha512-7r1qXLmiglC+wPNkGuXCvkmalyEstKVwcueZRP2GNC2PAvxbLYwLLPr14rcdJaE4UtHxQKfFkuDFuv91ipqvXg=="
        },
        "@webassemblyjs/helper-buffer": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.7.11.tgz",
            "integrity": "sha512-MynuervdylPPh3ix+mKZloTcL06P8tenNH3sx6s0qE8SLR6DdwnfgA7Hc9NSYeob2jrW5Vql6GVlsQzKQCa13w=="
        },
        "@webassemblyjs/helper-code-frame": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.7.11.tgz",
            "integrity": "sha512-T8ESC9KMXFTXA5urJcyor5cn6qWeZ4/zLPyWeEXZ03hj/x9weSokGNkVCdnhSabKGYWxElSdgJ+sFa9G/RdHNw==",
            "requires": {
                "@webassemblyjs/wast-printer": "1.7.11"
            }
        },
        "@webassemblyjs/helper-fsm": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.7.11.tgz",
            "integrity": "sha512-nsAQWNP1+8Z6tkzdYlXT0kxfa2Z1tRTARd8wYnc/e3Zv3VydVVnaeePgqUzFrpkGUyhUUxOl5ML7f1NuT+gC0A=="
        },
        "@webassemblyjs/helper-module-context": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.7.11.tgz",
            "integrity": "sha512-JxfD5DX8Ygq4PvXDucq0M+sbUFA7BJAv/GGl9ITovqE+idGX+J3QSzJYz+LwQmL7fC3Rs+utvWoJxDb6pmC0qg=="
        },
        "@webassemblyjs/helper-wasm-bytecode": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.7.11.tgz",
            "integrity": "sha512-cMXeVS9rhoXsI9LLL4tJxBgVD/KMOKXuFqYb5oCJ/opScWpkCMEz9EJtkonaNcnLv2R3K5jIeS4TRj/drde1JQ=="
        },
        "@webassemblyjs/helper-wasm-section": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.7.11.tgz",
            "integrity": "sha512-8ZRY5iZbZdtNFE5UFunB8mmBEAbSI3guwbrsCl4fWdfRiAcvqQpeqd5KHhSWLL5wuxo53zcaGZDBU64qgn4I4Q==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-buffer": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/wasm-gen": "1.7.11"
            }
        },
        "@webassemblyjs/ieee754": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.7.11.tgz",
            "integrity": "sha512-Mmqx/cS68K1tSrvRLtaV/Lp3NZWzXtOHUW2IvDvl2sihAwJh4ACE0eL6A8FvMyDG9abes3saB6dMimLOs+HMoQ==",
            "requires": {
                "@xtuc/ieee754": "^1.2.0"
            }
        },
        "@webassemblyjs/leb128": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.7.11.tgz",
            "integrity": "sha512-vuGmgZjjp3zjcerQg+JA+tGOncOnJLWVkt8Aze5eWQLwTQGNgVLcyOTqgSCxWTR4J42ijHbBxnuRaL1Rv7XMdw==",
            "requires": {
                "@xtuc/long": "4.2.1"
            }
        },
        "@webassemblyjs/utf8": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.7.11.tgz",
            "integrity": "sha512-C6GFkc7aErQIAH+BMrIdVSmW+6HSe20wg57HEC1uqJP8E/xpMjXqQUxkQw07MhNDSDcGpxI9G5JSNOQCqJk4sA=="
        },
        "@webassemblyjs/wasm-edit": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.7.11.tgz",
            "integrity": "sha512-FUd97guNGsCZQgeTPKdgxJhBXkUbMTY6hFPf2Y4OedXd48H97J+sOY2Ltaq6WGVpIH8o/TGOVNiVz/SbpEMJGg==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-buffer": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/helper-wasm-section": "1.7.11",
                "@webassemblyjs/wasm-gen": "1.7.11",
                "@webassemblyjs/wasm-opt": "1.7.11",
                "@webassemblyjs/wasm-parser": "1.7.11",
                "@webassemblyjs/wast-printer": "1.7.11"
            }
        },
        "@webassemblyjs/wasm-gen": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.7.11.tgz",
            "integrity": "sha512-U/KDYp7fgAZX5KPfq4NOupK/BmhDc5Kjy2GIqstMhvvdJRcER/kUsMThpWeRP8BMn4LXaKhSTggIJPOeYHwISA==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/ieee754": "1.7.11",
                "@webassemblyjs/leb128": "1.7.11",
                "@webassemblyjs/utf8": "1.7.11"
            }
        },
        "@webassemblyjs/wasm-opt": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.7.11.tgz",
            "integrity": "sha512-XynkOwQyiRidh0GLua7SkeHvAPXQV/RxsUeERILmAInZegApOUAIJfRuPYe2F7RcjOC9tW3Cb9juPvAC/sCqvg==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-buffer": "1.7.11",
                "@webassemblyjs/wasm-gen": "1.7.11",
                "@webassemblyjs/wasm-parser": "1.7.11"
            }
        },
        "@webassemblyjs/wasm-parser": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.7.11.tgz",
            "integrity": "sha512-6lmXRTrrZjYD8Ng8xRyvyXQJYUQKYSXhJqXOBLw24rdiXsHAOlvw5PhesjdcaMadU/pyPQOJ5dHreMjBxwnQKg==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-api-error": "1.7.11",
                "@webassemblyjs/helper-wasm-bytecode": "1.7.11",
                "@webassemblyjs/ieee754": "1.7.11",
                "@webassemblyjs/leb128": "1.7.11",
                "@webassemblyjs/utf8": "1.7.11"
            }
        },
        "@webassemblyjs/wast-parser": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.7.11.tgz",
            "integrity": "sha512-lEyVCg2np15tS+dm7+JJTNhNWq9yTZvi3qEhAIIOaofcYlUp0UR5/tVqOwa/gXYr3gjwSZqw+/lS9dscyLelbQ==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/floating-point-hex-parser": "1.7.11",
                "@webassemblyjs/helper-api-error": "1.7.11",
                "@webassemblyjs/helper-code-frame": "1.7.11",
                "@webassemblyjs/helper-fsm": "1.7.11",
                "@xtuc/long": "4.2.1"
            }
        },
        "@webassemblyjs/wast-printer": {
            "version": "1.7.11",
            "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.7.11.tgz",
            "integrity": "sha512-m5vkAsuJ32QpkdkDOUPGSltrg8Cuk3KBx4YrmAGQwCZPRdUHXxG4phIOuuycLemHFr74sWL9Wthqss4fzdzSwg==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/wast-parser": "1.7.11",
                "@xtuc/long": "4.2.1"
            }
        },
        "@xtuc/ieee754": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
            "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA=="
        },
        "@xtuc/long": {
            "version": "4.2.1",
            "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.1.tgz",
            "integrity": "sha512-FZdkNBDqBRHKQ2MEbSC17xnPFOhZxeJ2YGSfr2BKf3sujG49Qe3bB+rGCwQfIaA7WHnGeGkSijX4FuBCdrzW/g=="
        },
        "abort-controller": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
            "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
            "requires": {
                "event-target-shim": "^5.0.0"
            }
        },
        "acorn": {
            "version": "5.7.4",
            "resolved": "https://registry.npmjs.org/acorn/-/acorn-5.7.4.tgz",
            "integrity": "sha512-1D++VG7BhrtvQpNbBzovKNc1FLGGEE/oGe7b9xJm/RFHMBeUaUGpluV9RLjZa47YFdPcDAenEYuq9pQPcMdLJg=="
        },
        "acorn-dynamic-import": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/acorn-dynamic-import/-/acorn-dynamic-import-3.0.0.tgz",
            "integrity": "sha512-zVWV8Z8lislJoOKKqdNMOB+s6+XV5WERty8MnKBeFgwA+19XJjJHs2RP5dzM57FftIs+jQnRToLiWazKr6sSWg==",
            "requires": {
                "acorn": "^5.0.0"
            }
        },
        "adal-node": {
            "version": "0.1.28",
            "resolved": "https://registry.npmjs.org/adal-node/-/adal-node-0.1.28.tgz",
            "integrity": "sha1-RoxLs+u9lrEnBmn0ucuk4AZepIU=",
            "requires": {
                "@types/node": "^8.0.47",
                "async": ">=0.6.0",
                "date-utils": "*",
                "jws": "3.x.x",
                "request": ">= 2.52.0",
                "underscore": ">= 1.3.1",
                "uuid": "^3.1.0",
                "xmldom": ">= 0.1.x",
                "xpath.js": "~1.1.0"
            },
            "dependencies": {
                "@types/node": {
                    "version": "8.10.59",
                    "resolved": "https://registry.npmjs.org/@types/node/-/node-8.10.59.tgz",
                    "integrity": "sha512-8RkBivJrDCyPpBXhVZcjh7cQxVBSmRk9QM7hOketZzp6Tg79c0N8kkpAIito9bnJ3HCVCHVYz+KHTEbfQNfeVQ=="
                }
            }
        },
        "agent-base": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
            "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
            "dev": true,
            "requires": {
                "es6-promisify": "^5.0.0"
            }
        },
        "ajv": {
            "version": "6.12.0",
            "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.0.tgz",
            "integrity": "sha512-D6gFiFA0RRLyUbvijN74DWAjXSFxWKaWP7mldxkVhyhAV3+SWA9HEJPHQ2c9soIeTFJqcSdFDGFgdqs1iUU2Hw==",
            "requires": {
                "fast-deep-equal": "^3.1.1",
                "fast-json-stable-stringify": "^2.0.0",
                "json-schema-traverse": "^0.4.1",
                "uri-js": "^4.2.2"
            }
        },
        "ajv-errors": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.1.tgz",
            "integrity": "sha512-DCRfO/4nQ+89p/RK43i8Ezd41EqdGIU4ld7nGF8OQ14oc/we5rEntLCUa7+jrn3nn83BosfwZA0wb4pon2o8iQ=="
        },
        "ajv-keywords": {
            "version": "3.4.1",
            "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.4.1.tgz",
            "integrity": "sha512-RO1ibKvd27e6FEShVFfPALuHI3WjSVNeK5FIsmme/LYRNxjKuNj+Dt7bucLa6NdSv3JcVTyMlm9kGR84z1XpaQ=="
        },
        "ansi-colors": {
            "version": "3.2.3",
            "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-3.2.3.tgz",
            "integrity": "sha512-LEHHyuhlPY3TmuUYMh2oz89lTShfvgbmzaBcxve9t/9Wuy7Dwf4yoAKcND7KFT1HAQfqZ12qtc+DUrBMeKF9nw==",
            "dev": true
        },
        "ansi-regex": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
            "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
            "dev": true
        },
        "ansi-styles": {
            "version": "3.2.1",
            "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
            "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
            "requires": {
                "color-convert": "^1.9.0"
            }
        },
        "anymatch": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-1.3.2.tgz",
            "integrity": "sha512-0XNayC8lTHQ2OI8aljNCN3sSx6hsr/1+rlcDAotXJR7C1oZZHCNsfpbKwMjRA3Uqb5tF1Rae2oloTr4xpq+WjA==",
            "requires": {
                "micromatch": "^2.1.5",
                "normalize-path": "^2.0.0"
            },
            "dependencies": {
                "normalize-path": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
                    "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
                    "requires": {
                        "remove-trailing-separator": "^1.0.1"
                    }
                }
            }
        },
        "aproba": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
            "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw=="
        },
        "archiver": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/archiver/-/archiver-3.1.1.tgz",
            "integrity": "sha512-5Hxxcig7gw5Jod/8Gq0OneVgLYET+oNHcxgWItq4TbhOzRLKNAFUb9edAftiMKXvXfCB0vbGrJdZDNq0dWMsxg==",
            "requires": {
                "archiver-utils": "^2.1.0",
                "async": "^2.6.3",
                "buffer-crc32": "^0.2.1",
                "glob": "^7.1.4",
                "readable-stream": "^3.4.0",
                "tar-stream": "^2.1.0",
                "zip-stream": "^2.1.2"
            },
            "dependencies": {
                "async": {
                    "version": "2.6.3",
                    "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",
                    "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",
                    "requires": {
                        "lodash": "^4.17.14"
                    }
                }
            }
        },
        "archiver-utils": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/archiver-utils/-/archiver-utils-2.1.0.tgz",
            "integrity": "sha512-bEL/yUb/fNNiNTuUz979Z0Yg5L+LzLxGJz8x79lYmR54fmTIb6ob/hNQgkQnIUDWIFjZVQwl9Xs356I6BAMHfw==",
            "requires": {
                "glob": "^7.1.4",
                "graceful-fs": "^4.2.0",
                "lazystream": "^1.0.0",
                "lodash.defaults": "^4.2.0",
                "lodash.difference": "^4.5.0",
                "lodash.flatten": "^4.4.0",
                "lodash.isplainobject": "^4.0.6",
                "lodash.union": "^4.6.0",
                "normalize-path": "^3.0.0",
                "readable-stream": "^2.0.0"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "argparse": {
            "version": "1.0.10",
            "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
            "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
            "dev": true,
            "requires": {
                "sprintf-js": "~1.0.2"
            }
        },
        "arr-diff": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
            "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
            "requires": {
                "arr-flatten": "^1.0.1"
            }
        },
        "arr-flatten": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
            "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg=="
        },
        "arr-union": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
            "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ="
        },
        "array-includes": {
            "version": "3.1.2",
            "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.2.tgz",
            "integrity": "sha512-w2GspexNQpx+PutG3QpT437/BenZBj0M/MZGn5mzv/MofYqo0xmRHzn4lFsoDlWJ+THYsGJmFlW68WlDFx7VRw==",
            "dev": true,
            "requires": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "es-abstract": "^1.18.0-next.1",
                "get-intrinsic": "^1.0.1",
                "is-string": "^1.0.5"
            },
            "dependencies": {
                "es-abstract": {
                    "version": "1.18.0-next.2",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.0-next.2.tgz",
                    "integrity": "sha512-Ih4ZMFHEtZupnUh6497zEL4y2+w8+1ljnCyaTa+adcoafI1GOvMwFlDjBLfWR7y9VLfrjRJe9ocuHY1PSR9jjw==",
                    "dev": true,
                    "requires": {
                        "call-bind": "^1.0.2",
                        "es-to-primitive": "^1.2.1",
                        "function-bind": "^1.1.1",
                        "get-intrinsic": "^1.0.2",
                        "has": "^1.0.3",
                        "has-symbols": "^1.0.1",
                        "is-callable": "^1.2.2",
                        "is-negative-zero": "^2.0.1",
                        "is-regex": "^1.1.1",
                        "object-inspect": "^1.9.0",
                        "object-keys": "^1.1.1",
                        "object.assign": "^4.1.2",
                        "string.prototype.trimend": "^1.0.3",
                        "string.prototype.trimstart": "^1.0.3"
                    }
                },
                "object.assign": {
                    "version": "4.1.2",
                    "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
                    "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
                    "dev": true,
                    "requires": {
                        "call-bind": "^1.0.0",
                        "define-properties": "^1.1.3",
                        "has-symbols": "^1.0.1",
                        "object-keys": "^1.1.1"
                    }
                }
            }
        },
        "array-union": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
            "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
            "requires": {
                "array-uniq": "^1.0.1"
            }
        },
        "array-uniq": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
            "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY="
        },
        "array-unique": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
            "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM="
        },
        "array.prototype.flat": {
            "version": "1.2.4",
            "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.2.4.tgz",
            "integrity": "sha512-4470Xi3GAPAjZqFcljX2xzckv1qeKPizoNkiS0+O4IoPR2ZNpcjE0pkhdihlDouK+x6QOast26B4Q/O9DJnwSg==",
            "dev": true,
            "requires": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "es-abstract": "^1.18.0-next.1"
            },
            "dependencies": {
                "es-abstract": {
                    "version": "1.18.0-next.2",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.0-next.2.tgz",
                    "integrity": "sha512-Ih4ZMFHEtZupnUh6497zEL4y2+w8+1ljnCyaTa+adcoafI1GOvMwFlDjBLfWR7y9VLfrjRJe9ocuHY1PSR9jjw==",
                    "dev": true,
                    "requires": {
                        "call-bind": "^1.0.2",
                        "es-to-primitive": "^1.2.1",
                        "function-bind": "^1.1.1",
                        "get-intrinsic": "^1.0.2",
                        "has": "^1.0.3",
                        "has-symbols": "^1.0.1",
                        "is-callable": "^1.2.2",
                        "is-negative-zero": "^2.0.1",
                        "is-regex": "^1.1.1",
                        "object-inspect": "^1.9.0",
                        "object-keys": "^1.1.1",
                        "object.assign": "^4.1.2",
                        "string.prototype.trimend": "^1.0.3",
                        "string.prototype.trimstart": "^1.0.3"
                    }
                },
                "object.assign": {
                    "version": "4.1.2",
                    "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
                    "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
                    "dev": true,
                    "requires": {
                        "call-bind": "^1.0.0",
                        "define-properties": "^1.1.3",
                        "has-symbols": "^1.0.1",
                        "object-keys": "^1.1.1"
                    }
                }
            }
        },
        "arrify": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
            "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0=",
            "dev": true
        },
        "asn1": {
            "version": "0.2.4",
            "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
            "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
            "requires": {
                "safer-buffer": "~2.1.0"
            }
        },
        "asn1.js": {
            "version": "4.10.1",
            "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
            "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
            "requires": {
                "bn.js": "^4.0.0",
                "inherits": "^2.0.1",
                "minimalistic-assert": "^1.0.0"
            }
        },
        "assert": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/assert/-/assert-1.5.0.tgz",
            "integrity": "sha512-EDsgawzwoun2CZkCgtxJbv392v4nbk9XDD06zI+kQYoBM/3RBWLlEyJARDOmhAAosBjWACEkKL6S+lIZtcAubA==",
            "requires": {
                "object-assign": "^4.1.1",
                "util": "0.10.3"
            },
            "dependencies": {
                "inherits": {
                    "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
                    "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE="
                },
                "util": {
                    "version": "0.10.3",
                    "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
                    "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
                    "requires": {
                        "inherits": "2.0.1"
                    }
                }
            }
        },
        "assert-plus": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
            "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU="
        },
        "assign-symbols": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
            "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c="
        },
        "astral-regex": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/astral-regex/-/astral-regex-2.0.0.tgz",
            "integrity": "sha512-Z7tMw1ytTXt5jqMcOP+OQteU1VuNK9Y02uuJtKQ1Sv69jXQKKg5cibLwGJow8yzZP+eAc18EmLGPal0bp36rvQ==",
            "dev": true
        },
        "async": {
            "version": "2.6.0",
            "resolved": "https://registry.npmjs.org/async/-/async-2.6.0.tgz",
            "integrity": "sha512-xAfGg1/NTLBBKlHFmnd7PlmUW9KhVQIUuSrYem9xzFUZy13ScvtyGGejaae9iAVRiRq9+Cx7DPFaAAhCpyxyPw==",
            "requires": {
                "lodash": "^4.14.0"
            }
        },
        "async-each": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.3.tgz",
            "integrity": "sha512-z/WhQ5FPySLdvREByI2vZiTWwCnF0moMJ1hK9YQwDTHKh6I7/uSckMetoRGb5UBZPC1z0jlw+n/XCgjeH7y1AQ=="
        },
        "asynckit": {
            "version": "0.4.0",
            "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
            "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
        },
        "atob": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
            "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg=="
        },
        "aws-sign2": {
            "version": "0.7.0",
            "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
            "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg="
        },
        "aws4": {
            "version": "1.9.1",
            "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.9.1.tgz",
            "integrity": "sha512-wMHVg2EOHaMRxbzgFJ9gtjOOCrI80OHLG14rxi28XwOW8ux6IiEbRCGGGqCtdAIg4FQCbW20k9RsT4y3gJlFug=="
        },
        "babel-runtime": {
            "version": "6.26.0",
            "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
            "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
            "requires": {
                "core-js": "^2.4.0",
                "regenerator-runtime": "^0.11.0"
            }
        },
        "balanced-match": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
            "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c="
        },
        "base": {
            "version": "0.11.2",
            "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
            "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
            "requires": {
                "cache-base": "^1.0.1",
                "class-utils": "^0.3.5",
                "component-emitter": "^1.2.1",
                "define-property": "^1.0.0",
                "isobject": "^3.0.1",
                "mixin-deep": "^1.2.0",
                "pascalcase": "^0.1.1"
            },
            "dependencies": {
                "define-property": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                    "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                    "requires": {
                        "is-descriptor": "^1.0.0"
                    }
                },
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                }
            }
        },
        "base64-js": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
            "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g=="
        },
        "bcrypt-pbkdf": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
            "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
            "requires": {
                "tweetnacl": "^0.14.3"
            }
        },
        "big.js": {
            "version": "5.2.2",
            "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
            "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ=="
        },
        "binary-extensions": {
            "version": "1.13.1",
            "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
            "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw=="
        },
        "bindings": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
            "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
            "optional": true,
            "requires": {
                "file-uri-to-path": "1.0.0"
            }
        },
        "bl": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/bl/-/bl-4.0.3.tgz",
            "integrity": "sha512-fs4G6/Hu4/EE+F75J8DuN/0IpQqNjAdC7aEQv7Qt8MHGUH7Ckv2MwTEEeN9QehD0pfIDkMI1bkHYkKy7xHyKIg==",
            "requires": {
                "buffer": "^5.5.0",
                "inherits": "^2.0.4",
                "readable-stream": "^3.4.0"
            }
        },
        "bluebird": {
            "version": "3.7.2",
            "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
            "integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
        },
        "bn.js": {
            "version": "4.11.8",
            "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.8.tgz",
            "integrity": "sha512-ItfYfPLkWHUjckQCk8xC+LwxgK8NYcXywGigJgSwOP8Y2iyWT4f2vsZnoOXTTbo+o5yXmIUJ4gn5538SO5S3gA=="
        },
        "brace-expansion": {
            "version": "1.1.11",
            "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
            "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
            "requires": {
                "balanced-match": "^1.0.0",
                "concat-map": "0.0.1"
            }
        },
        "braces": {
            "version": "1.8.5",
            "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
            "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
            "requires": {
                "expand-range": "^1.8.1",
                "preserve": "^0.2.0",
                "repeat-element": "^1.1.2"
            }
        },
        "brorand": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
            "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8="
        },
        "browser-stdout": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/browser-stdout/-/browser-stdout-1.3.1.tgz",
            "integrity": "sha512-qhAVI1+Av2X7qelOfAIYwXONood6XlZE/fXaBSmW/T5SzLAmCgzi+eiWE7fUvbHaeNBQH13UftjpXxsfLkMpgw==",
            "dev": true
        },
        "browserify-aes": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
            "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
            "requires": {
                "buffer-xor": "^1.0.3",
                "cipher-base": "^1.0.0",
                "create-hash": "^1.1.0",
                "evp_bytestokey": "^1.0.3",
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "browserify-cipher": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
            "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
            "requires": {
                "browserify-aes": "^1.0.4",
                "browserify-des": "^1.0.0",
                "evp_bytestokey": "^1.0.0"
            }
        },
        "browserify-des": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
            "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
            "requires": {
                "cipher-base": "^1.0.1",
                "des.js": "^1.0.0",
                "inherits": "^2.0.1",
                "safe-buffer": "^5.1.2"
            }
        },
        "browserify-rsa": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
            "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
            "requires": {
                "bn.js": "^4.1.0",
                "randombytes": "^2.0.1"
            }
        },
        "browserify-sign": {
            "version": "4.0.4",
            "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.0.4.tgz",
            "integrity": "sha1-qk62jl17ZYuqa/alfmMMvXqT0pg=",
            "requires": {
                "bn.js": "^4.1.1",
                "browserify-rsa": "^4.0.0",
                "create-hash": "^1.1.0",
                "create-hmac": "^1.1.2",
                "elliptic": "^6.0.0",
                "inherits": "^2.0.1",
                "parse-asn1": "^5.0.0"
            }
        },
        "browserify-zlib": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
            "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
            "requires": {
                "pako": "~1.0.5"
            }
        },
        "buffer": {
            "version": "5.5.0",
            "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.5.0.tgz",
            "integrity": "sha512-9FTEDjLjwoAkEwyMGDjYJQN2gfRgOKBKRfiglhvibGbpeeU/pQn1bJxQqm32OD/AIeEuHxU9roxXxg34Byp/Ww==",
            "requires": {
                "base64-js": "^1.0.2",
                "ieee754": "^1.1.4"
            }
        },
        "buffer-crc32": {
            "version": "0.2.13",
            "resolved": "https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.13.tgz",
            "integrity": "sha1-DTM+PwDqxQqhRUq9MO+MKl2ackI="
        },
        "buffer-equal-constant-time": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
            "integrity": "sha1-+OcRMvf/5uAaXJaXpMbz5I1cyBk="
        },
        "buffer-from": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
            "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A=="
        },
        "buffer-xor": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
            "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk="
        },
        "builtin-status-codes": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
            "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug="
        },
        "cacache": {
            "version": "12.0.4",
            "resolved": "https://registry.npmjs.org/cacache/-/cacache-12.0.4.tgz",
            "integrity": "sha512-a0tMB40oefvuInr4Cwb3GerbL9xTj1D5yg0T5xrjGCGyfvbxseIXX7BAO/u/hIXdafzOI5JC3wDwHyf24buOAQ==",
            "requires": {
                "bluebird": "^3.5.5",
                "chownr": "^1.1.1",
                "figgy-pudding": "^3.5.1",
                "glob": "^7.1.4",
                "graceful-fs": "^4.1.15",
                "infer-owner": "^1.0.3",
                "lru-cache": "^5.1.1",
                "mississippi": "^3.0.0",
                "mkdirp": "^0.5.1",
                "move-concurrently": "^1.0.1",
                "promise-inflight": "^1.0.1",
                "rimraf": "^2.6.3",
                "ssri": "^6.0.1",
                "unique-filename": "^1.1.1",
                "y18n": "^4.0.0"
            }
        },
        "cache-base": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
            "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
            "requires": {
                "collection-visit": "^1.0.0",
                "component-emitter": "^1.2.1",
                "get-value": "^2.0.6",
                "has-value": "^1.0.0",
                "isobject": "^3.0.1",
                "set-value": "^2.0.0",
                "to-object-path": "^0.3.0",
                "union-value": "^1.0.0",
                "unset-value": "^1.0.0"
            },
            "dependencies": {
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "call-bind": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.2.tgz",
            "integrity": "sha512-7O+FbCihrB5WGbFYesctwmTKae6rOiIzmz1icreWJ+0aA7LJfuqhEso2T9ncpcFtzMQtzXf2QGGueWJGTYsqrA==",
            "dev": true,
            "requires": {
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2"
            }
        },
        "callsites": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
            "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
            "dev": true
        },
        "camelcase": {
            "version": "5.3.1",
            "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
            "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
            "dev": true
        },
        "caseless": {
            "version": "0.12.0",
            "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
            "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
        },
        "chalk": {
            "version": "2.4.2",
            "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
            "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
            "requires": {
                "ansi-styles": "^3.2.1",
                "escape-string-regexp": "^1.0.5",
                "supports-color": "^5.3.0"
            }
        },
        "charenc": {
            "version": "0.0.2",
            "resolved": "https://registry.npmjs.org/charenc/-/charenc-0.0.2.tgz",
            "integrity": "sha1-wKHS86cJLgN3S/qD8UwPxXkKhmc=",
            "dev": true
        },
        "chokidar": {
            "version": "1.7.0",
            "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-1.7.0.tgz",
            "integrity": "sha1-eY5ol3gVHIB2tLNg5e3SjNortGg=",
            "requires": {
                "anymatch": "^1.3.0",
                "async-each": "^1.0.0",
                "fsevents": "^1.0.0",
                "glob-parent": "^2.0.0",
                "inherits": "^2.0.1",
                "is-binary-path": "^1.0.0",
                "is-glob": "^2.0.0",
                "path-is-absolute": "^1.0.0",
                "readdirp": "^2.0.0"
            }
        },
        "chownr": {
            "version": "1.1.4",
            "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
            "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg=="
        },
        "chrome-trace-event": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.2.tgz",
            "integrity": "sha512-9e/zx1jw7B4CO+c/RXoCsfg/x1AfUBioy4owYH0bJprEYAx5hRFLRhWBqHAG57D0ZM4H7vxbP7bPe0VwhQRYDQ==",
            "requires": {
                "tslib": "^1.9.0"
            }
        },
        "cipher-base": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
            "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
            "requires": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "class-utils": {
            "version": "0.3.6",
            "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
            "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
            "requires": {
                "arr-union": "^3.1.0",
                "define-property": "^0.2.5",
                "isobject": "^3.0.0",
                "static-extend": "^0.1.1"
            },
            "dependencies": {
                "define-property": {
                    "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                        "is-descriptor": "^0.1.0"
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "clean-webpack-plugin": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/clean-webpack-plugin/-/clean-webpack-plugin-3.0.0.tgz",
            "integrity": "sha512-MciirUH5r+cYLGCOL5JX/ZLzOZbVr1ot3Fw+KcvbhUb6PM+yycqd9ZhIlcigQ5gl+XhppNmw3bEFuaaMNyLj3A==",
            "requires": {
                "@types/webpack": "^4.4.31",
                "del": "^4.1.1"
            }
        },
        "cliui": {
            "version": "5.0.0",
            "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
            "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
            "dev": true,
            "requires": {
                "string-width": "^3.1.0",
                "strip-ansi": "^5.2.0",
                "wrap-ansi": "^5.1.0"
            },
            "dependencies": {
                "ansi-regex": {
                    "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
                    "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
                    "dev": true
                },
                "string-width": {
                    "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
                    "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
                    "dev": true,
                    "requires": {
                        "emoji-regex": "^7.0.1",
                        "is-fullwidth-code-point": "^2.0.0",
                        "strip-ansi": "^5.1.0"
                    }
                },
                "strip-ansi": {
                    "version": "5.2.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
                    "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
                    "dev": true,
                    "requires": {
                        "ansi-regex": "^4.1.0"
                    }
                }
            }
        },
        "collection-visit": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
            "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
            "requires": {
                "map-visit": "^1.0.0",
                "object-visit": "^1.0.0"
            }
        },
        "color-convert": {
            "version": "1.9.3",
            "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
            "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
            "requires": {
                "color-name": "1.1.3"
            }
        },
        "color-name": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
            "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU="
        },
        "combined-stream": {
            "version": "1.0.8",
            "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
            "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
            "requires": {
                "delayed-stream": "~1.0.0"
            }
        },
        "commander": {
            "version": "2.20.3",
            "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
            "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
        },
        "commondir": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
            "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs="
        },
        "component-emitter": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
            "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg=="
        },
        "compress-commons": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/compress-commons/-/compress-commons-2.1.1.tgz",
            "integrity": "sha512-eVw6n7CnEMFzc3duyFVrQEuY1BlHR3rYsSztyG32ibGMW722i3C6IizEGMFmfMU+A+fALvBIwxN3czffTcdA+Q==",
            "requires": {
                "buffer-crc32": "^0.2.13",
                "crc32-stream": "^3.0.1",
                "normalize-path": "^3.0.0",
                "readable-stream": "^2.3.6"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "concat-map": {
            "version": "0.0.1",
            "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
            "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s="
        },
        "concat-stream": {
            "version": "1.6.2",
            "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
            "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
            "requires": {
                "buffer-from": "^1.0.0",
                "inherits": "^2.0.3",
                "readable-stream": "^2.2.2",
                "typedarray": "^0.0.6"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "console-browserify": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.2.0.tgz",
            "integrity": "sha512-ZMkYO/LkF17QvCPqM0gxw8yUzigAOZOSWSHg91FH6orS7vcEj5dVZTidN2fQ14yBSdg97RqhSNwLUXInd52OTA=="
        },
        "constants-browserify": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
            "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U="
        },
        "contains-path": {
            "version": "0.1.0",
            "resolved": "https://registry.npmjs.org/contains-path/-/contains-path-0.1.0.tgz",
            "integrity": "sha1-/ozxhP9mcLa67wGp1IYaXL7EEgo=",
            "dev": true
        },
        "copy-concurrently": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
            "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
            "requires": {
                "aproba": "^1.1.1",
                "fs-write-stream-atomic": "^1.0.8",
                "iferr": "^0.1.5",
                "mkdirp": "^0.5.1",
                "rimraf": "^2.5.4",
                "run-queue": "^1.0.0"
            }
        },
        "copy-descriptor": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
            "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40="
        },
        "core-js": {
            "version": "2.6.11",
            "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.11.tgz",
            "integrity": "sha512-5wjnpaT/3dV+XB4borEsnAYQchn00XSgTAWKDkEqv+K8KevjbzmofK6hfJ9TZIlpj2N0xQpazy7PiRQiWHqzWg=="
        },
        "core-util-is": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
            "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
        },
        "cpx": {
            "version": "1.5.0",
            "resolved": "https://registry.npmjs.org/cpx/-/cpx-1.5.0.tgz",
            "integrity": "sha1-GFvgGFEdhycN7czCkxceN2VauI8=",
            "requires": {
                "babel-runtime": "^6.9.2",
                "chokidar": "^1.6.0",
                "duplexer": "^0.1.1",
                "glob": "^7.0.5",
                "glob2base": "^0.0.12",
                "minimatch": "^3.0.2",
                "mkdirp": "^0.5.1",
                "resolve": "^1.1.7",
                "safe-buffer": "^5.0.1",
                "shell-quote": "^1.6.1",
                "subarg": "^1.0.0"
            }
        },
        "crc": {
            "version": "3.8.0",
            "resolved": "https://registry.npmjs.org/crc/-/crc-3.8.0.tgz",
            "integrity": "sha512-iX3mfgcTMIq3ZKLIsVFAbv7+Mc10kxabAGQb8HvjA1o3T1PIYprbakQ65d3I+2HGHt6nSKkM9PYjgoJO2KcFBQ==",
            "requires": {
                "buffer": "^5.1.0"
            }
        },
        "crc32-stream": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/crc32-stream/-/crc32-stream-3.0.1.tgz",
            "integrity": "sha512-mctvpXlbzsvK+6z8kJwSJ5crm7yBwrQMTybJzMw1O4lLGJqjlDCXY2Zw7KheiA6XBEcBmfLx1D88mjRGVJtY9w==",
            "requires": {
                "crc": "^3.4.4",
                "readable-stream": "^3.4.0"
            }
        },
        "create-ecdh": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.3.tgz",
            "integrity": "sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==",
            "requires": {
                "bn.js": "^4.1.0",
                "elliptic": "^6.0.0"
            }
        },
        "create-hash": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
            "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
            "requires": {
                "cipher-base": "^1.0.1",
                "inherits": "^2.0.1",
                "md5.js": "^1.3.4",
                "ripemd160": "^2.0.1",
                "sha.js": "^2.4.0"
            }
        },
        "create-hmac": {
            "version": "1.1.7",
            "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
            "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
            "requires": {
                "cipher-base": "^1.0.3",
                "create-hash": "^1.1.0",
                "inherits": "^2.0.1",
                "ripemd160": "^2.0.0",
                "safe-buffer": "^5.0.1",
                "sha.js": "^2.4.8"
            }
        },
        "cross-spawn": {
            "version": "7.0.3",
            "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.3.tgz",
            "integrity": "sha512-iRDPJKUPVEND7dHPO8rkbOnPpyDygcDFtWjpeWNCgy8WP2rXcxXL8TskReQl6OrB2G7+UJrags1q15Fudc7G6w==",
            "dev": true,
            "requires": {
                "path-key": "^3.1.0",
                "shebang-command": "^2.0.0",
                "which": "^2.0.1"
            },
            "dependencies": {
                "which": {
                    "version": "2.0.2",
                    "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
                    "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
                    "dev": true,
                    "requires": {
                        "isexe": "^2.0.0"
                    }
                }
            }
        },
        "crypt": {
            "version": "0.0.2",
            "resolved": "https://registry.npmjs.org/crypt/-/crypt-0.0.2.tgz",
            "integrity": "sha1-iNf/fsDfuG9xPch7u0LQRNPmxBs=",
            "dev": true
        },
        "crypto-browserify": {
            "version": "3.12.0",
            "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
            "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
            "requires": {
                "browserify-cipher": "^1.0.0",
                "browserify-sign": "^4.0.0",
                "create-ecdh": "^4.0.0",
                "create-hash": "^1.1.0",
                "create-hmac": "^1.1.0",
                "diffie-hellman": "^5.0.0",
                "inherits": "^2.0.1",
                "pbkdf2": "^3.0.3",
                "public-encrypt": "^4.0.0",
                "randombytes": "^2.0.0",
                "randomfill": "^1.0.3"
            }
        },
        "cyclist": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-1.0.1.tgz",
            "integrity": "sha1-WW6WmP0MgOEgOMK4LW6xs1tiJNk="
        },
        "dashdash": {
            "version": "1.14.1",
            "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
            "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
            "requires": {
                "assert-plus": "^1.0.0"
            }
        },
        "date-utils": {
            "version": "1.2.21",
            "resolved": "https://registry.npmjs.org/date-utils/-/date-utils-1.2.21.tgz",
            "integrity": "sha1-YfsWzcEnSzyayq/+n8ad+HIKK2Q="
        },
        "debug": {
            "version": "2.6.9",
            "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
            "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
            "requires": {
                "ms": "2.0.0"
            }
        },
        "decamelize": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
            "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA=",
            "dev": true
        },
        "decode-uri-component": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
            "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU="
        },
        "deep-is": {
            "version": "0.1.3",
            "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.3.tgz",
            "integrity": "sha1-s2nW+128E+7PUk+RsHD+7cNXzzQ=",
            "dev": true
        },
        "define-properties": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.3.tgz",
            "integrity": "sha512-3MqfYKj2lLzdMSf8ZIZE/V+Zuy+BgD6f164e8K2w7dgnpKArBDerGYpM46IYYcjnkdPNMjPk9A6VFB8+3SKlXQ==",
            "dev": true,
            "requires": {
                "object-keys": "^1.0.12"
            }
        },
        "define-property": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
            "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
            "requires": {
                "is-descriptor": "^1.0.2",
                "isobject": "^3.0.1"
            },
            "dependencies": {
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                }
            }
        },
        "del": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/del/-/del-4.1.1.tgz",
            "integrity": "sha512-QwGuEUouP2kVwQenAsOof5Fv8K9t3D8Ca8NxcXKrIpEHjTXK5J2nXLdP+ALI1cgv8wj7KuwBhTwBkOZSJKM5XQ==",
            "requires": {
                "@types/glob": "^7.1.1",
                "globby": "^6.1.0",
                "is-path-cwd": "^2.0.0",
                "is-path-in-cwd": "^2.0.0",
                "p-map": "^2.0.0",
                "pify": "^4.0.1",
                "rimraf": "^2.6.3"
            }
        },
        "delayed-stream": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
            "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
        },
        "des.js": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.1.tgz",
            "integrity": "sha512-Q0I4pfFrv2VPd34/vfLrFOoRmlYj3OV50i7fskps1jZWK1kApMWWT9G6RRUeYedLcBDIhnSDaUvJMb3AhUlaEA==",
            "requires": {
                "inherits": "^2.0.1",
                "minimalistic-assert": "^1.0.0"
            }
        },
        "diff": {
            "version": "3.5.0",
            "resolved": "https://registry.npmjs.org/diff/-/diff-3.5.0.tgz",
            "integrity": "sha512-A46qtFgd+g7pDZinpnwiRJtxbC1hpgf0uzP3iG89scHk0AUC7A1TGxf5OiiOUv/JMZR8GOt8hL900hV0bOy5xA==",
            "dev": true
        },
        "diffie-hellman": {
            "version": "5.0.3",
            "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
            "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
            "requires": {
                "bn.js": "^4.1.0",
                "miller-rabin": "^4.0.0",
                "randombytes": "^2.0.0"
            }
        },
        "dir-glob": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-3.0.1.tgz",
            "integrity": "sha512-WkrWp9GR4KXfKGYzOLmTuGVi1UWFfws377n9cc55/tb6DuqyF6pcQ5AbiHEshaDpY9v6oaSr2XCDidGmMwdzIA==",
            "dev": true,
            "requires": {
                "path-type": "^4.0.0"
            },
            "dependencies": {
                "path-type": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
                    "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==",
                    "dev": true
                }
            }
        },
        "doctrine": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
            "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",
            "dev": true,
            "requires": {
                "esutils": "^2.0.2"
            }
        },
        "domain-browser": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
            "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA=="
        },
        "duplexer": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/duplexer/-/duplexer-0.1.1.tgz",
            "integrity": "sha1-rOb/gIwc5mtX0ev5eXessCM0z8E="
        },
        "duplexify": {
            "version": "3.7.1",
            "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.7.1.tgz",
            "integrity": "sha512-07z8uv2wMyS51kKhD1KsdXJg5WQ6t93RneqRxUHnskXVtlYYkLqM0gqStQZ3pj073g687jPCHrqNfCzawLYh5g==",
            "requires": {
                "end-of-stream": "^1.0.0",
                "inherits": "^2.0.1",
                "readable-stream": "^2.0.0",
                "stream-shift": "^1.0.0"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "ecc-jsbn": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
            "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
            "requires": {
                "jsbn": "~0.1.0",
                "safer-buffer": "^2.1.0"
            }
        },
        "ecdsa-sig-formatter": {
            "version": "1.0.11",
            "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
            "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
            "requires": {
                "safe-buffer": "^5.0.1"
            }
        },
        "elliptic": {
            "version": "6.5.3",
            "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.3.tgz",
            "integrity": "sha512-IMqzv5wNQf+E6aHeIqATs0tOLeOTwj1QKbRcS3jBbYkl5oLAserA8yJTT7/VyHUYG91PRmPyeQDObKLPpeS4dw==",
            "requires": {
                "bn.js": "^4.4.0",
                "brorand": "^1.0.1",
                "hash.js": "^1.0.0",
                "hmac-drbg": "^1.0.0",
                "inherits": "^2.0.1",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.0"
            }
        },
        "emoji-regex": {
            "version": "7.0.3",
            "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
            "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA==",
            "dev": true
        },
        "emojis-list": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-3.0.0.tgz",
            "integrity": "sha512-/kyM18EfinwXZbno9FyUGeFh87KC8HRQBQGildHZbEuRyWFOmv1U10o9BBp8XVZDVNNuQKyIGIu5ZYAAXJ0V2Q=="
        },
        "end-of-stream": {
            "version": "1.4.4",
            "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
            "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
            "requires": {
                "once": "^1.4.0"
            }
        },
        "enhanced-resolve": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.1.1.tgz",
            "integrity": "sha512-98p2zE+rL7/g/DzMHMTF4zZlCgeVdJ7yr6xzEpJRYwFYrGi9ANdn5DnJURg6RpBkyk60XYDnWIv51VfIhfNGuA==",
            "requires": {
                "graceful-fs": "^4.1.2",
                "memory-fs": "^0.5.0",
                "tapable": "^1.0.0"
            }
        },
        "enquirer": {
            "version": "2.3.6",
            "resolved": "https://registry.npmjs.org/enquirer/-/enquirer-2.3.6.tgz",
            "integrity": "sha512-yjNnPr315/FjS4zIsUxYguYUPP2e1NK4d7E7ZOLiyYCcbFBiTMyID+2wvm2w6+pZ/odMA7cRkjhsPbltwBOrLg==",
            "dev": true,
            "requires": {
                "ansi-colors": "^4.1.1"
            },
            "dependencies": {
                "ansi-colors": {
                    "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-4.1.1.tgz",
                    "integrity": "sha512-JoX0apGbHaUJBNl6yF+p6JAFYZ666/hhCGKN5t9QFjbJQKUU/g8MNbFDbvfrgKXvI1QpZplPOnwIo99lX/AAmA==",
                    "dev": true
                }
            }
        },
        "errno": {
            "version": "0.1.7",
            "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.7.tgz",
            "integrity": "sha512-MfrRBDWzIWifgq6tJj60gkAwtLNb6sQPlcFrSOflcP1aFmmruKQ2wRnze/8V6kgyz7H3FF8Npzv78mZ7XLLflg==",
            "requires": {
                "prr": "~1.0.1"
            }
        },
        "error-ex": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
            "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
            "dev": true,
            "requires": {
                "is-arrayish": "^0.2.1"
            }
        },
        "es-abstract": {
            "version": "1.17.5",
            "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.5.tgz",
            "integrity": "sha512-BR9auzDbySxOcfog0tLECW8l28eRGpDpU3Dm3Hp4q/N+VtLTmyj4EUN088XZWQDW/hzj6sYRDXeOFsaAODKvpg==",
            "dev": true,
            "requires": {
                "es-to-primitive": "^1.2.1",
                "function-bind": "^1.1.1",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1",
                "is-callable": "^1.1.5",
                "is-regex": "^1.0.5",
                "object-inspect": "^1.7.0",
                "object-keys": "^1.1.1",
                "object.assign": "^4.1.0",
                "string.prototype.trimleft": "^2.1.1",
                "string.prototype.trimright": "^2.1.1"
            }
        },
        "es-to-primitive": {
            "version": "1.2.1",
            "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.1.tgz",
            "integrity": "sha512-QCOllgZJtaUo9miYBcLChTUaHNjJF3PYs1VidD7AwiEj1kYxKeQTctLAezAOH5ZKRH0g2IgPn6KwB4IT8iRpvA==",
            "dev": true,
            "requires": {
                "is-callable": "^1.1.4",
                "is-date-object": "^1.0.1",
                "is-symbol": "^1.0.2"
            }
        },
        "es6-promise": {
            "version": "4.2.8",
            "resolved": "https://registry.npmjs.org/es6-promise/-/es6-promise-4.2.8.tgz",
            "integrity": "sha512-HJDGx5daxeIvxdBxvG2cb9g4tEvwIk3i8+nhX0yGrYmZUzbkdg8QbDevheDB8gd0//uPj4c1EQua8Q+MViT0/w==",
            "dev": true
        },
        "es6-promisify": {
            "version": "5.0.0",
            "resolved": "https://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz",
            "integrity": "sha1-UQnWLz5W6pZ8S2NQWu8IKRyKUgM=",
            "dev": true,
            "requires": {
                "es6-promise": "^4.0.3"
            }
        },
        "escape-string-regexp": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
            "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ="
        },
        "eslint": {
            "version": "7.19.0",
            "resolved": "https://registry.npmjs.org/eslint/-/eslint-7.19.0.tgz",
            "integrity": "sha512-CGlMgJY56JZ9ZSYhJuhow61lMPPjUzWmChFya71Z/jilVos7mR/jPgaEfVGgMBY5DshbKdG8Ezb8FDCHcoMEMg==",
            "dev": true,
            "requires": {
                "@babel/code-frame": "^7.0.0",
                "@eslint/eslintrc": "^0.3.0",
                "ajv": "^6.10.0",
                "chalk": "^4.0.0",
                "cross-spawn": "^7.0.2",
                "debug": "^4.0.1",
                "doctrine": "^3.0.0",
                "enquirer": "^2.3.5",
                "eslint-scope": "^5.1.1",
                "eslint-utils": "^2.1.0",
                "eslint-visitor-keys": "^2.0.0",
                "espree": "^7.3.1",
                "esquery": "^1.2.0",
                "esutils": "^2.0.2",
                "file-entry-cache": "^6.0.0",
                "functional-red-black-tree": "^1.0.1",
                "glob-parent": "^5.0.0",
                "globals": "^12.1.0",
                "ignore": "^4.0.6",
                "import-fresh": "^3.0.0",
                "imurmurhash": "^0.1.4",
                "is-glob": "^4.0.0",
                "js-yaml": "^3.13.1",
                "json-stable-stringify-without-jsonify": "^1.0.1",
                "levn": "^0.4.1",
                "lodash": "^4.17.20",
                "minimatch": "^3.0.4",
                "natural-compare": "^1.4.0",
                "optionator": "^0.9.1",
                "progress": "^2.0.0",
                "regexpp": "^3.1.0",
                "semver": "^7.2.1",
                "strip-ansi": "^6.0.0",
                "strip-json-comments": "^3.1.0",
                "table": "^6.0.4",
                "text-table": "^0.2.0",
                "v8-compile-cache": "^2.0.3"
            },
            "dependencies": {
                "ansi-regex": {
                    "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
                    "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
                    "dev": true
                },
                "ansi-styles": {
                    "version": "4.3.0",
                    "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
                    "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
                    "dev": true,
                    "requires": {
                        "color-convert": "^2.0.1"
                    }
                },
                "chalk": {
                    "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.0.tgz",
                    "integrity": "sha512-qwx12AxXe2Q5xQ43Ac//I6v5aXTipYrSESdOgzrN+9XjgEpyjpKuvSGaN4qE93f7TQTlerQQ8S+EQ0EyDoVL1A==",
                    "dev": true,
                    "requires": {
                        "ansi-styles": "^4.1.0",
                        "supports-color": "^7.1.0"
                    }
                },
                "color-convert": {
                    "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
                    "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
                    "dev": true,
                    "requires": {
                        "color-name": "~1.1.4"
                    }
                },
                "color-name": {
                    "version": "1.1.4",
                    "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
                    "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
                    "dev": true
                },
                "debug": {
                    "version": "4.3.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.1.tgz",
                    "integrity": "sha512-doEwdvm4PCeK4K3RQN2ZC2BYUBaxwLARCqZmMjtF8a51J2Rb0xpVloFRnCODwqjpwnAoao4pelN8l3RJdv3gRQ==",
                    "dev": true,
                    "requires": {
                        "ms": "2.1.2"
                    }
                },
                "eslint-scope": {
                    "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.1.1.tgz",
                    "integrity": "sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==",
                    "dev": true,
                    "requires": {
                        "esrecurse": "^4.3.0",
                        "estraverse": "^4.1.1"
                    }
                },
                "glob-parent": {
                    "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
                    "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
                    "dev": true,
                    "requires": {
                        "is-glob": "^4.0.1"
                    }
                },
                "has-flag": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
                    "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
                    "dev": true
                },
                "is-extglob": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "dev": true
                },
                "is-glob": {
                    "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "dev": true,
                    "requires": {
                        "is-extglob": "^2.1.1"
                    }
                },
                "lru-cache": {
                    "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
                    "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
                    "dev": true,
                    "requires": {
                        "yallist": "^4.0.0"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                },
                "semver": {
                    "version": "7.3.4",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-7.3.4.tgz",
                    "integrity": "sha512-tCfb2WLjqFAtXn4KEdxIhalnRtoKFN7nAwj0B3ZXCbQloV2tq5eDbcTmT68JJD3nRJq24/XgxtQKFIpQdtvmVw==",
                    "dev": true,
                    "requires": {
                        "lru-cache": "^6.0.0"
                    }
                },
                "strip-ansi": {
                    "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
                    "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
                    "dev": true,
                    "requires": {
                        "ansi-regex": "^5.0.0"
                    }
                },
                "strip-json-comments": {
                    "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
                    "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
                    "dev": true
                },
                "supports-color": {
                    "version": "7.2.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
                    "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
                    "dev": true,
                    "requires": {
                        "has-flag": "^4.0.0"
                    }
                },
                "yallist": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
                    "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
                    "dev": true
                }
            }
        },
        "eslint-import-resolver-node": {
            "version": "0.3.4",
            "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.4.tgz",
            "integrity": "sha512-ogtf+5AB/O+nM6DIeBUNr2fuT7ot9Qg/1harBfBtaP13ekEWFQEEMP94BCB7zaNW3gyY+8SHYF00rnqYwXKWOA==",
            "dev": true,
            "requires": {
                "debug": "^2.6.9",
                "resolve": "^1.13.1"
            }
        },
        "eslint-module-utils": {
            "version": "2.6.0",
            "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.6.0.tgz",
            "integrity": "sha512-6j9xxegbqe8/kZY8cYpcp0xhbK0EgJlg3g9mib3/miLaExuuwc3n5UEfSnU6hWMbT0FAYVvDbL9RrRgpUeQIvA==",
            "dev": true,
            "requires": {
                "debug": "^2.6.9",
                "pkg-dir": "^2.0.0"
            },
            "dependencies": {
                "find-up": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "dev": true,
                    "requires": {
                        "locate-path": "^2.0.0"
                    }
                },
                "locate-path": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "dev": true,
                    "requires": {
                        "p-locate": "^2.0.0",
                        "path-exists": "^3.0.0"
                    }
                },
                "p-limit": {
                    "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "dev": true,
                    "requires": {
                        "p-try": "^1.0.0"
                    }
                },
                "p-locate": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "dev": true,
                    "requires": {
                        "p-limit": "^1.1.0"
                    }
                },
                "p-try": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
                    "dev": true
                },
                "pkg-dir": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
                    "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
                    "dev": true,
                    "requires": {
                        "find-up": "^2.1.0"
                    }
                }
            }
        },
        "eslint-plugin-import": {
            "version": "2.22.1",
            "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.22.1.tgz",
            "integrity": "sha512-8K7JjINHOpH64ozkAhpT3sd+FswIZTfMZTjdx052pnWrgRCVfp8op9tbjpAk3DdUeI/Ba4C8OjdC0r90erHEOw==",
            "dev": true,
            "requires": {
                "array-includes": "^3.1.1",
                "array.prototype.flat": "^1.2.3",
                "contains-path": "^0.1.0",
                "debug": "^2.6.9",
                "doctrine": "1.5.0",
                "eslint-import-resolver-node": "^0.3.4",
                "eslint-module-utils": "^2.6.0",
                "has": "^1.0.3",
                "minimatch": "^3.0.4",
                "object.values": "^1.1.1",
                "read-pkg-up": "^2.0.0",
                "resolve": "^1.17.0",
                "tsconfig-paths": "^3.9.0"
            },
            "dependencies": {
                "doctrine": {
                    "version": "1.5.0",
                    "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
                    "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
                    "dev": true,
                    "requires": {
                        "esutils": "^2.0.2",
                        "isarray": "^1.0.0"
                    }
                }
            }
        },
        "eslint-scope": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
            "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
            "requires": {
                "esrecurse": "^4.1.0",
                "estraverse": "^4.1.1"
            }
        },
        "eslint-utils": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/eslint-utils/-/eslint-utils-2.1.0.tgz",
            "integrity": "sha512-w94dQYoauyvlDc43XnGB8lU3Zt713vNChgt4EWwhXAP2XkBvndfxF0AgIqKOOasjPIPzj9JqgwkwbCYD0/V3Zg==",
            "dev": true,
            "requires": {
                "eslint-visitor-keys": "^1.1.0"
            },
            "dependencies": {
                "eslint-visitor-keys": {
                    "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.3.0.tgz",
                    "integrity": "sha512-6J72N8UNa462wa/KFODt/PJ3IU60SDpC3QXC1Hjc1BXXpfL2C9R5+AU7jhe0F6GREqVMh4Juu+NY7xn+6dipUQ==",
                    "dev": true
                }
            }
        },
        "eslint-visitor-keys": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-2.0.0.tgz",
            "integrity": "sha512-QudtT6av5WXels9WjIM7qz1XD1cWGvX4gGXvp/zBn9nXG02D0utdU3Em2m/QjTnrsk6bBjmCygl3rmj118msQQ==",
            "dev": true
        },
        "espree": {
            "version": "7.3.1",
            "resolved": "https://registry.npmjs.org/espree/-/espree-7.3.1.tgz",
            "integrity": "sha512-v3JCNCE64umkFpmkFGqzVKsOT0tN1Zr+ueqLZfpV1Ob8e+CEgPWa+OxCoGH3tnhimMKIaBm4m/vaRpJ/krRz2g==",
            "dev": true,
            "requires": {
                "acorn": "^7.4.0",
                "acorn-jsx": "^5.3.1",
                "eslint-visitor-keys": "^1.3.0"
            },
            "dependencies": {
                "acorn": {
                    "version": "7.4.1",
                    "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.4.1.tgz",
                    "integrity": "sha512-nQyp0o1/mNdbTO1PO6kHkwSrmgZ0MT/jCCpNiwbUjGoRN4dlBhqJtoQuCnEOKzgTVwg0ZWiCoQy6SxMebQVh8A==",
                    "dev": true
                },
                "acorn-jsx": {
                    "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.1.tgz",
                    "integrity": "sha512-K0Ptm/47OKfQRpNQ2J/oIN/3QYiK6FwW+eJbILhsdxh2WTLdl+30o8aGdTbm5JbffpFFAg/g+zi1E+jvJha5ng==",
                    "dev": true,
                    "requires": {}
                },
                "eslint-visitor-keys": {
                    "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.3.0.tgz",
                    "integrity": "sha512-6J72N8UNa462wa/KFODt/PJ3IU60SDpC3QXC1Hjc1BXXpfL2C9R5+AU7jhe0F6GREqVMh4Juu+NY7xn+6dipUQ==",
                    "dev": true
                }
            }
        },
        "esprima": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
            "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
            "dev": true
        },
        "esquery": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.4.0.tgz",
            "integrity": "sha512-cCDispWt5vHHtwMY2YrAQ4ibFkAL8RbH5YGBnZBc90MolvvfkkQcJro/aZiAQUlQ3qgrYS6D6v8Gc5G5CQsc9w==",
            "dev": true,
            "requires": {
                "estraverse": "^5.1.0"
            },
            "dependencies": {
                "estraverse": {
                    "version": "5.2.0",
                    "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.2.0.tgz",
                    "integrity": "sha512-BxbNGGNm0RyRYvUdHpIwv9IWzeM9XClbOxwoATuFdOE7ZE6wHL+HQ5T8hoPM+zHvmKzzsEqhgy0GrQ5X13afiQ==",
                    "dev": true
                }
            }
        },
        "esrecurse": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
            "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
            "requires": {
                "estraverse": "^5.2.0"
            },
            "dependencies": {
                "estraverse": {
                    "version": "5.2.0",
                    "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.2.0.tgz",
                    "integrity": "sha512-BxbNGGNm0RyRYvUdHpIwv9IWzeM9XClbOxwoATuFdOE7ZE6wHL+HQ5T8hoPM+zHvmKzzsEqhgy0GrQ5X13afiQ=="
                }
            }
        },
        "estraverse": {
            "version": "4.3.0",
            "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
            "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw=="
        },
        "esutils": {
            "version": "2.0.3",
            "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
            "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
            "dev": true
        },
        "event-target-shim": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
            "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ=="
        },
        "events": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/events/-/events-3.1.0.tgz",
            "integrity": "sha512-Rv+u8MLHNOdMjTAFeT3nCjHn2aGlx435FP/sDHNaRhDEMwyI/aB22Kj2qIN8R0cw3z28psEQLYwxVKLsKrMgWg=="
        },
        "evp_bytestokey": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
            "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
            "requires": {
                "md5.js": "^1.3.4",
                "safe-buffer": "^5.1.1"
            }
        },
        "expand-brackets": {
            "version": "0.1.5",
            "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
            "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
            "requires": {
                "is-posix-bracket": "^0.1.0"
            }
        },
        "expand-range": {
            "version": "1.8.2",
            "resolved": "https://registry.npmjs.org/expand-range/-/expand-range-1.8.2.tgz",
            "integrity": "sha1-opnv/TNf4nIeuujiV+x5ZE/IUzc=",
            "requires": {
                "fill-range": "^2.1.0"
            }
        },
        "extend": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
            "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
        },
        "extend-shallow": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
            "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
            "requires": {
                "assign-symbols": "^1.0.0",
                "is-extendable": "^1.0.1"
            },
            "dependencies": {
                "is-extendable": {
                    "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
                    "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
                    "requires": {
                        "is-plain-object": "^2.0.4"
                    }
                }
            }
        },
        "extglob": {
            "version": "0.3.2",
            "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
            "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
            "requires": {
                "is-extglob": "^1.0.0"
            }
        },
        "extsprintf": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
            "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU="
        },
        "fast-deep-equal": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.1.tgz",
            "integrity": "sha512-8UEa58QDLauDNfpbrX55Q9jrGHThw2ZMdOky5Gl1CDtVeJDPVrG4Jxx1N8jw2gkWaff5UUuX1KJd+9zGe2B+ZA=="
        },
        "fast-glob": {
            "version": "3.2.5",
            "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.2.5.tgz",
            "integrity": "sha512-2DtFcgT68wiTTiwZ2hNdJfcHNke9XOfnwmBRWXhmeKM8rF0TGwmC/Qto3S7RoZKp5cilZbxzO5iTNTQsJ+EeDg==",
            "dev": true,
            "requires": {
                "@nodelib/fs.stat": "^2.0.2",
                "@nodelib/fs.walk": "^1.2.3",
                "glob-parent": "^5.1.0",
                "merge2": "^1.3.0",
                "micromatch": "^4.0.2",
                "picomatch": "^2.2.1"
            },
            "dependencies": {
                "braces": {
                    "version": "3.0.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
                    "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
                    "dev": true,
                    "requires": {
                        "fill-range": "^7.0.1"
                    }
                },
                "fill-range": {
                    "version": "7.0.1",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
                    "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
                    "dev": true,
                    "requires": {
                        "to-regex-range": "^5.0.1"
                    }
                },
                "glob-parent": {
                    "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
                    "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
                    "dev": true,
                    "requires": {
                        "is-glob": "^4.0.1"
                    }
                },
                "is-extglob": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "dev": true
                },
                "is-glob": {
                    "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "dev": true,
                    "requires": {
                        "is-extglob": "^2.1.1"
                    }
                },
                "is-number": {
                    "version": "7.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
                    "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
                    "dev": true
                },
                "micromatch": {
                    "version": "4.0.2",
                    "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.2.tgz",
                    "integrity": "sha512-y7FpHSbMUMoyPbYUSzO6PaZ6FyRnQOpHuKwbo1G+Knck95XVU4QAiKdGEnj5wwoS7PlOgthX/09u5iFJ+aYf5Q==",
                    "dev": true,
                    "requires": {
                        "braces": "^3.0.1",
                        "picomatch": "^2.0.5"
                    }
                },
                "to-regex-range": {
                    "version": "5.0.1",
                    "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
                    "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
                    "dev": true,
                    "requires": {
                        "is-number": "^7.0.0"
                    }
                }
            }
        },
        "fast-json-stable-stringify": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
            "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="
        },
        "fast-levenshtein": {
            "version": "2.0.6",
            "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
            "integrity": "sha1-PYpcZog6FqMMqGQ+hR8Zuqd5eRc=",
            "dev": true
        },
        "fastq": {
            "version": "1.10.1",
            "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.10.1.tgz",
            "integrity": "sha512-AWuv6Ery3pM+dY7LYS8YIaCiQvUaos9OB1RyNgaOWnaX+Tik7Onvcsf8x8c+YtDeT0maYLniBip2hox5KtEXXA==",
            "dev": true,
            "requires": {
                "reusify": "^1.0.4"
            }
        },
        "figgy-pudding": {
            "version": "3.5.2",
            "resolved": "https://registry.npmjs.org/figgy-pudding/-/figgy-pudding-3.5.2.tgz",
            "integrity": "sha512-0btnI/H8f2pavGMN8w40mlSKOfTK2SVJmBfBeVIj3kNw0swwgzyRq0d5TJVOwodFmtvpPeWPN/MCcfuWF0Ezbw=="
        },
        "file-entry-cache": {
            "version": "6.0.0",
            "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-6.0.0.tgz",
            "integrity": "sha512-fqoO76jZ3ZnYrXLDRxBR1YvOvc0k844kcOg40bgsPrE25LAb/PDqTY+ho64Xh2c8ZXgIKldchCFHczG2UVRcWA==",
            "dev": true,
            "requires": {
                "flat-cache": "^3.0.4"
            }
        },
        "file-uri-to-path": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
            "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
            "optional": true
        },
        "filemanager-webpack-plugin": {
            "version": "2.0.5",
            "resolved": "https://registry.npmjs.org/filemanager-webpack-plugin/-/filemanager-webpack-plugin-2.0.5.tgz",
            "integrity": "sha512-Yj5XIdKI2AN2r66uZc4MZ/n18SMqe2KKlkAqHHMW1OwveDs2Vc5129CpbFcI73rq/rjqso+2HsxieS7u5sx6XA==",
            "requires": {
                "archiver": "^3.0.0",
                "cpx": "^1.5.0",
                "fs-extra": "^7.0.0",
                "make-dir": "^1.1.0",
                "mv": "^2.1.1",
                "rimraf": "^2.6.2"
            },
            "dependencies": {
                "fs-extra": {
                    "version": "7.0.1",
                    "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-7.0.1.tgz",
                    "integrity": "sha512-YJDaCJZEnBmcbw13fvdAM9AwNOJwOzrE4pqMqBq5nFiEqXUqHwlK4B+3pUw6JNvfSPtX05xFHtYy/1ni01eGCw==",
                    "requires": {
                        "graceful-fs": "^4.1.2",
                        "jsonfile": "^4.0.0",
                        "universalify": "^0.1.0"
                    }
                }
            }
        },
        "filename-regex": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/filename-regex/-/filename-regex-2.0.1.tgz",
            "integrity": "sha1-wcS5vuPglyXdsQa3XB4wH+LxiyY="
        },
        "fill-range": {
            "version": "2.2.4",
            "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-2.2.4.tgz",
            "integrity": "sha512-cnrcCbj01+j2gTG921VZPnHbjmdAf8oQV/iGeV2kZxGSyfYjjTyY79ErsK1WJWMpw6DaApEX72binqJE+/d+5Q==",
            "requires": {
                "is-number": "^2.1.0",
                "isobject": "^2.0.0",
                "randomatic": "^3.0.0",
                "repeat-element": "^1.1.2",
                "repeat-string": "^1.5.2"
            }
        },
        "find-cache-dir": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.1.0.tgz",
            "integrity": "sha512-Tq6PixE0w/VMFfCgbONnkiQIVol/JJL7nRMi20fqzA4NRs9AfeqMGeRdPi3wIhYkxjeBaWh2rxwapn5Tu3IqOQ==",
            "requires": {
                "commondir": "^1.0.1",
                "make-dir": "^2.0.0",
                "pkg-dir": "^3.0.0"
            },
            "dependencies": {
                "make-dir": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
                    "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
                    "requires": {
                        "pify": "^4.0.1",
                        "semver": "^5.6.0"
                    }
                }
            }
        },
        "find-index": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/find-index/-/find-index-0.1.1.tgz",
            "integrity": "sha1-Z101iyyjiS15Whq0cjL4tuLg3eQ="
        },
        "find-up": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
            "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
            "requires": {
                "locate-path": "^3.0.0"
            }
        },
        "flat": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/flat/-/flat-4.1.0.tgz",
            "integrity": "sha512-Px/TiLIznH7gEDlPXcUD4KnBusa6kR6ayRUVcnEAbreRIuhkqow/mun59BuRXwoYk7ZQOLW1ZM05ilIvK38hFw==",
            "dev": true,
            "requires": {
                "is-buffer": "~2.0.3"
            },
            "dependencies": {
                "is-buffer": {
                    "version": "2.0.4",
                    "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-2.0.4.tgz",
                    "integrity": "sha512-Kq1rokWXOPXWuaMAqZiJW4XxsmD9zGx9q4aePabbn3qCRGedtH7Cm+zV8WETitMfu1wdh+Rvd6w5egwSngUX2A==",
                    "dev": true
                }
            }
        },
        "flat-cache": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-3.0.4.tgz",
            "integrity": "sha512-dm9s5Pw7Jc0GvMYbshN6zchCA9RgQlzzEZX3vylR9IqFfS8XciblUXOKfW6SiuJ0e13eDYZoZV5wdrev7P3Nwg==",
            "dev": true,
            "requires": {
                "flatted": "^3.1.0",
                "rimraf": "^3.0.2"
            },
            "dependencies": {
                "rimraf": {
                    "version": "3.0.2",
                    "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
                    "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
                    "dev": true,
                    "requires": {
                        "glob": "^7.1.3"
                    }
                }
            }
        },
        "flatted": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.1.1.tgz",
            "integrity": "sha512-zAoAQiudy+r5SvnSw3KJy5os/oRJYHzrzja/tBDqrZtNhUw8bt6y8OBzMWcjWr+8liV8Eb6yOhw8WZ7VFZ5ZzA==",
            "dev": true
        },
        "flush-write-stream": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.1.1.tgz",
            "integrity": "sha512-3Z4XhFZ3992uIq0XOqb9AreonueSYphE6oYbpt5+3u06JWklbsPkNv3ZKkP9Bz/r+1MWCaMoSQ28P85+1Yc77w==",
            "requires": {
                "inherits": "^2.0.3",
                "readable-stream": "^2.3.6"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "for-in": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
            "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA="
        },
        "for-own": {
            "version": "0.1.5",
            "resolved": "https://registry.npmjs.org/for-own/-/for-own-0.1.5.tgz",
            "integrity": "sha1-UmXGgaTylNq78XyVCbZ2OqhFEM4=",
            "requires": {
                "for-in": "^1.0.1"
            }
        },
        "forever-agent": {
            "version": "0.6.1",
            "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
            "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE="
        },
        "form-data": {
            "version": "2.3.3",
            "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
            "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
            "requires": {
                "asynckit": "^0.4.0",
                "combined-stream": "^1.0.6",
                "mime-types": "^2.1.12"
            }
        },
        "fragment-cache": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
            "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
            "requires": {
                "map-cache": "^0.2.2"
            }
        },
        "from2": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
            "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
            "requires": {
                "inherits": "^2.0.1",
                "readable-stream": "^2.0.0"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "fs-constants": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
            "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow=="
        },
        "fs-extra": {
            "version": "8.1.0",
            "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-8.1.0.tgz",
            "integrity": "sha512-yhlQgA6mnOJUKOsRUFsgJdQCvkKhcz8tlZG5HBQfReYZy46OwLcY+Zia0mtdHsOo9y/hP+CxMN0TU9QxoOtG4g==",
            "requires": {
                "graceful-fs": "^4.2.0",
                "jsonfile": "^4.0.0",
                "universalify": "^0.1.0"
            }
        },
        "fs-write-stream-atomic": {
            "version": "1.0.10",
            "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
            "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
            "requires": {
                "graceful-fs": "^4.1.2",
                "iferr": "^0.1.5",
                "imurmurhash": "^0.1.4",
                "readable-stream": "1 || 2"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "fs.realpath": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
            "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="
        },
        "fsevents": {
            "version": "1.2.12",
            "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.12.tgz",
            "integrity": "sha512-Ggd/Ktt7E7I8pxZRbGIs7vwqAPscSESMrCSkx2FtWeqmheJgCo2R74fTsZFCifr0VTPwqRpPv17+6b8Zp7th0Q==",
            "optional": true,
            "requires": {
                "bindings": "^1.5.0",
                "nan": "^2.12.1",
                "node-pre-gyp": "*"
            },
            "dependencies": {
                "abbrev": {
                    "version": "1.1.1",
                    "integrity": "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q==",
                    "bundled": true,
                    "optional": true
                },
                "ansi-regex": {
                    "version": "2.1.1",
                    "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
                    "bundled": true,
                    "optional": true
                },
                "aproba": {
                    "version": "1.2.0",
                    "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
                    "bundled": true,
                    "optional": true
                },
                "are-we-there-yet": {
                    "version": "1.1.5",
                    "integrity": "sha512-5hYdAkZlcG8tOLujVDTgCT+uPX0VnpAH28gWsLfzpXYm7wP6mp5Q/gYyR7YQ0cKVJcXJnl3j2kpBan13PtQf6w==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "delegates": "^1.0.0",
                        "readable-stream": "^2.0.6"
                    }
                },
                "balanced-match": {
                    "version": "1.0.0",
                    "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c=",
                    "bundled": true,
                    "optional": true
                },
                "brace-expansion": {
                    "version": "1.1.11",
                    "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "balanced-match": "^1.0.0",
                        "concat-map": "0.0.1"
                    }
                },
                "chownr": {
                    "version": "1.1.4",
                    "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
                    "bundled": true,
                    "optional": true
                },
                "code-point-at": {
                    "version": "1.1.0",
                    "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c=",
                    "bundled": true,
                    "optional": true
                },
                "concat-map": {
                    "version": "0.0.1",
                    "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s=",
                    "bundled": true,
                    "optional": true
                },
                "console-control-strings": {
                    "version": "1.1.0",
                    "integrity": "sha1-PXz0Rk22RG6mRL9LOVB/mFEAjo4=",
                    "bundled": true,
                    "optional": true
                },
                "core-util-is": {
                    "version": "1.0.2",
                    "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac=",
                    "bundled": true,
                    "optional": true
                },
                "debug": {
                    "version": "3.2.6",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "ms": "^2.1.1"
                    }
                },
                "deep-extend": {
                    "version": "0.6.0",
                    "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA==",
                    "bundled": true,
                    "optional": true
                },
                "delegates": {
                    "version": "1.0.0",
                    "integrity": "sha1-hMbhWbgZBP3KWaDvRM2HDTElD5o=",
                    "bundled": true,
                    "optional": true
                },
                "detect-libc": {
                    "version": "1.0.3",
                    "integrity": "sha1-+hN8S9aY7fVc1c0CrFWfkaTEups=",
                    "bundled": true,
                    "optional": true
                },
                "fs-minipass": {
                    "version": "1.2.7",
                    "integrity": "sha512-GWSSJGFy4e9GUeCcbIkED+bgAoFyj7XF1mV8rma3QW4NIqX9Kyx79N/PF61H5udOV3aY1IaMLs6pGbH71nlCTA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "minipass": "^2.6.0"
                    }
                },
                "fs.realpath": {
                    "version": "1.0.0",
                    "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8=",
                    "bundled": true,
                    "optional": true
                },
                "gauge": {
                    "version": "2.7.4",
                    "integrity": "sha1-LANAXHU4w51+s3sxcCLjJfsBi/c=",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "aproba": "^1.0.3",
                        "console-control-strings": "^1.0.0",
                        "has-unicode": "^2.0.0",
                        "object-assign": "^4.1.0",
                        "signal-exit": "^3.0.0",
                        "string-width": "^1.0.1",
                        "strip-ansi": "^3.0.1",
                        "wide-align": "^1.1.0"
                    }
                },
                "glob": {
                    "version": "7.1.6",
                    "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "fs.realpath": "^1.0.0",
                        "inflight": "^1.0.4",
                        "inherits": "2",
                        "minimatch": "^3.0.4",
                        "once": "^1.3.0",
                        "path-is-absolute": "^1.0.0"
                    }
                },
                "has-unicode": {
                    "version": "2.0.1",
                    "integrity": "sha1-4Ob+aijPUROIVeCG0Wkedx3iqLk=",
                    "bundled": true,
                    "optional": true
                },
                "iconv-lite": {
                    "version": "0.4.24",
                    "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "safer-buffer": ">= 2.1.2 < 3"
                    }
                },
                "ignore-walk": {
                    "version": "3.0.3",
                    "integrity": "sha512-m7o6xuOaT1aqheYHKf8W6J5pYH85ZI9w077erOzLje3JsB1gkafkAhHHY19dqjulgIZHFm32Cp5uNZgcQqdJKw==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "minimatch": "^3.0.4"
                    }
                },
                "inflight": {
                    "version": "1.0.6",
                    "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "once": "^1.3.0",
                        "wrappy": "1"
                    }
                },
                "inherits": {
                    "version": "2.0.4",
                    "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
                    "bundled": true,
                    "optional": true
                },
                "ini": {
                    "version": "1.3.5",
                    "integrity": "sha512-RZY5huIKCMRWDUqZlEi72f/lmXKMvuszcMBduliQ3nnWbx9X/ZBQO7DijMEYS9EhHBb2qacRUMtC7svLwe0lcw==",
                    "bundled": true,
                    "optional": true
                },
                "is-fullwidth-code-point": {
                    "version": "1.0.0",
                    "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "number-is-nan": "^1.0.0"
                    }
                },
                "isarray": {
                    "version": "1.0.0",
                    "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE=",
                    "bundled": true,
                    "optional": true
                },
                "minimatch": {
                    "version": "3.0.4",
                    "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "brace-expansion": "^1.1.7"
                    }
                },
                "minimist": {
                    "version": "1.2.5",
                    "integrity": "sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw==",
                    "bundled": true,
                    "optional": true
                },
                "minipass": {
                    "version": "2.9.0",
                    "integrity": "sha512-wxfUjg9WebH+CUDX/CdbRlh5SmfZiy/hpkxaRI16Y9W56Pa75sWgd/rvFilSgrauD9NyFymP/+JFV3KwzIsJeg==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "safe-buffer": "^5.1.2",
                        "yallist": "^3.0.0"
                    }
                },
                "minizlib": {
                    "version": "1.3.3",
                    "integrity": "sha512-6ZYMOEnmVsdCeTJVE0W9ZD+pVnE8h9Hma/iOwwRDsdQoePpoX56/8B6z3P9VNwppJuBKNRuFDRNRqRWexT9G9Q==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "minipass": "^2.9.0"
                    }
                },
                "mkdirp": {
                    "version": "0.5.3",
                    "integrity": "sha512-P+2gwrFqx8lhew375MQHHeTlY8AuOJSrGf0R5ddkEndUkmwpgUob/vQuBD1V22/Cw1/lJr4x+EjllSezBThzBg==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "minimist": "^1.2.5"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "bundled": true,
                    "optional": true
                },
                "needle": {
                    "version": "2.3.3",
                    "integrity": "sha512-EkY0GeSq87rWp1hoq/sH/wnTWgFVhYlnIkbJ0YJFfRgEFlz2RraCjBpFQ+vrEgEdp0ThfyHADmkChEhcb7PKyw==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "debug": "^3.2.6",
                        "iconv-lite": "^0.4.4",
                        "sax": "^1.2.4"
                    }
                },
                "node-pre-gyp": {
                    "version": "0.14.0",
                    "integrity": "sha512-+CvDC7ZttU/sSt9rFjix/P05iS43qHCOOGzcr3Ry99bXG7VX953+vFyEuph/tfqoYu8dttBkE86JSKBO2OzcxA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "detect-libc": "^1.0.2",
                        "mkdirp": "^0.5.1",
                        "needle": "^2.2.1",
                        "nopt": "^4.0.1",
                        "npm-packlist": "^1.1.6",
                        "npmlog": "^4.0.2",
                        "rc": "^1.2.7",
                        "rimraf": "^2.6.1",
                        "semver": "^5.3.0",
                        "tar": "^4.4.2"
                    }
                },
                "nopt": {
                    "version": "4.0.3",
                    "integrity": "sha512-CvaGwVMztSMJLOeXPrez7fyfObdZqNUK1cPAEzLHrTybIua9pMdmmPR5YwtfNftIOMv3DPUhFaxsZMNTQO20Kg==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "abbrev": "1",
                        "osenv": "^0.1.4"
                    }
                },
                "npm-bundled": {
                    "version": "1.1.1",
                    "integrity": "sha512-gqkfgGePhTpAEgUsGEgcq1rqPXA+tv/aVBlgEzfXwA1yiUJF7xtEt3CtVwOjNYQOVknDk0F20w58Fnm3EtG0fA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "npm-normalize-package-bin": "^1.0.1"
                    }
                },
                "npm-normalize-package-bin": {
                    "version": "1.0.1",
                    "integrity": "sha512-EPfafl6JL5/rU+ot6P3gRSCpPDW5VmIzX959Ob1+ySFUuuYHWHekXpwdUZcKP5C+DS4GEtdJluwBjnsNDl+fSA==",
                    "bundled": true,
                    "optional": true
                },
                "npm-packlist": {
                    "version": "1.4.8",
                    "integrity": "sha512-5+AZgwru5IevF5ZdnFglB5wNlHG1AOOuw28WhUq8/8emhBmLv6jX5by4WJCh7lW0uSYZYS6DXqIsyZVIXRZU9A==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "ignore-walk": "^3.0.1",
                        "npm-bundled": "^1.0.1",
                        "npm-normalize-package-bin": "^1.0.1"
                    }
                },
                "npmlog": {
                    "version": "4.1.2",
                    "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "are-we-there-yet": "~1.1.2",
                        "console-control-strings": "~1.1.0",
                        "gauge": "~2.7.3",
                        "set-blocking": "~2.0.0"
                    }
                },
                "number-is-nan": {
                    "version": "1.0.1",
                    "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0=",
                    "bundled": true,
                    "optional": true
                },
                "object-assign": {
                    "version": "4.1.1",
                    "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM=",
                    "bundled": true,
                    "optional": true
                },
                "once": {
                    "version": "1.4.0",
                    "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "wrappy": "1"
                    }
                },
                "os-homedir": {
                    "version": "1.0.2",
                    "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M=",
                    "bundled": true,
                    "optional": true
                },
                "os-tmpdir": {
                    "version": "1.0.2",
                    "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ=",
                    "bundled": true,
                    "optional": true
                },
                "osenv": {
                    "version": "0.1.5",
                    "integrity": "sha512-0CWcCECdMVc2Rw3U5w9ZjqX6ga6ubk1xDVKxtBQPK7wis/0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "os-homedir": "^1.0.0",
                        "os-tmpdir": "^1.0.0"
                    }
                },
                "path-is-absolute": {
                    "version": "1.0.1",
                    "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18=",
                    "bundled": true,
                    "optional": true
                },
                "process-nextick-args": {
                    "version": "2.0.1",
                    "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==",
                    "bundled": true,
                    "optional": true
                },
                "rc": {
                    "version": "1.2.8",
                    "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "deep-extend": "^0.6.0",
                        "ini": "~1.3.0",
                        "minimist": "^1.2.0",
                        "strip-json-comments": "~2.0.1"
                    }
                },
                "readable-stream": {
                    "version": "2.3.7",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "rimraf": {
                    "version": "2.7.1",
                    "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "glob": "^7.1.3"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==",
                    "bundled": true,
                    "optional": true
                },
                "safer-buffer": {
                    "version": "2.1.2",
                    "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
                    "bundled": true,
                    "optional": true
                },
                "sax": {
                    "version": "1.2.4",
                    "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw==",
                    "bundled": true,
                    "optional": true
                },
                "semver": {
                    "version": "5.7.1",
                    "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
                    "bundled": true,
                    "optional": true
                },
                "set-blocking": {
                    "version": "2.0.0",
                    "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc=",
                    "bundled": true,
                    "optional": true
                },
                "signal-exit": {
                    "version": "3.0.2",
                    "integrity": "sha1-tf3AjxKH6hF4Yo5BXiUTK3NkbG0=",
                    "bundled": true,
                    "optional": true
                },
                "string_decoder": {
                    "version": "1.1.1",
                    "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "safe-buffer": "~5.1.0"
                    }
                },
                "string-width": {
                    "version": "1.0.2",
                    "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "code-point-at": "^1.0.0",
                        "is-fullwidth-code-point": "^1.0.0",
                        "strip-ansi": "^3.0.0"
                    }
                },
                "strip-ansi": {
                    "version": "3.0.1",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "ansi-regex": "^2.0.0"
                    }
                },
                "strip-json-comments": {
                    "version": "2.0.1",
                    "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo=",
                    "bundled": true,
                    "optional": true
                },
                "tar": {
                    "version": "4.4.13",
                    "integrity": "sha512-w2VwSrBoHa5BsSyH+KxEqeQBAllHhccyMFVHtGtdMpF4W7IRWfZjFiQceJPChOeTsSDVUpER2T8FA93pr0L+QA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "chownr": "^1.1.1",
                        "fs-minipass": "^1.2.5",
                        "minipass": "^2.8.6",
                        "minizlib": "^1.2.1",
                        "mkdirp": "^0.5.0",
                        "safe-buffer": "^5.1.2",
                        "yallist": "^3.0.3"
                    }
                },
                "util-deprecate": {
                    "version": "1.0.2",
                    "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8=",
                    "bundled": true,
                    "optional": true
                },
                "wide-align": {
                    "version": "1.1.3",
                    "integrity": "sha512-QGkOQc8XL6Bt5PwnsExKBPuMKBxnGxWWW3fU55Xt4feHozMUhdUMaBCk290qpm/wG5u/RSKzwdAC4i51YigihA==",
                    "bundled": true,
                    "optional": true,
                    "requires": {
                        "string-width": "^1.0.2 || 2"
                    }
                },
                "wrappy": {
                    "version": "1.0.2",
                    "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8=",
                    "bundled": true,
                    "optional": true
                },
                "yallist": {
                    "version": "3.1.1",
                    "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
                    "bundled": true,
                    "optional": true
                }
            }
        },
        "function-bind": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
            "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
        },
        "functional-red-black-tree": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/functional-red-black-tree/-/functional-red-black-tree-1.0.1.tgz",
            "integrity": "sha1-GwqzvVU7Kg1jmdKcDj6gslIHgyc=",
            "dev": true
        },
        "get-caller-file": {
            "version": "2.0.5",
            "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
            "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
            "dev": true
        },
        "get-intrinsic": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.1.1.tgz",
            "integrity": "sha512-kWZrnVM42QCiEA2Ig1bG8zjoIMOgxWwYCEeNdwY6Tv/cOSeGpcoX4pXHfKUxNKVoArnrEr2e9srnAxxGIraS9Q==",
            "dev": true,
            "requires": {
                "function-bind": "^1.1.1",
                "has": "^1.0.3",
                "has-symbols": "^1.0.1"
            }
        },
        "get-value": {
            "version": "2.0.6",
            "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
            "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg="
        },
        "getpass": {
            "version": "0.1.7",
            "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
            "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
            "requires": {
                "assert-plus": "^1.0.0"
            }
        },
        "glob": {
            "version": "7.1.6",
            "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
            "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
            "requires": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
            }
        },
        "glob-base": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/glob-base/-/glob-base-0.3.0.tgz",
            "integrity": "sha1-27Fk9iIbHAscz4Kuoyi0l98Oo8Q=",
            "requires": {
                "glob-parent": "^2.0.0",
                "is-glob": "^2.0.0"
            }
        },
        "glob-parent": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
            "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
            "requires": {
                "is-glob": "^2.0.0"
            }
        },
        "glob2base": {
            "version": "0.0.12",
            "resolved": "https://registry.npmjs.org/glob2base/-/glob2base-0.0.12.tgz",
            "integrity": "sha1-nUGbPijxLoOjYhZKJ3BVkiycDVY=",
            "requires": {
                "find-index": "^0.1.1"
            }
        },
        "globals": {
            "version": "12.4.0",
            "resolved": "https://registry.npmjs.org/globals/-/globals-12.4.0.tgz",
            "integrity": "sha512-BWICuzzDvDoH54NHKCseDanAhE3CeDorgDL5MT6LMXXj2WCnd9UC2szdk4AWLfjdgNBCXLUanXYcpBBKOSWGwg==",
            "dev": true,
            "requires": {
                "type-fest": "^0.8.1"
            }
        },
        "globby": {
            "version": "6.1.0",
            "resolved": "https://registry.npmjs.org/globby/-/globby-6.1.0.tgz",
            "integrity": "sha1-9abXDoOV4hyFj7BInWTfAkJNUGw=",
            "requires": {
                "array-union": "^1.0.1",
                "glob": "^7.0.3",
                "object-assign": "^4.0.1",
                "pify": "^2.0.0",
                "pinkie-promise": "^2.0.0"
            },
            "dependencies": {
                "pify": {
                    "version": "2.3.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
                    "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw="
                }
            }
        },
        "graceful-fs": {
            "version": "4.2.3",
            "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.3.tgz",
            "integrity": "sha512-a30VEBm4PEdx1dRB7MFK7BejejvCvBronbLjht+sHuGYj8PHs7M/5Z+rt5lw551vZ7yfTCj4Vuyy3mSJytDWRQ=="
        },
        "growl": {
            "version": "1.10.5",
            "resolved": "https://registry.npmjs.org/growl/-/growl-1.10.5.tgz",
            "integrity": "sha512-qBr4OuELkhPenW6goKVXiv47US3clb3/IbuWF9KNKEijAy9oeHxU9IgzjvJhHkUzhaj7rOUD7+YGWqUjLp5oSA==",
            "dev": true
        },
        "har-schema": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
            "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI="
        },
        "har-validator": {
            "version": "5.1.3",
            "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.3.tgz",
            "integrity": "sha512-sNvOCzEQNr/qrvJgc3UG/kD4QtlHycrzwS+6mfTrrSq97BvaYcPZZI1ZSqGSPR73Cxn4LKTD4PttRwfU7jWq5g==",
            "requires": {
                "ajv": "^6.5.5",
                "har-schema": "^2.0.0"
            }
        },
        "has": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
            "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
            "requires": {
                "function-bind": "^1.1.1"
            }
        },
        "has-flag": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
            "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0="
        },
        "has-symbols": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
            "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg==",
            "dev": true
        },
        "has-value": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
            "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
            "requires": {
                "get-value": "^2.0.6",
                "has-values": "^1.0.0",
                "isobject": "^3.0.0"
            },
            "dependencies": {
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "has-values": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
            "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
            "requires": {
                "is-number": "^3.0.0",
                "kind-of": "^4.0.0"
            },
            "dependencies": {
                "is-number": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                    "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                    "requires": {
                        "kind-of": "^3.0.2"
                    },
                    "dependencies": {
                        "kind-of": {
                            "version": "3.2.2",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                            "requires": {
                                "is-buffer": "^1.1.5"
                            }
                        }
                    }
                },
                "kind-of": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
                    "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
                    "requires": {
                        "is-buffer": "^1.1.5"
                    }
                }
            }
        },
        "hash-base": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.0.4.tgz",
            "integrity": "sha1-X8hoaEfs1zSZQDMZprCj8/auSRg=",
            "requires": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "hash.js": {
            "version": "1.1.7",
            "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
            "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
            "requires": {
                "inherits": "^2.0.3",
                "minimalistic-assert": "^1.0.1"
            }
        },
        "he": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
            "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw==",
            "dev": true
        },
        "hmac-drbg": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
            "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
            "requires": {
                "hash.js": "^1.0.3",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.1"
            }
        },
        "hosted-git-info": {
            "version": "2.8.8",
            "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.8.8.tgz",
            "integrity": "sha512-f/wzC2QaWBs7t9IYqB4T3sR1xviIViXJRJTWBlx2Gf3g0Xi5vI7Yy4koXQ1c9OYDGHN9sBy1DQ2AB8fqZBWhUg==",
            "dev": true
        },
        "http-proxy-agent": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-2.1.0.tgz",
            "integrity": "sha512-qwHbBLV7WviBl0rQsOzH6o5lwyOIvwp/BdFnvVxXORldu5TmjFfjzBcWUWS5kWAZhmv+JtiDhSuQCp4sBfbIgg==",
            "dev": true,
            "requires": {
                "agent-base": "4",
                "debug": "3.1.0"
            },
            "dependencies": {
                "debug": {
                    "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
                    "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
                    "dev": true,
                    "requires": {
                        "ms": "2.0.0"
                    }
                }
            }
        },
        "http-signature": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
            "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
            "requires": {
                "assert-plus": "^1.0.0",
                "jsprim": "^1.2.2",
                "sshpk": "^1.7.0"
            }
        },
        "https-browserify": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
            "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM="
        },
        "https-proxy-agent": {
            "version": "2.2.4",
            "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.4.tgz",
            "integrity": "sha512-OmvfoQ53WLjtA9HeYP9RNrWMJzzAz1JGaSFr1nijg0PVR1JaD/xbJq1mdEIIlxGpXp9eSe/O2LgU9DJmTPd0Eg==",
            "dev": true,
            "requires": {
                "agent-base": "^4.3.0",
                "debug": "^3.1.0"
            },
            "dependencies": {
                "debug": {
                    "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "dev": true,
                    "requires": {
                        "ms": "^2.1.1"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                }
            }
        },
        "ieee754": {
            "version": "1.1.13",
            "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
            "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
        },
        "iferr": {
            "version": "0.1.5",
            "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
            "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE="
        },
        "ignore": {
            "version": "4.0.6",
            "resolved": "https://registry.npmjs.org/ignore/-/ignore-4.0.6.tgz",
            "integrity": "sha512-cyFDKrqc/YdcWFniJhzI42+AzS+gNwmUzOSFcRCQYwySuBBBy/KjuxWLZ/FHEH6Moq1NizMOBWyTcv8O4OZIMg==",
            "dev": true
        },
        "import-fresh": {
            "version": "3.3.0",
            "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.0.tgz",
            "integrity": "sha512-veYYhQa+D1QBKznvhUHxb8faxlrwUnxseDAbAp457E0wLNio2bOSKnjYDhMj+YiAq61xrMGhQk9iXVk5FzgQMw==",
            "dev": true,
            "requires": {
                "parent-module": "^1.0.0",
                "resolve-from": "^4.0.0"
            }
        },
        "imurmurhash": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
            "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o="
        },
        "infer-owner": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/infer-owner/-/infer-owner-1.0.4.tgz",
            "integrity": "sha512-IClj+Xz94+d7irH5qRyfJonOdfTzuDaifE6ZPWfx0N0+/ATZCbuTPq2prFl526urkQd90WyUKIh1DfBQ2hMz9A=="
        },
        "inflight": {
            "version": "1.0.6",
            "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
            "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
            "requires": {
                "once": "^1.3.0",
                "wrappy": "1"
            }
        },
        "inherits": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
            "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
        },
        "ip-regex": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/ip-regex/-/ip-regex-2.1.0.tgz",
            "integrity": "sha1-+ni/XS5pE8kRzp+BnuUUa7bYROk="
        },
        "is-accessor-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
            "requires": {
                "kind-of": "^3.0.2"
            }
        },
        "is-arrayish": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
            "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0=",
            "dev": true
        },
        "is-binary-path": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
            "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
            "requires": {
                "binary-extensions": "^1.0.0"
            }
        },
        "is-buffer": {
            "version": "1.1.6",
            "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
            "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w=="
        },
        "is-callable": {
            "version": "1.2.3",
            "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.3.tgz",
            "integrity": "sha512-J1DcMe8UYTBSrKezuIUTUwjXsho29693unXM2YhJUTR2txK/eG47bvNa/wipPFmZFgr/N6f1GA66dv0mEyTIyQ==",
            "dev": true
        },
        "is-core-module": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.2.0.tgz",
            "integrity": "sha512-XRAfAdyyY5F5cOXn7hYQDqh2Xmii+DEfIcQGxK/uNwMHhIkPWO0g8msXcbzLe+MpGoR951MlqM/2iIlU4vKDdQ==",
            "requires": {
                "has": "^1.0.3"
            }
        },
        "is-data-descriptor": {
            "version": "0.1.4",
            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
            "requires": {
                "kind-of": "^3.0.2"
            }
        },
        "is-date-object": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.2.tgz",
            "integrity": "sha512-USlDT524woQ08aoZFzh3/Z6ch9Y/EWXEHQ/AaRN0SkKq4t2Jw2R2339tSXmwuVoY7LLlBCbOIlx2myP/L5zk0g==",
            "dev": true
        },
        "is-descriptor": {
            "version": "0.1.6",
            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
            "requires": {
                "is-accessor-descriptor": "^0.1.6",
                "is-data-descriptor": "^0.1.4",
                "kind-of": "^5.0.0"
            },
            "dependencies": {
                "kind-of": {
                    "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
                    "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
                }
            }
        },
        "is-dotfile": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/is-dotfile/-/is-dotfile-1.0.3.tgz",
            "integrity": "sha1-pqLzL/0t+wT1yiXs0Pa4PPeYoeE="
        },
        "is-equal-shallow": {
            "version": "0.1.3",
            "resolved": "https://registry.npmjs.org/is-equal-shallow/-/is-equal-shallow-0.1.3.tgz",
            "integrity": "sha1-IjgJj8Ih3gvPpdnqxMRdY4qhxTQ=",
            "requires": {
                "is-primitive": "^2.0.0"
            }
        },
        "is-extendable": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
            "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik="
        },
        "is-extglob": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
            "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA="
        },
        "is-fullwidth-code-point": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
            "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
            "dev": true
        },
        "is-glob": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
            "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
            "requires": {
                "is-extglob": "^1.0.0"
            }
        },
        "is-negative-zero": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.1.tgz",
            "integrity": "sha512-2z6JzQvZRa9A2Y7xC6dQQm4FSTSTNWjKIYYTt4246eMTJmIo0Q+ZyOsU66X8lxK1AbB92dFeglPLrhwpeRKO6w==",
            "dev": true
        },
        "is-number": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-number/-/is-number-2.1.0.tgz",
            "integrity": "sha1-Afy7s5NGOlSPL0ZszhbezknbkI8=",
            "requires": {
                "kind-of": "^3.0.2"
            }
        },
        "is-path-cwd": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/is-path-cwd/-/is-path-cwd-2.2.0.tgz",
            "integrity": "sha512-w942bTcih8fdJPJmQHFzkS76NEP8Kzzvmw92cXsazb8intwLqPibPPdXf4ANdKV3rYMuuQYGIWtvz9JilB3NFQ=="
        },
        "is-path-in-cwd": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-path-in-cwd/-/is-path-in-cwd-2.1.0.tgz",
            "integrity": "sha512-rNocXHgipO+rvnP6dk3zI20RpOtrAM/kzbB258Uw5BWr3TpXi861yzjo16Dn4hUox07iw5AyeMLHWsujkjzvRQ==",
            "requires": {
                "is-path-inside": "^2.1.0"
            }
        },
        "is-path-inside": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-2.1.0.tgz",
            "integrity": "sha512-wiyhTzfDWsvwAW53OBWF5zuvaOGlZ6PwYxAbPVDhpm+gM09xKQGjBq/8uYN12aDvMxnAnq3dxTyoSoRNmg5YFg==",
            "requires": {
                "path-is-inside": "^1.0.2"
            }
        },
        "is-plain-object": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
            "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
            "requires": {
                "isobject": "^3.0.1"
            },
            "dependencies": {
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "is-posix-bracket": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/is-posix-bracket/-/is-posix-bracket-0.1.1.tgz",
            "integrity": "sha1-MzTceXdDaOkvAW5vvAqI9c1ua8Q="
        },
        "is-primitive": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/is-primitive/-/is-primitive-2.0.0.tgz",
            "integrity": "sha1-IHurkWOEmcB7Kt8kCkGochADRXU="
        },
        "is-regex": {
            "version": "1.1.2",
            "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.1.2.tgz",
            "integrity": "sha512-axvdhb5pdhEVThqJzYXwMlVuZwC+FF2DpcOhTS+y/8jVq4trxyPgfcwIxIKiyeuLlSQYKkmUaPQJ8ZE4yNKXDg==",
            "dev": true,
            "requires": {
                "call-bind": "^1.0.2",
                "has-symbols": "^1.0.1"
            }
        },
        "is-string": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.0.5.tgz",
            "integrity": "sha512-buY6VNRjhQMiF1qWDouloZlQbRhDPCebwxSjxMjxgemYT46YMd2NR0/H+fBhEfWX4A/w9TBJ+ol+okqJKFE6vQ==",
            "dev": true
        },
        "is-symbol": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.3.tgz",
            "integrity": "sha512-OwijhaRSgqvhm/0ZdAcXNZt9lYdKFpcRDT5ULUuYXPoT794UNOdU+gpT6Rzo7b4V2HUl/op6GqY894AZwv9faQ==",
            "dev": true,
            "requires": {
                "has-symbols": "^1.0.1"
            }
        },
        "is-typedarray": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
            "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
        },
        "is-windows": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
            "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA=="
        },
        "is-wsl": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
            "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0="
        },
        "isarray": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
            "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE="
        },
        "isexe": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
            "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA=",
            "dev": true
        },
        "isobject": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
            "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
            "requires": {
                "isarray": "1.0.0"
            }
        },
        "isstream": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
            "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
        },
        "js-tokens": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
            "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
            "dev": true
        },
        "js-yaml": {
            "version": "3.13.1",
            "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.13.1.tgz",
            "integrity": "sha512-YfbcO7jXDdyj0DGxYVSlSeQNHbD7XPWvrVWeVUujrQEoZzWJIRrCPoyk6kL6IAjAG2IolMK4T0hNUe0HOUs5Jw==",
            "dev": true,
            "requires": {
                "argparse": "^1.0.7",
                "esprima": "^4.0.0"
            }
        },
        "jsbn": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
            "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
        },
        "json-parse-better-errors": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
            "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw=="
        },
        "json-schema": {
            "version": "0.2.3",
            "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
            "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM="
        },
        "json-schema-traverse": {
            "version": "0.4.1",
            "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
            "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
        },
        "json-stable-stringify-without-jsonify": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
            "integrity": "sha1-nbe1lJatPzz+8wp1FC0tkwrXJlE=",
            "dev": true
        },
        "json-stringify-safe": {
            "version": "5.0.1",
            "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
            "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
        },
        "json5": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
            "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
            "requires": {
                "minimist": "^1.2.0"
            }
        },
        "jsonfile": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
            "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
            "requires": {
                "graceful-fs": "^4.1.6"
            }
        },
        "jsprim": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
            "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
            "requires": {
                "assert-plus": "1.0.0",
                "extsprintf": "1.3.0",
                "json-schema": "0.2.3",
                "verror": "1.10.0"
            }
        },
        "jwa": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz",
            "integrity": "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==",
            "requires": {
                "buffer-equal-constant-time": "1.0.1",
                "ecdsa-sig-formatter": "1.0.11",
                "safe-buffer": "^5.0.1"
            }
        },
        "jws": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/jws/-/jws-3.2.2.tgz",
            "integrity": "sha512-YHlZCB6lMTllWDtSPHz/ZXTsi8S00usEV6v1tjq8tOUZzw7DpSDWVXjXDre6ed1w/pd495ODpHZYSdkRTsa0HA==",
            "requires": {
                "jwa": "^1.4.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "kind-of": {
            "version": "3.2.2",
            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
            "requires": {
                "is-buffer": "^1.1.5"
            }
        },
        "lazystream": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/lazystream/-/lazystream-1.0.0.tgz",
            "integrity": "sha1-9plf4PggOS9hOWvolGJAe7dxaOQ=",
            "requires": {
                "readable-stream": "^2.0.5"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "levn": {
            "version": "0.4.1",
            "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
            "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
            "dev": true,
            "requires": {
                "prelude-ls": "^1.2.1",
                "type-check": "~0.4.0"
            }
        },
        "load-json-file": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
            "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
            "dev": true,
            "requires": {
                "graceful-fs": "^4.1.2",
                "parse-json": "^2.2.0",
                "pify": "^2.0.0",
                "strip-bom": "^3.0.0"
            },
            "dependencies": {
                "pify": {
                    "version": "2.3.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
                    "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
                    "dev": true
                }
            }
        },
        "loader-runner": {
            "version": "2.4.0",
            "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.4.0.tgz",
            "integrity": "sha512-Jsmr89RcXGIwivFY21FcRrisYZfvLMTWx5kOLc+JTxtpBOG6xML0vzbc6SEQG2FO9/4Fc3wW4LVcB5DmGflaRw=="
        },
        "loader-utils": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.4.0.tgz",
            "integrity": "sha512-qH0WSMBtn/oHuwjy/NucEgbx5dbxxnxup9s4PVXJUDHZBQY+s0NWA9rJf53RBnQZxfch7euUui7hpoAPvALZdA==",
            "requires": {
                "big.js": "^5.2.2",
                "emojis-list": "^3.0.0",
                "json5": "^1.0.1"
            }
        },
        "locate-path": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
            "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
            "requires": {
                "p-locate": "^3.0.0",
                "path-exists": "^3.0.0"
            }
        },
        "lodash": {
            "version": "4.17.20",
            "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.20.tgz",
            "integrity": "sha512-PlhdFcillOINfeV7Ni6oF1TAEayyZBoZ8bcshTHqOYJYlrqzRK5hagpagky5o4HfCzzd1TRkXPMFq6cKk9rGmA=="
        },
        "lodash.defaults": {
            "version": "4.2.0",
            "resolved": "https://registry.npmjs.org/lodash.defaults/-/lodash.defaults-4.2.0.tgz",
            "integrity": "sha1-0JF4cW/+pN3p5ft7N/bwgCJ0WAw="
        },
        "lodash.difference": {
            "version": "4.5.0",
            "resolved": "https://registry.npmjs.org/lodash.difference/-/lodash.difference-4.5.0.tgz",
            "integrity": "sha1-nMtOUF1Ia5FlE0V3KIWi3yf9AXw="
        },
        "lodash.flatten": {
            "version": "4.4.0",
            "resolved": "https://registry.npmjs.org/lodash.flatten/-/lodash.flatten-4.4.0.tgz",
            "integrity": "sha1-8xwiIlqWMtK7+OSt2+8kCqdlph8="
        },
        "lodash.isplainobject": {
            "version": "4.0.6",
            "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
            "integrity": "sha1-fFJqUtibRcRcxpC4gWO+BJf1UMs="
        },
        "lodash.union": {
            "version": "4.6.0",
            "resolved": "https://registry.npmjs.org/lodash.union/-/lodash.union-4.6.0.tgz",
            "integrity": "sha1-SLtQiECfFvGCFmZkHETdGqrjzYg="
        },
        "log-symbols": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-3.0.0.tgz",
            "integrity": "sha512-dSkNGuI7iG3mfvDzUuYZyvk5dD9ocYCYzNU6CYDE6+Xqd+gwme6Z00NS3dUh8mq/73HaEtT7m6W+yUPtU6BZnQ==",
            "dev": true,
            "requires": {
                "chalk": "^2.4.2"
            }
        },
        "lru-cache": {
            "version": "5.1.1",
            "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
            "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
            "requires": {
                "yallist": "^3.0.2"
            }
        },
        "make-dir": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-1.3.0.tgz",
            "integrity": "sha512-2w31R7SJtieJJnQtGc7RVL2StM2vGYVfqUOvUDxH6bC6aJTxPxTF0GnIgCyu7tjockiUWAYQRbxa7vKn34s5sQ==",
            "requires": {
                "pify": "^3.0.0"
            },
            "dependencies": {
                "pify": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
                    "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
                }
            }
        },
        "make-error": {
            "version": "1.3.6",
            "resolved": "https://registry.npmjs.org/make-error/-/make-error-1.3.6.tgz",
            "integrity": "sha512-s8UhlNe7vPKomQhC1qFelMokr/Sc3AgNbso3n74mVPA5LTZwkB9NlXf4XPamLxJE8h0gh73rM94xvwRT2CVInw==",
            "dev": true
        },
        "map-cache": {
            "version": "0.2.2",
            "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
            "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8="
        },
        "map-visit": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
            "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
            "requires": {
                "object-visit": "^1.0.0"
            }
        },
        "math-random": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/math-random/-/math-random-1.0.4.tgz",
            "integrity": "sha512-rUxjysqif/BZQH2yhd5Aaq7vXMSx9NdEsQcyA07uEzIvxgI7zIr33gGsh+RU0/XjmQpCW7RsVof1vlkvQVCK5A=="
        },
        "md5": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/md5/-/md5-2.2.1.tgz",
            "integrity": "sha1-U6s41f48iJG6RlMp6iP6wFQBJvk=",
            "dev": true,
            "requires": {
                "charenc": "~0.0.1",
                "crypt": "~0.0.1",
                "is-buffer": "~1.1.1"
            }
        },
        "md5.js": {
            "version": "1.3.5",
            "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
            "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
            "requires": {
                "hash-base": "^3.0.0",
                "inherits": "^2.0.1",
                "safe-buffer": "^5.1.2"
            }
        },
        "memory-fs": {
            "version": "0.5.0",
            "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.5.0.tgz",
            "integrity": "sha512-jA0rdU5KoQMC0e6ppoNRtpp6vjFq6+NY7r8hywnC7V+1Xj/MtHwGIbB1QaK/dunyjWteJzmkpd7ooeWg10T7GA==",
            "requires": {
                "errno": "^0.1.3",
                "readable-stream": "^2.0.1"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "merge2": {
            "version": "1.4.1",
            "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
            "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
            "dev": true
        },
        "micromatch": {
            "version": "2.3.11",
            "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
            "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
            "requires": {
                "arr-diff": "^2.0.0",
                "array-unique": "^0.2.1",
                "braces": "^1.8.2",
                "expand-brackets": "^0.1.4",
                "extglob": "^0.3.1",
                "filename-regex": "^2.0.0",
                "is-extglob": "^1.0.0",
                "is-glob": "^2.0.1",
                "kind-of": "^3.0.2",
                "normalize-path": "^2.0.1",
                "object.omit": "^2.0.0",
                "parse-glob": "^3.0.4",
                "regex-cache": "^0.4.2"
            },
            "dependencies": {
                "normalize-path": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
                    "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
                    "requires": {
                        "remove-trailing-separator": "^1.0.1"
                    }
                }
            }
        },
        "miller-rabin": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
            "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
            "requires": {
                "bn.js": "^4.0.0",
                "brorand": "^1.0.1"
            }
        },
        "mime-db": {
            "version": "1.43.0",
            "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.43.0.tgz",
            "integrity": "sha512-+5dsGEEovYbT8UY9yD7eE4XTc4UwJ1jBYlgaQQF38ENsKR3wj/8q8RFZrF9WIZpB2V1ArTVFUva8sAul1NzRzQ=="
        },
        "mime-types": {
            "version": "2.1.26",
            "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.26.tgz",
            "integrity": "sha512-01paPWYgLrkqAyrlDorC1uDwl2p3qZT7yl806vW7DvDoxwXi46jsjFbg+WdwotBIk6/MbEhO/dh5aZ5sNj/dWQ==",
            "requires": {
                "mime-db": "1.43.0"
            }
        },
        "minimalistic-assert": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
            "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
        },
        "minimalistic-crypto-utils": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
            "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo="
        },
        "minimatch": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
            "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
            "requires": {
                "brace-expansion": "^1.1.7"
            }
        },
        "minimist": {
            "version": "1.2.5",
            "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.5.tgz",
            "integrity": "sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw=="
        },
        "mississippi": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
            "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
            "requires": {
                "concat-stream": "^1.5.0",
                "duplexify": "^3.4.2",
                "end-of-stream": "^1.1.0",
                "flush-write-stream": "^1.0.0",
                "from2": "^2.1.0",
                "parallel-transform": "^1.1.0",
                "pump": "^3.0.0",
                "pumpify": "^1.3.3",
                "stream-each": "^1.1.0",
                "through2": "^2.0.0"
            }
        },
        "mixin-deep": {
            "version": "1.3.2",
            "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.2.tgz",
            "integrity": "sha512-WRoDn//mXBiJ1H40rqa3vH0toePwSsGb45iInWlTySa+Uu4k3tYUSxa2v1KqAiLtvlrSzaExqS1gtk96A9zvEA==",
            "requires": {
                "for-in": "^1.0.2",
                "is-extendable": "^1.0.1"
            },
            "dependencies": {
                "is-extendable": {
                    "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
                    "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
                    "requires": {
                        "is-plain-object": "^2.0.4"
                    }
                }
            }
        },
        "mkdirp": {
            "version": "0.5.4",
            "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.4.tgz",
            "integrity": "sha512-iG9AK/dJLtJ0XNgTuDbSyNS3zECqDlAhnQW4CsNxBG3LQJBbHmRX1egw39DmtOdCAqY+dKXV+sgPgilNWUKMVw==",
            "requires": {
                "minimist": "^1.2.5"
            }
        },
        "mocha": {
            "version": "7.1.1",
            "resolved": "https://registry.npmjs.org/mocha/-/mocha-7.1.1.tgz",
            "integrity": "sha512-3qQsu3ijNS3GkWcccT5Zw0hf/rWvu1fTN9sPvEd81hlwsr30GX2GcDSSoBxo24IR8FelmrAydGC6/1J5QQP4WA==",
            "dev": true,
            "requires": {
                "ansi-colors": "3.2.3",
                "browser-stdout": "1.3.1",
                "chokidar": "3.3.0",
                "debug": "3.2.6",
                "diff": "3.5.0",
                "escape-string-regexp": "1.0.5",
                "find-up": "3.0.0",
                "glob": "7.1.3",
                "growl": "1.10.5",
                "he": "1.2.0",
                "js-yaml": "3.13.1",
                "log-symbols": "3.0.0",
                "minimatch": "3.0.4",
                "mkdirp": "0.5.3",
                "ms": "2.1.1",
                "node-environment-flags": "1.0.6",
                "object.assign": "4.1.0",
                "strip-json-comments": "2.0.1",
                "supports-color": "6.0.0",
                "which": "1.3.1",
                "wide-align": "1.1.3",
                "yargs": "13.3.2",
                "yargs-parser": "13.1.2",
                "yargs-unparser": "1.6.0"
            },
            "dependencies": {
                "anymatch": {
                    "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.1.tgz",
                    "integrity": "sha512-mM8522psRCqzV+6LhomX5wgp25YVibjh8Wj23I5RPkPppSVSjyKD2A2mBJmWGa+KN7f2D6LNh9jkBCeyLktzjg==",
                    "dev": true,
                    "requires": {
                        "normalize-path": "^3.0.0",
                        "picomatch": "^2.0.4"
                    }
                },
                "binary-extensions": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.0.0.tgz",
                    "integrity": "sha512-Phlt0plgpIIBOGTT/ehfFnbNlfsDEiqmzE2KRXoX1bLIlir4X/MR+zSyBEkL05ffWgnRSf/DXv+WrUAVr93/ow==",
                    "dev": true
                },
                "braces": {
                    "version": "3.0.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
                    "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
                    "dev": true,
                    "requires": {
                        "fill-range": "^7.0.1"
                    }
                },
                "chokidar": {
                    "version": "3.3.0",
                    "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.3.0.tgz",
                    "integrity": "sha512-dGmKLDdT3Gdl7fBUe8XK+gAtGmzy5Fn0XkkWQuYxGIgWVPPse2CxFA5mtrlD0TOHaHjEUqkWNyP1XdHoJES/4A==",
                    "dev": true,
                    "requires": {
                        "anymatch": "~3.1.1",
                        "braces": "~3.0.2",
                        "fsevents": "~2.1.1",
                        "glob-parent": "~5.1.0",
                        "is-binary-path": "~2.1.0",
                        "is-glob": "~4.0.1",
                        "normalize-path": "~3.0.0",
                        "readdirp": "~3.2.0"
                    }
                },
                "debug": {
                    "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "dev": true,
                    "requires": {
                        "ms": "^2.1.1"
                    }
                },
                "fill-range": {
                    "version": "7.0.1",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
                    "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
                    "dev": true,
                    "requires": {
                        "to-regex-range": "^5.0.1"
                    }
                },
                "fsevents": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.1.2.tgz",
                    "integrity": "sha512-R4wDiBwZ0KzpgOWetKDug1FZcYhqYnUYKtfZYt4mD5SBz76q0KR4Q9o7GIPamsVPGmW3EYPPJ0dOOjvx32ldZA==",
                    "dev": true,
                    "optional": true
                },
                "glob": {
                    "version": "7.1.3",
                    "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.3.tgz",
                    "integrity": "sha512-vcfuiIxogLV4DlGBHIUOwI0IbrJ8HWPc4MU7HzviGeNho/UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ==",
                    "dev": true,
                    "requires": {
                        "fs.realpath": "^1.0.0",
                        "inflight": "^1.0.4",
                        "inherits": "2",
                        "minimatch": "^3.0.4",
                        "once": "^1.3.0",
                        "path-is-absolute": "^1.0.0"
                    }
                },
                "glob-parent": {
                    "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
                    "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
                    "dev": true,
                    "requires": {
                        "is-glob": "^4.0.1"
                    }
                },
                "is-binary-path": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
                    "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
                    "dev": true,
                    "requires": {
                        "binary-extensions": "^2.0.0"
                    }
                },
                "is-extglob": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "dev": true
                },
                "is-glob": {
                    "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "dev": true,
                    "requires": {
                        "is-extglob": "^2.1.1"
                    }
                },
                "is-number": {
                    "version": "7.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
                    "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
                    "dev": true
                },
                "mkdirp": {
                    "version": "0.5.3",
                    "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.3.tgz",
                    "integrity": "sha512-P+2gwrFqx8lhew375MQHHeTlY8AuOJSrGf0R5ddkEndUkmwpgUob/vQuBD1V22/Cw1/lJr4x+EjllSezBThzBg==",
                    "dev": true,
                    "requires": {
                        "minimist": "^1.2.5"
                    }
                },
                "ms": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
                    "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg==",
                    "dev": true
                },
                "readdirp": {
                    "version": "3.2.0",
                    "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.2.0.tgz",
                    "integrity": "sha512-crk4Qu3pmXwgxdSgGhgA/eXiJAPQiX4GMOZZMXnqKxHX7TaoL+3gQVo/WeuAiogr07DpnfjIMpXXa+PAIvwPGQ==",
                    "dev": true,
                    "requires": {
                        "picomatch": "^2.0.4"
                    }
                },
                "supports-color": {
                    "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.0.0.tgz",
                    "integrity": "sha512-on9Kwidc1IUQo+bQdhi8+Tijpo0e1SS6RoGo2guUwn5vdaxw8RXOF9Vb2ws+ihWOmh4JnCJOvaziZWP1VABaLg==",
                    "dev": true,
                    "requires": {
                        "has-flag": "^3.0.0"
                    }
                },
                "to-regex-range": {
                    "version": "5.0.1",
                    "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
                    "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
                    "dev": true,
                    "requires": {
                        "is-number": "^7.0.0"
                    }
                }
            }
        },
        "mocha-junit-reporter": {
            "version": "1.23.3",
            "resolved": "https://registry.npmjs.org/mocha-junit-reporter/-/mocha-junit-reporter-1.23.3.tgz",
            "integrity": "sha512-ed8LqbRj1RxZfjt/oC9t12sfrWsjZ3gNnbhV1nuj9R/Jb5/P3Xb4duv2eCfCDMYH+fEu0mqca7m4wsiVjsxsvA==",
            "dev": true,
            "requires": {
                "debug": "^2.2.0",
                "md5": "^2.1.0",
                "mkdirp": "~0.5.1",
                "strip-ansi": "^4.0.0",
                "xml": "^1.0.0"
            }
        },
        "mocha-multi-reporters": {
            "version": "1.1.7",
            "resolved": "https://registry.npmjs.org/mocha-multi-reporters/-/mocha-multi-reporters-1.1.7.tgz",
            "integrity": "sha1-zH8/TTL0eFIJQdhSq7ZNmYhYfYI=",
            "dev": true,
            "requires": {
                "debug": "^3.1.0",
                "lodash": "^4.16.4"
            },
            "dependencies": {
                "debug": {
                    "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "dev": true,
                    "requires": {
                        "ms": "^2.1.1"
                    }
                },
                "ms": {
                    "version": "2.1.2",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
                    "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
                    "dev": true
                }
            }
        },
        "move-concurrently": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
            "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
            "requires": {
                "aproba": "^1.1.1",
                "copy-concurrently": "^1.0.0",
                "fs-write-stream-atomic": "^1.0.8",
                "mkdirp": "^0.5.1",
                "rimraf": "^2.5.4",
                "run-queue": "^1.0.3"
            }
        },
        "ms": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
            "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        },
        "mv": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/mv/-/mv-2.1.1.tgz",
            "integrity": "sha1-rmzg1vbV4KT32JN5jQPB6pVZtqI=",
            "requires": {
                "mkdirp": "~0.5.1",
                "ncp": "~2.0.0",
                "rimraf": "~2.4.0"
            },
            "dependencies": {
                "glob": {
                    "version": "6.0.4",
                    "resolved": "https://registry.npmjs.org/glob/-/glob-6.0.4.tgz",
                    "integrity": "sha1-DwiGD2oVUSey+t1PnOJLGqtuTSI=",
                    "requires": {
                        "inflight": "^1.0.4",
                        "inherits": "2",
                        "minimatch": "2 || 3",
                        "once": "^1.3.0",
                        "path-is-absolute": "^1.0.0"
                    }
                },
                "rimraf": {
                    "version": "2.4.5",
                    "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.4.5.tgz",
                    "integrity": "sha1-7nEM5dk6j9uFb7Xqj/Di11k0sto=",
                    "requires": {
                        "glob": "^6.0.1"
                    }
                }
            }
        },
        "nan": {
            "version": "2.14.0",
            "resolved": "https://registry.npmjs.org/nan/-/nan-2.14.0.tgz",
            "integrity": "sha512-INOFj37C7k3AfaNTtX8RhsTw7qRy7eLET14cROi9+5HAVbbHuIWUHEauBv5qT4Av2tWasiTY1Jw6puUNqRJXQg==",
            "optional": true
        },
        "nanomatch": {
            "version": "1.2.13",
            "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
            "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
            "requires": {
                "arr-diff": "^4.0.0",
                "array-unique": "^0.3.2",
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "fragment-cache": "^0.2.1",
                "is-windows": "^1.0.2",
                "kind-of": "^6.0.2",
                "object.pick": "^1.3.0",
                "regex-not": "^1.0.0",
                "snapdragon": "^0.8.1",
                "to-regex": "^3.0.1"
            },
            "dependencies": {
                "arr-diff": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
                    "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
                },
                "array-unique": {
                    "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
                    "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                }
            }
        },
        "natural-compare": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
            "integrity": "sha1-Sr6/7tdUHywnrPspvbvRXI1bpPc=",
            "dev": true
        },
        "ncp": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/ncp/-/ncp-2.0.0.tgz",
            "integrity": "sha1-GVoh1sRuNh0vsSgbo4uR6d9727M="
        },
        "neo-async": {
            "version": "2.6.1",
            "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.1.tgz",
            "integrity": "sha512-iyam8fBuCUpWeKPGpaNMetEocMt364qkCsfL9JuhjXX6dRnguRVOfk2GZaDpPjcOKiiXCPINZC1GczQ7iTq3Zw=="
        },
        "node-environment-flags": {
            "version": "1.0.6",
            "resolved": "https://registry.npmjs.org/node-environment-flags/-/node-environment-flags-1.0.6.tgz",
            "integrity": "sha512-5Evy2epuL+6TM0lCQGpFIj6KwiEsGh1SrHUhTbNX+sLbBtjidPZFAnVK9y5yU1+h//RitLbRHTIMyxQPtxMdHw==",
            "dev": true,
            "requires": {
                "object.getownpropertydescriptors": "^2.0.3",
                "semver": "^5.7.0"
            }
        },
        "node-fetch": {
            "version": "2.6.1",
            "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.1.tgz",
            "integrity": "sha512-V4aYg89jEoVRxRb2fJdAg8FHvI7cEyYdVAh94HH0UIK8oJxUfkjlDQN9RbMx+bEjP7+ggMiFRprSti032Oipxw=="
        },
        "node-libs-browser": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.2.1.tgz",
            "integrity": "sha512-h/zcD8H9kaDZ9ALUWwlBUDo6TKF8a7qBSCSEGfjTVIYeqsioSKaAX+BN7NgiMGp6iSIXZ3PxgCu8KS3b71YK5Q==",
            "requires": {
                "assert": "^1.1.1",
                "browserify-zlib": "^0.2.0",
                "buffer": "^4.3.0",
                "console-browserify": "^1.1.0",
                "constants-browserify": "^1.0.0",
                "crypto-browserify": "^3.11.0",
                "domain-browser": "^1.1.1",
                "events": "^3.0.0",
                "https-browserify": "^1.0.0",
                "os-browserify": "^0.3.0",
                "path-browserify": "0.0.1",
                "process": "^0.11.10",
                "punycode": "^1.2.4",
                "querystring-es3": "^0.2.0",
                "readable-stream": "^2.3.3",
                "stream-browserify": "^2.0.1",
                "stream-http": "^2.7.2",
                "string_decoder": "^1.0.0",
                "timers-browserify": "^2.0.4",
                "tty-browserify": "0.0.0",
                "url": "^0.11.0",
                "util": "^0.11.0",
                "vm-browserify": "^1.0.1"
            },
            "dependencies": {
                "buffer": {
                    "version": "4.9.2",
                    "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.2.tgz",
                    "integrity": "sha512-xq+q3SRMOxGivLhBNaUdC64hDTQwejJ+H0T/NB1XMtTVEwNTrfFF3gAxiyW0Bu/xWEGhjVKgUcMhCrUy2+uCWg==",
                    "requires": {
                        "base64-js": "^1.0.2",
                        "ieee754": "^1.1.4",
                        "isarray": "^1.0.0"
                    }
                },
                "punycode": {
                    "version": "1.4.1",
                    "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
                    "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
                },
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "normalize-package-data": {
            "version": "2.5.0",
            "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.5.0.tgz",
            "integrity": "sha512-/5CMN3T0R4XTj4DcGaexo+roZSdSFW/0AOOTROrjxzCG1wrWXEsGbRKevjlIL+ZDE4sZlJr5ED4YW0yqmkK+eA==",
            "dev": true,
            "requires": {
                "hosted-git-info": "^2.1.4",
                "resolve": "^1.10.0",
                "semver": "2 || 3 || 4 || 5",
                "validate-npm-package-license": "^3.0.1"
            }
        },
        "normalize-path": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
            "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="
        },
        "oauth-sign": {
            "version": "0.9.0",
            "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
            "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ=="
        },
        "object-assign": {
            "version": "4.1.1",
            "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
            "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM="
        },
        "object-copy": {
            "version": "0.1.0",
            "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
            "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
            "requires": {
                "copy-descriptor": "^0.1.0",
                "define-property": "^0.2.5",
                "kind-of": "^3.0.3"
            },
            "dependencies": {
                "define-property": {
                    "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                        "is-descriptor": "^0.1.0"
                    }
                }
            }
        },
        "object-inspect": {
            "version": "1.9.0",
            "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.9.0.tgz",
            "integrity": "sha512-i3Bp9iTqwhaLZBxGkRfo5ZbE07BQRT7MGu8+nNgwW9ItGp1TzCTw2DLEoWwjClxBjOFI/hWljTAmYGCEwmtnOw==",
            "dev": true
        },
        "object-keys": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
            "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
            "dev": true
        },
        "object-visit": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
            "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
            "requires": {
                "isobject": "^3.0.0"
            },
            "dependencies": {
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "object.assign": {
            "version": "4.1.0",
            "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.0.tgz",
            "integrity": "sha512-exHJeq6kBKj58mqGyTQ9DFvrZC/eR6OwxzoM9YRoGBqrXYonaFyGiFMuc9VZrXf7DarreEwMpurG3dd+CNyW5w==",
            "dev": true,
            "requires": {
                "define-properties": "^1.1.2",
                "function-bind": "^1.1.1",
                "has-symbols": "^1.0.0",
                "object-keys": "^1.0.11"
            }
        },
        "object.getownpropertydescriptors": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/object.getownpropertydescriptors/-/object.getownpropertydescriptors-2.1.0.tgz",
            "integrity": "sha512-Z53Oah9A3TdLoblT7VKJaTDdXdT+lQO+cNpKVnya5JDe9uLvzu1YyY1yFDFrcxrlRgWrEFH0jJtD/IbuwjcEVg==",
            "dev": true,
            "requires": {
                "define-properties": "^1.1.3",
                "es-abstract": "^1.17.0-next.1"
            }
        },
        "object.omit": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/object.omit/-/object.omit-2.0.1.tgz",
            "integrity": "sha1-Gpx0SCnznbuFjHbKNXmuKlTr0fo=",
            "requires": {
                "for-own": "^0.1.4",
                "is-extendable": "^0.1.1"
            }
        },
        "object.pick": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
            "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
            "requires": {
                "isobject": "^3.0.1"
            },
            "dependencies": {
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "object.values": {
            "version": "1.1.2",
            "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.1.2.tgz",
            "integrity": "sha512-MYC0jvJopr8EK6dPBiO8Nb9mvjdypOachO5REGk6MXzujbBrAisKo3HmdEI6kZDL6fC31Mwee/5YbtMebixeag==",
            "dev": true,
            "requires": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3",
                "es-abstract": "^1.18.0-next.1",
                "has": "^1.0.3"
            },
            "dependencies": {
                "es-abstract": {
                    "version": "1.18.0-next.2",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.0-next.2.tgz",
                    "integrity": "sha512-Ih4ZMFHEtZupnUh6497zEL4y2+w8+1ljnCyaTa+adcoafI1GOvMwFlDjBLfWR7y9VLfrjRJe9ocuHY1PSR9jjw==",
                    "dev": true,
                    "requires": {
                        "call-bind": "^1.0.2",
                        "es-to-primitive": "^1.2.1",
                        "function-bind": "^1.1.1",
                        "get-intrinsic": "^1.0.2",
                        "has": "^1.0.3",
                        "has-symbols": "^1.0.1",
                        "is-callable": "^1.2.2",
                        "is-negative-zero": "^2.0.1",
                        "is-regex": "^1.1.1",
                        "object-inspect": "^1.9.0",
                        "object-keys": "^1.1.1",
                        "object.assign": "^4.1.2",
                        "string.prototype.trimend": "^1.0.3",
                        "string.prototype.trimstart": "^1.0.3"
                    }
                },
                "object.assign": {
                    "version": "4.1.2",
                    "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
                    "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
                    "dev": true,
                    "requires": {
                        "call-bind": "^1.0.0",
                        "define-properties": "^1.1.3",
                        "has-symbols": "^1.0.1",
                        "object-keys": "^1.1.1"
                    }
                }
            }
        },
        "once": {
            "version": "1.4.0",
            "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
            "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
            "requires": {
                "wrappy": "1"
            }
        },
        "optionator": {
            "version": "0.9.1",
            "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.1.tgz",
            "integrity": "sha512-74RlY5FCnhq4jRxVUPKDaRwrVNXMqsGsiW6AJw4XK8hmtm10wC0ypZBLw5IIp85NZMr91+qd1RvvENwg7jjRFw==",
            "dev": true,
            "requires": {
                "deep-is": "^0.1.3",
                "fast-levenshtein": "^2.0.6",
                "levn": "^0.4.1",
                "prelude-ls": "^1.2.1",
                "type-check": "^0.4.0",
                "word-wrap": "^1.2.3"
            }
        },
        "os-browserify": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
            "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc="
        },
        "p-limit": {
            "version": "2.2.2",
            "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.2.tgz",
            "integrity": "sha512-WGR+xHecKTr7EbUEhyLSh5Dube9JtdiG78ufaeLxTgpudf/20KqyMioIUZJAezlTIi6evxuoUs9YXc11cU+yzQ==",
            "requires": {
                "p-try": "^2.0.0"
            }
        },
        "p-locate": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
            "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
            "requires": {
                "p-limit": "^2.0.0"
            }
        },
        "p-map": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/p-map/-/p-map-2.1.0.tgz",
            "integrity": "sha512-y3b8Kpd8OAN444hxfBbFfj1FY/RjtTd8tzYwhUqNYXx0fXx2iX4maP4Qr6qhIKbQXI02wTLAda4fYUbDagTUFw=="
        },
        "p-try": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
            "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
        },
        "pako": {
            "version": "1.0.11",
            "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.11.tgz",
            "integrity": "sha512-4hLB8Py4zZce5s4yd9XzopqwVv/yGNhV1Bl8NTmCq1763HeK2+EwVTv+leGeL13Dnh2wfbqowVPXCIO0z4taYw=="
        },
        "parallel-transform": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.2.0.tgz",
            "integrity": "sha512-P2vSmIu38uIlvdcU7fDkyrxj33gTUy/ABO5ZUbGowxNCopBq/OoD42bP4UmMrJoPyk4Uqf0mu3mtWBhHCZD8yg==",
            "requires": {
                "cyclist": "^1.0.1",
                "inherits": "^2.0.3",
                "readable-stream": "^2.1.5"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "parent-module": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
            "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
            "dev": true,
            "requires": {
                "callsites": "^3.0.0"
            }
        },
        "parse-asn1": {
            "version": "5.1.5",
            "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.5.tgz",
            "integrity": "sha512-jkMYn1dcJqF6d5CpU689bq7w/b5ALS9ROVSpQDPrZsqqesUJii9qutvoT5ltGedNXMO2e16YUWIghG9KxaViTQ==",
            "requires": {
                "asn1.js": "^4.0.0",
                "browserify-aes": "^1.0.0",
                "create-hash": "^1.1.0",
                "evp_bytestokey": "^1.0.0",
                "pbkdf2": "^3.0.3",
                "safe-buffer": "^5.1.1"
            }
        },
        "parse-glob": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/parse-glob/-/parse-glob-3.0.4.tgz",
            "integrity": "sha1-ssN2z7EfNVE7rdFz7wu246OIORw=",
            "requires": {
                "glob-base": "^0.3.0",
                "is-dotfile": "^1.0.0",
                "is-extglob": "^1.0.0",
                "is-glob": "^2.0.0"
            }
        },
        "parse-json": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
            "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
            "dev": true,
            "requires": {
                "error-ex": "^1.2.0"
            }
        },
        "pascalcase": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
            "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ="
        },
        "path-browserify": {
            "version": "0.0.1",
            "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.1.tgz",
            "integrity": "sha512-BapA40NHICOS+USX9SN4tyhq+A2RrN/Ws5F0Z5aMHDp98Fl86lX8Oti8B7uN93L4Ifv4fHOEA+pQw87gmMO/lQ=="
        },
        "path-dirname": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
            "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA=",
            "optional": true
        },
        "path-exists": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
            "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU="
        },
        "path-is-absolute": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
            "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18="
        },
        "path-is-inside": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/path-is-inside/-/path-is-inside-1.0.2.tgz",
            "integrity": "sha1-NlQX3t5EQw0cEa9hAn+s8HS9/FM="
        },
        "path-key": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
            "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
            "dev": true
        },
        "path-parse": {
            "version": "1.0.6",
            "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.6.tgz",
            "integrity": "sha512-GSmOT2EbHrINBf9SR7CDELwlJ8AENk3Qn7OikK4nFYAu3Ote2+JYNVvkpAEQm3/TLNEJFD/xZJjzyxg3KBWOzw=="
        },
        "path-type": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
            "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
            "dev": true,
            "requires": {
                "pify": "^2.0.0"
            },
            "dependencies": {
                "pify": {
                    "version": "2.3.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
                    "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
                    "dev": true
                }
            }
        },
        "pbkdf2": {
            "version": "3.0.17",
            "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.17.tgz",
            "integrity": "sha512-U/il5MsrZp7mGg3mSQfn742na2T+1/vHDCG5/iTI3X9MKUuYUZVLQhyRsg06mCgDBTd57TxzgZt7P+fYfjRLtA==",
            "requires": {
                "create-hash": "^1.1.2",
                "create-hmac": "^1.1.4",
                "ripemd160": "^2.0.1",
                "safe-buffer": "^5.0.1",
                "sha.js": "^2.4.8"
            }
        },
        "performance-now": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
            "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
        },
        "picomatch": {
            "version": "2.2.2",
            "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.2.2.tgz",
            "integrity": "sha512-q0M/9eZHzmr0AulXyPwNfZjtwZ/RBZlbN3K3CErVrk50T2ASYI7Bye0EvekFY3IP1Nt2DHu0re+V2ZHIpMkuWg==",
            "devOptional": true
        },
        "pify": {
            "version": "4.0.1",
            "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
            "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
        },
        "pinkie": {
            "version": "2.0.4",
            "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
            "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA="
        },
        "pinkie-promise": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
            "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
            "requires": {
                "pinkie": "^2.0.0"
            }
        },
        "pkg-dir": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
            "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
            "requires": {
                "find-up": "^3.0.0"
            }
        },
        "posix-character-classes": {
            "version": "0.1.1",
            "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
            "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs="
        },
        "prelude-ls": {
            "version": "1.2.1",
            "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
            "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
            "dev": true
        },
        "preserve": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/preserve/-/preserve-0.2.0.tgz",
            "integrity": "sha1-gV7R9uvGWSb4ZbMQwHE7yzMVzks="
        },
        "process": {
            "version": "0.11.10",
            "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
            "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI="
        },
        "process-nextick-args": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
            "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag=="
        },
        "progress": {
            "version": "2.0.3",
            "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",
            "integrity": "sha512-7PiHtLll5LdnKIMw100I+8xJXR5gW2QwWYkT6iJva0bXitZKa/XMrSbdmg3r2Xnaidz9Qumd0VPaMrZlF9V9sA==",
            "dev": true
        },
        "promise-inflight": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
            "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM="
        },
        "prr": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
            "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY="
        },
        "psl": {
            "version": "1.8.0",
            "resolved": "https://registry.npmjs.org/psl/-/psl-1.8.0.tgz",
            "integrity": "sha512-RIdOzyoavK+hA18OGGWDqUTsCLhtA7IcZ/6NCs4fFJaHBDab+pDDmDIByWFRQJq2Cd7r1OoQxBGKOaztq+hjIQ=="
        },
        "public-encrypt": {
            "version": "4.0.3",
            "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
            "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
            "requires": {
                "bn.js": "^4.1.0",
                "browserify-rsa": "^4.0.0",
                "create-hash": "^1.1.0",
                "parse-asn1": "^5.0.0",
                "randombytes": "^2.0.1",
                "safe-buffer": "^5.1.2"
            }
        },
        "pump": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
            "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
            "requires": {
                "end-of-stream": "^1.1.0",
                "once": "^1.3.1"
            }
        },
        "pumpify": {
            "version": "1.5.1",
            "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.5.1.tgz",
            "integrity": "sha512-oClZI37HvuUJJxSKKrC17bZ9Cu0ZYhEAGPsPUy9KlMUmv9dKX2o77RUmq7f3XjIxbwyGwYzbzQ1L2Ks8sIradQ==",
            "requires": {
                "duplexify": "^3.6.0",
                "inherits": "^2.0.3",
                "pump": "^2.0.0"
            },
            "dependencies": {
                "pump": {
                    "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
                    "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
                    "requires": {
                        "end-of-stream": "^1.1.0",
                        "once": "^1.3.1"
                    }
                }
            }
        },
        "punycode": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
            "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A=="
        },
        "qs": {
            "version": "6.5.2",
            "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.2.tgz",
            "integrity": "sha512-N5ZAX4/LxJmF+7wN74pUD6qAh9/wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91/odN2dW/WOl7qQHNDGA=="
        },
        "querystring": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
            "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA="
        },
        "querystring-es3": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
            "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM="
        },
        "queue-microtask": {
            "version": "1.2.2",
            "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.2.tgz",
            "integrity": "sha512-dB15eXv3p2jDlbOiNLyMabYg1/sXvppd8DP2J3EOCQ0AkuSXCW2tP7mnVouVLJKgUMY6yP0kcQDVpLCN13h4Xg==",
            "dev": true
        },
        "randomatic": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/randomatic/-/randomatic-3.1.1.tgz",
            "integrity": "sha512-TuDE5KxZ0J461RVjrJZCJc+J+zCkTb1MbH9AQUq68sMhOMcy9jLcb3BrZKgp9q9Ncltdg4QVqWrH02W2EFFVYw==",
            "requires": {
                "is-number": "^4.0.0",
                "kind-of": "^6.0.0",
                "math-random": "^1.0.1"
            },
            "dependencies": {
                "is-number": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
                    "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ=="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                }
            }
        },
        "randombytes": {
            "version": "2.1.0",
            "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
            "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
            "requires": {
                "safe-buffer": "^5.1.0"
            }
        },
        "randomfill": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
            "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
            "requires": {
                "randombytes": "^2.0.5",
                "safe-buffer": "^5.1.0"
            }
        },
        "read-pkg": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
            "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
            "dev": true,
            "requires": {
                "load-json-file": "^2.0.0",
                "normalize-package-data": "^2.3.2",
                "path-type": "^2.0.0"
            }
        },
        "read-pkg-up": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
            "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
            "dev": true,
            "requires": {
                "find-up": "^2.0.0",
                "read-pkg": "^2.0.0"
            },
            "dependencies": {
                "find-up": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "dev": true,
                    "requires": {
                        "locate-path": "^2.0.0"
                    }
                },
                "locate-path": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "dev": true,
                    "requires": {
                        "p-locate": "^2.0.0",
                        "path-exists": "^3.0.0"
                    }
                },
                "p-limit": {
                    "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "dev": true,
                    "requires": {
                        "p-try": "^1.0.0"
                    }
                },
                "p-locate": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "dev": true,
                    "requires": {
                        "p-limit": "^1.1.0"
                    }
                },
                "p-try": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
                    "dev": true
                }
            }
        },
        "readable-stream": {
            "version": "3.6.0",
            "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
            "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
            "requires": {
                "inherits": "^2.0.3",
                "string_decoder": "^1.1.1",
                "util-deprecate": "^1.0.1"
            }
        },
        "readdirp": {
            "version": "2.2.1",
            "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
            "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
            "requires": {
                "graceful-fs": "^4.1.11",
                "micromatch": "^3.1.10",
                "readable-stream": "^2.0.2"
            },
            "dependencies": {
                "arr-diff": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
                    "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
                },
                "array-unique": {
                    "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
                    "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
                },
                "braces": {
                    "version": "2.3.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
                    "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
                    "requires": {
                        "arr-flatten": "^1.1.0",
                        "array-unique": "^0.3.2",
                        "extend-shallow": "^2.0.1",
                        "fill-range": "^4.0.0",
                        "isobject": "^3.0.1",
                        "repeat-element": "^1.1.2",
                        "snapdragon": "^0.8.1",
                        "snapdragon-node": "^2.0.1",
                        "split-string": "^3.0.2",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "expand-brackets": {
                    "version": "2.1.4",
                    "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
                    "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
                    "requires": {
                        "debug": "^2.3.3",
                        "define-property": "^0.2.5",
                        "extend-shallow": "^2.0.1",
                        "posix-character-classes": "^0.1.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "0.2.5",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                            "requires": {
                                "is-descriptor": "^0.1.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        },
                        "is-accessor-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
                            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-data-descriptor": {
                            "version": "0.1.4",
                            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
                            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
                            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
                            "requires": {
                                "is-accessor-descriptor": "^0.1.6",
                                "is-data-descriptor": "^0.1.4",
                                "kind-of": "^5.0.0"
                            }
                        },
                        "kind-of": {
                            "version": "5.1.0",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
                            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
                        }
                    }
                },
                "extglob": {
                    "version": "2.0.4",
                    "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
                    "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
                    "requires": {
                        "array-unique": "^0.3.2",
                        "define-property": "^1.0.0",
                        "expand-brackets": "^2.1.4",
                        "extend-shallow": "^2.0.1",
                        "fragment-cache": "^0.2.1",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "1.0.0",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                            "requires": {
                                "is-descriptor": "^1.0.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "fill-range": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
                    "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
                    "requires": {
                        "extend-shallow": "^2.0.1",
                        "is-number": "^3.0.0",
                        "repeat-string": "^1.6.1",
                        "to-regex-range": "^2.1.0"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "is-number": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                    "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                    "requires": {
                        "kind-of": "^3.0.2"
                    },
                    "dependencies": {
                        "kind-of": {
                            "version": "3.2.2",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                            "requires": {
                                "is-buffer": "^1.1.5"
                            }
                        }
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                },
                "micromatch": {
                    "version": "3.1.10",
                    "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
                    "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
                    "requires": {
                        "arr-diff": "^4.0.0",
                        "array-unique": "^0.3.2",
                        "braces": "^2.3.1",
                        "define-property": "^2.0.2",
                        "extend-shallow": "^3.0.2",
                        "extglob": "^2.0.4",
                        "fragment-cache": "^0.2.1",
                        "kind-of": "^6.0.2",
                        "nanomatch": "^1.2.9",
                        "object.pick": "^1.3.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.2"
                    }
                },
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "regenerator-runtime": {
            "version": "0.11.1",
            "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
            "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg=="
        },
        "regex-cache": {
            "version": "0.4.4",
            "resolved": "https://registry.npmjs.org/regex-cache/-/regex-cache-0.4.4.tgz",
            "integrity": "sha512-nVIZwtCjkC9YgvWkpM55B5rBhBYRZhAaJbgcFYXXsHnbZ9UZI9nnVWYZpBlCqv9ho2eZryPnWrZGsOdPwVWXWQ==",
            "requires": {
                "is-equal-shallow": "^0.1.3"
            }
        },
        "regex-not": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
            "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
            "requires": {
                "extend-shallow": "^3.0.2",
                "safe-regex": "^1.1.0"
            }
        },
        "regexpp": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/regexpp/-/regexpp-3.1.0.tgz",
            "integrity": "sha512-ZOIzd8yVsQQA7j8GCSlPGXwg5PfmA1mrq0JP4nGhh54LaKN3xdai/vHUDu74pKwV8OxseMS65u2NImosQcSD0Q==",
            "dev": true
        },
        "remove-trailing-separator": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
            "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8="
        },
        "repeat-element": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.3.tgz",
            "integrity": "sha512-ahGq0ZnV5m5XtZLMb+vP76kcAM5nkLqk0lpqAuojSKGgQtn4eRi4ZZGm2olo2zKFH+sMsWaqOCW1dqAnOru72g=="
        },
        "repeat-string": {
            "version": "1.6.1",
            "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
            "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc="
        },
        "request": {
            "version": "2.88.2",
            "resolved": "https://registry.npmjs.org/request/-/request-2.88.2.tgz",
            "integrity": "sha512-MsvtOrfG9ZcrOwAW+Qi+F6HbD0CWXEh9ou77uOb7FM2WPhwT7smM833PzanhJLsgXjN89Ir6V2PczXNnMpwKhw==",
            "requires": {
                "aws-sign2": "~0.7.0",
                "aws4": "^1.8.0",
                "caseless": "~0.12.0",
                "combined-stream": "~1.0.6",
                "extend": "~3.0.2",
                "forever-agent": "~0.6.1",
                "form-data": "~2.3.2",
                "har-validator": "~5.1.3",
                "http-signature": "~1.2.0",
                "is-typedarray": "~1.0.0",
                "isstream": "~0.1.2",
                "json-stringify-safe": "~5.0.1",
                "mime-types": "~2.1.19",
                "oauth-sign": "~0.9.0",
                "performance-now": "^2.1.0",
                "qs": "~6.5.2",
                "safe-buffer": "^5.1.2",
                "tough-cookie": "~2.5.0",
                "tunnel-agent": "^0.6.0",
                "uuid": "^3.3.2"
            }
        },
        "require-directory": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
            "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I=",
            "dev": true
        },
        "require-from-string": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
            "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
            "dev": true
        },
        "require-main-filename": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
            "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg==",
            "dev": true
        },
        "resolve": {
            "version": "1.20.0",
            "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.20.0.tgz",
            "integrity": "sha512-wENBPt4ySzg4ybFQW2TT1zMQucPK95HSh/nq2CFTZVOGut2+pQvSsgtda4d26YrYcr067wjbmzOG8byDPBX63A==",
            "requires": {
                "is-core-module": "^2.2.0",
                "path-parse": "^1.0.6"
            }
        },
        "resolve-from": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
            "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
            "dev": true
        },
        "resolve-url": {
            "version": "0.2.1",
            "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
            "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo="
        },
        "ret": {
            "version": "0.1.15",
            "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
            "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg=="
        },
        "reusify": {
            "version": "1.0.4",
            "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
            "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
            "dev": true
        },
        "rimraf": {
            "version": "2.7.1",
            "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
            "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
            "requires": {
                "glob": "^7.1.3"
            }
        },
        "ripemd160": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
            "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
            "requires": {
                "hash-base": "^3.0.0",
                "inherits": "^2.0.1"
            }
        },
        "run-parallel": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
            "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
            "dev": true,
            "requires": {
                "queue-microtask": "^1.2.2"
            }
        },
        "run-queue": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
            "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
            "requires": {
                "aproba": "^1.1.1"
            }
        },
        "safe-buffer": {
            "version": "5.2.0",
            "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.0.tgz",
            "integrity": "sha512-fZEwUGbVl7kouZs1jCdMLdt95hdIv0ZeHg6L7qPeciMZhZ+/gdesW4wgTARkrFWEpspjEATAzUGPG8N2jJiwbg=="
        },
        "safe-regex": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
            "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
            "requires": {
                "ret": "~0.1.10"
            }
        },
        "safer-buffer": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
            "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
        },
        "sax": {
            "version": "1.2.4",
            "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
            "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
        },
        "schema-utils": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
            "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
            "requires": {
                "ajv": "^6.1.0",
                "ajv-errors": "^1.0.0",
                "ajv-keywords": "^3.1.0"
            }
        },
        "semver": {
            "version": "5.7.1",
            "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
            "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
        },
        "serialize-javascript": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-4.0.0.tgz",
            "integrity": "sha512-GaNA54380uFefWghODBWEGisLZFj00nS5ACs6yHa9nLqlLpVLO8ChDGeKRjZnV4Nh4n0Qi7nhYZD/9fCPzEqkw==",
            "requires": {
                "randombytes": "^2.1.0"
            }
        },
        "set-blocking": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
            "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc=",
            "dev": true
        },
        "set-value": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.1.tgz",
            "integrity": "sha512-JxHc1weCN68wRY0fhCoXpyK55m/XPHafOmK4UWD7m2CI14GMcFypt4w/0+NV5f/ZMby2F6S2wwA7fgynh9gWSw==",
            "requires": {
                "extend-shallow": "^2.0.1",
                "is-extendable": "^0.1.1",
                "is-plain-object": "^2.0.3",
                "split-string": "^3.0.1"
            },
            "dependencies": {
                "extend-shallow": {
                    "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                        "is-extendable": "^0.1.0"
                    }
                }
            }
        },
        "setimmediate": {
            "version": "1.0.5",
            "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
            "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU="
        },
        "sha.js": {
            "version": "2.4.11",
            "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
            "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
            "requires": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
            }
        },
        "shebang-command": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
            "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
            "dev": true,
            "requires": {
                "shebang-regex": "^3.0.0"
            }
        },
        "shebang-regex": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
            "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
            "dev": true
        },
        "shell-quote": {
            "version": "1.7.2",
            "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.7.2.tgz",
            "integrity": "sha512-mRz/m/JVscCrkMyPqHc/bczi3OQHkLTqXHEFu0zDhK/qfv3UcOA4SVmRCLmos4bhjr9ekVQubj/R7waKapmiQg=="
        },
        "slash": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/slash/-/slash-3.0.0.tgz",
            "integrity": "sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q==",
            "dev": true
        },
        "slice-ansi": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-4.0.0.tgz",
            "integrity": "sha512-qMCMfhY040cVHT43K9BFygqYbUPFZKHOg7K73mtTWJRb8pyP3fzf4Ixd5SzdEJQ6MRUg/WBnOLxghZtKKurENQ==",
            "dev": true,
            "requires": {
                "ansi-styles": "^4.0.0",
                "astral-regex": "^2.0.0",
                "is-fullwidth-code-point": "^3.0.0"
            },
            "dependencies": {
                "ansi-styles": {
                    "version": "4.3.0",
                    "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
                    "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
                    "dev": true,
                    "requires": {
                        "color-convert": "^2.0.1"
                    }
                },
                "color-convert": {
                    "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
                    "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
                    "dev": true,
                    "requires": {
                        "color-name": "~1.1.4"
                    }
                },
                "color-name": {
                    "version": "1.1.4",
                    "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
                    "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
                    "dev": true
                },
                "is-fullwidth-code-point": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
                    "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
                    "dev": true
                }
            }
        },
        "snapdragon": {
            "version": "0.8.2",
            "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
            "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
            "requires": {
                "base": "^0.11.1",
                "debug": "^2.2.0",
                "define-property": "^0.2.5",
                "extend-shallow": "^2.0.1",
                "map-cache": "^0.2.2",
                "source-map": "^0.5.6",
                "source-map-resolve": "^0.5.0",
                "use": "^3.1.0"
            },
            "dependencies": {
                "define-property": {
                    "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                        "is-descriptor": "^0.1.0"
                    }
                },
                "extend-shallow": {
                    "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                        "is-extendable": "^0.1.0"
                    }
                },
                "source-map": {
                    "version": "0.5.7",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
                    "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
                }
            }
        },
        "snapdragon-node": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
            "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
            "requires": {
                "define-property": "^1.0.0",
                "isobject": "^3.0.0",
                "snapdragon-util": "^3.0.1"
            },
            "dependencies": {
                "define-property": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                    "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                    "requires": {
                        "is-descriptor": "^1.0.0"
                    }
                },
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                }
            }
        },
        "snapdragon-util": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
            "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
            "requires": {
                "kind-of": "^3.2.0"
            }
        },
        "source-list-map": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.1.tgz",
            "integrity": "sha512-qnQ7gVMxGNxsiL4lEuJwe/To8UnK7fAnmbGEEH8RpLouuKbeEm0lhbQVFIrNSuB+G7tVrAlVsZgETT5nljf+Iw=="
        },
        "source-map": {
            "version": "0.6.1",
            "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
            "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        },
        "source-map-resolve": {
            "version": "0.5.3",
            "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.3.tgz",
            "integrity": "sha512-Htz+RnsXWk5+P2slx5Jh3Q66vhQj1Cllm0zvnaY98+NFx+Dv2CF/f5O/t8x+KaNdrdIAsruNzoh/KpialbqAnw==",
            "requires": {
                "atob": "^2.1.2",
                "decode-uri-component": "^0.2.0",
                "resolve-url": "^0.2.1",
                "source-map-url": "^0.4.0",
                "urix": "^0.1.0"
            }
        },
        "source-map-support": {
            "version": "0.5.16",
            "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.16.tgz",
            "integrity": "sha512-efyLRJDr68D9hBBNIPWFjhpFzURh+KJykQwvMyW5UiZzYwoF6l4YMMDIJJEyFWxWCqfyxLzz6tSfUFR+kXXsVQ==",
            "requires": {
                "buffer-from": "^1.0.0",
                "source-map": "^0.6.0"
            }
        },
        "source-map-url": {
            "version": "0.4.0",
            "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
            "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM="
        },
        "spdx-correct": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.1.1.tgz",
            "integrity": "sha512-cOYcUWwhCuHCXi49RhFRCyJEK3iPj1Ziz9DpViV3tbZOwXD49QzIN3MpOLJNxh2qwq2lJJZaKMVw9qNi4jTC0w==",
            "dev": true,
            "requires": {
                "spdx-expression-parse": "^3.0.0",
                "spdx-license-ids": "^3.0.0"
            }
        },
        "spdx-exceptions": {
            "version": "2.3.0",
            "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.3.0.tgz",
            "integrity": "sha512-/tTrYOC7PPI1nUAgx34hUpqXuyJG+DTHJTnIULG4rDygi4xu/tfgmq1e1cIRwRzwZgo4NLySi+ricLkZkw4i5A==",
            "dev": true
        },
        "spdx-expression-parse": {
            "version": "3.0.1",
            "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.1.tgz",
            "integrity": "sha512-cbqHunsQWnJNE6KhVSMsMeH5H/L9EpymbzqTQ3uLwNCLZ1Q481oWaofqH7nO6V07xlXwY6PhQdQ2IedWx/ZK4Q==",
            "dev": true,
            "requires": {
                "spdx-exceptions": "^2.1.0",
                "spdx-license-ids": "^3.0.0"
            }
        },
        "spdx-license-ids": {
            "version": "3.0.7",
            "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.7.tgz",
            "integrity": "sha512-U+MTEOO0AiDzxwFvoa4JVnMV6mZlJKk2sBLt90s7G0Gd0Mlknc7kxEn3nuDPNZRta7O2uy8oLcZLVT+4sqNZHQ==",
            "dev": true
        },
        "split-string": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
            "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
            "requires": {
                "extend-shallow": "^3.0.0"
            }
        },
        "sprintf-js": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
            "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw=",
            "dev": true
        },
        "sshpk": {
            "version": "1.16.1",
            "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.16.1.tgz",
            "integrity": "sha512-HXXqVUq7+pcKeLqqZj6mHFUMvXtOJt1uoUx09pFW6011inTMxqI8BA8PM95myrIyyKwdnzjdFjLiE6KBPVtJIg==",
            "requires": {
                "asn1": "~0.2.3",
                "assert-plus": "^1.0.0",
                "bcrypt-pbkdf": "^1.0.0",
                "dashdash": "^1.12.0",
                "ecc-jsbn": "~0.1.1",
                "getpass": "^0.1.1",
                "jsbn": "~0.1.0",
                "safer-buffer": "^2.0.2",
                "tweetnacl": "~0.14.0"
            }
        },
        "ssri": {
            "version": "6.0.1",
            "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
            "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
            "requires": {
                "figgy-pudding": "^3.5.1"
            }
        },
        "static-extend": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
            "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
            "requires": {
                "define-property": "^0.2.5",
                "object-copy": "^0.1.0"
            },
            "dependencies": {
                "define-property": {
                    "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                        "is-descriptor": "^0.1.0"
                    }
                }
            }
        },
        "stream-browserify": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.2.tgz",
            "integrity": "sha512-nX6hmklHs/gr2FuxYDltq8fJA1GDlxKQCz8O/IM4atRqBH8OORmBNgfvW5gG10GT/qQ9u0CzIvr2X5Pkt6ntqg==",
            "requires": {
                "inherits": "~2.0.1",
                "readable-stream": "^2.0.2"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "stream-each": {
            "version": "1.2.3",
            "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.3.tgz",
            "integrity": "sha512-vlMC2f8I2u/bZGqkdfLQW/13Zihpej/7PmSiMQsbYddxuTsJp8vRe2x2FvVExZg7FaOds43ROAuFJwPR4MTZLw==",
            "requires": {
                "end-of-stream": "^1.1.0",
                "stream-shift": "^1.0.0"
            }
        },
        "stream-http": {
            "version": "2.8.3",
            "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
            "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
            "requires": {
                "builtin-status-codes": "^3.0.0",
                "inherits": "^2.0.1",
                "readable-stream": "^2.3.6",
                "to-arraybuffer": "^1.0.0",
                "xtend": "^4.0.0"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "stream-shift": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.1.tgz",
            "integrity": "sha512-AiisoFqQ0vbGcZgQPY1cdP2I76glaVA/RauYR4G4thNFgkTqr90yXTo4LYX60Jl+sIlPNHHdGSwo01AvbKUSVQ=="
        },
        "string_decoder": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
            "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
            "requires": {
                "safe-buffer": "~5.1.0"
            },
            "dependencies": {
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "string-width": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
            "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
            "dev": true,
            "requires": {
                "is-fullwidth-code-point": "^2.0.0",
                "strip-ansi": "^4.0.0"
            }
        },
        "string.prototype.trimend": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.3.tgz",
            "integrity": "sha512-ayH0pB+uf0U28CtjlLvL7NaohvR1amUvVZk+y3DYb0Ey2PUV5zPkkKy9+U1ndVEIXO8hNg18eIv9Jntbii+dKw==",
            "dev": true,
            "requires": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3"
            }
        },
        "string.prototype.trimleft": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/string.prototype.trimleft/-/string.prototype.trimleft-2.1.1.tgz",
            "integrity": "sha512-iu2AGd3PuP5Rp7x2kEZCrB2Nf41ehzh+goo8TV7z8/XDBbsvc6HQIlUl9RjkZ4oyrW1XM5UwlGl1oVEaDjg6Ag==",
            "dev": true,
            "requires": {
                "define-properties": "^1.1.3",
                "function-bind": "^1.1.1"
            }
        },
        "string.prototype.trimright": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/string.prototype.trimright/-/string.prototype.trimright-2.1.1.tgz",
            "integrity": "sha512-qFvWL3/+QIgZXVmJBfpHmxLB7xsUXz6HsUmP8+5dRaC3Q7oKUv9Vo6aMCRZC1smrtyECFsIT30PqBJ1gTjAs+g==",
            "dev": true,
            "requires": {
                "define-properties": "^1.1.3",
                "function-bind": "^1.1.1"
            }
        },
        "string.prototype.trimstart": {
            "version": "1.0.3",
            "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.3.tgz",
            "integrity": "sha512-oBIBUy5lea5tt0ovtOFiEQaBkoBBkyJhZXzJYrSmDo5IUUqbOPvVezuRs/agBIdZ2p2Eo1FD6bD9USyBLfl3xg==",
            "dev": true,
            "requires": {
                "call-bind": "^1.0.0",
                "define-properties": "^1.1.3"
            }
        },
        "strip-ansi": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
            "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
            "dev": true,
            "requires": {
                "ansi-regex": "^3.0.0"
            }
        },
        "strip-bom": {
            "version": "3.0.0",
            "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
            "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM=",
            "dev": true
        },
        "strip-json-comments": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
            "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo=",
            "dev": true
        },
        "subarg": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/subarg/-/subarg-1.0.0.tgz",
            "integrity": "sha1-9izxdYHplrSPyWVpn1TAauJouNI=",
            "requires": {
                "minimist": "^1.1.0"
            }
        },
        "supports-color": {
            "version": "5.5.0",
            "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
            "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
            "requires": {
                "has-flag": "^3.0.0"
            }
        },
        "table": {
            "version": "6.0.7",
            "resolved": "https://registry.npmjs.org/table/-/table-6.0.7.tgz",
            "integrity": "sha512-rxZevLGTUzWna/qBLObOe16kB2RTnnbhciwgPbMMlazz1yZGVEgnZK762xyVdVznhqxrfCeBMmMkgOOaPwjH7g==",
            "dev": true,
            "requires": {
                "ajv": "^7.0.2",
                "lodash": "^4.17.20",
                "slice-ansi": "^4.0.0",
                "string-width": "^4.2.0"
            },
            "dependencies": {
                "ajv": {
                    "version": "7.1.0",
                    "resolved": "https://registry.npmjs.org/ajv/-/ajv-7.1.0.tgz",
                    "integrity": "sha512-svS9uILze/cXbH0z2myCK2Brqprx/+JJYK5pHicT/GQiBfzzhUVAIT6MwqJg8y4xV/zoGsUeuPuwtoiKSGE15g==",
                    "dev": true,
                    "requires": {
                        "fast-deep-equal": "^3.1.1",
                        "json-schema-traverse": "^1.0.0",
                        "require-from-string": "^2.0.2",
                        "uri-js": "^4.2.2"
                    }
                },
                "ansi-regex": {
                    "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
                    "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
                    "dev": true
                },
                "emoji-regex": {
                    "version": "8.0.0",
                    "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
                    "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
                    "dev": true
                },
                "is-fullwidth-code-point": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
                    "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
                    "dev": true
                },
                "json-schema-traverse": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
                    "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
                    "dev": true
                },
                "string-width": {
                    "version": "4.2.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.0.tgz",
                    "integrity": "sha512-zUz5JD+tgqtuDjMhwIg5uFVV3dtqZ9yQJlZVfq4I01/K5Paj5UHj7VyrQOJvzawSVlKpObApbfD0Ed6yJc+1eg==",
                    "dev": true,
                    "requires": {
                        "emoji-regex": "^8.0.0",
                        "is-fullwidth-code-point": "^3.0.0",
                        "strip-ansi": "^6.0.0"
                    }
                },
                "strip-ansi": {
                    "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
                    "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
                    "dev": true,
                    "requires": {
                        "ansi-regex": "^5.0.0"
                    }
                }
            }
        },
        "tapable": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.1.3.tgz",
            "integrity": "sha512-4WK/bYZmj8xLr+HUCODHGF1ZFzsYffasLUgEiMBY4fgtltdO6B4WJtlSbPaDTLpYTcGVwM2qLnFTICEcNxs3kA=="
        },
        "tar-stream": {
            "version": "2.1.2",
            "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.1.2.tgz",
            "integrity": "sha512-UaF6FoJ32WqALZGOIAApXx+OdxhekNMChu6axLJR85zMMjXKWFGjbIRe+J6P4UnRGg9rAwWvbTT0oI7hD/Un7Q==",
            "requires": {
                "bl": "^4.0.1",
                "end-of-stream": "^1.4.1",
                "fs-constants": "^1.0.0",
                "inherits": "^2.0.3",
                "readable-stream": "^3.1.1"
            }
        },
        "terser": {
            "version": "4.8.0",
            "resolved": "https://registry.npmjs.org/terser/-/terser-4.8.0.tgz",
            "integrity": "sha512-EAPipTNeWsb/3wLPeup1tVPaXfIaU68xMnVdPafIL1TV05OhASArYyIfFvnvJCNrR2NIOvDVNNTFRa+Re2MWyw==",
            "requires": {
                "commander": "^2.20.0",
                "source-map": "~0.6.1",
                "source-map-support": "~0.5.12"
            }
        },
        "terser-webpack-plugin": {
            "version": "1.4.5",
            "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-1.4.5.tgz",
            "integrity": "sha512-04Rfe496lN8EYruwi6oPQkG0vo8C+HT49X687FZnpPF0qMAIHONI6HEXYPKDOE8e5HjXTyKfqRd/agHtH0kOtw==",
            "requires": {
                "cacache": "^12.0.2",
                "find-cache-dir": "^2.1.0",
                "is-wsl": "^1.1.0",
                "schema-utils": "^1.0.0",
                "serialize-javascript": "^4.0.0",
                "source-map": "^0.6.1",
                "terser": "^4.1.2",
                "webpack-sources": "^1.4.0",
                "worker-farm": "^1.7.0"
            }
        },
        "text-table": {
            "version": "0.2.0",
            "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
            "integrity": "sha1-f17oI66AUgfACvLfSoTsP8+lcLQ=",
            "dev": true
        },
        "through2": {
            "version": "2.0.5",
            "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.5.tgz",
            "integrity": "sha512-/mrRod8xqpA+IHSLyGCQ2s8SPHiCDEeQJSep1jqLYeEUClOFG2Qsh+4FU6G9VeqpZnGW/Su8LQGc4YKni5rYSQ==",
            "requires": {
                "readable-stream": "~2.3.6",
                "xtend": "~4.0.1"
            },
            "dependencies": {
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                }
            }
        },
        "timers-browserify": {
            "version": "2.0.11",
            "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.11.tgz",
            "integrity": "sha512-60aV6sgJ5YEbzUdn9c8kYGIqOubPoUdqQCul3SBAsRCZ40s6Y5cMcrW4dt3/k/EsbLVJNl9n6Vz3fTc+k2GeKQ==",
            "requires": {
                "setimmediate": "^1.0.4"
            }
        },
        "to-arraybuffer": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
            "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M="
        },
        "to-object-path": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
            "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
            "requires": {
                "kind-of": "^3.0.2"
            }
        },
        "to-regex": {
            "version": "3.0.2",
            "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
            "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
            "requires": {
                "define-property": "^2.0.2",
                "extend-shallow": "^3.0.2",
                "regex-not": "^1.0.2",
                "safe-regex": "^1.1.0"
            }
        },
        "to-regex-range": {
            "version": "2.1.1",
            "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
            "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
            "requires": {
                "is-number": "^3.0.0",
                "repeat-string": "^1.6.1"
            },
            "dependencies": {
                "is-number": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                    "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                    "requires": {
                        "kind-of": "^3.0.2"
                    }
                }
            }
        },
        "tough-cookie": {
            "version": "2.5.0",
            "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
            "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
            "requires": {
                "psl": "^1.1.28",
                "punycode": "^2.1.1"
            }
        },
        "ts-loader": {
            "version": "5.4.5",
            "resolved": "https://registry.npmjs.org/ts-loader/-/ts-loader-5.4.5.tgz",
            "integrity": "sha512-XYsjfnRQCBum9AMRZpk2rTYSVpdZBpZK+kDh0TeT3kxmQNBDVIeUjdPjY5RZry4eIAb8XHc4gYSUiUWPYvzSRw==",
            "requires": {
                "chalk": "^2.3.0",
                "enhanced-resolve": "^4.0.0",
                "loader-utils": "^1.0.2",
                "micromatch": "^3.1.4",
                "semver": "^5.0.1"
            },
            "dependencies": {
                "arr-diff": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
                    "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
                },
                "array-unique": {
                    "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
                    "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
                },
                "braces": {
                    "version": "2.3.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
                    "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
                    "requires": {
                        "arr-flatten": "^1.1.0",
                        "array-unique": "^0.3.2",
                        "extend-shallow": "^2.0.1",
                        "fill-range": "^4.0.0",
                        "isobject": "^3.0.1",
                        "repeat-element": "^1.1.2",
                        "snapdragon": "^0.8.1",
                        "snapdragon-node": "^2.0.1",
                        "split-string": "^3.0.2",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "expand-brackets": {
                    "version": "2.1.4",
                    "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
                    "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
                    "requires": {
                        "debug": "^2.3.3",
                        "define-property": "^0.2.5",
                        "extend-shallow": "^2.0.1",
                        "posix-character-classes": "^0.1.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "0.2.5",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                            "requires": {
                                "is-descriptor": "^0.1.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        },
                        "is-accessor-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
                            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-data-descriptor": {
                            "version": "0.1.4",
                            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
                            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
                            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
                            "requires": {
                                "is-accessor-descriptor": "^0.1.6",
                                "is-data-descriptor": "^0.1.4",
                                "kind-of": "^5.0.0"
                            }
                        },
                        "kind-of": {
                            "version": "5.1.0",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
                            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
                        }
                    }
                },
                "extglob": {
                    "version": "2.0.4",
                    "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
                    "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
                    "requires": {
                        "array-unique": "^0.3.2",
                        "define-property": "^1.0.0",
                        "expand-brackets": "^2.1.4",
                        "extend-shallow": "^2.0.1",
                        "fragment-cache": "^0.2.1",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "1.0.0",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                            "requires": {
                                "is-descriptor": "^1.0.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "fill-range": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
                    "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
                    "requires": {
                        "extend-shallow": "^2.0.1",
                        "is-number": "^3.0.0",
                        "repeat-string": "^1.6.1",
                        "to-regex-range": "^2.1.0"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "is-number": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                    "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                    "requires": {
                        "kind-of": "^3.0.2"
                    },
                    "dependencies": {
                        "kind-of": {
                            "version": "3.2.2",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                            "requires": {
                                "is-buffer": "^1.1.5"
                            }
                        }
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                },
                "micromatch": {
                    "version": "3.1.10",
                    "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
                    "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
                    "requires": {
                        "arr-diff": "^4.0.0",
                        "array-unique": "^0.3.2",
                        "braces": "^2.3.1",
                        "define-property": "^2.0.2",
                        "extend-shallow": "^3.0.2",
                        "extglob": "^2.0.4",
                        "fragment-cache": "^0.2.1",
                        "kind-of": "^6.0.2",
                        "nanomatch": "^1.2.9",
                        "object.pick": "^1.3.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.2"
                    }
                }
            }
        },
        "ts-node": {
            "version": "7.0.1",
            "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-7.0.1.tgz",
            "integrity": "sha512-BVwVbPJRspzNh2yfslyT1PSbl5uIk03EZlb493RKHN4qej/D06n1cEhjlOJG69oFsE7OT8XjpTUcYf6pKTLMhw==",
            "dev": true,
            "requires": {
                "arrify": "^1.0.0",
                "buffer-from": "^1.1.0",
                "diff": "^3.1.0",
                "make-error": "^1.1.1",
                "minimist": "^1.2.0",
                "mkdirp": "^0.5.1",
                "source-map-support": "^0.5.6",
                "yn": "^2.0.0"
            }
        },
        "tsconfig-paths": {
            "version": "3.9.0",
            "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.9.0.tgz",
            "integrity": "sha512-dRcuzokWhajtZWkQsDVKbWyY+jgcLC5sqJhg2PSgf4ZkH2aHPvaOY8YWGhmjb68b5qqTfasSsDO9k7RUiEmZAw==",
            "dev": true,
            "requires": {
                "@types/json5": "^0.0.29",
                "json5": "^1.0.1",
                "minimist": "^1.2.0",
                "strip-bom": "^3.0.0"
            }
        },
        "tslib": {
            "version": "1.11.1",
            "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.11.1.tgz",
            "integrity": "sha512-aZW88SY8kQbU7gpV19lN24LtXh/yD4ZZg6qieAJDDg+YBsJcSmLGK9QpnUjAKVG/xefmvJGd1WUmfpT/g6AJGA=="
        },
        "tty-browserify": {
            "version": "0.0.0",
            "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
            "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY="
        },
        "tunnel": {
            "version": "0.0.6",
            "resolved": "https://registry.npmjs.org/tunnel/-/tunnel-0.0.6.tgz",
            "integrity": "sha512-1h/Lnq9yajKY2PEbBadPXj3VxsDDu844OnaAo52UVmIzIvwwtBPIuNvkjuzBlTWpfJyUbG3ez0KSBibQkj4ojg=="
        },
        "tunnel-agent": {
            "version": "0.6.0",
            "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
            "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
            "requires": {
                "safe-buffer": "^5.0.1"
            }
        },
        "tweetnacl": {
            "version": "0.14.5",
            "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
            "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
        },
        "type-check": {
            "version": "0.4.0",
            "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
            "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
            "dev": true,
            "requires": {
                "prelude-ls": "^1.2.1"
            }
        },
        "type-fest": {
            "version": "0.8.1",
            "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.8.1.tgz",
            "integrity": "sha512-4dbzIzqvjtgiM5rw1k5rEHtBANKmdudhGyBEajN01fEyhaAIhsoKNy6y7+IN93IfpFtwY9iqi7kD+xwKhQsNJA==",
            "dev": true
        },
        "typedarray": {
            "version": "0.0.6",
            "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
            "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c="
        },
        "typescript": {
            "version": "3.8.3",
            "resolved": "https://registry.npmjs.org/typescript/-/typescript-3.8.3.tgz",
            "integrity": "sha512-MYlEfn5VrLNsgudQTVJeNaQFUAI7DkhnOjdpAp4T+ku1TfQClewlbSuTVHiA+8skNBgaf02TL/kLOvig4y3G8w==",
            "dev": true
        },
        "underscore": {
            "version": "1.9.2",
            "resolved": "https://registry.npmjs.org/underscore/-/underscore-1.9.2.tgz",
            "integrity": "sha512-D39qtimx0c1fI3ya1Lnhk3E9nONswSKhnffBI0gME9C99fYOkNi04xs8K6pePLhvl1frbDemkaBQ5ikWllR2HQ=="
        },
        "union-value": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",
            "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",
            "requires": {
                "arr-union": "^3.1.0",
                "get-value": "^2.0.6",
                "is-extendable": "^0.1.1",
                "set-value": "^2.0.1"
            }
        },
        "unique-filename": {
            "version": "1.1.1",
            "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.1.tgz",
            "integrity": "sha512-Vmp0jIp2ln35UTXuryvjzkjGdRyf9b2lTXuSYUiPmzRcl3FDtYqAwOnTJkAngD9SWhnoJzDbTKwaOrZ+STtxNQ==",
            "requires": {
                "unique-slug": "^2.0.0"
            }
        },
        "unique-slug": {
            "version": "2.0.2",
            "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.2.tgz",
            "integrity": "sha512-zoWr9ObaxALD3DOPfjPSqxt4fnZiWblxHIgeWqW8x7UqDzEtHEQLzji2cuJYQFCU6KmoJikOYAZlrTHHebjx2w==",
            "requires": {
                "imurmurhash": "^0.1.4"
            }
        },
        "universalify": {
            "version": "0.1.2",
            "resolved": "https://registry.npmjs.org/universalify/-/universalify-0.1.2.tgz",
            "integrity": "sha512-rBJeI5CXAlmy1pV+617WB9J63U6XcazHHF2f2dbJix4XzpUF0RS3Zbj0FGIOCAva5P/d/GBOYaACQ1w+0azUkg=="
        },
        "unset-value": {
            "version": "1.0.0",
            "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
            "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
            "requires": {
                "has-value": "^0.3.1",
                "isobject": "^3.0.0"
            },
            "dependencies": {
                "has-value": {
                    "version": "0.3.1",
                    "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
                    "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
                    "requires": {
                        "get-value": "^2.0.3",
                        "has-values": "^0.1.4",
                        "isobject": "^2.0.0"
                    },
                    "dependencies": {
                        "isobject": {
                            "version": "2.1.0",
                            "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
                            "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
                            "requires": {
                                "isarray": "1.0.0"
                            }
                        }
                    }
                },
                "has-values": {
                    "version": "0.1.4",
                    "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
                    "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E="
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                }
            }
        },
        "upath": {
            "version": "1.2.0",
            "resolved": "https://registry.npmjs.org/upath/-/upath-1.2.0.tgz",
            "integrity": "sha512-aZwGpamFO61g3OlfT7OQCHqhGnW43ieH9WZeP7QxN/G/jS4jfqUkZxoryvJgVPEcrl5NL/ggHsSmLMHuH64Lhg==",
            "optional": true
        },
        "uri-js": {
            "version": "4.2.2",
            "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.2.2.tgz",
            "integrity": "sha512-KY9Frmirql91X2Qgjry0Wd4Y+YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4+0Baa5idK2ZQuELRwPznQ==",
            "requires": {
                "punycode": "^2.1.0"
            }
        },
        "urix": {
            "version": "0.1.0",
            "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
            "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI="
        },
        "url": {
            "version": "0.11.0",
            "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
            "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
            "requires": {
                "punycode": "1.3.2",
                "querystring": "0.2.0"
            },
            "dependencies": {
                "punycode": {
                    "version": "1.3.2",
                    "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
                    "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0="
                }
            }
        },
        "use": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
            "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ=="
        },
        "util": {
            "version": "0.11.1",
            "resolved": "https://registry.npmjs.org/util/-/util-0.11.1.tgz",
            "integrity": "sha512-HShAsny+zS2TZfaXxD9tYj4HQGlBezXZMZuM/S5PKLLoZkShZiGk9o5CzukI1LVHZvjdvZ2Sj1aW/Ndn2NB/HQ==",
            "requires": {
                "inherits": "2.0.3"
            },
            "dependencies": {
                "inherits": {
                    "version": "2.0.3",
                    "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
                    "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
                }
            }
        },
        "util-deprecate": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
            "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8="
        },
        "uuid": {
            "version": "3.4.0",
            "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.4.0.tgz",
            "integrity": "sha512-HjSDRw6gZE5JMggctHBcjVak08+KEVhSIiDzFnT9S9aegmp85S/bReBVTb4QTFaRNptJ9kuYaNhnbNEOkbKb/A=="
        },
        "v8-compile-cache": {
            "version": "2.2.0",
            "resolved": "https://registry.npmjs.org/v8-compile-cache/-/v8-compile-cache-2.2.0.tgz",
            "integrity": "sha512-gTpR5XQNKFwOd4clxfnhaqvfqMpqEwr4tOtCyz4MtYZX2JYhfr1JvBFKdS+7K/9rfpZR3VLX+YWBbKoxCgS43Q==",
            "dev": true
        },
        "validate-npm-package-license": {
            "version": "3.0.4",
            "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
            "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
            "dev": true,
            "requires": {
                "spdx-correct": "^3.0.0",
                "spdx-expression-parse": "^3.0.0"
            }
        },
        "verror": {
            "version": "1.10.0",
            "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
            "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
            "requires": {
                "assert-plus": "^1.0.0",
                "core-util-is": "1.0.2",
                "extsprintf": "^1.2.0"
            }
        },
        "vm-browserify": {
            "version": "1.1.2",
            "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-1.1.2.tgz",
            "integrity": "sha512-2ham8XPWTONajOR0ohOKOHXkm3+gaBmGut3SRuu75xLd/RRaY6vqgh8NBYYk7+RW3u5AtzPQZG8F10LHkl0lAQ=="
        },
        "vscode-test": {
            "version": "1.3.0",
            "resolved": "https://registry.npmjs.org/vscode-test/-/vscode-test-1.3.0.tgz",
            "integrity": "sha512-LddukcBiSU2FVTDr3c1D8lwkiOvwlJdDL2hqVbn6gIz+rpTqUCkMZSKYm94Y1v0WXlHSDQBsXyY+tchWQgGVsw==",
            "dev": true,
            "requires": {
                "http-proxy-agent": "^2.1.0",
                "https-proxy-agent": "^2.2.4",
                "rimraf": "^2.6.3"
            }
        },
        "watchpack": {
            "version": "1.7.5",
            "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.7.5.tgz",
            "integrity": "sha512-9P3MWk6SrKjHsGkLT2KHXdQ/9SNkyoJbabxnKOoJepsvJjJG8uYTR3yTPxPQvNDI3w4Nz1xnE0TLHK4RIVe/MQ==",
            "requires": {
                "chokidar": "^3.4.1",
                "graceful-fs": "^4.1.2",
                "neo-async": "^2.5.0",
                "watchpack-chokidar2": "^2.0.1"
            },
            "dependencies": {
                "anymatch": {
                    "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.1.tgz",
                    "integrity": "sha512-mM8522psRCqzV+6LhomX5wgp25YVibjh8Wj23I5RPkPppSVSjyKD2A2mBJmWGa+KN7f2D6LNh9jkBCeyLktzjg==",
                    "optional": true,
                    "requires": {
                        "normalize-path": "^3.0.0",
                        "picomatch": "^2.0.4"
                    }
                },
                "binary-extensions": {
                    "version": "2.2.0",
                    "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.2.0.tgz",
                    "integrity": "sha512-jDctJ/IVQbZoJykoeHbhXpOlNBqGNcwXJKJog42E5HDPUwQTSdjCHdihjj0DlnheQ7blbT6dHOafNAiS8ooQKA==",
                    "optional": true
                },
                "braces": {
                    "version": "3.0.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
                    "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
                    "optional": true,
                    "requires": {
                        "fill-range": "^7.0.1"
                    }
                },
                "chokidar": {
                    "version": "3.5.1",
                    "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.5.1.tgz",
                    "integrity": "sha512-9+s+Od+W0VJJzawDma/gvBNQqkTiqYTWLuZoyAsivsI4AaWTCzHG06/TMjsf1cYe9Cb97UCEhjz7HvnPk2p/tw==",
                    "optional": true,
                    "requires": {
                        "anymatch": "~3.1.1",
                        "braces": "~3.0.2",
                        "fsevents": "~2.3.1",
                        "glob-parent": "~5.1.0",
                        "is-binary-path": "~2.1.0",
                        "is-glob": "~4.0.1",
                        "normalize-path": "~3.0.0",
                        "readdirp": "~3.5.0"
                    }
                },
                "fill-range": {
                    "version": "7.0.1",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
                    "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
                    "optional": true,
                    "requires": {
                        "to-regex-range": "^5.0.1"
                    }
                },
                "fsevents": {
                    "version": "2.3.2",
                    "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
                    "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
                    "optional": true
                },
                "glob-parent": {
                    "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
                    "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
                    "optional": true,
                    "requires": {
                        "is-glob": "^4.0.1"
                    }
                },
                "is-binary-path": {
                    "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
                    "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
                    "optional": true,
                    "requires": {
                        "binary-extensions": "^2.0.0"
                    }
                },
                "is-extglob": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "optional": true
                },
                "is-glob": {
                    "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "optional": true,
                    "requires": {
                        "is-extglob": "^2.1.1"
                    }
                },
                "is-number": {
                    "version": "7.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
                    "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
                    "optional": true
                },
                "readdirp": {
                    "version": "3.5.0",
                    "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.5.0.tgz",
                    "integrity": "sha512-cMhu7c/8rdhkHXWsY+osBhfSy0JikwpHK/5+imo+LpeasTF8ouErHrlYkwT0++njiyuDvc7OFY5T3ukvZ8qmFQ==",
                    "optional": true,
                    "requires": {
                        "picomatch": "^2.2.1"
                    }
                },
                "to-regex-range": {
                    "version": "5.0.1",
                    "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
                    "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
                    "optional": true,
                    "requires": {
                        "is-number": "^7.0.0"
                    }
                }
            }
        },
        "watchpack-chokidar2": {
            "version": "2.0.1",
            "resolved": "https://registry.npmjs.org/watchpack-chokidar2/-/watchpack-chokidar2-2.0.1.tgz",
            "integrity": "sha512-nCFfBIPKr5Sh61s4LPpy1Wtfi0HE8isJ3d2Yb5/Ppw2P2B/3eVSEBjKfN0fmHJSK14+31KwMKmcrzs2GM4P0Ww==",
            "optional": true,
            "requires": {
                "chokidar": "^2.1.8"
            },
            "dependencies": {
                "anymatch": {
                    "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
                    "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
                    "optional": true,
                    "requires": {
                        "micromatch": "^3.1.4",
                        "normalize-path": "^2.1.1"
                    },
                    "dependencies": {
                        "normalize-path": {
                            "version": "2.1.1",
                            "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
                            "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
                            "optional": true,
                            "requires": {
                                "remove-trailing-separator": "^1.0.1"
                            }
                        }
                    }
                },
                "arr-diff": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
                    "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
                    "optional": true
                },
                "array-unique": {
                    "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
                    "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
                    "optional": true
                },
                "braces": {
                    "version": "2.3.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
                    "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
                    "optional": true,
                    "requires": {
                        "arr-flatten": "^1.1.0",
                        "array-unique": "^0.3.2",
                        "extend-shallow": "^2.0.1",
                        "fill-range": "^4.0.0",
                        "isobject": "^3.0.1",
                        "repeat-element": "^1.1.2",
                        "snapdragon": "^0.8.1",
                        "snapdragon-node": "^2.0.1",
                        "split-string": "^3.0.2",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "optional": true,
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "chokidar": {
                    "version": "2.1.8",
                    "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.1.8.tgz",
                    "integrity": "sha512-ZmZUazfOzf0Nve7duiCKD23PFSCs4JPoYyccjUFF3aQkQadqBhfzhjkwBH2mNOG9cTBwhamM37EIsIkZw3nRgg==",
                    "optional": true,
                    "requires": {
                        "anymatch": "^2.0.0",
                        "async-each": "^1.0.1",
                        "braces": "^2.3.2",
                        "fsevents": "^1.2.7",
                        "glob-parent": "^3.1.0",
                        "inherits": "^2.0.3",
                        "is-binary-path": "^1.0.0",
                        "is-glob": "^4.0.0",
                        "normalize-path": "^3.0.0",
                        "path-is-absolute": "^1.0.0",
                        "readdirp": "^2.2.1",
                        "upath": "^1.1.1"
                    }
                },
                "expand-brackets": {
                    "version": "2.1.4",
                    "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
                    "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
                    "optional": true,
                    "requires": {
                        "debug": "^2.3.3",
                        "define-property": "^0.2.5",
                        "extend-shallow": "^2.0.1",
                        "posix-character-classes": "^0.1.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "0.2.5",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                            "optional": true,
                            "requires": {
                                "is-descriptor": "^0.1.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "optional": true,
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        },
                        "is-accessor-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
                            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
                            "optional": true,
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "optional": true,
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-data-descriptor": {
                            "version": "0.1.4",
                            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
                            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
                            "optional": true,
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "optional": true,
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
                            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
                            "optional": true,
                            "requires": {
                                "is-accessor-descriptor": "^0.1.6",
                                "is-data-descriptor": "^0.1.4",
                                "kind-of": "^5.0.0"
                            }
                        },
                        "kind-of": {
                            "version": "5.1.0",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
                            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
                            "optional": true
                        }
                    }
                },
                "extglob": {
                    "version": "2.0.4",
                    "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
                    "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
                    "optional": true,
                    "requires": {
                        "array-unique": "^0.3.2",
                        "define-property": "^1.0.0",
                        "expand-brackets": "^2.1.4",
                        "extend-shallow": "^2.0.1",
                        "fragment-cache": "^0.2.1",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "1.0.0",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                            "optional": true,
                            "requires": {
                                "is-descriptor": "^1.0.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "optional": true,
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "fill-range": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
                    "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
                    "optional": true,
                    "requires": {
                        "extend-shallow": "^2.0.1",
                        "is-number": "^3.0.0",
                        "repeat-string": "^1.6.1",
                        "to-regex-range": "^2.1.0"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "optional": true,
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "glob-parent": {
                    "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
                    "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
                    "optional": true,
                    "requires": {
                        "is-glob": "^3.1.0",
                        "path-dirname": "^1.0.0"
                    },
                    "dependencies": {
                        "is-glob": {
                            "version": "3.1.0",
                            "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
                            "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
                            "optional": true,
                            "requires": {
                                "is-extglob": "^2.1.0"
                            }
                        }
                    }
                },
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "optional": true,
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "optional": true,
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "optional": true,
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "is-extglob": {
                    "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "optional": true
                },
                "is-glob": {
                    "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "optional": true,
                    "requires": {
                        "is-extglob": "^2.1.1"
                    }
                },
                "is-number": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                    "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                    "optional": true,
                    "requires": {
                        "kind-of": "^3.0.2"
                    },
                    "dependencies": {
                        "kind-of": {
                            "version": "3.2.2",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                            "optional": true,
                            "requires": {
                                "is-buffer": "^1.1.5"
                            }
                        }
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
                    "optional": true
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
                    "optional": true
                },
                "micromatch": {
                    "version": "3.1.10",
                    "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
                    "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
                    "optional": true,
                    "requires": {
                        "arr-diff": "^4.0.0",
                        "array-unique": "^0.3.2",
                        "braces": "^2.3.1",
                        "define-property": "^2.0.2",
                        "extend-shallow": "^3.0.2",
                        "extglob": "^2.0.4",
                        "fragment-cache": "^0.2.1",
                        "kind-of": "^6.0.2",
                        "nanomatch": "^1.2.9",
                        "object.pick": "^1.3.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.2"
                    }
                }
            }
        },
        "webpack": {
            "version": "4.28.1",
            "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.28.1.tgz",
            "integrity": "sha512-qAS7BFyS5iuOZzGJxyDXmEI289h7tVNtJ5XMxf6Tz55J2riOyH42uaEsWF0F32TRaI+54SmI6qRgHM3GzsZ+sQ==",
            "requires": {
                "@webassemblyjs/ast": "1.7.11",
                "@webassemblyjs/helper-module-context": "1.7.11",
                "@webassemblyjs/wasm-edit": "1.7.11",
                "@webassemblyjs/wasm-parser": "1.7.11",
                "acorn": "^5.6.2",
                "acorn-dynamic-import": "^3.0.0",
                "ajv": "^6.1.0",
                "ajv-keywords": "^3.1.0",
                "chrome-trace-event": "^1.0.0",
                "enhanced-resolve": "^4.1.0",
                "eslint-scope": "^4.0.0",
                "json-parse-better-errors": "^1.0.2",
                "loader-runner": "^2.3.0",
                "loader-utils": "^1.1.0",
                "memory-fs": "~0.4.1",
                "micromatch": "^3.1.8",
                "mkdirp": "~0.5.0",
                "neo-async": "^2.5.0",
                "node-libs-browser": "^2.0.0",
                "schema-utils": "^0.4.4",
                "tapable": "^1.1.0",
                "terser-webpack-plugin": "^1.1.0",
                "watchpack": "^1.5.0",
                "webpack-sources": "^1.3.0"
            },
            "dependencies": {
                "arr-diff": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
                    "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
                },
                "array-unique": {
                    "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
                    "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
                },
                "braces": {
                    "version": "2.3.2",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
                    "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
                    "requires": {
                        "arr-flatten": "^1.1.0",
                        "array-unique": "^0.3.2",
                        "extend-shallow": "^2.0.1",
                        "fill-range": "^4.0.0",
                        "isobject": "^3.0.1",
                        "repeat-element": "^1.1.2",
                        "snapdragon": "^0.8.1",
                        "snapdragon-node": "^2.0.1",
                        "split-string": "^3.0.2",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "expand-brackets": {
                    "version": "2.1.4",
                    "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
                    "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
                    "requires": {
                        "debug": "^2.3.3",
                        "define-property": "^0.2.5",
                        "extend-shallow": "^2.0.1",
                        "posix-character-classes": "^0.1.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "0.2.5",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                            "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                            "requires": {
                                "is-descriptor": "^0.1.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        },
                        "is-accessor-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
                            "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-data-descriptor": {
                            "version": "0.1.4",
                            "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
                            "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
                            "requires": {
                                "kind-of": "^3.0.2"
                            },
                            "dependencies": {
                                "kind-of": {
                                    "version": "3.2.2",
                                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                                    "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                                    "requires": {
                                        "is-buffer": "^1.1.5"
                                    }
                                }
                            }
                        },
                        "is-descriptor": {
                            "version": "0.1.6",
                            "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
                            "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
                            "requires": {
                                "is-accessor-descriptor": "^0.1.6",
                                "is-data-descriptor": "^0.1.4",
                                "kind-of": "^5.0.0"
                            }
                        },
                        "kind-of": {
                            "version": "5.1.0",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
                            "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
                        }
                    }
                },
                "extglob": {
                    "version": "2.0.4",
                    "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
                    "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
                    "requires": {
                        "array-unique": "^0.3.2",
                        "define-property": "^1.0.0",
                        "expand-brackets": "^2.1.4",
                        "extend-shallow": "^2.0.1",
                        "fragment-cache": "^0.2.1",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.1"
                    },
                    "dependencies": {
                        "define-property": {
                            "version": "1.0.0",
                            "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                            "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                            "requires": {
                                "is-descriptor": "^1.0.0"
                            }
                        },
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "fill-range": {
                    "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
                    "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
                    "requires": {
                        "extend-shallow": "^2.0.1",
                        "is-number": "^3.0.0",
                        "repeat-string": "^1.6.1",
                        "to-regex-range": "^2.1.0"
                    },
                    "dependencies": {
                        "extend-shallow": {
                            "version": "2.0.1",
                            "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                            "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                            "requires": {
                                "is-extendable": "^0.1.0"
                            }
                        }
                    }
                },
                "is-accessor-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-data-descriptor": {
                    "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                        "kind-of": "^6.0.0"
                    }
                },
                "is-descriptor": {
                    "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                        "is-accessor-descriptor": "^1.0.0",
                        "is-data-descriptor": "^1.0.0",
                        "kind-of": "^6.0.2"
                    }
                },
                "is-number": {
                    "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                    "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                    "requires": {
                        "kind-of": "^3.0.2"
                    },
                    "dependencies": {
                        "kind-of": {
                            "version": "3.2.2",
                            "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                            "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                            "requires": {
                                "is-buffer": "^1.1.5"
                            }
                        }
                    }
                },
                "isobject": {
                    "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                    "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
                },
                "kind-of": {
                    "version": "6.0.3",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
                    "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw=="
                },
                "memory-fs": {
                    "version": "0.4.1",
                    "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
                    "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
                    "requires": {
                        "errno": "^0.1.3",
                        "readable-stream": "^2.0.1"
                    }
                },
                "micromatch": {
                    "version": "3.1.10",
                    "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
                    "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
                    "requires": {
                        "arr-diff": "^4.0.0",
                        "array-unique": "^0.3.2",
                        "braces": "^2.3.1",
                        "define-property": "^2.0.2",
                        "extend-shallow": "^3.0.2",
                        "extglob": "^2.0.4",
                        "fragment-cache": "^0.2.1",
                        "kind-of": "^6.0.2",
                        "nanomatch": "^1.2.9",
                        "object.pick": "^1.3.0",
                        "regex-not": "^1.0.0",
                        "snapdragon": "^0.8.1",
                        "to-regex": "^3.0.2"
                    }
                },
                "readable-stream": {
                    "version": "2.3.7",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
                    "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
                    "requires": {
                        "core-util-is": "~1.0.0",
                        "inherits": "~2.0.3",
                        "isarray": "~1.0.0",
                        "process-nextick-args": "~2.0.0",
                        "safe-buffer": "~5.1.1",
                        "string_decoder": "~1.1.1",
                        "util-deprecate": "~1.0.1"
                    }
                },
                "safe-buffer": {
                    "version": "5.1.2",
                    "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                    "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
                },
                "schema-utils": {
                    "version": "0.4.7",
                    "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-0.4.7.tgz",
                    "integrity": "sha512-v/iwU6wvwGK8HbU9yi3/nhGzP0yGSuhQMzL6ySiec1FSrZZDkhm4noOSWzrNFo/jEc+SJY6jRTwuwbSXJPDUnQ==",
                    "requires": {
                        "ajv": "^6.1.0",
                        "ajv-keywords": "^3.1.0"
                    }
                }
            }
        },
        "webpack-sources": {
            "version": "1.4.3",
            "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.4.3.tgz",
            "integrity": "sha512-lgTS3Xhv1lCOKo7SA5TjKXMjpSM4sBjNV5+q2bqesbSPs5FjGmU6jjtBSkX9b4qW87vDIsCIlUPOEhbZrMdjeQ==",
            "requires": {
                "source-list-map": "^2.0.0",
                "source-map": "~0.6.1"
            }
        },
        "which": {
            "version": "1.3.1",
            "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
            "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
            "dev": true,
            "requires": {
                "isexe": "^2.0.0"
            }
        },
        "which-module": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
            "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho=",
            "dev": true
        },
        "wide-align": {
            "version": "1.1.3",
            "resolved": "https://registry.npmjs.org/wide-align/-/wide-align-1.1.3.tgz",
            "integrity": "sha512-QGkOQc8XL6Bt5PwnsExKBPuMKBxnGxWWW3fU55Xt4feHozMUhdUMaBCk290qpm/wG5u/RSKzwdAC4i51YigihA==",
            "dev": true,
            "requires": {
                "string-width": "^1.0.2 || 2"
            }
        },
        "word-wrap": {
            "version": "1.2.3",
            "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.3.tgz",
            "integrity": "sha512-Hz/mrNwitNRh/HUAtM/VT/5VH+ygD6DV7mYKZAtHOrbs8U7lvPS6xf7EJKMF0uW1KJCl0H701g3ZGus+muE5vQ==",
            "dev": true
        },
        "worker-farm": {
            "version": "1.7.0",
            "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.7.0.tgz",
            "integrity": "sha512-rvw3QTZc8lAxyVrqcSGVm5yP/IJ2UcB3U0graE3LCFoZ0Yn2x4EoVSqJKdB/T5M+FLcRPjz4TDacRf3OCfNUzw==",
            "requires": {
                "errno": "~0.1.7"
            }
        },
        "wrap-ansi": {
            "version": "5.1.0",
            "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
            "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
            "dev": true,
            "requires": {
                "ansi-styles": "^3.2.0",
                "string-width": "^3.0.0",
                "strip-ansi": "^5.0.0"
            },
            "dependencies": {
                "ansi-regex": {
                    "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
                    "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
                    "dev": true
                },
                "string-width": {
                    "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
                    "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
                    "dev": true,
                    "requires": {
                        "emoji-regex": "^7.0.1",
                        "is-fullwidth-code-point": "^2.0.0",
                        "strip-ansi": "^5.1.0"
                    }
                },
                "strip-ansi": {
                    "version": "5.2.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
                    "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
                    "dev": true,
                    "requires": {
                        "ansi-regex": "^4.1.0"
                    }
                }
            }
        },
        "wrappy": {
            "version": "1.0.2",
            "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
            "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8="
        },
        "xml": {
            "version": "1.0.1",
            "resolved": "https://registry.npmjs.org/xml/-/xml-1.0.1.tgz",
            "integrity": "sha1-eLpyAgApxbyHuKgaPPzXS0ovweU=",
            "dev": true
        },
        "xml2js": {
            "version": "0.4.23",
            "resolved": "https://registry.npmjs.org/xml2js/-/xml2js-0.4.23.tgz",
            "integrity": "sha512-ySPiMjM0+pLDftHgXY4By0uswI3SPKLDw/i3UXbnO8M/p28zqexCUoPmQFrYD+/1BzhGJSs2i1ERWKJAtiLrug==",
            "requires": {
                "sax": ">=0.6.0",
                "xmlbuilder": "~11.0.0"
            }
        },
        "xmlbuilder": {
            "version": "11.0.1",
            "resolved": "https://registry.npmjs.org/xmlbuilder/-/xmlbuilder-11.0.1.tgz",
            "integrity": "sha512-fDlsI/kFEx7gLvbecc0/ohLG50fugQp8ryHzMTuW9vSa1GJ0XYWKnhsUx7oie3G98+r56aTQIUB4kht42R3JvA=="
        },
        "xmldom": {
            "version": "0.3.0",
            "resolved": "https://registry.npmjs.org/xmldom/-/xmldom-0.3.0.tgz",
            "integrity": "sha512-z9s6k3wxE+aZHgXYxSTpGDo7BYOUfJsIRyoZiX6HTjwpwfS2wpQBQKa2fD+ShLyPkqDYo5ud7KitmLZ2Cd6r0g=="
        },
        "xpath.js": {
            "version": "1.1.0",
            "resolved": "https://registry.npmjs.org/xpath.js/-/xpath.js-1.1.0.tgz",
            "integrity": "sha512-jg+qkfS4K8E7965sqaUl8mRngXiKb3WZGfONgE18pr03FUQiuSV6G+Ej4tS55B+rIQSFEIw3phdVAQ4pPqNWfQ=="
        },
        "xtend": {
            "version": "4.0.2",
            "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
            "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ=="
        },
        "y18n": {
            "version": "4.0.0",
            "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
            "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
        },
        "yallist": {
            "version": "3.1.1",
            "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
            "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="
        },
        "yargs": {
            "version": "13.3.2",
            "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.2.tgz",
            "integrity": "sha512-AX3Zw5iPruN5ie6xGRIDgqkT+ZhnRlZMLMHAs8tg7nRruy2Nb+i5o9bwghAogtM08q1dpr2LVoS8KSTMYpWXUw==",
            "dev": true,
            "requires": {
                "cliui": "^5.0.0",
                "find-up": "^3.0.0",
                "get-caller-file": "^2.0.1",
                "require-directory": "^2.1.1",
                "require-main-filename": "^2.0.0",
                "set-blocking": "^2.0.0",
                "string-width": "^3.0.0",
                "which-module": "^2.0.0",
                "y18n": "^4.0.0",
                "yargs-parser": "^13.1.2"
            },
            "dependencies": {
                "ansi-regex": {
                    "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
                    "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
                    "dev": true
                },
                "string-width": {
                    "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
                    "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
                    "dev": true,
                    "requires": {
                        "emoji-regex": "^7.0.1",
                        "is-fullwidth-code-point": "^2.0.0",
                        "strip-ansi": "^5.1.0"
                    }
                },
                "strip-ansi": {
                    "version": "5.2.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
                    "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
                    "dev": true,
                    "requires": {
                        "ansi-regex": "^4.1.0"
                    }
                }
            }
        },
        "yargs-parser": {
            "version": "13.1.2",
            "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-13.1.2.tgz",
            "integrity": "sha512-3lbsNRf/j+A4QuSZfDRA7HRSfWrzO0YjqTJd5kjAq37Zep1CEgaYmrH9Q3GwPiB9cHyd1Y1UwggGhJGoxipbzg==",
            "dev": true,
            "requires": {
                "camelcase": "^5.0.0",
                "decamelize": "^1.2.0"
            }
        },
        "yargs-unparser": {
            "version": "1.6.0",
            "resolved": "https://registry.npmjs.org/yargs-unparser/-/yargs-unparser-1.6.0.tgz",
            "integrity": "sha512-W9tKgmSn0DpSatfri0nx52Joq5hVXgeLiqR/5G0sZNDoLZFOr/xjBUDcShCOGNsBnEMNo1KAMBkTej1Hm62HTw==",
            "dev": true,
            "requires": {
                "flat": "^4.1.0",
                "lodash": "^4.17.15",
                "yargs": "^13.3.0"
            }
        },
        "yn": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/yn/-/yn-2.0.0.tgz",
            "integrity": "sha1-5a2ryKz0CPY4X8dklWhMiOavaJo=",
            "dev": true
        },
        "zip-stream": {
            "version": "2.1.3",
            "resolved": "https://registry.npmjs.org/zip-stream/-/zip-stream-2.1.3.tgz",
            "integrity": "sha512-EkXc2JGcKhO5N5aZ7TmuNo45budRaFGHOmz24wtJR7znbNqDPmdZtUauKX6et8KAVseAMBOyWJqEpXcHTBsh7Q==",
            "requires": {
                "archiver-utils": "^2.1.0",
                "compress-commons": "^2.1.1",
                "readable-stream": "^3.4.0"
            }
        }
    }
};

suite('getNodeModulesDependencyClosure', () => {
    test('Empty', () => {
        const closure = getNodeModulesDependencyClosure(packageLockJson, []);
        assert.deepStrictEqual(
            closure,
            []
        );
    });

    test('No deps', () => {
        const closure = getNodeModulesDependencyClosure(packageLockJson, ['xtend']);
        assert.deepStrictEqual(
            closure,
            [
                'xtend'
            ]);
    });

    test('Nested deps', () => {
        const closure = getNodeModulesDependencyClosure(packageLockJson, ['yauzl']);
        assert.deepStrictEqual(
            closure,
            [
                'buffer-crc32',
                'fd-slicer',
                'pend',
                'yauzl'
            ]);
    });

    test('Deeply nested deps', () => {
        const closure = getNodeModulesDependencyClosure(packageLockJson, ['remove-bom-stream']);
        assert.deepStrictEqual(
            closure,
            [
                "core-util-is",
                "inherits",
                "is-buffer",
                "is-utf8",
                "isarray",
                "process-nextick-args",
                "readable-stream",
                "remove-bom-buffer",
                "remove-bom-stream",
                "safe-buffer",
                "string_decoder",
                "through2",
                "util-deprecate",
                "xtend"
            ]);
    });

    test('Multiple', () => {
        const closure = getNodeModulesDependencyClosure(packageLockJson, ['xtend', 'yauzl']);
        assert.deepStrictEqual(
            closure,
            [
                'buffer-crc32',
                'fd-slicer',
                'pend',
                "xtend",
                'yauzl'
            ]);
    });

    test('Pick up nested dependencies', () => {
        // ws v2.3.1 does not depend on options, but ws v1.1.5 does.
        // engine.io depends on ws v1.1.5, so it should pick up the dependency on options but not safe-buffer
        const deepPackageLock = {
            "dependencies": {
                "engine.io": {
                    "version": "1.8.5",
                    "requires": {
                        "ws": "~1.1.5"
                    },
                    "dependencies": {
                        "ws": {
                            "version": "1.1.5",
                            "requires": {
                                "options": ">=0.0.5"
                            }
                        }
                    }
                },
                "ws": {
                    "version": "2.3.1",
                    "requires": {
                        "safe-buffer": "~5.0.1"
                    },
                    "dependencies": {
                        "safe-buffer": {
                            "version": "5.0.1"
                        }
                    }
                },
                "options": {
                    "version": "0.0.6"
                }
            }
        };

        const closure = getNodeModulesDependencyClosure(deepPackageLock, ['engine.io']);
        assert.deepStrictEqual(
            closure,
            [
                'engine.io',
                'options',
                'ws'
            ]);
    });
});

suite('getExternalsEntries', () => {
    test('test', () => {
        const entries = getExternalsEntries(['abc', 'def-ghi']);
        assert.deepStrictEqual(
            entries,
            {
                'abc': 'commonjs abc',
                'def-ghi': 'commonjs def-ghi'
            }
        );
    });
});

suite('getNodeModuleCopyEntries', () => {
    test('test', () => {
        const entries = getNodeModuleCopyEntries('/root', ['abc', 'def-ghi']);
        assert.deepStrictEqual(
            entries,
            [
                {
                    source: os.platform() === 'win32' ? '\\root\\node_modules\\abc' : '/root/node_modules/abc',
                    destination: os.platform() === 'win32' ? '\\root\\dist\\node_modules\\abc' : '/root/dist/node_modules/abc'
                },
                {
                    source: os.platform() === 'win32' ? '\\root\\node_modules\\def-ghi' : '/root/node_modules/def-ghi',
                    destination: os.platform() === 'win32' ? '\\root\\dist\\node_modules\\def-ghi' : '/root/dist/node_modules/def-ghi'
                }]
        );
    });
});

suite('excludeNodeModulesAndDependencies', () => {
    test('config empty', () => {
        const config: Configuration = {};
        excludeNodeModulesAndDependencies('/root', config, packageLockJson, ['yauzl']);

        assert.deepStrictEqual(
            config.externals,
            {
                "buffer-crc32": "commonjs buffer-crc32",
                "fd-slicer": "commonjs fd-slicer",
                "pend": "commonjs pend",
                "yauzl": "commonjs yauzl"
            }
        );

        assert.equal(config.plugins && config.plugins.length, 1);
    });

    test('config already has entries', () => {
        const config: Configuration = {
            externals: {
                previous: 'commonjs previous'
            },
            plugins: [
                new FileManagerWebpackPlugin({})
            ]
        };
        excludeNodeModulesAndDependencies('/root', config, packageLockJson, ['yauzl']);

        assert.deepStrictEqual(
            config.externals,
            {
                "buffer-crc32": "commonjs buffer-crc32",
                "fd-slicer": "commonjs fd-slicer",
                "pend": "commonjs pend",
                "previous": "commonjs previous",
                "yauzl": "commonjs yauzl"
            }
        );

        assert.equal(config.plugins && config.plugins.length, 2);
    });
});
