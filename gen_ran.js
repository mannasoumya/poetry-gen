const ran_gen = require("./pseudo-random");
// const removeEmptyLines = require("remove-blank-lines");
console.log();
const fs = require("fs");
const app = require("express")();
const bodyParser = require("body-parser");
const port = 7890;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Online Poetry");
});

app.get("/generate", (req, res) => {
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

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function generate(lines = 6) {
  try {
    let file_str = fs.readFileSync(
      "Rupi Kaur - Milk and Honey-Andrews McMeel Publishing (2015).txt",
      "utf8"
    );
    let all_lines = processString(file_str);
    let newPoem = generatePoem(all_lines, lines);
    // console.log(newPoem);
    fs.appendFile(
      "newPoems.txt",
      newPoem + "\n-------------------------------------\n",
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
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