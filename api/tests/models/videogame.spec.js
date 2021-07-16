const { Videogame,Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros', description:'asdasd',platforms:[{platform:{name:"xbox"}}]});
      });
      it('should have genres relationated',async ()=>{
        await Genre.create({name:"genre1"});
        await Genre.create({name:"genre2"});
        let game = await Videogame.create({ name: 'Super Mario Bros', description:'asdasd',platforms:[{platform:{name:"xbox"}}]});
        await game.setGenres([1,2]);
        const gameWithGenres = await Videogame.findAll({ include: Genre })
        expect(gameWithGenres[0].dataValues.genres).to.have.length(2);
      })
    });
  });
});
