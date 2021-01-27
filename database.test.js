const db = require('./database');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create skin', async () => {
    expect.assertions(1);
    const skin = await db.skin.create({
        id: 1,
        name: 'phanton',
        tipo: 'oni'
    });
    expect(skin.id).toEqual(1);
});

test('get skin', async () => {
    expect.assertions(2);
    const skin = await db.skin.findByPk(1);
    expect(skin.name).toEqual('phanton');
    expect(skin.tipo).toEqual('oni');
});

test('delete skin', async () => {
    expect.assertions(1);
    await db.skin.destroy({
        where: {
            id: 1
        }
    });
    const skin = await db.skin.findByPk(1);
    expect(skin).toBeNull();
});


test('get all skins', async () => {
    expect.assertions(6);
    const skinOni = await db.skin.create({
        id: 3,
        name: 'phanton',
        tipo: 'oni'
    });
    
    const skinSublime = await db.skin.create({
        id: 4,
        name: 'vandal',
        tipo: 'sublime'
    });

    expect(skinOni.id).toEqual(3);
    expect(skinSublime.id).toEqual(4); 
    
    const skinFindOni = await db.skin.findByPk(3);
    const skinFindSublime = await db.skin.findByPk(4);
   
    expect(skinFindOni.name).toEqual('phanton');
    expect(skinFindSublime.name).toEqual('vandal');
    
    
    
    var res = await db.skin.findAll({ order: db.sequelize.random(), limit: 1 });
    console.log(res);
    
    await db.skin.destroy({
        where: {
            id: 3
        }
    });
    
    const skindell1 = await db.skin.findByPk(3);
    expect(skindell1).toBeNull();
    
    await db.skin.destroy({
        where: {
            id: 4
        }
    });
    const skindell2 = await db.skin.findByPk(4);
    expect(skindell2).toBeNull();
    
});

    test('save csv', async () => {
        db.skin.uploadCsv = async(data) => 
            fs.createReadStream("allSkins.csv")
                .pipe(new StringStream('utf-8'))
                .CSVParse({
                    delimiter: '\t', 
                    escapeChar: '"', 
                    quoteChar: '"'
                })
                .map(data => ({
                    name: data.name,
                    tipe: data.tipe,
                    id: data.id,
                    /*created_at: new Date(),
                    updated_at: new Date()*/
                }))
                .each(async entry => await db.skin.create(entry))
                .each(result => log(result)) // if it's worth logging
                .run();
        
        
        var res = await db.skin.findAll({ order: db.sequelize.random(), limit: 1 });
        console.log(res);
        
    });

afterAll(async () => {
    await db.sequelize.close();
});