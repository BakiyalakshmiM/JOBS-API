# JOBS-API
Functionalities

Sign-up by using email id and password (/api/v1/auth/signup)
Login by providing email id and Password (/api/v1/auth/login)

While sign-up and login JWT token will be created for each user... Can do CRUD operations by providing token in the headers
Used bcrypt methods to store hashed password

Can create a Job for the user (/api/v1/jobs)
Can get all the Job created by the user (/api/v1/jobs)
Can get single job by providing job id (/api/v1/jobs/:id)
Can update a Job of the user (/api/v1/jobs/:id)
Can delete a Job of the user (/api/v1/jobs/:id)

Error Handler Routes