const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category }, // Include Category data
        { model: Tag } // Include Tag data
      ]
    });

    res.json(products);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// get one product
router.get('/:id', (req, res) => {
  try {
    const productId = req.params.id; 

    Product.findByPk(productId)
      .then((product) => {
        if (product) {
          res.json(product);
        } else {
          res.json('Product not found');
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

// create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, category_id } = req.body;

    const newProduct = await Product.create({
      product_name,
      price,
      stock,
      category_id
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create product' });
  }
});


// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
