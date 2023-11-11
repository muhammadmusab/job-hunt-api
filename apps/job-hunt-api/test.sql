-- Active: 1674847851615@@127.0.0.1@5432@Job_Hunt
SELECT * FROM "Jobs" AS "Job" WHERE ("Job"."salary" >= '2200') AND ("Job"."salary" <= '3000');
SELECT * FROM "Jobs" AS "Job" WHERE salary>=2200 AND salary<=3000;