
const Worker = require("../models/Worker");
const User = require("../models/User");
const hbs = require('handlebars');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

const compile = async function(data){
  const html = await fs.readFile('./pdf/report.hbs','utf-8');


  hbs.registerHelper("debug", function(optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
  });
  return hbs.compile(html)({dat:data,test:'Antraste',gg:data});
}
async function generatePDF(data) {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile(data)
    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: './pdf/test.pdf',
      format: 'A4',
      printBackground: true
    });
    await browser.close();
  }catch (e){
    console.log("error ", e);
  }
}


module.exports = {
  getReport: async function(req, res) {
    console.log(req.query)
    Worker.getRoomData(req.con, req.query.start, req.query.end, async function(err, rows) 
    {
      if (err)
      {
          res.status(400).send({message:"failed"})
          return 
      }
      const result =rows.map((r) => {return {date:r.date, income:r.income, costs:r.costs, profit: r.income-r.costs}})
      await generatePDF(result);
      res.download('./pdf/test.pdf');
    })
  },
  getReportData: async function(req, res) {
    Worker.getRoomData(req.con, req.body.start, req.body.end, function(err, rows) 
    {
      if (err)
      {
          res.status(400).send({message:"failed"})
          return 
      }
      const result =rows.map((r) => {return {date:r.date, income:r.income, costs:r.costs, profit: r.income-r.costs}})
      res.send({data:result})
  })},

}

/*

const data = [
  {
    "id": 0,
    "date": "2021-08-25",
    "income": 350,
    "costs": 200,
    "profit": 150
  },
  {
      "id": 0,
      "date": "2021-09-01",
      "income": 350,
      "costs": 200,
      "profit": 150
  },
  {
      "id": 1,
      "date": "2021-09-02",
      "income": 100,
      "costs": 300,
      "profit": -200
  },
  {
      "id": 2,
      "date": "2021-09-03",
      "income": 300,
      "costs": 150,
      "profit": 150
  },
  {
      "id": 3,
      "date": "2021-09-05",
      "income": 500,
      "costs": 400,
      "profit": 100
  },
  {
      "id": 4,
      "date": "2021-09-06",
      "income": 100,
      "costs": 111,
      "profit": -11
  },
  {
    "id": 4,
    "date": "2021-09-28",
    "income": 100,
    "costs": 111,
    "profit": -11
}
]*/