$(document).ready(function (){
    // Gestionnaire d'évèvement du boutton soumettre
    $("form").submit(function (event){
        // Valider a completer
        $description = $("description").val();
        if ($description === ''){
            event.preventDefault(); // Empeche la soumission
        }

    });
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

        $desc = $urldata.split('&')[0].split('=')[1];

        // ajouter les items à la session pour les conserver
        $compteur = +$compteur + 1;
        sessionStorage.setItem("compteur", $compteur);
        sessionStorage.setItem("item"+$compteur, $desc);

        // ajouter la description sur un post-it
        $ident = "item"+$compteur;
        $("#fridge").append("<p id="+$ident+">"+$desc+"</p>");

    }


});
