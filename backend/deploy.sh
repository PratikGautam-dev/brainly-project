#!/bin/bash
export NODE_ENV=production
cp .env.production .env
npm install
npm run build
node dist/index.js
