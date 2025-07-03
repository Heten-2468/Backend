/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import qrimg from "qr-image";
import inquirer from "inquirer";
import fs from "fs";

function firstQuestion(callback){
    inquirer.prompt([
    {
    name : "First",
    message : "Tell us the name of the website. ",
    }
])
  .then((answers) => {
    console.log(answers)
    var firstName = answers.First;
    fs.writeFileSync("URL.txt", `\n ${answers.First}`, {flag : "a"},  (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
})
    callback(firstName);
})

  .catch((error) => {
    if (error.isTtyError);
    console.log(error)
});
}

function secondQuestion(firstName){
inquirer.prompt([
    {
    name : "Second",
    message : "Input the URL. ",
    }
])
  .then((answers) => {
    console.log(answers)
    var qr_svg = qrimg.image(answers.Second, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(`${firstName}.png`));
    fs.writeFileSync("URL.txt",`\n ${answers.Second}`, {flag : "a"}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
});

})
  .catch((error) => {
    if (error.isTtyError);
    console.log(error)
  });
}

firstQuestion(secondQuestion);