/*eslint-disable*/
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import { mock } from "sinon";
import { googleCb ,facebookCb} from "../src/controllers/socialOauth.controller";
import { userToken } from "../src/routes/socialOauth.route";

var strategy = require("../src");
const { expect } = chai;
chai.use(chaiHttp);

const mockUser = {
  uuid: 1,
  fName: "John ",
  lName: "Test",
  email: "johntest@gmail.com",
};

describe("passport-google-oauth", function () {
  it("Should alias Strategy to OAuthStrategy using google", function () {
    expect(strategy.Strategy).to.equal(strategy.OAuthStrategy);
     });
   });

describe("passport-facebook", function () {
it("should alias Strategy to FacebookStrategy", function () {
    expect(strategy.Strategy).to.equal(strategy.FacebookStrategy);
    });
    });

describe("Google Endpoints", () => {

  it("should login using google acount", (done) => {
    chai
      .request(app)
      .get(`/auth/google`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("Should not allow accessing callback route directly", (done) => {
    chai
      .request(app)
      .get(`auth/google/callback`)
      .end((err, res) => {
        expect(err.code).to.equal('ECONNREFUSED');
        done();
      });
  });

  it("`Should invoke done  after finding or creating a user", async () => {
    const doneMock = mock();
    const mockUser = {
      _json: {
        fName: "testuser1",
        lName: "testuser",
        email: "testUser@gmail.com",
      },
    };

    await googleCb(null, null, mockUser, doneMock);
  });

});

describe("Facebook Endpoints", () => {

  it("should login using facebook acount", (done) => {
    chai
      .request(app)
      .get(`/auth/facebook`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("Should not allow accessing callback route directly", (done) => {
    chai
      .request(app)
      .get(`auth/facebook/callback`)
      .end((err, res) => {
        expect(err.code).to.equal('ECONNREFUSED');
        done();
      });
  });

  it("`Should invoke done  after finding or creating a user", async () => {
    const doneMock = mock();
    const mockUser = {
      _json: {
        fName: "testuser1",
        lName: "testuser",
        email: "testUser@gmail.com",
      },
    };

    await facebookCb(null, null, mockUser, doneMock);
  });

});