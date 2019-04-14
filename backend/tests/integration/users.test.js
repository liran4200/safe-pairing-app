const request = require('supertest');
const {User, validate} = require('../../models/user');
let server;
describe('/api/users/', () => {

    beforeEach( () => {server = require('../../index');});
    afterEach( async () => {
        server.close();
        await User.remove({});            
    });

    describe('GET /search/?keyWord={keyWord}&pageNumber={pageNumber}&pageSize={pageSize}', () => {
        beforeEach( () => {server = require('../../index');});
        afterEach( async () => {
            server.close();
            await User.remove({});            
        });

        it('should return 2 users which contains liran in their firstName in page 1', async () => {
            await User.collection.insertMany([
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                },
                {
                    "firstName": "Liran",
                    "lastName": "yehaaa",
                    "email": "liran@gmail.com",
                    "password": "L2222"
                }
            ]);
            const res = await request(server).get('/api/users/search/?keyWord=liran&pageNumber=1&pageSize=2');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body[0].firstName.toLowerCase()).toMatch(/liran/);
            expect(res.body[0].firstName.toLowerCase()).toMatch(/liran/);
        });

        it('should return 1 user which contains yehudar in their lastName in page 1', async () => {
            await User.collection.insertMany([
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                },
                {
                    "firstName": "Liran",
                    "lastName": "yehaaa",
                    "email": "liran@gmail.com",
                    "password": "L2222"
                }
            ]);
            const res = await request(server).get('/api/users/search/?keyWord=yehudar&pageNumber=1&pageSize=2');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].lastName.toLowerCase()).toMatch(/yehudar/);
        });

        it('should return 1 user with equal email in page 1', async () => {
            await User.collection.insertMany([
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                },
                {
                    "firstName": "Liran",
                    "lastName": "yehaaa",
                    "email": "liran@gmail.com",
                    "password": "L2222"
                }
            ]);
            const res = await request(server).get('/api/users/search/?keyWord=liran@gmail.com&pageNumber=1&pageSize=2');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].email).toMatch(/liran@gmail.com/);
        });

        it('should return 400 if pageNumber or pageSize invalid', async () => {
            const res = await request(server).get('/api/users/search/?keyWord=yehudar&pageNumber=0&pageSize=2');
            expect(res.status).toBe(400);
        });
    });

    describe('GET /:id', () => {
        it('should return user with the given id', async () => {
            const user = new User(
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                });
            await user.save();

            const res = await request(server).get('/api/users/'+ user._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('lirann', user.name);
        });

        it('should return 400 if the id is invalid', async () => {
            const res = await request(server).get('/api/users/1');
            expect(res.status).toBe(400);
        });
    });

    describe('GET /me', () => {
        it('should return the current user who logged in', async () => {
            const user =
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                };

            const resWithToken = await request(server)
                        .post('/api/users/register')
                        .send(user);
            
            const res = await request(server)
                        .get('/api/users/me')
                        .set('x-auth-token', resWithToken.header['x-auth-token']);

            expect(res.status).toBe(200);
            expect(res.body._id).toBe(resWithToken.body._id);
        });

        it('should return 404 if user not found', async () => {
            const user =
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                };

            const resWithToken = await request(server)
                        .post('/api/users/register')
                        .send(user);
            
            await User.remove();
            const res = await request(server)
                        .get('/api/users/me')
                        .set('x-auth-token', resWithToken.header['x-auth-token']);

            expect(res.status).toBe(404);
        });

        it('should return 401 if no token provided ', async () => {
            const res = await request(server)
                        .get('/api/users/me');

            expect(res.status).toBe(401);
        });

        it('should return 400 if invalid token', async () => {
            const res = await request(server)
                        .get('/api/users/me')
                        .set("x-auth-token", "aaaaa");

            expect(res.status).toBe(400);
        });
    });

    describe('POST /register', () => {
        it('should return 400 if the user already exists', async () => {
            const user = new User(
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                });
            await user.save();

            const res = await request(server).post('/api/users/register').send(user);
            expect(res.status).toBe(400);
        });

        it('should save the user in DB', async () => {
            const user =
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                };

            const res = await request(server).post('/api/users/register').send(user);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
        });
    });
});