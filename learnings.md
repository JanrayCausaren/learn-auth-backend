Object-Relational Mapping (ORM) is a programming technique that lets developers interact with a relational database using object-oriented code rather than writing raw SQL queries. It acts as a bridge or translator, automatically converting data between incompatible type systems—translating database rows into application objects and vice-versa.

Prisma (ORM)

## login responsibility

- validate the request - Before touching the database, validate the incoming data. (using zod)
- sanitize or normalize the data before saving the value
- check uniqueness - Before creating the account, ensure the user doesn't already exist.
- hash password - Never save plaintext passwords. (bcrypt.)
- Create the user
- Create related records (optional)

- Generate verification token - If email verification is enabled
- Send verification email
- Return a response -
- Handle errors - Duplicate email(409), Validation(400), Unexpected error(500), prisma errors

- Log important events - Useful for auditing and debugging.
- Rate limiting (recommended) - Prevent abuse. - This helps stop bots from creating thousands of accounts.
- Security checks
  - Some common additions:
  - CORS
  - Helmet
  - Input validation
  - Password hashing
  - SQL injection protection (Prisma already parameterizes queries)
  - XSS prevention where appropriate
  - HTTPS in production

- Issue authentication
- Option A (recommended)
  After registration:
  Register
  ↓
  Send verification email
  ↓
  User verifies email
  ↓
  Login
  ↓
  Receive JWT/access token
  The user is not logged in immediately.

- Option B
  Register
  ↓
  Create account
  ↓
  Generate JWT
  ↓
  Return token

The user is automatically logged in after registering.

## Dependencies I used

- bcrypt
  A library to help you hash passwords.

# ratelimiting

- Rate limiting is a technique that restricts the number of requests a client (like a user or bot) can make to a server or API within a specific time window.
