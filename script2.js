function updateCount(field, value) {
    let count = document.getElementById(field).value;
    count = parseInt(count) + value;
    if (count < 0) count = 0;
    document.getElementById(field).value = count;

    if (field === 'children') {
        updateChildrenAges(count);
    }
}

function updateChildrenAges(count) {
    const childrenAges = document.getElementById('childrenAges');
    childrenAges.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const label = document.createElement('label');
        label.textContent = `Âge de l'enfant ${i + 1}`;
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '17';
        input.name = `childAge${i + 1}`;
        input.required = true;
        childrenAges.appendChild(label);
        childrenAges.appendChild(input);
    }
}

function submitForm() {
    const location = document.getElementById('location').value;
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const rooms = document.getElementById('rooms').value;

    // Vérification des champs vides
    if (!location || !arrival || !departure || !adults || !children || !rooms) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return false;
    }

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    // Vérification des dates
    if (!arrival || !departure || arrivalDate >= departureDate) {
        alert('La date d\'arrivée doit être inférieure à la date de départ.');
        return false;
    }

    // Vérification du nombre d'adultes par rapport aux enfants
    if (parseInt(children) > 0 && parseInt(adults) < 1) {
        alert('Il doit y avoir au moins un adulte lorsque des enfants sont présents.');
        return false;
    }

    // Vérification du nombre de chambres
    if (parseInt(rooms) < 1) {
        alert('Il doit y avoir au moins une chambre.');
        return false;
    }

    // Vérification des âges des enfants
    for (let i = 0; i < children; i++) {
        const age = document.getElementsByName(`childAge${i + 1}`)[0].value;
        if (age === '' || age < 0 || age > 17) {
            alert('L\'âge des enfants doit être compris entre 0 et 17 ans.');
            return false;
        }
    }

    const work = document.getElementById('work').checked ? 'Oui' : 'Non';

    // Affichage du récapitulatif
    document.getElementById('confirmAdults').textContent = adults;
    document.getElementById('confirmChildren').textContent = children;
    document.getElementById('confirmRooms').textContent = rooms;
    document.getElementById('confirmWork').textContent = work;

    document.querySelector('.confirmation-container').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bookingForm').addEventListener('reset', () => {
        document.getElementById('childrenAges').innerHTML = '';
        document.querySelector('.confirmation-container').style.display = 'none';
    });
});