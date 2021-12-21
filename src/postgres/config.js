const baseConfig = {
  connectionString: process.env.DATABASE_URL,
};

const isProd = (process.env.WORKING_ENV || "stage") === "prod";

export const config = isProd ? baseConfig : { ...baseConfig, ssl: { rejectUnauthorized: false } };
