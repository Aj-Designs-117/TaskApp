document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e){
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const ObjectTask = {
        title,
        description
    }


    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(ObjectTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        let work = JSON.parse(localStorage.getItem('tasks'));
        work.push(ObjectTask);
        localStorage.setItem('tasks', JSON.stringify(work));
    }

    getTask();
    document.getElementById('formTask').reset();

}

function getTask(){
    let table = document.getElementById('tasksList');
    const data  = JSON.parse(localStorage.getItem('tasks'));

    let fragmetTask = '';
    data.forEach(itemTask => {
        fragmetTask += `
            <div class="card mb-4">
                <div class="card-header">
                <b>${itemTask.title}</b> 
                </div>
                <div class="card-body d-flex justify-content-between">
                    <p class="lead">${itemTask.description}</p>
                    <button class="btn btn-outline-danger" onclick="deleteTask('${itemTask.title}')">Borrar</button> 
                </div>
            </div>
        ` 
    });
    table.innerHTML = fragmetTask;  
}
getTask();

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        if(task.title === title){
            tasks.splice(task,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
}