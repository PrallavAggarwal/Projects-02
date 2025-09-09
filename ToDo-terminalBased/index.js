//Steps 
//1. Add Task 
//2. View Task 
//3. Update Task 
//4. Remove Task 



// Take arguments from terminal 
// Store todo in json file. File should be persistent.

//using commander library.

const fs = require('fs').promises;

//format of new data to be added 
//{
//  "todo":[{id: , status: , title: , timestamp: }]
//
//}

// so newData = { id: 1, status: Started, title: DSA, timestamp: 2025-09-08}
let date = new Date();
// let id = process.argv[2];
//let status = process.argv[3];


async function addData() {
  try {
    let newData = {}
    let title = process.argv[3];
    newData.id = Date.now();
    newData.status = 'started';
    newData.title = title;
    newData.time = date.toTimeString();
    newData.start_date = date.toDateString();
    console.log("newData : \n", newData);



    //Read data of json file
    let jsonData = await fs.readFile('./Log.json', 'utf8');
    // console.log("jsonData : ", jsonData);

    //Add new data and convert json to js object 
    let data = JSON.parse(jsonData);
    // console.log("data : ", data);

    //updating task number 
    let srNo = data.todo.length;
    newData.task = srNo + 1;

    //adding task to Log.json 
    let flag = true;
    data.todo.forEach(element => {
      if (element.title.toLowerCase() === newData.title.toLowerCase() && element.status != 'completed') {
        console.log(`Cannot add task already exist. With id:${element.id} and status:${element.status}`);
        flag = false;
        return;
      }

    })
    if (flag) {
      data.todo.push(newData);
    }

    //add data to json file 
    await fs.writeFile('./Log.json', JSON.stringify(data, null, 2));
    flag ? console.log("Data added to file is :\n", data) : console.log("Data not added.");

  }
  catch (error) {
    console.log("Some error occured : ", error);
  }
}


async function updateTodo() {
  try {

    console.log("inside update todo.")
    let sr = parseInt(process.argv[3]);
    let status = process.argv[4].toLowerCase();
    let newtitle = process.argv[5];

    //reading data from Log.json 
    let jsonData = await fs.readFile('./Log.json', 'utf8');
    let data = JSON.parse(jsonData);
    data.todo.forEach(element => {
      if (element.task == sr) {
        console.log("sr equal to : ", element)
        if (status == 'done' || status == 'completed' || status == 'in process') {
          element.status = status;
          console.log("value of status:", status);
          console.log("element.status : ", element.status);
          console.log("element : ", element)
        }
        if (newtitle) {
          element.title = newtitle;
        }
        return;
      }
    })

    //adding updated data to Log.json 
    await fs.writeFile('./Log.json', JSON.stringify(data, null, 2));
    console.log("data after updating : ", data.todo)
  }
  catch (err) {
    console.log("error while updating task : \n", err)
  }
}

async function deleteTodo() {
  try {
    let id = parseInt(process.argv[3]);
    let jsonData = await fs.readFile('./Log.json', 'utf8');
    let data = JSON.parse(jsonData);
    let flag = true;
    if (id) {
      data.todo.forEach((element, index) => {

        if (id == element.id) {
          data.todo.splice(index, 1);
          flag = false;
        }
        element.task = index + 1;
        console.log("index : ", index);
        console.log("element.task : ", element.task);
        console.log("element : ", element)
      })
      if (flag) {
        console.log("give proper ID.");
      }
    }
    data.todo.forEach((element, index) => {
      element.task = index + 1;
    });

    //adding updated data to Log.json 
    await fs.writeFile('./Log.json', JSON.stringify(data, null, 2))
    flag ? "" : console.log("data deleted successfully.")


  }
  catch (err) {
    console.log("error while deleting todo: \n", err)
  }
}

if (process.argv[2] == 'add') {
  if (!process.argv[3]) {
    console.log("Atleast give the name to your task.");
  }
  else {
    addData()
  }
}
else if (process.argv[2] == 'update') {
  if (!parseInt(process.argv[3])) {
    console.log("must add task number. To identify which task to update.");
  }
  else if (!process.argv[4] && process.argv[4] != 'done' && process.argv[4] != 'completed' && process.argv[4] != 'in process') {
    console.log("Must mention status. Options for status: \n");
    console.log("done || completed || in process");
  }
  else {
    updateTodo();
  }
}
else if (process.argv[2] == 'delete') {
  if (parseInt(process.argv[3])) {
    deleteTodo();
  }
  else {
    console.log("which one should I delete atleast mention task id.");
  }
}
else {
  console.log("Correct options : add, update, delete")
}
