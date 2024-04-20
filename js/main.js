let dataList = [];

// fetch data
function fetchData() {
  fetch('https://tony-auth-express.vercel.app/api/todo', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      dataList = data.data;
      console.log(dataList);
      renderIssueTrackerList(dataList);
    });
}

fetchData();

// Render list issue tracker
const trackerList = document.getElementById('list-issueTracker');

function renderIssueTrackerList(data = []) {
  trackerList.innerHTML = '';

  data.map((item, index, arr) => {
    if (arr.length > 0) {
      trackerList.innerHTML += `
      <tr>
        <td>${Math.round(Math.random() * 1000)}</td>
        <td>${item.title}</td>
        <td><span class="badge bg-primary">${
          item.status === 'completed' ? 'Closed' : 'Open'
        }</span></td>
        <td><p class="des-text">${item.description}</p></td>
        <td>
          <div class="author-list">
            <img
              src="https://images.unsplash.com/photo-1695895412599-9052b3287d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt=""
            />
          </div>
        </td>
        <td><p class="severity-text">${item.severity}</p></td>
        <td>
          <button
            type="button"
            title="Close"
            id="btnClose"
            class="${
              item.status === 'new' ? 'btn btn-warning' : 'btn btn-success'
            }"
            onclick="updateItemTracker('${item._id}')"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button 
            type="button" 
            title="Delete"
            class="btn btn-danger btnDelete"
            onclick="deleteItemTracker('${item._id}')"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
      `;
    }
  });
}

// Add item issue tracker
const getFormTracker = document.getElementById('formTracker');

getFormTracker.addEventListener('submit', (e) => {
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

  fetch('https://tony-auth-express.vercel.app/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addItemTracker),
  }).then(() => {
    fetchData();
  });
});

// Delete item issue tracker
function deleteItemTracker(id) {
  fetch(`https://tony-auth-express.vercel.app/api/todo/${id}`, {
    method: 'DELETE',
  }).then(() => {
    fetchData();
  });
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
      fetchData();
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
