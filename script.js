// Adatok közvetlenül a JS-ben, így garantáltan hibátlanul fut lokálisan is!
const siteData = {
  "rides": [
    {
      "title": "Mennydörgés Hullámvasút",
      "description": "Adrenalinbomba a javából! Pörgős kanyarok és magas zuhanások.",
      "image": "Mennydörgés Hullámvasút.png"  // <-- Írd át ide az 1. PNG fájlod nevét (pl. hullamvasut.png)
    },
    {
      "title": "Csillag Óriáskerék",
      "description": "Csodás kilátás egész Budapest / a környék felett romantikus pillanatokhoz.",
      "image": "Csillag Óriáskerék.png"  // <-- Írd át ide a 2. PNG fájlod nevét (pl. oriasperek.png)
    },
    {
      "title": "Klasszikus Körhinta",
      "description": "Nosztalgikus élmény a legkisebbeknek és a család minden tagjának.",
      "image": "körhinta.png"  // <-- Írd át ide a 3. PNG fájlod nevét (pl. korhinta.png)
    }
  ],
  "tickets": [
    { "value": 6500, "name": "Felnőtt napijegy (14 év felett) - 6 500 Ft" },
    { "value": 4500, "name": "Gyermek napijegy (3-14 év között) - 4 500 Ft" },
    { "value": 19000, "name": "Családi jegy (2 felnőtt + 2 gyermek) - 19 000 Ft" }
  ],
  "contact": {
    "address": "1234 Vidámpark utca 1.",
    "hours": "Hétfőtől Vasárnapig: 10:00 - 20:00",
    "email": "info@csodavidampark.hu"
  }
};

// Elemek kiválasztása
const ticketTypeSelect = document.getElementById('ticket-type');
const ticketCountInput = document.getElementById('ticket-count');
const totalAmountSpan = document.getElementById('total-amount');
const ticketForm = document.getElementById('ticket-form');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.querySelector('.close-btn');
const modalOkBtn = document.getElementById('modal-ok');
const modalText = document.getElementById('modal-text');
const ridesGrid = document.getElementById('rides-grid');

// Oldal betöltésekor adatok renderelése
document.addEventListener('DOMContentLoaded', () => {
    // 1. Játékok betöltése
    ridesGrid.innerHTML = '';
    siteData.rides.forEach(ride => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${ride.image}" alt="${ride.title}">
            <h3>${ride.title}</h3>
            <p>${ride.description}</p>
        `;
        ridesGrid.appendChild(card);
    });

    // 2. Jegyek betöltése a lenyíló menübe
    ticketTypeSelect.innerHTML = '';
    siteData.tickets.forEach(ticket => {
        const option = document.createElement('option');
        option.value = ticket.value;
        option.textContent = ticket.name;
        ticketTypeSelect.appendChild(option);
    });

    // 3. Kapcsolat adatok betöltése
    document.getElementById('contact-address').textContent = siteData.contact.address;
    document.getElementById('contact-hours').textContent = siteData.contact.hours;
    document.getElementById('contact-email').textContent = siteData.contact.email;

    // Kezdeti ár kiszámítása
    calculateTotal();
});

// Ár kiszámítása a darabszám vagy a típus változásakor
function calculateTotal() {
    const pricePerTicket = parseInt(ticketTypeSelect.value) || 0;
    const count = parseInt(ticketCountInput.value) || 1;
    const total = pricePerTicket * count;
    
    totalAmountSpan.textContent = total.toLocaleString('hu-HU');
}

ticketTypeSelect.addEventListener('change', calculateTotal);
ticketCountInput.addEventListener('input', calculateTotal);

// Űrlap elküldésének kezelése
ticketForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const count = ticketCountInput.value;
    const selectedOptionText = ticketTypeSelect.options[ticketTypeSelect.selectedIndex].text;
    const total = totalAmountSpan.textContent;

    modalText.innerHTML = `Sikeresen megrendeltél <strong>${count} db</strong> jegyet!<br>Típus: <em>${selectedOptionText}</em><br>Fizetendő: <strong>${total} Ft</strong>`;
    successModal.style.display = 'flex';
});

// Ablak bezárása
function closeModal() {
    successModal.style.display = 'none';
    ticketForm.reset();
    calculateTotal();
}

closeModalBtn.addEventListener('click', closeModal);
modalOkBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        closeModal();
    }
});