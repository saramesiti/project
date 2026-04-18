$(document).ready(function () {

    loadBookings();

    // Submit form
    $('#booking-form').submit(function (e) {
        e.preventDefault();

        $('.error-message').text('');
        $('#form-message').html('');

        let name = $('#name').val().trim();
        let email = $('#email').val().trim();
        let destination = $('#destination').val();
        let date = $('#date').val();
        let guests = parseInt($('#guests').val());

        let isValid = true;

        // Name
        if (name === '') {
            $('#name-error').text('Name is required');
            isValid = false;
        }

        // Email
        if (email === '') {
            $('#email-error').text('Email is required');
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            $('#email-error').text('Invalid email');
            isValid = false;
        }

        // Destination
        if (destination === '') {
            $('#destination-error').text('Select destination');
            isValid = false;
        }

        // Date
        if (date === '') {
            $('#date-error').text('Select a date');
            isValid = false;
        } else {
            let selectedDate = new Date(date);
            let today = new Date();
            today.setHours(0,0,0,0);

            if (selectedDate < today) {
                $('#date-error').text('Date cannot be in the past');
                isValid = false;
            }
        }

        // Guests
        if (isNaN(guests) || guests < 1 || guests > 20) {
            $('#guests-error').text('Guests must be 1-20');
            isValid = false;
        }

        // SAVE
        if (isValid) {

            let booking = {
                id: Date.now(),
                name,
                email,
                destination,
                date,
                guests
            };

            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            $('#form-message').html('<p class="success-message">Booking saved successfully!</p>');

setTimeout(function () {
    $('#form-message').fadeOut();
}, 1000);

$('#form-message').show(); // make sure it's visible again


            $('#booking-form')[0].reset();

            loadBookings();
        }
    });

    // Load bookings
    function loadBookings() {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        let html = '';

        if (bookings.length === 0) {
            html = "<p>No bookings yet.</p>";
        }else {
    bookings.forEach(b => {

        let destName = $('#destination option[value="' + b.destination + '"]').text();

        html += `
            <div class="booking-item">
                <strong>${destName}</strong><br>
                ${b.name} | ${b.email}<br>
                ${b.date} | ${b.guests} guests

                <button class="edit-btn" data-id="${b.id}">Edit</button>
                <button class="delete-btn" data-id="${b.id}">✖</button>
            </div>
        `;
    });
}
        $('#bookings-list').html(html);
    }


    // Delete booking (IMPORTANT: event delegation)
   $(document).on('click', '.delete-btn', function () {
    let id = $(this).data('id');
    let confirmDelete = confirm("Are you sure you want to delete this booking?");

    if (!confirmDelete) return;

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings = bookings.filter(b => b.id !== id);

    localStorage.setItem('bookings', JSON.stringify(bookings));

    loadBookings();
});


$(document).on('click', '.edit-btn', function () {

    let id = $(this).data('id');

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    let booking = bookings.find(b => b.id === id);

    if (!booking) return;

    // Fill the form with existing data
    $('#name').val(booking.name);
    $('#email').val(booking.email);
    $('#destination').val(booking.destination);
    $('#date').val(booking.date);
    $('#guests').val(booking.guests);

    // Remove old booking so it gets replaced on submit
    bookings = bookings.filter(b => b.id !== id);

    localStorage.setItem('bookings', JSON.stringify(bookings));

    loadBookings();
});

});
