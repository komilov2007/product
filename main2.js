const yosh = +prompt('Yoshingizni kiriting?');
if (yosh >= 18) {
  alert('Siz ushbu web sahifaga kirishingiz mumkin!!!');
  product();
} else {
  alert('Afsuski siz 18 yoshdan kichkinasiz bu sahifaga kira olmaysiz!!!');
  document.body.style.backgroundColor = 'black';
  document.body.innerHTML =
    '<p class="yopiq" style="color: white;">Afsuski bu sahifa siz uchun yopiqda!!! </p><p class="yopiq">Chunki siz 18 yoshga to\'lmagansiz</p>';
}

const div = document.querySelector('.products');
const load = document.querySelector('.loader');

async function product() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    load.style.display = 'none';

    data.forEach((item) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.price}$</p>
      `;

      card.addEventListener('click', () => {
        card.style.backgroundColor = 'black';
        card.style.color = 'white';
        card.style.transition = '0.3s';
      });

      div.appendChild(card);
    });
  } catch (error) {
    load.innerHTML = `<p>Xatolik yuz berdi!</p>`;
  }
}
