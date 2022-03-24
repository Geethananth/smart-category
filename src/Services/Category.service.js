/**
 * @author Geethananth M
 */

import { getData, setData } from "../Data/TestCategoryData"


/**
 * Gets the categories from data
 * @param {String} searchTerm 
 * @param {String} filter 
 * @returns Array of Categories
 */
export const getMainCategories = async (searchTerm = "", filter = "")=> {
    const data = getData();
    let result = data.filter((category) => category.parentID === "0") //  getting the main categories
    if (searchTerm !== "") {
        searchTerm = searchTerm.trim().toLowerCase();
        result = result.filter(item => 
            item.categoryId.includes(searchTerm) ||
            item.categoryNumber.toString().includes(searchTerm) ||
            item.name[0].value.toLowerCase().includes(searchTerm) ||
            item.name[1].value.toLowerCase().includes(searchTerm) 
            );
    }
    if (filter !== "") {
        result = result.filter(item => item.featured === (filter === 'featured'))
    }
    return sortCategory(result);
}

/**
 * Function to find all the subCategories a category have
 * @param {String} categoryId the ID of category 
 * @returns Array the Subcategories
 */
export const getSubCategories = async (categoryId) => {
    const data = getData();
    const subCategories = data.filter((category) => category.parentID === categoryId)
    const result = getAllSubCategoriesRecursively(subCategories);
    return sortCategory(subCategories)
}
/**
 * Function to get All Categories
 * @returns Array the Subcategories
 */
export const getAllCategories = async () => {
    const data = getData();    
    return sortCategory(data)
}

/**
 * Recursive function to get all the subCategories for a category
 * @param {String} categoryId 
 * @param {Array} result 
 */
const getAllSubCategoriesRecursively = (categoryId, result = [])=> {
    const data = getData();
            const subCategories = data.filter((category) => category.parentID === categoryId)            
    for (let index = 0; index < subCategories.length; index++) {
        const subCategory = subCategories[index];
        subCategory["subCategory"] = (subCategory["subCategory"]) ? subCategory["subCategory"] : []
            subCategory["subCategory"].push(subCategories)
        if (subCategory.parentID !== "0") {    
            result = getAllSubCategoriesRecursively(subCategory["subCategory"])        
            
        }
    }
    console.log(result)
}

/**
 * Adds a new category and returns the updated array
 * @param {Object} categoryObj new category to add
 * @returns Array 
 */
export const addCategory = async (categoryObj) => {
    return setData(categoryObj);
}

/**
 * Adds a new category and returns the updated array
 * @param {String} categoryId to find Category
 * @returns Array 
 */
export const getCategory = async (categoryId) => {
    const data = getData();
    const category = data.find((category) => category.categoryId === categoryId)
    return category;
}


/**
 * Returns the sorted array
 */
const sortCategory = (categories)=> {
    return categories.sort(function(a, b) {
        var catA = a.name[0].value.toLowerCase();
        var catB = b.name[0].value.toLowerCase();
        return (catA < catB) ? -1 : (catA > catB) ? 1 : 0;
    });

}