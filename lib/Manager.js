// Code to define and export the Manager class that inherit from Employee.

const Employee = require("./Employee");

// Object : Any intity has state(example: name, id, email etc..) and behavor(example: function, method) known as object.
// class used to creat an object
// Constructor is called when an instance of the object is created.
// Inheritance is a relationship between parent and child by using keyword called extend.

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
};

module.exports = Manager;