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
      <img src="${
        item.imageUrl ||
        'data:image/jpeg;base64,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'
      }" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="meta"><b>Narx:</b> ${item.price} so‘m</p>
      <p class="meta"><b>Soni:</b> ${item.stock}</p>
      <p class="meta"><b>Kategoriya:</b> ${item.category}</p>
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
