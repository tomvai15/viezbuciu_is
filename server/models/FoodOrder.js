module.exports = {  
    getAll: function (con, id, callback) {
      con.query(`SELECT maisto_uzsakymai.kiekis, maisto_uzsakymai.pristatymo_data, meniu_irasai.pavadinimas, meniu_irasai.kaina*maisto_uzsakymai.kiekis as kaina, pristatymo_tipai.name  FROM maisto_uzsakymai inner join meniu_irasai on meniu_irasai.id_Meniu_irasas = maisto_uzsakymai.fk_Meniu_irasas INNER join pristatymo_tipai on pristatymo_tipai.id_Pristatymo_tipas = maisto_uzsakymai.pristatymo_tipas  WHERE fk_Rezervacija='${id}'`, callback);
    },
    getOrderDates: function (con, id, callback) {
      con.query(`SELECT pabaiga FROM rezervacijos WHERE id_Rezervacija='${id}' and pradzia <= CURRENT_DATE and pabaiga >= CURRENT_DATE`, callback);
    },
    getAllItems: function (con, callback) {
      con.query(`SELECT meniu_irasai.* FROM meniu_irasai`, callback);
    },
    getAllTypes: function (con, callback) {
      con.query(`SELECT * FROM pristatymo_tipai`, callback);
    },
    addFoodOrder:function (con, data, callback){
      con.query(
        `INSERT INTO maisto_uzsakymai (kiekis, pristatymo_data, pristatymo_tipas, fk_Meniu_irasas, fk_Rezervacija) VALUES ('${data.amount}', '${data.date}', '${data.type}', '${data.item}', '${data.reservation}');`,
        callback
      );
      
    },
}