# rabbit-mySQL-test-task
# users-service
Service with basic CRUD operations for Users entity.
On GET users/:id endpoint there is a middleware, to validate JWT from header using amqlib to connect to authorization-service.

# authorization-service
Service with login endpoint for getting JWT and validate GET user request using RabbitMQ and ampqlib.