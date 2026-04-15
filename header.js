$(document).ready(function() {
    const destinations = [
        { name: "Paris, France", rating: "★★★★★", price: "$899", icon: "🇫🇷",image:"picture/Paris.jpg"},
        { name: "Bali, Indonesia", rating: "★★★★½", price: "$699", icon: "🇮🇩",image:"picture/NYC.jpg" },
        { name: "New York, USA", rating: "★★★★½", price: "$799", icon: "🇺🇸",image:"picture/balii.jpg"},
        { name: "Tokyo, Japan", rating: "★★★★★", price: "$1099", icon: "🇯🇵",image:"picture/tokyo.jpg" },
        { name: "Rome, Italy", rating: "★★★★★", price: "$849", icon: "🇮🇹",image:"picture/rome.jpg" },
        { name: "Dubai, UAE", rating: "★★★★☆", price: "$999", icon: "🇦🇪" ,image:"picture/dubai.jpg"}
    ];

 $('#destination-search').on('keyup', function() {
        let searchTerm = $(this).val().toLowerCase().trim();
        
        let suggestions = [];
        
        if(searchTerm.length > 0) {
            suggestions = destinationsList.filter(function(dest) {
                return dest.name.toLowerCase().includes(searchTerm);
            });
        }
        
        console.log("Matching suggestions:", suggestions.length); // Test
        
    });



    let currentIndex = 0;
    
    // Function to show current destination using the HTML template
    function showCurrentDestination() {
        const dest = destinations[currentIndex];
        
        // Clone the hidden template card
        const $card = $("#card-template .dest-card").clone();
        
        // Fill in the destination data
        $card.find(".dest-icon").text(dest.icon);
        
        // Handle image - show it and set the source
        const $image = $card.find(".dest-image");
        if (dest.image) {
            $image.attr("src", dest.image);
            $image.show();  // Show the image
        } else {
            $image.hide();  // Hide if no image
        }
        
        $card.find(".dest-name").text(dest.name);
        $card.find(".dest-rating").text(dest.rating);
        $card.find(".dest-price").text(dest.price);  // Changed from .price to .dest-price
        
        // Clear the destinations list and add the new card
        $("#destinations-list").empty().append($card);
        
        // Set up hover effect
        const $priceDiv = $card.find(".dest-price");  // Changed from .price to .dest-price
        const $bookButton = $card.find(".book-button");  // Changed from .book-btn to .book-button
        
        $bookButton.hide();
        $priceDiv.show();
        
        // Hover effect on price-container
        $card.find(".price-container").hover(
            function() {
                $priceDiv.fadeOut(150);
                $bookButton.fadeIn(150);
            },
            function() {
                $bookButton.fadeOut(150);
                $priceDiv.fadeIn(150);
            }
        );
        
        // Update buttons
        $("#prev-btn").prop("disabled", currentIndex === 0);
        $("#next-btn").prop("disabled", currentIndex === destinations.length - 1);
        
        // Update counter
        $("#counter").text(`Destination ${currentIndex + 1} of ${destinations.length}`);
    }
    
    // Next button
    $("#next-btn").click(function() {
        if (currentIndex < destinations.length - 1) {
            currentIndex++;
            showCurrentDestination();
        }
    });
    
    // Previous button
    $("#prev-btn").click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            showCurrentDestination();
        }
    });
    
    // Show all destinations button
    $("#show-all-destinations").click(function() {
        let message = "🌟 ALL POPULAR DESTINATIONS 🌟\n\n";
        for (let i = 0; i < destinations.length; i++) {
            message += `${i+1}. ${destinations[i].icon} ${destinations[i].name}\n   Rating: ${destinations[i].rating}\n   Price: ${destinations[i].price}\n\n`;
        }
        alert(message);
    });
    
    // Search functionality
    $("#search-btn").click(function() {
        const searchTerm = $("#search-text").val().toLowerCase().trim();
        
        if (searchTerm === "") {
            alert("Please type a destination name to search");
            return;
        }
        
        const matched = destinations.filter(d => d.name.toLowerCase().includes(searchTerm));
        
        if (matched.length === 0) {
            alert(`No destinations found matching "${searchTerm}"`);
            return;
        }
        
        // Replace destinations array with matched ones
        destinations.length = 0;
        matched.forEach(d => destinations.push(d));
        
        currentIndex = 0;
        showCurrentDestination();
        
        $("#counter").after('<div style="color:#e67e22; margin-top:10px; font-size:14px;">🔍 Showing search results</div>');
    });
    
    // Enter key search
    $("#search-text").keypress(function(e) {
        if (e.which === 13) {
            $("#search-btn").click();
        }
    });
    
    // Start with first destination
    showCurrentDestination();
});
    
});
  

  
