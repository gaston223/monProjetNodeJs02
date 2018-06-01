const express =require('express');
const router =express.Router();
const recipeFile = require('../model/recipe')
const Recipe = recipeFile.Recipe;
//Création d'un produit
router.route('/creation')
.get((req, res)=>{
  res.send(`Formulaire nouveau produit
    <form method="post" action="">
    <label for ="name">Nom du Produit</label>
    <input type ="text" name="name" id ="name">
    <input type ="submit" value="Créer">
    </form>  
  `);
})
.post((req, res)=>{
    console.log(req.body);
    /* Enregistrement avec "save" de l'objet
    //Ajout de la recette en BDD
    const maRecette = new Recipe({
        name : 'Cookies au chocolat',
        introduction :'Recette de cookies de ma grand-mere, elle est super bonne',
        nbIngredients: 7,
        publishedAt : new Date()
    });
    maRecette.save((err,recette)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(recette);
      }
    })
    res.send('Recette crée');
});
*/
  Recipe.create({
      name : 'Cookies au chocolat',
      introduction :'Recette de cookies de ma grand-mere, elle est super bonne',
      nbIngredients: 7,
      publishedAt : new Date(),
      ingredients:[
        { name :'farine', unit:'g', quantity: 100},
        { name :'sucre', unit:'paquet', quantity: 2.5},
        { name :'sel', unit:'g', quantity: 50},
      ]
      }, (err,recette)=>{
        if(err){
          console.log(err);
      }
        else{
          console.log(recette);
      }
  });
  res.send('Recette crée');
});

router.get('/', (req, res)=>{
  //Récuperation des recettes
  Recipe.find((err, recipes)=>{
    if(err){next(err);}
    else{
      console.log('Recettes récupérées');
      console.log(recipes);
    }
  

  //Renvoi vers une vue (pour afficher les recettes)
  res.render('product/list', { recipes: recipes});
});

});
router.put('/modification', (req, res)=>{
    res.send('Produit modifié');
  });
  
router.delete('/suppression', (req, res)=>{
    res.send('Produit supprimé');
  });
  
router.get('/detail/:name', (req, res, next)=>{
  
      console.log("[spy] : Accès au détail du produit");
    //on passe au middleware suivant
    next();
  },(req,res)=>{
    res.send(`<h1>Détail du produit : ${req.params.name}</h1>`);
  });

  
//Exports du module
module.exports = router;
