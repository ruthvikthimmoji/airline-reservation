document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const flight = document.getElementById('flight').value;

        // Perform an AJAX request to submit the form data to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'server/book_ticket.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert('Booking successful!');
                form.reset();
            }
        };
        xhr.send(`name=${name}&email=${email}&phone=${phone}&flight=${flight}`);
    });

    // Load flight options from the server
    loadFlightOptions();
});

function loadFlightOptions() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'server/get_flights.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const flights = JSON.parse(xhr.responseText);
            const flightSelect = document.getElementById('flight');
            flights.forEach(function(flight) {
                const option = document.createElement('option');
                option.value = flight.flight_id;
                option.text = `${flight.airline} - ${flight.origin} to ${flight.destination}`;
                flightSelect.appendChild(option);
            });
        }
    };
    xhr.send();
}
