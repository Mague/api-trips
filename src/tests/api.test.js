const { app, start, close } = require('../app')
const chai = require('chai')
const request = require('chai').request
const expect = require('chai').expect
const chaiHttp = require("chai-http");
const assert = require("assert");
chai.use(chaiHttp)

describe('trips', () => {
    beforeEach(function() {
        start();
    });
    after(async function(done) {
        await done();
        close();
    });
    it('should return list empty of trips', () => {
        chai.request(app)
            .get("/api/trips/v1")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");
                expect(res.body).to.be.a("array").length(0);
            }).catch((err) => {
                //close();
                throw err;
            });
    })

    it('should create new trip', () => {
        let data = {
            readings: [{
                    time: 1642500462000,
                    speed: 9,
                    speedLimit: 38,
                    location: {
                        lat: -33.580158,
                        lon: -70.567227,
                    },
                },
                {
                    time: 1642500466000,
                    speed: 26,
                    speedLimit: 38,
                    location: {
                        lat: -33.58013,
                        lon: -70.566995,
                    },
                },
                {
                    time: 1642500470000,
                    speed: 28,
                    speedLimit: 38,
                    location: {
                        lat: -33.580117,
                        lon: -70.566633,
                    },
                },
                {
                    time: 1642500474000,
                    speed: 13,
                    speedLimit: 38,
                    location: {
                        lat: -33.580078,
                        lon: -70.566408,
                    },
                },
                {
                    time: 1642500478000,
                    speed: 18,
                    speedLimit: 38,
                    location: {
                        lat: -33.580005,
                        lon: -70.566498,
                    },
                },
                {
                    time: 1642500482000,
                    speed: 32,
                    speedLimit: 38,
                    location: {
                        lat: -33.58002,
                        lon: -70.566837,
                    },
                },
                {
                    time: 1642500486000,
                    speed: 38,
                    speedLimit: 38,
                    location: {
                        lat: -33.580038,
                        lon: -70.567265,
                    },
                },
                {
                    time: 1642500490000,
                    speed: 38,
                    speedLimit: 38,
                    location: {
                        lat: -33.580043,
                        lon: -70.56773,
                    },
                },
                {
                    time: 1642500494000,
                    speed: 35,
                    speedLimit: 38,
                    location: {
                        lat: -33.580048,
                        lon: -70.56817,
                    },
                },
                {
                    time: 1642500498000,
                    speed: 20,
                    speedLimit: 38,
                    location: {
                        lat: -33.580053,
                        lon: -70.568502,
                    },
                },
            ],
        };
        chai.request(app).post("/api/trips/v1").send(data).then((res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.a("object");
            expect(res.body).to.be.a("array").length(1);
        })
    })
    it("it must fail to create a new trip because it does not meet the minimum number of readings.", () => {
        let data = {
            readings: [{
                    time: 1642500462000,
                    speed: 9,
                    speedLimit: 38,
                    location: {
                        lat: -33.580158,
                        lon: -70.567227,
                    },
                },
                {
                    time: 1642500466000,
                    speed: 26,
                    speedLimit: 38,
                    location: {
                        lat: -33.58013,
                        lon: -70.566995,
                    },
                },
                {
                    time: 1642500470000,
                    speed: 28,
                    speedLimit: 38,
                    location: {
                        lat: -33.580117,
                        lon: -70.566633,
                    },
                },
                {
                    time: 1642500474000,
                    speed: 13,
                    speedLimit: 38,
                    location: {
                        lat: -33.580078,
                        lon: -70.566408,
                    },
                }
            ],
        };
        chai
            .request(app)
            .post("/api/trips/v1")
            .send(data)
            .then((res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.be.a("object");
            });
    });

    it("should return list of trips filter by start_lte time", () => {
        chai
            .request(app)
            .get("/api/trips/v1?start_lte=1642500462000")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");
                expect(res.body).to.be.a("array").length(1);
            })
            .catch((err) => {
                //close();
                throw err;
            });
    });
})