const express =require('express');
const router =express.Router();

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
    res.send('Produit crée');
});

router.put('/modification', (req, res)=>{
    res.send('Produit modifié');
  });
  
router.delete('/suppression', (req, res)=>{
    res.send('Produit supprimé');
  });
  
router.get('/detail', (req, res, next)=>{
  
      console.log("[spy] : Accès au détail du produit");
    //on passe au middleware suivant
    next();
  }, (req,res)=>{
    res.send('<h1>Détail du produit</h1>');
  });
  
  
//Exports du module
module.exports = router;
