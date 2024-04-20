const API_BE = 'https://tony-auth-express.vercel.app';

let dataList = [];
let page = 1;
let total = 0;

// common
async function fetchApi(url, options = {}) {
  const res = await fetch(API_BE + url, options);
  const data = await res.json();
  return data;
}


// get all list todos
async function fetchTodos() {
  const data = await fetchApi(`/api/todo?page=${page}&limit=5`, {
    method: "GET"
  }) 
  dataList = data.data;
  total = data.total;
  renderIssueTrackerList(dataList);
}

// Render list issue tracker
const trackerList = document.getElementById('list-issueTracker');

function renderIssueTrackerList(data = []) {
  trackerList.innerHTML = '';
  data.forEach(todo => {
    const trElement = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.innerHTML = todo.title;
  
    const tdStatus = document.createElement('td');
    const spanStatus = document.createElement('span');
    spanStatus.setAttribute('class', `badge ${todo.status === 'new' ? 'bg-primary' : 'bg-warning'}`);
    spanStatus.innerHTML = todo.status;
    tdStatus.appendChild(spanStatus)
  
    const tdDescription = document.createElement('td');
    tdDescription.innerHTML = 'Description 664';
    
    const tdSeverity = document.createElement('td');
    tdSeverity.innerHTML = todo.severity;
  
    const tdAction =  document.createElement('td');
    const btnClose = document.createElement('button');
    btnClose.setAttribute('class', 'btn btn-success btn-sm mr-2');
    btnClose.innerHTML = 'Close';
    const btnDelete = document.createElement('button')
    btnDelete.setAttribute('class', 'btn btn-danger btnDelete btn-sm');
    btnDelete.innerHTML = 'Delete';
    tdAction.appendChild(btnClose);
    tdAction.appendChild(btnDelete);
  
    trElement.appendChild(tdTitle);
    trElement.appendChild(tdStatus);
    trElement.appendChild(tdDescription);
    trElement.appendChild(tdSeverity);
    trElement.appendChild(tdAction);
  
    trackerList.appendChild(trElement);
  })
}

// Add item issue tracker
const getFormTracker = document.getElementById('formTracker');
getFormTracker.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const author = document.getElementById('author').value;
  const severity = document.getElementById('severity').value;

  const addItemTracker = {
    data: {
      title,
      description,
      severity,
      author,
      status: 'new',
    },
  };
  const data = await fetchApi('/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addItemTracker),
  })
  if(!data.isSucess) {
    // show loading
    return;
  }
  fetchTodos();
});

// Delete item issue tracker
async function deleteItemTracker(id) {
  const data = await fetchApi(`/api/todo/${id}`, {
    method: 'DELETE',
  })
  if(!data.isSucess) {
    return;
  }
  fetchTodos();
}

// Update item issue tracker
function updateItemTracker(idItem) {
  let itemTracker = dataList.find((item) => item._id === idItem);

  const updateData = {
    data: {
      ...itemTracker,
      status: 'completed',
    },
  };

  fetch(`https://tony-auth-express.vercel.app/api/todo/${idItem}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then(() => {
      fetchTodos();
    })
    .catch((err) => {
      console.log(`Can't update todo`, err);
    });
}

// Search item issue tracker
let search = document.getElementById('search');

search.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();
  const clonedDataList = [...dataList];
  const trackerSearch = clonedDataList.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );
  renderIssueTrackerList(trackerSearch);
});

// Filter list issue tracker
const filterAllListTracker = document.getElementById('btnAll');
const filterOpenListTracker = document.getElementById('btnOpen');
const filterCloseListTracker = document.getElementById('btnClose');

filterAllListTracker.addEventListener('click', () => {
  renderIssueTrackerList(dataList);
});

filterOpenListTracker.addEventListener('click', () => {
  const trackerFiltered = [...dataList].filter((item) => item.status === 'new');
  renderIssueTrackerList(trackerFiltered);
});

filterCloseListTracker.addEventListener('click', () => {
  const trackerFiltered = [...dataList].filter(
    (item) => item.status === 'completed'
  );
  renderIssueTrackerList(trackerFiltered);
});

// Sort list issue tracker
const sortValue = document.getElementById('orderBy');

sortValue.addEventListener('change', (e) => {
  const { value } = e.target;
  const trackerSorted = [...dataList];

  trackerSorted.sort((a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return value === 'asc' ? 1 : -1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return value === 'asc' ? -1 : 1;
    }
    return 0;
  });

  renderIssueTrackerList(trackerSorted);
});


// pagination
const pagination = document.getElementById('pagination');
{/* <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li> */}

                // <li class="page-item"><div class="page-link cursor-pointer">Previous</div></li>
function renderPagination() {
  pagination.innerHTML = '';
  
  const liPrevious = document.createElement('li');
  liPrevious.setAttribute('class', 'page-item page-link cursor-pointer');
  liPrevious.innerHTML = 'Previous';

  const liNext = document.createElement('li');
  liNext.setAttribute('class', 'page-item page-link cursor-pointer');
  liNext.innerHTML = 'Next';


  pagination.appendChild(liPrevious)
  
  const pages = Math.round(total / 5);
  for(let i = 0; i < pages; i++) {
    const liPage = document.createElement('li');
    const currentItem = i + 1;
    liPage.setAttribute('class', `page-item page-link cursor-pointer ${page === currentItem ? 'active' : ''}`);
    liPage.innerHTML = currentItem;
    liPage.addEventListener('click', () =>  changePage(currentItem))
    pagination.appendChild(liPage)  
  }

  pagination.appendChild(liNext)
}

function changePage(number) {
  page = number;
  fetchTodos();
  renderPagination();
}

// initialize app
async function initializeApp() {
  await fetchTodos();
  renderPagination();
}
initializeApp();