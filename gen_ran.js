const ran_gen = require('./pseudo-random');
// const removeEmptyLines = require("remove-blank-lines");
console.log();
const fs = require('fs')
let file_str = "";
try {
  let file_str = fs.readFileSync('Rupi Kaur - Milk and Honey-Andrews McMeel Publishing (2015).txt', 'utf8')
  let all_lines=processString(file_str);
  let newPoem = generatePoem(all_lines,6);
  console.log(newPoem);
  fs.appendFile('newPoems.txt', newPoem+"\n-------------------------------------\n", function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
} catch (err) {
  console.error(err);
}

function processString(str){
    let all_lines = str.split("\n");
    // let all_lines_length = all_lines.length;
    return all_lines;
}
function generatePoem(all_lines,poem_length)
{
    let newPoemArr = [];
    let ind_arr=ran_gen.pseudo_random(0,all_lines.length,poem_length);
    for (let i=0;i<ind_arr.length;i++)
    {
        let index= ind_arr[i];
        newPoemArr.push(all_lines[index]);
    }
    // return newPoemArr;
    let newPoem="";
    for (let i=0;i<newPoemArr.length;i++)
    {
        newPoem=newPoem+newPoemArr[i]+"\n\r";
    }
    return newPoem;
}