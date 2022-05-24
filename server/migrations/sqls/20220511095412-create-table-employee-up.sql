CREATE TABLE directory.employee (
  id serial PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  picture text NOT NULL,
  job_title text NOT NULL,
  country text NOT NULL
);
