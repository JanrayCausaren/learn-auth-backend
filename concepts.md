 


# register/ signup

- user input data
- sanitize the request
- send request
- check if existing
  - if existing and not verified  -> generate and store token & send verification token/link -> response
    - check if theres a token to a specified user and use it if not expired -> if expired delete and generate a new one -> response
  - if existing and verified -> throw a conflict error
- if not existing
  - generate token and store hash token to the db
  -  return success response
  

# login
- user input data
- sanitize request
- check if existing and check if the email is verified
  - if existing and the password is correct and if not verified resend verification 
  - if not throw an error



POST /auth/register
If email doesn't exist → Create user and send verification email.
If email exists and is verified → Return 409 Conflict.
If email exists and is not verified → Resend verification email (or internally call the same resend service) and return a success message.
POST /auth/login
Check email and password.
If isEmailVerified === false → Return 403 Forbidden with "Please verify your email."
POST /auth/resend-verification
Reusable endpoint that generates a fresh token and sends a new email.

This gives users multiple ways to recover while keeping your database clean and avoiding duplicate accounts.