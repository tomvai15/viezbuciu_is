module.exports = {
    get: function(con, id, callback)
    {
      con.query(`SELECT *  FROM naudotojai WHERE id_Naudotojas='${id}'`, callback)
    } ,
    getKitchenWorker: function(con, id, callback)
    {
      con.query(`SELECT n.id_Naudotojas as id, n.vardas, n.pavarde, n.el_pastas, d.telefono_numeris, d.idarbinimo_data,d.gimimo_data,d.asmens_kodas,d.atlyginimas,d.darbo_sutartis,vd.pareigos,vd.pamaina  FROM naudotojai n  LEFT JOIN darbuotojai d on d.id_Naudotojas=n.id_Naudotojas LEFT JOIN virtuves_darbuotojai vd ON vd.id_Naudotojas=n.id_Naudotojas WHERE n.id_Naudotojas='${id}'`, callback)
    } ,
    getRezervationWorker: function(con, id, callback)
    {
      con.query(`SELECT n.id_Naudotojas as id, n.vardas, n.pavarde, n.el_pastas, d.telefono_numeris, d.idarbinimo_data,d.gimimo_data,d.asmens_kodas,d.atlyginimas,d.darbo_sutartis,vd.etatas,vd.darbo_stalo_numeris,vd.manegeris  FROM naudotojai n  LEFT JOIN darbuotojai d on d.id_Naudotojas=n.id_Naudotojas LEFT JOIN registraturos_darbuotojai vd ON vd.id_Naudotojas=n.id_Naudotojas WHERE n.id_Naudotojas='${id}'`, callback)
    } ,
    getAll: function(con, workplace, callback) 
    {
      con.query(`SELECT n.id_Naudotojas as id, n.vardas,n.pavarde,r.name as darbo_vieta, n.el_pastas, d.telefono_numeris, d.idarbinimo_data, d. gimimo_data, d.atlyginimas, d.asmens_kodas, dst.name as darbo_sutartis FROM darbuotojai d LEFT JOIN naudotojai n ON n.id_Naudotojas=d.id_Naudotojas LEFT JOIN darbo_sutarties_tipai dst ON dst.id_Darbo_sutarties_tipas=d.darbo_sutartis LEFT JOIN roles r ON r.id_Role=n.role WHERE '${workplace}'='' OR r.name='${workplace}'`, callback)
    },
    delete: function(con, id, callback) 
    {
      con.query(`DELETE FROM registraturos_darbuotojai WHERE id_Naudotojas='${id}'; DELETE FROM virtuves_darbuotojai WHERE id_Naudotojas='${id}'; DELETE FROM darbuotojai WHERE id_Naudotojas='${id}'; DELETE FROM naudotojai WHERE id_Naudotojas='${id}'`, callback)
    },
    createKitchenWorker: function(con, data,password, callback) 
    {
      con.query(
        `INSERT INTO naudotojai (el_pastas, slaptazodis,vardas,pavarde,role) VALUES ('${data.email}', '${password}', '${data.name}', '${data.surname}', 4); INSERT INTO darbuotojai (id_Naudotojas, asmens_kodas, atlyginimas, telefono_numeris, gimimo_data,idarbinimo_data,darbo_sutartis) VALUES (LAST_INSERT_ID(),'${data.personCode}','${data.salary}', '${data.phone}', '${data.birthDate}','${data.startDate}','${data.workAgr}'); INSERT INTO virtuves_darbuotojai (ID_Naudotojas,pamaina,pareigos) VALUES (LAST_INSERT_ID(),'${data.shift}','${data.duties}')`,
         callback)
    },
    createRezervationWorker: function(con, data, password, callback) 
    {
      con.query(
        `INSERT INTO naudotojai (el_pastas, slaptazodis,vardas,pavarde,role) VALUES ('${data.email}', '${password}', '${data.name}', '${data.surname}', 3); INSERT INTO darbuotojai (id_Naudotojas, asmens_kodas, atlyginimas, telefono_numeris, gimimo_data,idarbinimo_data,darbo_sutartis) VALUES (LAST_INSERT_ID(),'${data.personCode}','${data.salary}', '${data.phone}', '${data.birthDate}','${data.startDate}','${data.workAgr}'); INSERT INTO registraturos_darbuotojai (ID_Naudotojas,etatas,manegeris,darbo_stalo_numeris) VALUES (LAST_INSERT_ID(),'${data.time}',${data.isManager},'${data.tableNum}')`,
         callback)
    },
    updateKitchenWorker: function(con, data, callback) 
    {
      con.query(
        `UPDATE naudotojai  SET el_pastas='${data.email}',vardas='${data.name}',pavarde='${data.surname}' WHERE id_Naudotojas='${data.id}'; UPDATE  darbuotojai  SET asmens_kodas='${data.personCode}', atlyginimas='${data.salary}', telefono_numeris='${data.phone}', gimimo_data='${data.birthDate}',idarbinimo_data='${data.startDate}',darbo_sutartis='${data.workAgr}' WHERE id_Naudotojas='${data.id}'; UPDATE virtuves_darbuotojai SET pamaina='${data.shift}', pareigos='${data.duties}' WHERE id_Naudotojas='${data.id}'`,
         callback)
    },
    updateRezervationWorker: function(con, data, callback) 
    {
      con.query(
        `UPDATE naudotojai  SET el_pastas='${data.email}',vardas='${data.name}',pavarde='${data.surname}' WHERE id_Naudotojas='${data.id}'; UPDATE  darbuotojai  SET asmens_kodas='${data.personCode}', atlyginimas='${data.salary}', telefono_numeris='${data.phone}', gimimo_data='${data.birthDate}',idarbinimo_data='${data.startDate}',darbo_sutartis='${data.workAgr}' WHERE id_Naudotojas='${data.id}'; UPDATE registraturos_darbuotojai SET etatas='${data.time}', manegeris=${data.isManager}, darbo_stalo_numeris='${data.tableNum}' WHERE id_Naudotojas='${data.id}'`,
         callback)
    },
    getRoomData: function(con, start, end, callback) 
    {
      con.query(
        `SELECT DATE_FORMAT(rezervacijos.pradzia,\'%Y-%m-%d\')  as date, SUM(kambariai.kaina) as income,SUM(kambariai.islaikymo_islaidos) as costs  FROM rezervacijos LEFT JOIN kambariai ON rezervacijos.fk_Kambarys=kambariai.id_Kambarys  WHERE rezervacijos.pradzia<'${end}' AND rezervacijos.pradzia>'${start}' GROUP BY (rezervacijos.pradzia)`,
         callback)

    },
}