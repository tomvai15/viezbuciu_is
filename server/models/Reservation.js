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
    //This doesnt work
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
  };
  