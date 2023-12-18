let trackerData = [
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Title',
    status: 'New',
    description: 'delectus aut autem',
    author: [
      {
        id: Math.floor(Math.random() * 1000),
        name: 'Tony',
        avatar:
          'https://images.unsplash.com/photo-1695895412599-9052b3287d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      },
    ],
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Title',
    status: 'New',
    description: 'delectus aut autem',
    author: [
      {
        id: Math.floor(Math.random() * 1000),
        name: 'Tony',
        avatar:
          'https://images.unsplash.com/photo-1695895412599-9052b3287d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      },
    ],
  },
];

// Render UI list issue tracker

let listTrackerBody = document.getElementById('list-issueTracker');

function renderListIssueTracker(data) {
  listTrackerBody.innerHTML = '';

  data.map((element, index, arr) => {
    if (arr.length > 0) {
      listTrackerBody.innerHTML += `
      <tr>
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td><span class="badge bg-primary">${element.status}</span></td>
        <td><p class="des-text">${element.description}</p></td>
        <td>
          <div class="author-list">
            <img
              src="${element.author[0].avatar}"
              title="${element.author[0].name}"
              alt=""
            />
          </div>
        </td>
        <td>
          <button
            type="button"
            title="Close"
            id="btnClose"
            class="btn btn-warning"
            
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button 
            type="button" 
            title="Delete"
            class="btn btn-danger btnDelete"
            onclick="deleteItemTracker(${element.id})"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
      `;
    }
  });
}

renderListIssueTracker(trackerData);

// Add new item issue tracker
const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', addNewTracker);

function addNewTracker() {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let author = document.getElementById('author').value;

  const todo = {
    id: Math.floor(Math.random() * 1000),
    title: title,
    status: 'New',
    description: description,
    author: [
      {
        id: Math.floor(Math.random() * 1000),
        name: author,
        avatar:
          'https://images.unsplash.com/photo-1695895412599-9052b3287d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      },
    ],
  };

  const todos = trackerData.concat(todo);
  renderListIssueTracker(todos);
}

// Delete item issue tracker
function deleteItemTracker(id) {
  const trackers = trackerData.filter((tracker) => tracker.id !== id);

  trackerData = trackers;
  renderListIssueTracker(trackers);
}

//Search item issue tracker
let search = document.getElementById('search');
let textDes = document.querySelectorAll('.des-text');

search.addEventListener('keyup', searchDescription);

function searchDescription() {
  textDes.forEach((element) => {
    if (this.value === element.textContent) {
      console.log(1);
    } else {
      console.log(2);
    }
  });
}
