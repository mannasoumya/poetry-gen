const ran_gen = require("./pseudo-random");
const fs = require("fs");
const app = require("express")();
const bodyParser = require("body-parser");
const port = process.env.PORT || 7890;
const fetch = require('node-fetch');
var path = require('path');
var cors= require('cors')
let data="";

var corsOptions = {
  origin: 'https://poetry-analysis.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

fetch('http://m.uploadedit.com/busd/1616608485499.txt').then(r=>r.text()).then(r=> data=r);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  // res.sendFile('./public/index.html');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// app.use(express.static('public'))

app.get("/generate", cors(corsOptions),(req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  let no_of_lines = 6;
  if (req.query.lines) {
      no_of_lines = parseInt(req.query.lines);
      if (isNaN(no_of_lines)){
        res.send("<h3>Wrong Params ... Sigh...</h3>")
      }
  }
  poem = generate(no_of_lines);
  console.log(poem);
  let poem_html = "";
  let p_l = poem.split("\n\r");
  for (l of p_l) {
    poem_html = "<i><b>" + poem_html + l + "</b></i>" + "<br></br>";
  }
  res.send(`${poem_html}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function generate(lines = 6) {
  try {
    // let file_str = fs.readFileSync(
    //   "./data/r_p_poem.txt",
    //   "utf8"
    // );
    let file_str = data;
    let all_lines = processString(file_str);
    let newPoem = generatePoem(all_lines, lines);
    // console.log(newPoem);
    // fs.appendFile(
    //   "./data/newPoems.txt",
    //   newPoem + "\n-------------------------------------\n",
    //   function (err) {
    //     if (err) throw err;
    //     console.log("Saved!");
    //   }
    // );
    return newPoem;
  } catch (err) {
    console.error(err);
  }
}
function processString(str) {
  let all_lines = str.split("\n");
  return all_lines;
}
function generatePoem(all_lines, poem_length) {
  let newPoemArr = [];
  let ind_arr = ran_gen.pseudo_random(0, all_lines.length, poem_length);
  for (let i = 0; i < ind_arr.length; i++) {
    let index = ind_arr[i];
    newPoemArr.push(all_lines[index]);
  }
  let newPoem = "";
  for (let i = 0; i < newPoemArr.length; i++) {
    newPoem = newPoem + newPoemArr[i] + "\n\r";
  }
  return newPoem;
}
module.exports = app