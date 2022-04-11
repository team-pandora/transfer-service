/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import config from '../src/config';
import Server from '../src/express/server';

jest.setTimeout(30000);

const removeTransferCollection = async () =>
    mongoose.connection.collections[config.mongo.transfersCollectionName].deleteMany({});

describe('transfers tests', () => {
    let app: Express.Application;

    beforeAll(async () => {
        await mongoose.connect(config.mongo.uri);
        await removeTransferCollection();
        app = Server.createExpressApp();
    });

    afterEach(async () => {
        await removeTransferCollection();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('/api/transfers', () => {
        describe('POST', () => {
            it('should fail validation for unknown fields', () => {
                return request(app).post('/api/transfers').send({ invalidField: 'some value' }).expect(400);
            });

            it('should fail because of missing fields ', async () => {
                return request(app).post('/api/transfers').send({}).expect(400);
            });

            it('should fail with duplicate key error ', async () => {
                const newTransfer = {
                    requestId: 'reqId',
                    userId: 'userId',
                    recipients: ['recipient1', 'recipient2'],
                    classification: 'classification',
                    fileName: 'fileName',
                    fileSize: 0,
                    destination: 'destination',
                };
                await request(app).post('/api/transfers').send(newTransfer).expect(200);
                await request(app).post('/api/transfers').send(newTransfer).expect(400);
            });

            it('should create a transfer', async () => {
                const newTransfer = {
                    requestId: 'reqId',
                    userId: 'userId',
                    recipients: ['recipient1', 'recipient2'],
                    classification: 'classification',
                    fileName: 'fileName',
                    fileSize: 0,
                    destination: 'destination',
                };
                const { body: createdTransfer } = await request(app)
                    .post('/api/transfers')
                    .send(newTransfer)
                    .expect(200);

                expect(mongoose.Types.ObjectId.isValid(createdTransfer._id)).toBe(true);
                expect(createdTransfer).toMatchObject(newTransfer);
                expect(new Date(createdTransfer.createdAt).getTime()).toBeCloseTo(Date.now(), -2);
                expect(new Date(createdTransfer.updatedAt).getTime()).toBeCloseTo(Date.now(), -2);
            });
        });

        describe('GET', () => {
            it('should return all transfers', async () => {
                const newTransfer = {
                    requestId: 'reqId',
                    userId: 'userId',
                    recipients: ['recipient1', 'recipient2'],
                    classification: 'classification',
                    fileName: 'fileName',
                    fileSize: 0,
                    destination: 'destination',
                };
                await request(app).post('/api/transfers').send(newTransfer).expect(200);

                const { body: transfers } = await request(app).get('/api/transfers').expect(200);
                expect(transfers).toHaveLength(1);
                expect(mongoose.Types.ObjectId.isValid(transfers[0]._id)).toBe(true);
            });
        });

        describe('DELETE', () => {
            it('should delete a transfer', async () => {
                const newTransfer = {
                    requestId: 'reqId',
                    userId: 'userId',
                    recipients: ['recipient1', 'recipient2'],
                    classification: 'classification',
                    fileName: 'fileName',
                    fileSize: 0,
                    destination: 'destination',
                };
                await request(app).post('/api/transfers').send(newTransfer).expect(200);
                const { body: transfers } = await request(app).get('/api/transfers').expect(200);
                await request(app).delete(`/api/transfers/${transfers[0].requestId}`).expect(200);
                const { body: transfersAfterDelete } = await request(app).get('/api/transfers').expect(200);
                expect(transfersAfterDelete).toHaveLength(0);
            });
        });
    });
});
