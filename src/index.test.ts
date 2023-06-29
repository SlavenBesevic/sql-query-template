import { sql } from "./index";

test("Query without params", () => {
  const query = sql`
    SELECT *
    FROM users;`;

  expect(query.originalText).toHaveLength(1);
  expect(query.text).toBe(query.originalText[0]);
  expect(query.values).toHaveLength(0);
});

test("Query with params", () => {
  const id = 1;
  const query = sql`
    SELECT *
    FROM users
    WHERE "id" = ${id};`;

  expect(query.originalText).toHaveLength(2);
  expect(query.text).toBe(`
    SELECT *
    FROM users
    WHERE "id" = $1;`);
  expect(query.values).toHaveLength(1);
  expect(query.values[0]).toBe(id);
});

test("Nested queries", () => {
  const id = 1;
  const isActive = true;
  const where = sql`"id" = ${id} AND "isActive" = ${isActive}`;
  const query = sql`
    SELECT *
    FROM users
    WHERE ${where};`;

  expect(query.originalText).toHaveLength(3);
  expect(query.text).toBe(`
    SELECT *
    FROM users
    WHERE  "id" = $1 AND "isActive" = $2 ;`);
  expect(query.values).toHaveLength(2);
  expect(query.values[0]).toBe(id);
  expect(query.values[1]).toBe(isActive);
});
