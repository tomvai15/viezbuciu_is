const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
};
module.exports = {
  get: function (con, id, callback) {
    con.query(`SELECT *  FROM kambariai WHERE numeris='${id}'`, callback);
  },

  getAll: function (con, callback) {
    con.query(
      `SELECT *, kambario_tipai.name as f_tipas, vaizdo_tipai.name as f_vaizdas FROM kambariai LEFT JOIN kambario_tipai ON id_Kambario_tipas = kambario_tipas
    LEFT JOIN vaizdo_tipai ON id_Vaizdo_tipas = vaizdas`,
      callback
    );
  },
  delete: function (con, id, callback) {
    con.query(`DELETE FROM kambariai WHERE numeris='${id}'`, callback);
  },

  createRoom: function (con, data, callback) {
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
        , '${data.type}' , '${data.view}', ${data.receptionist.id});`,
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

  usedRooms: function (con, callback) {
    con.query(
      `SELECT Count(*) as count FROM rezervacijos WHERE pradzia <= '${getCurrentDate()}' and fk_Kambarys IS NOT NULL`,
      callback
    );
  },

  waitingRooms: function (con, callback) {
    con.query(
      `SELECT Count(*) as count FROM rezervacijos WHERE pradzia <= '${getCurrentDate()}' and fk_Kambarys IS NULL`,
      callback
    );
  },

  departure: function (con, callback) {
    con.query(
      `SELECT Count(*) as count FROM rezervacijos WHERE pabaiga = '${getCurrentDate()}'`,
      callback
    );
  },

  numOfRooms: function (con, callback) {
    con.query(`SELECT Count(*) as count FROM kambariai`, callback);
  },

  assignRoom: function (con, data, callback) {
    // console.log( `UPDATE rezervacijos  SET
    // fk_kambarys=${data.room}
    // WHERE id_Rezervacija=${data.reservation}`)
    con.query(
      `UPDATE rezervacijos  SET 
      fk_kambarys=${data.room}
      WHERE id_Rezervacija=${data.reservation}`,
      callback
    );
  },

  getRoomsWithReservation: function (con, callback) {
    con.query(
      `SELECT * FROM kambariai
      INNER JOIN rezervacijos on rezervacijos.fk_Kambarys = kambariai.id_Kambarys;`,
      callback
    );
  },

  getReservations: function (con, callback) {
    con.query(`SELECT rezervacijos.*, (ifnull(kambariai.kaina,0)+ifnull(maistoKaina,0)) as kaina, kambario_tipai.name, kambariai.numeris, kambariai.id_Kambarys   FROM rezervacijos 
      left join kambariai on fk_Kambarys = id_Kambarys 
      left join (select sum(maisto_uzsakymai.kiekis * meniu_irasai.kaina) as maistoKaina, maisto_uzsakymai.fk_Rezervacija from maisto_uzsakymai
                  INNER join meniu_irasai on meniu_irasai.id_Meniu_irasas = maisto_uzsakymai.fk_Meniu_irasas group by maisto_uzsakymai.fk_Rezervacija) b
      on b.fk_Rezervacija = rezervacijos.id_Rezervacija
      inner join kambario_tipai on rezervacijos.kambario_tipas = kambario_tipai.id_Kambario_tipas`, callback);
  },

  getRoomsForAssign: function (con, type, beds, callback) {
    // console.log(`SELECT * FROM kambariai WHERE lovu_skaicius='${beds}' AND kambario_tipas='${type}'`)
    con.query(`SELECT * FROM kambariai 
    INNER JOIN vaizdo_tipai on vaizdo_tipai.id_Vaizdo_tipas = kambariai.vaizdas
    WHERE lovu_skaicius='${beds}' AND kambario_tipas='${type}'`, callback);
  },

};

