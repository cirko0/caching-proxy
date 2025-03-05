import axios from "axios";
import express from "express";

const app = express();

let cache = {};

export const clearCache = () => {
  cache = {};
};

export const startProxyServer = (port, url) => {
  app.use(async (req, res, next) => {
    try {
      const newUrl = url + req.originalUrl;

      if (newUrl.includes("favicon.ico")) return next();

      if (cache[newUrl]) {
        res.setHeader("X-Cache", "HIT");

        // Restoring cached headers
        Object.entries(cache[newUrl].headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });

        console.log("Cached Response ⚡");
        return res.send(cache[newUrl].data);
      }

      const response = await axios.get(newUrl);

      res.setHeader("X-Cache", "MISS");

      // Copy headers from axios response to Express response
      Object.entries(response.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      cache[newUrl] = response;

      console.log("Regular Response 🌵");

      res.send(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
};
