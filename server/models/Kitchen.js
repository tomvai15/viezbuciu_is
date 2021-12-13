module.exports = { 
    getMenu: function (con, callback) {
      con.query(`SELECT *, meniu_iraso_tipai.name as m_tipas, porcijos_tipai.name as p_tipas
                FROM meniu_irasai
                LEFT JOIN meniu_iraso_tipai ON id_Meniu_iraso_tipas = tipas
                LEFT JOIN porcijos_tipai ON id_Porcijos_tipas = porcijos_dydis`, callback);
    },
    getMenuItem: function(con, id, callback) 
    {
      con.query(`Select * FROM meniu_irasai
                WHERE id_Meniu_irasas='${id}'`, callback)
    },
    updateMenuItem: function (con, data, callback) {
      isVegan = data.isVegan ? 1 : 0;
      con.query(`UPDATE meniu_irasai
                SET
                pavadinimas='${data.name}',
                aprasymas='${data.description}',
                kaina='${data.price}',
                savikaina='${data.cost}',
                yra_veganiskas='${isVegan}',
                tipas='${data.type}',
                porcijos_dydis='${data.size}'
                WHERE id_Meniu_irasas='${data.id}'`,
        callback
      );
    }, 
    removeMenuItem: function(con, id, callback) 
    {
      con.query(`DELETE FROM meniu_irasai
                WHERE id_Meniu_irasas='${id}'`, callback)
    },
};
  