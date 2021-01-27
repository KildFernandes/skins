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
        const csvFilePath='./allSkins.csv'
        const csv=require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */ 
        })
        
        const jsonArray=await csv().fromFile(csvFilePath);
        db.skin.bulkCreate(jsonArray, {returning: true});
       
        await db.skin.destroy({
            where: {
                id: 8
            }
        });
        await db.skin.destroy({
            where: {
                id: 9
            }
        });
        await db.skin.destroy({
            where: {
                id: 10
            }
        });
       

    });

afterAll(async () => {
    await db.sequelize.close();
});