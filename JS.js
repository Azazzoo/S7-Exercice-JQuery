$(document).ready(function (){
    // Gestionnaire d'évèvement du boutton soumettre
    $("form").submit(function (event){
        // Valider a completer
        $description = $("description").val();
        if ($description === ''){
            event.preventDefault(); // Empeche la soumission
        }

    });
    $descValide = false;
    $portionValide = false;
    $idValide = false;

    $("#description").keyup(function (){
        //Valider la description
        $desc = $("#description").val();
        if($desc.length > 100 || $desc.length < 20) {
            $descValide = false;
        }
        else {
            $descValide = true;
        }
        GererBouton();
    });

    $("#portions").blur(function (){
        //Valider portions
        $portions = $("#portions").val();
        $categorie = $("#cat").val();
        $min = 2;
        if ($categorie === "dessert"){
            $min = 1;
        }
        if ($portions < $min || $portions > 8){
            $portionValide = false;
        }
        else {
            $portionValide = true;
        }
        GererBouton();
    });

    $("#identifiant").blur(function () {
        //Valider identifiant
        $identifiant = $("#identifiant").val();
        $regex = new RegExp("^#[a-z]{4,10}[0-9]{4}$");
        // Valider l'identifiant à l'aide d'une expression régulière
        if ($regex.test($identifiant)) {
            $idValide = true;
        } else {
            $idValide = false;
        }
        GererBouton();
    });

    //Décider si on active ou désactive le bouton soumettre
    function GererBouton() {
        if($descValide && $portionValide && $idValide){
            $("#envoyer").removeAttr("disabled");
        }
        else {
            $("#envoyer").attr("disabled", "disabled");
        }
    }



    // gestionnaire d'évènement du bouton
    $("#envoyer").click(function () {
        // récupérer les données (description) du formulaire :
        $desc = $("#description").val();
        // afficher les post-it
        $("#fridge").append("<p>" + $desc + "</p>");



    })
//au chargement, vérifier la session
    $compteur = sessionStorage.getItem("compteur")
    if ($compteur > 0){
        for ($i = 0; $i < $compteur; $i++){
            $ident = "item"+(+$i + 1);
            $item = sessionStorage.getItem($ident);
            if($item !== null){
                $("#fridge").append("<p id="+$ident+">"+$item+"</p>");
            }
        }
    }

    // au chargement, vérifier les données de l'URL
    $urldata = location.search.substring(1);
    if($urldata !== "" && $urldata.split('&')[0].split('=')[0] === "description"){

        $desc = ($urldata.split('&')[0].split('=')[1]).replaceAll("+", " ");


        // ajouter les items à la session pour les conserver
        $compteur = +$compteur + 1;
        sessionStorage.setItem("compteur", $compteur);
        sessionStorage.setItem("item"+$compteur, $desc);

        // ajouter la description sur un post-it
        $ident = "item"+$compteur;
        $("#fridge").append("<p id="+$ident+">"+$desc+"</p>");
    }


});
