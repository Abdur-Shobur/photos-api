// utilits
const displayContainer = document.getElementById('card-contain')
const modalBody = document.getElementById('modalBody')

const loadApi = async () => {
  const url = `https://jsonplaceholder.typicode.com/photos`
  const fetching = await fetch(url)
  const data = await fetching.json()
  dispalayAPI(data)
}

const dispalayAPI = (data) => {
  displayContainer.innerHTML = ``
  const data20 = data.slice(0, 20)
  data20.forEach((element) => {
    const { url, title, thumbnailUrl, id, albumId } = element
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${thumbnailUrl}" class="img-fluid rounded-start" alt="" style="
    object-fit: cover;
    height: 100%;
">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title.slice(0, 40)}... </h5>

         <button type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop" onclick="detailsBtn(${id})">details </button>
      </div>
    </div>
  </div>
</div>
          `
    displayContainer.appendChild(div)
  })
}

const detailsBtn = (id) => {
  const url = `https://jsonplaceholder.typicode.com/photos?id=${id}`
  console.log(id)
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data[0]))
}

const showModal = (data) => {
  modalBody.innerHTML = ``
  const { url, title, thumbnailUrl, id, albumId } = data

  const div = document.createElement('div')
  div.innerHTML = `
  <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  ${title}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <img src="${url}" alt="" style="width: 100%;" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                 
              </div>
            </div>
  `
  modalBody.appendChild(div)
}
let setValues = ''
const search = () => {
  const input = document.querySelector('.inputSearch')
  const inputValue = input.value
  setValues = inputValue
  detailsBtn(inputValue || setValues)
  input.value = ``
}

loadApi()
