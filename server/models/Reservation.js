module.exports = {
    get: function (con, id, callback) {
      con.query(`SELECT rezervacijos.* FROM rezervacijos WHERE id_Rezervacija='${id}' and pradzia>CURDATE()`, callback);
    },
    getAll: function (con, userId, callback) {
      con.query(`SELECT rezervacijos.*, ifnull(kambariai.kaina,0)+ifnull(maistoKaina,0) as kaina, kambario_tipai.name   FROM rezervacijos 
      left join kambariai on fk_Kambarys = id_Kambarys 
      left join (select sum(maisto_uzsakymai.kiekis * meniu_irasai.kaina) as maistoKaina, maisto_uzsakymai.fk_Rezervacija from maisto_uzsakymai
                  INNER join meniu_irasai on meniu_irasai.id_Meniu_irasas = maisto_uzsakymai.fk_Meniu_irasas) b
      on b.fk_Rezervacija = rezervacijos.id_Rezervacija
      inner join kambario_tipai on rezervacijos.kambario_tipas = kambario_tipai.id_Kambario_tipas
      WHERE fk_Klientas='${userId}'`, callback);
    },
      
    updateReservation: function (con, data, callback) {
      con.query(
        `UPDATE rezervacijos SET pradzia = '${data.start}', pabaiga = '${data.end}', lovu_skaicius = '${data.bedAmount}', pusryciai = '${data.breakfast}', kambario_tipas = '${data.type}' WHERE rezervacijos.id_Rezervacija ='${data.reservation}'`,
        callback
      );
    },
    delete: function (con, id, callback) {
      con.query(`DELETE FROM rezervacijos WHERE id_Rezervacija='${id}'`, callback);
    },
    addReservation: function (con, data, callback) {
      con.query(
        `INSERT INTO rezervacijos (pradzia, pabaiga, lovu_skaicius, pusryciai, kambario_tipas, fk_Klientas) VALUES ('${data.start}', '${data.end}', '${data.bedAmount}', '${data.breakfast}', '${data.type}', '${data.user}');`,
        callback
      );
    },
  };
  