const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch('6b2585271d521462cb695882bbcfb2af78a6bc786ac158abd044d6185ae2d019');

router.post('/', async (req, res) => {
  const { recipe_name, description, ingredients, steps, totalTime } = req.body;
  try {
    
    const params = {
      q: recipe_name + "gif",
      engine: 'google_images',
      tbm: 'isch',
      num: 1,
    };

    // const callback = function(data) {
    //     const image = data.images_results[0].thumbnail;
    //     console.log(image);
    //     return image;
    //   };
    
    const searchResult = await new Promise((resolve, reject) => {
      search.json(params, resolve);
    });

    const image_url = searchResult.images_results[0].thumbnail;

    // const image_url = search.json(params, callback);
    // console.log(image_url);
    

    const newRecipe = await Recipe.create({
      recipe_name,
      description,
      ingredients,
      steps,
      totalTime,
      image_url,
      user_id: req.session.user_id,
    });

    
    
    console.log(newRecipe);

    res.status(200).json(newRecipe);
    // res.status(200).json(searchResult);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No Recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
