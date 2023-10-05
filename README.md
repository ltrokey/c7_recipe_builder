# What's in your Pantry?

[Link to live deploy](add url here)

## Description

"What's in Your Pantry?" is a versatile and intuitive kitchen app designed to simplify your cooking experience. With its user-friendly interface, you can effortlessly search for recipes and nutrition information based on the ingredients you have in your pantry. Whether you're a seasoned chef looking for fresh culinary inspiration or someone just starting their cooking journey, this app is your go-to resource. It provides nutrition facts for your ingredients and offers a wide selection of delectable recipes, making it easy to turn your everyday staples into delightful meals. Plus, it lets you save your favorite recipes for future reference, ensuring that your culinary adventures are always at your fingertips.

We created "What's in Your Pantry?" with a simple but powerful motivation, to make cooking at home more enjoyable, accessible, and nutritious for everyone. We understand the challenges of meal planning and the desire for variety in your diet. Our app empowers you to make informed choices by offering comprehensive nutrition information, helping you maintain a healthy lifestyle.

## Installation

1. In terminal, CD into project directory.
2. Git clone c7_recipe_builder.
3. CD into new project directory.
4. Open with your text editor, for VS Code, command `code .`.

## Usage

**Exploring Nutrition and Recipes**
1. Visit the home page. In the search bar, you can enter one ingredient or more.
2. Next to the search bar, there is a drop-down menu where you can select either `Nutrition` or `Recipes`.
3. After selecting an option, `click` the `Search` icon.

**Navigation Bar**
1. When you visit any of the pages (`Home`, `Recipe`, or `Nutrition`), you will find a navigation bar at the top.
2. `Click` on any of these navigation links and be redirected to the corresponding page based on your selection.

**Searching for Recipes**
1. Use the search bar on the home page and select `Recipe` from the drop-down menu or use the search bar on the recipe page.
2. `Click` the `Search` icon and a new page will open, displaying 10 recipe preview cards with images, names, recipe IDs, and the number of likes.
3. `Click` the `View` button on a recipe card, you'll see the full recipe with an image, title, ingredients with measurements, and step-by-step instructions.

**Saving Favorite Recipes**
1. Each recipe card has a `Favorite` heart-shaped icon, `click` the `Favorite` icon to save your recipe to local storage.
2. On the recipe page, your `Favorite` recipe under the search bar in the `Favorite Recipes` section, and you can access it by `clicking` the recipe titled buttons.

**Exploring Nutrition Information**
1. Use the search bar on the home page and select `Nutriction` from the drop-down menu or use the search bar on the recipe page.
2. `Click` the `Search` icon and a new page will open, displaying up to 10 nutrition cards with images, ingredient names, and nutritional facts.
3. On the nutrition page, your search history will be saved to local storage, and you can access it under the search bar in the `Search History` section as buttons titled with the search ingredient name.

**Clearing Local Storage**

1. When you visit the nutrition or recipe page, you will see a `Clear` button.
2. `Click` the `clear` button to empty the local storage for that specific page.

![alt text](assets/images/screenshot.png)

## Credits

[Evan Fodemski](https://github.com/EvanFodemski)

[Gonzalo Gondinez-Luna](https://github.com/GonzaloGodinez)

[Russell Montjoy](https://github.com/Montjrj)

[Timothy Ehli](https://github.com/Saosyn)

## License

MIT License

Copyright (c) 2023 ltrokey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) 	![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Features

1. **Ingredient-Based Search:** Allow users to input one or multiple ingredients in a search bar to find recipes and nutrition information.

2. **Nutrition Facts Display (Edamam API):** Provide detailed nutrition cards with images, titles, and essential nutritional data, including carbohydrates, energy, fat, and fiber for user-specified ingredients sourced from edamam.com.

3. **Recipe Preview Cards (Spoonacular API):** Display recipe previews with images, titles, recipe IDs, and the number of likes, sourced from spoonacular.com, making it easy for users to discover new recipes.

4. **Recipe Viewing (Spoonacular API):** Enable users to click on a recipe preview card to view the full recipe with ingredients, measurements, and step-by-step instructions sourced from spoonacular.com.

5. **Favorite Recipes:** Allow users to save their favorite recipes to a "favorites" section for quick access.

6. **Search History:** Save users' search history for both nutrition and recipe searches, enhancing user convenience.

7. **Navigation Bar:** Provide a navigation bar with links to the home, nutrition, and recipe pages for easy navigation.

8. **Search Dropdown Menu:** Include a drop-down menu on the search bar for users to choose between nutrition or recipe searches.

9. **Invalid Entry Handling:** Display a modal prompt message when users enter invalid search queries to provide guidance.

10. **Event Handler for Missing Nutrition Card Images:** Implement an event handler to gracefully handle missing images on nutrition cards, ensuring a smooth user experience even when images are unavailable.

11. **Event Handler for Missing Recipe Instructions:** Create an event handler to manage missing instructions on recipe cards, offering user-friendly notifications and guidance.

12. **Mobile Responsiveness:** Ensure that the application's layout and cards adapt to mobile devices for a seamless user experience on all screens.

13. **Clear Local Storage:** Provide a "clear" button on the nutrition and recipe pages to allow users to remove saved data from local storage.


