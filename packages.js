 $(document).ready(function() {
    function parisClick(){
    alert("Quick Details:\nAges: All Ages\nDuration: 6 Hours\nLocation: Paris\nTour Type: Guided Tour");
}
$('#Pprice').on('click', parisClick);
function baliClick(){
    alert("Quick Details:\nAges: All Ages\nDuration: 5 Hours\nLocation: Bali\nTour Type: Self-Guided Tour");
}
$('#Bprice').on('click', baliClick);
function NewClick(){
    alert("Quick Details:\nAges: All Ages\nDuration: 7 Hours\nLocation: New York\nTour Type: Guided Tour");
}
$('#Nprice').on('click', NewClick);
function TokyoClick(){
    alert("Quick Details:\nAges: All Ages\nDuration: 6 Hours\nLocation: Tokyo\nTour Type: Self-Guided Tour");
}
$('#Tprice').on('click', TokyoClick);
function romeClick(){
    alert("Quick Details:\nAges: All Ages\nDuration: 5 Hours\nLocation: Rome\nTour Type: Guided Tour");
}
$('#Rprice').on('click', romeClick);
function dubaiClick(){
    alert("Quick Details:\nAges: All Ages\nDuration: 6 Hours\nLocation: Dubai\nTour Type: Self-Guided Tour");
}
$('#Dprice').on('click', dubaiClick);
});