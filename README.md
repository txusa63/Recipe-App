# Recipe-App
A MERN stack application with authentication and authorization with JWT and cookies that retrieves recipe data from an API and allows that data to be stored to a cloud database (MongoDB Atlas). 

The data is fetched by entering the first letter of a recipe, the name of the recipe, name of the type of recipe (dessert, seafood, etc), or by nationality into the search bar. The recipes are then retrieved and the information of each recipe can be displayed as a recipe card. The recipe cards display as a button initially with the name of the recipe. Clicking on the button will generate and expand a card below the button name. Inside the card there will be a save button that will save the recipe to the database. 


The user can see the saved recipes and delete a recipe via the delete button in the saved recipe card. 

To use the app the user must create an account or log in if an account already exists. Each account will initially have nothing saved and adding saved recipes will preserve it for that account only. 

Live Demo: https://fatidique-baguette-22666.herokuapp.com/
