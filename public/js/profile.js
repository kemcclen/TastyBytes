const newRecipeHandler = async (event) => {
  event.preventDefault();

  const recipe_name = document.querySelector('#recipe_name').value.trim();
  const totalTime = document.querySelector('#totalTime').value.trim();
  const ingredients = document.querySelector('#ingredients').value.trim();
  const steps = document.querySelector('#steps').value.trim();
  const description = document.querySelector('#description').value.trim();

  let arrStep = steps.split(',')
  console.log(arrStep)
  let arrInge = ingredients.split(',')
  console.log(arrInge)

  if (recipe_name && totalTime && ingredients && steps && description) {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({ recipe_name, totalTime, ingredients, steps, description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // if (response.ok) {
    //   document.location.replace('/profile');
    // } else {
    //   console.log(response);
    //   alert('Failed to create project');
    // }
  }
};


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const newRecipe = () => {
  let form = document.querySelector('.form-container');
  let postList = document.querySelector('.recipe-list');
  let postBtn = document.querySelector('#newRecipeBtn');

  postList.classList.add('hidden');
  form.classList.remove("hidden");
  postBtn.classList.add('hidden');
}

const cancelRecipe = () => {
  let form = document.querySelector('.form-container');
  let postList = document.querySelector('.recipe-list');
  let postBtn = document.querySelector('#newRecipeBtn');

  postList.classList.remove('hidden');
  form.classList.add("hidden");
  postBtn.classList.remove('hidden')
}

document
  .querySelector('.new-recipe-form')
  .addEventListener('submit', newRecipeHandler);

document
  .querySelector('.recipe-list')
  .addEventListener('click', delButtonHandler);

  document.querySelector('#newRecipeBtn').addEventListener('click', newRecipe);

  document.querySelector('#cancel-form').addEventListener('click', cancelRecipe);

