import { 
      getAllMakes,
      createMake, 
      getMake,
      updateMake,
      deleteMake,
   } from "../services/make.service.js";
import { 
     transformMake,
     transformMakes 
   } from "../transformation/makeTransformation.js";
import { organizeAPIResult } from "../utils/helper.js";

// Get All Makes of Car
export async function getMakesHandler(req, res) {
   try {
      const makes = await getAllMakes();
      return res.json(organizeAPIResult(transformMakes(makes), "List of items retrieved successfully."))
   } catch (error) {
      return res.json({message: error})
   }
  }

// Get a Make of Car
export async function getMakeHandler(req, res) {
   try {
      const make = await getMake(req.params.makeId);
      return res.json(organizeAPIResult(transformMake(make), "Item retrieved successfully."))
   } catch (error) {
      return res.json({message: error})
   }
  }

// Add a Make of Car
export async function insertCarMakeHandler(req, res) {
  const {name, description} = req.body;
  try {
     const saveMake= await createMake({name, description});
     return res.status(201).json(organizeAPIResult(transformMake(saveMake), "Item created successfully."))
  } catch (error) {
      return res.json({message: error})
  }
}

// Update a Make of Car
export async function updateCarMakeHandler(req, res) {
   const filter = { _id: req.params.makeId };
   const {name, description} = req.body;
   // create a document that sets the data for make
   const updateDoc = {
       $set: {
           name,
           description,
         },
     };
   try {
       const updatedMake = await updateMake(filter, updateDoc);
       return res.json(organizeAPIResult(transformMake(updatedMake, "Item updated successfully.")))
    } catch (error) {
        res.json({message: error})
    }
}

// Remove a Make of Car
export async function deleteCarMakeHandler(req, res) {
   try {
       const removedMake = await deleteMake({_id: req.params.makeId});
       return res.json(organizeAPIResult(transformMake(removedMake), "Item deleted successfully."))
    } catch (error) {
        res.json({message: error})
    }
}
