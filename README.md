# Caching Proxy Server⚡

A simple CLI tool that starts a caching proxy server, forwarding requests to an origin server, caching responses for future requests and returning that responses.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Response Headers](#response-headers)
- [How Caching Wroks](#how-caching-works)

## Features

- Caches responses from the origin server.
- Returns cached responses when the same request is made.
- Adds `X-Cache` headers to indicate if the response is from the cache (`HIT`) or the origin server (`MISS`).
- Provides a command to clear the cache.

## Requirements

- Node.js (version 14 or higher)

## Installation

Clone the repository and navigate to the project directory:

```bash
$ git clone <repository-url>
$ cd caching-proxy
```

Install dependencies:

```bash
$ npm install
```

Install caching-proxy cli globally:

```bash
$ npm install -g .
```

## Usage

### Starting the Caching Proxy Server

Run the following command to start the server:

```bash
$ caching-proxy --port <number> --origin <url>
```

Example:

```bash
$ caching-proxy --port 3000 --origin http://dummyjson.com
```

The server will start on the specified port and forward requests to the specified origin server.

### Making Requests

After starting the server, you can make requests to the proxy server:

```bash
$ curl http://localhost:3000
```

### Clearing the Cache

To clear the cache, run:

```bash
$ caching-proxy --clear-cache
```

## Response Headers

- `X-Cache: HIT` - The response was returned from the cache.
- `X-Cache: MISS` - The response was fetched from the origin server and then cached.

## How Caching Works

- When a request is made, the server checks if the response for that request exists in the cache.
- If it does, it returns the cached response with the `X-Cache: HIT` header.
- If it doesn't, it forwards the request to the origin server, caches the response, and returns it with the `X-Cache: MISS` header.
