Nested Writes
Best for: Related records that are created or updated together.
Use case: User Registration

Tables:

User
Profile

Every user must have one profile.

await prisma.user.create({
  data: {
    email: "john@example.com",
    password: hashedPassword,
    profile: {
      create: {
        firstName: "John",
        lastName: "Doe",
      },
    },
  },
});

Internally

BEGIN

INSERT User

INSERT Profile

COMMIT

If profile creation fails:

ROLLBACK

No user is created.


2. Batch Operations (createMany, updateMany, deleteMany)

Best for many rows of the same model.


se case: Import Employees

CSV contains

Alice
Bob
Charlie
...
1000 employees

Instead of

for (...) {
    await prisma.employee.create(...)
}

Do

await prisma.employee.createMany({
    data: employees
});

One operation.

Much faster.

Use case: Disable inactive users
await prisma.user.updateMany({
    where: {
        lastLoginAt: {
            lt: oneYearAgo
        }
    },
    data: {
        isActive: false
    }
});

Thousands of users updated in one statement.


3. Sequential Transaction ($transaction([]))

Best when queries are independent but you want them to succeed or fail together.

Use case: System Cleanup
await prisma.$transaction([

    prisma.verificationToken.deleteMany({
        where: {
            expiresAt: {
                lt: new Date()
            }
        }
    }),

    prisma.cooldown.deleteMany({
        where: {
            expiresAt: {
                lt: new Date()
            }
        }
    }),

    prisma.passwordReset.deleteMany({
        where: {
            expiresAt: {
                lt: new Date()
            }
        }
    })

]);

These don't depend on each other.

But either

All cleanup succeeds

or

Everything rolls back
Another example

Dashboard

const [users, posts, comments] =
await prisma.$transaction([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count()
]);

You get a consistent snapshot of related counts at one point in time.



4. Interactive Transaction ($transaction(async tx => {}))

This is where enterprise applications spend most of their transaction logic.

Use case: Registration
await prisma.$transaction(async (tx) => {

    const user = await tx.user.create(...);

    await tx.profile.create(...);

    await tx.role.create(...);

    await tx.verificationToken.create(...);

});

Everything depends on

user.id
Use case: Checkout
Order

↓

Order Items

↓

Reduce Inventory

↓

Payment Record

↓

Audit Log
await prisma.$transaction(async (tx) => {

    const order = await tx.order.create(...);

    await tx.orderItem.createMany(...);

    await tx.inventory.update(...);

    await tx.payment.create(...);

    await tx.auditLog.create(...);

});

If inventory fails

ROLLBACK

No order exists.

Use case: Bank Transfer
Account A

↓

Withdraw

↓

Account B

↓

Deposit

↓

Transaction History
await prisma.$transaction(async (tx) => {

    await tx.account.update(...);

    await tx.account.update(...);

    await tx.transfer.create(...);

});

Never leave money withdrawn without depositing it.


Use case: Booking Tickets
Seat

↓

Reserve Seat

↓

Create Booking

↓

Charge Customer
await prisma.$transaction(async (tx) => {

    const seat = await tx.seat.findUnique(...);

    if (seat.booked)
        throw new Error();

    await tx.seat.update(...);

    await tx.booking.create(...);

    await tx.payment.create(...);

});

Prevents inconsistent booking states.









Enterprise decision tree

When deciding which approach to use, you can ask yourself these questions in order:

Need to create/update related records
in one Prisma query?

        YES
         │
         ▼
Nested Writes

↓

Need to insert/update/delete many
rows of ONE table?

        YES
         │
         ▼
createMany/updateMany/deleteMany

↓

Need several independent queries
to commit together?

        YES
         │
         ▼
$transaction([])

↓

Does one query depend on the
result of another?

Need if/else?

Need loops?

Need validation between queries?

        YES
         │
         ▼
$transaction(async (tx) => {})
Which ones will you use most?

Given the authentication system you've been building:

Nested writes: Occasionally, such as creating a User and Profile together.
Batch operations: Fairly often for maintenance tasks like deleting expired verification tokens or deactivating inactive users.
Sequential transactions ($transaction([])): Occasionally, for grouping independent operations or obtaining a consistent snapshot across multiple reads.
Interactive transactions ($transaction(async (tx) => {})): Very frequently. Registration, password resets, role assignment, email verification, audit logging, and any multi-step business process are all strong candidates.

The pattern you'll see in many enterprise backends is that interactive transactions are used to protect business workflows, while nested writes and batch operations simplify common database operations without requiring explicit transaction management.