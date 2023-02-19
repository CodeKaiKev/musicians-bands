const {sequelize} = require('./db');
const {Band, Musician} = require('./index');
const { Song } = require('./Song');

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

    })
    afterEach(async () => {
        // await sequelize.sync({ force: true });
    })
    // test('can create a Band', async () => {
    //     const testUser = await User.create({ name: 'George', password: '123' });
    //     expect(testUser.name).toBe('George');
    // }
    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({ name: 'KevinBands', genre: "Rock", showCount: 1 });
        expect(testBand.name).toBe('KevinBands');
        expect(testBand.genre).toBe('Rock');
        expect(testBand.showCount).toBe(1);
    })

    test('can  update a band', async () => {
        const test2Band = await Band.create({name: 'George', genre: 'Bass', showCount: 2});
        test2Band.update({name: 'Zion'});
        expect(test2Band.name).toBe('Zion');
    })

    test('can  update a band', async () => {
        const test2Band = await Band.create({name: 'George', genre: 'Bass', showCount: 2});
        test2Band.update({name: 'Zion'});
        expect(test2Band.name).toBe('Zion');
    })
    test('delete a band', async () => {
        const test3Band = await Band.create({name: 'George', genre: 'Bass', showCount: 2});
     
        let deletedBand = await test3Band.destroy();
     []
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({ name: 'Kevin', instrument: 'Saxophone'});
        expect(testMusician.name).toBe('Kevin');
        expect(testMusician.instrument).toBe('Saxophone');
    })

    test('testing associations', async () => {
        const test62Band = await Band.create({
            name: 'gh',
            genre: 'Basfs',
            showCount: 5
        });

        const music69 = await Musician.create({
             name: 'Kevin',
              instrument: 'Guitar'
        });

        await test62Band.addMusician(music69);
        console.log('Testing associations');
        
        const checker = await test62Band.getMusicians();
        console.log(checker);
        expect(checker[0].id).toBe(music69.id);
       
        await music69.setBand(test62Band);
        expect((await music69.getBand()).id).toBe(test62Band.id);

        // const foundBand = await Band.findAll({
        //     include: Musician
        // });
        // // const check = await test62Band.getMusician(music69);
        
        // console.log(test62Band, music69);
      
    })

    test('testing songs', async () => {
        const test64Band = await Band.create({
            name: 'psy',
            genre: 'Kpop',
            showCount: 50
        });

        const someSong = await Song.create({
            title: 'Gangnam',
            year: 2000
        })
        const someSong2 = await Song.create({
            title: 'Watermelon',
            year: 2020
        })

        await test64Band.addSong(someSong);
        await test64Band.addSong(someSong2);
        

        const checker = await test64Band.getSongs();

        expect(checker[0].id).toBe(someSong.id);
        expect(checker[1].id).toBe(someSong2.id);

        await someSong.addBand(test64Band);
        //Lazy loading
        const bandCheck = await someSong.getBands();

        expect(bandCheck[0].id).toBe(test64Band.id);

        //Eager loading
        const bands = await Band.findAll({
            include: [ { model: Song}]
        })

        expect(bands[0].id).toBe(someSong.id);
        console.log(JSON.stringify(bands, null, 2));

        
    })
});