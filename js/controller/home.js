import { getData, deleteData } from "./../config/url.js";

document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById('data-container');

    fetch(getData)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');

                const foodProduct = document.createElement('h2');
                foodProduct.classList.add('text-2xl', 'font-bold', 'mb-2');
                foodProduct.textContent = `${item.merk}`;

                const foodPrice = document.createElement('p');
                foodPrice.classList.add('text-xl', 'mb-1', 'font-bold');
                foodPrice.textContent = `Rp ${item.harga}`;

                const deskripsi = document.createElement('p');
                deskripsi.classList.add('mb-1');
                deskripsi.textContent = `Makanan ${item.jenismakanan} terbuat dari ${item.bahan} dengan rasa ${item.rasa} untuk hewan dengan umur ${item.hewan.umur} tahun.`;

                const animalType = document.createElement('p');
                animalType.classList.add('mb-1');
                animalType.textContent = `Untuk ${item.hewan.jenis} ${item.hewan.ras}`;

                const foodDate = document.createElement('p');
                foodDate.classList.add('mb-1');
                const date = new Date(item.tanggal);
                foodDate.textContent = `Tanggal: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                const buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('flex', 'justify-end', 'mt-2');

                const editButton = document.createElement('button');
                editButton.classList.add('bg-yellow-500', 'text-white', 'p-2', 'rounded-md', 'mr-2');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    window.location.href = `edit.html?id=${item._id}`;
                });

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded-md');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    fetch(`${deleteData}/${item._id}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(() => {
                        dataContainer.removeChild(card);
                    })
                    .catch(error => {
                        console.error('Error deleting data:', error);
                    });
                });

                buttonsContainer.appendChild(editButton);
                buttonsContainer.appendChild(deleteButton);

                card.appendChild(foodProduct);
                card.appendChild(foodPrice);
                card.appendChild(deskripsi);
                card.appendChild(animalType);
                card.appendChild(foodDate);
                card.appendChild(buttonsContainer);

                dataContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
