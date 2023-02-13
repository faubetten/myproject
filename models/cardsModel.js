const pool = require("../config/database");

function cardFromDB(dbObj) {
return new Card(dbObj.crd_id,dbObj.crd_name, 
dbObj.crd_img_url, dbObj.crd_lore, dbObj.crd_description,
dbObj.crd_level, dbObj.crd_cost, dbObj.crd_timeout,
dbObj.crd_max_usage, dbObj.crd_type);    
}
class Card {
constructor(id,name,url,lore,description, level, 
            cost, timeout, maxUsage, type) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.lore = lore;
    this.description = description;
    this.level = level;
    this.cost = cost;
    this.timeout = timeout;
    this.maxUsage = maxUsage;
    this.type = type;
}


/* Lista de Cartas */
static async getAll() {
    try {
        let result = [];
        let dbres = await pool.query("Select * from cards");
        let dbCards = dbres.rows;
        for(let dbCard of dbCards ){
        result.push(cardFromDB(dbCard));
        }
        return {status: 200, result: result};
    } catch (err) {
        console.log(err);
        return {status: 500, result: err};
    }
}

/* Carta por ID */
static async getById(id) {
try {
    let dbres = await pool.query('SELECT * FROM cards WHERE crd_id = $1', [id]);/* Query usando dodos do utilizador */
    let dbCards = dbres.rows;
    if (!dbCards.length)
        return {status:404, result: {msg: "No card found with that identifier"}};
    let dbCard = dbCards[0];
    let result = cardFromDB(dbCard);
    return {status: 200, result: result};
} catch (err) {
    console.log(err);
    return {status: 500, result: err };
}
}

static async save(newCard) {
try {
    let dbres = await pool.query('Select * from cards where crd_name=$1', [newCard.name]);
    let dbCards = dbres.rows;
    if (dbCards.length)
        return {
            status: 400, result: [{
                location: "body", param: "name",
                msg: "That name already exists"
            }]
        };
    let dbResult =
        await pool.query(`Insert into cards (crd_name, crd_img_url, crd_lore, 
        crd_description, crd_level, crd_cost, crd_timeout, crd_max_usage, crd_type)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [newCard.name, newCard.url, newCard.lore,
        newCard.description, newCard.level, newCard.cost, newCard.timeout,
        newCard.maxUsage, newCard.type]);
    return { status: 200, result: dbResult };
} catch (err) {
    console.log(err);
    return { status: 500, result: err };
}
}
}

module.exports = Card;