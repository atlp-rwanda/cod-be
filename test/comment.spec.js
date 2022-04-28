import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

const { Comments } = models;
chai.should();
use(chaiHttp);

let loginToken;
const comment = {
  comment: 'comment'
};

before(async () => {
  const res = await chai.request(server).post('/api/user/login').send({
    email: 'demouser2@cod.be',
    password: 'altp6@random'
  });
  loginToken = res.body.accessToken;
});

after(async () => {
  await Comments.destroy({ where: {} });
});

describe('Comments', () => {
  let commentId;
  describe('/POST Comment', () => {
    it('Should validate comment', async () => {
      const requester = chai.request(server).keepOpen();
      const [badReq] = await Promise.all([
        requester
          .post('/api/v1/trip/5ded92bb-69c2-414c-8ad8-7c0f4096e9cb/comment')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            comment: ''
          })
      ]);
      expect(badReq).to.have.status(400);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('Enter valid comment is not allowed to be empty');
    });

    it('Should create new comment', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/trip/5ded92bb-69c2-414c-8ad8-7c0f4096e9cb/comment')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(comment);
      commentId = res.body.data.data.id;
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Comment created successfully');
    });
  });

  describe('/GET Comment', () => {
    it('Should get comments of a trip request', async () => {
      const requester = chai.request(server).keepOpen();
      const [req] = await Promise.all([
        requester
          .get('/api/v1/trip/5ded92bb-69c2-414c-8ad8-7c0f4096e9cb/comment')
          .set('Authorization', `Bearer ${loginToken}`)
      ]);
      expect(req).to.have.status(200);
      expect(req.body).to.have.property('data');
      expect(req.body.data)
        .to.have.property('message')
        .and.to.be.eql('Comments fetched successfully');
    });
  });

  describe('/Delete Comment', () => {
    it('Should not delete unknown comment', async () => {
      const requester = chai.request(server).keepOpen();
      const [badReq, badReq2] = await Promise.all([
        requester
          .delete(`/api/v1/trip/comment/b66cfc7c-be2c-41f5-b459-e888bfe881a7`)
          .set('Authorization', `Bearer ${loginToken}`),
        requester
          .delete(`/api/v1/trip/comment/b66cfc7c-be2c-41f5-b459-e888bfe881a77`)
          .set('Authorization', `Bearer ${loginToken}`)
      ]);
      expect(badReq).to.have.status(404);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('Comment not found');

      expect(badReq2).to.have.status(500);
      expect(badReq2.body).to.have.property('data');
      expect(badReq2.body.data).to.have.property('error');
    });

    it('Should  delete comment if you own it', async () => {
      const requester = chai.request(server).keepOpen();
      const [req] = await Promise.all([
        requester
          .delete(`/api/v1/trip/comment/${commentId}`)
          .set('Authorization', `Bearer ${loginToken}`)
      ]);
      expect(req).to.have.status(200);
      expect(req.body).to.have.property('data');
      expect(req.body.data)
        .to.have.property('message')
        .and.to.be.eql('Comment deleted successfully');
    });
  });
});
