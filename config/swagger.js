const swagerOption = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Game CRUD App",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Minnat Ali",
        email: "minnatali65@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.swaggerURL, // for localhost make it http://localhost:4000
      },
    ],
  },
  apis: ["./routes/game/*.js"],
};

export { swagerOption };