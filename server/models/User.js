module.exports = {
  get: function(con, callback) {
    con.query("SELECT * FROM naudotojai", callback)
  },
  create: function(con, data, callback) {
    con.query(
      `INSERT INTO naudotojai (el_pastas, slaptazodis, vardas, pavarde, role) VALUES ('${data.email}','${data.password}','${data.name}','${data.surname}','${data.role}')`,
      callback
    )
  },
  createClient: function(con, data, callback) {
    con.query(
      `INSERT INTO naudotojai (el_pastas, slaptazodis,vardas,pavarde,role) VALUES ('${data.email}', '${data.password}', '${data.name}', '${data.surname}', 2); INSERT INTO klientai (id_Naudotojas, banko_saskaita, korteles_galiojimo_data, CVV_numeris, prisijungimo_vardas) VALUES (LAST_INSERT_ID(),'${data.bank}','${data.date}', '${data.cvv}', '${data.userName}')`,
       callback)
  },
  getByEmail: function(con, email, callback) {
    con.query(`SELECT * FROM naudotojai WHERE el_pastas = '${email}'`, callback)
  },
  getById: function(con, id, callback) {
    con.query(`SELECT * FROM naudotojai WHERE id_Naudotojas = '${id}'`, callback)
  }


}