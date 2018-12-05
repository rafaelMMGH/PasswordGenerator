$(document).ready(function(){

    var typed = new Typed('#title', {
        strings: ['','<strong>Simple Password Generator</strong>'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        smartBackspace: true
    });

    function createPassword(){
            var Length = $("#length").val();
            var Numbers = $("#numbers").is(":checked");
            var Letters = $("#letters").val();
            var Special = $("#special").is(":checked");

            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var numbers = "0123456789";
            var special = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
            var chars = "";
            var text ="";

            if (Numbers)
                chars += numbers;
            if (Special)
                chars += special;

            chars += Letters == 1 ? letters : Letters == 2 ? letters.toLowerCase() : letters + letters.toLowerCase();

            for (var i = 0; i < Length; i++)
                text += chars.charAt(Math.floor(Math.random() * chars.length));
            

        return text;
    }
    
    $("#form").on("submit",function(e){
        e.preventDefault();

        axios.post("/Home/GeneratePassword/", {
            Length: $("#length").val(),
            Numbers: $("#numbers").is(":checked"),
            Letters: $("#letters").val(),
            Special: $("#special").is(":checked")
        }).then(function(e){
            $("#result").html("Password: <strong>" + e.data + "</strong>");
        }).catch(function(e){
            console.log(e)
            var result = createPassword();
            $("#result").html("Password: <strong>" + result + "</strong>");
        })
    
    });

});