const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryId = req.params.id; 

    Category.findByPk(categoryId)
      .then((Category) => {
        if (Category) {
          res.json(Category);
        } else {
          res.json('Category not found');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: error.message });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
