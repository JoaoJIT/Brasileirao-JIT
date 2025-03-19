import postgres from "pg";

const connection = new postgres.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1981",
  port: 5432,
});

try {
  connection.connect();
  console.log("connected to database successfully");
} catch (error) {
  console.log("error connecting to database", error);
}

export default connection;
