const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { before } = require("mocha");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET posts", () => {
  //   app.listen(5000);
  //   //chai.request(app);

  before(function (done) {
    this.timeout(3000);
    setTimeout(done, 2000);
  });

  //   it("should get all the posts", (done) => {
  //     request("http://localhost:5000").get("/blogs").expect(200, done);
  //   });

  it("should GET all the posts", (done) => {
    chai
      .request(server)
      .get("/blogs")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(3);
        done();
      });
  });

  it("should GET a post with a specific id", (done) => {
    chai
      .request(server)
      .get("/blogs/63174a230b2c949b81ad2982")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property("title", "Somerville clubhouse");
        done();
      });
  });

  it("should throw an error when id doesn't exist", (done) => {
    chai
      .request(server)
      .get("/blogs/63174a230b2c949b81ad2912")
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.error.text).to.be.a("string", "Error -listing not found!");
        //res.error.should.have.text("Error -listing not found!");
        console.log("ERROR:", err);
        // err.should.
        //       res.body.should.be.a("array");
        // res.body.length.should.be.eql(1);
        // res.body[0].should.have.property("title", "Somerville clubhouse");

        //CODE FOR LATER:
        // expect(err).to.throw("Error -listing not found!");
        done();
      });
  });
});
