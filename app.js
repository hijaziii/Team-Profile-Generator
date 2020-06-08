const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//  Creating questons

const questions = [
  {
    type: "input",
    message: "Enter your teammate's name?",
    name: "name"
  },
  {
    type: "input",
    message: "Enter your teammate's ID?",
    name: "id"
  },
  {
    type: "input",
    message: "Enter your teammate's email?",
    name: "email"
  },
  {
    type: "list",
    message: "Enter your teammate's role?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "job"
  }
];

// Prompt manager question.

const managerQ = {
  type: "input",
  message: "Enter your manager's office number?",
  name: "officenumber"
};

// Prompt engineer question.

const engineerQ = {
  type: "input",
  message: "Enter your engineer's github username?",
  name: "github"
};

// Prompt intern question.

const internQ = {
  type: "input",
  message: "Enter your intern's school name?",
  name: "school"
};

// Options to add more members.

const addOptions = {
  type: "list",
  message: "Would you like to add more team members?",
  choices: ["yes", "no"],
  name: "redo"
};

//This Array will hold answers.

const employeeArray = [];

// This fuction will prompt the questions and deconstruct responses.

async function init() {
  const userRes = await inquirer.prompt(questions);
  const { name, id, email, job } = userRes;


  // If job is Manager, creat a new Manager with (name, id, email and officeNumber) response and pushing the manager constructor object in to employeeArray.
  // If job is Engineer creat a new Engineer with (name, id, email and github) response and pushing the Enginner constructor object in to employeeArray.
  // If job is Inter creat a new Intern with (name, id, email and school) response and pushing the Intern constructor object in to employeeArray.

  if (job === "Manager") {
    const number = await inquirer.prompt(managerQ);
    const officeNumber = number.officenumber
    const employee = new Manager(name, id, email, officeNumber);
    
    employeeArray.push(employee);
  }
  else if (job === "Engineer") {
    const git = await inquirer.prompt(engineerQ);
    const github = git.github
    const employee = new Engineer(name, id, email, github);
    employeeArray.push(employee);
  }
  else if (job === "Intern") {
    const internSchool = await inquirer.prompt(internQ);
    const school = internSchool.school
    const employee = new Intern(name, id, email, school);
    employeeArray.push(employee);
  }

  //If user wants to add another member, answers will go to employeeArray and users will be prompted with questions again. When finished answers will go to employeeArray and not futher action will be made.  

  const redoQ = await inquirer.prompt(addOptions);
  const { redo } = redoQ;

  if (redo === "yes") {
    init();
  }

  else {
    const html = await render(employeeArray);
    fs.writeFile(outputPath, html, function (err) {
      if (err) {
        return console.log(err);
      }

    });
  }
};

init();




