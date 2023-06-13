const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch('6b2585271d521462cb695882bbcfb2af78a6bc786ac158abd044d6185ae2d019');

router.post('/', withAuth, async (req, res) => {

  const { recipe_name, description, ingredients, steps, totalTime } = req.body;
  try {
    const newRecipe = await Recipe.create({
      recipe_name,
      description,
      ingredients,
      steps,
      totalTime,
      user_id: req.session.user_id,
    });

    const params = {
      q: newRecipe.recipe_name,
      engine: 'google_images',
      tbm: 'isch',
      num: 5,
    };

    const searchResult = await search.json(params);

    const image_url = searchResult.images_results[0]?.original;
    
    newRecipe.image_url = image_url;
    await newRecipe.save();

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
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
