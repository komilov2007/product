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
        item.image ||
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAugMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwQBAgUGBwj/xAA3EAACAgECBQIDBgUDBQAAAAAAAQIDBBEhBRIxQVETYQYycRQiUpGh4TNCgYLwB8HRFUNicrH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+oAAAAAAAAAAAAAAAAAAAAAADT8GEwMgAAAAAAAAAAAAAAAAAAAAAAAADq9F1AEGbbdVXpRDWX80vwr2XczkZVdFqqu+7GcdrNdk/H7kFnrY0ueUnZV+Puvr/wAgSYtko1+pZPmg+uvn2J3vWrU+2v7FGzSyULIWaaLTlb2/oFe8jSuhv0095/i+gF+MuZJro0ZI648sUiQAAAAMpG2i8/oBoAAAAAAAAAAAAAAEEczGnKca7oSlD5kpJ6AThqLhKLWvMtGQ+vFvYypp9AF0IWwdV+8X0b/z9Tm3ZT4K+S+fqUT19Nd15JuJ8Trwa0tPVvn8lS6v3fhHKr4dfl5EcrNalNJKMe0F4QGOHxyM2U7b264WP+DHZJeDv49Ua4qMVokR00qEdEizEDZGUYLddShBN/N3AqtST05X066op8UzaKaaMacL4Svn97JVbccdLo2156fnqdKzdvcr3J767p7AbqDgknvtqmns17Gf86nOqunhZFOOq5WYd9nJGMN5Uzfdf+L7o7Lwb9fmrAqgAAAAAAAAABo306nmPiz40w/h+csSiv7Znr5oc2kKv/Z+fZHoc7K+w8Nzc1byx6JTj9ex+ecq+y6c7bpudk5OUpPrJvqwPUZP+pPHJTb5cJR/Aqm1+fMacJ+KcHN4lCzMrXDct6xjbGxvHnrptKL3h9dWttzxV1hVk9dfDA++YfEJKbqu1hZB8soy6plnM4useKqoStyZfLDtH3fseA+GeITy/h3GyLLdL8ayWLKxt6yUUpQ+r5Zaf2nqPheuM4uyfNK2Um+afVgdfhvD5eo8nJk7L57yk0dquCS006EVK2LCAzoZBkCOzKox7K1dZGPNJJLXqX/VUk9H9Dm8b4F/1jEhXK9484RlyOEVu305vKXgjwrrqtMfK+7dBJTXn3XlAdDr1NbP4cvoOZPdM0m9dgOXxe6eLw2++p8tlcVKD8S1Wn6nNXClcvVuyMiVk/vTfqvdvqW+JN8Qyq8Kj71UJqd8u23SP11WrOmqkkkuwFkAAAAAAAAyk5NRitW+iMGJS5ej0l29gIOJ34N18vh2U08nLolG1qX8PVbLTyz88cWxMjhudfg5dfp30T5Jx7fVez6n3jiPDa8u1ZNbVObCXPC9Lfm9/JzeOcL4L8Ywhj8apnhcXrXJG+lfef0/FHXsB8FslqaNpJttJJdWfS8v/SDLpvlCHHsNpP8A7tMoS/LVlvhfwLwvgVkMnMvfFc2G8K3XyVRl2fLq2/6vT2A5nAuFzw+AYWPelC/IulmW1v5lGSUYbeeVav6nuuDUckFtoVMTh1l2TLIyZOVtkuaT0PRY1HItALNS2JkjSC0RIk9tEBlJt6FvHrUVq95djSqCjv1ZLqBKnuUOL0490aoW3QoyJy5KJyf83j3Rvm5teJBOSc5y2hVHrN/7L3OTViWZGQ8vPkp3taJL5YLwgKGHnZv2uzG5oW+nJxdnbb37nVlVddFqy1xi+qhsSwohD5YJfREmmgEVGPVRFRqhGKXhEvKjJkAAAAAAAdX0N1EDRsjaELozusq5ZRnDtLuvK9jW+2uip22zUYR6tgaWOMIuc2lGO7b7FHG4njerfmV4bvyKI8uI2vmb6v2XT9SjfddxW7l3hjJ7Qf8AN7s6uJiwqhol+gHHqw8zKvnk51kpXWS1lpt/iOhTw+Meq/qdNVrwZ5EBWhQo6aInUTflM6eQMRi30JOZV1yno3yrmei1b08Ijc4xajzJN/Ktd2Zh6itkpNOD3Wi05fYCi51cf4di5fCs+ynlmrKbYbbp6SjOD6904vdezOlfkemkorntfyxX/wBfhEPNCrmhRVBWTlzNRWi1f8z0/wAZmFfI22+aUvmk+4GldLVkrbZc9stnLTt4XhE2gAAAAAAAAAAzFOT0RmEXJ6IsQgoLbfXuBFJwoqlOySio9XJ6IhyIXOVc6LFon96D6ST7m9Vsr3dTfTyuL0ae8ZRfRplfLysbhGJFPmaS5a69dXL2A2zcmnCqd1z5V0iu8vZHnbJ38VyFO1OFUfkr12j+5hLI4nkK/K/tiukV7HYxceNcdgGJjqqK0RbjERjobgADWc1DbrIDZvREN9so0znXW7JpNxhrpzPstTVyb3b3K2JRkY+Tk+pkyuosfPUp/NW+jjr3j477gTVOvMoqu5ZR7rVaSg+6/wBiaVjlP06l9/TdvpD9/YrWZLnb6GM9bF8830h+5aoqjTDlj53fdvywN64KEdOr7t935NggAAAAAAAAAMxi5PYwlq9CaOiQCdlWPBOyajFtLV+WYtpt+01212uMUuWyt7qS9vDNrIwtrlXZFShLZp9yrm5sMKmFdaU7GtIQ16fUDPFOI18Pp1l9+2XyVrv9fY85Xj352R9oy5c0n+SXhFqrFsvtd+TJznLq2jp1UxilogIqMdVpaIsxiZSNgABkAV8hNT5+qlol+RYDSaaa2fYCmnqUcjKtyLXi4P8Afd2j7L3L9+G7YuDslyPqlsb4+LXRFRrikgNMLFhjVqEF9X5LSCWhkAAAAAAAAAAACehJFkYAZF7rjpCPNY+i8FKvGbsdlj1nLqy5oNANYQ0WxtoZAGDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=' ||
        'data:image/jpeg;base64,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' ||
        'data:image/jpeg;base64,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'
      }" alt="${item.name}">
    
      <p class="meta"><b>Ismi:</b> ${item.ismi}</p>
      <p class="meta"><b>Turi:</b> ${item.turi}</p>
      <p class="meta"><b>Razmeri:</b>${item.razmeri}</p>
      <p class="meta"><b>Qayerda ishlab chiqarilgan: </b>${
        item.qayerd_ishla_chiqarilgan
      }</p>

      
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
