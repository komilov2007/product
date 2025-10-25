const API_URL = 'https://68fa0502ef8b2e621e7e795f.mockapi.io/api/product';
const loader = document.querySelector('.loader');
const cardsContainer = document.querySelector('.cards');
const idInput = document.querySelector('#productId');
const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price');
const categoryInput = document.querySelector('#category');
const stockInput = document.querySelector('#stock');
const imageInput = document.querySelector('#imageUrl');
const descriptionInput = document.querySelector('#description');

function showLoader() {
  loader.style.display = 'flex';
  cardsContainer.classList.remove('visible');
}

function hideLoader() {
  setTimeout(() => {
    loader.style.display = 'none';
    cardsContainer.classList.add('visible');
  }, 1000);
}

function fetchData() {
  showLoader();
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => renderCards(data))
    .catch((err) => console.error('Xatolik:', err))
    .finally(() => hideLoader());
}

function renderCards(data) {
  cardsContainer.innerHTML = '';
  data.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      
     <img src="${item.image}"  alt=""></img>
      <p class="meta"><b>Ismi:</b> ${item.ismi}</p>
      <p class="meta"><b>Turi:</b> ${item.turi}</p>
      <p class="meta"><b>Razmeri:</b>${item.razmeri}</p>
      <p class="meta"><b>Qayerda ishlab chiqarilgan: </b>${item.qayerd_ishla_chiqarilgan}</p>

      
    `;
    cardsContainer.appendChild(card);
  });
}

function POST(data) {
  showLoader();
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => fetchData())
    .catch((err) => console.error('POST xatolik:', err))
    .finally(() => hideLoader());
}

function PUT(data, id) {
  showLoader();
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => fetchData())
    .catch((err) => console.error('PUT xatolik:', err))
    .finally(() => hideLoader());
}

function DELETE(id) {
  showLoader();
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchData())
    .catch((err) => console.error('DELETE xatolik:', err))
    .finally(() => hideLoader());
}

document.querySelector('#btnCreate').addEventListener('click', () => {
  const product = {
    name: nameInput.value.trim(),
    price: priceInput.value.trim(),
    category: categoryInput.value.trim(),
    stock: stockInput.value.trim(),
    imageUrl: imageInput.value.trim(),
    description: descriptionInput.value.trim(),
  };

  if (!product.name || !product.price) {
    alert('Mahsulot nomi va narxini kiritish majburiy!');
    return;
  }

  POST(product);

  nameInput.value = '';
  priceInput.value = '';
  categoryInput.value = '';
  stockInput.value = '';
  imageInput.value = '';
  descriptionInput.value = '';
});

document.querySelector('#btnUpdate').addEventListener('click', () => {
  const id = idInput.value.trim();
  if (!id) return alert('Yangilash uchun ID kiriting!');

  const product = {
    name: nameInput.value.trim(),
    price: priceInput.value.trim(),
    category: categoryInput.value.trim(),
    stock: stockInput.value.trim(),
    imageUrl: imageInput.value.trim(),
    description: descriptionInput.value.trim(),
  };
  PUT(product, id);
});

document.querySelector('#btnDelete').addEventListener('click', () => {
  const id = idInput.value.trim();
  if (!id) return alert('O‘chirish uchun ID kiriting!');
  DELETE(id);
});

window.addEventListener('load', fetchData);
