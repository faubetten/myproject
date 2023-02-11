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
                      return {status: 500, result: err };
                  }
              }

              static async getById(id) {
                try {
                    let [dbCards,fields] = 
                        await pool.query("Select * from cards where crd_id=$1",[id]);/* Query usando dodos do utilizador */
                    if (!dbCards)
                        return {status:404, result: {msg: "No card found with that identifier"}};
                    let dbCard = dbCards[0];
                    let result = cardFromDB(dbCard);
                    return {status: 200, result: result};
                } catch (err) {
                    console.log(err);
                    return {status: 500, result: err };
                }
            }
          }
          
          module.exports = Card;