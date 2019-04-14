const request = require('supertest');
const {User, validate} = require('../../models/user');
let server;
describe('/api/users/', () => {
    
    describe('GET /', () => {
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

        it('should return message error because pageNumber or pageSize invalid', async () => {
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
            const res = await request(server).get('/api/users/search/?keyWord=yehudar&pageNumber=0&pageSize=2');
            expect(res.status).toBe(400);
            expect(res.text).toEqual("Invalid pageNumber or pageSize");
        });

    });
});