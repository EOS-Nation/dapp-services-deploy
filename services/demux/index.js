#!/usr/bin/env node

require('babel-core/register');
require('babel-polyfill');
if (process.env.DAEMONIZE_PROCESS) { require('daemonize-process')(); }

const backend = process.env.DEMUX_BACKEND || 'zmq_plugin';
const express = require('express');

require(`./backends/${backend}`);

const genApp = () => {
  return express();
};

const appWebHookListener = genApp();
appWebHookListener.listen(process.env.WEBHOOK_DEMUX_PORT || 3195, () => console.log(`demux listening on port ${process.env.WEBHOOK_DEMUX_PORT || 3195}!`));
