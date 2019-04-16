const request = require('supertest');
const {User, validate} = require('../../models/user');
let server;
describe('/api/login/', () => {

    beforeEach( () => {server = require('../../index');});
    afterEach( async () => {
        server.close();
        await User.remove({});            
    });

    describe('POST /', () => {
        it('should return 404 if the user not found', async () => {
           
            const res = await request(server)
                    .post('/api/login')
                    .send({email: "liraddd@gmail.com",password: "lllll"});

            expect(res.status).toBe(404);
        });

        it('should return 400 if password or email invalid', async () => {
            const user = new User(
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                });
            await user.save();

            const res = await request(server)
                    .post('/api/login')
                    .send({email: "liran4200@gmail.com",password: "lllll"});

            expect(res.status).toBe(400);
        });

        it('should return 200 and auth token', async () => {
            const user =  
                {
                    "firstName": "lirann",
                    "lastName": "yehudar",
                    "email": "liran4200@gmail.com",
                    "password": "L2222"
                };
            await request(server)
                        .post('/api/users/register')
                        .send(user);

            const res = await request(server)
                    .post('/api/login')
                    .send({email: "liran4200@gmail.com",password: "L2222"});

            expect(res.status).toBe(200);
        });
    });
});