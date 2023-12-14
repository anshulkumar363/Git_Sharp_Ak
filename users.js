 // adding delete button

// const myform = document.querySelector('#my-form');
// const userList = document.querySelector('#users');

// myform.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//     e.preventDefault();

//     let my_obj = {
//         UserName: myform.elements['name'].value,
//         UserEmail: myform.elements['email'].value,
//         UserNumber: myform.elements['number'].value
//     };

//     let obj_to_string = JSON.stringify(my_obj);
//     localStorage.setItem(my_obj.UserEmail, obj_to_string);

//     addUserToList(my_obj); // Add user to the list
//     myform.reset(); // Clear the form inputs
// }

// function addUserToList(user) {
//     let li = document.createElement('li');
//     li.dataset.userEmail = user.UserEmail; // Store user email as a data attribute

//     li.appendChild(document.createTextNode(`${user.UserName}: ${user.UserEmail}: ${user.UserNumber}`));

//     let deletebtn = document.createElement('button');
//     deletebtn.innerHTML = 'Delete';
//     deletebtn.addEventListener('click', function () {
//         onDelete(user.UserEmail, li);
//     });

//     li.appendChild(deletebtn);
//     userList.appendChild(li);
// }

// function onDelete(userEmail, listItem) {
//     // Remove the entry from local storage
//     localStorage.removeItem(userEmail);

//     // Remove the corresponding list item from the UI
//     listItem.remove();
// }

//now adding edit button 

let form=document.getElementById('addForm');
form.addEventListener('submit',addExpense);

let list=document.getElementById('list');

//load previous value of local storage
printAll();


//Add Expence
function addExpense(e){
    e.preventDefault();
   
    const expenseObj={
        expense : document.getElementById('expense').value,
        descr : document.getElementById('description').value,
        select : document.getElementById('select').value,
    }
    
    let expenseObjSer=JSON.stringify(expenseObj);
    localStorage.setItem(expenseObj.select,expenseObjSer);

    document.getElementById('expense').value='';
    document.getElementById('description').value='';
    document.getElementById('select').value='Select';

    print(expenseObj);
}

function print(obj){
    
    //create list
    let li = document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode(`Price: ${obj.expense}    Description: ${obj.descr}     Category: ${obj.select}`));
    
    //create delete button
    let btnDel=document.createElement('button');
    btnDel.className='btn btn-primary btn-sm float-right delete';
    btnDel.appendChild(document.createTextNode('Delete'));
    //delete list
    btnDel.onclick=()=>{
        localStorage.removeItem(obj.select);
        list.removeChild(li);
    }
    li.appendChild(btnDel);

    //create edit button
    let btnEdit=document.createElement('button');
    btnEdit.className='btn btn-danger btn-sm float-right edit';
    btnEdit.appendChild(document.createTextNode('Edit'));
    btnEdit.onclick=()=>{
        document.getElementById('expense').value=obj.expense;
        document.getElementById('description').value=obj.descr;
        document.getElementById('select').value=obj.select;
        localStorage.removeItem(obj.select);
        list.removeChild(li);
    }
    li.appendChild(btnEdit);
    list.appendChild(li);
}

//print Local storage value after refreshing the page
function printAll(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const obj = JSON.parse(localStorage.getItem(key));
        console.log(obj);
        //create list
        print(obj);
        let li = document.createElement('li');
        li.className='list-group-item';
        li.appendChild(document.createTextNode(`${obj.expence}  ${obj.descr}  ${obj.select}`));
        

        //create delete button
        let btnDel=document.createElement('button');
        btnDel.className='btn btn-primary btn-sm float-right delete';
        btnDel.appendChild(document.createTextNode('Delete'));
        //delete list
        btnDel.onclick=()=>{
            localStorage.removeItem(obj.select);
            list.removeChild(li);
        }
        li.appendChild(btnDel);

        //create edit button
        let btnEdit=document.createElement('button');
        btnEdit.className='btn btn-primary btn-sm float-right edit';
        btnEdit.appendChild(document.createTextNode('Edit'));
        btnEdit.onclick=()=>{
            document.getElementById('expence').value=obj.expence;
            document.getElementById('description').value=obj.descr;
            document.getElementById('select').value=obj.select;
            localStorage.removeItem(obj.select);
            list.removeChild(li);
        }
        li.appendChild(btnEdit);
        list.appendChild(li);
      }
}