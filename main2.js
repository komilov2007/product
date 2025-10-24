const yosh = +prompt('Yoshingizni kiriting?');
if (yosh >= 18) {
  alert('Siz ushbu web sahifaga kirishingiz mumkin!!!', product());
} else {
  alert('Afsuski siz 18 yoshdan kichkinasiz bu sahifaga kira olmaysiz!!!');
  alert.style.backgroundColor = 'purple';
}
const div = document.querySelector('.products');
const load = document.querySelector('.loader');

async function product() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    load.style.display = 'none';
    data.forEach((item) => {
      div.innerHTML += `<div class="card">
                 <img src="${item.image}" alt="${item.title}">
           <h3>${item.title}</h3>
         <p>${item.price}$</p>
         </div>`;
    });
  } catch (error) {
    load.innerHTML = ``;
  }
}
