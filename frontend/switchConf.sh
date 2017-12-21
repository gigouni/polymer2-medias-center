#!/bin/bash

if [ ! -f ./config.js ]
then
    echo "No 'config.js' file found"
    exit 0
elif [ -f ./config.prod.js ]
then
    echo "Previous mode: development"
    mv ./config.js ./config.dev.js
    mv ./config.prod.js ./config.js
    echo "Config for production: ready"
    echo "Current mode: production"
elif [ -f ./config.dev.js ]
then
    echo "Previous mode: production"
    mv ./config.js ./config.prod.js
    mv ./config.dev.js ./config.js
    echo "Config for development: ready"
    echo "Current mode: development"
fi