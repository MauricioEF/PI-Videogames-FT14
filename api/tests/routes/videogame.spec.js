/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description:'SUPER MARIO BROTHERS',
  platforms:[],
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', async () =>
      {
        res = await agent.get('/videogames/')
        return expect(res.status).to.be.equal(200);
      }
    );
    it('should get 400 if there are insufficient data to create the game',()=>
      agent.post('/videogame/create').send({name:"Hola"}).then((res)=>expect(res.status).to.be.equal(400))
    )
  });
});
