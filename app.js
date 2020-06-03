const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!).

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
    name: "role"
  }
];

// Prompt manager question.

const managerQuestion = {
  type: "input",
  message: "Enter your manager's office number?",
  name: "officenumber"
};

// Prompt engineer question.

const engineerQuestion = {
  type: "input",
  message: "Enter your engineer's github username?",
  name: "github"
};

// Prompt intern question.

const internQuestion = {
  type: "input",
  message: "Enter your intern's school name?",
  name: "school"
};

// Options to add more members.

const addOptions = {
  type: "list",
  message: "Would you like to add more team members?",
  choices: ["yes", "no"],
  name: "restart"
};

//This Array will hold answers.

const employeeArray = [];

// This fuction will prompt the questions and deconstruct responses.

async function init() {
  const userResponse = await inquirer.prompt(questions);
  const { name, id, email, role } = userResponse;

  // If role is  Manager, prompt the question.
  // Creating a new manager with name, id, email and officeNumber response and pushing the manger constructor object in to employeeArray.
  // Creating a new Engineer with name, id, email and github username response and pushing the Enginner constructor object in to employeeArray.
  // Creating a new Inter with name, id, email and school name response and pushing the Intern constructor object in to employeeArray.

  if (role === "Manager") {
    const officeNumber = await inquirer.prompt(managerQuestion);
    const employee = new Manager(name, id, email, officeNumber);
    employeeArray.push(employee);
  }
  else if (role === "Engineer") {
    const github = await inquirer.prompt(engineerQuestion);
    const employee = new Engineer(name, id, email, github);
    employeeArray.push(employee);
  }
  else if (role === "Intern") {
    const school = await inquirer.prompt(internQuestion);
    const employee = new Intern(name, id, email, school);
    employeeArray.push(employee);
  }

  //If user wants to add another member, answers will go to employeeArray and users will be prompted with questions again. When finished answers will go to employeeArray and not futher action will be made.  

  const restartQuestions = await inquirer.prompt(addOptions);
  const {restart } = restartQuestions;

  if (restart === "yes") {
    init();
  } 
  else {
    return console.log(employeeArray);
  };

};
init();
