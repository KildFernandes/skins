const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create skin', async () => {
    expect.assertions(1);
    const skin = await db.Skin.create({
        id: 1,
        name: 'phanton',
        tipo: 'oni'
    });
    expect(skin.id).toEqual(1);
});

test('get skin', async () => {
    expect.assertions(2);
    const skin = await db.Skin.findByPk(1);
    expect(skin.name).toEqual('phanton');
    expect(skin.tipo).toEqual('oni');
});

test('delete skin', async () => {
    expect.assertions(1);
    await db.Skin.destroy({
        where: {
            id: 1
        }
    });
    const skin = await db.Skin.findByPk(1);
    expect(skin).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});