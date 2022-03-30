import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';
import { createComment } from '../src/services/commentService';

const { Comments, Users } = models;
chai.should();
use(chaiHttp);

let loginToken;
const comment = {
  comment: 'comment'
};

before(async () => {
  await Users.create({
    email: 'random1@gmail.com',
    firstname: 'Random',
    lastname: 'Person',
    password: '$2a$12$qFP7wTRyEEclEjdoDA9OBOV3xDorty5aaE.nEy2lCRQwgVOdp1lIq',
    isVerified: true
  });

  const res = await request(server).post('/api/user/login').send({
    email: 'random1@gmail.com',
    password: 'pswd123'
  });
  loginToken = res.body.accessToken;
});

after(async () => {
  await Comments.destroy({ where: {} });
  await Users.destroy({ where: { email: 'random@gmail.com' } });
});

describe('Comments', () => {
  let commentId, tripId;
  describe('/POST Comment', () => {
    it('Should validate comment', async () => {
      const requester = request(server).keepOpen();
      const [badReq] = await Promise.all([
        requester
          .post('/api/v1/trip/b66cfc7c-be2c-41f5-b459-e888bfe881a6/comment')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            comment: ''
          })
      ]);
      expect(badReq).to.have.status(400);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data)
        .to.have.property('error')
        .and.to.be.eql('a Comment required is not allowed to be empty');
    });

    it('Should create new comment', async () => {
      const res = await request(server)
        .post('/api/v1/trip/b66cfc7c-be2c-41f5-b459-e888bfe881a6/comment')
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
      const requester = request(server).keepOpen();
      const [req] = await Promise.all([
        requester
          .get('/api/v1/trip/b66cfc7c-be2c-41f5-b459-e888bfe881a6/comment')
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
      const requester = request(server).keepOpen();
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
      expect(badReq2.body.data)
        .to.have.property('error')
    });

    it('Should  delete comment if you own it', async () => {
        const requester = request(server).keepOpen();
        const [req] = await Promise.all([
          requester
            .delete(`/api/v1/trip/comment/${commentId}`)
            .set('Authorization', `Bearer ${loginToken}`),
        ]);
        expect(req).to.have.status(202);
        expect(req.body).to.have.property('data');
        expect(req.body.data)
          .to.have.property('message')
          .and.to.be.eql('Comment deleted successfully');
      });
  });
});
