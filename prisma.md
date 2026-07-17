1. npx prisma migrate dev

Purpose:
Creates a migration from your schema changes, applies it to the database, and regenerates the Prisma Client.

npx prisma migrate dev --name add-profile-table

Example:

You edit your schema:

model User {
  id    String @id @default(cuid())
  email String @unique
  age   Int?
}

Then run:

npx prisma migrate dev --name add-age

Prisma will:

Compare schema with database
Generate SQL migration
Apply migration
Update _prisma_migrations
Generate Prisma Client

This is the command you'll use most often during development.

2. npx prisma generate

Purpose:
Regenerates the Prisma Client.

npx prisma generate

Use this when:

You changed the generator
Prisma Client wasn't regenerated
You pulled a project from GitHub
You deleted generated/prisma

Normally migrate dev already runs this, so you rarely need it manually.

3. npx prisma studio

Purpose:
GUI for viewing and editing your database.

npx prisma studio

Looks like a spreadsheet.

You can:

View users
Edit records
Delete rows
Create rows

Very useful during development.

4. npx prisma migrate reset

Purpose:
Deletes everything and recreates the database.

npx prisma migrate reset

It will:

Drop database tables
Recreate schema
Run every migration
Generate client
Run seed (if configured)

Useful when your local database is messed up.

⚠️ Never run this on production.

5. npx prisma db push

Purpose:
Updates the database without creating migrations.

npx prisma db push

Good for:

Quick prototypes
Personal projects
Testing

Not recommended for production because there is no migration history.

6. npx prisma db pull

Purpose:
Reads an existing database and generates the Prisma schema.

npx prisma db pull

Useful when:

Someone else changed the database
You're working with an existing database
Legacy projects

Example:

Database:

users
posts
comments

Run:

npx prisma db pull

Prisma creates:

model User { ... }

model Post { ... }

model Comment { ... }
7. npx prisma migrate status

Purpose:
Checks if migrations and database are in sync.

npx prisma migrate status

Shows:

Applied migrations
Pending migrations
Drift detection

Useful before pushing changes.

8. npx prisma validate

Purpose:
Checks if your Prisma schema is valid.

npx prisma validate

It doesn't change anything.

It only checks for errors like:

Missing relations
Invalid attributes
Wrong field types