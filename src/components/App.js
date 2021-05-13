import React, {useState, useEffect} from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
    const [selectedRecipeId, setSelectedRecipeId] = useState();
    const [recipes, setRecipes] = useState(sampleRecipes);
    const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

    useEffect(() => {
        const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (recipeJSON != null) {
            setRecipes(JSON.parse(recipeJSON))
        }
    }, [])

    useEffect(() => {
        console.log("Rendered");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes])

    const recipeContextValue = {
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeChange
    }

    function handleRecipeSelect(id) {
        setSelectedRecipeId(id);
    }

    function handleRecipeChange(id, recipe) {
        const newRecipes = [...recipes]
        const index = newRecipes.findIndex(r => r.id === id)
        newRecipes[index] = recipe
        setRecipes(newRecipes)
    }

    function handleRecipeAdd() {
        const newRecipe = {
            id: uuidv4(),
            name: '',
            cookTime: '',
            servings: 1,
            instructions: '',
            ingredients: [
                {id: uuidv4(), name: '', amount: ''}
            ]
        }
        setRecipes([...recipes, newRecipe])
    }
    function handleRecipeDelete(id) {
        if (selectedRecipeId !== null && selectedRecipeId === id) {
            setSelectedRecipeId(undefined)
        }
        setRecipes(recipes.filter(recipe => recipe.id !== id))
    }

   return (
       <RecipeContext.Provider value={recipeContextValue}>
           <RecipeList recipes={recipes}/>
           {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
       </RecipeContext.Provider>
  );
}

const sampleRecipes = [
    {
        id: 1,
        name: "Plain Chicken",
        cookTime: "1.54",
        servings: 3,
        instructions: "1. Put salt on chicken\n" +
            "2. Put chicken in the oven\n" +
            "3. Eat chicken",
        ingredients: [
            {
                id: 1,
                name: "Chicken",
                amount: "2 Pounds"
            },
            {
                id: 2,
                name: "Salt",
                amount: "1 Tbs"
            }
        ]
    },
    {
        id: 2,
        name: "Plain Pork",
        cookTime: "0.54",
        servings: 5,
        instructions: "1. Put paprika on pork\n" +
            "2. Put pork in the oven\n" +
            "3. Eat pork",
        ingredients: [
            {
                id: 1,
                name: "Pork",
                amount: "3 Pounds"
            },
            {
                id: 2,
                name: "Paprika",
                amount: "2 Tbs"
            }
        ]
    }
];
export default App;
