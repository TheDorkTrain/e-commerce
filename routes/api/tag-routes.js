const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags= await Tag.findAll();

    res.json(tags);
    
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
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
