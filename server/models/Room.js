module.exports = {
  get: function (con, id, callback) {
    con.query(`SELECT *  FROM kambariai WHERE numeris='${id}'`, callback);
  },

  getAll: function (con, callback) {
    con.query(`SELECT *, kambario_tipai.name as f_tipas, vaizdo_tipai.name as f_vaizdas FROM kambariai LEFT JOIN kambario_tipai ON id_Kambario_tipas = kambario_tipas
    LEFT JOIN vaizdo_tipai ON id_Vaizdo_tipas = vaizdas`, callback);
  },
  delete: function (con, id, callback) {
    con.query(`DELETE FROM kambariai WHERE numeris='${id}'`, callback);
  },

  createRoom: function (con, data, receptionist, callback) {
    internet = data.internet ? 1 : 0;
    tv = data.tv ? 1 : 0;
    safe = data.safe ? 1 : 0;
    bath = data.bath ? 1 : 0;
    bar = data.bar ? 1 : 0;

    con.query(
      `INSERT INTO kambariai (aukstas, lovu_skaicius, aprasymas, yra_internetas, kambario_dydis, numeris, yra_televizorius, 
        yra_seifas, yra_vonia, yra_mini_baras, kaina, islaikymo_islaidos, kambario_tipas, vaizdas, fk_Registratūros_darbuotojas) 
        VALUES ('${data.floor}', '${data.numOfBeds}', '${data.description}', '${internet}' , '${data.roomSize}' , '${data.roomNumber}' , '${tv}'
        , '${safe}' , '${bath}' , '${bar}' , '${data.roomPrice}' , '${data.roomMaintainancePrice}'
        , '${data.type}' , '${data.view}', 18);`,
      callback
    );
  },

  updateRoom: function (con, data, callback) {
    internet = data.internet ? 1 : 0;
    tv = data.tv ? 1 : 0;
    safe = data.safe ? 1 : 0;
    bath = data.bath ? 1 : 0;
    bar = data.bar ? 1 : 0;

    con.query(
      `UPDATE kambariai  SET 
    aukstas='${data.floor}', lovu_skaicius='${data.beds}', aprasymas='${data.description}', yra_internetas='${internet}', kambario_dydis='${data.size}', yra_televizorius='${tv}', 
      yra_seifas='${safe}', yra_vonia='${bath}', yra_mini_baras='${bar}', kaina='${data.price}', islaikymo_islaidos='${data.maintainancePrice}', kambario_tipas='${data.type}', vaizdas='${data.view}', fk_Registratūros_darbuotojas=18
      WHERE numeris='${data.number}'`,
      callback
    );
  },
};
