$(document).ready(function() {
    const destinationsList = [
        { name: "Paris, France", price: "$899", icon: "🇫🇷" },
        { name: "Bali, Indonesia", price: "$699", icon: "🇮🇩" },
        { name: "New York, USA", price: "$799", icon: "🇺🇸" },
        { name: "Tokyo, Japan", price: "$1099", icon: "🇯🇵" },
        { name: "Rome, Italy", price: "$849", icon: "🇮🇹" },
        { name: "Dubai, UAE", price: "$999", icon: "🇦🇪" }
    ];
});
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