import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

const { Message, Users } = models;
chai.should();
use(chaiHttp);

let loginToken;
const message = {
  message: 'message'
};

before(async () => {
  const res = await request(server).post('/api/user/login').send({
    email: 'demouser2@cod.be',
    password: 'altp6@random'
  });
  loginToken = res.body.accessToken;
});

describe('Chat Messages', () => {
  describe('/POST api/v1/chat/barefoot', () => {
    it('Should validate Message', async () => {
      const requester = request(server).keepOpen();
      const [badReq, badReq2, badReq3] = await Promise.all([
        requester
          .post('/api/v1/chat/barefoot')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            message_: 'message'
          }),
        requester
          .post('/api/v1/chat/barefoot')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            message: ''
          }),
        requester
          .post('/api/v1/chat/barefoot')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            message: 'message'.repeat(100)
          })
      ]);
      expect(badReq).to.have.status(400);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('Chat message is required');

      expect(badReq2).to.have.status(400);
      expect(badReq2.body).to.have.property('data');
      expect(badReq2.body.data)
        .to.have.property('message')
        .and.to.be.eql('Chat message is not allowed to be empty');
      expect(badReq3).to.have.status(400);
      expect(badReq3.body).to.have.property('data');
      expect(badReq3.body.data)
        .to.have.property('message')
        .and.to.be.eql(
          'Chat message length must be less than or equal to 500 characters long'
        );
    });

    it('Should Add Message in "barefoot" room ', async () => {
      const res = await request(server)
        .post('/api/v1/chat/barefoot')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(message);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Message added successfully');
    });

    it('Should get all Messages of "barefoot" room ', async () => {
      const res = await request(server)
        .get('/api/v1/chat/barefoot')
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Messages fetched successfully');
    });
  });
});
