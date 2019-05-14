const path = require("path");
require('dotenv').config(path.join(__dirname, ".env"));

// Require .env
if (!process.env.DSP_ACCOUNT) throw new Error("DSP_ACCOUNT is required");
if (!process.env.DSP_PRIVATE_KEY) throw new Error("DSP_PRIVATE_KEY is required");
const DSP_ACCOUNT = process.env.DSP_ACCOUNT;
const DSP_PRIVATE_KEY = process.env.DSP_PRIVATE_KEY;

// Configure .env
const NETWORK_PORT = process.env.NETWORK_PORT || 3115;
const IPFS_HOST = process.env.IPFS_HOST || 'localhost';
const NODEOS_HOST = process.env.NODEOS_HOST || 'localhost';
const NODEOS_PORT = process.env.NODEOS_PORT || 8888;
const NODEOS_SECURED = process.env.NODEOS_SECURED || 'false'
const NODEOS_ENDPOINT = process.env.NODEOS_ENDPOINT || "http://localhost:8888";

// Optional .env
const WEBHOOK_DAPP_PORT = process.env.WEBHOOK_DAPP_PORT || 8812;
const DEMUX_BACKEND = process.env.DEMUX_BACKEND || 'zmq_plugin';
const WEBHOOK_DEMUX_PORT = process.env.WEBHOOK_DEMUX_PORT || 3195;
const SOCKET_MODE = 'sub';
const IPFS_PORT = process.env.IPFS_PORT || 5001;
const IPFS_PROTOCOL = process.env.IPFS_PROTOCOL || 'http';
const WEBHOOK_IPFS_PORT = process.env.WEBHOOK_IPFS_PORT || 3199;
const NODEOS_CHAINID = process.env.NODEOS_CHAINID || 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
const NODEOS_ZMQ_PORT = 5557;
const NODEOS_WEBSOCKET_PORT = 8887;

// Assert .env
if (['zmq_plugin', 'state_history_plugin'].indexOf(DEMUX_BACKEND) === -1) throw new Error("DEMUX_BACKEND must be either 'zmq_plugin' or 'state_history_plugin'");
if (['http', 'https'].indexOf(IPFS_PROTOCOL) === -1) throw new Error("IPFS_PROTOCOL must be either 'http' or 'https'");
if (['true', 'false'].indexOf(NODEOS_SECURED) === -1) throw new Error("NODEOS_SECURED must be either 'true' or 'false'");

module.exports = {
  force: true,
  apps: [
    {
      name: 'dapp-services-node',
      script: path.join(__dirname, 'services', 'dapp-services-node', 'index.js'),
      autorestart: true,
      cwd: __dirname,
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      env: {
        NETWORK_PORT,
        WEBHOOK_DAPP_PORT,
        NODEOS_CHAINID,
        NODEOS_HOST,
        NODEOS_PORT,
        NODEOS_SECURED,
        NODEOS_ENDPOINT,
        DSP_ACCOUNT,
        DSP_PRIVATE_KEY,
      }
    },
    {
      name: 'demux',
      script: path.join(__dirname, 'services', 'demux', 'index.js'),
      autorestart: true,
      cwd: __dirname,
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      env: {
        NODEOS_CHAINID,
        NODEOS_HOST,
        NODEOS_PORT,
        NODEOS_SECURED,
        NODEOS_ZMQ_PORT,
        NODEOS_WEBSOCKET_PORT,
        NODEOS_ENDPOINT,
        SOCKET_MODE,
        DEMUX_BACKEND,
        WEBHOOK_DEMUX_PORT
      }
    },
    {
      name: 'ipfs-dapp-service-node',
      script: path.join(__dirname, 'services', 'ipfs-dapp-service-node', 'index.js'),
      autorestart: true,
      cwd: __dirname,
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      env: {
        NODEOS_CHAINID,
        NODEOS_HOST,
        NODEOS_PORT,
        NODEOS_SECURED,
        NODEOS_ENDPOINT,
        IPFS_HOST,
        IPFS_PORT,
        IPFS_PROTOCOL,
        WEBHOOK_IPFS_PORT,
        DSP_ACCOUNT,
        DSP_PRIVATE_KEY,
      }
    },
    {
      name: 'cron-dapp-service-node',
      script: path.join(__dirname, 'services', 'cron-dapp-service-node', 'index.js'),
      autorestart: true,
      cwd: __dirname,
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      env: {
        NODEOS_CHAINID,
        NODEOS_HOST,
        NODEOS_PORT,
        NODEOS_SECURED,
        NODEOS_ENDPOINT,
        DSP_ACCOUNT,
        DSP_PRIVATE_KEY,
      }
    },
    {
      name: 'oracle-dapp-service-node',
      script: path.join(__dirname, 'services', 'oracle-dapp-service-node', 'index.js'),
      autorestart: true,
      cwd: __dirname,
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      env: {
        NODEOS_CHAINID,
        NODEOS_HOST,
        NODEOS_PORT,
        NODEOS_SECURED,
        NODEOS_ENDPOINT,
        DSP_ACCOUNT,
        DSP_PRIVATE_KEY,
      }
    },
    {
      name: 'vaccounts-dapp-service-node',
      script: path.join(__dirname, 'services', 'vaccounts-dapp-service-node', 'index.js'),
      autorestart: true,
      cwd: __dirname,
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      env: {
        NODEOS_CHAINID,
        NODEOS_HOST,
        NODEOS_PORT,
        NODEOS_SECURED,
        NODEOS_ENDPOINT,
        DSP_ACCOUNT,
        DSP_PRIVATE_KEY,
      }
    }
  ]
};