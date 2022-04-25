import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

const { Feedback, Users } = models;
chai.should();
use(chaiHttp);

let loginToken;
const feedback = {
  feedback: 'feedback'
};

before(async () => {
  const res = await request(server).post('/api/user/login').send({
    email: 'demouser2@cod.be',
    password: 'altp6@random'
  });
  loginToken = res.body.accessToken;
});

describe('Feedback Accomodation', () => {
  describe('/POST api/v1/accommodations/:id/feedback', () => {
    it('Should validate Feedback', async () => {
      const requester = request(server).keepOpen();
      const [badReq, badReq2, badReq3] = await Promise.all([
        requester
          .post('/api/v1/accommodations/3/feedback')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            feedback: ''
          }),
        requester
          .post('/api/v1/accommodations/0/feedback')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            feedback: 'feedback'
          }),
        requester
          .post('/api/v1/accommodations/0rt/feedback')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            feedback: 'feedback'
          })
      ]);
      expect(badReq).to.have.status(400);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('Feedback has to be valid is not allowed to be empty');

      expect(badReq2).to.have.status(400);
      expect(badReq2.body).to.have.property('data');
      expect(badReq2.body.data)
        .to.have.property('message')
        .and.to.be.eql(
          'Accomodation id should be valid. must be greater than or equal to 1'
        );
      expect(badReq3).to.have.status(400);
      expect(badReq3.body).to.have.property('data');
      expect(badReq3.body.data)
        .to.have.property('message')
        .and.to.be.eql('Accomodation id should be valid. must be a number');
    });

    it('Should Check the right of who Feedback', async () => {
      const requester = request(server).keepOpen();
      const [badReq] = await Promise.all([
        requester
          .post('/api/v1/accommodations/2/feedback')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            feedback: 'feedback'
          })
      ]);
      expect(badReq).to.have.status(401);
      expect(badReq.body)
        .to.have.property('Error')
        .and.to.be.eql('At least one day in trip required');
    });

    it('Should check if user has accomodation and trip', async () => {
      const requester = request(server).keepOpen();
      const [badReq] = await Promise.all([
        requester
          .post('/api/v1/accommodations/100/feedback')
          .set('Authorization', `Bearer ${loginToken}`)
          .send({
            feedback: 'feedback'
          })
      ]);
      expect(badReq).to.have.status(404);
      expect(badReq.body)
        .to.have.property('Error')
        .and.to.be.eql('Accommodation not found');
    });

    it('Should save feedback', async () => {
      const res = await chai
        .request(server)
        .post('/api/v1/accommodations/3/feedback')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(feedback);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Feedback added successfully');
    });
  });

  describe('/GET api/v1/accommodations/:id/feedback', () => {
    it('Should get feedbacks of accomodation', async () => {
      const requester = request(server).keepOpen();
      const [req] = await Promise.all([
        requester
          .get('/api/v1/accommodations/3/feedback')
          .set('Authorization', `Bearer ${loginToken}`)
      ]);
      expect(req).to.have.status(200);
      expect(req.body).to.have.property('data');
      expect(req.body.data.message).to.be.eql('Feedbacks fetched successfully');
      expect(req.body.data).to.have.property('data').and.to.be.an('array');
    });
  });
});
