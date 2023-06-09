const newFormHandler = async (event) => {
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

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.log(response);
      alert('Failed to create project');
    }
  }
};


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
