import { insertData } from "./../config/url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('pet-food-form');

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

        fetch(insertData, {
            method: 'POST',
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
        })
        .catch(error => {
            console.error('Error posting data:', error);
            alert('Error submitting data.');
        });
    });
});
