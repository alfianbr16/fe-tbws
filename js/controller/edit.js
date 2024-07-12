import { getData, updateData } from "./../config/url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('pet-food-form');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        fetch(`${getData}/${id}`)
            .then(response => response.json())
            .then(data => {
                form.jenis.value = data.hewan.jenis;
                form.ras.value = data.hewan.ras;
                form.umur.value = data.hewan.umur;
                form.jenismakanan.value = data.jenismakanan;
                form.bahan.value = data.bahan;
                form.berat.value = data.berat;
                form.rasa.value = data.rasa;
                form.merk.value = data.merk;
                form.harga.value = data.harga;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching data.');
            });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            hewan: {
                jenis: form.jenis.value,
                ras: form.ras.value,
                umur: form.umur.value
            },
            jenismakanan: form.jenismakanan.value,
            bahan: form.bahan.value,
            berat: form.berat.value,
            rasa: form.rasa.value,
            merk: form.merk.value,
            harga: form.harga.value,
            tanggal: new Date().toISOString()
        };

        fetch(`${updateData}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Clear the form
            form.reset();

            alert('Data submitted successfully!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error posting data:', error);
            alert('Error submitting data.');
        });
    });
});
